# Hardcoded English strings in React islands

**Status: report only. Nothing has been implemented.** Generated 2026-10-16 at `4c0ed56`.

Covers `MarketsView`, `AnalyticsDashboard`, `TradingSimulator` (plus `TradingChart`, which it renders) and `ChartSimulator`. Strings were extracted with the TypeScript compiler API, covering JSX text, user-facing attributes, and string literals. A second pass caught single-word labels and values rendered through `{t}` / `{c}` with CSS `capitalize`. Every entry was then reviewed by hand. Line numbers are as of `4c0ed56`.

**Why it matters for SEO, not just UX:** the islands use `client:load`, so their initial render is pre-rendered into the static HTML. On `dist/ja/simulator/`, for example, "Working Orders", "Trade History", "Qty (shares)", "Reset Balance" and the "Simulation only … Got it" notice are all present **in English**. Crawlers index translated app pages with an English UI embedded in them.

Legend for **Shown**:
- **SSR**: in the pre-rendered HTML.
- **Client**: appears only after interaction or a state change.
- **Canvas**: drawn by lightweight-charts, not in the DOM.

## Already localized

- `MarketsView`: `simulatorHref`, `labels.trade` and the 4 volume-unit notes (`28c2af0`, `520cde9`).
- `AnalyticsDashboard`: `simulatorHref` (`28c2af0`). Its "Open simulator →" **label** is still English.

## MarketsView: 13 UI strings + 7 instrument names

| Lines | Strings | Shown | Notes |
|---|---|---|---|
| 150 | `Search symbol or name…` (placeholder) | SSR | |
| 50, 160 | `all`, `stock`, `crypto`, `forex`, `futures` (category buttons) | SSR | These are internal `Category` values rendered via CSS `capitalize`. They need a separate display label, and the values themselves must not change. |
| 186–192 | `Symbol`, `Name`, `Price`, `Change`, `Volume`, `Mkt Cap`, `Action` (column headers) | SSR | Sort keys are separate from labels, so this is safe. |
| 40–47 | `Euro / US Dollar`, `British Pound / USD`, `US Dollar / Yen`, `S&P 500 Futures`, `Nasdaq 100 Futures`, `Crude Oil Futures`, `Gold Futures` | SSR | Descriptive instrument names, so they can be translated. The 22 fictional company and token names (Apexlar Technologies, Bullethon, …) are brand names; keep them. |

## AnalyticsDashboard: ~37 strings

| Lines | Strings | Shown | Notes |
|---|---|---|---|
| 145–150 | `Total P&L`, `Equity`, `Win Rate`, `Profit Factor`, `Avg Win`, `Max Drawdown` | SSR | Each locale's analytics page body and the performance-metrics post already have established terms for all six. |
| 171 | `Equity Curve`, `Trade Journal`, `Time Heatmap` (tabs) | SSR | The translated analytics pages' explanatory h3s already have terms for these, e.g. ja 資産曲線 / トレード日記 / 時間帯別ヒートマップ and ko 자본 곡선 / 매매일지 / 시간대별 히트맵. |
| 180–181 | `Equity Curve`, `{n} closed trade{s}` | SSR | **Plural logic is English-only** (`trades.length !== 1 ? 's' : ''`). It needs a per-locale plural template. |
| 186–187, 229–230 | `No trades yet — start trading to see your equity curve`, `No trades yet`, `Open simulator →` ×2 | SSR (empty state) | |
| 210–213 | `Total Trades`, `Winning`, `Losing`, `Avg Duration` | Client (journal tab) | |
| 237 | `Symbol`, `Side`, `Entry`, `Exit`, `Qty`, `P&L`, `Duration`, `Date` (journal headers) | Client | |
| 55 | `Mon` … `Sun` | Client (heatmap) | Better generated with `Intl.DateTimeFormat(locale, { weekday: 'short' })` than translated by hand. |
| 271–275 | `Performance by Time of Day`, the legend line (`Colour = net P&L · Number = win rate · … · Hours are UTC · — = no trades in that slot`), `No trades to display` | Client | |
| 294 | title: `{n} trade{s} · {wr}% win · net {money}`, `No trades` | Client (hover) | Plural, plus an interpolation that needs a template. |
| 31 | `{mins}m` duration suffix | Client | |

## TradingSimulator + TradingChart: ~60 strings

