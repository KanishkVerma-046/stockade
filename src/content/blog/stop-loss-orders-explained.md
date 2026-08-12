---
title: "Stop-Loss Orders: How to Protect Your Trades From Big Losses"
description: "A stop belongs where your trade idea breaks, not at a round dollar figure. Stop-market vs stop-limit, placement beyond structure, and sizing to fit."
date: 2026-05-18
author: "Stockade"
tags: ["Order Types", "Risk Management"]
slug: "stop-loss-orders-explained"
---

You buy 500 shares at 187.40 because the chart looks good. It drops to 186. You wait, because it always comes back. It drops to 184. Now selling means admitting you were wrong, so you tell yourself you are a longer-term holder. At 179 you finally get out, down $4,200 on a trade you originally expected to risk a few hundred dollars.

Nobody plans that. It happens because the decision about when to get out was left until the moment when getting out was hardest. A stop-loss is how you make that decision in advance, while you are still calm and still capable of thinking about the trade rather than about the money.

## What a stop-loss order actually does

A stop-loss is a resting instruction: if price reaches a level you specify, close my position. You set it when you enter, when the outcome is still unknown and your judgment is intact. When it triggers, no decision is required from you — the order already made it.

One thing about that definition matters more than it looks: the stop is an order, not an intention. "I'll get out if it hits 185" is not a stop-loss. It is a plan you will renegotiate the moment 185 arrives and the tape looks like it might bounce. A working stop executes without asking you.

## Stop-market and stop-limit orders, and the trap in the second one

Once a stop triggers, something has to actually sell your shares. There are two ways to specify that, and the difference has ended accounts.

A **stop-market** order says: when price touches 185.90, sell at whatever the market will pay. You are guaranteed to get out. You are not guaranteed the price. If the market is falling quickly, your fill may come in at 185.40 or worse.

A **stop-limit** order says: when price touches 185.90, place a limit order to sell at no worse than 185.80. Now you control the price — but you no longer control whether you exit at all. If the next trade prints at 184.20, your limit sits unfilled at 185.80 while the market runs away below it. You are still holding a losing position, and the protection you thought you had is an order that will never fill. That is the trap. The stop-limit protects your fill price by abandoning the thing you actually wanted, which was to be out.

The distinction matters most in exactly the conditions a stop exists for: fast, one-directional moves. Most traders should use stop-market orders for protective stops for that reason. The [difference between market and limit orders](/blog/market-orders-vs-limit-orders) is worth understanding in general, but here the asymmetry is stark — a slightly worse fill is a bad afternoon, an unfilled protective stop is a bad year.

## Put the stop where your trade idea is proven wrong

The most common way to place a stop is to decide how much money you are willing to lose and put the stop that far away. Someone risking $500 on 500 shares puts the stop 1.00 below entry and calls it risk management.

It is not. The market has no idea what your account balance is. A stop at an arbitrary distance gets hit by ordinary noise, and the position closes while your original reason for the trade is still completely intact. You lose money without learning anything, because the trade was never actually tested. The stop belongs at the price that makes your reason for being in the trade false.

Say you bought at 187.40 because price held a level at 186.15 twice and pushed off it. Your thesis is "buyers are defending 186.15." Below 186.15, that thesis is dead — not damaged, dead. Add a small buffer and place the stop at 185.90. Now the distance is defined by the chart, not by your comfort. If it triggers, you were wrong about something real, which is information. [Support and resistance levels](/blog/support-and-resistance-levels) are the raw material for this kind of placement.

Your risk per share is 187.40 − 185.90 = **1.50**. That number is an output of the analysis, not an input. What you do with it comes next.

### Place stops beyond structure, not on round numbers

Round numbers attract stops. 186.00 looks like a natural line, so traders long from nearby put their stops just under it — 185.95, 185.90, 185.85. That is a cluster of sell orders in a narrow band, and a cluster of sell orders is a target. Price dips through, triggers the whole pile, absorbs the supply, and reverses.

You cannot avoid this entirely, but you can avoid being the easiest prey. Place the stop beyond the structural level rather than at the round figure near it — under the actual swing low, past the edge of the range, on the far side of the moving average the trade is built on. If the swing low is 186.15, a stop at 186.05 is inside the noise. A stop at 185.90 sits below the level *and* below the obvious round-number shelf.

The cost is real: a stop further away is a bigger loss when it hits. That cost is paid with position size, not by hoping.

## Stop distance and position size are the same decision

This is the part most beginners skip, and it is the whole mechanism.

