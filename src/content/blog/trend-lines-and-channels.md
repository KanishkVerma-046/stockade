---
title: "Trend Lines and Channels: How to Draw Them Properly"
description: "Trend lines are subjective until you set rules: which points to anchor, wicks or bodies, how many touches count, when a break is real, and how to draw channels."
date: 2026-11-30
author: "Stockade Team"
tags: ["Technical Analysis"]
slug: "trend-lines-and-channels"
---

Give two traders the same chart and ask each to draw the uptrend line. One connects the lowest wicks. The other connects candle bodies and skips a spike that "doesn't count." Their lines cross the current price at different levels, so one sees the trend intact and the other sees it broken. Both think they drew it correctly.

That's the problem with trend lines. They're one of the simplest tools in technical analysis and among the easiest to bend toward what you already believe. The fix isn't a better eye. It's a set of rules you decide before you look, so that a line is something you can check, not something you feel.

## What a trend line is and what it isn't

An uptrend line connects rising swing lows: points where price dipped and then turned back up. A downtrend line connects falling swing highs. [The support and resistance guide](/blog/support-and-resistance-levels/) explains how to pick out swing highs and lows; a trend line is the same idea as a horizontal level, tilted to follow the trend.

Choosing the swing points is the first place a line gets bent, so define them too. One checkable definition: a swing low is a bar whose low is lower than the lows of the two bars on each side of it. You can pick a different number of bars, but once you've picked it, a bar either qualifies or it doesn't, and you can't promote a convenient dip to an anchor because it gives a nicer line. For a downtrend, flip it: a swing high is a bar whose high is above the highs of the two bars on each side.

What a trend line isn't is a forecast. It's a description of where buyers have stepped in so far during an advance. Whether they'll step in at the same rising rate again is the question the line poses, not one it answers.

## Wicks or bodies: pick one and keep it

A candle's wick shows the most extreme price that traded; its body shows where it opened and closed. If that's unfamiliar, [the candlestick guide](/blog/how-to-read-candlestick-charts/) covers the anatomy. You can anchor a line on either, and traders argue about which is right.

We think the argument matters less than consistency. Our preference is to anchor on wicks, because a low is a price that actually traded, and to judge breaks on closes, because, as the support and resistance guide puts it, a wick is a rejected price and a close is an accepted one. Body anchoring is a defensible alternative that ignores brief spikes. What isn't defensible is switching between them on the same chart, choosing whichever version makes the line look better. Write your choice down.

## How many touches before a line counts

