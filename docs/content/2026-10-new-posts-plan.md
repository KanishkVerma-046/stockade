# New posts plan: 12 weekly posts, 26 Oct 2026 – 11 Jan 2027

Written 2026-10-21. Each post goes live in all 8 locales at once, on a Monday at 06:00 IST, through the scheduled publishing set up the same day (CLAUDE.md, "Scheduled publishing"). This doc is the writers' brief: the schedule, what each post covers, and the voice guide.

## How a post ships

- Frontmatter `date: YYYY-MM-DD` (the Monday, unquoted). It goes live at the first build after 00:00 UTC that day: the Action's 00:45 UTC run (06:15 IST).
- **All 8 files must be on master before then:** `src/content/blog/{slug}.md` plus one per locale in `src/content/blog-{es,pt,ja,fr,de,ko,it}/`, each with a localized slug, `translationOf: "{english-slug}"` and **the same date**. If any locale is missing on the day, the build fails and nothing deploys, including other changes. If a post won't be ready, move its date in all 8 files.
- Merge early. A future-dated post is invisible until its date, so there is no reason to hold finished posts back. Preview with `SHOW_FUTURE=1 npm run build` then `npm run preview` (PowerShell: `$env:SHOW_FUTURE='1'; npm run build`, then `Remove-Item Env:SHOW_FUTURE`).
- **A post can link only to posts already live on its date.** Linking to a later post fails the build. So the order below goes from foundations to applications, and each post links back, never forward. Forward links (for example, adding a link from the existing position-sizing post to the drawdown post) are a separate edit made on or after the target's date.
- Translated posts link to their own locale's siblings (build-enforced by the localized-link check).

## Schedule

| Date (Mon, 06:00 IST) | English slug | Working title (rendered length incl. " \| Stockade") | Tags |
|---|---|---|---|
| 26 Oct 2026 | `risk-reward-ratio-expectancy` | Risk-Reward Ratio and Expectancy: How They Fit Together (66) | Risk Management, Strategy |
| 2 Nov 2026 | `drawdown-recovery-math` | Drawdown Math: Why a 50% Loss Needs a 100% Gain (58) | Risk Management, Analytics |
| 9 Nov 2026 | `atr-volatility-stops` | ATR Stops: Setting Stop-Losses by Volatility (55) | Indicators, Risk Management |
| 16 Nov 2026 | `trading-journal-guide` | How to Keep a Trading Journal You Will Actually Use (62) | Psychology, Analytics |
| 23 Nov 2026 | `bollinger-bands-explained` | Bollinger Bands Explained: What the Bands Measure (60) | Indicators, Technical Analysis |
| 30 Nov 2026 | `trend-lines-and-channels` | Trend Lines and Channels: How to Draw Them Properly (62) | Technical Analysis |
| 7 Dec 2026 | `backtesting-vs-paper-trading` | Backtesting vs Paper Trading: What Each Can Prove (60) | Strategy, Basics |
| 14 Dec 2026 | `short-selling-explained` | Short Selling Explained: How Betting on a Fall Works (63) | Basics, Order Types |
| 21 Dec 2026 | `overtrading-revenge-trading-fomo` | Overtrading, Revenge Trading and FOMO: How to Stop (61) | Psychology |
| 28 Dec 2026 | `chart-patterns-explained` | Chart Patterns: Head and Shoulders, Triangles, Flags (63) | Technical Analysis |
| 4 Jan 2027 | `fibonacci-retracements` | Fibonacci Retracements: How They Work and the Evidence (65) | Technical Analysis, Indicators |
| 11 Jan 2027 | `practice-a-trading-strategy` | How to Practice a Trading Strategy Step by Step (58) | Strategy, Basics |

**Order: kept as given.** It already runs foundations first, which suits back-only linking: risk-reward → drawdown → ATR stops builds the risk sequence; trend lines (30 Nov) come before chart patterns (28 Dec), whose triangles, flags and necklines are drawn with them; backtesting, the journal and overtrading all come before the 11 Jan capstone, which can then link to everything. No swap would add links, and 26 Oct stays risk-reward.

