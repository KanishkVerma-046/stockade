# Blog / Learning Center — Design

**Date:** 2026-08-10
**Status:** Approved for planning

## Goal

Add a content-marketing blog ("Learning Center") to stockademarketsim.com with 20 in-depth
educational trading articles. Each article teaches a real trading concept and connects it to
hands-on practice on the Stockade simulator. Purpose is organic search acquisition plus
genuine user education — articles must read as human-written teaching material, not
keyword-stuffed SEO filler.

## Constraints

- Astro 7, static output. No backend, no database.
- Tailwind CSS v4 via `@tailwindcss/vite` (NOT `@astrojs/tailwind`).
- Site supports a light/dark toggle driven by a `.light` class on `<html>`; all colors come
  from `--c-*` CSS variables defined in `src/styles/global.css`. New styling MUST use these
  variables, never hardcoded hex, or the blog will break in light mode.
- Plain Markdown (`.md`). MDX is explicitly out of scope — no `@astrojs/mdx` dependency.
- `Layout.astro` already emits Open Graph and Twitter Card tags and exposes
  `<slot name="head" />`. Reuse it rather than duplicating meta logic.

## Architecture

### 1. Content collection

`src/content.config.ts` (Astro Content Layer API — `src/content/config.ts` is the pre-v5
location and is NOT used):

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().default('Stockade Team'),
    tags: z.array(z.string()).min(1),
    slug: z.string(),
  }),
});

