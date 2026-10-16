// Detects internal links on translated pages that point at an English URL even
// though a sibling in the page's own locale exists — the "silently sends this
// locale's visitors to English" bug that has recurred in nav chrome, React
// islands, and hand-written prose links.
//
// The sibling map is read from the built pages' own hreflang <link> tags rather
// than recomputed from alternates.ts / translationOf, so this checks exactly
// what search engines and the language switcher see. An <a> carrying an
// `hreflang` attribute is a deliberate cross-language link (the language
// switcher, the legal pages' "View the English version") and is skipped.

export interface BuiltPage {
  /** Site-relative URL path with trailing slash, e.g. `/ko/markets/`. */
  path: string;
  html: string;
}

export interface StaleLink {
  page: string;
  href: string;
  expected: string;
}

/** English path -> { localeCode -> localized path }. */
export type SiblingMap = Map<string, Record<string, string>>;

const ALT_LINK_RE = /<link\b[^>]*\brel="alternate"[^>]*>/g;
const A_TAG_RE = /<a\b[^>]*>/g;

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

/** Splits `/blog/x/?a=1#b` into `/blog/x/` and `?a=1#b`. */
export function splitHref(href: string): { base: string; suffix: string } {
  const i = href.search(/[?#]/);
  return i === -1 ? { base: href, suffix: '' } : { base: href.slice(0, i), suffix: href.slice(i) };
}

export function localeOfPath(path: string, localeCodes: readonly string[]): string | undefined {
  const first = path.split('/')[1];
  return localeCodes.includes(first) ? first : undefined;
}

/**
 * Builds the sibling map from the English pages' hreflang alternates.
 * `hreflangToLocale` maps hreflang values (e.g. `pt-BR`) to locale codes (`pt`).
 */
export function buildSiblingMap(
  pages: BuiltPage[],
  localeCodes: readonly string[],
  hreflangToLocale: Record<string, string>,
  origin: string,
): SiblingMap {
  const map: SiblingMap = new Map();
  for (const page of pages) {
    if (localeOfPath(page.path, localeCodes)) continue; // English pages only
    const siblings: Record<string, string> = {};
    for (const tag of page.html.match(ALT_LINK_RE) ?? []) {
      const locale = hreflangToLocale[attr(tag, 'hreflang') ?? ''];
      const href = attr(tag, 'href');
      if (!locale || !href?.startsWith(origin)) continue;
      siblings[locale] = href.slice(origin.length);
    }
    if (Object.keys(siblings).length) map.set(page.path, siblings);
  }
  return map;
}

/** Every `<a href>` on a translated page that should point at its locale's sibling instead. */
export function findStaleLinks(
  pages: BuiltPage[],
  siblings: SiblingMap,
  localeCodes: readonly string[],
): StaleLink[] {
  const stale: StaleLink[] = [];
  for (const page of pages) {
    const locale = localeOfPath(page.path, localeCodes);
    if (!locale) continue;
    for (const tag of page.html.match(A_TAG_RE) ?? []) {
      if (attr(tag, 'hreflang') !== undefined) continue;
      const href = attr(tag, 'href');
      if (!href?.startsWith('/') || href.startsWith('//')) continue;
      const { base, suffix } = splitHref(href);
      if (localeOfPath(base, localeCodes)) continue; // already locale-prefixed
      const target = siblings.get(base)?.[locale];
      if (target && target !== base) stale.push({ page: page.path, href, expected: target + suffix });
    }
  }
  return stale;
}
