// Scheduled publishing. A post goes live once its frontmatter `date` is at or
// before the build time; until then it is treated exactly like `draft: true`:
// no page, and absent from the blog index, related posts, hreflang alternates
// and the sitemap. The daily GitHub Action rebuilds and deploys, which is what
// actually publishes a post on its date.
//
// Two runtimes need the same answer: astro.config.mjs (sitemap alternates and
// the build checks, reading frontmatter directly) and the pages (filtering
// `getCollection`). They share one build time through STOCKADE_BUILD_TIME,
// which the config sets before any page renders, so a build that straddles a
// publish instant cannot disagree with itself.
//
// Set SHOW_FUTURE=1 to include future posts for a local preview. Drafts stay
// out either way. `npm run deploy`, `npm run indexnow` and the Action refuse
// to run with it set (publish-env.mjs).

export interface PublishFields {
  date: Date;
  draft?: boolean;
}

type Env = Record<string, string | undefined>;

/** Whether a post is published in a build made at `now`. A date equal to `now` is live. */
export function isLive(data: PublishFields, now: Date, showFuture = false): boolean {
  if (data.draft) return false;
  return showFuture || data.date.getTime() <= now.getTime();
}

/** The build's single "now", fixed on first use and shared through the environment. */
export function buildTime(env: Env = process.env): Date {
  env.STOCKADE_BUILD_TIME ??= new Date().toISOString();
  const t = new Date(env.STOCKADE_BUILD_TIME);
  if (Number.isNaN(t.getTime())) throw new Error(`STOCKADE_BUILD_TIME is not a date: ${env.STOCKADE_BUILD_TIME}`);
  return t;
}

export function showFuture(env: Env = process.env): boolean {
  return env.SHOW_FUTURE === '1';
}

/** `getCollection` filter for every blog collection. */
export function isLiveEntry(entry: { data: PublishFields }): boolean {
  return isLive(entry.data, buildTime(), showFuture());
}

// ---------------------------------------------------------------------------
// Frontmatter read outside the content layer (astro.config.mjs).

export interface PostMeta {
  /** `en` or a translated locale code. */
  locale: string;
  file: string;
  /** The frontmatter `slug`, which the glob loader uses as the entry id. */
  id: string;
  translationOf?: string;
  date: Date;
  draft: boolean;
}

// Only forms that YAML and `z.coerce.date` both read as UTC, so this parse
// cannot disagree with the content layer's. A bare `2026-10-26T00:30:00` would
// be local time to `new Date()` but UTC to YAML.
const DATE_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z)?$/;

export function parsePostMeta(raw: string, locale: string, file: string): PostMeta {
  const fm = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (fm === undefined) throw new Error(`${file}: no frontmatter block`);
  const field = (name: string) => fm.match(new RegExp(`^${name}:[ \\t]*(.*?)[ \\t]*$`, 'm'))?.[1];
  const unquote = (v: string | undefined) => v?.replace(/^"(.*)"$/, '$1');

  const id = unquote(field('slug'));
  if (!id) throw new Error(`${file}: missing \`slug\``);
  const rawDate = field('date');
  if (!rawDate || !DATE_RE.test(rawDate)) {
    throw new Error(`${file}: \`date\` must be unquoted YYYY-MM-DD (or YYYY-MM-DDTHH:MMZ), got ${rawDate ?? 'nothing'}`);
  }
  return {
    locale,
    file,
    id,
    translationOf: unquote(field('translationOf')),
    date: new Date(rawDate),
    draft: field('draft') === 'true',
  };
}

export function postPath(post: Pick<PostMeta, 'locale' | 'id'>, defaultLocale = 'en'): string {
  return post.locale === defaultLocale ? `/blog/${post.id}/` : `/${post.locale}/blog/${post.id}/`;
}

const day = (d: Date) => d.toISOString().replace('T00:00:00.000Z', '');

/**
 * Problems that must fail the build. A post that is due must exist, live, in
 * every locale, so nothing goes out half-translated; a translation must point
 * at a real English post and share its date, so all locales go live together.
 * `now` is the real build time even under SHOW_FUTURE: a preview may show an
 * unfinished future post, but a due one is never let through.
 */
