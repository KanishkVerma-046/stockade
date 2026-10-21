---
title: "How to Keep a Trading Journal You Will Actually Use"
description: "A trading journal only helps if you keep it going. A short template, a fixed set of tags, and a weekly review that turns your entries into one rule change."
date: 2026-11-16
author: "Stockade Team"
tags: ["Psychology", "Analytics"]
slug: "trading-journal-guide"
---

The usual trading journal starts out ambitious. There's a column for the setup, the entry reason, the market mood, a screenshot, a confidence score, your sleep, and a paragraph of reflection after every trade. On day one it takes ten minutes per trade and feels like progress. By the second week you're filling it in from memory after the session, and soon after that you aren't filling it in at all.

That journal didn't fail because you're lazy. It failed because it cost more than it returned, and the return never arrived, because nobody had decided what the entries were for. This post is about the system around a journal: a template short enough to fill in every time, tags you can count, and a weekly review that turns a pile of entries into one change.

## What a trading journal is for

A journal has one job: to show you which of your own behaviors cost money, so you can change them one at a time. Everything you write should feed that question. If a field never comes up in a review, it's paperwork.

What to capture for each trade is covered elsewhere, so we won't repeat it. [The paper-trading guide](/blog/paper-trading-guide/) explains what to write before and after every trade and why the reasoning has to come before the entry. [The performance-metrics guide](/blog/analyze-trading-performance-metrics/) explains what Stockade's Analytics records for you and what it can't. Here we're cutting that list down to something you'll keep doing, and building the routine that makes it pay off.

## A minimal template: one line before, one line after

Here's the template we'd start with. Before you enter, fill in one line:

- **Trade number,** so you can match the row to your platform's record later.
- **Setup tag,** from a fixed list (more on that below).
- **Planned entry, stop and target,** as prices.

After you exit, add three things:

- **Result in R.** R is what you planned to risk per share, so for a long trade the result is (exit − entry) ÷ (entry − stop).
- **Rule followed, Y or N.** Did you execute the plan as written?
- **Tags and one line.** Any mistake or context tags, and one sentence on what you'd do differently, if anything.

A filled-in row for a hypothetical trade looks like this:

<div class="table-wrap">

| # | Setup | Entry / stop / target | Exit | R | Rule? | Tags | Line |
|---|---|---|---|---|---|---|---|
| 14 | pullback-ema20 | 40.00 / 39.20 / 41.60 | 41.00 | +1.25R | N | early-exit | Sold at the round number; target was 41.60 |

</div>

The R column is the one that does the work. The trade risked $0.80 a share and made $1.00, so it returned 1.00 ÷ 0.80 = 1.25R. The plan was a 1:2 trade, a 2R target. Writing both down shows how much of each planned winner you actually keep: the gap [the risk-reward guide](/blog/risk-reward-ratio-expectancy/) describes between the ratio you plan and the ratio you get.

Notice what's missing: screenshots, mood scores, long reflections. Add one only when a weekly review asks a question the current fields can't answer.

## Tags you can count

Free-text notes are hard to review. After a month you have fifty sentences that each sound reasonable, and you can't add them up. Tags fix that, as long as they come from a short list you write in advance and don't improvise. We'd use three families:

<div class="table-wrap">

| Family | Examples | Rule |
|---|---|---|
| Setup | pullback-ema20, range-break, none | Exactly one per trade |
| Mistake | early-exit, moved-stop, chased, oversize | As many as apply |
| Context | after-loss, first-trade, last-hour | As many as apply |

</div>

The setup list should match the setups in [your trading plan](/blog/how-to-build-a-trading-plan/). Include "none". Trades taken without a setup are the ones you most need to count, and they disappear if the only option is to leave the field blank.

Keep the mistake list short and specific enough that two people would tag the same trade the same way. "Moved-stop" passes that test. "Bad discipline" doesn't. If you catch yourself inventing a new tag mid-week, write it in the line field instead and decide at the weekly review whether it earns a place on the list.

## The weekly review that ends in one rule change

Once a week, at a fixed time, spend half an hour on four steps:

1. **Group trades by setup tag.** For each setup, count trades and wins and add up the R.
2. **Count every mistake and context tag,** and add up the R on the trades that carry it.
3. **Find the most expensive behavior.** Not the most frustrating trade, the tag with the largest total cost.
4. **Write one rule change** that targets it, and date it.

