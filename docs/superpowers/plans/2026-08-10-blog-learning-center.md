# Blog / Learning Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/blog` learning center to the Stockade Astro site, backed by a content collection, with 20 in-depth original trading-education articles.

**Architecture:** Astro Content Layer collection (`glob()` loader over `src/content/blog/*.md`) validated by a Zod schema. Two routes: a static index at `/blog` and a `getStaticPaths()`-driven detail route at `/blog/[slug]`. Post pages compose a `BlogPost.astro` layout over the existing `Layout.astro`, reusing its Open Graph / Twitter meta and injecting `Article` JSON-LD through its `<slot name="head" />`. Two pure helpers (reading time, related-post selection) are unit-tested with vitest; everything else is verified via `npm run build` plus preview fetches.

**Tech Stack:** Astro 7, Tailwind CSS v4 (via `@tailwindcss/vite`), `@astrojs/sitemap`, vitest, plain Markdown.

## Global Constraints

- **Astro 7, static output.** No backend, no SSR adapter, no database.
- **Plain Markdown only.** Do NOT install `@astrojs/mdx`. Articles are `.md`.
- **Tailwind v4 via `@tailwindcss/vite`** configured under `vite.plugins` in `astro.config.mjs`. Do NOT install or reference `@astrojs/tailwind`.
- **All colors must come from the `--c-*` CSS variables** in `src/styles/global.css`. Never hardcode a hex color in new blog CSS. The site has a light/dark toggle driven by a `.light` class on `<html>`; hardcoded colors will render unreadable in light mode. The one exception, matching existing site code, is the amber accent `#f59e0b` used for eyebrow text and CTA buttons — it is intentionally identical in both themes.
- **Content config file is `src/content.config.ts`** (Astro 5+ Content Layer location). NOT `src/content/config.ts`, which is the pre-v5 path and will be silently ignored.
- **Collection entries expose `entry.id`, not `entry.slug`.** Because every article declares a frontmatter `slug`, the loader uses it as the `id`, so `entry.id === frontmatter.slug`.
- **Render with `render(entry)` imported from `astro:content`.** The old `entry.render()` method does not exist in this Astro version.
- **Frontmatter date field is `date`**, not `pubDate`.
- **`description` must be under 160 characters.** The Zod schema enforces `.max(160)`, so a violation fails the build.
- **Article body must not contain an `<h1>` / `#` heading.** The layout renders the title as the page `h1`; a second h1 is an accessibility and SEO defect.
- **Author is always the exact string `Stockade Team`.**
- **Dev server note:** `astro dev --background` fails on this Windows machine ("Failed to spawn background dev server process"). Verify with `npm run build` then a backgrounded `npm run preview`, per CLAUDE.md.

---

### Task 1: Reading-time helper with test tooling

