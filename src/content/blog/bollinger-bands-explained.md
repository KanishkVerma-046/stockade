---
title: "Bollinger Bands Explained: What the Bands Measure"
description: "Bollinger Bands measure volatility around a 20-period average, not overbought or oversold. The math, what a band touch means, the squeeze, and the 95% myth."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indicators", "Technical Analysis"]
slug: "bollinger-bands-explained"
---

Price pushes up through the upper Bollinger Band. The chart looks stretched, the band looks like a ceiling, and selling feels like the obvious trade. Then price keeps closing at the upper band, candle after candle, and your short gets stopped out on a move that never came back.

The bands didn't fail there. They were read as something they aren't. Bollinger Bands measure how spread out recent prices are around an average. They don't measure whether price is too high, and the person who invented them says so plainly.

## How Bollinger Bands are calculated

[John Bollinger developed the bands in the early 1980s](https://cmtassociation.org/presenter/john-bollinger/). They have three lines:

```
Middle band = 20-period simple moving average of closes
Upper band  = middle band + 2 × standard deviation of the same 20 closes
Lower band  = middle band − 2 × standard deviation of the same 20 closes
```

[Bollinger's own description](https://www.bollingerbands.com/bollinger-bands) gives 20 periods and two standard deviations as the defaults, unchanged since he settled on them, and adds that he uses the population formula for standard deviation.

Standard deviation is easier to follow with numbers. We'll use five closes instead of 20 so the arithmetic fits on a screen. Say the last five closes of a hypothetical stock are $50, $51, $49, $52 and $53:

1. **Average:** 255 ÷ 5 = $51.
2. **Distance of each close from the average:** −1, 0, −2, +1, +2.
3. **Square them and average the squares:** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. That's the variance.
4. **Take the square root:** √2 = $1.41. That's the standard deviation.
5. **Bands:** $51 ± 2 × $1.41, so $48.17 and $53.83.

Dividing by 5 in step 3 is the population formula. The sample formula divides by 4 instead, which would give $1.58 here and slightly wider bands, so two charting platforms can disagree a little depending on which one they use.

## What the bands actually measure

Now take five different closes with the same $51 average: $50.60, $51.20, $50.80, $51.40 and $51.00. Every one sits within 40 cents of the average, so the standard deviation is only $0.28 and the bands are $50.43 and $51.57. Same average, bands a fifth as wide. That's the whole idea: the bands widen when prices spread out and narrow when they bunch together.

Here's the part that surprises people. Try five closes that rise steadily by exactly $1 each: $50, $51, $52, $53, $54. Every move is $1, smaller on average than the jumps in the first example, yet the standard deviation is again $1.41 and the bands are just as wide, at $49.17 and $54.83. The bands measure how far the closes sit from their *average*, and a trend pulls closes away from the average even when each move is small.

That makes them different from [ATR](/blog/atr-volatility-stops/), which averages the size of each bar's range. A smooth, steady trend made of small candles would show a modest ATR and fairly wide Bollinger Bands. Neither is wrong. They answer different questions: ATR asks how much a typical bar moves, and the bands ask how far price has wandered from its recent average.

Band width also works as a rough check on a stop. With the wide bands from the first example, $5.66 apart, a stop $0.50 under your entry sits well inside the range closes have covered lately, so ordinary movement can reach it. With the narrow bands, $1.14 apart, the same $0.50 is nearly half the spread. Either way, the stop still belongs where your idea is proven wrong, and the share count still comes from the stop distance, as in the ATR guide's worked example.

## A touch of the band is a tag, not a signal

This is the misreading from the opening, and Bollinger addresses it directly. Among [his rules for using the bands](https://www.bollingerbands.com/bollinger-band-rules): "Tags of the bands are just that, tags not signals." A touch of the upper band is not, on its own, a sell signal, and a touch of the lower band is not a buy signal. The same list says that in trending markets price can walk up the upper band or down the lower one, and that closes outside the bands are initially continuation signals, not reversal signals.

That lines up with what the arithmetic says. Price only reaches the upper band by climbing well above its recent average, which is what a strong move looks like. It's the same lesson as [RSI's "overbought" reading](/blog/rsi-indicator-overbought-oversold/): a high reading describes strength that already happened, not a reversal that's due.

What a band touch does tell you is that price is high or low *relative to its own recent range*. That's context. Whether it's a reason to trade depends on everything else: the trend, the nearest [support or resistance](/blog/support-and-resistance-levels/), and what your setup says.

## Where price sits inside the bands: %b

Bollinger's rules also describe %b, which turns band position into a single number:

```
%b = (close − lower band) ÷ (upper band − lower band)
```

At the lower band %b is 0, at the middle band 0.5, and at the upper band 1. It goes below 0 or above 1 when price closes outside the bands. Back in the first example, a close of $53 with bands at $48.17 and $53.83 gives (53 − 48.17) ÷ 5.66 = 0.85.

The value of %b is that it makes band position comparable across instruments and over time, the way dividing ATR by price does. A close at $53 means nothing on its own; 0.85 says it's near the top of its recent spread. It's still a location, not a signal, and everything in the previous section applies: in a strong trend, %b can stay near or above 1 for a long stretch.

## The 95% misreading

A common claim is that 95% of prices stay inside the bands, so anything outside is a rare event that should snap back. It comes from a real statistical fact: in a normal distribution, about 95% of values fall within two standard deviations of the mean.

Prices aren't a normal distribution, and Bollinger says so in the same rules: make no statistical assumptions from the use of standard deviation in the bands, because price distributions are non-normal and the samples are too small for statistical significance. He adds that in practice he typically finds about 90%, not 95%, of the data inside the bands at the default settings.

Even at face value, 90% inside means one close in ten lands outside. On daily bars that's roughly two closes a month, which is ordinary, not rare. And by Bollinger's own rules, a close outside the bands is initially a continuation signal, not a reversal one.

## The squeeze: when the bands narrow

A squeeze is a stretch where the bands pull unusually close together. It's measured with BandWidth, the distance between the bands as a percentage of the middle band:

```
BandWidth = (upper band − lower band) ÷ middle band × 100
```

From the two five-close examples above: ($53.83 − $48.17) ÷ $51 × 100 = 11.1, and ($51.57 − $50.43) ÷ $51 × 100 = 2.2. The second is a squeeze compared with the first.

"Narrow" is relative to the instrument's own history. [StockCharts' guide to BandWidth](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) suggests judging it against the range of the past eight to twelve months, and says the squeeze itself doesn't give a direction: that comes from the band break that follows, and initial breaks can fail.

Traders watch for squeezes on the premise that quiet stretches don't last forever. We'd treat one as a condition rather than a trigger. It can tell you to pay attention. It can't tell you which way to trade.

## Choosing settings and the middle band

The defaults are a starting point, not a law; Bollinger's rules say the right parameters can differ by market and task. If you change the length, change the multiplier with it: his rules give 2.1 standard deviations at 50 periods, and StockCharts' [Bollinger Bands guide](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) adds 1.9 at 10 periods.

The middle band is a simple moving average, not an exponential one. If you know EMAs from [the moving-averages guide](/blog/moving-averages-ema-vs-sma/), the two track each other closely but aren't the same line, and an EMA reacts faster to the latest closes. Bollinger's rules also say the middle band should describe the intermediate-term trend rather than be tuned for crossovers.

If you want a second opinion alongside the bands, pick one that measures something different. Bollinger's own list warns that two momentum indicators aren't better than one, so adding both RSI and [MACD](/blog/macd-explained/) next to the bands adds less than it seems: both measure momentum.

## Practice this on the simulator

Stockade doesn't plot Bollinger Bands. Its charts have EMA 9, 20 and 50, VWAP, RSI and MACD, and its random moves are the same size throughout, so there are no real quiet phases for a squeeze to find. What you can practice is the calculation and the moving-average half. On the [chart simulator](/chart-simulator/), hover over the last 20 candles and copy each close from the readout bar into a spreadsheet. Work out the average and the population standard deviation (in most spreadsheets, AVERAGE and STDEV.P), mark where the bands would sit, and compare that 20-period SMA with the EMA 20 line on the chart. Do it once on a stretch that trends and once on one that chops, and see how the trend widens the bands. Then take the same habit to the [simulator](/simulator/): before acting on a stretched price, ask how far it is from its average and whether that distance is unusual or just a trend.
