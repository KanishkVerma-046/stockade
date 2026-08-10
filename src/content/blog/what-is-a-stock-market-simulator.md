---
title: "What Is a Stock Market Simulator and Why Should You Use One"
description: "A stock market simulator lets you trade real market mechanics with virtual money. Here is how they work and what they can and cannot teach you."
date: 2026-03-23
author: "Stockade Team"
tags: ["Basics"]
slug: "what-is-a-stock-market-simulator"
---

The first time most people place a real trade, they are learning two things at once: how the software works, and whether their idea about the market was any good. Those are very different problems, and mixing them is expensive. You click "sell" when you meant "sell short," you buy 100 shares when you meant 10, you discover your stop order was never actually submitted — and every one of those mistakes costs real money that you paid to learn something a manual could have taught you.

A stock market simulator separates those two problems. It gives you a full trading interface, live or historical price data, and a balance of fake money, so the mechanical mistakes cost nothing. You get to be bad at the software in private.

## What a stock market simulator actually is

A simulator is a trading platform where every part is real except the money. The price data is real market data. The order types are the real order types. The account math — position size, unrealized profit and loss, buying power, realized gains — follows the same arithmetic your broker uses. What is missing is the settlement: nobody sends your order to an exchange, and no cash leaves an account.

That distinction matters more than it sounds. A simulator is not a game with a market theme. It is a market with the consequences removed. The skills that transfer are the mechanical and analytical ones. The skill that does not transfer is the one you need most, and we will get to that honestly further down.

Stockade's simulator starts you with $100,000 in virtual capital and runs entirely in your browser. There is no signup and no account; your positions and history live in your browser's local storage. That design has an obvious tradeoff — clear your browser data and your history goes with it — but it means you can start in about four seconds instead of filling out a form.

## The mechanics you are actually there to learn

Before any strategy question, there is a layer of pure plumbing that trips up almost everyone. This is the part a simulator teaches best.

### Order types

A **market order** buys or sells immediately at whatever price is currently available. It guarantees you get filled; it does not guarantee the price.

A **limit order** sets a maximum you will pay or a minimum you will accept. Place a limit buy on a stock at $47.50 while it trades at $48.20 and nothing happens until the price comes to you. It guarantees the price; it does not guarantee you get filled at all.

A **stop-loss** is a resting order that becomes active when price moves against you past a level you chose. It is the mechanism that turns "I should probably cut this" into something that happens whether or not you are watching.

A **take-profit** is the same idea in the other direction — an order that closes your position once it reaches a target.

An **OCO bracket** ("one cancels the other") pairs a stop-loss and a take-profit around an open position. Whichever one fills first cancels the other, so you cannot accidentally end up with a dangling order that opens a new position after you have already exited.

Stockade supports all five. Placing a hundred of them with fake money is how the vocabulary stops being vocabulary and becomes muscle memory. The keyboard shortcuts help here too: `B` to buy, `S` to sell, `F` to flatten (close everything). When your hands know the exit key, hesitation stops being a factor in whether you exit.

### Position sizing, with actual numbers

Here is the calculation that most beginners never do, and the single most useful thing to drill in a simulator.

Say you have a $100,000 account and you decide no single trade may lose more than 1% of it. That is $1,000 of risk per trade.

You want to buy a stock at $52.00. You look at the chart and decide that if it trades below $50.00, your idea was wrong. Your risk per share is $52.00 − $50.00 = $2.00.

Your position size is your dollar risk divided by your per-share risk: $1,000 ÷ $2.00 = **500 shares**.

That is a $26,000 position (500 × $52.00) on a $100,000 account. Notice what happened: you did not decide the position size first and then hope. The stop level and your risk limit produced the size for you.

Now change one input. Same stock, same $52.00 entry, but you decide the level that invalidates your idea is $51.00 instead. Risk per share is $1.00, so the size becomes $1,000 ÷ $1.00 = **1,000 shares** — a $52,000 position, twice as large, with the same $1,000 at risk. A tighter stop does not mean less risk; it means a bigger position and a higher chance of being stopped out by ordinary noise.

Run that arithmetic thirty times in a simulator and it becomes automatic. Learn it on a live account and each repetition has a price tag.

## Reading the chart is a separate skill

