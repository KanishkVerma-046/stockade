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

**Caveat found in the Batch 5 addendum below, after the blog corpus was complete:** "recognizes"
here means *identical path after stripping the locale prefix* — `@astrojs/sitemap`'s own i18n
matching cannot pair two sitemap entries whose paths differ, which every localized-slug blog post
does by design (§ blog slugs are chosen independently per locale, linked via a `translationOf`
field rather than a shared path). `astro.config.mjs`'s `serialize()` now overrides this for every
`/blog/*` URL using that same `translationOf` data, read directly from `blog-es/*.md` frontmatter.
Any *other* future page type with locale-independent slugs will need the same treatment — this
auto-detection only works out of the box when the path is identical across locales, as it is for
every static page and app shell today.

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

## Phase 2 addenda (2026-09-01) — About, Contact, Markets, Analytics, Simulator, Chart Simulator → Spanish

Phase 2 translated the 6 remaining non-legal, non-blog static/marketing pages into Spanish
using this same architecture, with no changes to routing, hreflang, or the sitemap i18n config.
Three things surfaced during that work that change or refine what's documented above:

### `localizedHref()` — Navbar/Footer nav links are not automatically locale-aware

§7-8 above didn't cover this: `Navbar.astro` and `Footer.astro` originally hardcoded their nav
link `href`s to unprefixed English paths (`/simulator`, `/markets`, ...), and `Footer.astro`'s
link *labels* were hardcoded English string literals, never routed through `t()`. This meant
that even on the phase-1 homepage, a Spanish visitor's primary navigation pointed back to
English pages regardless of page-body translation.

