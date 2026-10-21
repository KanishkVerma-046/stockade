import { describe, it, expect } from 'vitest';
import {
  buildTime,
  findUnbuiltPostLinks,
  isLive,
  parsePostMeta,
  postPath,
  scheduleProblems,
  showFuture,
  upcomingPosts,
  type PostMeta,
} from './publish-schedule';

const NOW = new Date('2026-10-26T00:45:00Z');
const at = (iso: string) => new Date(iso);

describe('isLive', () => {
  it('publishes a past post', () => {
    expect(isLive({ date: at('2026-10-19') }, NOW)).toBe(true);
  });

  it('publishes a post dated exactly now', () => {
    expect(isLive({ date: NOW }, NOW)).toBe(true);
  });

  it('holds back a future post, even by a millisecond', () => {
    expect(isLive({ date: at('2026-11-02') }, NOW)).toBe(false);
    expect(isLive({ date: new Date(NOW.getTime() + 1) }, NOW)).toBe(false);
  });

  it('holds back a draft whatever its date', () => {
    expect(isLive({ date: at('2026-01-01'), draft: true }, NOW)).toBe(false);
    expect(isLive({ date: at('2027-01-01'), draft: true }, NOW)).toBe(false);
  });

  it('includes future posts under SHOW_FUTURE, but never drafts', () => {
    expect(isLive({ date: at('2027-01-11') }, NOW, true)).toBe(true);
    expect(isLive({ date: at('2027-01-11'), draft: true }, NOW, true)).toBe(false);
  });

  it('treats a date-only value as 00:00 UTC that day', () => {
    const monday = { date: at('2026-10-26') };
    expect(isLive(monday, at('2026-10-25T23:59:59Z'))).toBe(false);
    expect(isLive(monday, at('2026-10-26T00:00:00Z'))).toBe(true);
  });
});

describe('buildTime / showFuture', () => {
  it('fixes the build time on first use and returns the same value after', () => {
    const env: Record<string, string | undefined> = {};
    const first = buildTime(env);
    expect(env.STOCKADE_BUILD_TIME).toBe(first.toISOString());
    expect(buildTime(env).getTime()).toBe(first.getTime());
  });

  it('honours a preset build time and rejects garbage', () => {
    expect(buildTime({ STOCKADE_BUILD_TIME: '2026-10-26T00:45:00Z' })).toEqual(NOW);
    expect(() => buildTime({ STOCKADE_BUILD_TIME: 'soon' })).toThrow(/not a date/);
  });

  it('shows future posts only for SHOW_FUTURE=1', () => {
    expect(showFuture({})).toBe(false);
    expect(showFuture({ SHOW_FUTURE: '0' })).toBe(false);
    expect(showFuture({ SHOW_FUTURE: '1' })).toBe(true);
  });
});

describe('parsePostMeta', () => {
  const md = (fm: string) => `---\r\n${fm.replace(/\n/g, '\r\n')}\r\n---\r\n\r\nBody with date: 1999-01-01\r\n`;

  it('reads slug, translationOf, date and draft from CRLF frontmatter', () => {
    expect(
      parsePostMeta(md('title: "T"\ndate: 2026-10-26\nslug: "ratio-risque"\ntranslationOf: "risk-reward-ratio"\ndraft: true'), 'fr', 'f.md'),
    ).toEqual({
      locale: 'fr',
      file: 'f.md',
      id: 'ratio-risque',
      translationOf: 'risk-reward-ratio',
      date: at('2026-10-26T00:00:00Z'),
      draft: true,
    });
  });

  it('defaults draft to false and accepts an explicit UTC time', () => {
    const p = parsePostMeta(md('date: 2026-10-26T00:30:00Z\nslug: "x"'), 'en', 'x.md');
    expect(p.draft).toBe(false);
    expect(p.translationOf).toBeUndefined();
    expect(p.date).toEqual(at('2026-10-26T00:30:00Z'));
  });

  it('rejects dates the content layer might read differently', () => {
    for (const d of ['"2026-10-26"', '2026-10-26T00:30:00', '26/10/2026', '']) {
      expect(() => parsePostMeta(md(`date: ${d}\nslug: "x"`), 'en', 'x.md')).toThrow(/YYYY-MM-DD/);
    }
  });

  it('rejects a post without a slug', () => {
    expect(() => parsePostMeta(md('date: 2026-10-26'), 'en', 'x.md')).toThrow(/slug/);
  });
});

describe('postPath', () => {
  it('prefixes translated locales only', () => {
    expect(postPath({ locale: 'en', id: 'a' })).toBe('/blog/a/');
    expect(postPath({ locale: 'ko', id: 'b' })).toBe('/ko/blog/b/');
  });
});

const LOCALES = ['es', 'ko'];
const post = (locale: string, id: string, date: string, extra: Partial<PostMeta> = {}): PostMeta => ({
  locale,
  file: `${locale}/${id}.md`,
  id,
  date: at(date),
  draft: false,
  ...extra,
});
const full = (id: string, date: string, extra: Partial<PostMeta> = {}): PostMeta[] => [
  post('en', id, date, extra),
  post('es', `${id}-es`, date, { translationOf: id, ...extra }),
  post('ko', `${id}-ko`, date, { translationOf: id, ...extra }),
];