| Lines | Strings | Shown | Notes |
|---|---|---|---|
| 185–187 | `Simulation only.`, `All trading uses virtual money. Not financial advice.`, `Got it` | SSR | Disclaimer. The legal meaning must match the translated `/disclaimer/`. |
| 59–62 | `Stocks`, `Crypto`, `Forex`, `Futures` (symbol picker groups) | SSR | |
| 605–647 | `Order`, `market` / `limit` (order-type toggle, `capitalize`d values), `Qty (shares)`, `Limit Price`, `Buy below … or sell above it to rest the order until price reaches your level.`, `Stop Loss`, `Take Profit`, `· Active` | SSR | `market`/`limit` are `OrderType` values, so they need display labels. |
| 663–672 | `BUY`, `SELL`, `FLATTEN` | SSR | All 7 translated simulator pages quote **Buy / Sell / Flatten** in English in body copy, matching the B/S/F keyboard shortcuts. Keeping these as English is a reasonable, consistent choice. Decide explicitly. |
| 678–680, 907–909 | `Equity`, `P&L`, `Win Rate`, `Cash`, `Total P&L` | SSR / Client (replay summary) | Shared vocabulary with AnalyticsDashboard. Use one set of `ui.ts` keys. |
| 689 | `Reset Balance to $100,000` | SSR | |
| 696–749 | `Working Orders`, `resting · fills`, `Cancel` (+ title `Cancel this resting order`), `Position`, `Trade History`, `Clear`, `No trades yet.` | SSR | All 7 translated simulator page bodies quote **Working Orders** in English as a UI label, so they must change together with this label. |
| 461–558 | 6 toast messages: insufficient balance; enter a limit price; limit filled immediately; limit resting ("… fills when price falls to / rises to that level"); limit filled; limit cancelled for balance | Client | **These need sentence templates with placeholders**, not concatenation. They splice `${action}` (`buy`/`sell`) and English phrases mid-sentence, and that word order breaks in ja/ko/de. |
| 783–866 | `LIVE`, `⏪ REPLAY`, `↺ New`, `⏸ Pause` / `▶ Play`, `▶| Step`, `Speed` + titles: `Live simulation — prices tick in real time`, `Replay mode — step through a session candle by candle`, `Generate a new random session`, `Reveal next candle (Space / →)` | SSR (labels) / hover (titles) | |
| 885 | `Session complete` | Client | |
| 939 | `chart`, `order`, `trades` (mobile tabs, `capitalize`d values) | SSR (mobile) | **The page copy is already inconsistent with the UI.** es/pt/fr/ja describe translated tab names ("Gráfico, Orden y Operaciones", 「チャート」「注文」「取引」…) that the English-only UI doesn't show. de/ko/it quote the English "Chart, Order, Trades". Localizing the labels fixes es/pt/fr/ja; de/ko/it copy would then need updating to match. |
| 971 | `Space / → to step · B buy · S sell · F flatten` | SSR | Keys stay B/S/F. Only the words translate. |
| TradingChart 431–469 | `▲ LONG`, `▼ SHORT`, `✕ SL`, `✓ TP` (trade markers) | Canvas | Not crawlable. Low priority. |
| TradingChart 489 | title: `Hide {label}` / `Show {label}` (EMA toggles) | Hover | `EMA 9/20/50` and `VWAP` stay as-is. |

## ChartSimulator: ~30 UI strings + the pattern library (~2,500 words)

| Lines | Strings | Shown | Notes |
|---|---|---|---|
| 60–64 | `Bullish Reversal`, `Bearish Reversal`, `Neutral / Indecision`, `Continuation` (group headings) | SSR | |
| 899–900, 1245, 1289 | `Pattern Library`, `{n} patterns · {n} detected`, `detected`, `patterns` | SSR | |
| 958, 962 | `1 Candle` / `2 Candles` / `3 Candles`, `Found {n}× on chart` | Client | Plural-sensitive. |
| 985–1022 | `Formation`, `Market Psychology`, `Key Rules`, `No pattern selected`, `Click a pattern in the library or step through the chart — patterns are auto-highlighted as they appear.` | SSR (empty state) / Client | |
| 1042–1123 | `Library`; titles `Toggle Pattern Library`, `Go to start`, `Step back [←]`, `Play/Pause [Space]`, `Step forward [→]`, `Go to end`, `Generate new chart` | SSR / hover | |
| 1180 | `patterns`, `chart`, `info` (mobile tabs, `capitalize`d values) | SSR (mobile) | |
| 1252, 1284 | `Space · ← →`, `Hover to see OHLCV` | SSR | |
| 67–264 | **`PATTERNS`**: 24 entries, each with `name`, `shortName`, `description`, `signal`, `formation[]`, `psychology`, `characteristics[]` | Client (shown when a pattern is selected) | About **2,500 words of educational copy**, in the 53 KB `ChartSimulator` JS bundle. The translated chart-simulator pages already keep pattern **names** in English (Doji, Hammer, Engulfing…), so `name`/`shortName` (46 strings) can stay. The prose fields are the real translation job. |

