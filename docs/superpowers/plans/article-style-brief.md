# Stockade Article Style Brief

Every article-writing agent receives this document in full. It is the single source of truth for
voice, structure, and — critically — what is factually true about the Stockade product.

---

## 1. Frontmatter contract

Exactly these six keys, in this order, no others:

```yaml
---
title: "<exact title from your assignment>"
description: "<UNDER 160 characters — this is a hard build failure at 160 or above>"
date: <YYYY-MM-DD from your assignment>
author: "Stockade Team"
tags: [<exact tags from your assignment>]
slug: "<exact slug from your assignment>"
---
```

The Zod schema enforces `description.max(160)`. If you exceed it, `npm run build` fails and names
your file. Count the characters before you finish.

`author` is always exactly `Stockade Team`. Not "The Stockade Team", not your own invention.

---

## 2. Structural rules

- **1,200–2,000 words in the body**, excluding frontmatter. Count before finishing. Aim for
  1,400–1,700 — earlier articles ran close to the 2,000 ceiling and left no editing room.
- **No `#` h1 anywhere in the body.** The page layout renders the title as the page's only `h1`.
  A second one is an accessibility and SEO defect. Start sections at `##`.
- Use `##` for main sections (5–8) and `###` for subsections.
- **Section titles must be self-describing.** They populate a table-of-contents sidebar where they
  appear with no surrounding context. "What a simulator cannot teach you" works. "Limitations"
  is weak. "How to use one so it actually helps" is broken — "one" has no referent in a sidebar.
- Wrap any Markdown table in `<div class="table-wrap">` so it scrolls on mobile instead of
  breaking the page layout.
- **Close with a CTA section** — `## Practice this on the simulator` or similar — of 2–4 sentences
  tied specifically to your article's topic, ending with a Markdown link to `/simulator`.
  Generic closers are rejected; say what to go do with this specific knowledge.

---

## 3. Voice

- Second person, direct, plain English. Explain jargon on first use.
- **Open with the concrete problem the concept solves**, never a dictionary definition.
  "Your stop keeps getting hit right before the move goes your way" beats "Support is a price
  level where buying interest emerges."
- **Worked numeric examples with real arithmetic.** Actual dollar figures, actual share counts,
  actual percentages that add up. Never hand-wave with "some amount" or "a certain percentage".
  Do the math and make sure it is correct — reviewers check it.
- No hype, no emoji, no "In today's fast-paced markets", no keyword stuffing. Write the sentence
  a knowledgeable friend would say.
- **Educational framing only.** No performance promises, no financial advice, no "you will make".
  This is a simulator and must not imply returns.

### Honesty is mandatory

Articles that oversell destroy trust with exactly the audience being courted. Be explicit about:

- Indicators lag. They describe what already happened.
- Most day traders lose money.
- Backtested edges decay.
- Support and resistance levels break, often.
- **Simulated trading removes the emotional weight of real money.** Discipline that holds with
  virtual capital routinely collapses with real capital. This is the single most important
  limitation to convey.
- **Simulator fills are frictionless.** Real orders face slippage, partial fills, and spread.

---

## 4. What Stockade actually is — VERIFIED FACTS

Everything in this section was verified against component source code. The project's own
`CLAUDE.md` and `about.astro` contain outdated claims — **do not trust them, trust this.**

### 4a. The price data is SYNTHETIC. This is the most important fact in this brief.

All prices everywhere on Stockade are generated client-side by `Math.random()` random walks
(`TradingSimulator.tsx`, `LiveSimulator.tsx`, `ChartSimulator.tsx`). There is no market data
feed, no exchange connection, no API call, no historical archive anywhere in the codebase.
The site's own disclaimer page says "fictional price data generated".

You **may** write that the data *behaves* like market data — realistic OHLC candle structure,
volume, volatility, wicks, gaps.