describe('scheduleProblems', () => {
  it('passes complete posts, past and future', () => {
    expect(scheduleProblems([...full('old', '2026-10-19'), ...full('next', '2026-11-02')], LOCALES, NOW)).toEqual([]);
  });

  it('allows an incomplete future post', () => {
    expect(scheduleProblems([post('en', 'next', '2026-11-02')], LOCALES, NOW)).toEqual([]);
  });

  it('fails a due post missing a locale, or with a draft translation', () => {
    const posts = [post('en', 'due', '2026-10-26'), post('es', 'due-es', '2026-10-26', { translationOf: 'due', draft: true })];
    expect(scheduleProblems(posts, LOCALES, NOW)).toEqual([
      'en/due.md: due 2026-10-26 but its es translation is a draft',
      'en/due.md: due 2026-10-26 but has no ko translation',
    ]);
  });

  it('fails a translation whose date differs from the English one', () => {
    const posts = full('p', '2026-11-02');
    posts[2] = { ...posts[2], date: at('2026-11-09') };
    expect(scheduleProblems(posts, LOCALES, NOW)).toEqual([
      'ko/p-ko.md: date 2026-11-09 differs from the English original\'s 2026-11-02',
    ]);
  });

  it('fails a translation pointing at no English post, or without translationOf', () => {
    const posts = [post('es', 'x', '2026-11-02', { translationOf: 'typo' }), post('ko', 'y', '2026-11-02')];
    expect(scheduleProblems(posts, LOCALES, NOW)).toEqual([
      'es/x.md: translationOf "typo" matches no English post',
      'ko/y.md: missing `translationOf`',
    ]);
  });

  it('fails two translations of one post in a locale', () => {
    const posts = [...full('p', '2026-11-02'), post('es', 'p-es-2', '2026-11-02', { translationOf: 'p' })];
    expect(scheduleProblems(posts, LOCALES, NOW)).toEqual(['es/p-es-2.md: es already translates "p" in es/p-es.md']);
  });

  it('fails a live translation of an English draft, but not a draft of one', () => {
    const posts = [
      post('en', 'p', '2026-10-19', { draft: true }),
      post('es', 'p-es', '2026-10-19', { translationOf: 'p' }),
      post('ko', 'p-ko', '2026-10-19', { translationOf: 'p', draft: true }),
    ];
    expect(scheduleProblems(posts, LOCALES, NOW)).toEqual(['es/p-es.md: would go live while its English original is a draft']);
  });
});

describe('upcomingPosts', () => {
  it('lists future non-draft English posts soonest first, with missing locales', () => {
    const posts = [
      ...full('later', '2026-11-09'),
      post('en', 'next', '2026-11-02'),
      post('es', 'next-es', '2026-11-02', { translationOf: 'next' }),
      post('en', 'hidden', '2026-11-16', { draft: true }),
      ...full('past', '2026-10-19'),
    ];
    expect(upcomingPosts(posts, LOCALES, NOW)).toEqual([
      { id: 'next', date: '2026-11-02', missing: ['ko'] },
      { id: 'later', date: '2026-11-09', missing: [] },
    ]);
  });
});

describe('findUnbuiltPostLinks', () => {
  const ORIGIN = 'https://stockademarketsim.com';
  const built = new Set(['/blog/live/', '/es/blog/vivo/']);
  const unbuilt = new Map<string, 'future' | 'draft'>([
    ['/blog/next/', 'future'],
    ['/es/blog/borrador/', 'draft'],
  ]);
  const find = (html: string, path = '/blog/live/') => findUnbuiltPostLinks([{ path, html }], built, unbuilt, ORIGIN);

  it('passes links to built posts, indexes and other pages', () => {
    expect(find('<a href="/blog/live/">a</a><a href="/es/blog/vivo/#x">b</a><a href="/blog/">c</a><a href="/simulator/?symbol=X">d</a>')).toEqual([]);
  });

  it('flags a link to a future post, with or without slash, query or origin', () => {
    expect(find(`<a href="/blog/next/">a</a><a class="x" href="${ORIGIN}/blog/next?ref=1">b</a>`)).toEqual([
      { page: '/blog/live/', href: '/blog/next/', reason: 'future' },
      { page: '/blog/live/', href: `${ORIGIN}/blog/next?ref=1`, reason: 'future' },
    ]);
  });

  it('flags hreflang alternates and sitemap entries too', () => {
    const html = `<link rel="alternate" hreflang="es" href="${ORIGIN}/es/blog/borrador/">`;
    const xml = `<url><loc>${ORIGIN}/blog/next/</loc><xhtml:link rel="alternate" hreflang="es" href="${ORIGIN}/es/blog/borrador/"/></url>`;
    expect(find(html).map(f => f.reason)).toEqual(['draft']);
    expect(find(xml, 'sitemap.xml').map(f => f.reason)).toEqual(['future', 'draft']);
  });

  it('flags a link to a post that does not exist at all', () => {
    expect(find('<a href="/blog/typo/">a</a>')).toEqual([{ page: '/blog/live/', href: '/blog/typo/', reason: 'no such post' }]);
  });
});
