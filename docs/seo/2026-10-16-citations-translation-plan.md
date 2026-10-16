# Plan: carry cdd53c4's citations into the 7 translations

**Status: plan only. Nothing implemented.** Written 2026-10-16 at `537db0b`.

`cdd53c4` (2026-09-10) added 15 inline external citations, plus one claim softening, to 12 English blog posts. The drift audit counted **112 edits** across 7 locales: 16 per locale. Since then, `e1770b7` has done part of the work:

- **Done:** the candlestick claim softening (7 of 112), and the wording of 4 claim sentences that carry citations. All of it is text only; no links were added.
- **Remaining: 105 link edits**, 15 per locale.

## The 15 citations, by how much work each needs per locale

| # | English post | English anchor text | URL (reused byte-for-byte) | Work per locale |
|---|---|---|---|---|
| 1 | common-day-trading-mistakes | the disposition effect | `https://en.wikipedia.org/wiki/Disposition_effect` | **Link only.** The phrase already exists in the translation. |
| 2 | crypto-trading-for-beginners | 7% S&P 500 decline halts trading for 15 minutes | `https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-market-circuit-breakers` | **Link only** |
| 3 | crypto-trading-for-beginners | SIPC coverage | `https://www.sipc.org/for-investors/what-sipc-protects` | **Link only** |
| 4 | day-trading-vs-swing-trading | retired that fixed threshold | `https://www.finra.org/rules-guidance/notices/26-10` | **Wrap only.** The sentence was rewritten in `e1770b7`. |
| 5 | day-trading-vs-swing-trading | 97% of those who kept at it for more than 300 days ended up net losers | `https://ideas.repec.org/p/spa/wpaper/2019wpecon47.html` | **Wrap only** (`e1770b7`) |
| 6 | forex-trading-for-beginners | 30:1 in the EU and UK | `https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors` | **Link only** |
| 7 | forex-trading-for-beginners | 50:1 in the US on majors | `https://www.cftc.gov/sites/default/files/idc/groups/public/@newsroom/documents/file/forexfinalrulefactsheet.pdf` | **Link only** |
| 8 | forex-trading-for-beginners | regulators reviewed these disclosures across EU jurisdictions | same ESMA URL as #6 | **Wrap only** (`e1770b7`) |
| 9 | futures-trading-explained | CME Group's real contract specifications | `https://www.cmegroup.com/markets/equities/sp/e-mini-sandp500.contractSpecs.html` | **Text + link.** Adds the clause "modeled on CME Group's real contract specifications for each". |
| 10 | macd-explained | Gerald Appel chose them when he developed MACD in the late 1970s | `https://www.britannica.com/money/macd-moving-average-convergence-divergence` | **Link + one word** ("built" became "developed") |
| 11 | market-orders-vs-limit-orders | how regulators themselves define the two order types | `https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders` | **Text + link.** Adds "and it matches how regulators themselves define the two order types". |
| 12 | oco-and-bracket-orders | a standard conditional order type most brokers offer | `https://www.fidelity.com/learning-center/trading-investing/trading/conditional-order-types` | **Text + link.** Adds the appositive. |
| 13 | rsi-indicator-overbought-oversold | published by J. Welles Wilder in 1978 | `https://www.britannica.com/money/relative-strength-index-rsi` | **Link only** |
| 14 | stop-loss-orders-explained | regulators publish investor guidance specifically about it | `https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15` | **Wrap only** (`e1770b7`) |
| 15 | understanding-trading-volume | more than a dozen registered exchanges | `https://www.sec.gov/about/divisions-offices/division-trading-markets/national-securities-exchanges` | **Link + one word** ("registered") |

