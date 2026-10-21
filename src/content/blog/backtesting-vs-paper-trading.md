---
title: "Backtesting vs Paper Trading: What Each Can Prove"
description: "A backtest asks if rules made money on past data; paper trading asks if you can follow them. What each proves, how overfitting fools you, and a sequence to use."
date: 2026-12-07
author: "Stockade Team"
tags: ["Strategy", "Basics"]
slug: "backtesting-vs-paper-trading"
---

You write down a rule, run it over two years of past prices, and it makes money. You tweak the moving-average length, and it makes more. Then you trade it in real time and it does nothing, or worse. Or the reverse: you paper trade a setup for a month, finish ahead, and conclude it works.

Both conclusions skip a step. A backtest and a paper-trading run answer different questions, and neither one, alone, proves you have an edge. This post sorts out what each can show, the ways each misleads, and the order we'd use them in.

## Two tests that answer different questions

A **backtest** applies fixed rules to historical prices and records what would have happened. It asks: *would these exact rules have made money on data that already exists?*

**Paper trading**, also called forward testing when it's done to check a strategy, means trading the rules in real time with simulated money. It asks two different questions: *can you actually follow these rules as prices arrive?* and *does the result hold up on data that didn't exist when you wrote them?*

<div class="table-wrap">

| | Backtest | Paper trading |
|---|---|---|
| Data | The past | Prices as they arrive |
| Speed | Years of trades in minutes | Real time, a trade at a time |
| Sample size | Can be large | Usually small |
| Who makes the decisions | The rules, mechanically | You, under time pressure |
| Main way it misleads | Overfitting and bias in the test | Too few trades, and no real money at stake |

</div>

The two are complements. A backtest can show a rule had an edge on paper but can't show you'll execute it. Paper trading can show you execute it but takes a long time to gather enough trades to show an edge.

## How a backtest fools you: overfitting

Overfitting means tuning rules until they fit the particular past you tested on, including its random noise, rather than anything that will repeat. The more variants you try, the more likely the best one is a fluke.

