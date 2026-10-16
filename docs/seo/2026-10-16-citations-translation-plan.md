# Plan: carry the external citations into the remaining translations

**Status: batch 1 (es) done. Batches 2–7 (pt, fr, it, de, ja, ko) not started; they wait for review of this revision.** First written 2026-10-16 at `537db0b`. Revised the same day after `b57901e`, `025da5e` and `add28c9` changed the English sentences the batches must translate.

## What changed since the first version

The first version asked each locale to wrap 15 links around text it already had. After batch 1 (es, `e5971f8`), each cited sentence was re-read against its source. Seven of them said more than the source did and were reworded (`b57901e`). The CME claim was false and was removed (`025da5e`). Two links moved to a source that can be read directly (`add28c9`). en and es now match each other.

**Batches 2–7 translate the final English sentences below, not the `cdd53c4` originals.** The 6 remaining locales are still on the *pre*-`b57901e` wording, with no links. This was checked in each locale's file on 2026-10-16. The only exception is "at least 300 days", which `b57901e` already applied in all 8 locales.

## Counts (verified in source and `dist/`)

- **16 links**, in **11 posts**, en and es each. es matches en link for link. Each of the 6 remaining locales has **0**.
- **15 distinct URLs.** The ESMA URL appears twice in the forex post.
- **14 cited claims.** That's the original 15, minus CME (#9, now no link). Two claims now carry more than one link: the leverage claim #6/#7 has three (EU, UK, US) and the order-types claim #11 has two.
- The futures post still changes text (#9), so batches touch **11 post files** per locale.
- **Per locale: 16 link insertions. Across pt, fr, it, de, ja, ko: 96.**

## The final English, citation by citation

URLs are reused **byte-for-byte**. "es reference" quotes the finished Spanish as a model for meaning and span, not wording to copy.

| # | Post | Final English (link span in `[ ]`) | URL | Work per locale |
|---|---|---|---|---|
| 1 | common-day-trading-mistakes | This is [the disposition effect]: | `https://en.wikipedia.org/wiki/Disposition_effect` | **Link only** |
| 2 | crypto-trading-for-beginners | In US equities, a [7% S&P 500 decline before 3:25 p.m. halts market-wide trading for 15 minutes]. | `https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-market-circuit-breakers` | **Text + link.** Add "before 3:25 p.m." and "market-wide". **No time zone**: investor.gov gives none, so don't add "ET", "hora del Este", "米国東部時間" or similar. Keep the "3:25 p.m." form unless the locale has an established time format in this post. es reference: "antes de las 3:25 p. m. detiene el trading de todo el mercado por 15 minutos" |
| 3 | crypto-trading-for-beginners | There is no equivalent of [SIPC coverage] for … | `https://www.sipc.org/for-investors/what-sipc-protects` | **Link only** |
| 4 | day-trading-vs-swing-trading | FINRA has now [retired that fixed threshold] in favor of … | `https://www.finra.org/rules-guidance/notices/26-10` | **Wrap only.** The wording is already final in all locales (`3118716`). |
| 5 | day-trading-vs-swing-trading | … found that [97% of those who kept at it for at least 300 days ended up net losers], … | `https://ideas.repec.org/p/spa/wpaper/2019wpecon47.html` | **Wrap only.** "At least" is already in all 8 (`b57901e`): pt "pelo menos", fr "au moins", it "almeno", de "mindestens", ja "300日以上", ko "300일 이상". |
| 6 | forex-trading-for-beginners | … while regulated retail forex leverage on major pairs is capped at [30:1 in the EU], [30:1 in the UK] and [50:1 in the US] — and offshore brokers advertise 500:1 and higher. | EU: `https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors`<br>UK: `https://www.fca.org.uk/publication/policy/ps19-18.pdf` **(new)**<br>US: `https://www.cftc.gov/sites/default/files/idc/groups/public/@newsroom/documents/file/forexfinalrulefactsheet.pdf` | **Text + 3 links.** Restructure the sentence. "EU and UK" (one ESMA link) becomes separate EU and UK items, so the FCA's own rule (PS19/18, COBS 22.5.11R: 3.33% margin on major FX pairs) supports the UK figure. "Retail" and "on major pairs" now cover all three figures, not only the US one, and "is capped at" replaces "runs". The table rows (`30:1 (EU/UK retail cap)`, `50:1 (US retail cap)`) are unchanged. |
| 7 | *(merged into #6)* | The CFTC link is now the third link of #6. | | |
| 8 | forex-trading-for-beginners | Brokers regulated in the EU and UK must state in a standardised risk warning what percentage of their retail accounts lose money, and [national regulators' analyses of CFD trading across EU jurisdictions found that 74–89% of retail accounts typically lose money]; ESMA attributes those losses to the products' complexity, lack of transparency and excessive leverage. | ESMA URL (same as #6) | **Rewrite + link.** Three changes. "Must publish the share" becomes "must state in a standardised risk warning what percentage". "Regulators reviewed these disclosures" becomes "national regulators' analyses of CFD trading". The figure is exactly **74–89%**: the current translations' "about 75% to nearly 90%" / "mid-70s to high-80s" is replaced. "Leverage-driven losses are the dominant reason" becomes ESMA's own three-part attribution. |
| 9 | futures-trading-explained | Stockade carries four futures symbols on `/simulator` and `/markets`, named after the real contracts below, and each of those contracts translates differently. | **none** (CME link removed) | **Text only, no link.** The translations never had the CME clause. They read "four symbols … and each translates differently". Add "named after the real contracts below/in the table", and change the subject of "translates" from the symbols to "those contracts". The engine has no multipliers, so the symbols themselves don't translate. es reference: "con los nombres de los contratos reales de la tabla, y cada uno de esos contratos se traduce distinto." Keep the locale's existing `/simulator` / `/markets` form (fr and ja link them to the locale route). |
| 10 | macd-explained | These numbers are convention, not mathematics. [Gerald Appel developed MACD in the late 1970s], and 12, 26 and 9 became its conventional default settings. | `https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator` **(changed from Britannica)** | **Rewrite + link.** Every locale still says Appel *chose* the numbers when he built or developed MACD and they "have been the default since". The source does not say he chose them. Now: Appel developed MACD in the late 1970s (linked), and 12/26/9 *became* its conventional defaults (unlinked). See `2026-10-16-rsi-macd-source-verification.md`. |
| 11 | market-orders-vs-limit-orders | Here is the sentence to memorize, and it matches how regulators themselves describe [a market order] and [a limit order]: **a market order guarantees …** | market order: `https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders`<br>limit order: `https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14` **(new: SEC "Understanding Order Types")** | **New clause + 2 links.** The translations have only "Here is the sentence to memorize:". Use "describe", not "define". Each link goes on the locale's existing term for the order type, as used in the bold sentence that follows. Use the locale's word for "regulators" from its stop-loss post (#14): pt "reguladores", fr "régulateurs", it "autorità di vigilanza", de "Aufsichtsbehörden", ja "規制当局", ko "규제 당국". |
| 12 | oco-and-bracket-orders | OCO stands for **one-cancels-other**, [a standard conditional order type]. | `https://www.fidelity.com/learning-center/trading-investing/trading/conditional-order-types` | **New appositive + link.** "Most brokers offer" was dropped, so don't translate it. Place it after the locale's existing gloss, e.g. es "(una cancela la otra), [un tipo de orden condicional estándar]". |
| 13 | rsi-indicator-overbought-oversold | The Relative Strength Index, [published by J. Welles Wilder in 1978], answers … | `https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi` **(changed from Britannica)** | **Link only** |
| 14 | stop-loss-orders-explained | … significant enough that [regulators publish investor guidance specifically about it]. | `https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15` | **Wrap only** (`e1770b7`) |
| 15 | understanding-trading-volume | A US equity trades on [more than a dozen registered exchanges] plus off-exchange venues, … | `https://www.sec.gov/about/divisions-offices/division-trading-markets/national-securities-exchanges` | **Link + one word** ("registered"). **ja drift:** ja says 「10以上の取引所」 ("10 or more"), not "more than a dozen". Decide at the ja batch whether to align the number. It isn't wrong, only weaker. |

**Per locale:**
- **Link only:** 3 (#1, #3, #13)
- **Wrap only:** 3 (#4, #5, #14)
- **Link + one word:** 1 (#15)
- **New wording:** 6 claims (#2, #6, #8, #10, #11, #12), carrying 9 links
- **Text only, no link:** 1 (#9)

That's 16 links across 11 files. The first version estimated 3 new clauses per locale; the real number is now 7 sentences of new wording per locale (#2, #6, #8, #9, #10, #11, #12). That's 42 across the six locales.

## What is reused exactly, and what is translated

- **URLs: byte-for-byte**, as in the table. No locale editions (e.g. ESMA or FCA in local languages); that is a separate, optional follow-up.
- **Proper nouns, figures and dates exactly as in English:** FINRA, SIPC, ESMA, FCA, CFTC, SEC, CFD, S&P 500, J. Welles Wilder, Gerald Appel, 1978, late 1970s, 3:25 p.m., 7%, 15 minutes, 30:1, 50:1, 500:1, 74–89%, 97%, 300 days, 12/26/9. Locale number formatting follows what that post already does (e.g. de "7 %").
- **Anchors cover the same span of meaning as the English anchor**, applied to the translation's own phrase. Rewritten sentences (#2, #6, #8, #10, #11, #12) are translated afresh. Every other sentence stays as it is.
- **Reuse established terms.** Before writing, read that locale's sentence in the **es** batch for meaning, and take vocabulary from the same post and the locale's related posts: "regulators" from #14, order-type names from the market-vs-limit post, "retail" from the forex table row ("varejo", "retail", "Retail", 「リテール」, "리테일").
- **Untouched:** everything else. A batch's diff should show only the lines in the table.

## Batching

One locale per batch, one subagent at a time (or inline), each verified in `dist/` before the next starts. Batch 1 (es) is done.

| Batch | Locale | Notes |
|---|---|---|
| ~~1~~ | ~~es~~ | **Done:** `e5971f8`, `ca87e0b`, `b57901e`, `025da5e`, `add28c9` |
| 2 | pt | Shares most phrasing with es. pt is hard-wrapped at about 100 characters: keep the wrap, and never let a wrapped line start with `-`, `1.` or `#`. A wrapped link must not break inside `](`. |
| 3 | fr | |
| 4 | it | |
| 5 | de | |
| 6 | ja | CJK. Put the link on the existing phrase with no added spaces. Use `<strong>` rather than `**` next to punctuation (see CLAUDE.md). Decide on the #15 count drift. |
| 7 | ko | CJK; same caveats as ja. |

## Per-batch verification (scripted, against `dist/`)

1. **Link parity:** each of the 11 cited posts in the locale has exactly the same multiset of external URLs as its English sibling. Forex has 4 links (ESMA ×2, FCA, CFTC), market-vs-limit has 2, and the futures post has **0**. Total: 16.
2. **URL integrity:** every URL is byte-identical to English. No `britannica.com` or `cmegroup.com` URL appears anywhere.
3. **Figures:** the forex post contains "74" and "89" and no "75%"/"90%"-style range. The crypto post contains "3:25" and no time-zone word.
4. **Rendering:** no literal `](` or `[` link syntax in the rendered article text, every link renders as `<a>`, and no unrendered `**`. The build's literal-markdown check enforces the last one.
5. **Scope:** `git diff` touches only the 11 posts, and only the sentences in the table.
6. **Build:** `npm run build` passes all three checks, and `npm test` passes.
7. **Anchor sanity:** each anchor is in the target language, apart from the proper nouns and figures above.

## Resolved since the first version

- The ja/ko literal-`**` bold spans were fixed in `855650e`, and the build now fails on any that come back. They no longer need to be kept out of these batches.