Fix your dollar risk first: $500 on a $100,000 account, one half of one percent. Then:

**shares = dollar risk ÷ risk per share**

With a stop at 185.90, risk per share is 1.50:

- 500 ÷ 1.50 = 333.33, so **333 shares**
- Actual risk if stopped: 333 × 1.50 = **$499.50**

Now suppose the structure is wider and the honest invalidation is 183.90 — a 3.50 stop:

- 500 ÷ 3.50 = 142.86, so **142 shares**
- Actual risk if stopped: 142 × 3.50 = **$497.00**

Same $500 at risk. Completely different position. A wider stop does not mean more risk; it means fewer shares. The stop distance and the share count move in opposite directions to hold the loss constant.

This also exposes the tight-stop fantasy. A 0.50 stop would allow 1,000 shares — but 1,000 × 187.40 is $187,400 of stock on a $100,000 account, which requires leverage, and the stop is close enough that routine noise takes it out repeatedly. [Position sizing and the 1% rule](/blog/risk-management-position-sizing) goes deeper on this arithmetic.

<div class="table-wrap">

| Stop price | Risk/share | Shares for $500 | Position value |
|---|---|---|---|
| 186.90 | 0.50 | 1,000 | $187,400 |
| 185.90 | 1.50 | 333 | $62,404 |
| 183.90 | 3.50 | 142 | $26,611 |

</div>

## Trailing stops and what you give up to use one

A trailing stop follows price in your favor and never moves back. Long from 187.40 with a 2.50 trail: price runs to 194.00, the stop drags up to 191.50, and an exit there locks in 4.10 per share — 333 × 4.10 = **$1,365.30** — without you deciding anything.

The trade-off is that a trailing stop always gives back the trail distance. You will never exit at the high, by construction. Trail too tightly and a normal pullback ends a trend trade early; trail too loosely and you hand back a large part of an open gain. There is no correct setting, only a choice about which regret you prefer. Trailing stops are often combined with a profit target through a bracket order, which [OCO and bracket orders](/blog/oco-and-bracket-orders) covers as an order type.

## Three honest things about stops

**A stop does not guarantee your exit price.** In real markets, a stock can close at 186.20 and open the next morning at 178.00 on news. Your 185.90 stop becomes a market order at 178.00. This is why a stop limits losses rather than capping them, and why position size still matters even when a stop is in place.

**Getting stopped out repeatedly usually means the stop is too tight, not that stops are bad.** If an instrument routinely swings 2.00 in an hour and your stop sits 0.60 away, you are not being unlucky — you are paying the market to sample its noise. Measure the instrument's normal range first, then set the stop outside it, then size the position down to keep the dollar risk unchanged.

**Moving a stop further away is how a small loss becomes a catastrophic one.** That original $499.50 becomes $1,798.20 if you slide the stop from 185.90 to 182.00 on 333 shares. Slide it to 175.00 and it is $4,129.20 — more than eight times the loss you agreed to take. A stop may be moved in the direction of your profit. Moving it away from profit is not risk management; it is a refusal to be wrong, expressed in dollars.

## What Stockade's near-frictionless fills do not show you

Stockade supports stop-loss and take-profit levels on the `/simulator` order ticket: enter them alongside your order, and the position closes automatically when price reaches the level. Fills there carry far less friction than real ones, but not none. There is no bid-ask spread — a single quoted price serves as both bid and offer — and there are no partial fills, so the whole position always closes at once. The generated price series never gaps either, because each candle opens exactly where the previous one closed.

What the simulator does not give you is the exact price you typed. It checks your stop against a new price every 800 milliseconds, and price moves in discrete jumps between those checks. When a tick finally comes in at or below your 185.90 stop, the exit is booked at *that* tick — 185.87, 185.82, wherever the jump landed — not at 185.90. The gap is small, but it is one-directional and always against you, which is the same shape real slippage has at a fraction of the size.

Real stops are far worse than that. Use the simulator for the parts it models honestly — choosing an invalidation level, sizing the position to it, leaving the stop alone once set — and assume real exits will be worse than simulated ones. Stockade prices are also entirely synthetic, generated in your browser, not a feed from any exchange.

## Practice this on the simulator

Take twenty trades where you write down the invalidation price *before* you write down the share count, then let the arithmetic set the size. Enter the stop level on the ticket at the same moment you open the position, and do not touch it afterwards — the discipline of leaving it alone is the skill, and it is far harder with real money than with virtual capital. Then check `/analytics` to see whether your losses cluster near your planned risk or run well past it. Start on the [Stockade simulator](/simulator).