**Per locale:** 6 link-only + 4 wrap-only + 2 link-plus-one-word + 3 new clauses. Only those 3 clauses (#9, #11, #12) need fresh translation; the other 12 wrap text that is already translated.

## What is reused exactly, and what is translated

A clarification first: the English **anchor text** cannot be reused verbatim inside a Spanish or Japanese sentence. "Reused exactly" applies to the following:

- **URLs: byte-for-byte**, including the `#`-less and trailing-slash forms above. No locale-edition substitutions (e.g. ESMA in local languages) unless you decide otherwise. That is a separate, optional follow-up.
- **Proper nouns, figures and dates exactly as in English:** FINRA, SIPC, CME Group, ESMA, CFTC, SEC, J. Welles Wilder, Gerald Appel, 1978, late 1970s, 7%, 15 minutes, 30:1, 50:1, 97%, 300 days, S&P 500.
- **The anchor covers the same span of meaning as the English anchor.** It is applied to the translation's existing phrase for that span. The link goes on the words the sentence already uses; nothing is re-translated around it.
- **Translated:** only the three new clauses (#9, #11, #12) and the two one-word changes (#10, #15). Each reuses the locale's established terms from the same post, and from that locale's existing translations of related posts (e.g. its word for "regulators" from the `e1770b7` edits; its order-type terms from its market-vs-limit post).
- **Untouched:** every other sentence. A batch's diff should show only lines that gain a link.

## Batching

**One locale per batch, 15 edits each, one subagent at a time** (or inline), each verified in `dist/` before the next starts.

| Batch | Locale | Why this order |
|---|---|---|
| **1** | **es** | Latin script and the earliest, most-reviewed translation, so it's the easiest to spot-check. **Review checkpoint: stop after this batch.** |
| 2 | pt | Shares most phrasing patterns with es. Note pt is hard-wrapped at about 100 characters: keep the wrap, and never let a wrapped line start with `-`, `1.` or `#`. |
| 3 | fr | |
| 4 | it | |
| 5 | de | |
| 6 | ja | CJK. Put the link on the existing phrase with no added spaces. See the emphasis caveat below. |
| 7 | ko | CJK; same caveats as ja. |

The alternative, batching by **post cluster** (e.g. all 7 locales of the 4 regulatory posts at once), gives a more uniform review per claim. But it mixes 7 languages into one review, which is harder to check, so per-locale batches are recommended.

**At the checkpoint after batch 1, review:**
- the es diff (should be 12 files, about 15 changed lines)
- the three new clauses' wording
- the rendered links on 2–3 posts

Then decide whether batches 2–7 can run straight through, with the same per-batch verification.

## Per-batch verification (scripted, against `dist/`)

1. **Link parity:** each of the 12 posts in the locale contains exactly the same multiset of these URLs as its English sibling (forex has the ESMA URL twice).
2. **URL integrity:** every URL is byte-identical to English.
3. **Rendering:** no literal `](` or `[` link syntax survives in the rendered article text, every new link renders as an `<a>`, and there is no unrendered `**`.
4. **Scope:** `git diff` shows changes only on lines that gain a citation, plus the three new clauses and two one-word changes. Nothing else moves.
5. **Build:** `npm run build` passes, including the localized-link check (external links are ignored by it, so it won't interfere), and `npm test` passes.
6. **Anchor sanity:** each anchor's text is in the target language, apart from the proper nouns and figures above. No anchor is pasted in English.

## Adjacent issue, kept out of these batches

About 31 bold spans in 16 ja/ko posts render as literal `**`. The opener sits between a letter and punctuation, so CommonMark won't treat it as emphasis; the one in the ja PDT paragraph was fixed in `e1770b7`. Some of the posts above are affected (e.g. ja `fx-toreedo-nyumon`, ja/ko crypto). Fixing those in a citation batch would blur the diff, so fix them as one dedicated change before or after the ja/ko batches.

## Effort

- **Total:** 105 link edits, of which 21 need new translated words (3 clauses + 2 words, × 7). Roughly the size of one short blog post's worth of translation, spread across 7 locales.
- **Per batch:** small, about 15 edits in 12 files, plus the scripted verification. Batch 1 plus its review is the long pole. Batches 2–7 follow the same template.
