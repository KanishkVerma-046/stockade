---
title: "How to Analyze Your Trading Performance: Key Metrics That Matter"
description: "Win rate alone can mislead you badly. Learn expectancy, profit factor, payoff ratio, drawdown and sample size using Stockade's analytics page."
date: 2026-08-03
author: "Stockade Team"
tags: ["Analytics", "Risk Management"]
slug: "analyze-trading-performance-metrics"
---

You finish a week of practice trading, open the analytics page, and see a win rate of 68%. That feels
good. Then you look at total P&L and it is negative. Nothing is broken — you have just discovered that
the number most traders quote first is the one that tells you the least.

Stockade's [analytics page](/analytics) computes six headline figures from your closed trades: total P&L, equity,
win rate, profit factor, average win, and max drawdown. Underneath sit three tabs — an equity curve, a
trade journal, and a win-rate-by-hour heatmap. Here is what each one means and which ones can lie to you.

## Why a 70% win rate can lose money while a 35% win rate makes it

Win rate is the share of your closed trades that finished with a positive P&L. On Stockade it is winning
trades divided by total trades, and a trade that closes exactly flat is counted on the losing side — so
scratch trades pull the number down slightly.

The problem is that it says nothing about the *size* of the wins and losses. Consider two traders, each
with 100 closed trades.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Win rate | 70% | 35% |
| Average win | $50 | $300 |
| Average loss | $150 | $80 |
| Payoff ratio (avg win ÷ avg loss) | 0.33 | 3.75 |
| Breakeven win rate needed | 75% | 21% |
| **Expectancy per trade** | **−$10** | **+$53** |

</div>

Trader A wins nearly three times out of four and is bleeding money. Trader B is wrong two trades out of
three and is compounding. Over those 100 trades, A is down about $1,000 and B is up about $5,300. Judged
on the win rate card alone, you would copy the wrong one.

## Expectancy: the number that answers whether your system makes money

Expectancy is the average dollar result you should expect from a single trade, over many trades. The
formula:

```
Expectancy = (Win rate × Average win) − (Loss rate × Average loss)
```

Average loss goes in as a positive number. Run it for both traders.

**Trader A:** 0.70 × $50 = $35 of expected gain. 0.30 × $150 = $45 of expected loss.
$35 − $45 = **−$10 per trade.** Every trade A takes has a negative expected value. More trading makes it
worse, faster.

**Trader B:** 0.35 × $300 = $105. 0.65 × $80 = $52. $105 − $52 = **+$53 per trade.**

Stockade does not print expectancy, but you can compute it in seconds from win rate, average win, and the
average loss you derive from the journal. Do this before you conclude anything else. A strategy with
negative expectancy cannot be fixed by trading it more often or sizing it larger — sizing only changes
how fast the arithmetic plays out.

The related figure is the **breakeven win rate**, which is `1 ÷ (1 + payoff ratio)`. Trader B's payoff
ratio is 300 ÷ 80 = 3.75, so B breaks even at 1 ÷ 4.75 = 21% and is winning 35%. Trader A's payoff ratio
is 50 ÷ 150 = 0.33, so A needs 75% and is only hitting 70%. That five-point gap is the whole difference
between the two accounts.

### R-multiples: the unit that makes different trades comparable

A $60 gain on a trade where you risked $600 is a very different event from a $60 gain where you risked
$40, but the journal's P&L column shows both as `+$60.00`. Define 1R as the dollar amount you put at risk
on entry — entry price minus stop price, times share count — then express every result as a multiple of
it. Risk $200, make $500: +2.5R. Risk $200, lose $180: −0.9R.

In R, you can average across symbols and position sizes without distortion. Trader B's expectancy is
0.35 × 3.75R − 0.65 × 1R = 1.3125 − 0.65 = **+0.66R per trade** — a figure that survives changes in
account size, which makes it the cleanest way to compare this month to last. It assumes you size
consistently, which is the argument for a
[fixed-percentage position sizing rule](/blog/risk-management-position-sizing).

## Profit factor, average win, and average loss

Profit factor is gross profit divided by gross loss across all closed trades. If your winners together
made $10,500 and your losers cost $6,200, profit factor is 10,500 ÷ 6,200 = **1.69** — for every dollar
lost, $1.69 was won. Anything above 1.0 is net profitable, and Stockade's card shows it to two decimals
with an `x` suffix.

Rough reading: below 1.0 is losing, 1.0 to 1.3 is marginal and could easily be noise, 1.3 to 2.0 is a
respectable edge over a decent sample, and much above 2.5 on a small sample usually means luck. If the
card shows `∞`, you have not logged a losing trade yet — a statement about sample size, not skill.

One quirk: the KPI row shows **Avg Win** but not average loss. You get average loss from the journal by
summing the negative P&L entries and dividing by the losing-trade count, which the Overview tab gives you
directly. You need it for both expectancy and the payoff ratio, so do not skip it.

