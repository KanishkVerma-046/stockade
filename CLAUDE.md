## Project

**Stockade** — free live stock & crypto trading simulator. No signup, no backend, all state in localStorage/React state.

- Domain: stockademarketsim.com | Tagline: "Practice the market. Master the game."
- GitHub: https://github.com/KanishkVerma-046/stockade

## Stack

- **Astro 7** (static output) + `@astrojs/react` islands (`client:load`)
- **Tailwind CSS v4** via `@tailwindcss/vite` Vite plugin — NOT `@astrojs/tailwind`; configured in `astro.config.mjs` under `vite.plugins`
- **lightweight-charts v5.2** — uses `chart.addSeries(CandlestickSeries, opts)` API (not the old `addCandlestickSeries()`)
- **nanostores** + `@nanostores/react` for cross-island state

## Pages

| Route | Component | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing: TickerTape + LiveStats islands; SoftwareApplication + FAQPage JSON-LD |
| `/simulator` | `TradingSimulator.tsx` | Paper trading, keyboard B/S/F; 800ms live ticks or candle-by-candle replay |
| `/chart-simulator` | `ChartSimulator.tsx` | Candlestick-pattern replay, 20+ detected patterns |
| `/markets` | `MarketsView.tsx` | 29 assets, filterable/sortable |
| `/analytics` | `AnalyticsDashboard.tsx` | Equity curve, trade journal, heatmap |
| `/blog`, `/blog/[slug]` | `BlogPost.astro` | Content collection, 20 posts |
| `/about` `/contact` `/privacy` `/terms` `/disclaimer` `/404` `/500` | — | Static pages |

`LiveSimulator.tsx` exists but is not routed or imported anywhere — dead code.

## Layouts

- `Layout.astro` — content pages; the page supplies its own Navbar/Footer
- `AppLayout.astro` — full-height app shells (`/simulator`, `/chart-simulator`, `/markets`, `/analytics`); brings its own Navbar + TickerTape, optional `below` slot for static prose under the app
- **`<head>` edits must be made in BOTH** — there is no shared head partial
- `SiteSchema.astro` emits WebSite + Organization JSON-LD with stable `@id`s on every page; page-level schema references those by `@id` instead of restating them
- `trailingSlash: 'always'`; both layouts normalise `canonical` to end in `/`
- `public/og-image.png` (1200×630) is the social card for every page — the `ogImage` default in both layouts plus the Article JSON-LD image in `BlogPost.astro`. `web-app-manifest-512x512.png` is the PWA/maskable icon and the Organization `logo` only; never the og:image

## Astro gotchas

- **`compressHTML` deletes a whitespace run containing a newline at a tag boundary.** A space before/after `<strong>`/`<em>` must sit on the *same line* as the tag, or the words render joined ("long,Sell"). Invisible in source — check `dist/`
- **An HTML comment directly before a `set:html` script inside `<Fragment slot="head">` fails to compile** (`[CompilerError] Unexpected token`). Use `{/* … */}` instead
- `src/pages/index.astro` has four `{[ … ].map()` blocks — anchor scripted edits to the enclosing `<section>`, never the first match
- git restores these files with CRLF; any script doing text surgery must normalise line endings first

## Content

Blog posts live in `src/content/blog/*.md`; schema in `src/content.config.ts`.

- `description` is capped at 160 chars — **exceeding it is a hard build failure**, on purpose
- `draft: true` drops the post from the index, sitemap, related posts, and routing
- `author` (default `"Stockade Team"`) drives both the visible byline and the `article:author` meta tag; Article JSON-LD credits the shared Organization node by `@id` instead, so no individual is named

The home page FAQ lives in **one `faqs` array** in `index.astro` frontmatter that renders both the visible section and the FAQPage JSON-LD. Google only grants FAQ rich results on a verbatim match, so never hand-write a second copy.

## i18n