How few variants it takes is the uncomfortable part. A 2014 paper in the *Notices of the American Mathematical Society*, [Bailey, Borwein, López de Prado and Zhu's "Pseudo-Mathematics and Financial Charlatanism"](https://www.ams.org/notices/201405/rnoti-p458.pdf), worked through it. The Sharpe ratio they use measures return per unit of volatility. Their figures show that even when none of the strategies has any real edge, trying only seven independent configurations on a two-year backtest is enough for the best one to be expected to show an annualized Sharpe ratio of 1 in the test, while its expected Sharpe ratio on new data is zero. In another example, they generated 1,000 daily prices as a random walk, so no seasonal effect could exist, and still found a seasonal strategy with a Sharpe ratio of 1.27.

Their conclusion is one worth adopting as a rule: a backtest that doesn't report how many variants were tried can't be assessed for overfitting. So keep a count. Every parameter change you test is another variant, including the ones you abandon. If you tried 30 combinations of moving-average lengths and stop distances to find the winner, the winner's results have to clear a much higher bar than if it was your first idea.

One more check we'd make: look at the winner's neighbors. If a 17-bar moving average makes money but 16 and 18 lose, the result probably belongs to that stretch of history rather than to the idea. A rule worth testing further should still roughly work when its settings move a little.

## Look-ahead bias, survivorship bias and free fills

Overfitting isn't the only way a backtest can flatter a rule. Three more are worth checking every time.

**Look-ahead bias** is using information the rule couldn't have had at the moment it acted. Say a rule buys at the open when the day closes above its 20-day average. At the open, nobody knows the close. A backtest that lets the rule peek will look far better than anything you can trade.

**Survivorship bias** is testing only on instruments that still exist. If you test a stock strategy on today's index members, you've quietly removed every company that went bankrupt, was delisted, or dropped out of the index during the test period. The losers aren't in your data, so the results lean optimistic.

**Free fills** means assuming every order filled at the exact price the rule wanted, with no spread, commission or slippage. [The risk-reward guide](/blog/risk-reward-ratio-expectancy/) shows how a few cents of cost per share can move a strategy's breakeven win rate, and tight-stop strategies feel it most.

## What paper trading proves and what it can't

Paper trading tests the part a backtest can't: you. Can you spot the setup in real time, enter without hesitating, leave the stop alone, and take the exit the rules say? A strategy that works mechanically can fail here, because the person running it adds discretion the backtest never had. Every trade is also, by construction, on new data, so forward testing can't overfit the past the way a backtest can.

It has three limits. First, it's slow, so samples stay small. [The performance-metrics guide](/blog/analyze-trading-performance-metrics/) shows that at 40 trades, a 50% win rate has a rough 95% range of about 34% to 66%, which covers both a good system and a bad one. Second, the money isn't real. [The paper-trading guide](/blog/paper-trading-guide/) covers what that leaves out, and the short version is that discipline which holds with virtual money often slips with real money. Third, simulated fills are usually kinder than real ones.

## Comparing paper results with the backtest

The useful question isn't whether paper trading made money. It's whether the paper results are consistent with what the backtest said, and if not, why.

Here's a hypothetical. A backtest reports a 45% win rate on trades planned at 1:2, so expectancy is 0.45 × 2 − 0.55 × 1 = +0.35R per trade. You paper trade 40 trades and win 15, a 37.5% win rate, and your average winner comes in at 1.8R instead of 2R. Your expectancy is 0.375 × 1.8 − 0.625 × 1 = +0.05R.

Read the two gaps separately. The win rate gap is within the noise: the standard error of a 45% win rate over 40 trades is √(0.45 × 0.55 ÷ 40), about 7.9 percentage points, and 37.5% is 7.5 points below. You can't tell whether that gap is real. The average winner is different. Coming in at 1.8R instead of 2R is something you can check trade by trade, and if [your journal](/blog/trading-journal-guide/) shows early exits, that's an execution problem, not a strategy problem. Fix the execution and keep testing before you draw any conclusion about the rules.

## The sequence we'd use

1. **Write the rules precisely enough that a stranger could check them.** [The trading-plan guide](/blog/how-to-build-a-trading-plan/) covers how. If you can't write it down, you can't backtest it or follow it.
2. **Backtest on one period, and count every variant you try.**
3. **Hold back a later period you never looked at, and test the final version on it once.** If it fails there, you've learned something cheaply. Don't tune it until it passes, or the held-back data becomes just more data you've fitted.
4. **Paper trade forward for a number of trades fixed in advance,** with each one journaled, and compare the results with the backtest the way the previous section does.
5. **Move to real money at a small size,** as the paper-trading guide describes, and only scale once real results stay consistent with both tests.

Write down before each stage what result would end it. For the paper stage, that might be: after the planned number of trades, with the rules followed on nearly all of them, expectancy is below zero or far below the backtest's. Deciding afterwards invites the same bending of rules that overfitting does to a backtest.

Each stage can only reject a strategy or let it through to the next. None of them proves the edge will last, and markets change. That's why step 5 starts small.

## Where Stockade fits, and where it doesn't

Stockade can't backtest. It has no historical price data and no way to run rules automatically. Its replay mode generates 600 one-minute candles in your browser and shows the first 61; you step through the rest by hand with Space or the right arrow key, or let it autoplay, without seeing what comes next.

So replay is a forward test of your execution, on synthetic data. It's useful for the habits step 4 depends on: following written rules, entering stops at the moment of entry, logging every trade. It can't tell you whether a strategy has an edge. Stockade's prices come from an algorithm, a random walk with a slowly drifting trend bias, with no connection to any real market, so how a strategy does there says nothing about how it would do on real prices. And as the Bailey paper's random-walk example shows, even a series with no real pattern can produce results that look like a strategy working. A good run on Stockade is a record of your discipline, not evidence about the rules. [The simulator explainer](/blog/what-is-a-stock-market-simulator/) covers what else a simulator can and can't teach.

## Practice this on the simulator

Write a rule set on one page, then open the [simulator](/simulator/) in replay mode and trade 30 setups strictly by it, with a stop entered in the Stop Loss field on every trade. Journal each one: setup, planned entry, stop and target, and whether you followed the rules. At the end, don't ask whether you made money. Ask how many trades broke the rules and what your average winner was in R compared with what you planned, because those are the numbers a real forward test would need you to get right.
