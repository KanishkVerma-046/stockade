---
title: "MACD Explained: How to Read and Trade With MACD"
description: "MACD is two moving averages, their difference, and a smoothed copy of that difference. Here is how to compute each part, read it, and know when it lies."
date: 2026-04-27
author: "Stockade Team"
tags: ["Indicators"]
slug: "macd-explained"
---

You are watching a chart go up and you cannot answer the only question that matters: is this move still gaining strength, or is it coasting? A stock can print five higher closes in a row while every one of those closes gains less ground than the one before — trend intact, engine dying. By the time that shows up in price it is usually too late to act on.

MACD exists for that gap. It does not tell you where price is. It tells you whether the *distance between two moving averages* is widening or narrowing, which is a rough proxy for whether a move is accelerating or decelerating. That is a narrower job than most people give it, and understanding the narrowness is what separates using MACD from being fooled by it.

## The three components and how each one is computed

MACD stands for Moving Average Convergence Divergence — an honest name, since the whole indicator is about two moving averages converging or diverging. It has three parts, each built from the one before it.

<div class="table-wrap">

| Component | Formula | What it measures |
|---|---|---|
| MACD line | 12-period EMA − 26-period EMA | The gap between fast and slow trend |
| Signal line | 9-period EMA of the MACD line | A smoothed version of that gap |
| Histogram | MACD line − signal line | Whether the gap is widening or narrowing |

</div>

### The MACD line

Take an exponential moving average of the last 12 bars and one of the last 26 bars, then subtract the slower from the faster. For how an EMA weights recent bars more heavily than old ones, see [moving averages: EMA vs SMA](/blog/moving-averages-ema-vs-sma/).

Concretely: if the 12-period EMA is 188.40 and the 26-period EMA is 186.90, the MACD line reads 188.40 − 186.90 = **1.50**. The fast average sits $1.50 above the slow one. That number is in the price's own units — dollars here, not a percentage and not a bounded 0-to-100 scale like [RSI](/blog/rsi-indicator-overbought-oversold/). A $400 stock routinely produces MACD values ten times larger than a $40 stock, which is why MACD readings are never comparable across instruments.

### The signal line

The MACD line is jumpy, so MACD applies a second smoothing pass: a 9-period EMA of the MACD line itself. That is the signal line, and it lags the MACD line by construction, being an average of that line's own recent history.

The EMA smoothing constant is 2 ÷ (period + 1), so the signal line uses 2 ÷ 10 = 0.20 — each new value is the old one plus 20% of the distance to the current MACD value. If the signal line was at 1.20 and the MACD line prints 1.72, the new signal is 1.20 + 0.20 × (1.72 − 1.20) = 1.20 + 0.104 = 1.304.

### The histogram

The histogram is the simplest piece: MACD line minus signal line, drawn as bars above and below zero. With the MACD line at 1.50 and the signal line at 1.20, the histogram bar is 1.50 − 1.20 = **0.30**.

Because the histogram is defined as that difference, it crosses zero on exactly the same bar the MACD line crosses the signal line. They are one event drawn two ways. Anyone claiming a histogram zero-cross *confirms* a signal-line cross is describing the same thing twice.

## Why the settings are 12, 26, and 9

These numbers are convention, not mathematics. Gerald Appel chose them when he built MACD in the late 1970s, and they have been the default ever since. There is no derivation to recover: no property of markets makes 12 and 26 special, and you will find no calculation that lands on them. Neat-sounding origin stories circulate — that they map onto some tidy count of weeks or sessions — but they are folklore invented after the fact to explain a choice that was simply a choice. What matters is what the numbers control: 12 and 26 set how fast and how slow the two averages are, and 9 sets how much smoothing sits on top.

They matter now mostly because so many people use them. A default that millions of screens display becomes mildly self-fulfilling: when a widely watched cross prints, some traders act on it, putting real orders behind an arbitrary number. That is a weak effect, not a law, but it beats any claim that the settings are optimal.

You can change them. Shortening to 6/13/5 makes MACD twitchier and earlier — more signals, more of them wrong. Lengthening to 19/39/9 makes it slower and cleaner — fewer signals, later. Neither is better; you are choosing where on the responsiveness-versus-noise curve to sit. What you should not do is tune the settings until they catch the last three moves on the chart in front of you. That is curve-fitting, and it describes history rather than predicting anything.

## Zero line crossings versus signal line crossings

These are different events with different meanings, and conflating them is the most common MACD mistake.

**The MACD line crossing zero** means the 12-EMA has crossed the 26-EMA — a plain moving-average crossover, restated. Above zero the fast average is above the slow one; below zero, the reverse. It is a statement about trend direction, and because it involves the slow 26-period average, it is late.