Fixed in phase 2 via `localizedHref(enPath, locale)` in `src/i18n/alternates.ts`: given an
English site-relative path, it returns the matching locale path if one is registered, else the
English path unchanged. `Navbar`/`Footer` now call it per link instead of hardcoding hrefs;
`Footer`'s link arrays now read labels via `t()` (new `footer.nav.{about,contact,privacy,terms,
disclaimer}` keys — `simulator`/`chartSimulator`/`markets`/`analytics`/`learn` already existed).

**This adds a step future translation work must not skip:** a page's `X_ALTERNATES` constant
existing in `alternates.ts` is not sufficient on its own. It must also be added to the `REGISTRY`
array in that same file, or `localizedHref()` keeps resolving to the English URL sitewide even
after the Spanish page is live — the page itself works fine if visited directly, but every nav
link *to* it, on every page, silently keeps sending Spanish visitors to English. Per-page
checklist going forward: alternates constant **+ registry entry**, new `es/X.astro` file, English
page's `alternates` prop, and a pass over existing `/es/*` pages for stale links to `X`'s English
URL that should now point at its Spanish sibling.

Internal in-body prose links between Spanish pages follow the same rule: link to the Spanish
sibling wherever one exists (checked against `REGISTRY`), falling back to the English URL only
for content that stays untranslated (blog posts, legal pages). This was applied retroactively to
`es/index.astro`'s original links to `/simulator`, `/markets`, `/analytics`, `/chart-simulator`,
which phase 1 necessarily pointed at English pages since no Spanish siblings existed yet.

### `nav.analytics`: "Analítica" → "Análisis"

Phase 1's `ui.ts` used "Analítica" for the Analytics nav label — a direct cognate of the English
word, not checked against how real Spanish-language trading products label the same feature.
Phase 2 spot-checked this: IG España's own performance-review tool is named "análisis de
trading," and eToro's Spanish help content describes the same kind of feature as "análisis de
rendimiento de cartera" — both favor the noun "análisis," not "analítica," for this category.
Corrected `nav.analytics` to "Análisis" and swept every other homepage occurrence of
"analítica"/"Analítica" referring to this same feature (FAQ answer, the SoftwareApplication
JSON-LD `featureList`, a feature-card title, SEO prose, a feature bullet) to match, so the term
doesn't mean two things in two places. Any future locale's analytics nav label should get the
same spot-check against real products in that language rather than defaulting to the nearest
cognate.

### Accepted limitation: translated page copy wraps an untranslated React app

`markets.astro`/`analytics.astro`/`simulator.astro`/`chart-simulator.astro` each embed a React
island (`MarketsView`, `AnalyticsDashboard`, `TradingSimulator`, `ChartSimulator`) that takes zero
props and renders its own internal UI entirely in English — table headers, buttons, tooltips,
pattern names, panel labels — per the existing non-goal against translating island internals.
Phase 2 confirmed this boundary is structurally clean (no prop channel exists for page-level
translation to leak into or out of island territory), but the practical result is: a Spanish
visitor on any of these four `/es/` pages sees translated surrounding copy — headings, intro
prose, the how-to-use sections — wrapped around an English-language interactive app. The
how-to-use prose on `simulator.astro`/`chart-simulator.astro` deliberately keeps certain terms in
English for this reason (button labels `Buy`/`Sell`/`Flatten`, the `Working Orders` panel,
keyboard shortcuts B/S/F, the `Patterns` panel, and every candlestick pattern name like Doji or
Bullish Engulfing) — those are literal quotes of what's actually on screen, not translation
gaps. This is documented as an accepted limitation of the current phase, not a bug to fix later
without a broader decision to translate the island UIs themselves.

## Phase 3 addenda (2026-09-01) — blog i18n infrastructure + 2-post Spanish checkpoint

Phase 3 scoped and began translating the 20-post blog corpus into Spanish, starting with
infrastructure plus a 2-post checkpoint — a conceptual/prose-heavy post and a technical/
jargon-dense one, translated as `guia-de-paper-trading` and
`indicador-rsi-sobrecompra-sobreventa` — before batching the remaining 18. Legal pages (`/privacy`,
`/terms`, `/disclaimer`) were scoped as a separate, higher-stakes track: the user chose a
professional/reviewed translation over the same AI-translation process used for marketing copy
and the blog, and declined a "this translation is not authoritative" notice — legal translation
work has not started as of this addendum.

**Blog structure:** a mirrored `blogEs` content collection (`src/content/blog-es/*.md`, schema
shared with `blog` via a factored-out `blogSchema` in `src/content.config.ts`, plus a required
`translationOf` field) with its own routes at `src/pages/es/blog/index.astro` and
`src/pages/es/blog/[slug].astro`, chosen over adding a `locale` field to the existing `blog`
collection — consistent with how every other translated page in this project is a separate file
per locale, and it leaves the schema the other 18 English posts already rely on untouched.

**Slugs are localized, not copied from English** — a course-correction from this addendum's first
draft, which reused the English filename/id for the Spanish post (`/es/blog/paper-trading-guide/`)
purely as a matching-key convenience. Caught before deploy, while only 2 posts existed: unlocalized
slugs mean Spanish search terms never appear in the URL, which costs ranking and how other
Spanish-language sites would naturally link to these pages — worth fixing immediately since the
cost of changing it only grows with every post translated under the old scheme. Each Spanish post's
id is now an independently-chosen Spanish slug; `translationOf` names the id of the English post it
translates, and that field — not filename equality — is what the `[slug]` routes match on to
compute per-post hreflang alternates, only once both sides exist. No manual per-post bookkeeping
elsewhere is required as more posts get translated; each new post just needs `translationOf` set
correctly in its own frontmatter.

**Shared blog chrome had to become locale-aware.** `BlogPost.astro`, `RelatedPosts.astro`, and
`TableOfContents.astro` render for both `/blog/*` and `/es/blog/*` from the same component, unlike
the static pages (which are wholly separate files per locale). Each now reads
`Astro.currentLocale` directly and calls `t()` for its chrome strings ("On this page", "Learning
Center", "min read", "Keep learning", plus the `<nav aria-label>`) — four new `blog.*` keys added
to `ui.ts` — rather than taking a `locale` prop threaded down from the page. `BlogPost.astro`'s
canonical URL, Article JSON-LD `inLanguage` (schema.org `language-TERRITORY` form, e.g. `es-ES`,
derived from the same `LOCALES` table as `og:locale` — not a second hardcoded map), and the "Keep
learning"/related-post links all switch on that same locale lookup rather than assuming `/blog/`.
Both `post`/`posts` prop types across these three files were also changed from
`CollectionEntry<'blog'>` to a local structural interface, since a Spanish page passes
`CollectionEntry<'blogEs'>` entries through the same components — matching the structural-typing
approach `src/lib/related-posts.ts`'s `pickRelated()` already used, for the same reason (also keeps
these files free of an `astro:content` import, so `pickRelated` itself needed no changes).

**RelatedPosts policy (confirmed deliberate, not incidental):** the component is strictly
locale-scoped — it only ever ranks posts from the current page's own collection (`blogEs` on
`/es/blog/*`, `blog` on `/blog/*`), never falling back to the other language. There is no minimum
tag-overlap threshold: with only 2 Spanish posts sharing zero tags, `pickRelated()`'s documented
"no shared tags degrades to most-recent" behavior still surfaces the other one as "Sigue
aprendiendo" — accepted as correct for now rather than suppressed, since quality improves on its
own as the corpus grows and a language-mixed fallback would undercut the point of translating in
the first place. The section still disappears entirely when zero other posts exist in that locale.

**Registry:** `BLOG_ALTERNATES = { en: '/blog/', es: '/es/blog/' }` was added to
`src/i18n/alternates.ts`'s `REGISTRY` per the standing checklist (now in `CLAUDE.md`) — this alone
made the existing `nav.learn` link in `Navbar`/`Footer` resolve to `/es/blog/` for Spanish visitors
without any change to those two files. Per-post alternates are deliberately **not** added to
`REGISTRY` — only the blog index needs a nav-link-resolvable entry there; individual post alternates
are page-specific and computed dynamically as described above.

**Terminology notes for future blog posts:** indicator/pattern names and loanwords already
established on the static pages carried over directly — RSI, MACD, EMA, VWAP, and "paper trading"
and "drawdown" stay in English; "win rate" → "tasa de acierto", "profit factor" → "factor de
beneficio", "equity curve" → "curva de capital", "trade journal" → "diario de operaciones",
"position sizing" → "tamaño de posición" (confirmed against `es/analytics.astro`'s existing link
text), "overbought"/"oversold" → "sobrecompra"/"sobreventa", order type names (market/limit/
stop-loss/OCO/bracket) follow `es/about.astro`'s existing precedent (stop-loss and OCO/bracket stay
in English, market → "mercado", limit → "límite"). Blog frontmatter `tags` are translated per post
(e.g. "Basics" → "Fundamentos") since the tag pills are locale-specific UI, not a cross-collection
taxonomy — `pickRelated()` only ever compares tags within one locale's own post list.

**Batch 1 (2026-09-01):** macd-explained → `macd-explicado`, moving-averages-ema-vs-sma →
`medias-moviles-ema-vs-sma`, understanding-trading-volume → `entendiendo-el-volumen-de-trading`,
vwap-trading-strategy → `estrategia-vwap` — the indicator/technical-analysis cluster, chosen to
extend the RSI checkpoint's terminology directly. Caught and fixed one drift before it spread:
the paper-trading-guide checkpoint had used "llenados parciales" for "partial fills", but
`es/simulator.astro` had already established "ejecuciones parciales" for the same concept — fixed
in both the published checkpoint post and the still-unpublished legal disclaimer draft. 6 of 20
posts now translated; batches 2-5 remain (charting/analytics, strategy/psychology, order
mechanics, asset-class intros — see the batching plan in conversation history for the full
grouping and rationale).

**Batch 2 (2026-09-01):** how-to-read-candlestick-charts → `como-leer-graficos-de-velas`,
support-and-resistance-levels → `soporte-y-resistencia`, analyze-trading-performance-metrics →
`analiza-tus-metricas-de-rendimiento`, risk-management-position-sizing →
`gestion-de-riesgo-y-tamano-de-posicion` — the charting/analytics cluster. Two things worth
recording:

Candlestick pattern names (Doji, Hammer, Shooting star, Marubozu, Bullish/Bearish engulfing,
Harami, Morning/Evening star, hanging man) were kept in English throughout
`como-leer-graficos-de-velas.md`, deliberately not translated to "Martillo"/"Envolvente
alcista"/etc. — `es/chart-simulator.astro` had already established these same pattern names stay
in English there, since they're literal labels in the chart simulator's Patterns panel (an
untranslated React island, per the accepted-limitation note above). Translating them in the blog
post would have described the same on-screen patterns two different ways in the same language.

Before translating `analiza-tus-metricas-de-rendimiento.md`, `es/analytics.astro` was read first —
it already had a detailed Spanish explanation of every metric this post covers (G/P Total,
Capital, Tasa de Acierto, Factor de Beneficio, Ganancia Promedio, Drawdown Máximo, Curva de
capital, Diario de operaciones, Mapa de calor por horario), written when that page was translated
in phase 2. Those exact labels were reused rather than re-derived. Also swept during this batch:
two stale links missed at checkpoint/Batch-1 time (`es/index.astro` still pointed to
`/blog/paper-trading-guide` instead of its now-live Spanish sibling, `es/markets.astro` likewise
for `understanding-trading-volume`) — a reminder that the stale-link sweep needs to check **every**
existing `/es/*` page after every batch, not just the pages touched by that batch.

10 of 20 posts now translated; batches 3-5 remain (strategy/psychology, order mechanics,
asset-class intros).

**Batch 3 (2026-09-01):** how-to-build-a-trading-plan → `como-construir-un-plan-de-trading`,
common-day-trading-mistakes → `errores-comunes-de-day-trading`, day-trading-vs-swing-trading kept
its own slug unchanged (both terms are already-established loanwords, so the English slug already
reads as the natural Spanish search phrase), what-is-a-stock-market-simulator →
`que-es-un-simulador-de-mercado-de-valores` — the strategy/psychology cluster. Two things worth
recording:

Before translating `que-es-un-simulador-de-mercado-de-valores.md`, `es/index.astro`'s FAQ array was
read first, per an explicit instruction — the FAQ already has a canonical answer to "¿Qué es un
simulador de mercado de valores?" plus adjacent Q&As on risks, limitations, and the main advantage
of using one. That established phrasing (e.g. "una plataforma de trading virtual que replica las
condiciones reales del mercado usando dinero ficticio... sin riesgo financiero", "$100,000 en
capital virtual", the risks list — slippage, comisiones del bróker, presión psicológica del dinero
real) was reused verbatim in the blog post's definitional and limitations sections rather than
re-derived, so the homepage and this post describe "what a simulator is" the same way in Spanish.

Full sweep of every `/es/*` page (not just topically related ones, per the fix from Batch 2)
turned up no new stale links this round — the two found last batch were the only ones outstanding.

14 of 20 posts now translated; Batches 4-5 remain (order mechanics, asset-class intros).

**Batch 4 (2026-09-01):** market-orders-vs-limit-orders → `ordenes-de-mercado-vs-ordenes-limite`,
stop-loss-orders-explained → `ordenes-stop-loss-explicadas`, oco-and-bracket-orders →
`ordenes-oco-y-bracket` — the order-mechanics cluster, new terminology territory as anticipated
going in. `es/simulator.astro`'s actual order-panel copy was read first (per an explicit
instruction) and supplied several exact phrases that carried straight into these three posts
rather than being re-derived: "orden de mercado"/"orden límite", "órdenes en espera",
"orden límite ejecutable" (for "marketable limit order" — `es/simulator.astro` already uses
"ejecutable" for this exact concept), "bracket OCO", "spread entre compra y venta", "ejecuciones
parciales", "posición en la cola" (queue position), and the whole "what Stockade's near-frictionless
fills don't model" framing (no slippage, no partial fills, checked against a new price every 800ms,
booked at the crossing tick). Order type names that stay in English on the actual order ticket
(stop-loss, take-profit, Buy/Sell/Flatten, Working Orders) stay in English in the prose too, same
rule as the candlestick pattern names in Batch 2. "bid"/"ask" had no prior precedent anywhere on
the site — kept as English loanwords, consistent with how RSI/MACD/VWAP/stop-loss/take-profit are
handled, rather than translating to "precio de compra"/"precio de venta".

Full `/es/*` sweep found three stale links this round, all in `es/simulator.astro` (its own
order-panel walkthrough links to all three of this batch's posts) — fixed.

17 of 20 posts now translated; Batch 5 (asset-class intros: crypto-trading-for-beginners,
forex-trading-for-beginners, futures-trading-explained) remains, then the corpus is complete.

**Batch 5 (2026-09-01) — final batch, blog corpus complete:** crypto-trading-for-beginners →
`trading-de-cripto-para-principiantes`, forex-trading-for-beginners →
`trading-de-forex-para-principiantes`, futures-trading-explained →
`trading-de-futuros-explicado` — the asset-class intro cluster. Terminology already established on
`es/markets.astro`/`es/about.astro`/`es/index.astro` carried over directly: "cripto", "forex",
"futuros", "par(es) de forex/divisas", "contrato(s) de futuros", ticker groups quoted with their
literal slash prefixes (/NQ, /ES, /CL, /GC) matching the on-screen symbols. All 20 posts are now
translated. Full verification: build, `astro check` (only the pre-existing known error),
`npm test` (34/34), a live preview spot-check of all three new routes plus `/es/blog/` and
`/sitemap.xml`, and a complete `/es/*` stale-link sweep (clean — nothing referenced any of these
three posts by English URL from elsewhere on the site).

**Sitemap hreflang bug found and fixed.** Confirming all 20 English posts had reciprocal
`hreflang="es"` on their own pages (they did) surfaced a separate, previously-unnoticed gap:
`@astrojs/sitemap`'s built-in i18n auto-pairing (`node_modules/@astrojs/sitemap/dist/utils/
parse-i18n-url.js`) only links two sitemap entries as alternates when their paths are **identical**
after stripping the locale prefix. Every localized-slug post pair therefore got zero `xhtml:link`
alternates in `sitemap.xml` — only `day-trading-vs-swing-trading` (the one post that happened to
keep an unlocalized slug) was ever auto-paired. This was silent: each page's own `<link
rel="alternate">` tags were correct throughout (those come from our `alternates` prop via
`HreflangLinks.astro`, computed independently via `translationOf`), so nothing in the earlier
per-batch verification passes would have caught it — the gap was sitemap-only. `astro.config.mjs`
now reads every `blog-es/*.md`'s `slug`/`translationOf` frontmatter directly at build time (outside
the Vite/content-layer runtime, so `astro:content` isn't available in config code — a small regex
read was simpler than routing around that) to build an en↔es slug map, and `serialize()` injects
the correct `xhtml:link` pair for every blog post URL, overriding whatever `@astrojs/sitemap`'s own
matching did or didn't produce. Verified after the fix: all 40 blog URLs (20 en + 20 es) carry
alternates in `sitemap.xml`, and spot-checked values match the per-page `<link>` tags exactly. This
was a real, if secondary, SEO signal gap — per-page hreflang is the primary signal search engines
use, but the sitemap-level signal is meant to reinforce it, not silently disagree by omission.

**Slug-naming guideline for future posts:** pick a natural Spanish rendering of the English slug's
subject, keeping established loanwords/acronyms as-is (`guia-de-paper-trading`, not
`guia-de-comercio-en-papel`; `indicador-rsi-...`, not translating "RSI"). No formal keyword
research was done for the 2 checkpoint slugs — this is a reasonable-default naming pass, not an SEO
audit — but the id must always be set as the frontmatter `translationOf` value on the matching
English post's id, never left to be inferred.

## Rollout strategy (current decision — not dated history, keep this section updated)

Spanish is complete across every page in scope: the homepage, all 6 non-legal static/app pages, and
all 20 blog posts (finished 2026-09-01). The only English-only content left on the site is the two
explicit non-goals (`/404`, `/500`) and the legal pages (`/privacy`, `/terms`, `/disclaimer`),
which are intentionally on a separate, professional-review track — see the Phase 3 addenda above
for that status.

Before any of the other 6 registered-but-unused languages (ja, fr, de, pt, ko, it) get a single
translated page, revisit legal pages first (professional review, not the AI-translation process
used for the rest of the site). This was a deliberate sequencing decision, not an oversight: one
fully-translated language is more valuable (and easier to keep consistent) than partial coverage
spread thin across seven. Do not re-open "should we start language N instead" per-session —
revisit this only if the user explicitly asks to change strategy.

The permanent, non-dated checklist for adding any translated page (registry step included) now
lives in the project's `CLAUDE.md` under `## i18n`, since that file is loaded into every session
automatically — treat it as the source of truth for the mechanical steps, and this doc as the
source of truth for architecture and decision history.