Here's a hypothetical week of 20 trades:

<div class="table-wrap">

| Setup | Trades | Wins | Net R |
|---|---|---|---|
| pullback-ema20 | 8 | 4 | +2.6R |
| range-break | 6 | 2 | −1.0R |
| none | 6 | 1 | −3.4R |
| **Week** | **20** | **7** | **−1.8R** |

</div>

<div class="table-wrap">

| Tag | Trades tagged | Net R on those trades |
|---|---|---|
| after-loss | 5 | −4.0R |
| moved-stop | 2 | −3.1R |
| early-exit | 4 | +2.8R |

</div>

A trade can carry several tags, so the second table doesn't add up to the week's total. It isn't meant to. It shows where the damage is.

Two readings jump out. The six trades with no setup lost 3.4R, more than the whole week's loss. And the after-loss tag lost 4.0R across five trades. If you check the overlap and find that most of the no-setup trades came straight after a loss, the rule change writes itself: after a losing trade, no new entry until a listed setup appears, and a pause first. [The day-trading mistakes guide](/blog/common-day-trading-mistakes/) has a cooldown rule built for exactly this.

What you should *not* do is drop range-break. Six trades can't tell you whether a setup works; [the sample-size section of the metrics guide](/blog/analyze-trading-performance-metrics/) shows how wide the uncertainty is even at 40. That's the useful split in a weekly review. A behavior rule ("don't trade without a setup") can change after one week, because whether you broke it is a fact, not an estimate. A setup rule needs far more trades before the numbers mean anything, so keep tagging and judge it later.

One change per week, written down with the date. Change three things at once and next week's numbers can't tell you which one helped.

## Matching your notes to Stockade's Journal tab

If you practice on Stockade, the [Analytics page](/analytics/) keeps the objective half for you. Its Journal tab lists every closed trade, newest first, with Symbol, Side, Entry, Exit, Qty, P&L, Duration and Date. It has no notes field, so your template lives in a spreadsheet or notebook beside it.

A few details make the matching easier. The Date column shows the day the trade closed, with no time, so several trades on one day share a date. Match them by symbol, side and entry and exit price instead, and keep your own trade numbers in the same order. There's no export, so copy the figures you need into your sheet at the end of each session. And the Clear button on the simulator's Trade History panel deletes the stored trades, which empties the Journal along with the trade statistics, so don't press it until your sheet is up to date.

## Keeping the journal going past week two

The template only works if it survives contact with a bad week. A few rules help:

- **Fill in the plan line before you click.** If you can't name the setup and the three prices, that's your answer about the trade.
- **Fill in the result before the next trade,** not hours later. It takes a few seconds while the trade is fresh.
- **Don't reconstruct missing rows from memory.** If a session went unlogged, note the gap and the session's P&L from the platform, and leave it at that. Reasons written afterwards are guesses.
- **Leave the template alone for a month.** Changing the fields every week makes weeks impossible to compare.
- **Keep the review appointment** even when the week was good. Good weeks can hide rule breaks that happened to pay, which the paper-trading guide argues are the most dangerous kind.

The R column also gives you the inputs for [the drawdown guide's](/blog/drawdown-recovery-math/) planning. Count your longest run of losing trades each month and compare it with the streak your risk per trade was built to survive.

## What a journal can't tell you

A journal is a record you write about yourself, so it has the weaknesses of one. You grade your own trades, and it's tempting to mark a borderline rule break as a Y. Decide Y or N against the written rule, not against how the trade turned out.

It also can't make a small sample big. A month of entries is enough to catch repeated behavior, and nowhere near enough to prove a setup has an edge. And a journal kept with virtual money records how you trade when losing costs nothing. Real money can add rule breaks that never showed up on the simulator.

## Practice this on the simulator

Set up the template in a spreadsheet, write your setup and mistake tag lists, and take 20 trades on the [simulator](/simulator/), filling in the plan line before each entry and the result before the next. At the end of the week, match the rows to the Journal tab on Analytics, run the four-step review, and write down one rule change for the following week. Stockade's prices are generated in your browser, so the setup statistics won't carry over to a real market. The routine will: plan line, result, tags, review, one change.
