// @ts-check
import { rename, readdir, readFile, rm } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative, sep } from 'node:path';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALES, DEFAULT_LOCALE, toSitemapLocaleMap } from './src/i18n/locales.ts';
import { buildSiblingMap, findStaleLinks } from './src/lib/localized-links.ts';
import { findLiteralBold } from './src/lib/literal-markdown.ts';
import { coverageStatus, uiCoverage } from './src/lib/ui-coverage.ts';
import { translations, UI_PENDING } from './src/i18n/ui.ts';

// Non-default locale codes, for stripping the locale prefix off a sitemap
// item's path before matching it against the branches below — /es/simulator
// should get the same priority as /simulator, not fall into the catch-all.
const localeCodes = LOCALES.map(l => l.code).filter(c => c !== DEFAULT_LOCALE);
const localePrefixPattern = new RegExp(`^/(${localeCodes.join('|')})(?=/|$)`);

// @astrojs/sitemap's own i18n auto-pairing only matches sitemap entries whose
// path is IDENTICAL after stripping the locale prefix — see
// node_modules/@astrojs/sitemap/dist/utils/parse-i18n-url.js. Translated blog
// posts use localized slugs (e.g. /blog/paper-trading-guide/ <->
// /es/blog/guia-de-paper-trading/), so that auto-pairing silently produces no
// xhtml:link alternates for any of them — the one exception being any post
// that happens to keep an identical slug in both locales. Read each
// translated post's `translationOf` frontmatter field directly (the same
// field the [slug] routes use for hreflang) to build an en<->localized slug
// map per translated-blog locale ourselves, and inject the links manually in
// `serialize()` below. This duplicates the `translationOf` read that
// content.config.ts's schema enforces, but astro.config.mjs runs outside the
// Vite/content-layer runtime, so `astro:content` isn't available here —
// reading the frontmatter directly with a small regex is simpler than
// routing around that.
//
// Add a locale here only once its `blog-{code}` content directory exists —
// this list is what makes translated-blog hreflang pairing work at all, not
// just a performance nicety.
const translatedBlogLocales = ['es', 'pt', 'ja', 'fr', 'de', 'ko', 'it'];
const sitemapLocaleMap = toSitemapLocaleMap();
const blogSlugMaps = Object.fromEntries(
  translatedBlogLocales.map(locale => {
    const dir = fileURLToPath(new URL(`./src/content/blog-${locale}`, import.meta.url));
    const map = new Map();
    for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const slugMatch = raw.match(/^slug:\s*"([^"]+)"/m);
      const translationOfMatch = raw.match(/^translationOf:\s*"([^"]+)"/m);
      if (slugMatch && translationOfMatch) {
        map.set(translationOfMatch[1], slugMatch[1]);
      }
    }
    return [locale, map];
  })
);

// Builds the full xhtml:link set for a blog post given its English slug —
// the English link plus one per translated-blog locale that has a sibling
// for it. Returns undefined (no links) when no translation exists at all,
// same behavior as before this was generalized past Spanish-only.
function buildBlogLinks(/** @type {string} */ enSlug) {
  const links = [{ url: `https://stockademarketsim.com/blog/${enSlug}/`, lang: sitemapLocaleMap.en }];
  for (const locale of translatedBlogLocales) {
    const localizedSlug = blogSlugMaps[locale].get(enSlug);
    if (localizedSlug) {
      links.push({
        url: `https://stockademarketsim.com/${locale}/blog/${localizedSlug}/`,
        lang: sitemapLocaleMap[locale],
      });
    }
  }
  return links.length > 1 ? links : undefined;
}

/**
 * @astrojs/sitemap always writes `sitemap-index.xml` plus numbered chunk
 * files; `filenameBase` only changes the prefix, not the structure. This
 * hook collapses the single chunk we produce into a plain `sitemap.xml`
 * so the URL matches what robots.txt already advertises.
 *
 * Must be registered AFTER sitemap() — Astro runs `astro:build:done`
 * hooks in integration declaration order, so the files must exist first.
 *
 * @returns {import('astro').AstroIntegration}
 */