**The MACD line crossing the signal line** means the current gap between the averages has moved away from its own recent average gap. It is a statement about momentum shifting, and it fires earlier than the zero cross — often much earlier, and often when there is no trend change at all.

The practical read: a bullish signal cross while MACD sits well below zero is a bounce inside a downtrend until proven otherwise. The same cross as MACD pushes up through zero is a stronger claim, because two things are agreeing. Filtering signal crosses by which side of zero they occur on cuts your signal count sharply, which is the point.

## Reading the histogram, and the trap inside it

Here is the nuance that makes the histogram worth having. Walk through five bars of a rally:

<div class="table-wrap">

| Bar | Price | MACD line | Signal line | Histogram |
|---|---|---|---|---|
| 1 | 190.10 | 1.50 | 1.20 | 0.30 |
| 2 | 192.40 | 1.72 | 1.30 | 0.42 |
| 3 | 194.30 | 1.85 | 1.41 | 0.44 |
| 4 | 195.60 | 1.90 | 1.51 | 0.39 |
| 5 | 196.20 | 1.88 | 1.58 | 0.30 |

</div>

Price rose on every single bar, 190.10 to 196.20. But the histogram peaked at 0.44 on bar 3 and shrank on bars 4 and 5, back to where it started.

**A shrinking histogram does not mean price is falling. It means price is rising more slowly than it was.** The move is decelerating while still moving. On bar 5 the MACD line actually ticked down, 1.90 to 1.88, even as price posted another higher close — the two averages have started converging.

That is genuinely useful, and it is also where people get hurt. Deceleration is not reversal. A trend that slows can flatten, consolidate for twenty bars, and resume. Shrinking bars are a reason to tighten a stop or stop adding to a position; treating each one as a short signal has you fighting strong trends repeatedly.

If bar 6 printed a MACD of 1.60, the signal line would move to 1.5876 and the histogram to roughly 0.01 — nearly flat, still positive. A MACD of 1.40 on bar 7 pulls the signal to 1.5500 and the histogram to −0.15: the actual crossover, three bars after the histogram first warned you.

## MACD divergence and what it is worth

Divergence is when price and MACD disagree about direction.

**Bearish divergence:** price makes a higher high, but the MACD line's corresponding peak is lower than its previous peak. The new price high was achieved with less momentum behind it.

**Bullish divergence:** price makes a lower low while the MACD line makes a higher low. Selling pressure is fading even as price grinds down.

Divergence is worth watching and is not worth trading alone. Strong trends produce it for extended stretches — an uptrend can show bearish divergence across dozens of bars while making new highs, because the initial thrust set a momentum peak the trend never needs to match again. Divergence tells you a move is tired, not that it is over.

It becomes more credible when something independent agrees: a broken trendline, a failure at a level that held before, or a volume pattern that contradicts the price move. [Volume](/blog/understanding-trading-volume/) is useful confirmation here precisely because it comes from a different input than MACD does. Two indicators derived from the same closing prices agreeing is not confirmation; it is arithmetic.

## Why MACD is doubly lagging and fails in chop

Two structural weaknesses, both permanent.

**It is lag built on lag.** An EMA is already backward-looking — the 26-period EMA has a center of mass around twelve and a half bars back. MACD subtracts two of those, then smooths the result with a *third* EMA to make the signal line. Every crossover describes something that already finished happening. Nothing in MACD is predictive; it compresses recent price history into one number, and the compression takes time.

**It produces constant false signals in sideways markets.** MACD's premise is that there is a trend to measure. When price oscillates in a range, the two EMAs sit nearly on top of each other, the MACD line hovers near zero, and it crosses the signal line back and forth every few bars. Each cross looks identical to a real one. A choppy afternoon can generate eight crossovers, all noise, and taking them costs you spread and commissions before direction ever enters the picture.

The standard defense is to take MACD signals only in the direction of a longer-term trend — only bullish crosses while price is above its 50-period EMA, for instance. A cheaper one is to check whether the MACD line is far from zero at all; crosses printed with the histogram bars barely visible rarely matter.

## Practice this on the simulator

Reading about a shrinking histogram is not the same as noticing one while a position is open and green. Turn MACD on and watch the histogram through a full move — mark the bar where it peaks, then count how many more bars price kept climbing before the MACD line actually crossed. That gap is your lag, measured rather than described.

Then trade it. Every time a signal-line cross prints, decide before the next bar whether you would take it and note which side of zero it happened on. Do that thirty times and you will have your own count of how many crosses in chop were worth acting on — more convincing than anything here. Every price on Stockade is algorithmically generated rather than pulled from a real market, so what you are training is the reading, not a forecast. And be honest: with $100,000 of virtual trading capital, sitting through a shrinking histogram is far easier than it will be with money that is actually yours. Start on [Stockade's stock market simulator](/simulator/).