## Max drawdown: the metric that decides whether you can stay with a strategy

Max drawdown is the largest peak-to-trough decline your equity has suffered, as a percentage. Stockade
computes it by walking your closed trades in order, tracking the running high-water mark, and recording
the worst percentage fall below it.

Say you build $100,000 up to a peak of $112,000, then a losing run drags you to $94,080. That is $17,920
off a $112,000 peak, so max drawdown is 16.0%. Note what recovery costs: climbing from $94,080 back to
$112,000 requires a **19.05% gain**, not 16%. Drawdowns are asymmetric, and deep ones are brutal — 50%
down needs 100% up.

This is the metric that decides whether a strategy is usable *by you*. A system with strong expectancy and
a 40% drawdown is one most people abandon at the bottom, converting a paper drawdown into a real loss. One
caveat: Stockade computes it from closed trades only, so an open position sitting deeply underwater does
not appear until you close it.

## What the shape of your equity curve tells you

The Equity Curve tab plots your running balance after each closed trade, starting at $100,000, with the
minimum and maximum labelled underneath. Most people read only the last point. The shape carries more.

A curve that grinds upward with shallow, short dips is consistent expectancy and controlled loss size. One
that is flat for long stretches then jumps vertically means a handful of trades produced almost all the
profit — remove them and you have nothing. A staircase that climbs then repeatedly gives back a large
block is the signature of cutting winners early and letting losers run. And a near-vertical line with no
pullbacks, on few trades, is not a discovery; it is a small sample.

The chart also autoscales to your own minimum and maximum, so a $300 swing and a $30,000 swing produce
identically dramatic lines. Check the labels before you react to the slope.

## Sample size: why fewer than 100 trades proves almost nothing

This is where most self-analysis goes wrong. Suppose you have 40 closed trades and a 50% win rate. The
standard error of that estimate is:

```
SE = sqrt(0.5 × 0.5 / 40) = sqrt(0.00625) = 0.079 → 7.9 percentage points
```

A rough 95% interval is about two standard errors either side, so your true long-run win rate could
plausibly be anywhere from roughly **34% to 66%**. That range contains both a very good system and a very
bad one. Forty trades has told you almost nothing.

Standard error shrinks with the square root of the count, so halving that band takes four times as many
trades — at 160 trades the SE drops to about 4.0 points. This is why roughly 100 closed trades is the
usual floor before drawing conclusions, and why the most common analytical mistake is overfitting:
rewriting your rules after eight bad trades, when eight trades is pure noise. Decide in advance how many
trades a rule change gets before you judge it, and write that into
[your trading plan](/blog/how-to-build-a-trading-plan).

## Finding your best hours with the time-of-day heatmap

The Time Heatmap tab lays out days of the week against hours from 9:00 to 20:00 and colours each cell by
win rate in that slot: green at 65% and above, red below 50%, neutral between, and a dash where you have
no trades. Hover a cell for its trade count.

This answers a genuinely useful question: are your afternoon trades quietly funding your morning ones? Two
cautions. Cells colour on win rate only, so a green cell can still be a money-losing hour if those wins
are tiny — cross-check the journal's P&L for that slot. And per-cell samples are tiny: four trades with
three winners shows 75% and means nothing. Wait for 20 or 30 trades in a slot before calling it a pattern.
The hours are your browser's local time, not an exchange session.

## What the trade journal records and what you must record yourself

The journal shows eight columns per closed trade: Symbol, Side, Entry, Exit, Qty, P&L, Duration, and Date,
newest first. That is a complete record of *what* you did.

It has no notes or reasoning field. Nothing captures why you entered, what setup you thought you saw, or
whether you followed your own rules — and the most valuable review question is not "which trades lost
money" but "which trades broke my rules", because a rule-breaking trade that happened to win is more
dangerous than a disciplined loss. Keep a separate document logging the setup, the planned stop and
target, and one line on whether you executed the plan, then join it to the journal by symbol and
timestamp. That habit separates deliberate practice from
[simply clicking buttons](/blog/paper-trading-guide), and it surfaces the
[repeatable mistakes](/blog/common-day-trading-mistakes) no dashboard can detect.

Two limits. The data lives in your browser's local storage, so clearing site data erases your history.
More importantly, these metrics measure your decision-making, not your temperament. Stockade's prices are
synthetic, there is no bid-ask spread, and no real money is at stake. A 16% drawdown on a simulated curve
is a number; the same drawdown with your own capital is a physical experience, and discipline that holds
cleanly here routinely collapses there.

## Practice this on the simulator

Take 20 trades, then open the analytics page and compute your expectancy by hand from the win rate and
average win cards plus the average loss you derive from the journal — write down the answer before you
look at total P&L. Then keep going to 100 trades and compute it again, and notice how far the number
moved. That movement is the standard error above, made concrete.
[Open the simulator](/simulator) and start logging trades worth analysing.
