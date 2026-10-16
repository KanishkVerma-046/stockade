# Translation drift audit

**Status: report only. Nothing has been translated.** Generated 2026-10-16 at `7f5a7aa`.

## Method

For each English page in `src/pages/*.astro` (plus `src/pages/blog/index.astro`) and each English post in `src/content/blog/*.md`:

1. Find its counterpart in each locale: the same path under `src/pages/{locale}/`, or the `blog-{locale}` post whose `translationOf` names it.
2. Take the commit that **added** the counterpart as the translation point.
3. List every later English commit that did **not** touch the counterpart in the same commit.

Each candidate was then checked against the diff and the built `dist/`. 404/500 are excluded, as they are deliberately English-only.

## Summary

| # | English change | English commit | Status | Locales missing it | Effort |
|---|---|---|---|---|---|
| 1 | Markets "How to Use Market Overview" section | `ef8cb75` (2026-09-10) | **Drifted** | es, pt, ja, fr, de, ko, it (all 7) | **S–M**: ~270 words × 7. Gated on the island-strings decision (below). |
| 2 | External citations + one claim softening in 12 blog posts | `cdd53c4` (2026-09-10) | **Drifted** | es, pt, ja, fr, de, ko, it (all 7) | **M**: 15 sentence-level edits + 1 rewording × 7 = **112 edits** across 84 translated posts. |
| 3 | Contact page email fallback | `ef8cb75` (2026-09-10) | **Resolved** in `0cdb335` (2026-10-16) | none | n/a |
| 4 | Simulator "what this simulator does not model" list | last changed `4dfce19` (2026-08-12) | **No drift** | none | n/a |
| 5 | Trailing-slash link normalization | `e38815b` (2026-09-05) | **No drift** (false positive) | none | n/a |
| 6 | Performance-metrics post title shortening | `d3474f8` (2026-10-16) | **No drift**: ja/ko left unchanged on purpose | none | n/a |
| 7 | Blog index edits | `f90f5ed`, `d958fc3`, `589fe60` | **No drift** (false positive) | none | n/a |

Two items need work: **#1 and #2.**

## 1. Markets "How to Use Market Overview" section (drifted)

- **English file:** `src/pages/markets.astro`. Commit `ef8cb75` added 36 lines, about 268 words, after the table.
- **Missing from:** all 7 translated `src/pages/{locale}/markets.astro` pages. Each locale was translated earlier: es on 2026-09-01, the rest on 2026-09-03/04.
- **Content:** four subsections.
  - What the table covers: 29 assets, 14 stocks / 8 crypto / 3 forex / 4 futures, 2-second ticks.
  - Filtering and sorting.
  - Reading the columns: volume units, and why Market Cap is blank for forex and futures.
  - Trading from the table: the Trade button and the Chart Simulator link.
- **Dependency:** the section names island UI that is **still English on every translated page**: "category tabs", "the search box", "the Symbol, Price, or Change column headers", and "Market Cap". Translating the prose before the island strings would describe labels in a different language from the ones on screen. Do island strings first (see `2026-10-16-island-strings-audit.md`), or translate the prose so it quotes the labels exactly as they appear.
- **Already true on translated pages:** the volume-unit explanation (fixed in `520cde9`) and the Trade button opening the *localized* simulator (fixed in `28c2af0`).
- **Effort: S–M.** About 1,900 words of translation in one self-contained section per locale. Its in-body links to `/simulator/` and `/chart-simulator/` must be localized, which the build now enforces.

## 2. External citations in 12 blog posts (drifted)

- **English commit:** `cdd53c4`, "add authoritative external citations to strengthen trust signals". Each change rewrites one sentence to cite a source inline. Nothing in this commit touched a translated post.
- **Missing from:** every translated sibling, in all 7 locales. None of these source domains appears anywhere in `src/content/blog-*/`.
- **Effort: M.** 16 edits per locale (15 links + 1 rewording), 112 in total. Each one is: find the matching sentence in the translated post, re-word it to carry the link, and keep the claim identical. These are claim-precision edits, so each needs care, not bulk substitution.
- **Decision needed:** most sources are English-only (investor.gov, FINRA, SEC, CFTC, SIPC, CME, Britannica). ESMA publishes in EU languages, which is relevant for es/pt/fr/de/it. Either keep the English URLs, or use a locale edition where one exists.

| English post | Edit(s) to carry over | Source(s) |
|---|---|---|
| `common-day-trading-mistakes` | link "the disposition effect" | en.wikipedia.org |
| `crypto-trading-for-beginners` | circuit-breaker threshold claim; SIPC coverage | investor.gov; sipc.org |
| `day-trading-vs-swing-trading` | PDT threshold retired (FINRA notice 26-10); "97% … net losers" study | finra.org; ideas.repec.org |
| `forex-trading-for-beginners` | 30:1 EU/UK leverage; 50:1 US majors; ESMA disclosure review | esma.europa.eu ×2; cftc.gov |
| `futures-trading-explained` | CME E-mini contract specs | cmegroup.com |
| `how-to-read-candlestick-charts` | **claim softened, no link**: "When researchers test them systematically…" became "Most systematic attempts to test them … find … not a *reliable* edge" | n/a |
| `macd-explained` | Gerald Appel / late-1970s origin | britannica.com |
| `market-orders-vs-limit-orders` | regulator definition of order types | investor.gov |
| `oco-and-bracket-orders` | "a standard conditional order type most brokers offer" | fidelity.com |
| `rsi-indicator-overbought-oversold` | Wilder, 1978 | britannica.com |
| `stop-loss-orders-explained` | regulator investor bulletin | investor.gov |
| `understanding-trading-volume` | "more than a dozen registered exchanges" | sec.gov |

The `how-to-read-candlestick-charts` rewording matters more than the links. The English claim was deliberately weakened, while all 7 translations still make the stronger "when researchers test them" claim. That falls under the CLAUDE.md editorial rule that copy must not overstate.

## 3. Contact email fallback (resolved)

`ef8cb75` added a "Prefer email?" box to `src/pages/contact.astro` only. Fixed in all 7 locales by `0cdb335` (2026-10-16), with the same plain `mailto:` link and visible address as English.

## 4. Simulator limits wording (no drift)

The English "does not model" list in `src/pages/simulator.astro` last changed in `4dfce19` (2026-08-12), before any translation existed. The built `/simulator/` page in every locale carries the same five items, in the same order:

1. No slippage
2. No partial fills
3. No queue position
4. Resting orders don't reserve buying power
5. Prices are generated, not real

`TradingSimulator.tsx` and `src/lib/limit-orders.ts` have had no commits since 2026-08-31, so the list still matches the engine in every language.

## 5–7. False positives, checked and dismissed

- **`e38815b` (trailing-slash normalization):** this commit also edited 94 translated files. The counterparts it didn't touch were already in slash form, and no built translated page has a slash-less internal link.
- **`d3474f8` (title shortening):** ja (42) and ko (39) were already well under 70, so leaving them unchanged was intended.
- **Blog index commits:** `f90f5ed` and `d958fc3` (2026-08-11/13) predate every translation. They were flagged only because `git log --follow` traced the translated index files back to the English one, so they show as already included. `589fe60` is the commit that created the Spanish blog index itself.

## Re-running this audit

The candidate list came from a script that pairs each English file with its counterparts and compares `git log` timestamps. Re-run it after any English content edit. Do not trust the raw list without checking diffs: mechanical sweeps (like `e38815b`) and `--follow` rename tracing both produce false positives.
