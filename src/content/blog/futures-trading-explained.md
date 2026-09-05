---
title: "Futures Trading Explained: Contracts, Margin, and Leverage"
description: "What a futures contract really is, how tick size and multipliers work, why margin is a performance bond rather than a loan, and how leverage cuts both ways."
date: 2026-07-27
author: "Stockade Team"
tags: ["Futures", "Risk Management"]
slug: "futures-trading-explained"
---

A trader with $20,000 opens a futures account, buys one E-mini S&P 500 contract at 5,248.75, and watches the index fall about 2% over the next session. They expected to lose roughly 2% of something. What they actually lost was $5,248.75 — more than a quarter of the account — because the position was never $20,000 of anything. It was $262,437.50 of index exposure controlled by a deposit.

That gap between what you deposit and what you control is the whole subject of futures. Everything else — tick values, expiration months, contango — is detail layered on top of it.

## A futures contract is an obligation, not a share of ownership

When you buy a share of stock you buy a fractional claim on a company. You own something. It can go to zero, but it cannot go below zero, and nobody sends you a bill.

A futures contract is a different object entirely: a standardized, exchange-traded agreement to buy or sell a specific quantity of something at a specific date and price. Buying one /CL contract commits you to take delivery of 1,000 barrels of crude oil at expiration. Selling one commits you to deliver them. You own nothing in the meantime — you hold a two-sided obligation, and the counterparty holds the mirror image.

"Standardized" is what makes the market work. Every /CL contract is 1,000 barrels of the same grade on the same terms, so contracts are interchangeable: you exit by selling one you bought, not by negotiating your way out of an agreement, and the clearing house stands between every buyer and seller. Almost nobody takes delivery — retail traders close or roll before expiration. But the delivery obligation anchors the price to the underlying market, and it is why the exchange demands a deposit before letting you carry one.

## Contract specifications: multiplier, tick size, and tick value

A futures price is not a dollar amount. It is a number you translate into dollars through the contract's multiplier. Stockade carries four futures symbols on `/simulator` and `/markets`, and each translates differently.

<div class="table-wrap">

| Symbol | Contract | Multiplier | Tick size | Tick value | Price | Notional |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | $50 per index point | 0.25 pt | $12.50 | 5,248.75 | $262,437.50 |
| /NQ | E-mini Nasdaq 100 | $20 per index point | 0.25 pt | $5.00 | 18,421.25 | $368,425.00 |
| /CL | Crude Oil | 1,000 barrels | $0.01 | $10.00 | 78.34 | $78,340.00 |
| /GC | Gold | 100 troy ounces | $0.10 | $10.00 | 2,341.40 | $234,140.00 |

</div>

Work one line by hand. /ES at 5,248.75 with a $50 multiplier is 5,248.75 × 50 = **$262,437.50** of notional exposure per contract. The minimum increment is 0.25 index points, and 0.25 × 50 = **$12.50** per tick. Move ten ticks in your favor — 2.5 index points — and you have made $125.

Confusing the specs is expensive. /NQ ticks in the same 0.25 increment as /ES, but at a $20 multiplier each tick is worth $5.00, not $12.50 — and /NQ moves far more points per day, so the smaller tick value does not make it the smaller risk. /CL and /GC share a $10 tick value by completely different routes: a penny on 1,000 barrels, and a dime on 100 ounces.

Notional is not what you can lose — a contract does not go to zero any more than the S&P does. But notional is what your P&L is calculated on, and it is the number leverage is measured against.

## Why futures margin is a performance bond, not a loan

This is the single most misunderstood point in futures, and it is where equity intuition actively misleads you.

In a stock margin account, margin is borrowed money. You put up $30,000, the broker lends you $30,000, you buy $60,000 of stock, and you pay interest. The stock is collateral. It is a debt and it behaves like one.

Futures margin is not a loan. Nothing is borrowed and no interest accrues, because nothing has been purchased — you entered an agreement, you did not buy an asset. The margin you post is a **performance bond**: a good-faith deposit held by the clearing house to guarantee you can meet your daily obligations. It is closer to a security deposit than to a mortgage.

Two consequences follow. There is no interest cost to carrying a futures position. And — the dangerous half — the size of the deposit has nothing to do with the size of your obligation. A performance bond is sized to cover roughly one day's plausible adverse move, not the value of the contract. That is exactly why the leverage is so high.

## Initial margin, maintenance margin, and daily mark-to-market

Two thresholds govern the account, and they are not the same number. **Initial margin** is what you must have available to open a position. **Maintenance margin** is the lower floor your equity must stay above to keep it open. Fall below maintenance and you get a margin call, and must restore the account — typically back up to the initial requirement, not merely back to maintenance.

Between them sits **daily mark-to-market**. Futures positions settle every single day: gains credited in cash, losses debited, every session, whether or not you close the trade. There is no unrealized futures loss sitting quietly on the books.

All margin figures below are **illustrative only** — exchanges and brokers set them, they vary by broker, and they rise when volatility rises. Never treat a number from an article as current.

