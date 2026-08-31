# i18n Infrastructure — Design

**Date:** 2026-08-31
**Status:** Approved for planning

## Goal

Give stockademarketsim.com the technical foundation for multi-language SEO: URL routing,
hreflang markup, and translatable shared chrome (Navbar/Footer/CookieConsent) for 7 new
languages — Español (es), 日本語 (ja), Français (fr), Deutsch (de), Português (pt, Brazilian),
한국어 (ko), Italiano (it) — alongside the existing English default. This is infrastructure
only: it also ships one real translated page (the homepage, in Spanish) as an end-to-end
proof-of-concept that routing/hreflang/switcher/chrome-fallback actually work together.

Translating the remaining 13 pages, the 20-post blog, and the 4 React trading-app UIs into
all 7 languages is explicitly **out of scope** and deferred to future phases, each to be
brainstormed and planned separately once this foundation lands.

## Explicit non-goals (this phase)

- No browser-language auto-detection or redirect. Static, no-backend site — an
  Accept-Language redirect would need client-side JS or edge logic; users switch language
  explicitly via the switcher. Revisit only if requested later.
- No translated 404/500 pages.
- No translated legal pages (`/privacy`, `/terms`, `/disclaimer`). The cookie-consent banner's
  privacy link stays pointed at the English `/privacy/` regardless of active locale.
- No blog i18n (routing, content-collection schema changes, or translated posts).
- No translation of the 4 React app islands' internal UI strings (Simulator, Chart Simulator,
  Markets, Analytics) beyond what's needed for the homepage PoC (none of those apps are on
  the homepage).
- `SiteSchema.astro`'s JSON-LD `inLanguage: 'en-US'` is left unchanged — it's a single
  site-wide entity, not a per-page ranking signal like hreflang. Revisit once enough pages
  are translated that the claim is misleading.
- No deploy. Build/preview locally only; nothing goes to Cloudflare Pages until explicitly
  told to.

## Constraints

- Astro 7, static output, `trailingSlash: 'always'`. No backend.
- Existing English URLs must not change — no redirects, no lost SEO equity. English stays
  unprefixed at `/`.
- `Layout.astro` and `AppLayout.astro` have no shared head partial; every head-level change
  (hreflang links, `lang` attribute, `og:locale:alternate`) must be made in both.
- `compressHTML` deletes a whitespace run containing a newline at a tag boundary — translated
  copy with inline `<strong>`/`<em>` must keep the adjacent space on the same source line.
  Verify translated pages in `dist/`, not just source.
- Design must not block future incremental translation: adding a new language or page must
  not require touching more files than strictly necessary (see centralized alternates below).

## Architecture

### 1. Astro i18n routing config

`astro.config.mjs`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
  routing: { prefixDefaultLocale: false },
},
```

Translated pages are real files under `src/pages/{locale}/...`, mirroring the existing
structure (e.g. `src/pages/es/index.astro`). A locale folder that doesn't exist for a given
page 404s automatically — nothing goes live until actually translated, matching the
incremental-rollout requirement with no custom fallback logic. `Astro.currentLocale` is
populated automatically from the matched route; no manual locale prop-threading needed for
that.

### 2. Locale registry — `src/i18n/locales.ts`

Single source of truth for locale metadata:

| code | native name | hreflang | og:locale |
|---|---|---|---|
| en | English | en | en_US |
| es | Español | es | es_ES |
| ja | 日本語 | ja | ja_JP |
| fr | Français | fr | fr_FR |
| de | Deutsch | de | de_DE |
| pt | Português | pt-BR | pt_BR |
| ko | 한국어 | ko | ko_KR |
| it | Italiano | it | it_IT |

Exports a typed `Locale` union, an ordered `LOCALES` array of `{ code, nativeName, hreflang,
ogLocale }`, and `DEFAULT_LOCALE = 'en'`.

`hreflang` values are **bare language codes** (`es`, `ja`, `fr`, `de`, `ko`, `it`) except
`pt`, which is `pt-BR` — a deliberate exception, since "Portuguese" without a region is
ambiguous and Brazilian was explicitly chosen. This is the single source of truth for
hreflang specificity: every consumer (page `<link>` tags, the sitemap, `<html lang>`) reads
`hreflang` from this table rather than hand-typing its own locale-code map, so they cannot
drift out of sync with each other the way the sitemap example did in an earlier draft of this
doc.

`ogLocale` values are always region-tagged (`es_ES`, `ja_JP`, ...) because the Open Graph
`og:locale` field has no bare-language form — the spec's format is always `language_TERRITORY`.
**`es_ES` here is a placeholder for infra-testing purposes only, not a considered decision.**
Which Spanish variant (Iberian vs. Latin American) to actually target is a content/SEO call
that belongs to the future Spanish-translation phase, once real copy and keyword targeting are
being decided — this infra spec deliberately does not make that call. Whoever picks it up next
should treat `es_ES` as unconfirmed and revisit it deliberately rather than assume it was
chosen on purpose.

### 3. hreflang — `src/components/layout/HreflangLinks.astro`

Included in both `Layout.astro` and `AppLayout.astro`'s `<head>`. Prop: `alternates?:
Record<Locale, string>` (locale → site-relative path). For each entry, the component looks up
that locale's `hreflang` value from `LOCALES` (§2) and emits:

```html
<link rel="alternate" hreflang="{hreflang}" href="{absolute url}" />
```

plus one `hreflang="x-default"` pointing at the English URL. If `alternates` is absent/empty
(true for nearly every page right now), the component renders nothing — hreflang is only
meaningful with 2+ language versions of a page.

### 4. Centralized per-page alternates — `src/i18n/alternates.ts`

To avoid alternates drifting across the English original and its translated siblings, each
logical page's alternate set is declared **once** and imported by every locale variant of
that page:

```ts
export const HOME_ALTERNATES = { en: '/', es: '/es/' } as const;
```

`src/pages/index.astro` and `src/pages/es/index.astro` both import and pass
`HOME_ALTERNATES`. Adding French later means adding one key to this constant and creating
`src/pages/fr/index.astro` — the two existing pages pick it up automatically without being
touched again.

### 5. Sitemap

`@astrojs/sitemap` gets an `i18n` option, built **from the `LOCALES` registry (§2)** rather
than a second hand-typed map — this is the fix for the mismatch flagged in review, where an
earlier draft had the sitemap using fully region-tagged values (`es-ES`, `ja-JP`, ...) while
the page `<link>` tags used bare codes, so the same URL pair would have advertised two
different specificities for the same locale:

```js
import { LOCALES } from './src/i18n/locales.ts';

