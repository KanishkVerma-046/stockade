---
title: "Risk-Reward Ratio and Expectancy: How They Fit Together"
description: "A risk-reward ratio only tells you the win rate you need to break even. The breakeven table, how stops and targets shift it, and why 1:3 is a rule of thumb."
date: 2026-10-26
author: "Stockade Team"
tags: ["Risk Management", "Strategy"]
slug: "risk-reward-ratio-expectancy"
---

One of the first rules new traders run into is "only take trades with at least 1:3 risk-reward." So you buy a hypothetical $40 stock, put your stop at $39 and your target at $43, and it feels like the responsible thing to do. You're risking $1 to make $3. Hard to argue with that.

The trouble is that the ratio hasn't told you whether the trade is any good. On its own, it can't. A risk-reward ratio is half of a calculation, and the other half is the part people skip: how often the target actually gets hit before the stop.

## What a risk-reward ratio measures and what it leaves out

The ratio compares two distances. Risk is entry minus stop: $40 − $39 = $1 a share. Reward is target minus entry: $43 − $40 = $3 a share. Divide reward by risk and you get 3, which people write as 1:3 or 3:1 depending on habit. We'll write it as 1:3 here, risk first, and measure the reward in units of risk: this trade's reward is 3R, where 1R is whatever you stand to lose. If R-multiples are new to you, [the position-sizing guide](/blog/risk-management-position-sizing/) explains them.

What the ratio leaves out is probability. A 1:3 trade that reaches its target one time in ten is a bad trade. A 1:1 trade that reaches its target six times in ten is a good one. You can't tell which kind you're holding from the ratio, because the ratio is a statement about prices you chose, not about what the market is likely to do.

## The breakeven win rate for every risk-reward ratio

Here's the useful thing a ratio does tell you. Over many trades, you make 3R each time you win and lose 1R each time you lose. You break even when those cancel. If your win rate is *w*, that means w × 3 = (1 − w) × 1, which solves to w = 1 ÷ 4, or 25%. The general version, for a reward of R units of risk:

```
Breakeven win rate = 1 ÷ (1 + R)
```

That's the same formula [the performance-metrics guide](/blog/analyze-trading-performance-metrics/) uses for the payoff ratio, applied before the trade rather than after it. Here it is for common ratios:

<div class="table-wrap">

| Risk-reward | You make per $1 risked | Breakeven win rate |
|---|---|---|
| 1:0.5 | $0.50 | 66.7% |
| 1:1 | $1.00 | 50.0% |
| 1:1.5 | $1.50 | 40.0% |
| 1:2 | $2.00 | 33.3% |
| 1:3 | $3.00 | 25.0% |
| 1:4 | $4.00 | 20.0% |
| 1:5 | $5.00 | 16.7% |

</div>

Read it as a price tag. Choosing 1:3 doesn't make you money. It sets the bar at 25%: win more often than that and the strategy makes money on average, win less and it loses. Whether you clear the bar depends on the setup, not on the ratio.

The distance between your real win rate and the breakeven one is your edge. In R terms, expectancy is win rate × R − loss rate × 1. A 30% win rate on 1:3 trades gives 0.30 × 3 − 0.70 = +0.20R per trade. The same 30% on 1:2 trades gives 0.30 × 2 − 0.70 = −0.10R. Same hit rate, opposite result.

## Moving the target changes the odds, not just the payoff

This is where the 1:3 habit misleads people. When you push a target further away, you don't just raise the reward. You lower the chance of reaching it. Those two effects pull against each other, and it's easy to watch only the first.

Take the extreme case. Suppose a price had no tendency in either direction, so each small move was as likely to go up as down, like a fair coin. This is the classic gambler's ruin problem from probability, and for a walk like that, [the chance of rising by one amount before falling by another is the fall divided by the sum of the two](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). In trading terms:

```
P(target before stop) = stop distance ÷ (stop distance + target distance)
```

With a $1 stop and a $3 target, that's 1 ÷ 4 = 25%. Exactly the breakeven win rate from the table. Try any other pair and the same thing happens: on a directionless price, every ratio lands precisely on its own breakeven. A 1:5 target gets hit 16.7% of the time, a 1:1 target 50%, and none of them make or lose money on average.

We think that's the most useful single fact about risk-reward. The ratio can't create an edge by itself. Real prices aren't fair coins, and that's where edge can come from: a setup is only worth trading if it makes the target *more* likely than that baseline. The ratio sets the bar. Your reason for the trade is what has to clear it.

## Why "never take less than 1:3" is a rule of thumb

Rules like "minimum 1:3" exist for a decent reason. They force you to name a target before you enter, and they stop you from risking a dollar to make a dime. As a filter, that's fine.

As a law, it falls apart. Compare four hypothetical setups:

<div class="table-wrap">

