---
title: "Risk Management 101: Position Sizing and the 1% Rule"
description: "Position size is an output of your stop distance, not a number you pick. The sizing formula, the 1% rule, drawdown recovery math, and R-multiples."
date: 2026-06-29
author: "Stockade Team"
tags: ["Risk Management"]
slug: "risk-management-position-sizing"
---

Ask a beginner how many shares they bought and you get a round number. Two hundred. Five hundred. A thousand, if the account felt flush that morning. Ask why, and the answer is usually "it felt right" or "that's about a third of my buying power." The stop goes on afterward, wherever the chart suggests, and the loss is whatever it turns out to be. Sometimes $180. Sometimes $2,400.

That sequence is backwards, and reversing it is the highest-value change most new traders can make. Position size is not a decision. It is the answer to a division problem whose inputs are your risk budget and your stop distance. Decide those two and the share count is already determined — you are only calculating it.

## Most beginners pick a share count first, and that is backwards

Here is what happens when size comes first. You buy 500 shares at 187.40. The chart says the trade is wrong below 185.90 — 1.50 per share of risk — so the loss if the stop fills is 500 × 1.50 = **$750**. On a $50,000 account that is 1.5% gone on one ordinary trade. Take the same setup with a wider, more honest invalidation at 183.90, still 500 shares, and the loss becomes 500 × 3.50 = **$1,750**, or 3.5%. Same trader, same conviction, same share count, and the damage more than doubled because of where a line on a chart happened to sit.

When size is fixed and stop distance varies, your dollar risk swings randomly. When dollar risk is fixed and stop distance varies, your share count adjusts and every loss comes out the same size. The second arrangement is the whole point of risk management. [Stop-loss orders](/blog/stop-loss-orders-explained) covers how to find the invalidation price; this article is about what to do with the number once you have it.

## The position sizing formula, worked end to end

The formula is one line:

**shares = (account × risk %) ÷ (entry − stop)**

Work it through with real figures. Account: $50,000. Risk per trade: 1%.

- **Risk budget:** 50,000 × 0.01 = **$500**
- **Entry:** 187.40
- **Stop:** 185.90
- **Risk per share:** 187.40 − 185.90 = **1.50**
- **Shares:** 500 ÷ 1.50 = 333.33, rounded down to **333 shares**
- **Actual risk if stopped:** 333 × 1.50 = **$499.50**
- **Notional position value:** 333 × 187.40 = **$62,404.20**

Round *down*, always. Rounding 333.33 up to 334 puts your risk at $501 — trivially over, but rounding in your own favor is not a habit you want to build.

Notice the last line. A $62,404 position on a $50,000 account exceeds the cash you have. In a cash account you could not take this trade at full size; in a margin account you could, and the leverage is invisible because the risk number still reads $500. So add a second constraint: a maximum notional exposure. Cap it at 100% of equity and the position becomes 266 shares risking $399. The sizing formula gives you a ceiling on loss, not permission to carry any amount of stock.

<div class="table-wrap">

| Stop price | Risk/share | Shares for $500 | Actual risk | Notional |
|---|---|---|---|---|
| 186.90 | 0.50 | 1,000 | $500.00 | $187,400 |
| 185.90 | 1.50 | 333 | $499.50 | $62,404 |
| 184.40 | 3.00 | 166 | $498.00 | $31,108 |
| 183.90 | 3.50 | 142 | $497.00 | $26,611 |

</div>

Every row risks essentially the same $500. That is what it looks like when size is an output.

## Drawdown recovery is brutally asymmetrical

This is the most persuasive argument in all of risk management, and it is pure arithmetic.

Lose money and you must earn back a *larger percentage* than you lost, because you are earning it on a smaller base. Lose 50% of $50,000 and you have $25,000. Getting back means turning $25,000 into $50,000 — a 100% gain. Not 50%. The loss and the recovery are never the same number.

The general form is **recovery = loss ÷ (1 − loss)**:

<div class="table-wrap">

| Drawdown | Account left from $50,000 | Gain needed to recover |
|---|---|---|
| 10% | $45,000 | 11.1% |
| 20% | $40,000 | 25.0% |
| 30% | $35,000 | 42.9% |
| 40% | $30,000 | 66.7% |
| 50% | $25,000 | 100.0% |
| 75% | $12,500 | 300.0% |

</div>

Check a middle row: 30% down leaves $35,000, and 35,000 × 1.429 = $50,015. Correct.

Read the bottom row slowly. A 75% drawdown requires quadrupling what remains just to reach the starting line, and traders in that position almost never get there — the only way to try is to take even larger risks, which is what produced the hole. The curve steepens viciously past 30%, which is why capping small losses matters more than capturing large wins.

## A five-loss streak is ordinary, and here is what it costs

Suppose your strategy wins 40% of the time — a perfectly workable figure if your winners are larger than your losers. Then each trade loses with probability 0.60, and five consecutive losses happens with probability 0.60⁵ = 0.0778, about **7.8%**.

That is not a disaster scenario. Across 100 trades there are 96 places a five-loss run could begin, and the expected number of such runs is roughly **three**. A streak of five is not bad luck. It is Tuesday. So the only question is what a routine streak does to your account:

