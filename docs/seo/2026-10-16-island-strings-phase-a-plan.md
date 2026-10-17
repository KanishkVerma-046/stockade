# Phase A plan: localize the island UI strings

**Status: steps 1–2 done; step 3 (AnalyticsDashboard) is next and has not started.** Step 1, the checkpoint, was MarketsView in Spanish plus the es "How to Use Market Overview" section (`15e0216`, 2026-10-16). Step 2 brought the same to pt, ja, fr, de, ko and it, one commit per locale (2026-10-17), and `UI_PENDING` is empty again. Written 2026-10-16. The string inventory is in `2026-10-16-island-strings-audit.md`.

**Step 2 notes (2026-10-17):**
- **Category casing.** The category buttons used CSS `capitalize`, which capitalizes every word, so fr "contrats à terme" would have rendered "Contrats À Terme". The class now applies only to the English defaults, and translated labels come already cased (`1c60937`, which also recased es's five labels; /es/markets/ looks the same).
- **Asset counts.** The six new how-to sections reuse each locale's home-page breakdown ("8 tokens cripto", 暗号資産トークン8種類, "8 jetons crypto", "8 Krypto-Token", 암호화폐 토큰 8개, "8 token crypto"; futures as *symbols*). The en and es sections still say "8 crypto pairs" / "8 pares de cripto", which no other page does; the crypto assets are single tokens (realism-fixes facts table). Not changed here; fixed in `423d187` ("8 crypto tokens", "8 tokens cripto", the es phrase from es/about).
- **New names.** No locale had a name for the British pound before; the GBP/USD names ("Libra esterlina", "Livre sterling", "Britisches Pfund", "Sterlina britannica", 英ポンド, 영국 파운드) are new.

## Scope

All four islands' UI strings (about 140), not the pattern library text:
- `MarketsView`
- `AnalyticsDashboard`
- `TradingSimulator` + `TradingChart`
- `ChartSimulator` chrome

They're served on 28 translated pages: `/{es,pt,ja,fr,de,ko,it}/{markets,analytics,simulator,chart-simulator}/`. English pages must stay **visually identical**, because each island keeps its English text as the default `labels`.

## Decisions (recorded 2026-10-16)

**a) Trading verbs and modes stay English.**
- **Unchanged in every locale:** `BUY`, `SELL`, `FLATTEN`, `LIVE`, `REPLAY`, and the B / S / F shortcut letters.
- **Shortcut hint:** the action words keep matching the button text, and only the connecting words are translated. es example: `Espacio / → para avanzar · B buy · S sell · F flatten`. Here "buy / sell / flatten" stay as on the buttons, and "Space", "to step" and the separators are localized.
- **Why:** the buttons are mnemonics for the shortcuts, and all 7 locales' simulator copy already quotes Buy / Sell / Flatten and Working Orders in English.

**b) en-US number formatting stays, as a known deferral.**
- **What:** every island formats with `toLocaleString('en-US')`, giving `$100,000` and `1,234.56`.
- **Known problem:** in locales where the comma is the decimal mark (es, pt, fr, de, it), `$100,000` can read as **one hundred dollars** to a native reader. A grouping comma means a decimal there. The page copy has the same issue (e.g. "$100,000 de dinero virtual").
- **Fix later:** locale-aware formatting in the islands *and* the copy, in one change. It's deliberately out of Phase A.

**c) The mobile tab labels are localized, and the copy changes in the same commit.**
- **Labels:** TradingSimulator's `Chart / Order / Trades` and ChartSimulator's `Patterns / Chart / Info` get translated labels.
- **Copy:** the simulator *and* chart-simulator page copy in **all 7 locales** changes **in the same commit**, so page copy and UI never disagree. This deliberately reverses `7317972`, which made the es/pt/ja/fr copy quote the English labels.
- **Reuse the original wording:** es, pt, fr and ja already chose localized tab names in their original copy ("Gráfico, Orden y Operaciones", "Gráfico, Ordem e Operações", "Graphique, Ordre et Trades", 「チャート」「注文」「取引」). Use those unless review prefers otherwise.
- **Same rule for other quoted labels:** any copy that names a UI label (e.g. "Pattern Library" / "Patterns" on the chart-simulator page, "Working Orders" on the simulator page) changes in the same commit as that label.

**d) The pattern library is Phase B.**
- `ChartSimulator` gets a `labels` prop for its chrome only. The `PATTERNS` prose (`description`, `signal`, `formation`, `psychology`, `characteristics`) stays out of that prop, and out of Phase A, so Phase B can pick props or a dynamic import freely.
- Pattern names (`name`, `shortName`: Doji, Hammer, …) stay **English** in every locale, matching how the translated chart-simulator pages already write them.

## Mechanism

- Each island takes `labels?: Labels`, a typed interface with the English defaults inside the island. This is the existing `LiveStats` / `MarketsView` pattern.
- Values come from `src/i18n/ui.ts`, under prefixes `markets.*`, `analytics.*`, `sim.*` and `chart.*`. Each translated page builds its `labels` object with `t(locale, …)` in frontmatter.
- Display labels are separate from internal values (categories, order types, mobile tabs). The internal values never change.
- Interpolated and plural strings (toasts, "{n} closed trades", "Found {n}× on chart") use templates with named placeholders, plus a small `format()` helper in `src/lib/` with tests. This is needed for ja / ko / de word order. Not needed for the MarketsView checkpoint.

## ui.ts coverage check (build-enforced)

`uiCoverageCheck()` in `astro.config.mjs` runs at `astro:build:start`. It lists every locale's `ui.ts` keys that are missing relative to English, and fails the build:
- for any locale **marked complete**, if any key is missing;
- for any **partial** locale, if a missing key is not covered by that locale's declared pending prefixes. This stops already-translated keys from regressing quietly while a batch is in progress.

Locales are partial only while listed in `UI_PENDING` in `ui.ts`. When a locale's batch lands, delete its entry; it is then complete and fully enforced. Logic and tests: `src/lib/ui-coverage.ts`.

## Rollout order

| Step | Change | Locales | Review |
|---|---|---|---|
| **1 (checkpoint)** | MarketsView labels (search, 5 categories, 7 headers, 7 instrument names) + es "How to Use Market Overview" section | **es only** | **Stop for review** |
| 2 | MarketsView + "How to Use Market Overview" | pt, ja, fr, de, ko, it, one locale at a time | per locale in `dist/` |
| 3 | AnalyticsDashboard labels | all 7 | |
| 4 | TradingSimulator + TradingChart labels, excluding the mobile tabs | all 7 | |
| 5 | **Mobile tabs (decision c):** TradingSimulator + ChartSimulator tab labels **and** simulator + chart-simulator copy | all 7 in **one commit** | |
| 6 | ChartSimulator chrome (Pattern Library title, counts, group headings, empty states, control tooltips) + chart-simulator copy that quotes those labels | all 7 | |

Each step ends with the `ui.ts` coverage check passing and the `dist/` verification below.

## Verification per step (`dist/`)

1. **Translated pages:** each Phase A string marked SSR in the audit appears translated in the static HTML of the affected `/xx/` pages, and its English original no longer appears there. Brand names, pattern names and decision (a) labels are exempt.
2. **English pages:** the visible text and markup of `/markets/`, `/analytics/`, `/simulator/` and `/chart-simulator/` are identical to the previous build. Only the hashed island script URL may change.
3. **Hydration:** the `<astro-island props>` carry the same labels the SSR used, so there is no text flash.
4. **Build:** `npm run build` passes all three checks (localized links, literal `**`, ui.ts coverage), and `npm test` passes.
