---
title: "Drawdown Recovery Math: Why a 50% Loss Needs a 100% Gain"
description: "A 50% loss needs a 100% gain, but how many trades does the recovery take? Losing-streak odds, volatility drag, and how to set a drawdown limit in advance."
date: 2026-11-02
author: "Stockade Team"
tags: ["Risk Management", "Analytics"]
slug: "drawdown-recovery-math"
---

Lose half of a $10,000 account and you have $5,000. To get back to $10,000 you have to double what's left, a 100% gain. That line gets quoted a lot. The follow-up questions matter more: how many trades does the climb back take, how deep should you expect a losing run to go, and how much drawdown should you accept before you've ever had one?

This post works through those numbers. Everything here is arithmetic on hypothetical figures. None of it is comforting, which is why it's worth doing before you need it rather than in the middle of a bad month.

## The recovery formula in one line

A drawdown is the fall from your account's highest point (its peak) to a later low, as a percentage of that peak. If you're down by a fraction *D*, the gain you need to get back to the peak is:

```
Gain needed = D ÷ (1 − D)
```

Down 20% needs 0.20 ÷ 0.80 = 25%. Down 50% needs 0.50 ÷ 0.50 = 100%. The gap widens fast because each loss shrinks the base you earn the recovery on. [The position-sizing guide](/blog/risk-management-position-sizing/) has the full table from 10% to 75%, so we won't repeat it. What a percentage can't tell you is how long recovery takes, so the rest of this post measures it in trades.

## Recovery measured in trades, not percent

To turn a percentage into a number of trades, you need a strategy. Take a hypothetical one: it wins 40% of the time, winners make 2R and losers lose 1R, where R is the amount risked per trade. Its expectancy is 0.40 × 2 − 0.60 × 1 = +0.2R per trade. (If that arithmetic is new, [the risk-reward guide](/blog/risk-reward-ratio-expectancy/) walks through it.) Risk 1% of the account per trade and it earns 0.2% per trade on average.

Then compound it, because when you risk a fixed percentage, every trade is sized off the current, smaller balance. On average, this is how many trades it takes to climb back:

<div class="table-wrap">

| Drawdown | Gain needed | Trades to recover at 1% risk | Trades to recover at 2% risk |
|---|---|---|---|
| 10% | 11.1% | about 56 | about 30 |
| 20% | 25.0% | about 118 | about 63 |
| 30% | 42.9% | about 189 | about 100 |
| 50% | 100.0% | about 367 | about 194 |

</div>

Two things stand out. First, a 20% drawdown at 1% risk costs well over a hundred trades of a strategy that *works*. If you take three trades a day, that's about two months of trading just to get back to where you were.

Second, the 2% column looks faster, and that's a trap. The right comparison isn't the same drawdown at two risk levels, because the same bad run digs a deeper hole at 2%. Put one ten-loss streak through each:

<div class="table-wrap">

| Risk per trade | Drawdown from 10 straight losses | Trades to climb back |
|---|---|---|
| 1% | 9.6% | about 53 |
| 2% | 18.3% | about 57 |
| 5% | 40.1% | about 70 |

</div>

Doubling your risk doubles the hole and roughly doubles your speed, so the climb takes about the same number of trades. Push risk higher and it gets worse, not better, for a reason we'll get to under volatility drag. Bigger size doesn't buy you a faster recovery. It buys you a deeper drawdown.

These figures are averages. Real sequences wander: some climb back sooner, and an unlucky one can take far longer.

## How long a losing streak to plan for

The position-sizing guide works out the odds of one particular streak. A more useful planning question is how bad the *worst* streak in a stretch of trades is likely to be. For our 40%-win strategy, here's the chance of seeing at least one run of losses at least this long:

<div class="table-wrap">

| Streak of at least | Over 100 trades | Over 200 trades | Over 500 trades |
|---|---|---|---|
| 6 losses | 87% | 98% | ~100% |
| 8 losses | 49% | 75% | 97% |
| 10 losses | 20% | 38% | 71% |
| 12 losses | 8% | 15% | 35% |
| 14 losses | 3% | 6% | 14% |

</div>

These come from the exact probability of a run, with each trade independent of the last. Over 500 trades, a ten-loss streak is more likely than not. And this is a strategy with positive expectancy. Nothing about it is broken when that streak arrives.

Longer samples produce longer streaks. That sounds obvious, but it catches people out: a streak you've never seen in your first 100 trades says nothing about whether you'll see it in the next 400.

## Volatility drag: why an average return overstates what you keep