Titles and tags are proposals. Tags come from the existing set, since `RelatedPosts` ranks by shared tags. Titles use US spelling ("Practice", the verb) to match existing titles such as "Paper Trading: How to Practice…". Keyword choices are editorial judgment; no search-volume data was used.

## Per-post briefs

Existing posts are referred to by English slug (`/blog/{slug}/`). App pages: `/simulator/`, `/chart-simulator/`, `/markets/`, `/analytics/`. "Sources needed" lists the claims a writer is likely to make that are neither arithmetic nor common knowledge. Named candidate sources are starting points; check that each says exactly what the sentence says before linking it (see "Citations" below).

### 1. 26 Oct — `risk-reward-ratio-expectancy`

- **Keyword:** risk reward ratio (secondary: trading expectancy, breakeven win rate).
- **Angle:** A risk-reward ratio means nothing on its own; it only tells you the win rate you need to break even, which is `1 / (1 + R)`. Teach choosing a target by asking whether that win rate is realistic, and why "never take less than 1:3" is a rule of thumb, not a law.
- **Overlap to avoid:** `analyze-trading-performance-metrics` already defines expectancy with its formula, and `risk-management-position-sizing` has R-multiples. Link to both for those; don't re-derive them. The new ground is the ratio–win-rate trade-off, the breakeven table, and how stop and target distances both change it.
- **Links:** `analyze-trading-performance-metrics`, `risk-management-position-sizing`, `stop-loss-orders-explained`, `oco-and-bracket-orders`, `how-to-build-a-trading-plan`; `/simulator/` (stop-loss/take-profit levels), `/analytics/` (Win Rate, Avg Win, Avg Loss, Profit Factor).
- **Sources needed:** none for the arithmetic. Any claim about how often real traders hit their targets, or what ratio professionals use, needs a source or should be cut.

### 2. 2 Nov — `drawdown-recovery-math`

- **Keyword:** drawdown recovery (secondary: why a 50% loss needs 100%, max drawdown).
- **Angle:** The full arithmetic of losing: the recovery table, how fast streaks compound at different risk-per-trade levels, why an average return overstates what you keep (volatility drag), and how to pick a maximum drawdown you can live with *before* you need it.
- **Overlap to avoid:** `risk-management-position-sizing` has a short "Drawdown recovery is brutally asymmetrical" section with the formula, and `analyze-trading-performance-metrics` covers max drawdown as a metric. Link to both and go deeper: the table, streak math and volatility drag are new.
- **Links:** `risk-reward-ratio-expectancy` (live 26 Oct), `risk-management-position-sizing`, `analyze-trading-performance-metrics`, `common-day-trading-mistakes`; `/analytics/` (Max Drawdown).
- **Sources needed:** none for the arithmetic, including streak probabilities (binomial) and volatility drag. Any real-index drawdown (for example, a peak-to-trough figure for the S&P 500 in 2008–09) needs a primary source with exact dates.
- **Stockade check:** `/analytics/` computes Max Drawdown from closed-trade equity only, as a percentage of peak (AnalyticsDashboard.tsx, `maxDD`); it doesn't see open-trade swings. This is not yet in the verified-facts table, so add it there before relying on it.

### 3. 9 Nov — `atr-volatility-stops`

- **Keyword:** ATR stop loss (secondary: average true range, volatility-based stops).
- **Angle:** A fixed-dollar or fixed-percentage stop ignores how far the instrument normally moves. Explain true range and ATR, work an ATR-multiple stop end to end, and show how it feeds position size so dollar risk stays fixed while the stop widens.
- **Links:** `stop-loss-orders-explained`, `risk-management-position-sizing`, `risk-reward-ratio-expectancy`, `drawdown-recovery-math`, `support-and-resistance-levels`, `how-to-read-candlestick-charts`; `/simulator/`.
- **Sources needed:** that J. Welles Wilder introduced ATR, and when (candidate: his 1978 *New Concepts in Technical Trading Systems*, the same book the RSI post cites via StockCharts ChartSchool); the default 14-period setting. Any named method (for example, the chandelier exit) needs a source for who devised it.
- **Stockade flag:** Stockade has **no ATR indicator** (it plots EMA 9/20/50, VWAP, RSI, MACD). And its volatility is **constant**: one model for every symbol, moves scaled to price (verified-facts table, "Volatility model"), so ATR on Stockade would barely change. The CTA can have readers measure candle ranges by hand to size a stop, but must not say Stockade shows ATR or lets them practise adapting to changing volatility.