## Not strings, but locale-fixed

- **Number formatting:** `fmt`/`fmtMoney` in all four islands call `toLocaleString('en-US', …)`, so prices render `1,234.56` in every locale. Keeping that is defensible on a USD trading UI where the prices themselves are USD. Switching de/fr/es/pt/it to `1.234,56` is a separate decision; leave it until someone asks.
- **Weekday labels:** see the AnalyticsDashboard row above (`Intl.DateTimeFormat`).

## Proposed approach

**Extend the existing `labels` pattern** (`LiveStats`, `MarketsView`) to all four islands:

1. **One typed `Labels` interface per island.** It holds the English defaults inside the island, as `MarketsView` now does, so the English pages need no changes.
2. **Strings come from `ui.ts`** under per-island key prefixes: `markets.*`, `analytics.*`, `sim.*`, `chart.*`. Each translated page builds its `labels` object with `t(locale, …)` in frontmatter, the same as today.
3. **Interpolated and plural strings become templates with named placeholders**, plus a ~10-line `format(template, vars)` helper in `src/lib/` with vitest coverage, for example `'{qty} {action} resting at {price}'`. Plurals use `Intl.PluralRules(locale)` with per-locale `{one, other}` forms. This is required for ja/ko/de word order, and English concatenation can't do it.
4. **Display labels are split from internal values.** Category, order type, and mobile tab values stay as their English identifiers, and a `labels` map supplies the text. The `capitalize`-a-value trick goes away.
5. **`PATTERNS` prose moves to per-locale data modules** (e.g. `src/i18n/patterns/{locale}.ts`), keyed by pattern `id`. The page imports its locale's module and passes it as a prop. The ids, detection logic and candle specs stay in the island.

**Does it keep the pre-rendered HTML localized? Yes.** Astro pre-renders a `client:load` island with the props the page passes, so every SSR string above appears in the locale's language in the static HTML. Hydration uses the same props, so there is no mismatch flash. Client-only strings (toasts, tooltips, journal, heatmap) come from the same props once hydrated.

**Trade-off to accept:** props are serialized into each page's HTML (`<astro-island props="…">`), and so is any locale data passed in.
- **UI labels:** a few KB per page, negligible.
- **Pattern library:** passing all ~2,500 words adds roughly 20–40 KB of escaped JSON to each `/chart-simulator/` page. Today those bytes live in one JS bundle, cached across pages. That's acceptable at this site's scale.
- **Alternative:** a per-locale dynamic import of the pattern data on the client avoids the payload. It's fine because the prose is client-only anyway, but it adds a loading state.

The localized-link build check is unaffected, since it only looks at hrefs. A string check for leftover English would need a separate allowlist-based test.

## Effort estimate

| Piece | Strings | Engineering | Translation (×7 locales) | Size |
|---|---|---|---|---|
| Shared plumbing: `format()` + plurals helper and tests | n/a | small | n/a | **S** |
| MarketsView remainder | 13 + 7 names | small, pattern exists | ~25 short labels | **S** |
| AnalyticsDashboard | ~37 | small–medium (plurals, weekday `Intl`) | short labels | **S–M** |
| TradingSimulator + TradingChart | ~60 | medium: 6 toast templates, value/label splits, coordinated updates to translated simulator page copy that quotes "Working Orders" / "Chart, Order, Trades" | short labels + 6 sentences | **M** |
| ChartSimulator UI | ~30 | small–medium | short labels | **S–M** |
| ChartSimulator `PATTERNS` prose | ~130 prose strings, ~2,500 words | medium: data-module split | **~17,500 words**, comparable to 2–3 blog posts per locale | **L** |

**Overall:** all the island chrome (everything except `PATTERNS`) is roughly **M**. It can ship as one change per island, verified in `dist/` by checking that each `SSR` string above no longer appears in English on `/xx/` pages. The pattern library is a separate **L** content job. It's worth scheduling on its own, ideally together with the drift items in `2026-10-16-translation-drift-audit.md`, since both are bulk educational translation.

**Decisions needed before starting:**
1. Keep BUY / SELL / FLATTEN, LIVE / REPLAY and the B/S/F hint words in English, as the translated page copy does today, or translate them?
2. Keep `en-US` number formatting everywhere?
3. Pattern library: props, or dynamic import?
