---
title: "Paper Trading: How to Practice Without Risking Real Money"
description: "Most paper trading builds nothing. Here is how to structure practice sessions, journal your reasoning, and measure whether you are actually improving."
date: 2026-06-08
author: "Stockade Team"
tags: ["Basics", "Psychology"]
slug: "paper-trading-guide"
---

You have been paper trading for six weeks. The virtual balance is up. And if someone asked what you do better now than in week one, you would not have an answer.

That is the normal outcome, and not because paper trading is useless. Clicking buy and sell repeatedly is not practice, it is repetition — a pianist who plays their favourite piece a hundred times gets a hundred repetitions of the same mistakes. Deliberate practice needs three things repetition alone does not supply: an objective for each session, a record of what you did, and a review that judges the decision rather than the result. (If you are still deciding whether a simulator is worth your time at all, [start here instead](/blog/what-is-a-stock-market-simulator).)

## Why most paper trading produces nothing

The usual pattern: no stated goal, a trade taken because the chart "looked like it was going," sized by feel, held until boredom or panic ends it. Eleven more. Nothing written down. The next session starts from zero.

**No plan means no hypothesis to test.** Without a setup defined beforehand, every trade is a separate experiment with one data point. You cannot learn from a sample of one, twelve times over.

**No record means memory does the accounting**, and memory is a biased narrator. It over-weights the trade that ran, under-weights the four small losses that paid for it, and rewrites your reasoning so whatever happened is what you expected.

**No review means the feedback loop never closes.** Reviewing is both the part that produces improvement and the part everyone skips.

A fourth failure is subtler: unlimited size. Paper trading in $80,000 clips because it costs nothing produces a beautiful equity curve and zero transferable skill.

## How to structure one practice session

**1. Write one objective, in one sentence.** Not "make money." Something you can pass or fail: *"Take only long entries where price pulls back to the EMA 20, and place the stop before the entry."* Two objectives is zero objectives.

**2. Define the setup in advance.** Write the entry conditions as a checklist: trend direction, trigger, stop location, target. If you do not have this yet, that is the subject of [building a trading plan](/blog/how-to-build-a-trading-plan), and it comes first.

**3. Cap the number of trades.** Five setups, not "as many as appear." The cap forces selectivity, which is itself the skill. Burn all five in ten minutes on marginal entries and the session ends — that is the lesson.

**4. Set two stopping rules.** A **loss stop**: down three planned risk units, you are done. A **discipline stop**: two trades that broke the checklist, you are done regardless of P&L. The second matters more, because being up money while ignoring your rules is what gets people hurt later.

**5. Trade the session.** Stockade's live mode ticks every 800ms, fast enough to create real time pressure instead of five minutes of deliberation over a three-second decision. Use the keyboard shortcuts (`B` buy, `S` sell, `F` flatten) — hesitation at the exit is a mechanical problem before it is a psychological one.

**6. Review before you close the tab.** Twenty minutes, worth more than steps one through five combined.

## What to write down for every trade

Stockade's trade journal on `/analytics` records what happened: symbol, side, entry, exit, quantity, P&L, duration, date. That is the objective half. It does not record *why* you entered — no platform can, because the reason lived in your head. Keep a notebook or spreadsheet for the half that teaches you something.

Before every entry, write:

- **The setup name.** Which of your defined patterns is this? If you cannot name it, do not take the trade.
- **The trigger.** The specific thing that just happened that made *now* the moment.
- **The invalidation.** The price at which your idea is wrong, and where the stop therefore sits. That number determines your share count, not the other way round.
- **The reward-to-risk ratio.** Risking $90 to make $180 is 2:1. If you cannot state it before entering, you are not sizing, you are hoping.
- **One line on your state.** "Annoyed about the last loss." "Bored, nothing has set up in forty minutes." Half your worst trades carry the same few phrases here.

After the exit, add one field: **did I follow the plan, yes or no.** That binary is the most valuable column in the record.

Write the reasoning *before* the entry; reasoning reconstructed afterwards is fiction. And Stockade keeps everything in your browser's local storage, so clearing site data wipes the journal — another reason your notes should live somewhere you control.

## Reviewing trades by decision quality, not outcome

Here is the reframe, and it is the hardest one in this discipline.

**A losing trade that followed your plan is a success. A winning trade that broke your plan is a failure.**

Everything in your wiring resists this. You took the setup, sized it correctly, placed the stop where your rules said, and the market went the other way. That is a good trade. Markets are probabilistic; a strategy with a 45% win rate loses more often than it wins and can still be profitable. Punishing yourself for that outcome teaches you to stop taking valid setups — the fastest way to destroy an edge.

