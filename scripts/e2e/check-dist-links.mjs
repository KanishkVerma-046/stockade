// Checks the built tool pages' learn links and Related guides against the
// posts that should be live. Not part of `npm test`; run after a build:
//
//   node scripts/e2e/check-dist-links.mjs [--at 2026-11-02T00:45:00Z] [--counts]
//
// --at must match the build's STOCKADE_BUILD_TIME (default: now, which suits a
// build made moments ago). For each locale and tool page it recomputes, from
// the posts' frontmatter, which post every learn topic and Related guides slot
// should resolve to, then requires dist/ to match: the same hrefs, each one a
// built page in the same locale, and no word glued to a link by compressHTML.
// RSI and MACD links render only once their pane is shown, so they are looked
// for in the island's props instead of its static markup. --counts prints how
// many links each tool page has to blog posts.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { RELATED_GUIDES, TOOL_LEARN_TOPICS, pickLive, resolveTopics } from '../../src/lib/learn-links.ts';
import { isLive, parsePostMeta, postPath } from '../../src/lib/publish-schedule.ts';

const arg = name => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const now = new Date(arg('--at') ?? process.env.STOCKADE_BUILD_TIME ?? Date.now());
const LOCALES = ['en', 'es', 'pt', 'ja', 'fr', 'de', 'ko', 'it'];
const PAGES = { simulator: 'simulator', 'chart-simulator': 'chartSimulator', markets: 'markets', analytics: 'analytics' };
const CLIENT_ONLY = new Set(['rsi', 'macd']);
const prefix = l => (l === 'en' ? '' : `/${l}`);

const failures = [];
const fail = msg => { failures.push(msg); console.log(`  FAIL ${msg}`); };

function livePosts(locale) {
  const dir = locale === 'en' ? 'src/content/blog' : `src/content/blog-${locale}`;
  return readdirSync(dir).filter(f => f.endsWith('.md')).flatMap(f => {
    const meta = parsePostMeta(readFileSync(join(dir, f), 'utf8'), locale, f);
    if (!isLive(meta, now)) return [];
    return [{ englishId: meta.translationOf ?? meta.id, href: postPath(meta) }];
  });
}

const unescape = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

// Text glued to one of the new links (a learn link, or any link in the Related
// guides section): a letter or digit straight before <a or after </a>. Older
// prose links are left alone; in ja/ko a particle rightly follows a link.
function gluedLinks(html) {
  const out = [];
  const isNew = (tag, at) => (attr(tag, 'target') === '_blank' && attr(tag, 'aria-label'))
    || html.lastIndexOf('<section aria-labelledby="related-guides-', at) > html.lastIndexOf('</section>', at);
  for (const m of html.matchAll(/(?<=(.))(<a\s[^>]*>)([\s\S]*?<\/a>)(?=(.))/g)) {
    if (!isNew(m[2], m.index)) continue;
    if (/[\p{L}\p{N}]/u.test(m[1]) || /[\p{L}\p{N}]/u.test(m[4])) out.push(`${m[1]}${m[2].slice(0, 40)}…${m[4]}`);
  }
  return out;
}

const counts = [];
console.log(`Build time ${now.toISOString()}`);
for (const locale of LOCALES) {
  const live = livePosts(locale);
  for (const [path, page] of Object.entries(PAGES)) {
    const label = `${locale} /${path}/`;
    const file = join('dist', prefix(locale), path, 'index.html');
    const html = readFileSync(file, 'utf8');

    // Learn links: <a target="_blank" rel="noopener"> in the static markup.
    const expected = resolveTopics(TOOL_LEARN_TOPICS[page], live);
    const staticHrefs = new Set();
    for (const [topic, post] of Object.entries(expected)) {
      if (CLIENT_ONLY.has(topic)) {
        if (!unescape(html).includes(`"href":[0,"${post.href}"]`)) fail(`${label}: ${topic} link ${post.href} missing from island props`);
      } else staticHrefs.add(post.href);
    }
    const found = new Set([...html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)]
      .filter(m => attr(m[0], 'rel') === 'noopener' && attr(m[0], 'aria-label'))
      .map(m => attr(m[0], 'href')));
    for (const h of staticHrefs) if (!found.has(h)) fail(`${label}: learn link ${h} missing`);
    for (const h of found) if (!staticHrefs.has(h)) fail(`${label}: unexpected learn link ${h}`);

    // Related guides: the section's post links, in order, then the index link.
    const section = html.match(/<section aria-labelledby="related-guides-[^"]+"[\s\S]*?<\/section>/)?.[0];
    const wantGuides = pickLive(RELATED_GUIDES[page], live).map(p => p.href);
    if (!section) fail(`${label}: no Related guides section`);
    const guideHrefs = section ? [...section.matchAll(/<a href="([^"]+)"/g)].map(m => m[1]) : [];
    const blogIndex = `${prefix(locale)}/blog/`;
    if (guideHrefs.join(' ') !== [...wantGuides, blogIndex].join(' ')) {
      fail(`${label}: Related guides ${guideHrefs.join(', ')}; want ${[...wantGuides, blogIndex].join(', ')}`);
    }
    if (wantGuides.length < 3) fail(`${label}: only ${wantGuides.length} related guides live`);

    // Every new href is a built page in this locale.
    const all = new Set([...found, ...guideHrefs, ...Object.values(expected).map(p => p.href)]);
    for (const h of all) {
      if (!h.startsWith(`${prefix(locale)}/blog/`) || !h.endsWith('/')) fail(`${label}: ${h} is not a ${locale} blog URL`);
      if (!existsSync(join('dist', h, 'index.html'))) fail(`${label}: ${h} was not built`);
    }
    for (const g of gluedLinks(html)) fail(`${label}: text glued to a link: ${g}`);

    const postLinks = [...html.matchAll(/<a [^>]*href="(\/(?:[a-z]{2}\/)?blog\/[^"/]+\/)"/g)].map(m => m[1]);
    counts.push({ locale, path, total: postLinks.length, distinct: new Set(postLinks).size });
  }
  console.log(`  ok   ${locale}: checked`);
}

if (process.argv.includes('--counts')) {
  console.log('\nLinks to blog posts (total / distinct posts)');
  console.log(['locale', ...Object.keys(PAGES)].join('\t'));
  for (const locale of LOCALES) {
    console.log([locale, ...Object.keys(PAGES).map(p => {
      const c = counts.find(x => x.locale === locale && x.path === p);
      return `${c.total} / ${c.distinct}`;
    })].join('\t'));
  }
}

console.log(failures.length ? `\n${failures.length} failure(s)` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
