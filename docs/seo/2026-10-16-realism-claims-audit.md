# Audit: claims that the product models real markets

**Status: fix in progress (see `2026-10-16-realism-claims-fixes.md`).** Written 2026-10-16 at `87e0b57`; rows #10 and #11 added during the fix pass.

**Trigger:** `025da5e` removed a claim that Stockade's futures were "modeled on CME Group's real contract specifications". The engine has no multipliers, tick sizes or margin. This audit looks for other claims that the product models, replicates or follows real market data, contract specs, exchange behaviour or fills.

**Scope:** all 8 locales. Blog posts, static/app pages, meta descriptions, and the home page FAQ, which renders **both** the visible FAQ and the FAQPage JSON-LD from one `faqs` array, so any FAQ row below is also in structured data.

## What the engine actually does (the yardstick)

From `src/components/trading/TradingSimulator.tsx` unless noted. Cross-checked against the "What this simulator does not model" list on `/simulator/` (`src/pages/simulator.astro:84-117`).

| Area | Behaviour | Where |
|---|---|---|
| Prices | Client-side random walk from a hard-coded start price per symbol. No feed, no history. | `SYMBOL_PRICES` :63, `generateCandles` :75, live loop :270-296 |
| Volatility | **One model for every symbol.** A live tick moves by up to 0.5% of price × a shared trend bias; the history uses 0.7%. Crypto, forex, futures and stocks all get the same factor. `ChartSimulator` scales only by price level (`<5`, `<100`, else), not by asset class. | :85, :279; `ChartSimulator.tsx:310` |
| Sessions / gaps | No market hours. Every symbol ticks 24/7. Each new live candle opens at the previous close, so there are no gaps. | :291-293 |
| Market order | Fills in full, instantly, at the last generated price. No spread, slippage or commission. | `execOrder` :~507, `fillOrder` :440 |
| Limit order | Marketable on arrival: fills at the prevailing price. Otherwise it rests and fills at the limit price once price trades through. No queue, no partial fills, no buying-power reservation. | :~515-540, `src/lib/limit-orders.ts` |
| Stop-loss / take-profit | Fields on the position, not resting orders. When a tick crosses either level, the whole position closes **at that tick's price** (so a little slippage past the level), and both fields clear (OCO-like). | :329-349 |
| Account math | P&L = (price − avgPrice) × qty; averaging on adds. A buy debits full notional; a short **credits** full notional to cash. No margin, leverage, borrow cost or contract multiplier. | `fillOrder` :440-500 |
| Symbols | 14 stock and 8 crypto tickers are invented. 3 forex pairs (EUR/USD, GBP/USD, USD/JPY, all majors) and 4 futures (/ES, /NQ, /CL, /GC) carry real names. | `SYMBOL_GROUPS` :57 |
| Live mode | Ticks **one** symbol, the one selected, every 800 ms. The TickerTape only displays last prices stored by the simulator. | live effect :270-296 (deps `[symbol, mode]`); `TickerTape.tsx` |

## Findings: claims the code does not support

**Verdict key**
- **No:** the code contradicts the claim.
- **Partly:** part true, part false or overstated.
- **Subjective:** a judgement word ("realistic") with nothing false attached; listed for completeness.

Every claim below originates in English. All 7 translations carry it as a direct translation unless a row says otherwise.