Here's the strangest part of drawdown math. Gain 50% and then lose 50%, and your average return is zero. Your account is down 25%, because 1.50 × 0.50 = 0.75. Gain 10% and lose 10% and you're down 1% (1.10 × 0.90 = 0.99). Gain 20% and lose 20% and you're down 4%.

That gap between the average return and the compounded one is [often called volatility drag, and it can be approximated by subtracting half the variance from the average](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/):

```
Compounded return per period ≈ average return − (variance ÷ 2)
```

where variance measures how widely results swing around their average. Small swings barely drag. Big swings drag hard, because the penalty grows with the square of the swing.

Apply it to our strategy. Its average gain per trade is 0.2R, so if you only looked at averages, risking more would always mean earning more. Compounding disagrees:

<div class="table-wrap">

| Risk per trade | Average gain per trade | Compounded gain per trade |
|---|---|---|
| 1% | 0.20% | 0.19% |
| 2% | 0.40% | 0.36% |
| 5% | 1.00% | 0.74% |
| 10% | 2.00% | 0.98% |
| 15% | 3.00% | 0.75% |
| 20% | 4.00% | 0.07% |
| 25% | 5.00% | −1.04% |

</div>

At 25% risk per trade, a strategy with positive expectancy loses money over time. The average still says +5% per trade, but what you actually keep shrinks every trade. Growth peaks at 10% risk for this strategy. That peak is known as the Kelly fraction, after [a 1956 paper by J. L. Kelly Jr.](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf) showing that a gambler who bets the growth-maximizing fraction every time will eventually get ahead of one betting any other fixed fraction, and stay ahead. Full Kelly assumes you know your true win rate and payoff exactly, which you never do in practice. We wouldn't go near it: at 10% risk, a ten-loss streak takes 65% of the account, and the recovery formula says that needs a 187% gain.

This is also why the "trades to climb back" figures rise at 5%. Drag eats into the recovery speed while the losses stay just as deep.

## Choose your maximum drawdown before you need it

Every number above points the same way: decide how deep you're willing to go while you're calm, then work backward to a risk level. Three steps:

1. **Pick the drawdown you'd keep trading through.** Be honest. If a 20% fall would make you abandon the strategy, that's your number, whatever a book says.
2. **Pick the streak you're planning for.** From the streak table, a 12-loss run has about a one-in-three chance over 500 trades for our strategy. That's a reasonable planning case.
3. **Solve for risk per trade.** You need (1 − risk)^streak to stay above 1 − drawdown. For a 20% limit and a 12-loss streak, risk ≤ 1 − 0.80^(1/12) = **1.84%**. Plan for 14 losses and it's 1.58%.

Then leave a margin. A real drawdown is usually deeper than its longest streak, because losses come in clusters with a few small wins scattered between them, and the account keeps sliding through all of it. Halving the computed figure, to something under 1% here, is a defensible place to start.

Finally, write down what happens at each milestone: for example, cut risk in half at −10% and stop trading to review at −15%. Cutting size slows the climb back, since at 1% instead of 2% a 10% drawdown takes about 56 trades instead of 30. But it shrinks the damage from the next streak, which is the one you can't see coming. The rule that matters most is the one [the day-trading mistakes guide](/blog/common-day-trading-mistakes/) warns about from the other side: never raise size to win a drawdown back. Put these numbers in [your trading plan](/blog/how-to-build-a-trading-plan/) so they're settled before the losses start.

## What Stockade's Max Drawdown card measures

On Stockade's [Analytics page](/analytics/), Max Drawdown walks your closed trades in the order they closed, starting from the $100,000 opening balance as the first peak. It records the largest fall below the running peak as a percentage of that peak.

Because it uses closed trades only, an open position's swings never show up. If an open trade pulls your equity down 8% and then recovers before you close it, that dip never appears, and a loss you're still holding doesn't count until you close it. Treat the card as a floor on how deep it actually got. [The performance-metrics guide](/blog/analyze-trading-performance-metrics/) covers the rest of the page.

## Practice this on the simulator

Before your next session on the [simulator](/simulator/), write down three numbers: your risk per trade, the streak you're planning for, and the drawdown at which you'll cut size. Size every trade off the current balance, not the starting one. After 50 trades, compare Max Drawdown on [Analytics](/analytics/) with what your plan allowed, and count your longest losing streak by hand from the Journal tab. Stockade's prices are generated in your browser and its money is virtual, so a drawdown there is a number on a screen. The arithmetic of climbing back is the same, and the habit of deciding your limits in advance is the part worth carrying into real trading.
