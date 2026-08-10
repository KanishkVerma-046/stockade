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
