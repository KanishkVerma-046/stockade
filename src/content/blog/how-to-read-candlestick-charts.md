---
title: "How to Read Candlestick Charts: A Beginner's Complete Guide"
description: "Every candle packs four prices into one shape. Learn what the body and wicks encode, the patterns worth knowing, and why context beats pattern spotting."
date: 2026-03-30
author: "Stockade Team"
tags: ["Basics", "Technical Analysis"]
slug: "how-to-read-candlestick-charts"
---

You open a chart and it is a wall of red and green rectangles with hairs sticking out of the top and bottom. Somebody tells you the long-legged one near the bottom is a hammer, and that it means sellers are exhausted. You buy it. Price keeps falling. The problem was never that you misidentified the shape — it was that nobody explained what the shape is made of, or what it can honestly tell you.

A candlestick is not a symbol you memorize. It is a compressed record of an argument between buyers and sellers over a fixed slice of time, and once you can decompress it, the names stop mattering nearly as much.

## The four prices every candle encodes

Pick a timeframe — say five minutes. Every candle on a five-minute chart summarizes exactly one five-minute window with four numbers, always the same four:

- **Open** — the first traded price of the window.
- **High** — the highest price reached during it.
- **Low** — the lowest price reached during it.
- **Close** — the last traded price before the window ended.

These are the OHLC values, and the candle draws them geometrically. The **body** is the rectangle between the open and the close. If the close is above the open, the body is drawn green (or hollow) and the candle is bullish for that window. If the close is below the open, it is red (or filled) and the candle is bearish. The **wicks** — also called shadows or tails — are the thin lines running from the body up to the high and down to the low.

So the body tells you where the window *finished* relative to where it *started*. The wicks tell you where price *went* and got rejected. That second part is where most of the information lives, and it is the part beginners ignore.

## Reading a single candle: a worked example

Take one candle. It opens at 187.42, runs up to 189.10, drops all the way to 186.90, and closes at 187.05.

<div class="table-wrap">

| Component | Calculation | Value | Share of range |
|---|---|---|---|
| Full range | 189.10 − 186.90 | 2.20 | 100% |
| Body (open → close) | 187.42 − 187.05 | 0.37 | 17% |
| Upper wick | 189.10 − 187.42 | 1.68 | 76% |
| Lower wick | 187.05 − 186.90 | 0.15 | 7% |

</div>

The close is 0.37 below the open, so this is a red candle — but only barely. On a 187.42 open, a 0.37 decline is 0.20%. If you only looked at the closing price you would call this window flat and move on.

The shape says something much louder. Buyers pushed price 1.68 higher — a 0.90% advance — then gave back every cent of it and a little more. Three quarters of everything that happened in this window happened *above* where the candle finished. Somebody was willing to sell into that rally, and by the close the buyers who chased it were all underwater.

That is the whole skill: read the candle as a sequence of events, not as a picture. The 0.37 body is the least interesting number in the set.

## What one candle can and cannot tell you

It can tell you the balance of pressure inside one window and where price was rejected. It cannot tell you what happens next.

It also cannot tell you the *order* of events. Our example candle is consistent with "rallied to 189.10 first, then collapsed to 186.90" and equally consistent with "dropped to 186.90 first, then spiked to 189.10 and faded." Same four numbers, same drawing, two very different stories. Drop to a shorter timeframe and the ambiguity resolves — but on the candle in front of you, it does not.

And a candle only means something relative to its neighbours. A 2.20 range is enormous on an instrument that normally moves 0.40 in five minutes and unremarkable on one that normally moves 3.00.

## Single-candle patterns worth knowing

Four shapes cover most of what a single candle can express.

### Doji — the standoff

The open and close are nearly identical, so the body is a thin line. Example: opens 42.18, closes 42.21, with a high of 42.66 and a low of 41.79. The body is 0.03 against a range of 0.87 — under 4%. Price travelled a full 2% of its value and came back to almost exactly where it started. Buyers and sellers fought to a draw. After a long trend, that stall is worth noticing. In the middle of a quiet chop, it is noise.

### Hammer — rejection from below

Small body near the top of the range, long lower wick, little or no upper wick. Example: opens 64.30, falls to 61.90, recovers, closes 64.10, high 64.55. The lower wick is 2.20 out of a 2.65 range — 83% of everything that happened was below the body, and price refused to stay there. Sellers drove it down and were overwhelmed. The identical shape appearing after an *uptrend* is called a hanging man, and it is read bearishly. Same geometry, opposite implication, decided entirely by what came before.