### 1. FAQ "What is a stock market simulator?": "replicates real market conditions" — **No**

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:35` | en | "A stock market simulator is a virtual trading platform that **replicates real market conditions** using fake money …" |
| `src/pages/es/index.astro:35` | es | "… que **replica las condiciones reales del mercado** usando dinero ficticio …" |
| `src/pages/pt/index.astro:35` | pt | "… que **replica as condições reais de mercado** …" |
| `src/pages/fr/index.astro:35` | fr | "… qui **reproduit les conditions réelles du marché** …" |
| `src/pages/it/index.astro:35` | it | "… che **riproduce le condizioni reali del mercato** …" |
| `src/pages/de/index.astro:35` | de | "… die **reale Marktbedingungen** mit fiktivem Geld **nachbildet** …" |
| `src/pages/ja/index.astro:35` | ja | "…**実際の市場環境を再現し**…" |
| `src/pages/ko/index.astro:35` | ko | "…**실제 시장 상황을 재현하는**…" |

**Code:** none of the conditions that distinguish a real market are modelled: spread, slippage, partial fills, queue, hours, gaps, margin. The site's own `/simulator/` limits list says so. The sentence is phrased as a general definition, but it sits in Stockade's FAQ and continues "Stockade gives you…".

### 2. FAQ "Is the stock market simulator real or fake?": "modeled on real brokerage behavior … mirror … an actual platform" — **No**

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:43` | en | "The prices and charts use realistic simulated market data **modeled on real brokerage behavior**, so the trading mechanics, chart patterns, and order types **mirror what you'd use in an actual platform**." |
| `src/pages/es/index.astro:43` | es | "… **modelados según el comportamiento real de un bróker**, de modo que la mecánica de trading … **reflejan lo que usarías en una plataforma real**." |
| `src/pages/pt/index.astro:43` | pt | "… **modelados a partir do comportamento real de uma corretora** … **espelham o que você usaria em uma plataforma real**." |
| `src/pages/fr/index.astro:43` | fr | "… **modélisées sur le comportement réel des courtiers** … **reflètent ce que vous utiliseriez sur une plateforme réelle**." |
| `src/pages/it/index.astro:43` | it | "… **modellati sul comportamento reale dei broker** … **rispecchiano quelli di una piattaforma vera**." |
| `src/pages/de/index.astro:43` | de | "… **die am tatsächlichen Verhalten von Brokern ausgerichtet sind** … **widerspiegeln, was Sie auf einer echten Plattform nutzen würden**." |
| `src/pages/ja/index.astro:43` | ja | "価格やチャートは**実際の証券会社の値動きをモデルにした**リアルなシミュレーションデータを使用しているため、取引の仕組み、チャートパターン、注文タイプは**実際のプラットフォームで使うものと同じです**。" **Stronger than en:** "modeled on actual brokers' *price movements*" and "*are the same as*". |
| `src/pages/ko/index.astro:43` | ko | "가격과 차트는 **실제 증권사 동작을 모델링한** 사실적인 시뮬레이션 시장 데이터를 사용하므로 … **실제 플랫폼에서 사용하는 것과 동일하게 반영됩니다**." **Stronger than en:** "identically". |

