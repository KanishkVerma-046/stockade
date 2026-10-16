# RSI / MACD citation verification

Written 2026-10-16. Covers citations #10 (MACD) and #13 (RSI) from `2026-10-16-citations-translation-plan.md`.

## Why this was re-checked

Both claims cited Britannica. Britannica returns **HTTP 403** to every direct fetch we tried (WebFetch, and curl with a browser user agent), so neither page could be read at the cited URL. An earlier session had read the MACD page through the Internet Archive but did not record the RSI snapshot.

## Findings

| # | Claim (en, as published) | URL | How verified | Snapshot date | Supported |
|---|---|---|---|---|---|
| 13 | "published by J. Welles Wilder in 1978" (`rsi-indicator-overbought-oversold`) | `https://www.britannica.com/money/relative-strength-index-rsi` | **Archive only.** Direct fetch 403. Read `https://web.archive.org/web/20260301050040/https://www.britannica.com/money/relative-strength-index-rsi`: "It was developed by J. Welles Wilder and introduced in his book *New Concepts in Technical Trading Systems* in 1978." | 2026-03-01 | **Yes**: "introduced in his book … in 1978" covers "published by … in 1978" |
| 13 | same | `https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi` | **Direct**, HTTP 200, read 2026-10-16: "The RSI, a momentum oscillator developed by J. Welles Wilder, …" and "Wilder features RSI in his 1978 book, *New Concepts in Technical Trading Systems*." | live (2026-10-16) | **Yes** |
| 10 | "Gerald Appel developed MACD in the late 1970s" (`macd-explained`) | `https://www.britannica.com/money/macd-moving-average-convergence-divergence` | **Archive only.** Direct fetch 403. Read `https://web.archive.org/web/20261012080705/https://www.britannica.com/money/macd-moving-average-convergence-divergence`: "It was developed in the late 1970s by technical analyst Gerald Appel." | 2026-10-12 | **Yes** |
| 10 | same | `https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator` | **Direct**, HTTP 200, read 2026-10-16: "Developed by Gerald Appel in the late seventies, the Moving Average Convergence/Divergence oscillator (MACD) …" | live (2026-10-16) | **Yes** |

The unlinked half of the MACD sentence ("12, 26 and 9 became its conventional default settings") is also supported by the same StockCharts page: "The values of 12, 26, and 9 are the typical settings used with the MACD" and "the default parameter setting appears: (12,26,9)".

## Decision

Both links now **point to StockCharts ChartSchool instead of Britannica**, in en and es. The anchor text and sentences are unchanged.

- **Why substitute, not add:** both sources say the same thing. A second link inside a five-word anchor would read badly. The directly readable page is the one a reviewer or translator can re-check, so it is the one we keep.
- **Translations:** the six remaining locales use the StockCharts URLs byte-for-byte (see the citations plan).
- Britannica stays a valid corroborating source, but only through the archive snapshots above.
