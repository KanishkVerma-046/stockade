import { describe, it, expect } from 'vitest';
import { buildSiblingMap, findStaleLinks, splitHref, type BuiltPage } from './localized-links';

const ORIGIN = 'https://stockademarketsim.com';
const LOCALES = ['es', 'ko'];
const H2L = { en: 'en', es: 'es', ko: 'ko' };

const alt = (hreflang: string, path: string) => `<link rel="alternate" hreflang="${hreflang}" href="${ORIGIN}${path}">`;
const enPage = (path: string, siblings: Record<string, string>): BuiltPage => ({
  path,
  html: `<head>${alt('en', path)}${Object.entries(siblings).map(([l, p]) => alt(l, p)).join('')}${alt('x-default', path)}</head>`,
});

const pages = (extra: BuiltPage[]): BuiltPage[] => [
  enPage('/simulator/', { es: '/es/simulator/', ko: '/ko/simulator/' }),
  enPage('/blog/paper-trading-guide/', { es: '/es/blog/guia-de-paper-trading/' }), // no ko sibling
  { path: '/blog/english-only/', html: '<head></head>' },
  ...extra,
];

function stale(extra: BuiltPage[]) {
  const all = pages(extra);
  return findStaleLinks(all, buildSiblingMap(all, LOCALES, H2L, ORIGIN), LOCALES);
}

describe('splitHref', () => {
  it('separates the path from query and fragment', () => {
    expect(splitHref('/simulator/?symbol=APXL')).toEqual({ base: '/simulator/', suffix: '?symbol=APXL' });
    expect(splitHref('/#faq')).toEqual({ base: '/', suffix: '#faq' });
    expect(splitHref('/blog/')).toEqual({ base: '/blog/', suffix: '' });
  });
});

describe('findStaleLinks', () => {
  it('flags an English link on a translated page when that locale has a sibling', () => {
    expect(stale([{ path: '/es/markets/', html: '<a href="/simulator/">x</a>' }])).toEqual([
      { page: '/es/markets/', href: '/simulator/', expected: '/es/simulator/' },
    ]);
  });

  it('keeps the query string and fragment on the expected URL', () => {
    const [s] = stale([{ path: '/ko/markets/', html: '<a class="btn" href="/simulator/?symbol=APXL">x</a>' }]);
    expect(s.expected).toBe('/ko/simulator/?symbol=APXL');
  });

  it('uses the per-locale sibling, so a post without a ko translation is not flagged on ko pages', () => {
    expect(stale([{ path: '/ko/blog/x/', html: '<a href="/blog/paper-trading-guide/">x</a>' }])).toEqual([]);
    expect(stale([{ path: '/es/blog/x/', html: '<a href="/blog/paper-trading-guide/">x</a>' }])).toHaveLength(1);
  });

  it('ignores English pages that have no translation at all', () => {
    expect(stale([{ path: '/es/x/', html: '<a href="/blog/english-only/">x</a>' }])).toEqual([]);
  });

  it('skips deliberate cross-language links marked with hreflang', () => {
    expect(stale([{ path: '/es/markets/', html: '<a href="/simulator/" hreflang="en">English</a>' }])).toEqual([]);
  });

  it('ignores already-localized, external, protocol-relative and English-page links', () => {
    expect(
      stale([
        { path: '/es/a/', html: '<a href="/es/simulator/">a</a><a href="https://example.com/simulator/">b</a><a href="//cdn.example.com/simulator/">c</a>' },
        { path: '/about/', html: '<a href="/simulator/">English page linking English</a>' },
      ]),
    ).toEqual([]);
  });
});
