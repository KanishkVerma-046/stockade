// @ts-check
import { rename, readdir, rm } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALES, DEFAULT_LOCALE, toSitemapLocaleMap } from './src/i18n/locales.ts';

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
const translatedBlogLocales = ['es', 'pt', 'ja'];
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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