**Code:** nothing is modelled on broker behaviour. There is no margin. Shorts credit full proceeds to cash with no borrow. Every fill is full and instant, with no spread. Chart patterns arise from a random walk. "Order types mirror an actual platform" holds only for market and limit semantics (see #3). This is the same kind of claim as the CME one.

### 3. FAQ "How does a stock market simulator work?": "realistic price data … fills them instantly" — **Partly**

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:47` | en | "Stockade generates **realistic price data** for 29 assets … market, limit, stop-loss, take-profit, and OCO bracket orders — and **the simulator fills them instantly**." |
| `src/pages/{es,pt,fr,it,de,ja,ko}/index.astro:47` | all 7 | Direct translations: es "datos de precios realistas … las ejecuta al instante"; pt "realistas … executa instantaneamente"; fr "réalistes … les exécute instantanément"; it "realistici … li esegue istantaneamente"; de "realistische … führt sie sofort aus"; ja 「リアルな価格データ … 即座に約定」; ko "사실적인 가격 데이터 … 즉시 체결". |

**Code:**
- **"Fills them instantly" is false for resting limit orders.** A non-marketable limit waits for price to trade through.
- **Stop-loss and take-profit are position fields, not orders.** Listing them with "OCO bracket orders" as separately filled order types overstates them. The OCO behaviour itself is accurate.
- **"Realistic"** is subjective (one volatility model for all symbols).

### 4. FAQ "What are the limitations?": "spreads, slippage, and after-hours gaps are approximated" — **No** (spread, gaps); **Partly** (slippage)

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:55` | en | "… so exact real-world **spreads, slippage, and after-hours gaps are approximated** rather than precisely reproduced." |
| `src/pages/{es,pt,fr,it,de,ja,ko}/index.astro:55` | all 7 | Direct translations: es "se aproximan"; pt "são aproximados"; fr "sont approximés"; it "vengono approssimati"; de "angenähert"; ja 「近似的に表現されます」; ko "근사치로 처리됩니다". |

**Code:**
- **Spread is not approximated; there is none** (`/simulator/` says "no spread").
- **Gaps: there are none.** No sessions, and each candle opens at the prior close.
- **Slippage is only partial:** stop-loss/take-profit exits close at the crossing tick, a small, incidental slip; market and limit orders have none.

This is the FAQ answer users and search engines will read as the limitations statement, and it contradicts `/simulator/`'s list.

### 5. Home "Stocks, crypto, forex, and futures in one place" paragraph — **No** (crypto volatility, minor pairs); **Partly** (futures)

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:332` | en | "There are 14 equity tickers with **realistic price behavior**, 8 crypto assets that **move with the volatility you'd expect from the real thing**, **major and minor currency pairs**, and **four futures contracts** — NQ, ES, CL, and GC." |
| `src/pages/es/index.astro:329` | es | "… 8 activos cripto que se mueven con la volatilidad que esperarías del activo real, pares de divisas mayores y menores, y cuatro contratos de futuros …" |
| `src/pages/pt/index.astro:329` | pt | "… com a volatilidade esperada do ativo real, pares de moedas principais e secundários …" |
| `src/pages/fr/index.astro:329` | fr | "… avec la volatilité que vous attendriez de vraies devises numériques, des paires de devises majeures et mineures …" |
| `src/pages/it/index.astro:334` | it | "… con la volatilità che ci si aspetterebbe dal mercato reale, coppie valutarie principali e minori …" |
| `src/pages/de/index.astro:329` | de | "… mit der Volatilität …, die man von echten digitalen Währungen erwarten würde, wichtige und weniger geläufige Devisenpaare …" |
| `src/pages/ja/index.astro:329` | ja | "…実際の資産さながらのボラティリティで動く暗号資産が8種類、主要・マイナー通貨ペア…" |
| `src/pages/ko/index.astro:329` | ko | "…실제 디지털 자산에서 기대할 법한 변동성으로 움직이는 8개 암호화폐, 주요 및 비주요 통화 페어…" |

**Code:**
- **Crypto volatility:** crypto uses the same volatility factor as every other symbol (`TradingSimulator.tsx:85, :279`). The explainer post says so itself ("a single volatility model runs across every symbol", `what-is-a-stock-market-simulator.md:64`).
- **Minor pairs:** there are none. The 3 pairs are all majors.
- **"Four futures contracts":** they are symbols named after contracts, with no contract mechanics. The futures post now says "named after the real contracts" (`025da5e`).

### 6. Home "Two ways to practice": "Live mode streams six assets at once" — **No** (product-behaviour claim, adjacent to scope)

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:325` | en | "**Live mode streams six assets at once** with prices updating every 800 milliseconds …" |
| `src/pages/{es,pt,fr,de,ja,ko}/index.astro:322`, `src/pages/it/index.astro:327` | all 7 | es "transmite seis activos a la vez"; pt "transmite seis ativos de uma vez"; fr "diffuse six actifs à la fois"; it "trasmette sei asset contemporaneamente"; de "streamt sechs Assets gleichzeitig"; ja 「6銘柄を同時に配信」; ko "6개 자산을 동시에 스트리밍". |

**Code:** the live interval ticks only the selected `symbol` (effect deps `[symbol, mode]`). Nothing streams six assets at once.

### 7. Explainer post: "trade real market mechanics" / "works the way it really works" — **Partly**

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/content/blog/what-is-a-stock-market-simulator.md:3` (description) | en | "A stock market simulator **lets you trade real market mechanics** with virtual money." |
| `…/what-is-a-stock-market-simulator.md:16` | en | "A simulator is a trading platform where the money and the price feed are both simulated and **everything built around them works the way it really works**. … The order types are the real order types. The account math … **follows the same arithmetic your broker uses**." |
| `src/content/blog-es/que-es-un-simulador-de-mercado-de-valores.md:3, :17` | es | Description: "te deja operar la mecánica real del mercado". **Body differs from en:** line 17 opens with the FAQ #1 phrase, "una plataforma de trading virtual que **replica las condiciones reales del mercado**" (stronger than en). |
| `src/content/blog-pt/o-que-e-um-simulador-de-mercado-de-acoes.md:3, :23-24` | pt | "operar a mecânica real do mercado"; "tudo construído em torno deles funciona da forma como realmente funciona" |
| `src/content/blog-fr/quest-ce-qu-un-simulateur-boursier.md:3, :16` | fr | "trader les mécanismes réels du marché"; "tout ce qui est construit autour fonctionne comme dans la réalité" |
| `src/content/blog-it/cosa-e-un-simulatore-di-mercato-azionario.md:3, :16` | it | "tradare la meccanica reale del mercato"; "funziona come funziona davvero" |
| `src/content/blog-de/was-ist-ein-boersensimulator.md:3, :16` | de | "echte Marktmechanik traden"; "alles darum herum genauso funktioniert wie in echt" |
| `src/content/blog-ja/kabushiki-shijou-simulator-toha.md:3, :16` | ja | 「本物の市場の仕組みを取引できます」; 「すべてのものが本物同様に機能する」 |
| `src/content/blog-ko/jusik-sijang-simyulleiteo-ran.md:3, :16` | ko | "실제 시장 메커니즘을 트레이드"; "모든 것이 실제로 작동하는 방식대로 작동하는" |

**Code:**
- **True:** P&L, average price and equity arithmetic match a broker's.
- **False:** "everything … works the way it really works". There is no spread, slippage, partial fill, queue or margin, and shorts credit cash, which no broker's account math does. The post's own "cannot teach" section (`:91-92`) and `/simulator/` contradict it.
- **Meta description:** "trade real market mechanics" is the same overstatement, in the meta description.

### 8. ko only: "실시간 시세" ("real-time quotes") — **Partly**

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/ko/index.astro:88` (meta description) | ko | "… 800밀리초 **실시간 시세** 또는 캔들 …". English's description has no live-price wording at all. |
| `src/pages/ko/index.astro:31` (FAQ) | ko | "… 800밀리초 간격의 **실시간 시세** …" (en: "stream live prices at 800ms ticks") |
| `src/pages/ko/markets.astro:29` | ko | "800밀리초 간격의 **실시간 시세**를 원하시면 …" (en: "For 800ms live ticks, use the Trading Simulator.") — added 2026-10-16 during the fix pass |

**Code:** the ticks are generated in real time, but 시세 means market quotes. Together, 실시간 시세 is the standard Korean term for a real-time market data feed. Mild, but it reads as live market data in a meta description.

### 9. Lower-severity / subjective (listed, probably fine)

| File | Locale | Sentence | Verdict |
|---|---|---|---|
| `src/pages/index.astro:156` + `{es,pt,fr}/index.astro:158`, `it:162`, `{de,ja,ko}:157` | all 8 | Hero subhead: "… with **realistic simulated market data**." | **Subjective.** It does say "simulated". |
| `src/pages/index.astro:256` + `{7 locales}/index.astro:253` (it `:258`) | all 8 | Feature card "**Real Candlestick Charts** … same tools the pros use" (ja 「本格的な」 = "full-fledged", milder) | **Partly.** The indicators (EMA, VWAP, RSI, MACD) exist in `TradingChart.tsx`, but "Real" next to synthetic data is ambiguous. |
| `src/pages/index.astro:318` + `{7}/index.astro:315` (it `:320`) | all 8 | "A lot of simulators optimize for engagement instead of **realism**." | **Subjective.** It implies Stockade is realistic. |
| `src/pages/about.astro:58` + es `:60`, pt/it `:59`, fr/de `:52`, ja/ko `:51` | all 8 | "a stock market simulator with **realistic order types** (market, limit, stop-loss, OCO/bracket orders)" | **Partly.** Market and limit behave as defined. Stop-loss/OCO are position-level triggers that close at the crossing tick, not resting orders. |

### 10. FAQ "What is the main advantage of a simulator?": "the same environment as a real brokerage" — **No** (added 2026-10-16 during the fix pass)

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:59` | en | "… a full order panel, and a detailed analytics dashboard — **the same environment as a real brokerage**, completely free and consequence-free." |
| `src/pages/{es,pt,fr,it,de,ja,ko}/index.astro:59` | all 7 | es "el mismo entorno que un bróker real"; pt "o mesmo ambiente de uma corretora real"; fr "le même environnement qu'un courtier réel"; it "lo stesso ambiente di un broker vero"; de "dieselbe Umgebung wie bei einem echten Broker"; ja 「実際の証券会社と同じ環境」; ko "실제 증권사와 동일한 환경" |

**Code:** same as #2. No broker environment is reproduced: there's no spread, commission, margin, partial fill or live data. This answer is also FAQPage JSON-LD.

### 11. de and fr only: the order panel translated as an order book — **No** (added 2026-10-16 during the fix pass)

| File | Locale | Sentence (claim part) | English source |
|---|---|---|---|
| `src/pages/de/index.astro:47` | de | "Sie geben Ihre Orders über ein **vollständiges Orderbuch** auf" | "through a full order panel" |
| `src/pages/de/index.astro:59` | de | "ein **vollständiges Orderbuch**" | "a full order panel" |
| `src/pages/de/index.astro:315` | de | "sowie ein **Orderbuch** mit Market- und Limit-Einträgen" | "plus an order panel with market and limit entries" |
| `src/pages/de/index.astro:349` | de | "'**Orderbuch**: Market- und Limit-Einträge, …'" | "'Order panel: market and limit entries, …'" |
| `src/pages/de/simulator.astro:48` | de | "und ein **vollständiges Orderbuch**" | "and a full order ticket" |
| `src/pages/de/about.astro:78` | de | title "**Vollständiges Orderbuch**" | "Complete order panel" |
| `src/pages/fr/index.astro:47` | fr | "via un **carnet d'ordres complet**" | "through a full order panel" |
| `src/pages/fr/index.astro:315` | fr | "ainsi qu'un **carnet d'ordres** avec des entrées au marché et à cours limité" | "plus an order panel with market and limit entries" |
| `src/pages/fr/simulator.astro:48` | fr | "et un **carnet d'ordres complet**" | "and a full order ticket" |

**Code:** "Orderbuch" and "carnet d'ordres" are the standard terms for an exchange **order book**, the resting bids and offers at each price. Stockade has no order book or market depth: one generated price per tick. The English says order *panel*/*ticket*, the form you enter orders in. de and fr already use "Orderbuch" and "carnet d'ordres" correctly for real markets on their `/simulator/` limitations list (de `:73`, `:79`; fr `:82`), which is the meaning that makes these lines an overclaim. The de and fr `index.astro:47` and de `:59` lines are FAQ answers (#3, #10), so they are also FAQPage JSON-LD.

### 12. ja only: 「ヒストリカルなプライスアクション」 ("historical price action") — **No** (added 2026-10-16 during the fix pass)

| File | Locale | Sentence (claim part) | English source |
|---|---|---|---|
| `src/pages/ja/about.astro:51` | ja | 「**ヒストリカルなプライスアクション**でテクニカル分析を練習できる」チャートリプレイツール | "for practicing technical analysis on **historical-style** price action" |

**Code:** the chart simulator replays **generated** candles (`ChartSimulator.tsx` `generateCandles`), not historical data. English says "historical-style", and es/pt/fr/it/de/ko all keep the "-style" qualifier ("de estilo histórico", "em estilo histórico", "de style historique", "in stile storico", "historisch anmutender", "과거 데이터풍의"). ja drops it, which claims real historical data.

## Related inconsistency (understates rather than overstates)

`src/pages/simulator.astro:115-116` says "All 29 tickers are fictional … **No symbol represents a real security.**" It's mirrored in all 7: es `:110`, pt `:114`, fr `:90`, it `:121`, de `:85`, ja `:90`, ko `:85`.

The 3 forex pairs and 4 futures do carry real instrument names. Both the explainer post ("only the forex pairs and futures use real-world names", `:62`) and the futures post (`:24`, `:101`) say so. The *prices* are synthetic, so the intent is right, but "all 29 tickers are fictional" conflicts with those posts. Worth aligning in the same change as #5.

## Checked and supported (no action)

- `/simulator/` "What this simulator does not model" list (all 8 locales): matches the code. One nuance: "No slippage. Every order fills at the exact price shown" holds because stop-loss/take-profit exits fill at the shown tick price.
- `paper-trading-guide.md:103` (and translations): "Stop-loss and take-profit exits do carry a little slippage — the position closes at the tick that crossed your level". Matches `TradingSimulator.tsx:329-349`.
- `futures-trading-explained.md:24, :101-104`, `forex-trading-for-beginners.md` limitations section, `crypto-trading-for-beginners.md` invented-tokens section, `common-day-trading-mistakes.md:108`, `what-is-a-stock-market-simulator.md:62-64, :91-92`, `understanding-trading-volume.md` (volume is uniform random): all accurate, in all locales checked.
- `about.astro:63-64, :68-70`, `disclaimer.astro:110-113` ("we strive to provide an accurate and realistic simulation … may differ materially"), `terms.astro:99`: hedged and accurate.
- `TradingSimulator.tsx:783` tooltip "Live simulation — prices tick in real time": accurate.
- Meta descriptions: no realism claims in any locale except #7 (explainer) and #8 (ko home).

## Notes for the fix (when approved)

- #1–#4 live in the single `faqs` array per locale. Edit the array only, never a second copy, so the visible FAQ and the FAQPage JSON-LD stay verbatim-identical.
- #2 and #4 are the highest priority: they make the same kind of claim as the CME one, and they appear in structured data.
- Each fix should land in all 8 locales together, plus the es explainer body variant (#7) and the ko-only wording (#8).
