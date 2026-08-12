---
title: "RSI Indicator: How to Identify Overbought and Oversold Conditions"
description: "RSI above 70 is not a sell signal. Here is what RSI actually measures, why overbought means strong, and how to read divergence without fooling yourself."
date: 2026-04-20
author: "Stockade Team"
tags: ["Indicators"]
slug: "rsi-indicator-overbought-oversold"
---

Here is a trade almost everyone makes once. A stock has run hard for a week. You add RSI to the chart, see it sitting at 78, and remember the rule: above 70 is overbought, overbought means sell. So you short it. Over the next two weeks the stock adds another 22%, RSI never drops below 68, and you cover for a loss larger than the move you were trying to catch.

The rule was not wrong, exactly — you had the wrong idea about what it says. RSI at 78 is not the market telling you a reversal is coming. It is telling you buyers have overwhelmed sellers for fourteen bars running, which is a description of strength, not a prediction of weakness. Trading it as a sell signal means systematically betting against the strongest thing on the screen.

## What RSI actually measures

The Relative Strength Index, published by J. Welles Wilder in 1978, answers one narrow question: over the last N bars, how do the average up-moves compare to the average down-moves? That is genuinely all it does. It takes the close-to-close change of each bar over a lookback window — 14 bars by default — separates them into gains and losses, averages each group, and compares them as a ratio called RS, for relative strength:

```
RS = average gain / average loss
```

And that ratio gets squeezed onto a 0–100 scale:

```
RSI = 100 - (100 / (1 + RS))
```

Work one through. Say that over the last 14 bars, the average gain across the window is $2.40 and the average loss is $1.20. Up-moves are running twice the size of down-moves:

- RS = 2.40 / 1.20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33.3 = **66.7**

Two details about those averages. First, they divide by the full lookback period, not by the number of up bars — nine up bars totaling $21.60 gives an average gain of 21.60 / 14 = $1.54, not $2.40. Second, after the first calculation Wilder uses a smoothed running average rather than recalculating from scratch: each new average is the previous average times 13, plus the newest bar's value, all divided by 14. That smoothing is why RSI moves less jerkily than raw price.

## Why the 0–100 scale is not linear in the way you expect

The formula collapses an unbounded ratio into a bounded range, and it does so unevenly. It is worth memorising three anchor points:

<div class="table-wrap">

| Condition | RS | RSI |
|---|---|---|
| Average gain equals average loss | 1.00 | 50.0 |
| Average gain is 2.33× average loss | 2.33 | 70.0 |
| Average gain is 0.43× average loss | 0.43 | 30.0 |

</div>

Check the middle row: 1 + 2.333 = 3.333, and 100 / 3.333 = 30, so RSI = 100 − 30 = 70. The bottom row: 1 + 0.4286 = 1.4286, and 100 / 1.4286 = 70, so RSI = 30.

Notice what that means. To print 70, up-moves only have to be a bit more than twice down-moves — a common condition, not an extreme one. Past that point the scale compresses hard: pushing from 70 to 90 requires RS to go from 2.33 to 9, a far bigger shift in the underlying market than the twenty-point move on the display suggests.

## Why 70 and 30 are conventions, not laws

Wilder picked 70 and 30. He could have picked 75 and 25. There is no derivation behind them, no statistical threshold at which behaviour changes, no mechanism that switches on at 70.0 and off at 69.9. They are round numbers that looked reasonable on the charts he studied in the 1970s, and they stuck because everyone copied the defaults. Most charting software draws those lines for you, which quietly reinforces the idea that they are boundaries. Stockade's chart does the same — switch the lower pane to RSI and you get dashed lines at 70 and 30. They are reference marks, not verdicts.

The same goes for the 14-period lookback. A shorter setting like 7 reacts faster and hits the extremes constantly; a longer one like 21 rarely gets there. The period changes how often you see a signal, not how reliable it is — the same tradeoff that governs [choosing a moving average length](/blog/moving-averages-ema-vs-sma).

## Overbought means strong, not "about to reverse"

This is the point the opening trade got wrong, and it deserves its own arithmetic.

Imagine a strong uptrend: over the lookback, 12 bars closed up and 2 closed down. Gains total $28.00, losses total $2.80.

- Average gain = 28.00 / 14 = **$2.00**
- Average loss = 2.80 / 14 = **$0.20**
- RS = 2.00 / 0.20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9.1 = **90.9**

