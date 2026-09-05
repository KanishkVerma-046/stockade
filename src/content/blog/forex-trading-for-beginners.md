---
title: "Introduction to Forex Trading: Currency Pairs and Pips Explained"
description: "A currency pair means being long one currency and short another. How to read a quote, what a pip is, why JPY pairs differ, and why forex leverage hurts."
date: 2026-07-13
author: "Stockade Team"
tags: ["Forex", "Basics"]
slug: "forex-trading-for-beginners"
---

You open a forex platform for the first time and the quote reads EUR/USD 1.0872. No dollar sign, four decimals, and the buy button asks for lots rather than shares. Then USD/JPY reads 157.42, with two decimals, and someone tells you a 20-pip move on both pairs is the same size — though on one it looks like 0.0020 and on the other 0.20.

The confusion is shallow. Forex has three conventions that trip up every equity trader — what a pair actually is, what a pip is, and how big a lot is. Once those land, the rest reads normally.

## Every forex trade is long one currency and short another

This is the conceptual hurdle. Buy a stock and one thing happens: you own shares. Buy EUR/USD and two things happen at once — you go **long the euro** and **short the US dollar**, in the same trade, at the same instant. You cannot do one without the other, because a currency has no price except in terms of another currency. There is no absolute "price of the euro" the way there is an absolute price of a share.

That reframes the chart. EUR/USD rising does not mean the euro is strong; it means the euro is strong *relative to the dollar* — which could equally be the dollar weakening while the euro does nothing.

The first currency in the pair is the **base**, the second is the **quote**. The number is always: how many units of the quote currency buy one unit of the base.

- **EUR/USD 1.0872** — one euro costs 1.0872 US dollars.
- **USD/JPY 157.42** — one US dollar costs 157.42 yen.

Notice the dollar sits on opposite sides of those two pairs. Buy EUR/USD *and* buy USD/JPY and you are short dollars in one trade and long dollars in the other, partially cancelling your own position without meaning to. For the same reason there is no short-selling restriction in forex: a sell is just a buy of the other currency, nothing is borrowed, and there is no uptick rule.

## What a pip is, and why JPY pairs use the second decimal

A **pip** — "percentage in point" — is the standard increment traders quote a move in. For nearly every pair it is the **fourth decimal place**, 0.0001. On EUR/USD, a move from **1.0872 to 1.0892** is 0.0020, which is **20 pips**.

Where the yen is the quote currency, the pip is the **second decimal place**, 0.01. On USD/JPY, a move from **157.42 to 157.62** is 0.20, which is also **20 pips**.

This exception is where beginners lose the thread, and it is not arbitrary. The convention keeps a pip roughly the same *relative* size across pairs:

- EUR/USD: 0.0001 ÷ 1.0872 = **0.0092%** of price
- USD/JPY: 0.01 ÷ 157.42 = **0.0064%** of price

Same order of magnitude, so 50 pips means a comparable thing on either. Now suppose the yen used the fourth decimal: 0.0001 ÷ 157.42 = **0.0000635%**, about 145 times smaller, and an ordinary 0.8% day on USD/JPY would print as roughly 12,600 pips. The two-decimal convention keeps yen quotes in the same numeric range as everything else.

One further wrinkle: most brokers show an extra digit, a **fractional pip** worth a tenth of a pip — EUR/USD as 1.08725, USD/JPY as 157.425. Reading that last digit as a pip inflates every distance you measure by 10×.

## Pip value depends on lot size and on the quote currency

A pip is a distance. What it is *worth* depends on how many units you hold. Forex trades in standardised **lots**: a **standard lot** is 100,000 units of the base currency, a **mini lot** is 10,000, and a **micro lot** is 1,000.

Pip value is units × pip size, expressed in the **quote** currency. A standard lot of EUR/USD: 100,000 × 0.0001 = **10 USD per pip**. The quote currency is already the dollar, so that is exactly $10 with no conversion, and the 20-pip move from 1.0872 to 1.0892 is 20 × $10 = **$200**. Any USD-quoted pair, GBP/USD included, is a clean $10 per pip per standard lot.

USD/JPY is not. Its quote currency is the yen, so a standard lot earns 100,000 × 0.01 = **¥1,000 per pip**, and reaching dollars means dividing by the current rate: 1,000 ÷ 157.42 = **$6.35 per pip**. The same 20-pip move is ¥20,000, or 20,000 ÷ 157.42 = **$127.05** — not $200. Sizing a yen trade as though pips were worth $10 leaves you risking 36% less than you intended.

<div class="table-wrap">

| Lot | Units | EUR/USD pip value | USD/JPY pip value (at 157.42) |
|---|---|---|---|
| Standard | 100,000 | $10.00 | ¥1,000 = $6.35 |
| Mini | 10,000 | $1.00 | ¥100 = $0.64 |
| Micro | 1,000 | $0.10 | ¥10 = $0.06 |

</div>

Small lots are what make forex sizing workable on a small account. With $5,000 and 1% risk per trade — $50 — on a EUR/USD setup with a 25-pip stop, you need a pip value of 50 ÷ 25 = **$2.00**, which is 2 mini lots, or 20,000 units. Notional value: 20,000 × 1.0872 = **$21,744**. Four times your account controlled with $50 at risk. The [position sizing formula](/blog/risk-management-position-sizing/) works identically here; only the unit changes from risk-per-share to risk-per-pip.

## The spread is the main cost you pay in retail forex