Say /ES initial margin is $13,000 and maintenance is $11,800. You deposit $20,000 and buy one contract at 5,248.75.

- **Day 1:** price falls to 5,180.00 — 68.75 points × $50 = **−$3,437.50**, debited that evening. Equity: $16,562.50. Above maintenance, no action.
- **Day 2:** price falls to 5,080.00 — 168.75 points × $50 = **−$8,437.50** cumulative. Equity: $11,562.50, below the $11,800 floor.
- **The call:** restore equity to the $13,000 initial requirement. You wire **$1,437.50** or the broker liquidates for you.

Two ordinary sessions. A 3.2% move in the index. A margin call.

## The leverage arithmetic: what a 2% move does to posted capital

Divide notional by the deposit and you get the leverage ratio. $262,437.50 ÷ $13,000 ≈ **20:1**. You are controlling roughly twenty dollars of index for every dollar posted.

Now run the number that matters:

- 2% adverse move on /ES notional: 262,437.50 × 0.02 = **$5,248.75**
- As a share of a $13,000 margin deposit: 5,248.75 ÷ 13,000 = **40.4%**

A 2% move in the underlying erases 40% of the capital you posted. The S&P 500 has 2% days several times in an average year. This asymmetry — small move, enormous proportional damage — is the most important thing on this page, and it is why the [1% rule and position sizing arithmetic](/blog/risk-management-position-sizing/) are not optional in futures. It also means [stop-loss placement](/blog/stop-loss-orders-explained/) has to come before entry, not after. In stocks a forgotten stop is a bad trade. At 20:1, it is a solvency event.

## Expiration, rollover, and contango in commodity futures

Every futures contract dies on a schedule. /ES expires quarterly — March, June, September, December. Crude oil expires monthly. To hold exposure past expiration you must **roll**: close the expiring contract and open the next month's, usually in the week or two before expiry as liquidity migrates forward.

The two months do not trade at the same price. When the further-dated contract is more expensive than the nearer one — often because storing physical crude costs money — the market is in **contango**. When it is cheaper, typically when a shortage right now has buyers paying up for immediate barrels, it is in **backwardation**.

Contango is a real cost to a long holder. If front-month /CL is 78.34 and next month is 78.95, rolling one long contract means selling low and buying high: 0.61 × 1,000 barrels = **$610** per roll. Roll monthly for a year in a persistently contangoed market and the drag compounds even if oil ends the year unchanged. That is why commodity positions held through many rolls often lag the spot price they track.

## Micro contracts as the realistic entry point for small accounts

Micro contracts are one-tenth of their E-mini parent, and for most retail accounts they are the only defensible starting size. /MES is 1/10 of /ES: **$5 per index point**, tick value 0.25 × 5 = **$1.25**, notional at 5,248.75 of 5,248.75 × 5 = **$26,243.75**. /MNQ is 1/10 of /NQ at $2 per point.

The difference to a small account is not cosmetic. On a $5,000 account with a stop 10 index points away:

- **1 /ES contract:** 10 × $50 = **$500** at risk — **10%** of the account on one trade.
- **1 /MES contract:** 10 × $5 = **$50** at risk — **1%** of the account.

The /MES version is a normal trade. The /ES version is a gamble no amount of conviction justifies. Micros also let you scale in tenths instead of facing an all-or-nothing decision — the same granularity argument that makes [forex position sizing](/blog/forex-trading-for-beginners/) workable with mini and micro lots.

## What Stockade's futures symbols can and cannot teach you

Be clear about the boundary. Stockade's /ES, /NQ, /CL, and /GC carry real-world names, but the prices behind them are generated client-side by a random walk — no exchange feed, no market data, no historical archive anywhere in the product. The symbols are labels on synthetic series.

The simulator also does not model futures mechanics. P&L is computed per unit of quantity, exactly as for a stock: no contract multiplier, no initial or maintenance margin, no mark-to-market debit, no margin call, no expiration or roll. Trading 1 unit of /ES there is not trading a contract worth $262,437.50, and nothing on the site will ever demand a wire transfer.

What it is useful for is rehearsing the *process* against futures-shaped price action: setting a stop before entry with the B/S/F shortcuts, doing the multiplier arithmetic on paper alongside an open position, reviewing the results in `/analytics`. And the usual limitation applies hardest here — a simulator removes the emotional weight of real money, and real futures can hand you a loss larger than the margin you posted if the market gaps through your stop overnight.

## Practice futures mechanics on the simulator

Pull up /ES on the simulator and, before placing anything, write down the multiplier, the tick value, and the notional at the current price. Then take a position and translate every move into contract dollars in your head — 2.5 points is $125, ten points is $500 — until the conversion is automatic. Do the same on /CL, where a penny is $10, so the reflex transfers rather than attaching to one symbol. Then run the leverage check: at 20:1, how far can this market move before 40% of a posted deposit is gone?

Start on [Stockade's paper trading simulator](/simulator/) with that arithmetic written down, not estimated.