Now ask what it would take to drop RSI back below 70. From the table above, RS has to fall from 10 to 2.33 — average losses would need to more than quadruple relative to average gains. In a smoothed 14-bar average that takes many bars of genuinely different behaviour. It does not happen because the stock had one red candle.

So RSI does not just *tolerate* being above 70 in a trend; it is arithmetically pinned there until the character of the move changes. Traders call this RSI "embedding." A reading of 90 says the trend is unusually clean, and a clean trend is the last thing you want to fade.

There is a subtler version of the same trap. Suppose RSI sits at 66.7 (average gain $2.40, average loss $1.20) and the next bar closes up $1.00. Apply the smoothing: the new average gain is (2.40 × 13 + 1.00) / 14 = 32.20 / 14 = $2.30, and the new average loss is (1.20 × 13 + 0) / 14 = 15.60 / 14 = $1.114. RS = 2.30 / 1.114 = 2.064, so RSI = 100 − (100 / 3.064) = **67.4**.

Price went up and RSI barely moved, because the gain was smaller than the running average gain. RSI tracks momentum, not price. It can drift sideways or fall while price makes new highs — which is exactly the setup people call divergence.

## How to read RSI divergence

Divergence is a disagreement between price and momentum.

**Bearish divergence:** price makes a higher high, RSI makes a lower high. Price got further, but with less force behind it than last time.

**Bullish divergence:** price makes a lower low, RSI makes a higher low. Sellers pushed price down again but with less conviction.

To read one, mark two swing points of the same kind on price — two clear highs, or two clear lows — and compare RSI at each. It only counts if the two are comparable swings with a real pullback between them; drawing lines between arbitrary bars produces a divergence on almost any chart, which is why they are so easy to see in hindsight.

Be blunt about the hit rate: divergence fails often, and it fails worst precisely where it looks most tempting. A strong trend will print three or four bearish divergences on the way up, and only the last one marks anything — each earlier one is a trap that costs money. Treat divergence as a reason to tighten a stop or stop adding to a winner, not as a standalone entry against the trend. Fading strength on a divergence signal is one of the [more expensive habits new traders develop](/blog/common-day-trading-mistakes).

## Using the 50 line as a trend filter

The most useful RSI level is the one nobody draws. RSI 50 is where average gains exactly equal average losses. Above it, up-moves are winning; below it, down-moves are.

That makes 50 a cheap regime filter:

- **RSI persistently above 50** — treat 30 as unreachable and stop looking for oversold longs. In an uptrend, pullbacks tend to bottom out around 40–50.
- **RSI persistently below 50** — the mirror image. Rallies stall near 50–60 and never reach 70.

That asymmetry is more actionable than the extremes. In an uptrend, an RSI dip to 45 that holds and turns up is a pullback ending inside a strong trend. Waiting for 30 there means waiting for a reading the trend will not produce.

### Shifting the thresholds to 80/20

Once you accept that the thresholds are conventions, adjusting them is obvious. In a strongly trending market, move the bands to 80 and 20. You get far fewer signals, and the ones you get mark genuinely unusual readings rather than routine trend strength. In a range-bound market the default 70/30 works better, because mean reversion is actually the dominant behaviour there.

The order matters: identify the regime first, then pick the thresholds. Using RSI to tell you the regime and then using the same RSI to trade against it is circular reasoning.

## What RSI cannot do

RSI is built entirely from closing prices you have already seen. It is a lagging, derivative measure — every value is a fact about the past. It does not see intrabar action, and it carries no information that is not already in the price series.

It also has no notion of *why* prices moved. A 90.9 reading from a steady grind higher and one from a single gap look identical to the formula. That is a good reason to read RSI alongside price structure and volume, and to know how it differs from [MACD](/blog/macd-explained), which measures the spread between two moving averages rather than a gain/loss ratio.

## Practice reading RSI on the simulator

The fastest way to unlearn "70 means sell" is to watch RSI sit above 70 for forty bars while price climbs. Open the [Stockade simulator](/simulator), switch the lower chart pane from volume to RSI, and find a stretch where the line embeds above 70 — then note how far price travels before RSI returns to 50. Do the opposite exercise too: mark every bearish divergence on a rising chart and count how many actually preceded a decline. The prices are algorithmically generated rather than real market data, but the indicator arithmetic is identical, and that count will change how you use the tool.