You **may not** write, imply, or leave a reader believing that the data is real, live,
exchange-sourced, or historical. An earlier draft claimed "the price data is real market data"
and it had to be corrected before publication. Do not repeat it.

This also constrains the phrase "live". The 800ms live ticks are *simulated* ticks arriving on a
timer. Describe them as live updates to a simulated market, never as a live market feed.

### 4a-ii. What the generated data does NOT do

Three specific behaviors a reader might assume are present but are not. Each was verified in source
and each has already been caught in a draft, so check your own copy against them:

- **No price gaps, ever.** Each candle's open is set equal to the previous candle's close by
  construction (`TradingSimulator.tsx` — `const open = price` / `price = open`). Generated sessions
  are perfectly continuous. Do not claim gaps, gap-ups, gap-downs, opening gaps, or overnight gaps
  appear on Stockade. You may teach what gaps are in real markets; just do not say you can practice
  them here.
- **Volatility does not cluster.** `vol` is a fixed fraction of the instrument's base price
  (`basePrice * 0.007`), constant for every candle. Only `trend` varies. There are no calm periods
  and volatile periods. Do not claim volatility clustering, volatility regimes, or expanding and
  contracting ranges are modeled.
- **The Chart Simulator shows completed candles only.** It reveals `session.slice(0, revealed + 1)`
  — whole candles, one at a time. There is no intra-bar formation to watch there. Intra-bar
  movement DOES exist on `/simulator` via the 800ms simulated ticks, so if you want to describe
  watching a candle form, attribute it to `/simulator`, not `/chart-simulator`.

### 4a-iii. How fills actually work — be precise about this

"Frictionless fills" is a useful shorthand but it is not exactly right, and articles about order
types need the precise version:

- **No bid-ask spread is modeled.** There is a single price, not a bid and an ask. So a market
  order never costs you the spread.
- **No partial fills.** Orders fill in full or not at all.
- **Stop-loss and take-profit fills are NOT guaranteed at the trigger price.** Verified in
  `TradingSimulator.tsx:315-321`: the trigger condition is `currentPrice <= stopLoss` (for a long),
  but the position closes at `currentPrice` — the tick that crossed the level, not the level
  itself. Since ticks arrive every 800ms and move in discrete jumps, a stop can fill slightly
  beyond where you placed it.

So the honest framing is: Stockade has no spread and no partial fills, and its stop fills carry
only the small slippage that tick granularity produces — far less than a real fast market, but not
literally zero. Do not write that a simulated stop "fills exactly at the price you typed."

### 4a-iv. Two more verified constraints

- **ONE position at a time.** `TradingSimulator.tsx:204` holds a single `Position` object, and
  `changeSymbol` (`:383-385`) discards any open position when you switch symbols. You cannot hold
  simultaneous positions in different instruments, so portfolio effects — correlation, diversification,
  aggregate exposure — cannot be practised on Stockade at all. Teach them as real-market concepts only.
- **Volume uses TWO different formulas.** Seeded history: `Math.floor(Math.random() * 600_000 + 80_000)`
  (`:92`, `:119`) — range 80k–680k, mean ~380k. Candles created LIVE during a session:
  `Math.floor(Math.random() * 500_000)` (`:271`) — range 0–500k, mean ~250k. If you quote the formula
  or an expected value, say which one you mean. Both are uniformly random and uncorrelated with price.
- Related: live candles close every **10 seconds** (`:269`, `>= 10_000`). The 800ms figure is the
  tick interval within a forming candle, not the candle interval. Do not conflate them.

### 4b. The Chart Simulator does NOT replay historical data

`/chart-simulator` **generates** a session and plays it back candle-by-candle at your chosen pace.
It is not a replay of any real historical session. Describe it as candle-by-candle playback of a
generated session.

### 4c. The instruments — two different naming schemes, do not blur them

**`/simulator`, `/markets`, and the live view carry 29 instruments:**

