---
title: "How to Build a Trading Plan: Step-by-Step for Beginners"
description: "A trading plan is a document, not an intention. Every section it needs, a fully worked setup example, and the rule for when you may change it."
date: 2026-06-15
author: "Stockade Team"
tags: ["Strategy", "Risk Management"]
slug: "how-to-build-a-trading-plan"
---

You already know your rules. You could recite them right now: cut losses quickly, let winners run, do not chase. Then a position goes against you, and the rule quietly becomes "cut losses quickly, unless it is about to come back, which it usually does." Nothing felt like a violation, because there was nothing to violate. The rule lived in your head, and your head rewrote it while you were busy losing money.

That is the whole case for writing a plan down: not discipline as a personality trait, but a document with named sections, open beside your chart, saying what you decided when you were calm and had nothing at stake.

## Why an unwritten plan is not a plan

An unwritten plan is a set of intentions, and intentions reshape themselves under pressure. In a losing trade your brain is solving a different problem than it was ten minutes ago — making the discomfort stop — and the fastest route there is to decide the rule was never quite what you thought.

A written plan removes that negotiation. Either the condition on the page was met or it was not. You may still break the rule, but now you know you broke it, and it lands in your journal as a violation instead of dissolving into "I read the setup differently that time."

It is also **falsifiable**. After forty trades you can ask whether those exact conditions produced anything. An unwritten plan can never be tested, because it was never the same plan twice.

## The nine sections your plan document needs

Open a text file or a notebook page and write these headings. The whole thing should fit on one or two pages — a plan you will not read is decoration.

```
TRADING PLAN — v1 — started [date]

1. MARKET & TIMEFRAME    Which instruments, which chart, which hours.
2. SETUP DEFINITION      The exact conditions that must all be true.
3. ENTRY TRIGGER         The single event that puts me in.
4. STOP PLACEMENT        Where I am wrong, decided before entry.
5. TARGET & EXIT         Where I take profit, and any partial-exit rule.
6. RISK PER TRADE        Percentage of account, and the resulting size.
7. DAILY LOSS LIMIT      The number that ends my session.
8. PRE-TRADE CHECKLIST   Five or six yes/no questions.
9. REVIEW & REVISION     When I review, and when I may change this page.
```

Each section forces a decision you would otherwise make in the moment. Work through them in order.

## Narrowing your market and timeframe beats covering everything

Beginners watch everything, on the theory that more instruments means more opportunities. In practice it means shallower judgements and no feel for how anything behaves. Pick **one or two instruments and one chart timeframe** and write them down. If you have a day job that choice is largely made for you — a 5-minute chart you cannot watch is not a real option. Intraday versus multi-day holding is the biggest fork in the document; [day trading vs swing trading](/blog/day-trading-vs-swing-trading) covers the constraints that decide it. Then write your session hours: "I trade between 09:45 and 11:30 and open nothing new after that" is checkable, and "I trade when there is opportunity" is not.

## Writing a setup definition a stranger could check

This is the section beginners skip, and the one that makes the rest of the plan possible. The test: **could a stranger read your definition, look at a chart, and say whether the setup is present — without asking a single follow-up question?**

"Buy the dip in an uptrend" fails badly. What is a dip? How deep? Two people would mark the same chart differently, and so would you on two different days. Here is the same idea written so it can be checked.

**Setup: 5-minute EMA-9 pullback continuation.** All six conditions must be true.

1. On the 5-minute chart, EMA 9 is above EMA 20, EMA 20 is above EMA 50, and all three have been rising for at least the last 12 candles.
2. Price has printed a higher high within the last 10 candles.
3. Price pulls back and touches or dips below EMA 9, but no candle in the pullback **closes** below EMA 20.
4. The pullback is 3 candles or fewer.
5. Each pullback candle's volume is lower than the volume of the impulse candle that made the high.
6. The clock reads between 10:00 and 15:00.

Every one of those is a yes or a no. Condition 3 ends the argument about whether a pullback has "gone too far" — the close below EMA 20 decides it, not your mood. Note too that EMAs lag by construction: they describe what already happened, so this defines a condition that has formed, not a prediction. You are not claiming the setup works, only that it is defined well enough to find out.

## Entry, stop, and target are three separate decisions

Made together in the moment, these collapse into one feeling: "this looks good." Made separately and in advance, they interrogate each other — and often the answer is that the trade is not worth taking.

**Entry trigger.** One event, not a zone: *buy stop 0.02 above the high of the first 5-minute candle that closes back above EMA 9 after the pullback. If it does not trigger within 3 candles, cancel.* Without that cancellation clause you have a resting order attached to a setup that already expired.

