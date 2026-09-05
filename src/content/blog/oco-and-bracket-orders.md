---
title: "What Are OCO and Bracket Orders and How Do They Work"
description: "How OCO and bracket orders link a stop and a target so that filling one cancels the other, plus the quantity mistakes beginners make."
date: 2026-05-25
author: "Stockade Team"
tags: ["Order Types"]
slug: "oco-and-bracket-orders"
---

You buy 500 shares. Price moves up a little, then down a little, then up again. Now you are deciding in real time, with money on the line, whether this is the top or the start of something — and the version of you making that call is not the calm version who found the setup.

OCO and bracket orders exist to take that decision away from you. Not to make it better, to make it *earlier*. This article is about the mechanics: what links to what, what cancels what, what happens to quantities, and the specific ways the setup breaks.

## What an OCO order is: two resting orders where filling one kills the other

OCO stands for **one-cancels-other**. It is not a new kind of order. It is a *link* placed between two ordinary orders you already understand.

You submit two orders at the same time. Both sit at the broker, unfilled, waiting. The moment one of them fills, the broker automatically cancels the other. You never end up with both.

That last sentence is the entire feature. Without the link you have two live orders, and if price runs through both levels you get two fills — which for a single position means you exit once and then accidentally enter a brand-new position going the other way. The OCO link is what makes "either/or" mean either/or.

The most common OCO pair is a stop below your position and a limit above it: a **stop order** that turns into a sell if price falls to your loss cap, and a **limit order** that sells if price rises to your profit target. Price can only reach one of them first. Whichever gets there wins, the position closes, and the survivor is cancelled.

For the logic of *where* the stop belongs — structure, volatility, why a round number is a bad choice — see [stop-loss orders explained](/blog/stop-loss-orders-explained/). This article assumes you already picked the levels and cares only about how they are wired together.

## What a bracket order adds: an entry with the exit pair attached

A **bracket order** is three orders submitted as one package:

1. An **entry** order (market or limit) that opens the position.
2. A **protective stop** that closes it at a loss.
3. A **profit target** that closes it at a gain.

Orders 2 and 3 are an OCO pair with each other. They are also *conditional on order 1* — they do not go live until the entry actually fills. Submit a bracket with a limit entry that never fills and nothing happens at all; the stop and target sit dormant and eventually expire with the entry.

So the sequence is: entry fills → stop and target both activate → one of them fills → the other is cancelled → you are flat. Three orders, one round trip, zero decisions after the first click.

The word "bracket" is literal. Your entry price sits inside a bracket, with a floor beneath it and a ceiling above it, and the trade is over the moment it touches either one.

## A worked bracket: 500 shares long at 187.40

Suppose you go long 500 shares at 187.40, stop at 185.90, target at 190.40.

<div class="table-wrap">

| Leg | Price | Distance from entry | Per-share | Total on 500 shares |
|---|---|---|---|---|
| Entry (buy) | 187.40 | — | — | $93,700 position value |
| Stop (sell) | 185.90 | 1.50 below | −1.50 | −$750 |
| Target (sell) | 190.40 | 3.00 above | +3.00 | +$1,500 |

</div>

Check the arithmetic. Risk per share is 187.40 − 185.90 = 1.50, so 500 × 1.50 = **$750 at risk**. Reward per share is 190.40 − 187.40 = 3.00, so 500 × 3.00 = **$1,500 targeted**. Reward divided by risk is 3.00 ÷ 1.50 = 2, a **2:1 reward-to-risk ratio**.

**That ratio is fixed the instant you submit the bracket.** You do not discover your reward-to-risk afterward by looking at the result — you chose it when you typed three numbers into a box.

**And a 2:1 bracket needs a win rate above 33.3% just to break even.** Ten trades at this size: four winners produce 4 × $1,500 = $6,000, six losers produce 6 × $750 = $4,500, net +$1,500 at a 40% win rate. Drop to three winners and it is $4,500 won against $5,250 lost — negative at 30%. The ratio does not make you profitable; it sets the bar you still have to clear.

On a $100,000 account, that $750 is 0.75% of equity — inside the common 1% ceiling described in [position sizing and the 1% rule](/blog/risk-management-position-sizing/). Note that the position is worth $93,700, roughly 94% of the account, while the amount genuinely at risk is $750. Position size and risk size are different numbers, and the stop is what separates them.