Two points always make a perfect line. That's geometry, not evidence. The usual convention, as [StockCharts' guide to trend lines](https://chartschool.stockcharts.com/table-of-contents/chart-analysis/trend-lines) puts it, is that two points draw a trend line and a third confirms it. The reason is simple: the third touch is the first time price meets a line that wasn't drawn through it.

Here's a worked example on a hypothetical chart, counting bars from the left:

1. **Anchor two swing lows.** Bar 10 has a low of $48.00 and bar 30 a low of $50.00.
2. **Compute the slope.** ($50.00 − $48.00) ÷ (30 − 10) = $0.10 per bar.
3. **Project it.** At bar 45, the line is at $48.00 + 35 × $0.10 = $51.50.

Then decide what counts as a touch. Prices rarely hit a line to the cent, so set a tolerance in advance. A fraction of the typical bar range is a sensible yardstick: if [ATR](/blog/atr-volatility-stops/) on this chart is $0.80, a quarter of it is $0.20, and any low between $51.30 and $51.70 at bar 45 counts as the third touch. A low of $51.38 confirms the line. A low of $50.90 overshoots the zone, and whether that's a break depends on where the bar closes, which is the next rule.

The same StockCharts guide adds two more conventions: evenly spaced touches make a better line than bunched ones, and the steeper a line is, the less weight it carries as support or resistance. A line rising at a pace price can't sustain gets broken by a pause, which says little about the trend.

## Arithmetic or log scale changes the line

On a short chart this barely matters. Over a long one it can move the line a lot.

An arithmetic price scale spaces equal dollar amounts equally; a log scale spaces equal percentage changes equally. Say a stock climbs from $20 to $40 over 20 bars. A straight line on an arithmetic chart rises $1.00 a bar and sits at $30.00 at bar 10. A straight line on a log chart rises about 3.5% a bar and sits at $28.28 at bar 10. Same anchors, a $1.72 difference halfway along. StockCharts notes that lows often line up better on a semi-log scale for long-term lines. Whichever you use, it's one more thing to fix in advance rather than switch until the line fits.

## When a break is a break

Decide this before price gets there, because once it does, you'll want whatever answer suits your position. A rule we'd use:

- **A break is a close beyond the far edge of the tolerance zone,** not a wick into it.
- **Measure the line at the bar in question,** not where it was when you drew it. A rising line keeps rising.

Continuing the example, by bar 52 the line is at $48.00 + 42 × $0.10 = $52.20, so the zone's lower edge is $52.00. A candle that dips to $51.95 and closes at $52.30 has poked a wick through the zone, but it isn't a break. A close at $51.85 is a break.

Even then, a break isn't a reversal. StockCharts treats trend-line breaks as a warning rather than the final word. Price that breaks an uptrend line can turn down, but it can also go sideways or keep rising at a gentler slope. The break tells you the old rate of advance has stopped, nothing more.

That also shapes where a stop goes. If your trade idea is "the trend holds," the idea is wrong once the line breaks, so the stop sits just beyond the zone. Because the line rises every bar, a stop tied to it has to be moved up as it goes, which makes it a trailing stop with the trade-offs [the stop-loss guide](/blog/stop-loss-orders-explained/) describes.

## Drawing a parallel channel

A channel adds a second line, parallel to the trend line, through the opposite extreme. For an uptrend, take the highest swing high between your two anchors and draw a line through it with the same slope. For a downtrend, do the reverse: a parallel line through the lowest swing low between the two highs you anchored.

In the example, say the highest high between bars 10 and 30 came at bar 22, at $51.40. The trend line at bar 22 is $48.00 + 12 × $0.10 = $49.20, so the channel is $2.20 wide. At bar 45, where the lower line is $51.50, the upper line is $53.70.

A channel gives a rough idea of where a move within the trend has tended to stall, which some traders use as a target zone. If you do, run the numbers the way [the risk-reward guide](/blog/risk-reward-ratio-expectancy/) does: the distance to the upper line is the reward, the distance to a stop below the lower zone is the risk, and the ratio tells you the win rate you'd need. Channels break like any other line.

## Why the honest version of a trend line is a zone

Put all of that together and a trend line stops being a line. It's a band, with a width set by your touch tolerance, and a slope that depends on choices you made about anchors and scale. Two careful traders following different rules will draw different bands, and neither is wrong.

That's why we'd treat any trend line as a zone and add three rules of our own:

- **No redrawing after a break.** If the line breaks, it's broken. A new line needs new swing points that form after the break.
- **Use the timeframe you trade.** A line on a five-minute chart and a line on a daily chart describe different things. [The day-trading vs swing-trading guide](/blog/day-trading-vs-swing-trading/) covers why your style sets the timeframe.
- **Remember that lines appear on any chart.** Connect enough lows and something will look like a trend. That's why the rules come first.

If you want a trend guide nobody can draw differently, a moving average is one; [the moving-averages guide](/blog/moving-averages-ema-vs-sma/) covers using them as dynamic support. The trade-off is that it lags behind price, as that guide explains.

## Practice this on the simulator

Stockade has no drawing tools, so you'll sketch lines on paper, on a screenshot, or by arithmetic. On the [chart simulator](/chart-simulator/), pick two swing lows and hover over each to read its L value in the readout bar. Count the bars between them, compute the slope, and project the line forward. Then step through the session one candle at a time and apply your touch and break rules as each candle appears, without redrawing. On the [simulator](/simulator/), where you'll read the lows by eye against the price scale, you can trade it: enter near the projected line, type a stop just beyond the zone into the Stop Loss field, and raise it as the line rises. Stockade's prices are a random walk with a slowly drifting trend bias, so trends form there and shapes that look like channels can too. But the hidden bias behind them wanders at random and isn't tied to any line or pattern, so what happens after a break there says nothing about whether lines predict in a real market. Use it to practice drawing lines by rules.