The other side is worse. You entered without a setup, held past your stop, and price came back and handed you $400. That is a failure, and the dangerous kind, because it was rewarded: it taught your nervous system that ignoring stops pays.

So the review sorts every trade into four buckets, not two:

<div class="table-wrap">

| | Followed plan | Broke plan |
|---|---|---|
| **Won** | Repeat this | Dangerous — flag it |
| **Lost** | Fine: the cost of doing business | Fix this first |

</div>

Count the boxes weekly. Your compliance rate — trades that followed the plan divided by total trades — is the number that should improve first, and nothing else improves reliably until it does. Most entries in the "broke plan" column are the same few errors repeating, catalogued in [common day trading mistakes](/blog/common-day-trading-mistakes).

## Which numbers show progress and which are noise

Once compliance is above roughly 90%, the performance statistics start to mean something. Before that they measure a strategy you are not actually executing.

Take forty closed trades: 18 wins, 22 losses — **win rate 45%**, average win **$180**, average loss **$90**.

Expectancy per trade is (0.45 × $180) − (0.55 × $90) = $81.00 − $49.50 = **$31.50**, or $1,260 across the forty. Cross-check with profit factor, gross profit over gross loss: 18 × $180 = $3,240 against 22 × $90 = $1,980, so 3,240 ÷ 1,980 = **1.64** — and $3,240 − $1,980 is that same $1,260. Stockade computes win rate, profit factor, average win, average loss and max drawdown for you on `/analytics`; what those figures mean in depth is covered in [analysing your performance metrics](/blog/analyze-trading-performance-metrics).

Now the part nobody wants to hear: **forty trades proves almost nothing.** At a true win rate of 45% over 40 samples the standard error is about 7.9 percentage points, so one standard error either side spans 37% to 53%. At the low end expectancy is (0.37 × $180) − (0.63 × $90) = $66.60 − $56.70 = **$9.90**; at the high end, (0.53 × $180) − (0.47 × $90) = $95.40 − $42.30 = **$53.10**. Same strategy, same forty trades, and the honest range runs from ten dollars a trade to fifty-three.

So treat the equity curve's *shape* as more informative than its endpoint, watch max drawdown as closely as total P&L, and use the time-of-day heatmap for the discovery it reliably delivers: one stretch of the session accounts for a disproportionate share of your losses. That is actionable at small samples in a way win rate is not, because it points at a behaviour rather than a probability.

## Knowing when to move to real money, and how

Two conditions, both required. At least a hundred trades of the same setup with compliance above 90%, and a written plan you have not changed in a month — constant tinkering means you are still searching, not practising.

Then size down brutally. Say you were risking $1,000 per trade on the $100,000 virtual balance. Your real account is $8,000, where a 1% limit puts you at $80. Start at a quarter of that: **$20 per trade**. At the 0.35R expectancy implied above ($31.50 ÷ $90), twenty dollars of risk works out near $7 a trade. The money is deliberately trivial, because you are no longer testing the strategy — you are testing whether you can execute it when the loss is real.

## What paper trading cannot test

Everything above builds competence. None of it builds temperament, and the two are not the same thing.

A $2,400 drawdown in virtual capital is mildly interesting. The same drawdown in money you earned is physical — tightness in the chest, an urge to check the position every ninety seconds, an argument about whether the stop was too tight. Discipline that held for three months on a simulator routinely collapses in the first week of real trading. The rules did not get worse; following them started to cost something, and a simulator cannot charge you that cost, so it cannot learn whether you will pay it.

The mechanics are gentler here too. Stockade models no bid-ask spread and no partial fills, so orders go through in full at a single price. Stop-loss and take-profit exits do carry a little slippage — the position closes at the tick that crossed your level, not at the level itself, and with ticks arriving every 800ms that tick can land slightly past where you placed the stop. But that is a fraction of what a fast real market hands you, and no commissions or financing costs enter the arithmetic, so simulated results run systematically better than the same decisions live.

So read a clean simulator record correctly: it is evidence your process is sound and your mechanics are automatic, not evidence you will hold to them when it matters.

## Practice this on the simulator

Pick one setup and one objective, cap yourself at five trades, and write the reason for each entry before you click. Use `F` to flatten the moment your invalidation prints instead of negotiating with it. Then open `/analytics`, compare the trade journal's actual entries and exits against what your notes said you intended, and count how many followed the plan. Repeat until that compliance number stops moving — then start caring about the equity curve.

[Start on the simulator](/simulator)