**Stop placement.** A chart location, not a dollar amount: *0.02 below the lowest low of the pullback.* Then a veto: *if that stop is more than 0.60 from entry, skip the trade.* A stop belongs where the setup is proven wrong; if that spot is too far to size sensibly, pass rather than move the stop somewhere convenient.

**Target and exit.** *Take profit at twice the risk distance. Exit at the close of the 15:00 candle regardless.* The time-based exit prevents the slow bleed of a position you hold because you cannot decide.

One instance: entry fills at 48.32, the pullback low was 47.86, so the stop sits at 47.84. Risk per share is 48.32 − 47.84 = **0.48**, and the target is 48.32 + (2 × 0.48) = **49.28**. Every number existed before you clicked buy, and all three can go in together as a bracket.

## Risk per trade and the daily loss limit that ends your session

Section 6 converts risk into share count. On a $25,000 account risking 1% — $250 — at 0.48 per share, that is 250 ÷ 0.48 = **520 shares**. Note that 520 shares at 48.32 is $25,126 of exposure from a $250 risk decision; a small risk figure can imply a large position, which is why the arithmetic gets its own treatment in [position sizing and the 1% rule](/blog/risk-management-position-sizing). Your plan needs the percentage and the formula on the page, not a number you re-derive under pressure.

Section 7 is the one most beginners omit and most need. **Write a daily loss limit and what happens when you hit it.** Here, three full losses is $750, or 3% — so: *at −$750 on the day, I close the platform.* Not "I trade smaller." Closed. It caps the damage from the exact state in which you make your worst decisions, which is immediately after losing.

## The pre-trade checklist and the daily and weekly reviews

The checklist is your plan compressed into something you can run in twenty seconds before every entry:

- Are all six setup conditions true right now?
- Is my stop identified, and within 0.60?
- Did I derive share count from the stop rather than from habit?
- Is my target set at 2R?
- Am I inside session hours and under my daily loss limit?
- Am I taking this because it meets the plan, or because I want to be in a trade?

Then two reviews. The **daily review** takes ten minutes after the session: for each trade, was it in the plan, and did you execute it as written? Score adherence separately from profit and loss — a winner taken outside the plan is a worse outcome than a loser taken inside it, because it teaches the wrong lesson and will be repeated.

The **weekly review** looks at aggregates: setups taken, setups skipped, adherence rate, and the performance numbers covered in [analyzing your trading metrics](/blog/analyze-trading-performance-metrics). This is where you notice that losses concentrate at one hour, or that off-plan trades account for most of your drawdown.

## When you are allowed to change the plan, and when you are not

One rule, and it is worth putting in bold on the page: **the plan may only be revised at a scheduled review, after a meaningful sample of trades — never mid-session, and never immediately after a loss.**

Changing the plan mid-session feels like adaptability. It is rationalization wearing a plan's clothes. The stop you widen at 10:40 because "conditions changed" is the stop you would have widened for any reason at all; you found the reason afterwards. Whatever a losing trade taught you will still be true on Sunday.

"Meaningful sample" means enough trades that a change answers a pattern rather than noise — thirty or forty is a floor, and even that is small. When you revise, change **one thing**, bump the version number, and date it. Alter three rules at once and you will never know which mattered.

Expect your first several plans to be wrong. That is the process working: version 1 exists to be proven inadequate by evidence, which an unwritten plan can never be. The traders who improve are not the ones who guessed right on the first draft — they are the ones whose draft was specific enough to be shown wrong.

And be clear about what the document buys you. A plan does not make you profitable; no arrangement of rules manufactures an edge. It makes you **consistent**, which is the only condition under which you can find out whether your edge exists at all. Forty trades executed the same way produce a result you can interpret. Forty executed forty different ways produce a story.

## Practice this on the simulator

Write your nine sections, then take twenty trades on [the simulator](/simulator) doing nothing but running the checklist — the $100,000 virtual balance and the B / S / F shortcuts make entering trivial, which is exactly why the checklist must be deliberate. Two of the six conditions will not survive the trip, so decide in advance how you will handle them. Condition 5 reads volume, and Stockade draws volume as a random number per candle — checking it there is reading noise. Condition 6 reads a session clock the simulator does not have: it runs continuously, closing a live candle every ten seconds, with no open, no close and no 10:00, which also makes the session-hours line in section 1 and the corresponding checklist question inert. Treat both as automatically satisfied and accept that the drill exercises the other four conditions; all six stay in the document, because all six are correct for the real market you are writing this for. Then use `/analytics` to compare trades that met your setup definition against ones you talked yourself into. Two caveats on the result: Stockade's prices come from a client-side random walk, not any market, so a setup that "works" here says your execution was consistent and nothing about the edge — and virtual capital removes the emotional weight that made you rewrite the rule in the first place. Rehearsing the process still helps, as [paper trading deliberately](/blog/paper-trading-guide) explains; just never mistake a simulated result for a validated plan.