export const collections = { blog };
```

Notes:

- `description: z.string().max(160)` enforces the under-160-character requirement at build
  time. A too-long description fails `npm run build` rather than silently shipping a
  truncated search snippet.
- The `glob()` loader treats a frontmatter `slug` property as an override for the generated
  entry `id`. So `slug` is both schema-validated and the actual URL segment — `entry.id`
  equals the frontmatter `slug`. No separate mapping is needed.

### 2. Reading time

`src/lib/reading-time.ts` exports `readingTime(body: string): number` returning whole
minutes at 225 wpm, minimum 1. Computed from `entry.body` (the raw Markdown string
available on every collection entry) and used by both the index and the post page.

Deliberately NOT a remark plugin: a plugin would add build config and inject into
`remarkPluginFrontmatter`, which is harder to use from the index page listing. A pure
function called in both places is simpler and testable.

### 3. Routes

| Route | File | Notes |
|---|---|---|
| `/blog` | `src/pages/blog/index.astro` | All posts, sorted `date` descending |
| `/blog/<slug>` | `src/pages/blog/[slug].astro` | `getStaticPaths()` over the collection |

Tag archive pages (`/blog/tags/[tag]`) are out of scope. Twenty posts do not need them;
tags are displayed as non-linked chips for scanning.

### 4. Blog index page

Card grid on `--c-bg-soft` surfaces with `--c-border`, matching the feature-card pattern
already used in `src/pages/about.astro`. Each card shows title, formatted date, description
as excerpt, reading time, author, and tag chips. Header block reuses the amber mono eyebrow
+ large heading pattern from `about.astro`.

Page-level metadata: title, description, canonical, and a `Blog` schema.org JSON-LD listing.

### 5. Post page

**`src/layouts/BlogPost.astro`** — wraps `Layout.astro`, passing `title`, `description`,
`canonical`, and `ogType="article"`. Through `<slot name="head">` it injects:

- `<meta property="article:published_time">`, `article:author`, and one `article:tag` per tag
- `<script type="application/ld+json">` with a schema.org `Article` object:
  `headline`, `description`, `datePublished`, `dateModified`, `author` (Organization
  "Stockade Team"), `publisher` (Organization "Stockade" with logo), `mainEntityOfPage`,
  `image`, `keywords`. There is no `updatedDate` frontmatter field, so `dateModified`
  emits the same value as `datePublished`.

Layout structure: two-column at `lg` and above — article body (max ~720px) plus a sticky
TOC rail. Single column below `lg`, with the TOC collapsed into a `<details>` above the
article.

Header block: tag chips, `h1`, then a byline row with author, published date, and reading
time in mono type.

**`src/components/blog/TableOfContents.astro`** — takes the `headings` array returned by
`render(entry)`, filters to `depth === 2 || depth === 3`, renders an anchor list with `h3`
entries indented. An `IntersectionObserver` script highlights the section currently in view.
Falls back gracefully: if a post has no h2/h3 headings, the component renders nothing.

**`src/components/blog/RelatedPosts.astro`** — takes the current entry and all entries.
Scores every other post by count of shared tags, breaks ties by recency, returns the top 3.
If no post shares a tag, falls back to the 3 most recent. Rendered as compact cards.

### 6. Prose styling

A `.prose` rule block appended to `src/styles/global.css`, built entirely on the existing
`--c-*` variables so it follows the light/dark toggle with no extra work. Covers `h2`–`h4`
(with `scroll-margin-top` so TOC anchor jumps clear the sticky navbar), `p`, `ul`/`ol`,
`blockquote`, `code`/`pre` (JetBrains Mono), `table`, `a`, `strong`, and `hr`.

`@tailwindcss/typography` is rejected: it ships its own hardcoded gray palette that would
have to be overridden variable-by-variable to track the theme toggle, which is more work
than writing the rules directly.

### 7. Navigation

- **Navbar** (`src/components/layout/Navbar.astro`): add `{ href: '/blog', label: 'Learn' }`
  to the `navLinks` array. That single array feeds both the desktop row and the mobile
  drawer, so one edit covers both. The existing `isActive()` uses `startsWith`, so
  `/blog/<slug>` correctly highlights the Learn link.
- **Footer** (`src/components/layout/Footer.astro`): add `{ href: '/blog', label: 'Learn' }`
  to the Product column list.

### 8. Sitemap

Requirement: the sitemap must be served at exactly `/sitemap.xml`.

`@astrojs/sitemap` cannot do this through configuration. Its `filenameBase` option only
changes the filename *prefix*; the default value is already `sitemap`, and it always emits
a `<base>-index.xml` plus one or more `<base>-N.xml` chunk files. There is no single-file
mode.

Approach:

1. Install `@astrojs/sitemap` and register it in `astro.config.mjs`.
2. Pass `serialize(item)` to set `changefreq` and `priority` per URL, preserving the SEO
   metadata the current hand-written `public/sitemap.xml` carries (the integration emits
   neither by default). Blog posts get `changefreq: 'monthly'`, `priority: 0.7`; the blog
   index gets `weekly` / `0.8`.
3. Add a small inline Astro integration in `astro.config.mjs` hooking `astro:build:done`
   that renames `dist/sitemap-0.xml` to `dist/sitemap.xml` and deletes
   `dist/sitemap-index.xml`.
4. Delete `public/sitemap.xml`. It must go — a file in `public/` is copied to `dist/`
   verbatim and would shadow the generated one.
5. `public/robots.txt` needs no change: its `Sitemap:` line already points at
   `https://stockademarketsim.com/sitemap.xml`.
6. Add `<link rel="sitemap" href="/sitemap.xml" />` to `Layout.astro`'s head.

**Safety condition:** the rename hook must count the generated `sitemap-N.xml` chunks and
throw if there is more than one, rather than renaming chunk 0 and silently discarding the
rest. With ~35 pages against the 45,000-entry default limit this cannot currently happen,
but a silent partial sitemap would be an invisible SEO regression if it ever did.

## Content plan

Twenty articles, 1,200–2,000 words each. Dates staggered from 2026-03-23 to 2026-08-10 so
the archive reads as an ongoing publication rather than a single content dump.

Controlled tag vocabulary — articles pick 2–3, and shared tags drive the related-posts
algorithm, so an uncontrolled vocabulary would degrade those recommendations:

`Basics`, `Technical Analysis`, `Indicators`, `Order Types`, `Risk Management`,
`Strategy`, `Psychology`, `Crypto`, `Forex`, `Futures`, `Analytics`

