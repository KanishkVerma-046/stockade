---
title: "ATR Stops: Setting Stop-Losses by Volatility"
description: "A $1 stop means one thing on a calm stock and another on a wild one. How ATR measures normal range, and how to size an ATR stop so your dollar risk stays fixed."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indicators", "Risk Management"]
slug: "atr-volatility-stops"
---

Take two hypothetical stocks, both trading at $50. The first usually covers about $0.50 from high to low in a day. The second usually covers about $2.50. Put a $1 stop under each and you've made two very different decisions. On the first, the stop is two full days' range away. On the second, it's less than half a normal day's range.

A fixed-dollar or fixed-percentage stop treats those two stocks as the same. They aren't, and the stop that ignores the difference is the one that gets hit by noise. Average true range, or ATR, measures how far an instrument normally moves, so you can set the stop by that instead.

## What true range measures, and why gaps count

[ATR was developed by J. Welles Wilder, who introduced it in his 1978 book *New Concepts in Technical Trading Systems*](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). It starts from a single bar's true range, which is the largest of three distances:

```
True range = the largest of:
  high − low
  |high − previous close|
  |low − previous close|
```

The high and low are the ends of a candle's wicks ([the candlestick guide](/blog/how-to-read-candlestick-charts/) covers the anatomy). On a normal bar, the first distance wins. Say the previous close was $50.00, and today's high is $51.20 and low $49.60. High minus low is $1.60. The high is $1.20 from the previous close and the low is $0.40 from it. True range is $1.60, the same as the plain range.

The other two lines are there for gaps. Suppose instead the stock opens at $52.50 on news, then trades between $52.10 and $53.00. The bar's own range is only $0.90, but the high is $3.00 above yesterday's close. True range is $3.00. Anyone who held through that gap felt a $3 move, and true range counts it. A simple high-minus-low measure would call it a quiet day.

## How ATR averages true range over 14 bars

ATR is an average of true range, and the usual setting is 14 bars. Wilder's version isn't a plain moving average. The first value is the simple average of the first 14 true ranges, and after that each new value is:

```
ATR = (previous ATR × 13 + today's true range) ÷ 14
```

That's the smoothing given on the same StockCharts page. Run the gap day through it. If ATR was $1.50 and the gap produces a true range of $3.00, the new ATR is ($1.50 × 13 + $3.00) ÷ 14 = $22.50 ÷ 14 = $1.61. A day twice the normal size moves ATR by about 7%. That's deliberate: ATR describes the typical bar over the last few weeks, not the last one.

Two things ATR doesn't tell you. It has no direction: a stock falling hard and a stock rising hard can have the same ATR. And it's in price units, so you can't compare it across stocks. An ATR of $2 is 10% of a $20 stock and 0.5% of a $400 one. If you want to compare, divide ATR by price.

## An ATR stop, worked end to end

Here's the method from entry to share count. Say you have a hypothetical $25,000 account and risk 1% per trade, so $250. You buy a stock at $80, and its 14-day ATR is $2.00.

1. **Choose a multiple.** We'll use 2 × ATR, so the stop is $4.00 away.
2. **Set the stop.** $80.00 − $4.00 = $76.00.
3. **Size the position.** $250 ÷ $4.00 = 62.5, rounded down to 62 shares.
4. **Check the numbers.** 62 shares × $80 = $4,960 of stock. If the stop fills at $76, you lose 62 × $4.00 = $248.

The multiple is a choice, not a constant. One ATR is roughly a typical bar's range, so a stop one ATR away can be reached by an ordinary bar. Wider multiples give the trade more room and buy fewer shares. For comparison, a 2% stop on this stock would be $1.60 away, only 0.8 ATR, which is inside a normal day's movement. That's the problem from the opening, in numbers.

There's no right multiple, and nobody can tell you the best one without testing it on your own setups. What matters more is picking one and using it consistently, so your results mean something when you review them.

## The same dollar risk on calm and volatile stocks

The real point of an ATR stop is what it does to position size. Keep the $250 risk and the 2 × ATR rule, and apply it to three hypothetical $80 stocks with different ATRs:

<div class="table-wrap">

| Stock | ATR | Stop distance (2 × ATR) | Shares | Position size | Loss at the stop |
|---|---|---|---|---|---|
| Calm | $1.00 | $2.00 | 125 | $10,000 | $250 |
| Typical | $2.00 | $4.00 | 62 | $4,960 | $248 |
| Volatile | $4.00 | $8.00 | 31 | $2,480 | $248 |