**Files:**
- Modify: `package.json` (add `vitest` devDependency + `test` script)
- Create: `src/lib/reading-time.ts`
- Test: `src/lib/reading-time.test.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `readingTime(body: string): number` — whole minutes, minimum 1. Imported by the blog index (Task 4) and the post layout (Task 7).

- [ ] **Step 1: Install vitest**

```bash
npm install -D vitest
```

- [ ] **Step 2: Add the test script to `package.json`**

In the `"scripts"` block, add a `test` entry alongside the existing scripts:

```json
"test": "vitest run"
```

- [ ] **Step 3: Write the failing test**

Create `src/lib/reading-time.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('rounds to the nearest minute at 225 wpm', () => {
    // 450 words => exactly 2 minutes
    expect(readingTime('word '.repeat(450))).toBe(2);
  });

  it('returns at least 1 minute for very short content', () => {
    expect(readingTime('three little words')).toBe(1);
  });

  it('returns 1 minute for empty content rather than 0', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('   \n  ')).toBe(1);
  });

  it('does not count repeated whitespace as words', () => {
    expect(readingTime('one     two\n\n\nthree')).toBe(1);
  });

  it('scales to longer articles', () => {
    // 1800 words => 8 minutes
    expect(readingTime('word '.repeat(1800))).toBe(8);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./reading-time`.

- [ ] **Step 5: Write the implementation**

Create `src/lib/reading-time.ts`:

```ts
const WORDS_PER_MINUTE = 225;

/**
 * Estimated read time in whole minutes for a block of Markdown source.
 * Always returns at least 1 so the UI never renders "0 min read".
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 5 tests.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/lib/reading-time.ts src/lib/reading-time.test.ts
git commit -m "Add reading-time helper with vitest"
```

---

### Task 2: Content collection and first article

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/what-is-a-stock-market-simulator.md`

**Interfaces:**
- Consumes: nothing.
- Produces: a `blog` collection queryable via `getCollection('blog')`. Each entry has `id: string` (equal to frontmatter `slug`), `body: string`, and `data: { title: string; description: string; date: Date; author: string; tags: string[]; slug: string }`.

- [ ] **Step 1: Create the collection config**

Create `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Kept under 160 chars so search engines show it untruncated.
    // This is a hard build failure on purpose — a silently clipped
    // meta description is invisible until it is already live.
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().default('Stockade Team'),
    tags: z.array(z.string()).min(1),
    slug: z.string(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Write the first article**

Create `src/content/blog/what-is-a-stock-market-simulator.md`. It must satisfy the editorial standard in the spec: 1,200–2,000 words, no `#` h1 in the body, `##` sections and `###` subsections, worked numeric examples, honest about limitations, references only real Stockade features, and closes with a `## Start practicing` section linking to `/simulator`.

Frontmatter exactly:

```yaml
---
title: "What Is a Stock Market Simulator and Why Should You Use One"
description: "A stock market simulator lets you trade real market mechanics with virtual money. Here is how they work and what they can and cannot teach you."
date: 2026-03-23
author: "Stockade Team"
tags: ["Basics"]
slug: "what-is-a-stock-market-simulator"
---
```

- [ ] **Step 3: Verify the collection builds and the schema validates**

Run: `npm run build`
Expected: build succeeds. If `description` exceeded 160 characters the build would fail with a Zod error naming the file — that is the schema working.

- [ ] **Step 4: Verify the entry id equals the slug**

Temporarily confirm by checking the built output later in Task 7. For now, confirm the build printed no content-collection warnings.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/blog/what-is-a-stock-market-simulator.md
git commit -m "Add blog content collection and first article"
```

---

### Task 3: Prose styles

**Files:**
- Modify: `src/styles/global.css` (append a new block at end of file, after the existing `@layer components` block that ends at line 244)

**Interfaces:**
- Consumes: the `--c-*` variables defined at the top of the same file.
- Produces: a `.prose` class applied to the rendered article container in Task 7.

- [ ] **Step 1: Append the prose styles**

Append to the end of `src/styles/global.css`:

```css
@layer components {
  /* ── Blog article prose ────────────────────────────────────────────── */
  .prose {
    color: var(--c-text-muted);
    font-size: 16px;
    line-height: 1.75;
  }

  .prose > * + * {
    margin-top: 1.25em;
  }

  .prose h2,
  .prose h3,
  .prose h4 {
    color: var(--c-text);
    font-weight: 700;
    letter-spacing: -0.01em;
    /* Clears the sticky 56px navbar when a TOC anchor jumps here. */
    scroll-margin-top: 80px;
  }

  .prose h2 {
    font-size: 24px;
    line-height: 1.3;
    margin-top: 2.5em;
    padding-top: 1.5em;
    border-top: 1px solid var(--c-border);
  }

  /* The first heading needs no divider — the byline block already
     separates it from the page header. */
  .prose > h2:first-child {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .prose h3 {
    font-size: 18px;
    margin-top: 2em;
  }

  .prose h4 {
    font-size: 16px;
    margin-top: 1.75em;
  }

  .prose strong {
    color: var(--c-text);
    font-weight: 600;
  }

  .prose a {
    color: #f59e0b;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .prose a:hover {
    color: #fbbf24;
  }

  .prose ul,
  .prose ol {
    padding-left: 1.5em;
  }

  .prose ul { list-style: disc; }
  .prose ol { list-style: decimal; }

  .prose li + li {
    margin-top: 0.5em;
  }

  .prose li::marker {
    color: var(--c-text-subtle);
  }

  .prose blockquote {
    border-left: 3px solid #f59e0b;
    background: var(--c-bg-soft);
    padding: 1em 1.25em;
    border-radius: 0 8px 8px 0;
    color: var(--c-text-muted);
  }

  .prose code {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: var(--c-bg-muted);
    border: 1px solid var(--c-border);
    border-radius: 4px;
    padding: 0.15em 0.4em;
    color: var(--c-text);
  }

  .prose pre {
    background: var(--c-bg-soft);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    padding: 1em 1.25em;
    overflow-x: auto;
  }

  .prose pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 13px;
  }

  /* Tables are the most likely element to overflow on mobile, so the
     wrapper scrolls rather than the page. */
  .prose .table-wrap {
    overflow-x: auto;
  }

  .prose table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .prose th,
  .prose td {
    border: 1px solid var(--c-border);
    padding: 0.6em 0.8em;
    text-align: left;
  }

  .prose th {
    background: var(--c-bg-soft);
    color: var(--c-text);
    font-weight: 600;
  }

  .prose hr {
    border: none;
    border-top: 1px solid var(--c-border);
    margin-top: 2.5em;
  }

  .prose img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: PASS. Tailwind v4 compiles the new `@layer components` block without config changes.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "Add themed prose styles for blog articles"
```

---

### Task 4: Blog index page

**Files:**
- Create: `src/pages/blog/index.astro`

**Interfaces:**
- Consumes: `getCollection('blog')` from Task 2; `readingTime` from Task 1.
- Produces: the `/blog` route.

- [ ] **Step 1: Create the index page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/layout/Navbar.astro';
import Footer from '../../components/layout/Footer.astro';
import { readingTime } from '../../lib/reading-time';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
---

<Layout
  title="Trading Learning Center | Stockade"
  description="Free, in-depth guides to candlestick charts, indicators, order types, and risk management — written for traders learning to practice with purpose."
  canonical="https://stockademarketsim.com/blog"
>
  <Navbar />

  <main class="max-w-[1000px] mx-auto px-6 py-16">
    <div class="mb-12">
      <div class="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] mb-3">
        Learning Center
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-[var(--c-text)] mb-4">
        Learn to trade before you risk a dollar.
      </h1>
      <p class="text-[17px] text-[var(--c-text-muted)] leading-relaxed max-w-[680px]">
        Practical guides to reading charts, using indicators, sizing positions, and
        managing risk — each one built to be practiced immediately on the simulator.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 gap-5">
      {posts.map(post => (
        <article class="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-6 flex flex-col hover:border-[var(--c-border-strong)] transition-colors">
          <div class="flex flex-wrap gap-1.5 mb-3">
            {post.data.tags.map(tag => (
              <span class="text-[10px] font-mono uppercase tracking-wider text-[#f59e0b] bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)] rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <h2 class="text-[17px] font-semibold text-[var(--c-text)] leading-snug mb-2">
            <a href={`/blog/${post.id}`} class="hover:text-[#f59e0b] transition-colors">
              {post.data.title}
            </a>
          </h2>

          <p class="text-[14px] text-[var(--c-text-subtle)] leading-relaxed mb-5 grow">
            {post.data.description}
          </p>

          <div class="flex items-center gap-2 text-[11px] font-mono text-[var(--c-text-subtle)] pt-4 border-t border-[var(--c-border)]">
            <span>{post.data.author}</span>
            <span class="text-[var(--c-text-faint)]">·</span>
            <time datetime={post.data.date.toISOString()}>
              {dateFmt.format(post.data.date)}
            </time>
            <span class="text-[var(--c-text-faint)]">·</span>
            <span>{readingTime(post.body ?? '')} min read</span>
          </div>
        </article>
      ))}
    </div>
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 2: Build and preview**

```bash
npm run build
```

Then start preview in a background job (PowerShell, per CLAUDE.md):

```powershell
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
```

- [ ] **Step 3: Verify the route responds**

```powershell
(Invoke-WebRequest http://localhost:4321/blog -UseBasicParsing).StatusCode
```

Expected: `200`. The page should list exactly one card (the Task 2 article) with author, date, and a read time of at least 5 min.

Stop the job when done: `Get-Job | Stop-Job`

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "Add blog index page"
```

---

### Task 5: Related-posts selection

**Files:**
- Create: `src/lib/related-posts.ts`
- Test: `src/lib/related-posts.test.ts`

**Interfaces:**
- Consumes: nothing at runtime. Takes a structural type, NOT `CollectionEntry`, so it is testable without the `astro:content` virtual module.
- Produces: `pickRelated<T extends RelatedCandidate>(current: T, all: T[], limit?: number): T[]`. Used by Task 7.

- [ ] **Step 1: Write the failing test**

Create `src/lib/related-posts.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { pickRelated, type RelatedCandidate } from './related-posts';

function post(id: string, tags: string[], date: string): RelatedCandidate {
  return { id, data: { tags, date: new Date(date) } };
}

describe('pickRelated', () => {
  const rsi = post('rsi', ['Indicators'], '2026-04-20');
  const macd = post('macd', ['Indicators'], '2026-04-27');
  const vwap = post('vwap', ['Indicators', 'Strategy'], '2026-05-04');
  const risk = post('risk', ['Risk Management'], '2026-06-29');
  const plan = post('plan', ['Strategy', 'Risk Management'], '2026-06-15');
  const all = [rsi, macd, vwap, risk, plan];

  it('never includes the current post', () => {
    const result = pickRelated(rsi, all);
    expect(result.map(p => p.id)).not.toContain('rsi');
  });

  it('ranks posts sharing more tags first', () => {
    const result = pickRelated(plan, all, 3);
    // vwap shares "Strategy", risk shares "Risk Management" — both score 1.
    // rsi and macd share nothing.
    expect(result.slice(0, 2).map(p => p.id).sort()).toEqual(['risk', 'vwap']);
  });

  it('breaks ties by recency, newest first', () => {
    // vwap is ["Indicators", "Strategy"], so rsi and macd each share
    // "Indicators" and plan shares "Strategy" — three posts all scoring 1.
    // Only recency separates them.
    const result = pickRelated(vwap, all, 3);
    expect(result.map(p => p.id)).toEqual(['plan', 'macd', 'rsi']);
  });

  it('falls back to most recent posts when nothing shares a tag', () => {
    const orphan = post('orphan', ['Forex'], '2026-07-01');
    const result = pickRelated(orphan, [...all, orphan], 2);
    expect(result.map(p => p.id)).toEqual(['risk', 'plan']);
  });

  it('respects the limit', () => {
    expect(pickRelated(rsi, all, 2)).toHaveLength(2);
  });

  it('returns fewer than the limit when the collection is small', () => {
    expect(pickRelated(rsi, [rsi, macd], 3)).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./related-posts`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/related-posts.ts`:

```ts
/**
 * Structural shape this module needs from a blog entry. Deliberately not
 * `CollectionEntry<'blog'>` — depending on the `astro:content` virtual
 * module would make this logic untestable outside an Astro build.
 */
export interface RelatedCandidate {
  id: string;
  data: {
    tags: string[];
    date: Date;
  };
}

/**
 * Picks up to `limit` posts related to `current`, ranked by number of
 * shared tags and then by recency. When nothing shares a tag every
 * candidate scores 0, so this degrades naturally into "most recent posts"
 * without a separate fallback branch.
 */
export function pickRelated<T extends RelatedCandidate>(
  current: T,
  all: T[],
  limit = 3
): T[] {
  const currentTags = new Set(current.data.tags);

  return all
    .filter(post => post.id !== current.id)
    .map(post => ({
      post,
      shared: post.data.tags.filter(tag => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        b.post.data.date.getTime() - a.post.data.date.getTime()
    )
    .slice(0, limit)
    .map(scored => scored.post);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 11 tests total across both files.

- [ ] **Step 5: Commit**

```bash
git add src/lib/related-posts.ts src/lib/related-posts.test.ts
git commit -m "Add related-posts selection with tests"
```

---

### Task 6: Table of contents component

**Files:**
- Create: `src/components/blog/TableOfContents.astro`

**Interfaces:**
- Consumes: the `headings` array from `render(entry)` — `{ depth: number; slug: string; text: string }[]`.
- Produces: `<TableOfContents headings={headings} />`. Used by Task 7.

- [ ] **Step 1: Create the component**

Create `src/components/blog/TableOfContents.astro`:

```astro
---
interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

const { headings } = Astro.props;

// Only h2/h3 make a useful outline. h4 is too granular and deep nesting
// makes the rail unreadable at this width.
const items = headings.filter(h => h.depth === 2 || h.depth === 3);
---

{items.length > 0 && (
  <nav aria-label="Table of contents" class="toc">
    <p class="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-3">
      On this page
    </p>
    <ul class="space-y-1 border-l border-[var(--c-border)]">
      {items.map(item => (
        <li>
          <a
            href={`#${item.slug}`}
            data-toc-link={item.slug}
            class:list={[
              'block py-1 text-[13px] leading-snug transition-colors border-l -ml-px',
              'text-[var(--c-text-subtle)] border-transparent',
              'hover:text-[var(--c-text)] hover:border-[var(--c-border-strong)]',
              item.depth === 3 ? 'pl-6' : 'pl-3',
            ]}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}

<style>
  .toc :global(a[data-toc-active]) {
    color: #f59e0b;
    border-left-color: #f59e0b;
  }
</style>

<script>
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]');

  if (links.length > 0) {
    const bySlug = new Map<string, HTMLAnchorElement>();
    links.forEach(link => bySlug.set(link.dataset.tocLink!, link));

    const headings = Array.from(bySlug.keys())
      .map(slug => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);

    // Track which headings are on screen; highlight the topmost one.
    const visible = new Set<string>();

    function highlight() {
      let active: string | null = null;

      for (const heading of headings) {
        if (visible.has(heading.id)) {
          active = heading.id;
          break;
        }
      }

      // Nothing visible means we are reading below the last heading that
      // scrolled off the top — keep the last one that passed the top edge.
      if (active === null) {
        for (const heading of headings) {
          if (heading.getBoundingClientRect().top < 100) {
            active = heading.id;
          }
        }
      }

      bySlug.forEach((link, slug) => {
        if (slug === active) link.setAttribute('data-toc-active', '');
        else link.removeAttribute('data-toc-active');
      });
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        highlight();
      },
      // Top offset clears the sticky navbar; bottom margin keeps only the
      // upper portion of the viewport eligible so the active item does not
      // jump ahead of what is being read.
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headings.forEach(heading => observer.observe(heading));
    highlight();
  }
</script>
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: PASS. The component is not yet rendered anywhere; this only confirms it compiles.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/TableOfContents.astro
git commit -m "Add table of contents component with scroll spy"
```

---

### Task 7: Post layout, related posts component, and the `[slug]` route

**Files:**
- Create: `src/components/blog/RelatedPosts.astro`
- Create: `src/layouts/BlogPost.astro`
- Create: `src/pages/blog/[slug].astro`

**Interfaces:**
- Consumes: `readingTime` (Task 1), `pickRelated` (Task 5), `TableOfContents` (Task 6), the `blog` collection (Task 2), `.prose` (Task 3).
- Produces: the `/blog/<slug>` routes.

- [ ] **Step 1: Create the related-posts component**

Create `src/components/blog/RelatedPosts.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';
import { pickRelated } from '../../lib/related-posts';

interface Props {
  current: CollectionEntry<'blog'>;
  all: CollectionEntry<'blog'>[];
}

const { current, all } = Astro.props;
const related = pickRelated(current, all, 3);
---

{related.length > 0 && (
  <section class="mt-16 pt-10 border-t border-[var(--c-border)]">
    <h2 class="text-xl font-bold text-[var(--c-text)] mb-6">Keep learning</h2>
    <div class="grid sm:grid-cols-3 gap-4">
      {related.map(post => (
        <a
          href={`/blog/${post.id}`}
          class="block bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5 hover:border-[var(--c-border-strong)] transition-colors"
        >
          <div class="text-[10px] font-mono uppercase tracking-wider text-[#f59e0b] mb-2">
            {post.data.tags[0]}
          </div>
          <h3 class="text-[14px] font-semibold text-[var(--c-text)] leading-snug">
            {post.data.title}
          </h3>
        </a>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 2: Create the post layout**

Create `src/layouts/BlogPost.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';
import Layout from './Layout.astro';
import Navbar from '../components/layout/Navbar.astro';
import Footer from '../components/layout/Footer.astro';
import TableOfContents from '../components/blog/TableOfContents.astro';
import RelatedPosts from '../components/blog/RelatedPosts.astro';
import { readingTime } from '../lib/reading-time';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  post: CollectionEntry<'blog'>;
  posts: CollectionEntry<'blog'>[];
  headings: Heading[];
}

const { post, posts, headings } = Astro.props;
const { title, description, date, author, tags } = post.data;

const siteUrl = 'https://stockademarketsim.com';
const canonical = `${siteUrl}/blog/${post.id}`;
const ogImageUrl = `${siteUrl}/web-app-manifest-512x512.png`;
const published = date.toISOString();
const minutes = readingTime(post.body ?? '');

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished: published,
  // No updatedDate field exists in the collection schema, so modified
  // mirrors published rather than claiming a false edit date.
  dateModified: published,
  author: {
    '@type': 'Organization',
    name: author,
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Stockade',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/web-app-manifest-512x512.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': canonical,
  },
  image: ogImageUrl,
  keywords: tags.join(', '),
  inLanguage: 'en-US',
};

// Escaping "<" prevents a stray "</script>" inside any string from
// terminating the JSON-LD block early.
const schemaJson = JSON.stringify(articleSchema).replace(/</g, '\\u003c');
---

<Layout
  title={`${title} | Stockade`}
  description={description}
  keywords={tags.join(', ')}
  canonical={canonical}
  ogType="article"
>
  <Fragment slot="head">
    <meta property="article:published_time" content={published} />
    <meta property="article:modified_time" content={published} />
    <meta property="article:author" content={author} />
    <meta property="article:section" content={tags[0]} />
    {tags.map(tag => <meta property="article:tag" content={tag} />)}
    <script type="application/ld+json" is:inline set:html={schemaJson} />
  </Fragment>

  <Navbar />

  <main class="max-w-[1100px] mx-auto px-6 py-14">
    <a
      href="/blog"
      class="inline-block text-[12px] font-mono text-[var(--c-text-subtle)] hover:text-[#f59e0b] transition-colors mb-8"
    >
      ← Learning Center
    </a>

    <header class="mb-10">
      <div class="flex flex-wrap gap-1.5 mb-4">
        {tags.map(tag => (
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#f59e0b] bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)] rounded-full px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>

      <h1 class="text-[34px] sm:text-[40px] font-bold tracking-tight leading-[1.15] text-[var(--c-text)] mb-4 max-w-[820px]">
        {title}
      </h1>

      <p class="text-[17px] text-[var(--c-text-muted)] leading-relaxed max-w-[720px] mb-6">
        {description}
      </p>

      <div class="flex flex-wrap items-center gap-2 text-[12px] font-mono text-[var(--c-text-subtle)] pb-6 border-b border-[var(--c-border)]">
        <span class="text-[var(--c-text-muted)]">{author}</span>
        <span class="text-[var(--c-text-faint)]">·</span>
        <time datetime={published}>{dateFmt.format(date)}</time>
        <span class="text-[var(--c-text-faint)]">·</span>
        <span>{minutes} min read</span>
      </div>
    </header>

    <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12 lg:items-start">
      <div class="min-w-0">
        <!-- Mobile TOC: collapsed above the article. -->
        <details class="lg:hidden mb-8 bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-4">
          <summary class="text-[13px] font-semibold text-[var(--c-text)] cursor-pointer">
            On this page
          </summary>
          <div class="mt-3">
            <TableOfContents headings={headings} />
          </div>
        </details>

        <article class="prose">
          <slot />
        </article>

        <RelatedPosts current={post} all={posts} />
      </div>

      <!-- Desktop TOC rail: sticky, clears the 56px navbar. -->
      <aside class="hidden lg:block sticky top-[80px]">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 3: Create the dynamic route**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  // Every article declares a frontmatter `slug`, which the glob loader
  // uses as the entry id — so `post.id` IS the URL segment.
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const posts = await getCollection('blog');
const { Content, headings } = await render(post);
---

<BlogPost post={post} posts={posts} headings={headings}>
  <Content />
</BlogPost>
```

- [ ] **Step 4: Build and verify the route**

```bash
npm run build
```

Expected: PASS, and the build log lists `/blog/what-is-a-stock-market-simulator/`.

- [ ] **Step 5: Verify the rendered page**

Start preview:

```powershell
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
```

Then:

```powershell
(Invoke-WebRequest http://localhost:4321/blog/what-is-a-stock-market-simulator -UseBasicParsing).StatusCode
```

Expected: `200`.

- [ ] **Step 6: Verify the JSON-LD is valid JSON**

```powershell
$html = (Invoke-WebRequest http://localhost:4321/blog/what-is-a-stock-market-simulator -UseBasicParsing).Content
$json = [regex]::Match($html, '(?s)<script type="application/ld\+json">(.*?)</script>').Groups[1].Value
$json | ConvertFrom-Json | Select-Object '@type', headline
```

Expected: prints `Article` and the post title. A parse error here means the JSON-LD is malformed and Google would silently ignore it.

Stop the job: `Get-Job | Stop-Job`

- [ ] **Step 7: Commit**

```bash
git add src/components/blog/RelatedPosts.astro src/layouts/BlogPost.astro "src/pages/blog/[slug].astro"
git commit -m "Add blog post layout, related posts, and dynamic route"
```

---

### Task 8: Navigation links

**Files:**
- Modify: `src/components/layout/Navbar.astro:8-13` (the `navLinks` array)
- Modify: `src/components/layout/Footer.astro:28-33` (the Product column array)

**Interfaces:**
- Consumes: the `/blog` route from Task 4.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the navbar link**

In `src/components/layout/Navbar.astro`, add a `Learn` entry to the end of the `navLinks` array so it reads:

```astro
const navLinks = [
  { href: '/simulator',       label: 'Trading Simulator' },
  { href: '/chart-simulator', label: 'Chart Simulator'   },
  { href: '/markets',         label: 'Markets'           },
  { href: '/analytics',       label: 'Analytics'         },
  { href: '/blog',            label: 'Learn'             },
];
```

This single array feeds both the desktop row and the mobile drawer, so no second edit is needed. The existing `isActive()` uses `startsWith`, so `/blog/<slug>` correctly highlights `Learn`.

- [ ] **Step 2: Add the footer link**

In `src/components/layout/Footer.astro`, add a `Learn` entry to the Product column array:

```astro
{[
  { href: '/simulator',       label: 'Trading Simulator' },
  { href: '/chart-simulator', label: 'Chart Simulator'   },
  { href: '/markets',         label: 'Markets'           },
  { href: '/analytics',       label: 'Analytics'         },
  { href: '/blog',            label: 'Learn'             },
].map(l => (
```

- [ ] **Step 3: Build and verify both links render**

```bash
npm run build
```

```powershell
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
$html = (Invoke-WebRequest http://localhost:4321/ -UseBasicParsing).Content
([regex]::Matches($html, 'href="/blog"')).Count
```

Expected: `3` — desktop nav, mobile drawer, and footer. Then `Get-Job | Stop-Job`.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.astro src/components/layout/Footer.astro
git commit -m "Add Learn link to navbar and footer"
```

---

### Task 9: Sitemap at `/sitemap.xml`

**Files:**
- Modify: `astro.config.mjs`
- Delete: `public/sitemap.xml`
- Modify: `src/layouts/Layout.astro` (add `<link rel="sitemap">` near the other `<link>` tags around line 61)

**Interfaces:**
- Consumes: all routes built by earlier tasks.
- Produces: `dist/sitemap.xml`.

**Background:** `@astrojs/sitemap` always emits `sitemap-index.xml` plus one or more `sitemap-N.xml` chunks. Its `filenameBase` option only changes the *prefix* (default `sitemap`), so there is no configuration that produces a single file named `sitemap.xml`. A post-build hook does the rename.

- [ ] **Step 1: Install the integration**

```bash
npm install @astrojs/sitemap
```

- [ ] **Step 2: Rewrite `astro.config.mjs`**

Replace the whole file with:

```js
// @ts-check
import { rename, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
  integrations: [
    react(),
    sitemap({
      // robots.txt disallows these; they should not be advertised either.
      filter: page => !/\/(404|500)\/?$/.test(page),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';

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
```

- [ ] **Step 3: Delete the stale static sitemap**

```bash
git rm public/sitemap.xml
```

This is required, not optional: files in `public/` are copied to `dist/` verbatim and would overwrite the generated sitemap.

- [ ] **Step 4: Add the sitemap link to the document head**

In `src/layouts/Layout.astro`, immediately after the `<link rel="manifest" href="/site.webmanifest" />` line, add:

```astro
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
```

- [ ] **Step 5: Build and verify the sitemap output**

```bash
npm run build
```

```powershell
Test-Path dist/sitemap.xml            # expect True
Test-Path dist/sitemap-index.xml      # expect False
Test-Path dist/sitemap-0.xml          # expect False
Select-String -Path dist/sitemap.xml -Pattern '/blog' | Measure-Object | Select-Object -ExpandProperty Count
```

Expected: `True`, `False`, `False`, and a count of at least `2` (the index plus the one article so far).

- [ ] **Step 6: Confirm robots.txt needs no change**

```powershell
Select-String -Path public/robots.txt -Pattern 'Sitemap:'
```

Expected: `Sitemap: https://stockademarketsim.com/sitemap.xml` — already correct, no edit needed.

- [ ] **Step 7: Commit**

The `public/sitemap.xml` deletion is already staged by the `git rm` in Step 3.

```bash
git add astro.config.mjs package.json package-lock.json src/layouts/Layout.astro
git commit -m "Generate sitemap.xml via @astrojs/sitemap with single-file output"
```

---

### Task 10: Article style brief and batch 1 (articles 2–6)

**Files:**
- Create: `docs/superpowers/plans/article-style-brief.md`
- Create: `src/content/blog/how-to-read-candlestick-charts.md`
- Create: `src/content/blog/support-and-resistance-levels.md`
- Create: `src/content/blog/moving-averages-ema-vs-sma.md`
- Create: `src/content/blog/rsi-indicator-overbought-oversold.md`
- Create: `src/content/blog/macd-explained.md`

**Interfaces:**
- Consumes: the collection schema from Task 2.
- Produces: five articles. The style brief is reused verbatim by Tasks 11–13.

- [ ] **Step 1: Write the style brief**

Create `docs/superpowers/plans/article-style-brief.md` containing all of the following, which every article-writing subagent must receive:

**Frontmatter contract** — exactly these six keys, in this order, no others:

```yaml
---
title: "<exact title from the assignment>"
description: "<under 160 characters — this is a hard build failure above 160>"
date: <YYYY-MM-DD from the assignment>
author: "Stockade Team"
tags: [<exact tags from the assignment>]
slug: "<exact slug from the assignment>"
---
```

**Structural rules:**
- 1,200–2,000 words in the body, excluding frontmatter.
- No `#` h1 anywhere in the body. The page layout renders the title as the h1. Start sections at `##`.
- Use `##` for main sections (5–8 of them) and `###` for subsections. These populate the table of contents, so section titles must be self-describing — "Why the 20 EMA matters more than the 50" not "Part Two".
- Wrap any Markdown table in a `<div class="table-wrap">` so it scrolls on mobile instead of breaking the page layout.
- Close with a `## Practice this on the simulator` section (wording may vary) containing 2–4 sentences of specific instruction tied to this article's topic, ending with a Markdown link to `/simulator`.

**Voice:**
- Second person, direct, plain English. Explain jargon the first time it appears.
- Open with the concrete problem the concept solves, never a dictionary definition. "Your stop keeps getting hit right before the move goes your way" beats "Support is a price level where buying interest emerges."
- Include worked numeric examples with real arithmetic — an actual position-size calculation with real numbers, an actual R-multiple. Never hand-wave with "some amount".
- Be honest about limitations. Indicators lag. Most day traders lose money. Backtested edges decay. Support levels break. An article that oversells destroys trust with exactly the audience being courted.
- No hype, no emoji, no "In today's fast-paced markets", no keyword stuffing. Write the sentence a knowledgeable friend would say.
- Educational framing only: no performance promises, no financial advice, no "you will make". This matches the site's existing disclaimer.

**Real Stockade features** — reference only these, never invent capabilities:
- Trading Simulator at `/simulator`, $100,000 virtual starting balance, keyboard shortcuts B (buy), S (sell), F (flatten)
- Chart Simulator at `/chart-simulator` for candle-by-candle historical replay
- Markets page at `/markets` — 22 assets: equities, BTC/ETH crypto, major forex pairs, futures (NQ, ES, CL, GC), filterable and sortable
- Analytics at `/analytics` — equity curve, trade journal, win rate, profit factor, average win/loss, max drawdown, time-of-day heatmap
- Candlestick charts with volume histogram; EMA 9 (amber), EMA 20 (blue), EMA 50 (violet) overlays; VWAP, RSI, MACD
- Order types: market, limit, stop-loss, take-profit, OCO bracket
- 800ms live ticks in live mode
- Completely free, no signup, no account, state stored in the browser

**Cross-linking:** link to sibling articles with plain relative Markdown links (`[position sizing](/blog/risk-management-position-sizing)`) where a concept is covered in depth elsewhere. 2–4 per article. Only link to slugs in the 20-article table below.

**The full article table** (include in the brief so agents can cross-link accurately):

| # | Slug | Title | Date | Tags |
|---|---|---|---|---|
| 1 | `what-is-a-stock-market-simulator` | What Is a Stock Market Simulator and Why Should You Use One | 2026-03-23 | Basics |
| 2 | `how-to-read-candlestick-charts` | How to Read Candlestick Charts: A Beginner's Complete Guide | 2026-03-30 | Basics, Technical Analysis |
| 3 | `support-and-resistance-levels` | Understanding Support and Resistance Levels in Trading | 2026-04-06 | Technical Analysis |
| 4 | `moving-averages-ema-vs-sma` | Moving Averages Explained: EMA vs SMA and How to Use Them | 2026-04-13 | Indicators, Technical Analysis |
| 5 | `rsi-indicator-overbought-oversold` | RSI Indicator: How to Identify Overbought and Oversold Conditions | 2026-04-20 | Indicators |
| 6 | `macd-explained` | MACD Explained: How to Read and Trade With MACD | 2026-04-27 | Indicators |
| 7 | `vwap-trading-strategy` | VWAP Trading Strategy: What It Is and How Traders Use It | 2026-05-04 | Indicators, Strategy |
| 8 | `market-orders-vs-limit-orders` | Market Orders vs Limit Orders: When to Use Each | 2026-05-11 | Order Types, Basics |
| 9 | `stop-loss-orders-explained` | Stop-Loss Orders: How to Protect Your Trades From Big Losses | 2026-05-18 | Order Types, Risk Management |
| 10 | `oco-and-bracket-orders` | What Are OCO and Bracket Orders and How Do They Work | 2026-05-25 | Order Types |
| 11 | `day-trading-vs-swing-trading` | Day Trading vs Swing Trading: Which Style Fits You | 2026-06-01 | Strategy, Basics |
| 12 | `paper-trading-guide` | Paper Trading: How to Practice Without Risking Real Money | 2026-06-08 | Basics, Psychology |
| 13 | `how-to-build-a-trading-plan` | How to Build a Trading Plan: Step-by-Step for Beginners | 2026-06-15 | Strategy, Risk Management |
| 14 | `understanding-trading-volume` | Understanding Trading Volume and What It Tells You | 2026-06-22 | Technical Analysis, Indicators |
| 15 | `risk-management-position-sizing` | Risk Management 101: Position Sizing and the 1% Rule | 2026-06-29 | Risk Management |
| 16 | `common-day-trading-mistakes` | Common Day Trading Mistakes and How to Avoid Them | 2026-07-06 | Psychology, Risk Management |
| 17 | `forex-trading-for-beginners` | Introduction to Forex Trading: Currency Pairs and Pips Explained | 2026-07-13 | Forex, Basics |
| 18 | `crypto-trading-for-beginners` | Crypto Trading for Beginners: How Digital Asset Markets Work | 2026-07-20 | Crypto, Basics |
| 19 | `futures-trading-explained` | Futures Trading Explained: Contracts, Margin, and Leverage | 2026-07-27 | Futures, Risk Management |
| 20 | `analyze-trading-performance-metrics` | How to Analyze Your Trading Performance: Key Metrics That Matter | 2026-08-03 | Analytics, Risk Management |

- [ ] **Step 2: Dispatch five parallel subagents**

One agent per article for articles 2–6. Each prompt must contain the full style brief text, that article's row from the table, and an instruction to write exactly one file to the given path. Agents write the file themselves.

- [ ] **Step 3: Verify word counts**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $words = (Get-Content $_.FullName -Raw) -split '\s+' | Where-Object { $_ } | Measure-Object
  "{0}: {1}" -f $_.Name, $words.Count
}
```

Expected: every file between roughly 1,250 and 2,100 (the count includes frontmatter, so it runs slightly above body word count). Rewrite any article outside 1,200–2,000 body words.

- [ ] **Step 4: Verify no body h1 and every article has a simulator CTA**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $body = (Get-Content $_.FullName -Raw) -replace '(?s)^---.*?---', ''
  $h1 = [regex]::Matches($body, '(?m)^# ').Count
  $cta = [regex]::Matches($body, '\(/simulator\)').Count
  "{0}: h1={1} cta={2}" -f $_.Name, $h1, $cta
}
```

Expected: `h1=0` and `cta` at least `1` for every file. Any `h1` above 0 must be demoted to `##`.

- [ ] **Step 5: Build to validate frontmatter against the schema**

Run: `npm run build`
Expected: PASS. A Zod error naming a file and the `description` field means that description exceeded 160 characters — shorten it and rebuild.

- [ ] **Step 6: Read each article and fix voice**

Read all five. Fix: duplicated explanations across articles, hype language, any invented Stockade feature, missing or broken cross-links, and section titles too vague to work as TOC entries.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/plans/article-style-brief.md src/content/blog/
git commit -m "Add article style brief and articles 2-6"
```

---

### Task 11: Article batch 2 (articles 7–11)

**Files:**
- Create: `src/content/blog/vwap-trading-strategy.md`
- Create: `src/content/blog/market-orders-vs-limit-orders.md`
- Create: `src/content/blog/stop-loss-orders-explained.md`
- Create: `src/content/blog/oco-and-bracket-orders.md`
- Create: `src/content/blog/day-trading-vs-swing-trading.md`

**Interfaces:**
- Consumes: the style brief from Task 10.
- Produces: five articles.

- [ ] **Step 1: Dispatch five parallel subagents** (controller-run — subagents cannot spawn subagents)

One per article for rows 7–11 of the table in the style brief. Each prompt contains the full brief text plus that article's row.

- [ ] **Step 2: Verify word counts**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $words = (Get-Content $_.FullName -Raw) -split '\s+' | Where-Object { $_ } | Measure-Object
  "{0}: {1}" -f $_.Name, $words.Count
}
```

Expected: every file between roughly 1,250 and 2,100. Rewrite any article outside 1,200–2,000 body words.

- [ ] **Step 3: Verify no body h1 and CTA present**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $body = (Get-Content $_.FullName -Raw) -replace '(?s)^---.*?---', ''
  $h1 = [regex]::Matches($body, '(?m)^# ').Count
  $cta = [regex]::Matches($body, '\(/simulator\)').Count
  "{0}: h1={1} cta={2}" -f $_.Name, $h1, $cta
}
```

Expected: `h1=0` and `cta` at least `1` for every file.

- [ ] **Step 4: Build to validate frontmatter**

Run: `npm run build`
Expected: PASS. A Zod error naming a file and the `description` field means that description exceeded 160 characters.

- [ ] **Step 5: Read each article and fix voice**

Fix duplicated explanations across articles, hype language, invented Stockade features, broken cross-links, and vague section titles. Pay particular attention to overlap between `stop-loss-orders-explained` and `oco-and-bracket-orders` — these two topics genuinely adjoin, so each must carry its own weight and cross-link rather than repeat.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/
git commit -m "Add articles 7-11"
```

---

### Task 12: Article batch 3 (articles 12–16)

**Files:**
- Create: `src/content/blog/paper-trading-guide.md`
- Create: `src/content/blog/how-to-build-a-trading-plan.md`
- Create: `src/content/blog/understanding-trading-volume.md`
- Create: `src/content/blog/risk-management-position-sizing.md`
- Create: `src/content/blog/common-day-trading-mistakes.md`

**Interfaces:**
- Consumes: the style brief from Task 10.
- Produces: five articles.

- [ ] **Step 1: Dispatch five parallel subagents** (controller-run — subagents cannot spawn subagents)

One per article for rows 12–16. Each prompt contains the full brief text plus that article's row.

- [ ] **Step 2: Verify word counts**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $words = (Get-Content $_.FullName -Raw) -split '\s+' | Where-Object { $_ } | Measure-Object
  "{0}: {1}" -f $_.Name, $words.Count
}
```

Expected: every file between roughly 1,250 and 2,100.

- [ ] **Step 3: Verify no body h1 and CTA present**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $body = (Get-Content $_.FullName -Raw) -replace '(?s)^---.*?---', ''
  $h1 = [regex]::Matches($body, '(?m)^# ').Count
  $cta = [regex]::Matches($body, '\(/simulator\)').Count
  "{0}: h1={1} cta={2}" -f $_.Name, $h1, $cta
}
```

Expected: `h1=0` and `cta` at least `1` for every file.

- [ ] **Step 4: Build to validate frontmatter**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Read each article and fix voice**

Fix duplicated explanations, hype language, invented features, broken cross-links, and vague section titles. `paper-trading-guide` overlaps `what-is-a-stock-market-simulator` by topic — the first article defines what a simulator is, this one must be about *how to practice deliberately* (session structure, journaling, what to measure). Enforce that split.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/
git commit -m "Add articles 12-16"
```

---

### Task 13: Article batch 4 (articles 17–20)

**Files:**
- Create: `src/content/blog/forex-trading-for-beginners.md`
- Create: `src/content/blog/crypto-trading-for-beginners.md`
- Create: `src/content/blog/futures-trading-explained.md`
- Create: `src/content/blog/analyze-trading-performance-metrics.md`

**Interfaces:**
- Consumes: the style brief from Task 10.
- Produces: the final four articles, bringing the collection to 20.

- [ ] **Step 1: Dispatch four parallel subagents** (controller-run — subagents cannot spawn subagents)

One per article for rows 17–20.

- [ ] **Step 2: Verify word counts**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $words = (Get-Content $_.FullName -Raw) -split '\s+' | Where-Object { $_ } | Measure-Object
  "{0}: {1}" -f $_.Name, $words.Count
}
```

Expected: every file between roughly 1,250 and 2,100.

- [ ] **Step 3: Verify no body h1 and CTA present**

```powershell
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $body = (Get-Content $_.FullName -Raw) -replace '(?s)^---.*?---', ''
  $h1 = [regex]::Matches($body, '(?m)^# ').Count
  $cta = [regex]::Matches($body, '\(/simulator\)').Count
  "{0}: h1={1} cta={2}" -f $_.Name, $h1, $cta
}
```

Expected: `h1=0` and `cta` at least `1` for every file.

- [ ] **Step 4: Build to validate frontmatter**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Read each article and fix voice**

Fix duplicated explanations, hype language, invented features, broken cross-links, and vague section titles. `analyze-trading-performance-metrics` must tie directly to the real `/analytics` page metrics — equity curve, win rate, profit factor, average win/loss, max drawdown, time-of-day heatmap — and not list metrics Stockade does not compute.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/
git commit -m "Add articles 17-20"
```

---

### Task 14: Full-site verification

**Files:**
- No production files. Fixes may touch any file from earlier tasks.

**Interfaces:**
- Consumes: everything.
- Produces: a verified, shippable branch.

- [ ] **Step 1: Confirm all 20 articles exist with unique slugs**

```powershell
(Get-ChildItem src/content/blog/*.md).Count
Select-String -Path src/content/blog/*.md -Pattern '^slug:' | ForEach-Object { $_.Line } | Sort-Object -Unique | Measure-Object | Select-Object -ExpandProperty Count
```

Expected: `20` and `20`. A mismatch means two articles share a slug, which would silently collapse two posts into one route.

- [ ] **Step 2: Confirm every description is under 160 characters**

```powershell
Select-String -Path src/content/blog/*.md -Pattern '^description:\s*"(.*)"$' | ForEach-Object {
  $len = $_.Matches[0].Groups[1].Value.Length
  if ($len -ge 160) { "TOO LONG ({0}): {1}" -f $len, $_.Filename }
}
```

Expected: no output.

- [ ] **Step 3: Run the unit tests**

Run: `npm test`
Expected: PASS, 11 tests.

- [ ] **Step 4: Run a clean production build**

```powershell
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm run build
```

Expected: PASS, with 20 `/blog/<slug>/` routes plus `/blog/` in the output log.

- [ ] **Step 5: Verify the sitemap contains every post**

```powershell
Test-Path dist/sitemap.xml
Test-Path dist/sitemap-index.xml
(Select-String -Path dist/sitemap.xml -Pattern '<loc>https://stockademarketsim.com/blog/[^<]+</loc>').Matches.Count
```

Expected: `True`, `False`, `20`.

- [ ] **Step 6: Verify every blog route responds 200**

```powershell
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
Start-Sleep -Seconds 4
Get-ChildItem src/content/blog/*.md | ForEach-Object {
  $slug = $_.BaseName
  try {
    $code = (Invoke-WebRequest "http://localhost:4321/blog/$slug" -UseBasicParsing).StatusCode
  } catch { $code = 'FAIL' }
  "{0}: {1}" -f $slug, $code
}
```

Expected: `200` for all 20. Note this also confirms `entry.id` matched the filename-derived slug for every article.

- [ ] **Step 7: Verify JSON-LD parses on three sample posts**

```powershell
'what-is-a-stock-market-simulator','macd-explained','futures-trading-explained' | ForEach-Object {
  $html = (Invoke-WebRequest "http://localhost:4321/blog/$_" -UseBasicParsing).Content
  $json = [regex]::Match($html, '(?s)<script type="application/ld\+json">(.*?)</script>').Groups[1].Value
  $obj = $json | ConvertFrom-Json
  "{0}: {1} / {2}" -f $_, $obj.'@type', $obj.datePublished
}
```

Expected: `Article` and a valid ISO date for each.

- [ ] **Step 8: Verify Open Graph article tags on a post**

```powershell
$html = (Invoke-WebRequest http://localhost:4321/blog/macd-explained -UseBasicParsing).Content
[regex]::Matches($html, '<meta property="(og:type|article:[^"]+)" content="([^"]*)"') | ForEach-Object { $_.Value }
```

Expected: `og:type` = `article`, plus `article:published_time`, `article:author`, `article:section`, and one `article:tag` per tag.

Stop the job: `Get-Job | Stop-Job`

- [ ] **Step 9: Manual visual check in a browser**

Open `http://localhost:4321/blog` and one article. Confirm by eye:
- The TOC rail is visible on desktop and highlights sections as you scroll.
- Clicking a TOC link scrolls the heading clear of the sticky navbar (not hidden behind it).
- Related posts appear at the bottom and are topically sensible, not random.
- **Toggle to light mode** using the navbar toggle and re-check the article. Every piece of prose, the TOC, and the cards must remain readable. This is the single most likely defect, since the rest of the site was built dark-first.
- The mobile TOC `<details>` appears and the desktop rail disappears at a narrow window width.

- [ ] **Step 10: Commit any fixes**

```bash
git add -A
git commit -m "Fix issues found in full-site verification"
```

---

## Self-Review Notes

Spec coverage check — every spec section maps to a task:

| Spec section | Task |
|---|---|
| Content collection + schema | 2 |
| Reading time | 1 |
| Routes (`/blog`, `/blog/<slug>`) | 4, 7 |
| Blog index page | 4 |
| Post page layout, meta, JSON-LD | 7 |
| Table of contents | 6 |
| Related posts | 5, 7 |
| Prose styling | 3 |
| Navigation (navbar + footer) | 8 |
| Sitemap at `/sitemap.xml` | 9 |
| 20 articles + editorial standard | 2, 10–13 |
| Verification | 14 |