function singleFileSitemap() {
  return {
    name: 'single-file-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const chunks = (await readdir(outDir))
          .filter(name => /^sitemap-\d+\.xml$/.test(name))
          .sort();

        if (chunks.length === 0) {
          throw new Error(
            'single-file-sitemap: no sitemap-N.xml chunk was generated. ' +
              'Did the sitemap() integration run before this one?'
          );
        }

        // Renaming chunk 0 while other chunks exist would silently drop
        // every URL in them — an invisible SEO regression. Fail loudly.
        if (chunks.length > 1) {
          throw new Error(
            `single-file-sitemap: expected exactly 1 chunk but found ${chunks.length} ` +
              `(${chunks.join(', ')}). The site has outgrown a single sitemap file; ` +
              'remove this integration and point robots.txt at sitemap-index.xml.'
          );
        }

        await rename(join(outDir, chunks[0]), join(outDir, 'sitemap.xml'));
        await rm(join(outDir, 'sitemap-index.xml'), { force: true });
        logger.info('Collapsed sitemap output into sitemap.xml');
      },
    },
  };
}

/**
 * Every built `index.html` as `{ path, html }`, with `path` the site-relative
 * URL (trailing slash). Shared by the post-build checks below.
 *
 * @param {URL} dir
 */
async function readBuiltPages(dir) {
  const outDir = fileURLToPath(dir);
  const files = (await readdir(outDir, { recursive: true }))
    .filter(name => name.endsWith('index.html'))
    .map(name => join(outDir, name));
  return Promise.all(
    files.map(async file => ({
      path: '/' + relative(outDir, file).split(sep).join('/').replace(/index\.html$/, ''),
      html: await readFile(file, 'utf-8'),
    }))
  );
}

/**
 * Lists every locale's ui.ts keys missing relative to English and fails the
 * build if a complete locale is missing any, or a locale in UI_PENDING is
 * missing a key outside its declared pending prefixes. Missing keys silently
 * fall back to English at runtime via t(), so without this a half-translated
 * island looks fine in review. Runs before rendering so it fails fast. Logic
 * and tests: src/lib/ui-coverage.ts.
 *
 * @returns {import('astro').AstroIntegration}
 */
function uiCoverageCheck() {
  return {
    name: 'ui-coverage-check',
    hooks: {
      'astro:build:start': ({ logger }) => {
        const reports = uiCoverage(translations, DEFAULT_LOCALE, UI_PENDING);
        for (const r of reports) {
          const parts = [coverageStatus(r)];
          if (r.extra.length) parts.push(`${r.extra.length} key(s) not in en: ${r.extra.join(', ')}`);
          logger.info(`${r.locale}: ${parts.join('; ')}${r.pending.length ? ' — ' + r.pending.join(', ') : ''}`);
        }
        const failing = reports.filter(r => r.violations.length);
        if (failing.length) {
          throw new Error(
            'ui-coverage-check: missing ui.ts keys\n' +
              failing.map(r => `  ${r.locale}${r.complete ? ' (marked complete)' : ''}: ${r.violations.join(', ')}`).join('\n')
          );
        }
      },
    },
  };
}

/**
 * Fails the build if any built page shows a literal `**` in its visible text:
 * markdown bold that CommonMark refused to render. It happens when the
 * delimiter sits between a letter and punctuation, which is common in ja/ko
 * prose (`も**$25,000**`). It looks fine in source, so only the built HTML
 * reveals it. Fix by using `<strong>…</strong>` in the markdown. Logic and
 * tests: src/lib/literal-markdown.ts.
 *
 * @returns {import('astro').AstroIntegration}
 */
function literalMarkdownCheck() {
  return {
    name: 'literal-markdown-check',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const pages = await readBuiltPages(dir);
        const hits = findLiteralBold(pages);
        if (hits.length > 0) {
          const total = hits.reduce((n, h) => n + h.count, 0);
          const shown = hits.slice(0, 25).map(h => `  ${h.page} (${h.count}): ${h.samples.join(' | ')}`);
          throw new Error(
            `literal-markdown-check: ${total} literal "**" on ${hits.length} page(s) — markdown bold ` +
              `that did not render. Use <strong>…</strong> instead:\n${shown.join('\n')}`
          );
        }
        logger.info(`No literal "**" in the visible text of ${pages.length} pages`);
      },
    },
  };
}