| Class | Count | Symbols | Real or invented? |
|---|---|---|---|
| Stocks | 14 | APXL, TRXL, NVOX, MXFT, VXON, GLPH, MXTA, STRX, AXMD, CNBX, RXBT, PLZM, QVNT, VORX | **All invented companies** |
| Crypto | 8 | BLTC (Bullethon), ETHX (Etherax), SLAX, XBEN, AVXL, DRLN, FLOX, NXVR | **All invented tokens** |
| Forex | 3 | EUR/USD, GBP/USD, USD/JPY | Real names |
| Futures | 4 | /ES (S&P 500), /NQ (Nasdaq 100), /CL (Crude Oil), /GC (Gold) | Real names |

**`/chart-simulator` is separate and carries 11 instruments, all with real-world names:**
AAPL, TSLA, MSFT, NVDA, AMZN, GOOGL, BTC/USD, ETH/USD, EUR/USD, GBP/USD, SPX.

So: you may say a reader can pull up AAPL or BTC/USD **on the Chart Simulator**. You may **not**
say they can trade Bitcoin, Ethereum, Apple, or Tesla on `/simulator` or `/markets` — those carry
BLTC/Bullethon and ETHX/Etherax instead. In every case, a real ticker *label* never implies real
*data*.

Do not claim asset-class-specific price behavior. Volatility is driven by a price-tier factor,
not by whether something is a stock, a coin, or a currency pair. Crypto on Stockade does not move
differently from equities because it is crypto.

### 4d. Verified feature list

Reference only these. If you want to claim a capability not on this list, read the component
source under `src/components/` first and confirm it — that practice is what caught three factual
errors in the original version of this brief.

- **`/simulator`** — paper trading with a $100,000 virtual starting balance. Keyboard shortcuts:
  B (buy), S (sell), F (flatten). Tracks cash balance, position size, unrealized P&L, realized P&L.
- **`/chart-simulator`** — candle-by-candle playback of a generated session, at your own pace.
- **`/markets`** — the 29-instrument list, filterable and sortable.
- **`/analytics`** — equity curve, trade journal, win rate, profit factor, average win/loss,
  max drawdown, time-of-day heatmap.
- **Charts** — candlestick with volume histogram; EMA 9, EMA 20, EMA 50 overlays; VWAP, RSI, MACD.
- **Order types** — market, limit, stop-loss, take-profit, OCO bracket.
- **Live mode** — 800ms simulated ticks.
- **Access** — completely free, no signup, no account, all state stored in the browser.

---

## 5. Cross-linking

Link to sibling articles with plain relative Markdown links, e.g.
`[position sizing](/blog/risk-management-position-sizing)`. Two to four per article, only where a
concept is genuinely covered in more depth elsewhere. **Only link to slugs in the table below** —
anything else is a dead link.

---

## 6. The 20 articles

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

Tag vocabulary is closed. Use only: `Basics`, `Technical Analysis`, `Indicators`, `Order Types`,
`Risk Management`, `Strategy`, `Psychology`, `Crypto`, `Forex`, `Futures`, `Analytics`. Shared
tags drive the related-posts algorithm, so inventing a tag degrades those recommendations.

---

## 7. Topic boundaries

Several articles adjoin. Each must carry its own weight and cross-link rather than repeat:

- **#1 vs #12** — #1 defines what a simulator is and why to use one. #12 is about *how to practice
  deliberately*: session structure, journaling, what to measure, how to know you are improving.
- **#9 vs #10** — #9 is the stop-loss concept and placement logic. #10 is the mechanics of OCO
  and bracket orders as order types.
- **#4 vs #14** — #4 is moving averages. #14 is volume. Both touch confirmation; keep the overlap
  to a cross-link.
- **#15 vs #13** — #15 is position sizing arithmetic and the 1% rule. #13 is the whole plan
  document: setup criteria, entry/exit rules, review cadence.
- **#20** must tie to the *real* `/analytics` metrics listed in section 4d and must not invent
  metrics Stockade does not compute.