Spanish (`es`) and Portuguese (`pt`, pt-BR) are **both complete**: the homepage, all 6 static/app pages (about, contact, markets, analytics, simulator, chart-simulator), and all 20 blog posts, in each locale. Only `/privacy`, `/terms`, `/disclaimer` (professional-review track, not started — see the design doc's rollout-strategy note before starting them) and the explicit non-goals `/404`/`/500` remain English-only. Infra also registers ja/fr/de/ko/it but no content exists in them yet. Full architecture and per-batch history: `docs/superpowers/specs/2026-08-31-i18n-infrastructure-design.md`.

`astro.config.mjs`'s sitemap `serialize()` reads every translated-locale blog directory's (`blog-es/*.md`, `blog-pt/*.md`) `slug`/`translationOf` frontmatter directly (outside the content-layer runtime, so a small regex read stands in for `astro:content`) to inject correct `xhtml:link` hreflang alternates for blog post pairs in `sitemap.xml` — `@astrojs/sitemap`'s own i18n auto-pairing only works when a URL's path is byte-identical across locales after stripping the locale prefix, which localized slugs break by design. The locale list this reads from is the `translatedBlogLocales` array at the top of the sitemap config — add a new code there once that locale's `blog-{code}` directory exists. Any future page type with per-locale-independent slugs needs the same manual override; see the design doc's §5 caveat.

Translated blog posts live in mirrored `blogEs`/`blogPt` content collections (`src/content/blog-{es,pt}/*.md`, same schema as `blog` plus a required `translationOf` field, defined in `src/content.config.ts`) with their own routes at `src/pages/{locale}/blog/index.astro` and `src/pages/{locale}/blog/[slug].astro` — not a `locale` field on the English collection. **Translated posts use localized slugs** (the filename/id, e.g. `guia-de-paper-trading` in Spanish, `medias-moveis-ema-vs-sma` in Portuguese, is independently chosen for the target-language keyword, not copied from English) — `translationOf` names the id of the English post being translated, and the `[slug]` routes match on that field to compute per-post hreflang alternates (up to three-way: en + whichever of es/pt also have a sibling) once both sides exist. `BlogPost.astro`, `RelatedPosts.astro`, and `TableOfContents.astro` are shared across all locales and read `Astro.currentLocale` directly for their chrome text (via `ui.ts`) rather than taking a locale prop. `RelatedPosts` is deliberately locale-scoped with no minimum tag-overlap threshold and no cross-language fallback — it shows whatever other posts exist in the current locale's collection (ranked by shared tags, degrading to most-recent when none), and disappears only when there are zero others.

**Checklist for adding any translated page** (skipping step 2 is the one mistake that's bitten this project before — the page renders fine standalone, but every nav link *to* it, on every page, keeps silently sending that locale's visitors to the English URL):
1. Add a `{PAGE}_ALTERNATES` constant to `src/i18n/alternates.ts`.
2. Add that constant to the `REGISTRY` array in the same file — this is what makes `localizedHref()` (used by `Navbar`/`Footer`) resolve to the translated URL instead of falling back to English.
3. Create `src/pages/{locale}/{page}.astro` with the translated content, passing the same `alternates` prop to `<Layout>`/`<AppLayout>`.
4. Add the `alternates={…}` prop to the existing English page's `<Layout>`/`<AppLayout>` too, so hreflang/switcher are reciprocal. In practice this is automatic once step 1's constant carries every live locale's path — English and Spanish pages don't need per-page edits when a new locale is added, since they import the same shared constant.
5. Sweep existing `/{locale}/*` pages for in-body prose links to this page's English URL that should now point at the new translated sibling instead. Note the established exception: cross-post links *inside blog post body content* stay pointed at the English URL even when a translated sibling exists (checked against `blog-es`/`blog-pt` source — every in-body post-to-post link does this); only page-level chrome links (nav, "how it works" sections, FAQ) get localized.

**Rollout order:** es and pt are complete site-wide except the legal pages. The legal pages (professional review, not AI translation) were deliberately deferred again in favor of pt — that's an explicit user override of the prior "legal pages before any new language" decision, not a reversal of the policy itself. Next session should not assume either sequencing without asking; the previous "don't re-litigate" framing didn't survive contact with a direct request to skip ahead.

## Testing

`npm test` (vitest). There is **no vitest/vite config, so no JSX transform — tests cannot import `.tsx`**. Put testable logic in `src/lib/*.ts` with a colocated `*.test.ts` (`limit-orders.ts`, `reading-time.ts`, `related-posts.ts`).

`npx astro check` reports 1 pre-existing error at `ChartSimulator.tsx:670` (lightweight-charts marker generics). Exit 1 is expected; treat anything beyond that one as new.

Verify content/SEO claims against **built HTML in `dist/`** (or production), never source alone — reported "bugs" here have repeatedly turned out to be already correct in source, and the whitespace gotcha above does not exist until built.

## Editorial

Product copy is held to what the code actually does — fabricated ratings, unverifiable adoption claims, and overstated order-type claims have all been removed. `/simulator` documents what the engine does *not* model (slippage, partial fills, queue position, buying-power reservation on resting orders); keep that list current when order handling changes.

**Voice:** plural editorial "we"/"our"/"us" throughout, including the legal pages. Blog byline is "Stockade Team", from each post's frontmatter `author`.

**Attribution is headcount-neutral.** Nobody is identified — no name, photo, avatar, or initials anywhere. Do not claim a team either: the About page says "a developer with a Computer Science and Engineering background", which asserts nothing about how many people build the site. Plural voice is an editorial convention here, not a factual claim, so keep prose from turning it into one ("our team", "we're a group of…").

Copy in `SiteSchema.astro` renders into **every page on the site**, so voice or claims left stale there leak site-wide — check it whenever site-level wording changes.

## Design tokens (`src/styles/global.css`)

```
canvas:      #0a0a0a   canvas-soft: #111111   surface: #1e1e1e
border:      #2a2a2a   ink: #f5f5f5           ink-muted: #a1a1a1
amber:       #f59e0b   (primary accent)
green:       #22c55e   (gains / long)
red:         #ef4444   (losses / short)
font-sans:   Inter
font-mono:   JetBrains Mono  ← all prices, tickers, numbers
```

## Chart architecture (`src/components/trading/TradingChart.tsx`)

- `CandlestickSeries` on default right price scale
- `HistogramSeries` pinned to `priceScaleId: 'vol'` (bottom 20%)
- `LineSeries` × 3 for EMA 9 (amber), EMA 20 (blue), EMA 50 (violet)
- Time must be in **seconds** (`UTCTimestamp`), not ms — use `Math.floor(ms / 1000)`
- Symbol switch → `series.setData()`; live tick → `series.update(lastPoint)` only
- `normalize()` deduplicates candles by timestamp to prevent "time must be greater" errors

## Order engine (`src/components/trading/TradingSimulator.tsx`)

- Every fill — immediate or resting — goes through one `fillOrder()`; it returns `false` on rejection. Keep both paths on it so they cannot drift apart
- Non-marketable limits rest in `pending` and fill via an effect on `currentPrice`, at the **limit price**, not the tick price. Marketable limits fill at once at the prevailing price
- `handledPendingRef` ids stay marked after filling — clearing them reopens a double-fill window under StrictMode's double-invoked effects
- Resting orders are cleared on symbol change and any live/replay switch, and are never persisted: the price series is regenerated on mount
- Fill predicates live in `src/lib/limit-orders.ts` so they are testable without a JSX transform

## Development

`astro dev --background` fails on Windows ("Failed to spawn background dev server process").

**Workaround — build + preview:**
```powershell
npm run build
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
# Test with:
Invoke-WebRequest http://localhost:4321/simulator -UseBasicParsing
```

Stop preview: `Get-Job | Stop-Job`

**`Start-Job` does not survive between PowerShell tool calls** — each call gets a fresh shell, so the job is gone by the next command. For a server that must stay up across turns, use the Bash tool with `run_in_background` instead.

**Deploy:** `npm run deploy` — builds, then `wrangler pages deploy ./dist` to Cloudflare Pages (project `stockade`, branch `main`). Verify against `https://stockademarketsim.com` after; the printed `*.pages.dev` URL is a per-deploy alias.

A **brand-new asset path can 404 on the custom domain right after deploy** (stale edge negative-cache) while returning 200 on the `*.pages.dev` alias — re-request with a `?v=…` cache-buster before concluding the upload failed.

**IndexNow:** `npm run indexnow` — builds, then submits every URL in `dist/sitemap.xml` to Bing. The list is derived from the sitemap, not hand-maintained; `node submit-indexnow.mjs --dry-run` prints it without submitting.

**`public/_redirects` targets must carry the trailing slash** (`/simulator/`, not `/simulator`) — `trailingSlash: 'always'` makes the slashless form 308, turning one redirect into a two-hop chain.

## Documentation

Full docs: https://docs.astro.build

- [Routing / pages / middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React)](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [i18n](https://docs.astro.build/en/guides/internationalization/)