### Shooting star — rejection from above

The hammer flipped: small body near the low, long upper wick. Our 187.42 example from earlier is close to this shape. Buyers pushed, failed, and the candle closed near where it opened or below.

### Marubozu — one side ran the whole window

Almost no wicks at all. Example: opens 23.10, closes 23.95, high 23.98, low 23.08. The body is 0.85 of a 0.90 range — 94%. Price opened, went one direction for a 3.7% gain, and never gave anything back. That is one-sided conviction, and the cleanest single-candle signal there is.

## Two- and three-candle patterns

Multi-candle patterns are stronger because they show a *change* in the balance, not just its state.

**Bullish engulfing.** A down candle opens 51.40 and closes 50.85 (a 0.55 body). The next candle opens lower at 50.72 and closes at 51.63 — a 0.91 body that completely covers the previous body, 1.65× its size. Sellers had control, then buyers took it and finished above where the selling began. The bearish version mirrors it exactly.

**Harami.** The reverse arrangement: a large candle followed by a small one entirely inside its body. A green candle runs 128.40 to 132.10 (3.70 body); the next opens 131.20 and closes 130.05 — a 1.15 body, 31% of the first, sitting wholly within it. That is not a reversal, it is a *pause*. Momentum stopped. What follows is undecided.

**Morning star.** Three candles. First, a decisive red one: opens 78.90, closes 75.60. Second, a small indecisive candle near the lows — opens 75.20, closes 75.35, a 0.15 body. Third, a green candle that opens 75.55 and closes 77.80. The midpoint of the first candle's body is 77.25, and the third close pushes above it, recovering 2.20 of the original 3.30 decline — about two thirds. Sell-off, stall, recovery. The **evening star** is the same three-beat structure at a top.

## Why location matters more than the pattern

Here is the part that separates people who read charts from people who spot shapes: an identical candle means different things at different prices.

A hammer that forms right on a level price has bounced from three times before is a rejection at a place other traders are watching. The same hammer in the middle of nowhere is one candle where somebody bought a dip. The pattern did not change; the location did. This is why [support and resistance levels](/blog/support-and-resistance-levels) are worth learning before you memorize a single pattern name.

The other two pieces of context worth checking:

- **Volume.** An engulfing candle on triple the recent average volume means real participation stepped in. The same shape on thin volume means very little happened. [Trading volume](/blog/understanding-trading-volume) is the sanity check on every pattern you find.
- **Trend.** Reversal patterns need something to reverse. A morning star after a three-day slide is a signal; a morning star in a sideways range is decoration. A [moving average](/blog/moving-averages-ema-vs-sma) gives you a fast, objective read on which regime you are in.

Confluence is the word for what you are looking for: pattern, location, and participation all pointing the same way. When only one of the three is present, you have a shape, not a setup.

## The honest limits of candlestick patterns

Candlestick patterns have modest predictive power on their own. When researchers test them systematically across large samples, hit rates land close enough to chance that the pattern alone is not an edge — and any edge that does show up tends to shrink once you subtract spread, commission, and slippage.

They fail constantly. A textbook bullish engulfing at obvious support resolves downward often enough that if you cannot survive a run of them going wrong, you should not be trading them. Patterns are also backward-looking by construction: they describe an argument that already concluded. Nothing about the drawing knows what the next candle does.

What they are genuinely good for is *framing*. A hammer at support gives you a defined structure — an invalidation point just below the wick's low, a reason to be interested, and a place to be wrong quickly. That is worth a great deal, and it is a different thing from prediction.

## Practice reading candles one at a time

The fastest way to internalize this is to meet candles one at a time instead of studying a chart that has already finished. Stockade's [chart simulator](/chart-simulator) steps through a generated session candle by candle at whatever pace you choose, which lets you stop before the next bar appears, say out loud what you expect it to be, and then advance one step to find out. Guessing before the reveal is the part that trains you; scrolling a completed chart never does. Every price on Stockade is generated algorithmically — it is not real or exchange-sourced data — but the OHLC structure, the wicks, and the volume behave the way real chart structure behaves, which is exactly what you need to train your eye. If you want to watch a bar build rather than arrive, [Stockade's stock market simulator](/simulator) ticks continuously, so the newest candle stretches and repaints in front of you until its window closes. Either way, work one instrument, name every candle for ten minutes, and notice how often the shape you were sure about resolved the other way.