## Why placing the bracket before entry is the whole psychological point

Here is the part that matters more than any of the mechanics.

When you attach the stop and target *before* the entry fills, you make the exit decision at the only moment you have no position, no unrealized P&L, and no ego in the trade. You are looking at a chart and asking "where would I be wrong, and where would I take the money?" Those are analytical questions.

Once the position exists, the same two questions turn emotional. "Where would I be wrong" becomes "how much further can I stand to watch this drop." "Where would I take the money" becomes "what if it keeps going." Traders who set exits after entering routinely widen the stop, because widening it makes the current pain go away, and tighten the target, because banking something small feels safer than waiting.

A bracket does not make you disciplined. It moves the decision to the moment when discipline is cheap. Be honest with yourself, though: nothing stops you from cancelling and re-entering the orders mid-trade, and beginners do exactly that.

## Bracket mistakes beginners make

### Quantity mismatch after a partial fill

You submit a bracket for 500 shares. In a real market, only 300 fill before price moves away. Your stop and target, if they were sized to 500, now cover 200 shares you do not own.

If the stop then triggers, a 500-share sell against a 300-share long closes your position *and opens a 200-share short* — a position you never intended, now unprotected, because the bracket already did its job and cancelled the target. Some brokers auto-adjust bracket quantities to the filled amount; some do not. You need to know which kind you are using before it matters, not after.

### Forgetting the orders outlive your screen

Resting orders live at the broker, not in your browser. Close the platform, shut the laptop, go to bed — the stop and the target are still working. That is the point, but it also means a bracket you set up and forgot is a live instruction that can fill while you are asleep or in a meeting. Every unmanaged bracket is a decision your past self made on your behalf.

### Brackets on both sides of a range

A common setup: price is stuck between two levels, so you place a buy-stop bracket above resistance and a sell-stop bracket below support, planning to catch whichever way it breaks.

The trap is that those two *entries* are not linked to each other unless you explicitly make them an OCO pair. If they are unlinked and price pokes above resistance, fills your long, reverses, then breaks below support, you get filled on the short too — flipped from long to short at the worst point in the whipsaw. Link the entries as an OCO and the downside entry dies the moment the upside one fills.

## What a bracket order cannot do

A bracket is a machine, and machines do not read charts.

**It cannot adapt to new information.** If the setup changes shape — the move stalls, the volume dries up, the level you were trading against stops holding — your bracket does not care. It sits at the two prices you picked twenty minutes ago and waits.

**A mechanical target can sit somewhere the chart never justified.** Set every target at exactly 2R because 2R sounds professional and you will sometimes park a limit order in dead space just past an obvious resistance shelf, then watch price turn 20 cents short of it. The ratio should be an output of where the sensible exit levels are, not an input the chart is forced to accommodate. A 2:1 bracket is only good if the market plausibly offers that 3.00 of upside before the 1.50 of downside.

**And it does not guarantee the price you typed.** In real markets a stop becomes a market order when triggered, and market orders fill at whatever is available, which can be worse than your stop level — see [market orders vs limit orders](/blog/market-orders-vs-limit-orders/) for why that distinction bites. Your $750 risk is an estimate, not a guarantee.

## Practice this on the simulator

Stockade's `/simulator` order panel has optional **Stop Loss** and **Take Profit** fields sitting right under quantity, and they behave as an OCO pair: whichever level the simulated price reaches first closes your entire position and clears both fields at once. Fill in all three numbers before you press B, then deliberately do not touch the panel again and watch which side gets hit.

One honest caveat, because it changes what you can learn here. Stockade's fills carry far less friction than real ones — no bid-ask spread, no partial fills — but they are not literally frictionless. The simulator checks your levels against a new price every 800 milliseconds, and books the exit at the tick that *crossed* the level rather than at the level itself, so a stop or target lands a few cents past where you set it. The absence of partial fills is the part that matters here: it means the quantity-mismatch problem described above **cannot happen on the simulator**, so it is the one bracket failure mode you have to learn about rather than experience. Everything else — pre-committing to a ratio, resisting the urge to widen the stop, discovering how often a 2:1 target misses by a few cents — is fully available.

Run twenty bracketed trades where you set the levels first and never adjust them, then check your realized results in [Stockade's paper trading simulator](/simulator/) and see what your actual win rate would need to be.