</div>

The volatile stock gets a stop four times as wide and a position a quarter of the size. The loss if you're wrong stays about the same. That's the whole idea: volatility changes how many shares you hold, not how much you lose. [The position-sizing guide](/blog/risk-management-position-sizing/) explains why size should always come out of the stop distance rather than go in first.

Watch the calm row, though. A tight ATR means a big position, and $10,000 is 40% of this account. Check that the position fits your cash before you assume the formula's share count is available.

Keeping dollar risk fixed also keeps your drawdown math intact. Losing streaks hurt according to how much you risk per trade, not how wide your stops are, which is why [the drawdown guide](/blog/drawdown-recovery-math/) measures everything in risk per trade.

## Combine ATR with structure instead of replacing it

An ATR stop has one weakness: it doesn't know your trade idea. Two ATRs below your entry might land in the middle of a support zone, where the idea is still alive, or well past the point where it was proven wrong. [Placing a stop by structure](/blog/stop-loss-orders-explained/), beyond the level that invalidates the trade, answers *where* the stop belongs. ATR is better at answering *how much room* to leave beyond that level.

So the approach we'd use combines them. Find the structural level, then add a fraction of ATR as a buffer. Say the swing low under your $80 entry is $77.40 and ATR is $2.00. Add half an ATR, $1.00, and the stop goes at $76.40. If you're new to finding those levels, [the support and resistance guide](/blog/support-and-resistance-levels/) covers swing lows and why a level is a zone rather than a line.

Now size it. Risk per share is $80.00 − $76.40 = $3.60, so $250 ÷ $3.60 = 69.4, rounded down to 69 shares, for a loss of $248.40 at the stop. If the next resistance is at $87.20, the reward is $7.20, exactly 2R. That's a 1:2 trade with a breakeven win rate of 33.3%, and [the risk-reward guide](/blog/risk-reward-ratio-expectancy/) explains how to decide whether that bar is one your setup can clear.

## Trailing a stop with ATR: the Chandelier Exit

ATR also works for trailing stops. One well-known version is the Chandelier Exit, [developed by Charles Le Beau, which by default sits three times the 22-period ATR below the highest high of the last 22 periods](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit):

```
Chandelier Exit (long) = 22-period high − ATR(22) × 3
```

If the 22-period high is $90 and ATR is $2.00, the exit is $90 − $6.00 = $84.00. As price makes new highs, the line follows them up.

There's a catch in the formula. If ATR rises while the high stays put, the line falls: at the same $90 high, an ATR of $2.50 puts it at $82.50. Used as a stop, that means loosening it in the middle of a trade. We wouldn't. A stop should only move in the trade's favor, the rule the stop-loss guide argues for, so if you trail with this formula, keep the stop where it is whenever the formula drops below it.

## What ATR gets wrong

ATR is a description of the past, and it has the weaknesses of one.

- **It lags.** It averages 14 bars, so after a quiet stretch it's small just before a shock, and slow to catch up after one. The $3 gap above only nudged it to $1.61.
- **It can't stop a gap.** An ATR stop is still a stop order. If price opens beyond it, it fills at the open, however carefully you measured the range.
- **It depends on the bar size.** A 14-period ATR on five-minute bars is a fraction of the daily one for the same stock. Measure it on the timeframe you're trading. A day trader's stop sized from daily ATR will be far too wide, and a swing trader's stop sized from five-minute ATR will be far too tight.
- **It says nothing about direction or edge.** A well-placed stop limits what a bad trade costs. It doesn't make the trade good.

## Practice this on the simulator

Stockade doesn't have an ATR indicator. Its charts plot EMA 9, 20 and 50, VWAP, RSI and MACD. Every symbol also runs on the same volatility model, with moves scaled to its price, so there are no calm and wild periods to adapt to. And because each Stockade candle opens exactly where the last one closed, true range there always equals high minus low.

You can still practice the arithmetic. On the [chart simulator](/chart-simulator/), hover over each of the last 14 candles and note the H and L values in the readout bar at the bottom. Average the 14 ranges for a simple ATR. Then open the [simulator](/simulator/) in replay mode, where the chart has no readout, and estimate the last 14 candles' typical range by eye against the price scale. Set your stop two of those ranges below your entry, check where that lands against the nearest swing low, work out the share count for a fixed dollar risk before you enter, and type the stop price into the Stop Loss field. Stockade's prices are generated in your browser, so none of this says anything about a real stock's volatility. The habit it builds is the one that matters: measure the range, then set the stop, then size.