<div class="table-wrap">

| Risk per trade | After 5 straight losses | Account left from $50,000 |
|---|---|---|
| 1% | 0.99⁵ = 95.1% | $47,549 |
| 2% | 0.98⁵ = 90.4% | $45,196 |
| 5% | 0.95⁵ = 77.4% | $38,689 |
| 10% | 0.90⁵ = 59.0% | $29,525 |

</div>

At 1%, five losses cost you 4.9% and you need 5.2% to recover. You barely notice. At 5%, the same ordinary streak costs 22.6% and needs a 29.2% gain to undo. At 10% you are down 41% and need a 69.4% gain — from a strategy that just lost five in a row, which is precisely when you will be least able to execute it.

Extend the run. Eight straight losses has probability 0.60⁸ ≈ **1.7%** — uncommon, but it will happen to you. At 1% risk, 0.99⁸ = 92.3% of the account remains. At 10% risk, 43.0% remains and you need a 132% gain. Risk of ruin is not an exotic concept; it is this table extended far enough. Small risk per trade is what makes an ordinary streak survivable instead of terminal.

## R-multiples turn every trade into the same unit

Once dollar risk is constant, express results in **R**, where 1R is your risk budget for that trade — $500 in our example.

A trade that gains $1,250 is +2.5R. One that loses the full stop is −1R. An early exit for $180 is +0.36R. Now a 333-share stock trade and a 142-share trade in something twice as expensive are directly comparable, because both risked one unit.

This makes expectancy computable. At a 40% win rate with average winners of +2R and average losers of −1R:

**(0.40 × 2R) + (0.60 × −1R) = 0.80R − 0.60R = +0.20R per trade**

Twenty cents of R per trade, or $100 at a $500 unit. That is arithmetic about a past sample, not a forecast — win rates drift and edges decay, so a positive historical expectancy promises nothing about the next hundred trades. But it does show why a 40% win rate is fine, while a 60% win rate with −2R losers can still be a losing strategy. That second claim depends entirely on winner size: at 60% wins and −2R losers, breakeven needs an average winner of +1.33R, so +2R winners would actually make it a strong system at +0.4R per trade, and anything under +1.33R sinks it. Win rate alone is never enough to judge. Stockade's [analytics view](/blog/analyze-trading-performance-metrics) tracks win rate, profit factor, and average win/loss, the raw inputs to this calculation.

## Daily and weekly loss limits stop a bad day compounding

Position sizing caps a single trade. It does nothing about the seventh trade of a frustrating morning, taken at triple size to make the day back.

Set hard limits in R. A common structure is **−3R daily, −6R weekly** — at 1% risk on $50,000, that is $1,500 in a day and $3,000 in a week. Hit the daily limit and you are done: platform closed, no "one more setup." Their value is that they are set in advance by a version of you who is not currently losing. Revenge trading is not a character flaw; it is what happens when a tilted brain is allowed to choose position sizes. Write the numbers into your [trading plan](/blog/how-to-build-a-trading-plan) so the decision is already made.

## Correlated positions make your real exposure larger than the sum

Three positions each risking exactly 1% feels like 3% at risk. It usually is not. If all three are semiconductor stocks, they share one driver: a bad sector print takes all three stops out together and you lose 3% in a single move. You did not take three 1% trades, you took one 3% trade in three tickers. The same goes for three crypto tokens following the same flows, or a long stock alongside a long index future.

The fix is a combined limit per theme — no more than 2% of total risk in one sector, factor, or direction, however many tickers it spans. Before adding a position, ask what single headline would stop out everything you hold at once, and total the damage.

Stockade cannot teach you this one, and it fails on two separate counts. Every instrument's price series is generated by its own independent random walk, so correlation between symbols is not modeled at all. More fundamentally, the simulator holds exactly one position at a time — switching symbols discards whatever you had open — so there is no book to total up even if the correlations existed. Portfolio-level exposure is not something you can practise here at all; it has to be understood as a real-market concept and applied the first time you genuinely hold two things at once.

## The 1% rule is a convention, not a law

There is nothing magic about 1%. It is a common default because it survives long losing streaks while still letting good trades matter. The defensible number depends on your win rate, your average R-multiple, how correlated your positions are, and how you behave when you are down. Some professionals risk 0.25% because they take many positions at once; some swing traders risk 2% on a handful of ideas a month. Both are coherent. What is not coherent is 8% "because the setup was really good" — conviction is not a risk parameter, and the market has never been informed of yours.

One asymmetry is worth stating plainly: beginners almost universally risk too much, not too little. If you are unsure, start at 1%. The cost of starting too small is a slower account; the cost of starting too large is no account.

## Practice this on the simulator

Take twenty trades on Stockade's $100,000 virtual trading balance where you compute the share count *before* opening the ticket — entry, stop, risk per share, then size, in that order. At 1% that is $1,000 per trade, so check the trade journal afterward to see whether your realized losses actually cluster near 1R or run past it. Remember that a simulated stop fills at the tick that crossed your level rather than at the level itself, and that virtual money makes this discipline far easier than real money ever will. Run the arithmetic on [Stockade's stock market simulator](/simulator) until the division is automatic.
