# Hardcoded English strings in React islands

**Status: report only. Nothing has been implemented.** Generated 2026-10-16 at `4c0ed56`; revised the same day into two phases (see "Phased plan" at the end). **Scope decision pending.**

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

## Phased plan

The work splits cleanly into two phases. They touch different data, carry different risk, and affect the static HTML differently, so each can be approved on its own. Each island renders on exactly one page type, in all 8 locales:

| Island | Rendered on |
|---|---|
| `MarketsView` | `/markets/` + `/{es,pt,ja,fr,de,ko,it}/markets/` |
| `AnalyticsDashboard` | `/analytics/` + 7 translated |
| `TradingSimulator` (+ `TradingChart`) | `/simulator/` + 7 translated. `TradingChart` is also imported by the unrouted `LiveSimulator.tsx`, which is dead code. |
| `ChartSimulator` | `/chart-simulator/` + 7 translated |

### Phase A: UI strings (about 140, all four islands)

**Scope:** every table row above except the `PATTERNS` prose fields. That covers:
- labels, buttons and tabs
- column and stat headings
- empty states, tooltips, toasts and plurals
- display labels split from internal values
- `ChartSimulator`'s chrome (panel titles, control titles, group headings, mobile tabs)

It also includes the shared `format()` / plural helper.

**Static HTML affected:** 28 pages, the 4 page types × 7 translated locales:

| Pages | Becomes localized in the static HTML (SSR strings) | Client-only, localized after hydration |
|---|---|---|
| `/{xx}/markets/` ×7 | search placeholder, category buttons, 7 column headers, 7 instrument names | n/a |
| `/{xx}/analytics/` ×7 | 6 stat labels, 3 tabs, "Equity Curve" + closed-trade count, empty states, "Open simulator →" | journal stats + headers, heatmap title, legend, weekdays, cell tooltips |
| `/{xx}/simulator/` ×7 | disclaimer notice, symbol-group labels, order panel (Order, market/limit, Qty, Limit Price, help text, Stop Loss, Take Profit), stats, Reset Balance, Working Orders / Position / Trade History / Clear, LIVE/REPLAY and replay controls, keyboard hint, mobile tabs | 6 toasts, "Session complete", control tooltips; chart markers are canvas |
| `/{xx}/chart-simulator/` ×7 | Pattern Library title + counts, the 4 group headings, empty-state help text, Library toggle, "Hover to see OHLCV", key hint, mobile tabs | 1/2/3-candle labels, "Found N× on chart", Formation / Market Psychology / Key Rules headings, control tooltips |

The 4 English pages are byte-identical in visible text, because English defaults live in each island.

**Copy that must change in the same commit**, or the pages contradict themselves:
- **Markets "How to Use Market Overview" depends on Phase A.** That section, still missing in all 7 locales (drift audit #1), names the category tabs, the search box, and the "Symbol, Price, or Change" column headers. Translate it **after or together with** Phase A's MarketsView labels, so the prose quotes the labels as they actually render.
- **Simulator mobile tabs:** `7317972` made the es/pt/ja/fr copy quote the English "Chart / Order / Trades", as de/ko/it already did. If Phase A localizes those tabs, all 7 locales' copy must switch to the localized labels.
- **Working Orders, Buy / Sell / Flatten:** all 7 simulator pages quote these in English. Update the copy if Phase A translates them, or keep them English (decision 1 below).
- **Chart simulator "Patterns" panel:** every locale's copy, **and English**, calls the left panel "Patterns". On desktop it is titled "Pattern Library"; only the mobile tab says "Patterns". Align the copy with whatever label Phase A settles on, in all 8 locales at once.

**Size: M.** Engineering is the label plumbing plus about 6 toast templates. Translation is about 140 short strings × 7.

**Verification:** for each `SSR` string in the tables above, a `dist/` check that it no longer appears in English on the 28 pages, plus a hydration spot-check per island (no text flash on load). Consider adding this as a build-time allowlist check, like the localized-link check.

### Phase B: pattern library text (~2,500 words)

**Scope:** the `description`, `signal`, `formation[]`, `psychology` and `characteristics[]` fields of the 24 `PATTERNS` entries in `ChartSimulator.tsx`: about 130 prose strings, **~17,500 words across 7 locales**. Pattern `name`/`shortName` stay in English, as all translated chart-simulator pages already treat them.

**Static HTML affected: none of the visible text.** This text renders only after a pattern is selected, so today it lives in the `ChartSimulator` JS bundle (53 KB) and never in the HTML. The pattern names in the library list *are* in the static HTML, but they stay English by design. How it ships changes what lands in the HTML of the 7 `/{xx}/chart-simulator/` pages:
- **As a prop** (the recommended default): each locale's text is serialized into that page's `<astro-island props>`, about 20–40 KB of escaped JSON per page. Crawlers may or may not index it.
- **As a per-locale dynamic import:** the static HTML is unchanged, and the text loads client-side after hydration behind a short loading state.

**Dependencies:** Phase B needs Phase A's `ChartSimulator` labels prop mechanism. The "Formation / Market Psychology / Key Rules" headings that frame this text are Phase A strings. Nothing else depends on Phase B.

**Size: L.** It's a content job comparable to 2–3 blog posts per locale. Schedule it with the other bulk educational translation (the citations batches in `2026-10-16-citations-translation-plan.md`) and use the same per-locale, checkpoint-after-first-batch approach.

### Decisions needed before Phase A

1. Keep BUY / SELL / FLATTEN, LIVE / REPLAY and the B/S/F hint words in English, as the translated page copy does today, or translate them?
2. Keep `en-US` number formatting everywhere?
3. Localize the mobile tab labels? If yes, the copy fixed in `7317972` changes again.

**Before Phase B:** pass the pattern text as props, or load it with a dynamic import?