Most retail forex brokers charge no commission. They are paid through the **spread** — the gap between the price you can sell at (bid) and the price you can buy at (ask).

If EUR/USD is quoted 1.0871 / 1.0873, the spread is 2 pips. You buy at 1.0873 and the platform marks your position at the bid, 1.0871, so you open **down 2 pips** — $20 on a standard lot, before the market has done anything.

That sounds trivial until you multiply it by frequency. Ten round turns a day on one standard lot at a 1-pip spread is $10 × 10 = $100 a day, and across 250 trading days, **$25,000** in spread alone. Spreads also widen sharply around economic releases and in the thin hours after the New York close.

## Forex leverage is far higher than equity leverage, and that is the danger

One standard lot of EUR/USD at 1.0872 is $108,720 of currency. Nobody posts that; brokers require a margin deposit instead, and forex requirements are extreme by equity standards. A US stock account gives you 2:1 overnight, while regulated forex leverage runs 30:1 in the EU and UK and 50:1 in the US on majors — and offshore brokers advertise 500:1 and higher.

<div class="table-wrap">

| Leverage | Margin for 1 standard lot EUR/USD ($108,720 notional) |
|---|---|
| 2:1 (typical stock account) | $54,360.00 |
| 30:1 (EU/UK retail cap) | $3,624.00 |
| 50:1 (US retail cap) | $2,174.40 |
| 500:1 (offshore) | $217.44 |

</div>

Read the bottom row and the trap is obvious. With $2,000 and 500:1 you can hold five standard lots — $543,600 of currency — for $1,087.20 of margin, leaving $912.80 free. Five lots is $50 per pip, so a **20-pip** move against you costs $1,000, more than your free margin, and you are liquidated. Twenty pips is 0.0020 ÷ 1.0872 = **0.18%** of price. An adverse move smaller than a rounding error on a stock chart ends the account.

The marketing frame is that leverage lets a small account access a big market. The honest frame is that leverage multiplies an outcome whose sign you do not control: it scales wins and losses by the same factor and changes your expectancy per trade not at all, so if your strategy loses money on average, leverage is not a faster route to profit but a faster route to zero. Brokers regulated in the EU and UK must publish the share of retail accounts that lose money, and the disclosed figures generally sit in the 70–80% band; leverage-driven losses are the dominant reason.

Treat leverage as capacity you mostly decline: size from your stop distance and risk budget, and let the margin requirement fall where it falls. [Futures carry similar leverage mechanics](/blog/futures-trading-explained/) through contract margin, and the same discipline applies.

## Majors, minors, exotics, and the 24-hour trading week

Pairs are grouped by liquidity. **Majors** all include the US dollar — EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD — and carry the tightest spreads. **Minors**, or crosses, pair two majors without the dollar: EUR/GBP, EUR/JPY, GBP/JPY. **Exotics** pair a major with a smaller or emerging-market currency — USD/TRY, USD/ZAR, USD/MXN — where spreads run ten or twenty times a major's and price moves violently on domestic political news. Beginners belong in the majors on cost alone.

Forex runs 24 hours a day, five days a week, opening with Sydney around 5pm ET Sunday and closing 5pm ET Friday, with four regional sessions rotating: Sydney, Tokyo, London, New York. The heaviest volume is the **London–New York overlap**, roughly 8am to 12pm ET, when both of the largest centres are open — spreads are tightest and moves largest then. Asia-only hours are typically quiet and range-bound.

Round-the-clock access is not an invitation to trade round the clock. Pick the window that suits your setups and your life; whether that is a two-hour overlap or a multi-day hold is the [day trading versus swing trading](/blog/day-trading-vs-swing-trading/) decision. And although the week is continuous, forex gaps over the weekend — Monday can open away from Friday's close, past any stop resting in between.

## What Stockade's three currency pairs can and cannot teach you

Stockade's simulator and markets list carry exactly three pairs — EUR/USD, GBP/USD and USD/JPY — starting at 1.0872, 1.2714 and 157.42. These are real pair names, but the price data behind them is generated client-side by a random walk. Nothing is quoted from a market, and those base prices are fixed starting points, not live rates.

Be clear about what that leaves out. Stockade models no bid-ask spread at all — one price, so a trade there never pays the cost that dominates real retail forex. There are no lots, no margin, no leverage and no overnight swap; you buy a quantity of units against a $100,000 virtual balance, exactly as you would a stock. The generated series never gaps, so no weekend gap appears. And candle-to-candle volatility is a fixed fraction of each instrument's base price, identical across every symbol on the site, so EUR/USD there does not show the characteristically small percentage moves a real major pair does.

What it is good for is reading practice: a four-decimal quote, counting pips off a chart without translating into dollars first, and 1.0872 beside 157.42 until the two conventions stop needing a moment's thought.

## Practice this on the simulator

Pull up EUR/USD and USD/JPY on Stockade and read distances in pips rather than decimals — measure a swing on each and confirm the four-decimal and two-decimal conventions produce comparable moves. Then price the same trade twice on paper: what it would cost or return at one standard lot ($10 a pip on EUR/USD, $6.35 on USD/JPY at 157.42) versus one micro lot. Remember that no spread and no leverage are modelled there, so the two forces that dominate real retail forex are absent, and that virtual money makes sizing discipline far easier than real money will. Get the conventions automatic on [Stockade's paper trading simulator](/simulator/) before any of it matters financially.
