---
title: "Moving Averages Explained: EMA vs SMA and How to Use Them"
description: "SMA and EMA differ by one multiplier. Here is the arithmetic, why 9/20/50 are standard, how to use them as support, and why they always lag."
date: 2026-04-13
author: "Stockade Team"
tags: ["Indicators", "Technical Analysis"]
slug: "moving-averages-ema-vs-sma"
---

You are staring at a chart that has gone up, down, up, down, and up again over the last forty bars, and you cannot tell whether it is trending or just wobbling. Every individual candle is noise. The question you want answered — "is this thing generally going somewhere?" — is not visible in any single bar, because it is a question about the whole sequence.

A moving average is the simplest answer to that question. It takes a run of recent closing prices, collapses them into one number, and redraws that number on every new bar. The jitter cancels out, and what is left is a line you can look at and immediately call rising, falling, or flat.

## What a moving average actually computes

Take the last five closing prices of some instrument: 182.00, 184.50, 183.00, 186.00, 185.50. Add them: 921.00. Divide by 5: **184.20**. That is a 5-period simple moving average, or SMA.

The word "moving" is the important half. On the next bar a new close arrives — say 190.00 — and the oldest one, 182.00, falls out of the window. The new sum is 921.00 − 182.00 + 190.00 = 929.00, and the new SMA is 929.00 ÷ 5 = **185.80**. The window slid forward one bar and the average moved up 1.60.

Note that the average changed for two reasons: a new price came in *and* an old price left. That second effect is easy to miss — an SMA can jump simply because a large number dropped out of the back of the window, even if today's price barely moved.

## SMA vs EMA: the weighting multiplier and why EMA reacts faster

The SMA gives every price in its window the same vote. In a 20-period SMA, the close from 20 bars ago counts as much as yesterday's — then, on the next bar, counts for nothing at all. That is a strange model of relevance.

The exponential moving average fixes it. Instead of a window, the EMA keeps a running value and nudges it toward each new close by a fixed fraction — the **smoothing multiplier**:

```
multiplier = 2 / (period + 1)
```

For a 9-period EMA that is 2 / 10 = **0.2**. The update rule is:

```
new EMA = prior EMA + multiplier x (new close - prior EMA)
```

Work one bar. Suppose the 9-period EMA currently reads 186.50 and the bar closes at 188.00. The gap is 188.00 − 186.50 = 1.50. Multiply by 0.2 to get 0.30. So:

**new EMA = 186.50 + 0.2 x (188.00 − 186.50) = 186.50 + 0.30 = 186.80**

The EMA moved 30 cents in response to a $1.50 move. It closes 20% of the distance to the new price on every bar, forever. Nothing fully drops out of an EMA — old prices just shrink. With a 0.2 multiplier the weight on a close from *n* bars back is 0.2 × 0.8ⁿ, so a price 10 bars ago still carries about 2.1% of the weight, and one 30 bars ago carries a rounding error.

Now the speed comparison. Our 5-period SMA moved from 184.20 to 185.80 — a gain of 1.60 — when 190.00 arrived. A 5-period EMA sitting at that same 184.20, multiplier 2/6 = 0.3333, would go to 184.20 + 0.3333 × 5.80 = **186.13**, a gain of 1.93. Same data, more movement. That is the whole difference: the EMA reacts faster because it weights recent prices more heavily.

Faster is not better. Faster means earlier signals *and* more false ones. An SMA is quieter and will hold you in a trend through pullbacks that shake an EMA trader out. Stockade's charts compute EMAs the standard way: the first value is seeded with a simple average of the opening window, and every bar after that uses the multiplier above.

## Choosing a period, and why 9, 20, and 50 show up everywhere

The period is one dial trading responsiveness against stability. Short periods hug price and turn constantly; long periods ignore most of what happens and turn rarely. Look at what the multiplier does across the three EMAs Stockade overlays, using a prior EMA of 186.50 and a close of 188.00 in every row:

<div class="table-wrap">

| EMA | Multiplier | Move on a +1.50 gap | Role |
|---|---|---|---|
| EMA 9 | 2/10 = 0.2000 | +0.30 | Short-term momentum |
| EMA 20 | 2/21 = 0.0952 | +0.14 | Intraday trend |
| EMA 50 | 2/51 = 0.0392 | +0.06 | Structural bias |

</div>

The EMA 50 barely flinches at a move that shifts the EMA 9 five times as much. They are answering different questions: the 9 answers "what has price been doing this hour," the 50 answers "which way has this instrument leaned all session."