### 4. 16 Nov — `trading-journal-guide`

- **Keyword:** trading journal (secondary: how to keep a trading journal, trading journal template).
- **Angle:** Most journals die in week two because they record too much. Offer a minimal template (setup, planned entry/stop/target, rule followed y/n, one-line lesson), a tagging scheme, and a weekly review that turns entries into one rule change.
- **Overlap to avoid:** `paper-trading-guide` ("What to write down for every trade") and `analyze-trading-performance-metrics` ("What the trade journal records and what you must record yourself") cover what to log. This post is about the *system*: template, tags, review cadence and keeping it going. Link to both rather than repeating them.
- **Links:** `paper-trading-guide`, `analyze-trading-performance-metrics`, `how-to-build-a-trading-plan`, `risk-reward-ratio-expectancy`, `drawdown-recovery-math`, `common-day-trading-mistakes`; `/analytics/`.
- **Sources needed:** any claim that journaling improves results needs a source; if none is found, argue it from the review logic instead of asserting an effect.
- **Stockade check:** the `/analytics/` Journal tab shows 8 columns per closed trade (Symbol, Side, Entry, Exit, Qty, P&L, Duration, Date) and has no notes field (AnalyticsDashboard.tsx). The existing analytics post already says so. Not yet in the verified-facts table, so add it before relying on it.

### 5. 23 Nov — `bollinger-bands-explained`

- **Keyword:** bollinger bands (secondary: bollinger band squeeze, bollinger bands strategy).
- **Angle:** The bands measure volatility around a moving average, not overbought/oversold. Cover the calculation (20-period SMA ± 2 standard deviations), what "price at the band" does and doesn't mean, the squeeze, and the common misreading that 95% of prices stay inside.
- **Links:** `moving-averages-ema-vs-sma`, `rsi-indicator-overbought-oversold`, `atr-volatility-stops`, `support-and-resistance-levels`, `macd-explained`; `/simulator/`.
- **Sources needed:** that John Bollinger developed them, and when; the default settings; what Bollinger himself says about the containment percentage (candidates: bollingerbands.com, StockCharts ChartSchool). Any squeeze success rate needs a source or should be cut.
- **Stockade flag:** **no Bollinger Bands** on Stockade, and constant volatility means **no squeezes** to find. The CTA must not offer to practise either. It can point readers at the EMAs to practise the moving-average half.

### 6. 30 Nov — `trend-lines-and-channels`

- **Keyword:** how to draw trend lines (secondary: trend channel, trendline trading).
- **Angle:** Trend lines are subjective, so make them checkable: which points to anchor (wicks vs bodies, and pick one), how many touches before it counts, when a break is a break, and drawing parallel channels. Argue that the honest use is as a zone, not a line.
- **Links:** `support-and-resistance-levels`, `how-to-read-candlestick-charts`, `moving-averages-ema-vs-sma`, `day-trading-vs-swing-trading`; `/chart-simulator/`, `/simulator/`.
- **Sources needed:** few. Conventions such as "three touches confirm a line" are conventions, so present them as such, or cite ChartSchool for the convention. Claims that trend-line breaks predict anything need a source.
- **Stockade flag:** Stockade has **no drawing tools**, so readers sketch lines mentally or on a screenshot. Prices are a random walk with a slowly drifting trend bias (verified-facts table, "Price model"), so trends and channels do appear, but any break is random. Say that plainly and don't present Stockade as a place to test whether lines predict.

### 7. 7 Dec — `backtesting-vs-paper-trading`