The simulator's charts are candlestick charts with a volume histogram underneath. Each candle summarizes one time period: where price opened, where it closed, and the high and low it touched in between. The overlays available — EMA 9, EMA 20, EMA 50, plus VWAP, RSI, and MACD — are the common ones you will see referenced everywhere, and having them on screen while you trade is how you find out which ones you actually use versus which ones just make the chart look busy.

The honest answer for most people is that they start with six indicators and end with two. A simulator is where you can afford to discover that.

The Markets page carries 22 instruments: equities, BTC and ETH, major forex pairs, and futures including NQ, ES, CL, and GC. They do not behave the same way. A 1% move in a large-cap stock and a 1% move in crude oil futures feel completely different in terms of how fast they happen and how much they wobble on the way. Watching several markets side by side teaches that faster than reading about it.

For deliberate practice on a specific setup, the Chart Simulator at `/chart-simulator` replays historical price action candle by candle, so you can step forward through a day and make decisions without knowing what comes next. Live mode moves at 800ms ticks, which is closer to the real pace and closer to the real pressure.

## What the statistics tell you that your memory will not

Memory is a bad record-keeper for trading. You will remember the trade that ran 8% in your favour and forget the four small losses that paid for it.

The Analytics page keeps the record instead: equity curve, trade journal, win rate, profit factor, average win and average loss, max drawdown, and a time-of-day heatmap.

Two of those deserve explanation:

**Profit factor** is gross profit divided by gross loss. If your winning trades made $6,200 and your losers cost $4,000, your profit factor is 1.55 — you made $1.55 for every $1.00 you lost. Anything above 1.0 is net positive.

**Win rate alone tells you almost nothing.** A strategy that wins 35% of the time with an average win of $900 and an average loss of $300 produces, over 100 trades, (35 × $900) − (65 × $300) = $31,500 − $19,500 = **$12,000**. A strategy that wins 70% of the time with an average win of $200 and an average loss of $600 produces (70 × $200) − (30 × $600) = $14,000 − $18,000 = **−$4,000**. The higher win rate is the losing strategy. You cannot see that without keeping the numbers.

The time-of-day heatmap tends to produce the most uncomfortable discovery: many people find that a specific hour, usually the first thirty minutes after the open, accounts for most of their losses.

## What a simulator cannot teach you

This is the part that gets left out of most articles on this subject, and leaving it out is dishonest.

**Simulated trading removes the emotional weight of real money, which is the hardest part of trading.** Sitting through a $2,400 drawdown in virtual capital is mildly interesting. Sitting through a $2,400 drawdown in money you earned is a physical experience — and the discipline that held perfectly for three months on a simulator very often collapses in the first week of real trading. Rules do not fail because they were bad rules. They fail because following them costs something. A simulator cannot charge you that cost, so it cannot test whether you will pay it.

**Fills in a simulator are frictionless.** Your order fills at the price you see, instantly, in full. Real orders face slippage — the gap between the price you expected and the price you got, which widens exactly when the market is moving fast and you most want to be filled. Real orders also face partial fills, where you ask for 500 shares and get 300. Neither shows up in a simulator, so simulated results are systematically a little better than the same decisions would produce live.

**Commissions, spreads, borrowing costs, and taxes are not modelled the way your specific broker will apply them.** A strategy that clears a thin profit in a simulator can be a net loser once real costs land on it.

The correct way to read a good simulator result is: "my mechanics are sound and my idea is not obviously broken." Not: "this will work."

## How to use one so it actually helps

Treat the virtual balance as if it were real. The moment you start taking $40,000 positions "to see what happens," the practice stops being practice.

Trade one size and one setup until you have 40 or 50 entries in the journal, then look at the statistics rather than your recollection. Write down why you entered before you enter, not after you exit. And when you do move to real money, cut your size to something small enough that a full loss is genuinely boring — because you are no longer testing the strategy at that point, you are testing yourself.

## Practice this on the simulator

Open the Trading Simulator, take the $100,000 virtual balance, and do exactly one thing first: place a trade where you calculate the share count from your stop level before you enter, the way the arithmetic above works. Do that ten times, use `F` to flatten when your stop level is hit rather than talking yourself into "one more candle," then check the trade journal on the Analytics page to see what your average loss actually was versus what you intended it to be. That single loop teaches more than a week of reading.

[Start on the simulator](/simulator)