/**
 * Fails the build if any translated page links to an English URL whose
 * sibling in that page's own locale exists. This bug has shipped repeatedly —
 * via nav chrome, React islands, and hand-written prose links — and is
 * invisible on the page itself. It reads the built HTML, so it checks what
 * visitors and crawlers actually get; the logic and its tests live in
 * src/lib/localized-links.ts. Exempt a deliberate cross-language link (the
 * language switcher, "View the English version") with an `hreflang`
 * attribute on the <a>.
 *
 * @returns {import('astro').AstroIntegration}
 */
function localizedLinkCheck() {
  return {
    name: 'localized-link-check',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const pages = await readBuiltPages(dir);
        const hreflangToLocale = Object.fromEntries(LOCALES.map(l => [l.hreflang, l.code]));
        const siblings = buildSiblingMap(pages, localeCodes, hreflangToLocale, 'https://stockademarketsim.com');
        const stale = findStaleLinks(pages, siblings, localeCodes);
        if (stale.length > 0) {
          const shown = stale.slice(0, 25).map(s => `  ${s.page}: ${s.href} -> ${s.expected}`);
          if (stale.length > 25) shown.push(`  … and ${stale.length - 25} more`);
          throw new Error(
            `localized-link-check: ${stale.length} link(s) on translated pages point at an ` +
              `English URL that has a localized sibling:\n${shown.join('\n')}`
          );
        }
        logger.info(`No translated page links to an English URL with a localized sibling (${pages.length} pages)`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://stockademarketsim.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: LOCALES.map(l => l.code),
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: toSitemapLocaleMap(),
      },
      // robots.txt disallows these; they should not be advertised either.
      filter: page => !/\/(404|500)\/?$/.test(page),
      serialize(item) {
        const rawPath = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const path = rawPath.replace(localePrefixPattern, '') || '/';

        // Override whatever (if anything) @astrojs/sitemap's own identical-path
        // i18n matching produced for this URL — see the comment above
        // blogSlugMaps — with alternates computed from `translationOf`, which
        // is correct even when the en/localized slugs differ. Checked against
        // `rawPath` (locale prefix intact), not the locale-stripped `path`
        // below — an English, Spanish, and Portuguese blog post all reduce to
        // the same `/blog/{slug}` shape once stripped, so stripping first
        // would make them indistinguishable here.
        const translatedBlogMatch = translatedBlogLocales
          .map(locale => ({ locale, prefix: `/${locale}/blog/` }))
          .find(({ prefix }) => rawPath.startsWith(prefix) && rawPath !== prefix.slice(0, -1));
        if (translatedBlogMatch) {
          const { locale, prefix } = translatedBlogMatch;
          const localizedSlug = rawPath.slice(prefix.length);
          const enSlug = [...blogSlugMaps[locale].entries()].find(([, s]) => s === localizedSlug)?.[0];
          item.links = enSlug ? buildBlogLinks(enSlug) : undefined;
        } else {
          const enBlogMatch = rawPath.match(/^\/blog\/([a-z0-9-]+)$/);
          if (enBlogMatch) {
            item.links = buildBlogLinks(enBlogMatch[1]);
          }
        }

        if (path === '/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 1.0;
        } else if (path === '/simulator') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.9;
        } else if (path === '/blog') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.8;
        } else if (path.startsWith('/blog/')) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.7;
        } else if (
          ['/chart-simulator', '/markets', '/analytics'].includes(path)
        ) {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.8;
        } else {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.5;
        }

        // No lastmod: the only value available here is build time, which
        // would claim every page changed on every deploy. An absent
        // lastmod is better than a false one.
        return item;
      },
    }),
    singleFileSitemap(),
    localizedLinkCheck(),
    literalMarkdownCheck(),
    uiCoverageCheck(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