- **Keyword:** backtesting vs paper trading (secondary: forward testing, backtest overfitting).
- **Angle:** A backtest asks whether rules would have made money on past data; paper trading asks whether *you* can execute them. Neither proves an edge alone. Cover overfitting, look-ahead and survivorship bias, then a sequence: backtest, forward-test on paper, then small real size.
- **Links:** `paper-trading-guide`, `what-is-a-stock-market-simulator`, `how-to-build-a-trading-plan`, `analyze-trading-performance-metrics` (sample size), `trading-journal-guide`, `risk-reward-ratio-expectancy`; `/simulator/` (replay mode).
- **Sources needed:** backtest overfitting (candidates: Bailey, Borwein, López de Prado & Zhu, "Pseudo-Mathematics and Financial Charlatanism", *Notices of the AMS*, 2014; Harvey & Liu, "Backtesting", *Journal of Portfolio Management*, 2015); definitions of survivorship and look-ahead bias if stated as research findings.
- **Stockade flag:** Stockade **cannot backtest**: there is no historical data and no rule engine. Replay mode is 600 generated one-minute candles you step through by hand (verified-facts table, "Replay"). Frame it as forward-testing your execution on synthetic data, never as a backtest or as historical replay.

### 8. 14 Dec — `short-selling-explained`  ⚠ simplified in Stockade

- **Keyword:** short selling explained (secondary: how to short a stock, short squeeze).
- **Angle:** Borrow, sell, buy back. Then everything that makes it harder than buying: losses with no ceiling, borrow fees and hard-to-borrow stocks, margin and margin calls, dividends owed to the lender, squeezes, and US short-sale rules.
- **Links:** `market-orders-vs-limit-orders`, `stop-loss-orders-explained`, `risk-management-position-sizing`, `atr-volatility-stops`, `forex-trading-for-beginners` (long one currency, short another), `futures-trading-explained`; `/simulator/`.
- **Sources needed:** Reg SHO locate and close-out requirements (SEC); Rule 201, the alternative uptick rule (SEC); Regulation T and FINRA Rule 4210 margin for shorts (FINRA/Fed); that short sellers owe dividends to the lender; any squeeze example (with dates and figures from a primary or reputable source). Use investor.gov or sec.gov where they cover it, as the existing posts do.
- **Stockade flag, must be stated in the post:** Stockade's shorting is simplified (verified-facts table, "Shorting"): selling from flat opens a short with **no balance or margin check**, the proceeds are credited to cash, and **no borrow cost** applies. There is also no locate, no margin call, no dividend and no squeeze. Say what Stockade does practise (P&L arithmetic on the way down, and a stop-loss above a short) and list what it leaves out, the way `/simulator/`'s "What this simulator does not model" list does. Never say shorting on Stockade is realistic.

### 9. 21 Dec — `overtrading-revenge-trading-fomo`

- **Keyword:** revenge trading (secondary: overtrading, FOMO trading).
- **Angle:** Three failure modes with one cause: trading to change how you feel. For each, the trigger, what it looks like in your own trade log, and a mechanical stop that doesn't depend on willpower in the moment.
- **Overlap to avoid:** `common-day-trading-mistakes` already has short revenge-trading and overtrading sections with a cooldown rule. Go further: how to spot each in a journal, FOMO (not covered there), and session rules. Link back rather than repeat.
- **Links:** `common-day-trading-mistakes`, `trading-journal-guide`, `drawdown-recovery-math`, `how-to-build-a-trading-plan`, `paper-trading-guide`; `/analytics/` (Total Trades, time-of-day heatmap).
- **Sources needed:** that frequent trading hurts returns (candidate: Barber & Odean, "Trading Is Hazardous to Your Wealth", *Journal of Finance*, 2000; quote its figures exactly); loss aversion (candidate: Kahneman & Tversky, prospect theory, 1979). The disposition-effect link already used in `common-day-trading-mistakes` can be reused. Don't attribute "FOMO" or "revenge trading" to research unless a source uses the term.
- **Stockade check:** a simulator can't reproduce the emotional pull of real money; say so, as the existing posts do (style brief, "Honesty is mandatory").

### 10. 28 Dec — `chart-patterns-explained`

