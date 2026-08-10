---
title: "Market Orders vs Limit Orders: When to Use Each"
description: "A market order guarantees execution but not price. A limit order guarantees price but not execution. Every other consideration flows from that."
date: 2026-05-11
author: "Stockade Team"
tags: ["Order Types", "Basics"]
slug: "market-orders-vs-limit-orders"
---

You did the work. You had the whole trade mapped: enter at 24.80, stop at 24.40, target at 25.60. Forty cents of risk for eighty cents of reward — a 2:1 trade. Then you clicked market buy on 400 shares of a thinly traded name, and the confirmation came back at **25.20**.

Nothing about the chart changed in that second. Your trade changed completely. From 25.20 your stop is 80 cents away and your target is 40 cents away: you are risking 80 to make 40, the exact inverse of the trade you planned, and the 40-cent difference cost $160 on 400 shares before the position was a second old.

That single click is the difference between the two order types every platform puts in front of you.

## Stockade cannot reproduce the problem this article describes

This belongs up front, not in a footnote.

Stockade's fills carry almost no friction. There is no bid-ask spread, no partial fill, and no order book in the simulator. A market order fills at exactly the price on screen. A limit order fills immediately at whatever price you type into the box — it does not wait for the market to reach your level, it does not queue, and it never goes unfilled. The one exception is a stop-loss or take-profit exit: those are checked against a new price every 800 milliseconds and booked at the tick that crossed your level, so they fill slightly past it rather than on it. All prices on Stockade are generated in your browser, so there is no venue and no counterparty to negotiate with.

You can still practice the **mechanics**: choosing an order type before you click, deciding a limit price in advance instead of improvising, attaching a stop-loss and take-profit to an entry. Those habits transfer.

The **cost** does not. If you paper trade a strategy that clears 8 cents a share and it looks profitable here, that same strategy can be flat or negative once a real 4-cent spread and occasional slippage take their cut. Never read a simulated fill as a forecast of a real one.

## What each order type actually instructs your broker to do

Each order is one sentence of instruction.

A **market order** says: *fill this immediately at the best price currently available, whatever that turns out to be.* You specified quantity and direction. You did not specify price, and you gave up any claim to one.

A **limit order** says: *fill this only at my price or better, and if you cannot, do not fill it.* "Or better" means lower for a buy and higher for a sell — a buy limit at 187.30 will happily fill at 187.25, never at 187.35. You specified price. You did not specify that anything will happen at all.

<div class="table-wrap">

| | Market order | Limit order |
|---|---|---|
| Guarantees | Execution | Price |
| Does not guarantee | Price | Execution |
| Typical use | Getting out, urgency | Getting in, patience |
| Risk you accept | Paying more than you saw | Missing the trade entirely |

</div>

## The trade-off everything else flows from

Here is the sentence to memorize: **a market order guarantees execution but not price; a limit order guarantees price but not execution.**

Every other consideration below is a consequence of that one line. Market order to exit a loser? Yes — you care more about being out than about the last few cents, and execution is what a market order guarantees. Limit order to enter a wide-spread instrument? Yes — price is what is at risk there.

When you are unsure, ask which failure you would rather live with: filling at a worse price than you wanted, or not filling at all. The answer names your order type.

## The bid-ask spread, and why a market order costs you on entry

There is never one price. There are always two. The **bid** is the highest price someone is currently willing to pay; the **ask** is the lowest price someone is currently willing to sell at. Say the bid is 187.38 and the ask is 187.42. The **spread** is 187.42 − 187.38 = **0.04**, and the **midpoint** — the fairest single number to call "the price" — is 187.40.

Buy 500 shares at market. A buy takes the ask, so you pay 187.42 × 500 = **$93,710**. At the midpoint you would have paid 187.40 × 500 = $93,700. You are $10 behind the instant you fill, with price unmoved.

That is half the story, because you have to get out too. Selling at market hits the bid at 187.38, so a round trip — buy the ask, sell the bid, market perfectly unchanged — costs the full spread: 0.04 × 500 = **$20**.

Twenty dollars on a $93,700 position is about 2 basis points and sounds trivial. It is not, once you multiply. Three round trips a day for 250 trading days is 750 round trips; at $20 each that is **$15,000** a year in spread alone, before commissions and before a single losing trade.