| Setup | Risk-reward | Win rate | Breakeven | Expectancy per trade |
|---|---|---|---|---|
| A | 1:1 | 60% | 50.0% | 0.60 × 1 − 0.40 = **+0.20R** |
| B | 1:2 | 40% | 33.3% | 0.40 × 2 − 0.60 = **+0.20R** |
| C | 1:3 | 30% | 25.0% | 0.30 × 3 − 0.70 = **+0.20R** |
| D | 1:3 | 22% | 25.0% | 0.22 × 3 − 0.78 = **−0.12R** |

</div>

A, B and C earn the same per trade. A fails the 1:3 rule and is fine. D passes it and loses money. The rule can't tell them apart, because it only looks at one of the two numbers.

There's also a quieter cost. If a setup's natural target is two dollars away and you insist on three, you've moved the target past where your idea says price is likely to go. The ratio improves on paper while the hit rate drops, often by more than the table can absorb. When the honest target doesn't give a ratio you can live with, the better move is usually to skip the trade or wait for an entry closer to the stop, not to stretch the target.

## Moving the stop changes the ratio too

The same trade-off runs the other way. Keep the $43 target and tighten the stop from $39 to $39.50. Risk drops to $0.50, reward stays at $3, and the ratio jumps from 1:3 to 1:6. The breakeven falls from 25% to 1 ÷ 7, or 14.3%.

It looks like a free upgrade. It isn't. A stop half as far away gets hit more often by ordinary noise, and on the directionless price from the section above, the chance of reaching $43 first falls to 0.50 ÷ 3.50 = 14.3%. Back on breakeven again. Tightening the stop only helps if the new stop still sits where your trade idea is proven wrong, which is the whole argument of [placing stops by structure](/blog/stop-loss-orders-explained/).

It also changes your size. If you risk a fixed $200 per trade, a $1 stop means 200 shares, an $8,000 position. A $0.50 stop means 400 shares and $16,000. The dollar risk is the same either way, but the tighter stop needs twice the capital, so check that it fits before you assume the better ratio is available to you.

## The ratio you plan isn't the ratio you get

The ratio you write down before entry is a plan. The one in your results is what happened, and it's usually worse. Four things erode it:

- **Early exits.** Taking profit at $41.80 because you got nervous turns a 3R winner into a 1.8R one.
- **Moved stops.** Widening a stop mid-trade turns a 1R loss into a bigger one.
- **Fill prices.** A stop can fill past its level in a fast market, so a −1R plan becomes −1.1R.
- **Costs.** Commission and spread come off every winner and get added to every loser.

Costs hit tight stops hardest. Say round-trip costs on our $40 stock come to a hypothetical $0.05 a share. With the $1 stop, a winner nets $2.95 and a loser costs $1.05, so breakeven becomes 1.05 ÷ (1.05 + 2.95) = 26.25% instead of 25%. With the $0.50 stop, a loser costs $0.55 and breakeven becomes 0.55 ÷ 3.50 = 15.7% instead of 14.3%. Same five cents, but it's a bigger share of a small risk.

The fix is to measure your realized ratio rather than trust your planned one. Average win divided by average loss (sign dropped) is your actual payoff ratio. If you planned 1:3 on $200 of risk but your average winner is $420 and your average loser is $210, you're really trading 1:2. Your breakeven is 33.3%, not 25%, and a 28% win rate that looked healthy is losing money.

## How to pick a target with the win rate in mind

Putting it together, here's the order we'd work in:

1. **Set the stop first,** at the price that proves the idea wrong.
2. **Set the target where price could realistically get,** such as the next [support or resistance level](/blog/support-and-resistance-levels/), not at a multiple you picked in advance.
3. **Compute the ratio and its breakeven** from the table.
4. **Compare that breakeven with your logged win rate** for this kind of setup, and want a clear margin above it. If you have only a few dozen trades, that win rate is still a rough guess; [the sample-size section](/blog/analyze-trading-performance-metrics/) explains how rough.
5. **If it doesn't clear, pass.** No target stretching.

Once a trade passes, a [bracket order](/blog/oco-and-bracket-orders/) holds both exits for you, so the plan doesn't depend on willpower in the moment. And write your minimum margin over breakeven into [your trading plan](/blog/how-to-build-a-trading-plan/), so you decide it once rather than trade by trade.

## Practice this on the simulator

On Stockade's [simulator](/simulator/), the Stop Loss and Take Profit fields take prices, and together they work as an OCO bracket on your open position: when one triggers, the whole position closes at that tick's price and both levels clear. There's no spread or commission, so the gap between planned and realized ratio there comes from your own exits and from ticks that cross a level. Before each trade, write down the ratio and its breakeven. After 30 trades, open [Analytics](/analytics/), divide Avg Win by Avg Loss without the minus sign, and compare that with what you planned, and your Win Rate with the breakeven you needed. Stockade's prices are generated in your browser, a random walk with a slowly drifting trend bias, so a hit rate there says nothing about how a setup does in a real market. What it does train is the habit: stop, target, ratio, breakeven, every time.