export function scheduleProblems(posts: PostMeta[], translatedLocales: readonly string[], now: Date): string[] {
  const problems: string[] = [];
  const en = new Map(posts.filter(p => p.locale === 'en').map(p => [p.id, p]));

  for (const locale of translatedLocales) {
    const seen = new Map<string, PostMeta>();
    for (const p of posts.filter(p => p.locale === locale)) {
      if (!p.translationOf) {
        problems.push(`${p.file}: missing \`translationOf\``);
        continue;
      }
      const original = en.get(p.translationOf);
      if (!original) {
        problems.push(`${p.file}: translationOf "${p.translationOf}" matches no English post`);
        continue;
      }
      const dupe = seen.get(p.translationOf);
      if (dupe) problems.push(`${p.file}: ${locale} already translates "${p.translationOf}" in ${dupe.file}`);
      seen.set(p.translationOf, p);
      if (p.date.getTime() !== original.date.getTime()) {
        problems.push(`${p.file}: date ${day(p.date)} differs from the English original's ${day(original.date)}`);
      }
      if (original.draft && isLive(p, now)) {
        problems.push(`${p.file}: would go live while its English original is a draft`);
      }
    }
  }

  for (const original of en.values()) {
    if (!isLive(original, now)) continue;
    for (const locale of translatedLocales) {
      const t = posts.filter(p => p.locale === locale && p.translationOf === original.id);
      if (t.length === 0) problems.push(`${original.file}: due ${day(original.date)} but has no ${locale} translation`);
      else if (t.every(p => p.draft)) problems.push(`${original.file}: due ${day(original.date)} but its ${locale} translation is a draft`);
    }
  }
  return problems;
}

/** Not-yet-due English posts with the locales that have a non-draft translation, soonest first. */
export function upcomingPosts(posts: PostMeta[], translatedLocales: readonly string[], now: Date) {
  return posts
    .filter(p => p.locale === 'en' && !p.draft && !isLive(p, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(p => ({
      id: p.id,
      date: day(p.date),
      missing: translatedLocales.filter(
        l => !posts.some(t => t.locale === l && t.translationOf === p.id && !t.draft),
      ),
    }));
}

// ---------------------------------------------------------------------------
// Post-build: nothing built may point at a post that was not built.

export interface BuiltFile {
  /** Site-relative path of the page, or the file name for non-HTML output. */
  path: string;
  html: string;
}

export interface UnbuiltPostLink {
  page: string;
  href: string;
  reason: 'future' | 'draft' | 'no such post';
}

const BLOG_POST_PATH_RE = /^(?:\/[a-z]{2})?\/blog\/[^/]+\/?$/;
const URL_ATTR_RE = /\bhref="([^"]*)"|<loc>([^<]*)<\/loc>/g;

/**
 * Every `href` (any tag: <a>, hreflang <link>, sitemap <xhtml:link>) and
 * sitemap `<loc>` that points at a blog post page absent from the build.
 * `unbuilt` names why a known post is missing; anything else is a typo.
 */
export function findUnbuiltPostLinks(
  files: BuiltFile[],
  builtPaths: ReadonlySet<string>,
  unbuilt: ReadonlyMap<string, 'future' | 'draft'>,
  origin: string,
): UnbuiltPostLink[] {
  const found: UnbuiltPostLink[] = [];
  for (const file of files) {
    for (const m of file.html.matchAll(URL_ATTR_RE)) {
      const href = (m[1] ?? m[2]).trim();
      const local = href.startsWith(origin) ? href.slice(origin.length) : href;
      let path = local.split(/[?#]/)[0];
      if (!BLOG_POST_PATH_RE.test(path)) continue;
      if (!path.endsWith('/')) path += '/';
      if (builtPaths.has(path)) continue;
      found.push({ page: file.path, href, reason: unbuilt.get(path) ?? 'no such post' });
    }
  }
  return found;
}