It is worse on illiquid instruments. If a thin name shows a bid of 42.10 and an ask of 42.35, the spread is 0.25 — on a 42.225 midpoint that is 0.59%, roughly 28 times the relative cost above. A 200-share round trip there costs 0.25 × 200 = $50, and the stock has to move a quarter of a point your way before you are back to even.

## Slippage, and the conditions that make it worse

Slippage is the gap between the price you saw when you clicked and the price you got. The spread is the predictable part; slippage is the rest. It gets worse under three conditions, which often arrive together:

- **Fast markets.** During an earnings release or an economic print, quotes update faster than your click travels. The ask you aimed at may not exist by the time your order arrives.
- **Thin order books.** A quote shows a price, but only for a certain size. If only 200 shares are offered at 42.35 and you buy 1,000, the other 800 fill against whatever sits above — 42.40, 42.55, and so on. Your average fill is worse than the ask you saw.
- **Large size.** Your own order is the thing moving the price. Same mechanism as a thin book, arriving from the other direction.

The opening example was all three at once: a thin book, a size that consumed it, and a moving quote. A limit order would have refused that fill.

## Marketable limit orders: the practical middle ground

You are not stuck choosing between "any price" and "my price or nothing." A limit order priced where the market can already reach it is called a **marketable limit order**, and it is what experienced traders use most of the time.

With the bid at 187.38 and the ask at 187.42, place a buy limit at **187.45**. Because it sits above the current ask, it executes right away like a market order — but it refuses to fill above 187.45. If the book is thin and price runs, your worst case is capped instead of unbounded. Against the 187.40 midpoint that worst case costs 0.05 × 500 = **$25**, versus $10 at the ask, versus the $200 a 40-cent slip would have taken.

You trade a small amount of fill certainty for a hard ceiling on disaster. That is usually the right trade.

## When a market order is genuinely the right choice

There is one situation where a market order is not just acceptable but correct: **getting out of a position that is going against you.**

If your stop level is breached and you need to be flat, execution certainty is the whole point. A limit exit at your ideal price can sit unfilled while the loss widens, and a small loss that does not fill becomes a large loss that eventually does. The alternative to paying a few extra cents is not "a better fill," it is "still holding." That is why [stop-loss orders](/blog/stop-loss-orders-explained) typically trigger a market order once the stop price trades.

The same logic covers any real urgency: closing before a scheduled announcement, exiting when your thesis has broken, flattening at the end of your session. When you must be out, be out.

## When a limit order is the right choice

Almost everywhere else.

**Entries.** Nothing forces you into a trade. If your plan says 24.80, place a limit at 24.80 and let the market come to you. An entry you chase has already moved against your plan.

**Illiquid instruments.** Where the spread is 0.25 rather than 0.04, a market order hands over real money on both sides of the trade.

**Patient scaling.** If you want 900 shares, stack limits at three levels — 300 at 24.80, 300 at 24.65, 300 at 24.50 — and accept that you may only get part of it. That interacts directly with your [position sizing](/blog/risk-management-position-sizing): a partly filled entry is a smaller position, and your risk calculation should reflect the size you actually got.

**Exits at a target.** A profit target is not urgent by definition, so a limit at your price is exactly right. Pairing a limit take-profit with a stop-loss exit is the structure behind [OCO and bracket orders](/blog/oco-and-bracket-orders).

## The limit order that never fills has its own cost

A limit order that misses is not free, and beginners systematically undercount this.

Return to the 187.38 / 187.42 quote. The ask looks rich, so you place a buy limit at 187.30 — twelve cents below the ask, worth 0.12 × 500 = $60 if it fills. It does not fill. Price never trades down to your level and runs to 191.00. The move you correctly identified was 191.00 − 187.42 = 3.58 per share, or **$1,790** on 500 shares. You protected $60 and forfeited $1,790.

That is not an argument against limit orders. It is an argument against pricing them greedily. Set the limit where you actually want the trade, not a few cents better to feel clever. A missed winner leaves no record in your trade log, which is exactly why it is so easy to ignore.

## Practice the decision on the simulator

Stockade's fills are perfect, so you cannot practice paying a spread there — but you can practice the decision that determines whether you pay one. Open [the simulator](/simulator), switch the order ticket from market to limit before every entry, and write down the limit price you would use against a real book. Then reserve market orders for flattening — the F key exists for exactly that. Carry that reflex to a real platform and the spread will be the only new thing to learn.