- **Keyword:** chart patterns (secondary: head and shoulders pattern, triangle pattern, bull flag).
- **Angle:** How the three classic families are drawn, where traders put entry, stop and measured-move target, and how often they fail. Present them as a vocabulary for describing price, not as signals with known odds.
- **Links:** `trend-lines-and-channels` (necklines, triangle and flag boundaries), `support-and-resistance-levels`, `understanding-trading-volume`, `how-to-read-candlestick-charts`, `risk-reward-ratio-expectancy`, `atr-volatility-stops`; `/chart-simulator/`.
- **Sources needed:** any success or failure rate (candidates: Lo, Mamaysky & Wang, "Foundations of Technical Analysis", *Journal of Finance*, 2000; Bulkowski's pattern statistics, but cite the exact edition and table, or leave the numbers out); the measured-move convention (ChartSchool).
- **Stockade flag:** `/chart-simulator/` detects **candlestick** patterns (a 24-entry library, 9 of which never form; verified-facts table), **not** chart patterns. Don't say it finds head and shoulders, triangles or flags. Shapes resembling them may appear in a random walk; at most say you can practise *spotting* them by eye.

### 11. 4 Jan — `fibonacci-retracements`

- **Keyword:** fibonacci retracement (secondary: fibonacci levels, does fibonacci trading work).
- **Angle:** Explain the levels (23.6, 38.2, 61.8, and 50%, which is not a Fibonacci ratio) and how traders draw them, then weigh the case for them: self-fulfilling clustering at best, and no good evidence that the ratios themselves matter. Take a clear position based on the evidence.
- **Links:** `support-and-resistance-levels`, `trend-lines-and-channels`, `chart-patterns-explained`, `backtesting-vs-paper-trading`, `moving-averages-ema-vs-sma`; `/chart-simulator/`.
- **Sources needed:** this post is the most source-dependent. Every statement about evidence, for or against, needs a peer-reviewed or otherwise credible source that the writer has read; none are named here because none have been checked yet. If the search finds no credible test either way, say that plainly ("we found no rigorous evidence that…") and don't cite weak sources to fill the gap. The derivation of the ratios is maths and needs no source.
- **Stockade flag:** no Fibonacci tool. On a random walk, any respect for a level is coincidence, which is a fair way to show how easy it is to find one after the fact, as long as it's framed that way.

### 12. 11 Jan — `practice-a-trading-strategy`  ⚠ every product claim must be checked

- **Keyword:** how to practice a trading strategy (secondary: practice trading, stock market simulator practice).
- **Angle:** A step-by-step protocol: write the rule set, fix risk per trade, run a set number of replay sessions, log each trade, review in `/analytics/`, change one thing, repeat. It ties the series together.
- **Links:** everything relevant above (all live by now), plus `paper-trading-guide`, `how-to-build-a-trading-plan`, `analyze-trading-performance-metrics`, `what-is-a-stock-market-simulator`; `/simulator/`, `/chart-simulator/`, `/analytics/`, `/markets/`.
- **Sources needed:** none for the protocol, which is advice. Any claim about how many trades make a meaningful sample should match `analyze-trading-performance-metrics`.
- **Stockade flag:** this post describes the product more than any other, so **every sentence about Stockade must match the verified-facts table** in `docs/seo/2026-10-16-realism-claims-fixes.md`: generated prices, one volatility model, no gaps, market/limit fills, stop-loss/take-profit as an OCO bracket on the position, no margin, simplified shorting, 600-candle replay, 29 symbols. Re-read the table and the code the week before 11 Jan, since the product may change between writing and publishing. Facts not in the table (keyboard shortcuts, Analytics metrics, how many positions you can hold) must be verified in source and added to the table first. In particular, the style brief's "ONE position at a time / switching symbol discards the position" claim (`article-style-brief.md` §4a-iv) predates the table, so re-verify it before use.

## Voice guide

The structural rules in `docs/superpowers/plans/article-style-brief.md` still apply (frontmatter contract, no `#` h1, 5–8 self-describing `##` sections, `<div class="table-wrap">` around tables, closing practice section). Its product facts predate the 2026-10-16 verified-facts table: **where they disagree, the table wins.**

### How it should sound

- Like someone who knows this well, explaining it to a friend over coffee. Plain words, specific examples, and a view where the evidence supports one ("this rule is folklore", "we wouldn't use this").
- Vary sentence length. Short paragraphs, usually 2–4 sentences. Open each post with the concrete problem, not a definition.
- Plural editorial **"we"**, byline `author: "Stockade Team"`. "We" is a convention, not a headcount, so never "our team", "our analysts" or "we're a group of…" (CLAUDE.md, "Attribution is headcount-neutral").
- Second person for the reader. Explain jargon the first time it appears.

### Honesty rules

- **No invented anecdotes, experiences, credentials or testimonials.** No "when we started trading", no "a reader told us", no "in our years on the desk", no made-up traders with names.
- **No fabricated statistics.** Every factual claim is common knowledge, arithmetic shown in the post, or sourced.
- **Numeric examples are clearly hypothetical:** "Say you buy a hypothetical $40 stock…", "Imagine an account of $10,000…". Use round, invented numbers, never a real ticker's real price. Do the arithmetic and check it.
- **Nothing about Stockade beyond the verified-facts table** (`docs/seo/2026-10-16-realism-claims-fixes.md`). If a post needs a fact the table lacks, verify it in code and add it to the table first. The two flagged posts are **short selling** (the simulator's shorting has no margin check and no borrow cost) and **practising in Stockade** (the most product claims). Also watch the indicator posts: Stockade has no ATR, Bollinger Bands, drawing tools or Fibonacci tool.
- Educational framing only: no performance promises, no "you will make", no financial advice.

### Citations

Same standard as the existing posts (`docs/seo/2026-10-16-citations-translation-plan.md` shows it applied):

- Link the specific phrase the source supports, inline, with a Markdown link. Prefer primary sources: regulators (sec.gov, investor.gov, finra.org, cftc.gov, esma.europa.eu), the original paper, the indicator author's own site, or StockCharts ChartSchool for indicator definitions.
- **The sentence must say no more than the source.** Seven cited sentences in the existing posts had to be reworded because they overstated their source, and one claim was removed as false. Read the page, not a summary of it.
- A link must open directly to the supporting text (no paywall where avoidable, no search pages).
- Translations reuse the English URLs byte for byte.

### Phrases to avoid

These read as machine-written and get edited out on review:

- "In today's fast-paced world/markets", "In the world of trading", "Whether you're a beginner or a seasoned trader"
- "delve", "dive in/deep dive", "unlock", "unleash", "harness", "empower", "elevate", "supercharge"
- "It's important to note", "It's worth noting", "It goes without saying", "Needless to say"
- "game-changer", "navigate the complexities", "the ever-evolving landscape", "a testament to", "tapestry", "realm", "embark on a journey"
- "robust", "seamless", "cutting-edge", "crucial"/"vital" as filler
- "In conclusion", "In summary", "At the end of the day", "Ultimately," as a closer
- "Not only… but also…" and three-item lists used for rhythm rather than content
- Opening with a rhetorical question or "Picture this:"/"Imagine a world…"

"Leverage" is fine as the trading term, but not as a verb meaning "use".

### Frontmatter and length

```yaml
---
title: "…"          # rendered "{title} | Stockade" must be ≤ 69 characters, so ≤ 58 here
description: "…"    # ≤ 160 characters, build-enforced
date: 2026-10-26    # the Monday, unquoted, identical in all 8 locales
author: "Stockade Team"
tags: ["Risk Management", "Strategy"]
slug: "risk-reward-ratio-expectancy"
---
```

Translations add `translationOf: "{english-slug}"` and use a localized `slug` chosen for the target-language keyword. Their rendered titles must also stay ≤ 69 characters.

**Length:** existing posts run 1,775–2,262 words per file (about 1,700–2,100 in the body). Aim for 1,600–2,000 body words.

### Translation reminders

- Reuse each locale's established terms from its existing posts and pages before translating fresh (for example the `/simulator/` limitations list and the citations plan's per-locale wording).
- ja/ko: use `<strong>…</strong>` rather than `**` where the bold touches punctuation or particles (the build fails on literal `**`), and keep each sentence on one unbroken source line.
- Internal links point at the locale's own siblings, and app links at `/{locale}/simulator/` etc. (build-enforced).