| # | Slug | Primary tags |
|---|---|---|
| 1 | `what-is-a-stock-market-simulator` | Basics |
| 2 | `how-to-read-candlestick-charts` | Basics, Technical Analysis |
| 3 | `support-and-resistance-levels` | Technical Analysis |
| 4 | `moving-averages-ema-vs-sma` | Indicators, Technical Analysis |
| 5 | `rsi-indicator-overbought-oversold` | Indicators |
| 6 | `macd-explained` | Indicators |
| 7 | `vwap-trading-strategy` | Indicators, Strategy |
| 8 | `market-orders-vs-limit-orders` | Order Types, Basics |
| 9 | `stop-loss-orders-explained` | Order Types, Risk Management |
| 10 | `oco-and-bracket-orders` | Order Types |
| 11 | `day-trading-vs-swing-trading` | Strategy, Basics |
| 12 | `paper-trading-guide` | Basics, Psychology |
| 13 | `how-to-build-a-trading-plan` | Strategy, Risk Management |
| 14 | `understanding-trading-volume` | Technical Analysis, Indicators |
| 15 | `risk-management-position-sizing` | Risk Management |
| 16 | `common-day-trading-mistakes` | Psychology, Risk Management |
| 17 | `forex-trading-for-beginners` | Forex, Basics |
| 18 | `crypto-trading-for-beginners` | Crypto, Basics |
| 19 | `futures-trading-explained` | Futures, Risk Management |
| 20 | `analyze-trading-performance-metrics` | Analytics, Risk Management |

### Editorial standard

Every article must:

- Open with the concrete problem the concept solves, not a dictionary definition.
- Use worked numeric examples with real arithmetic (an actual position size calculation,
  an actual R-multiple), not hand-waving.
- Be honest about what does not work. Indicators lag; most day traders lose money;
  backtested edges decay. Articles that oversell will destroy trust with the exact
  audience being courted.
- Tie back to specific, real Stockade features — EMA 9/20/50 overlays, the OCO bracket
  order panel, the analytics equity curve and time-of-day heatmap, the 22-asset market
  list, 800ms live ticks, historical replay — never invented ones.
- Close with a CTA section linking to `/simulator`, written specifically for that
  article's topic. A layout-level generic CTA block is deliberately not used: twenty
  identical closers read as templated, and a contextual "go practice exactly this"
  converts better.
- Carry a compliance-safe voice: educational framing, no performance promises, no
  financial advice. This matches the existing site disclaimer.

### Generation process

Four batches of five parallel subagents. Each batch receives a shared style brief covering
voice, structure, the Stockade feature inventory, the tag vocabulary, and the exact
frontmatter contract. After each batch returns, review for:

- Word count within 1,200–2,000
- Frontmatter valid against the Zod schema, `description` under 160 characters
- Heading structure suitable for a TOC (h2 sections, h3 subsections, no h1 in body since
  the layout renders the title as the page h1)
- Voice consistency and no duplicated explanations across articles
- Cross-links to sibling articles where a concept is covered in depth elsewhere

## Verification

1. `npm run build` completes with no errors. Schema violations fail the build, so this
   validates all 20 articles' frontmatter.
2. Confirm `dist/sitemap.xml` exists, `dist/sitemap-index.xml` and `dist/sitemap-0.xml` do
   not, and the file contains all 20 post URLs plus the existing static pages.
3. Build + preview per CLAUDE.md (`npm run build`, then `npm run preview` in a background
   job — `astro dev --background` is broken on this machine). Fetch `/blog` and at least
   one post to confirm 200 responses.
4. Visually verify: TOC anchors scroll correctly under the sticky navbar, related posts
   populate, prose is readable in BOTH light and dark mode.
5. Confirm JSON-LD parses — the `Article` block must be valid JSON.

## Out of scope

- Tag archive pages
- RSS feed
- Author pages or multiple authors
- Post search or pagination
- Comments
- Per-article OG images (all posts use the existing site-wide OG image)