const sitemapLocales = Object.fromEntries(LOCALES.map(l => [l.code, l.hreflang]));
// { en: 'en', es: 'es', ja: 'ja', fr: 'fr', de: 'de', pt: 'pt-BR', ko: 'ko', it: 'it' }

sitemap({
  i18n: {
    defaultLocale: 'en',
    locales: sitemapLocales,
  },
  // ...existing filter/serialize
})
```

so `sitemap.xml` auto-emits `xhtml:link` alternates for translated URL pairs it recognizes,
using the exact same hreflang values as `HreflangLinks.astro`. Verify against built
`dist/sitemap.xml` that these values match the per-page `<link>` tags exactly.

### 6. Shared chrome translation — `src/i18n/ui.ts`

Dictionary: `translations: Record<Locale, Record<UiKey, string>>` covering nav labels, the
"Start Trading" CTA, footer column headers + legal blurb, cookie-consent copy, and
aria-labels for the theme/fullscreen/mobile-menu buttons. Helper:

```ts
export function t(locale: Locale, key: UiKey): string {
  return translations[locale]?.[key] ?? translations.en[key];
}
```

Falls back to English per-key, so a partially-translated locale (or a newly added UI string)
never breaks — it just silently shows English for that one string until filled in.

`Navbar.astro`, `Footer.astro`, and `CookieConsent.astro` read `Astro.currentLocale` and call
`t()` for every visible string instead of today's hardcoded literals.

### 7. Language switcher — `src/components/layout/LanguageSwitcher.astro`

Prop: same `alternates` shape as `HreflangLinks`. Renders nothing if fewer than 2 versions of
the current page exist. Otherwise a small dropdown listing each available locale by native
name, linking to its URL, current locale marked active/disabled. Mounted inside `Navbar.astro`
(both `compact` and full variants), which gains an `alternates` prop to pass through.

### 8. Layout wiring

`Layout.astro` and `AppLayout.astro` both gain an `alternates?: Record<Locale, string>` prop,
threaded to `HreflangLinks` and `Navbar`. Both also:

- Switch `<html lang="en">` to `<html lang={currentHreflang}>`, where `currentHreflang` is
  looked up from `LOCALES` (§2) by `Astro.currentLocale` — **not** `Astro.currentLocale`
  used directly. `Astro.currentLocale` resolves to the bare config code (`pt` for Portuguese),
  which would mismatch the `pt-BR` already used in hreflang links and `og:locale`. Routing the
  lookup through the same registry entry everything else reads means Portuguese gets
  `lang="pt-BR"` automatically, with no locale-specific special case hardcoded in the layout —
  it falls out of the one table by construction, the same way the sitemap fix above does.
- Add `<meta property="og:locale:alternate" content="{ogLocale}">` per alternate, alongside
  the existing single `og:locale`.

### 9. Proof-of-concept: homepage → Spanish

- `src/pages/index.astro`: add `alternates={HOME_ALTERNATES}` prop to `<Layout>`.
- `src/pages/es/index.astro` (new): homepage translated into Spanish — visible copy, meta
  title/description, the `faqs` array (rendering both the visible FAQ section and FAQPage
  JSON-LD from one source, per existing convention), SoftwareApplication JSON-LD. Same
  `alternates={HOME_ALTERNATES}` prop.

This exercises every piece of the design: routing, hreflang reciprocity, sitemap alternates,
the language switcher, the shared-chrome fallback dictionary, and `lang`/`og:locale`.

## Testing

1. `npm run build`.
2. Inspect `dist/es/index.html` — renders correctly, `lang="es"`, Spanish nav/footer/cookie
   banner text, correct hreflang set (including `x-default` and self-reference) and
   `og:locale`/`og:locale:alternate`.
3. Inspect `dist/index.html` — still English, now carries reciprocal hreflang to `/es/`.
4. Inspect `dist/sitemap.xml` — `/` and `/es/` entries carry matching `xhtml:link` alternates.
5. Switcher round-trips between `/` and `/es/` correctly in both directions.
6. Every other existing page still renders unchanged (no `alternates` prop → no hreflang
   output, English chrome via fallback).
7. `npx astro check` — no new errors beyond the pre-existing `ChartSimulator.tsx:670` one.
8. No deploy step. Build/preview only.