Why these specific numbers? Mostly convention that partly self-fulfills — enough traders watch the same three lines that reactions cluster around them. Nothing is mathematically special about 9 or 20 or 50, and you should resist hunting for the "optimal" period on past data. That is curve-fitting, and periods tuned to yesterday's chart decay quickly.

Stockade puts all three on the chart in distinct colors — EMA 9 amber, EMA 20 blue, EMA 50 violet — with a toggle for each, so you can strip it down to one line while you learn what that line does.

## Using moving averages as dynamic support and resistance

Horizontal [support and resistance levels](/blog/support-and-resistance-levels) are fixed prices. A moving average is a level that moves with the market, which makes it useful in trends where a fixed line goes stale within an hour. In a healthy uptrend, price pulls back, touches or slightly undercuts a rising EMA, and resumes — traders call this "riding the 20." In a downtrend the same line acts as a ceiling that rallies fail against.

Be honest about what this is. The EMA is not a barrier; it is a descriptive line that happens to sit where recent buying has been concentrated, and it fails routinely. If you treat one as support you still need a stop below it — "price bounced off the 20 the last three times" describes three events, not a property of the instrument.

## The crossover strategy and its whipsaw failure mode

The classic mechanical rule: buy when a fast MA crosses above a slow MA, sell when it crosses back below. On Stockade's chart set that is the EMA 9 crossing the EMA 20, or the 20 crossing the 50. In a sustained trend it works well — the fast line lifts off the slow line and stays there, keeping you in for the duration.

In a range it is a shredder. Picture price oscillating between roughly 184 and 188. The EMA 9 crosses above the EMA 20 at 186.40 — you buy. Six bars later price rolls to 185.20 and the lines cross back — you sell for a $1.20 loss. Four bars on they cross up again at 186.10 — you buy — and price fades to 185.00, another $1.10 gone. Two trades, no trend, and you are down $2.30 per share before any costs, purely because a sideways market makes two nearly identical lines cross over and over. That is **whipsaw**, and it is not a bug in the settings. It is what happens when you apply a trend-following tool to a market that has no trend.

The defense is not a better period. It is a filter: only take crossovers when the slow line is clearly sloped, or require confirmation from something that measures a different thing, like [MACD](/blog/macd-explained) — which is itself built from EMAs — or a volume-anchored reference such as [VWAP](/blog/vwap-trading-strategy).

## Reading moving average slope as a trend filter

Before the crossover, look at the slope. A flat EMA 50 is the market telling you there is no directional edge here, and it is the cheapest filter available.

Quantify it rather than eyeballing. If the EMA 20 read 182.40 ten bars ago and reads 186.90 now, it has risen 4.50 over 10 bars — 0.45 per bar, about 0.24% of price per bar. That is a real slope. If it read 186.70 ten bars ago and 186.90 now, that is 0.02 per bar, roughly 0.01% — flat, and any crossover it produces is noise.

A defensible rule: take long crossovers only when the EMA 50 is rising, short ones only when it is falling, and stand aside when it is flat. It will cut your trade count sharply. That is the point.

## The limitation you cannot engineer away: moving averages lag

Every moving average is computed from prices that have already printed. There is no setting and no variant that escapes this. The EMA reduces the lag relative to an SMA; it does not remove it, because a multiplier applied to past closes is still a function of past closes.

So a moving average will never get you in at the bottom or out at the top. By the time an EMA 9 turns up, the low is behind you; by the time a crossover confirms a downtrend, a chunk of the decline has happened. Anyone selling you a configuration that "predicts" turns is selling you a curve fitted to a chart they already saw.

What a moving average genuinely gives you is a consistent, unemotional description of where price has been relative to itself. That is worth a great deal — it stops you calling a downtrend a bargain — but it is description, not prediction. Use it to filter and to frame, and put your risk management somewhere else.

## Practice moving averages on the simulator

Pull up a chart on Stockade and toggle off everything except the EMA 20. Watch a few hundred bars and note where price respects it and where it slices straight through. Then turn on the EMA 9 and 50 and count how many crossovers happened while the EMA 50 was clearly sloped versus flat — that count is the whole argument for the slope filter, in your own data.

Bear in mind what you are practicing on: Stockade's prices are generated in the browser, not sourced from any exchange, so these EMAs describe a simulated market. The arithmetic and the reading habits are identical; the instrument underneath is fictional. Step through a generated session candle-by-candle on the chart simulator so you can pause at each crossover and commit before the next bar reveals the answer. Start on [Stockade's stock market simulator](/simulator).
