# Audit: claims that the product models real markets

**Status: fixed in all 8 locales (see `2026-10-16-realism-claims-fixes.md`).** Written 2026-10-16 at `87e0b57`; rows #10 and #11 added during the fix pass; row #18 (heatmap colouring) added and fixed 2026-10-17.

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
| `src/pages/fr/index.astro:59` | fr | "un **carnet d'ordres complet**" (FAQ, escaped apostrophe — missed by the first sweep) | "a full order panel" |
| `src/pages/fr/index.astro:349` | fr | "'**Carnet d'ordres**: entrées au marché …'" | "'Order panel: market and limit entries, …'" |
| `src/pages/fr/about.astro:78` | fr | title "**Carnet d'ordres complet**" | "Complete order panel" |
| `src/content/blog-fr/ordre-au-marche-vs-ordre-limite.md:113` | fr | "passez le **carnet d'ordres** du marché à la limite avant chaque entrée" | "switch the order ticket from market to limit before every entry" |
| `src/content/blog-fr/ordres-stop-loss-explique.md:96` | fr | "les niveaux de stop-loss et de take-profit sur le **carnet d'ordres** de `/fr/simulator/`" | "on the `/simulator` order ticket" |
| `src/content/blog-fr/quest-ce-qu-un-simulateur-boursier.md:92` | fr | "un **carnet d'ordres** se moque de l'origine du chiffre" | "an order ticket does not care where the number came from" |

**False-friend sweep (2026-10-16, all 8 locales):** searched for es "libro de órdenes", pt "livro de ofertas/ordens", fr "carnet d'ordres" (including the `'`-escaped form in JS strings), it "order book/libro degli ordini", de "Orderbuch", ja 「板」「オーダーブック」, ko "호가창/오더북". Every other hit describes a real market's order book, which is correct. Only de and fr use the term for Stockade's own panel (15 lines above). **Replacements reuse each locale's existing wording:** de "Order-Panel" (`blog-de/oco-und-bracket-orders.md:102`) for "order panel" and "Order-Ticket" (`blog-de/market-order-vs-limit-order.md:113`, `stop-loss-orders-erklaert.md:96`) for "order ticket"; fr "panneau d'ordres" (`blog-fr/ordres-oco-et-bracket.md:102`) for both.

**Code:** "Orderbuch" and "carnet d'ordres" are the standard terms for an exchange **order book**, the resting bids and offers at each price. Stockade has no order book or market depth: one generated price per tick. The English says order *panel*/*ticket*, the form you enter orders in. de and fr already use "Orderbuch" and "carnet d'ordres" correctly for real markets on their `/simulator/` limitations list (de `:73`, `:79`; fr `:82`), which is the meaning that makes these lines an overclaim. The de and fr `index.astro:47` and de `:59` lines are FAQ answers (#3, #10), so they are also FAQPage JSON-LD.

### 12. ja only: 「ヒストリカルなプライスアクション」 ("historical price action") — **No** (added 2026-10-16 during the fix pass)

| File | Locale | Sentence (claim part) | English source |
|---|---|---|---|
| `src/pages/ja/about.astro:51` | ja | 「**ヒストリカルなプライスアクション**でテクニカル分析を練習できる」チャートリプレイツール | "for practicing technical analysis on **historical-style** price action" |

**Code:** the chart simulator replays **generated** candles (`ChartSimulator.tsx` `generateCandles`), not historical data. English says "historical-style", and es/pt/fr/it/de/ko all keep the "-style" qualifier ("de estilo histórico", "em estilo histórico", "de style historique", "in stile storico", "historisch anmutender", "과거 데이터풍의"). ja drops it, which claims real historical data.

### 13. FAQ "Is Stockade a paper trading or day trading simulator?": "stream live prices" — **Partly** (added 2026-10-16 by the dist/ leftover-word sweep)

| File | Locale | Sentence (claim part) |
|---|---|---|
| `src/pages/index.astro:31` | en | "… or **stream live prices** at 800ms ticks (day trading)" |
| `src/pages/{es,pt,fr,it,de,ja,ko}/index.astro:31` | all 7 | es "transmite precios en vivo"; pt "acompanhe preços ao vivo"; fr "suivez des prix en direct"; it "seguire i prezzi in diretta"; de "folgen Sie Live-Kursen"; ja 「ライブ価格を追いかける」; ko "실시간 시세를 스트리밍" (row 8) |

**Code:** the 800 ms ticks are generated in the browser. Next to "prices", "live" reads as live market data, the same ambiguity as ko 실시간 시세. This answer is also FAQPage JSON-LD. The sweep also checked the SoftwareApplication JSON-LD (`description`, `featureList`) in all 8 locales, which already say "simulated candlestick charts" and make no realism claim.

### 14. fr, de, ko: "800ms live ticks" rendered as live market quotes — **Partly** (added 2026-10-16 by the dist/ leftover-word sweep)

| File | Locale | Sentence (claim part) | English source |
|---|---|---|---|
| `src/pages/fr/about.astro` (Live & replay card) | fr | "Des **cotations en direct** toutes les 800 ms pour un entraînement en temps réel" | "800ms live ticks for real-time practice" |
| `src/pages/fr/markets.astro` | fr | "Pour des **cotations en direct** toutes les 800 ms, utilisez le …" | "For 800ms live ticks, use the Trading Simulator." |
| `src/pages/de/about.astro` (Live & replay card) | de | "**Live-Kursupdates** alle 800 ms für Echtzeit-Übung" | "800ms live ticks for real-time practice" |
| `src/pages/de/markets.astro` | de | "Für **Live-Kursupdates** alle 800 ms nutzen Sie den …" | "For 800ms live ticks, use the Trading Simulator." |
| `src/pages/ko/about.astro` (Live & replay card) | ko | "실시간 연습을 위한 800밀리초 **시세 갱신**" | "800ms live ticks for real-time practice" |

**Code:** same as rows 8 and 13. "Cotations", "Kurse" and 시세 are market *quotes*, so "live quotes" reads as a live data feed. The ticks are generated in the browser. es/pt/it/ja keep "ticks", which describes the simulator accurately.

### 15. Sentences the /simulator/ limitations list now contradicts (added 2026-10-16, after the list gained margin, shorting, hours and volatility items)

Found by re-reading every English page and post for Stockade-specific behaviour claims, then locating each one's counterpart in the 7 translations. The English is fixed in `cc56250` (E1-E9), `052d74d` (the E4/E9 wick correction below) and `7da17fe` (E10). The 7 translations followed on 2026-10-16, one commit per locale (es, pt, fr, de, it, ja, ko), each translating the final English and fixing E10.

| # | English (file:line) | Claim | Code / limitations list | Counterparts |
|---|---|---|---|---|
| E1 | `src/pages/about.astro:52` | "too simplistic to **reflect how actual markets behave**" | Implies Stockade reflects real market behaviour; it uses one random-walk model and none of the list's market mechanics | es `about.astro:53`, pt `:52`, fr `:48`, it `:52`, de `:48`, ja `:47`, ko `:47` |
| E2 | `blog/what-is-a-stock-market-simulator.md:12` | "a price chart that **moves the way a market moves**" | Random walk, one volatility model, no gaps or hours | the explainer intro in all 7 (es/fr/de/ko `:12`, pt `:18`, it `:12`, ja `:12`) |
| E3 | same post `:16` | "the tools built around them — charts, orders, account math — **work the way they do at a broker**" | No margin, simplified shorting, levels instead of resting stop orders | the intro sentence written in the realism pass, all 7 |
| E4 | same post `:16` | "What they do is ***behave* like market data** — … volume that shifts from bar to bar, and **the long wicks that make real charts awkward to read**" | Volume is a uniform random draw unrelated to the candle (`understanding-trading-volume.md:93`). Each wick is a random fraction of the body: up to 1× (history) or 0.8× (replay, chart simulator), and on about 12–15% of wicks up to 2.2–2.5× (`TradingSimulator.tsx:91-93, :115-117`; `ChartSimulator.tsx:319-321`). Live wicks are the running high/low of 800 ms ticks. Long wicks are occasional and capped, not modelled on real charts | es `:17`, pt `:27`, fr/it/de/ja/ko `:16` |
| E5 | same post `:16` | "The account math … **follows the same arithmetic your broker uses**" | Same arithmetic for P&L and equity, but no margin requirement and no collateral for shorts | all 7, same paragraph |
| E6 | same post `:38` | "**Stockade supports all five**" (after defining stop-loss and take-profit as resting orders) | Stop-loss and take-profit are levels on the open position, not separate resting orders | es `:39`, pt `:72`, fr/it/de/ja/ko `:38` |
| E7 | same post `:66` | "Live mode moves at 800ms ticks, **closer to the real pace** and the real pressure" | Tick rate is a fixed 800 ms timer, not a market's pace | es `:67`, pt `:127`, fr/it/de/ja/ko `:66` |
| E8 | same post `:90` | "Commissions, spreads, borrowing costs, and taxes are **not modelled the way your specific broker will apply them**" | Implies they are modelled in some form; none of them is modelled at all | es `:91`, pt `:173`, fr/it/de/ja/ko `:90` |
| E9 | `blog/how-to-read-candlestick-charts.md:109` | "the OHLC structure, the wicks, and **the volume behave the way real chart structure behaves**" | Volume is random and unrelated to the candle; wicks are random fractions of the body (see E4) | es `como-leer-graficos-de-velas.md:110`, pt `como-ler-graficos-de-candles.md:182`, fr/it/de/ja/ko `:109` |
| E10 | `src/pages/index.astro:257` (home feature card) | "**Instant Order Fills** — Market, limit, stop-loss, take-profit, and OCO bracket orders **executed instantly**" (added 2026-10-16 by the translation pass's leftover sweep) | Only market orders, and marketable limits, fill at once. A non-marketable limit rests in Working Orders until price reaches it, and stop-loss and take-profit are levels that close the position when a tick crosses them (`/simulator/` how-to and limitations list). Same claim as row 3's FAQ "the simulator fills them instantly", which was fixed; the card was missed | `{es,pt,fr,de,ja,ko}/index.astro:254`, it `:259` |

**Correction to the E4/E9 fix (2026-10-16, before translation):** `cc56250` said every wick is a random fraction of the body. That holds for the loaded history and replay only; a live candle's wicks are the running high/low of its 800 ms ticks (`TradingSimulator.tsx:283-284`). Both English sentences now say so, and the translations carry the corrected wording.

Checked and kept: "realistic-looking price action" (`common-day-trading-mistakes.md:108`, hedged), "Fills here carry almost no friction" and similar limitation statements in the posts (accurate), and the home "realism" paragraph (tooling).

### 16. The market-vs-limit post says limit orders never rest (added 2026-10-17, found by the pre-deploy stale-copy sweep)

`src/content/blog/market-orders-vs-limit-orders.md:20`: "A limit order **fills immediately at whatever price you type into the box** — it does not wait for the market to reach your level, it does not queue, and it never goes unfilled." This predates resting limits. Now a marketable limit fills at once at the prevailing price, and any other limit rests in Working Orders until price reaches it, then fills at the limit price (verified-facts table, "Limit order"). Same class as E10. It wasn't caught earlier because the row-15 sweep looked for real-market claims, not order-handling claims.

The fix keeps the rest of the paragraph and replaces only that sentence: "A limit order that is already marketable fills at once at the prevailing price; otherwise it rests until price reaches your level and then fills in full at your limit price. It never queues behind other orders and never fills partially." One commit per locale. Counterparts: es `ordenes-de-mercado-vs-ordenes-limite.md:21`, pt `ordens-a-mercado-vs-ordens-limitadas.md` (wrapped, same paragraph), fr `ordre-au-marche-vs-ordre-limite.md:20`, it `ordini-a-mercato-vs-ordini-a-limite.md:20`, de `market-order-vs-limit-order.md:20`, ja `nariyuki-vs-sashine.md:20`, ko `sijangga-jumun-dae-jijeongga-jumun.md:20`.

Checked and kept in the same post: the section heading (the post's problem is spread and slippage, which Stockade still doesn't model) and ":113" "Stockade's fills are perfect, so you cannot practice paying a spread there" (the claim is about the spread).

### 17. Old limit-order behaviour sweep: the explainer says every order fills instantly (added 2026-10-17)

A sweep of all 8 locales after row 16, for any other sentence describing the pre-resting behaviour (limit orders fill immediately, at the typed price, never wait or go unfilled). It covered pages (including FAQ, which is also the FAQPage JSON-LD), blog posts (body and frontmatter `title`/`description`, which feed the meta tags and Article JSON-LD), `ui.ts` and the islands, with each locale's immediacy words (en instantly/immediately/at once/never wait; es al instante/de inmediato; pt instantaneamente/imediatamente; fr instantanément/immédiatement; de sofort/unmittelbar; it istantaneamente/immediatamente/all'istante/subito; ja 即座/即時/すぐ; ko 즉시/바로) filtered to order and fill context.

| # | English (file:line) | Claim | Code | Counterparts |
|---|---|---|---|---|
| L1 | `src/content/blog/what-is-a-stock-market-simulator.md:88` | "**Your order fills at the price you see, instantly, in full**; only stop and target exits slip, by the tick that crossed your level." | Only a market order, or a marketable limit, fills at once. Any other limit rests in Working Orders until price reaches it, then fills at the limit price (verified-facts table, "Limit order"). The paragraph dates from `92382d1` (2026-08-10), two days before resting limits landed in `4dfce19`. Same class as row 16 | es `que-es-un-simulador-de-mercado-de-valores.md:89`, pt `o-que-e-um-simulador-de-mercado-de-acoes.md:172-173` (wrapped), fr `quest-ce-qu-un-simulateur-boursier.md:88`, de `was-ist-ein-boersensimulator.md:88`, it `cosa-e-un-simulatore-di-mercato-azionario.md:88`, ja `kabushiki-shijou-simulator-toha.md:88`, ko `jusik-sijang-simyulleiteo-ran.md:88` |

**Fix:** replace only that sentence, reusing row 16's wording: "A market order fills at the price you see, instantly and in full. A limit order that is already marketable fills at once at the prevailing price; otherwise it rests until price reaches your level and then fills in full at your limit price. Only stop and target exits slip, by the tick that crossed your level." Each locale reuses its own row-16 sentence (itself built from that locale's `/simulator/` how-to). One commit per locale.

**Checked and kept:**
- The home FAQ "How does a stock market simulator work?" ("limit orders wait until price reaches them"), the FAQ limitations answer ("at their limit price"), the home "Market & Limit Orders" card (row E10's fix) and the `/simulator/` how-to, in all 8 locales: they already describe resting limits.
- The `/simulator/` limitations bullet "**No partial fills.** Orders fill in full and instantly, whatever the size" and its 7 counterparts. It was written in `4dfce19`, the commit that introduced resting limits, and the next bullet ("No queue position. A resting limit order fills the moment price reaches its level") covers resting; "instantly" there contrasts with a large order filling in pieces over time.
- Generic definitions of a market order ("fills immediately at the best price available") and of a marketable limit in the market-vs-limit posts: they describe real markets.
- The `TradingSimulator` toast "Limit … filled immediately at …": it only fires for a marketable limit.

### 18. The analytics post says the time heatmap is coloured by win rate (added 2026-10-17)

| # | English (file:line) | Claim | Code | Counterparts |
|---|---|---|---|---|
| H1 | `src/content/blog/analyze-trading-performance-metrics.md:151-153` | "colours each cell by **win rate** in that slot: **green at 65% and above, red below 50%**, neutral between … Hover a cell for its trade count." | `AnalyticsDashboard.tsx` `heatBg()` colours a cell by the sign of its **net P&L** (green > 0, red < 0, neutral at 0); the number printed in the cell is the win rate, and the hover title gives trade count, win rate and net P&L. There are no 65%/50% thresholds. The code comment says why: colouring by win rate would paint hours with small wins and large losses green. The in-app legend (`analytics.heatmap.legend`) already says "Colour = net P&L · Number = win rate" | es `analiza-tus-metricas-de-rendimiento.md:99`, pt `analise-suas-metricas-de-desempenho.md:156-159` (wrapped), fr `analyser-ses-performances-de-trading.md:97`, de `trading-performance-analysieren.md:98`, it `analizzare-le-metriche-di-performance-di-trading.md:98`, ja `pafomansu-shihyo-no-bunseki.md:97`, ko `teureiding-seonggwa-jipyo-bunseok.md:97` |
| H2 | same post, `:156` | "Cells colour on win rate only, so a green cell can still be a money-losing hour" | Inverted by H1's code: colour is net P&L, so the caution now runs the other way (a high win rate on a red cell) | same files, the next paragraph (es `:101`, pt `:161-163`, fr `:99`, de `:100`, it `:100`, ja `:99`, ko `:99`) |
| H3 | same post, `:159` | "The hours are your browser's local time" | Cells bucket each trade by `getUTCDay()` / `getUTCHours()` of its **close** time, so hours are UTC; the legend says "Hours are UTC" | last sentence of the same paragraph in all 7 |
| H4 | same post, `:16` | "a **win-rate-by-hour** heatmap" (intro) | Same as H1 | intro paragraph in all 7 (es `:13`, pt `:17`, fr `:12`, de `:12`, it `:12`, ja `:12`, ko `:12`); ko also in its meta `description` ("시간대별 승률 히트맵", `:3`) |

**Fix:** describe what the code does, reusing each locale's in-app legend wording (`analytics.heatmap.legend`): colour = net P&L, number = win rate, hover = trade count, win rate and net P&L, hours in UTC by close time. The H2 caution is rewritten to read colour and number together (a red cell at 75% is three small wins outweighed by one large loss). The intro and the ko meta description drop "win rate". Where a locale's copy names the tab, it now uses the tab label that locale's dashboard shows since the short tab labels landed (es/pt "Mapa de calor", fr "Carte de chaleur", de/it "Heatmap", ja 「ヒートマップ」, ko 「시간대별 히트맵」; en keeps "Time Heatmap"), and the same goes for the equity tab and for the "Overview tab" the post credits with the losing-trade count: the dashboard has no tab by that name, the count sits under the first tab (en "Equity Curve", es/pt "Capital", fr "Équité", de "Equity-Kurve", it "Capitale", ja 「資産曲線」, ko 자본 곡선). The es and pt journal column lists say "Lado" where the dashboard header reads "Dirección"/"Direção"; they follow the dashboard. Titles are unchanged; the ko description gets shorter. One commit for en, then one per locale.

**Checked and kept:** the other heatmap mentions on the site (home feature card and "realism" paragraph, about page, `/analytics/` "Time heatmap" section in all 8 locales, which already says net P&L, and the paper-trading-guide, day-vs-swing and what-is-a-simulator posts with their counterparts) describe the heatmap without saying what colours it. Separately noted, not part of this row: several of those mentions list "average win and loss", but the dashboard shows Avg Win only.

### 19. TradingSimulator UI strings, checked before the Phase A step 4 translation (added 2026-10-17)

Every English string in `TradingSimulator.tsx` and `TradingChart.tsx` (about 60, inventoried for Phase A step 4) was compared with the verified-facts table in `2026-10-16-realism-claims-fixes.md`. **No label implies a bid/ask, market depth, an order book, real-time quotes or real fills.** The order panel says "Order", the resting list "Working Orders", and the toasts say "filled", "resting" and "cancelled" of the simulator's own orders. "LIVE" is qualified by its tooltip "Live simulation — prices tick in real time", already listed as accurate under "Checked and supported" (prices do tick on the wall clock, every 800 ms). Translations must keep the "simulation" qualifier.

Not realism claims, but inaccurate, and found in the same pass. Line numbers are as of `c8a969d`.

| # | String (file:line) | Problem | Code | Status |
|---|---|---|---|---|
| T1 | "Qty (shares)" (`TradingSimulator.tsx:617`) | The unit is "shares" for all 29 symbols, including the 8 crypto tokens, 3 forex pairs and 4 futures | Quantity is a bare multiplier: P&L = price change × qty, no contract multiplier (facts table) | Open. A fix would be "Qty" or "Qty (units)" in all 8 locales at once; es translates the English as it stands ("Cantidad (acciones)") until then |
| T2 | "{symbol} · 1M" in the price panel and chart overlay (`:592`, `:964`) | Says 1-minute candles. True for the loaded history and for replay, but in live mode a new candle starts every **10 s** | `generateCandles` spaces history 60 s apart; the live loop opens a candle every 10 000 ms (`:291`) | Open. Not a translated string |
| T3 | `/simulator/` "Reading the interface" paragraph, all 8 locales (en `simulator.astro:58-63`) | Mentions "timeframe buttons", which do not exist, and puts the EMA toggles in the top bar (they sit on the chart). Calls the right-hand panel a "running log of every fill", but on desktop the trade log is in the left column, and it lists closing fills only: opening a position adds no row | No timeframe control in either component; `setTrades` is called only when a position closes or shrinks | Open. Page copy, not an island string; es keeps it in this pass, apart from its tab names |

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

## Final leftover-word sweep (dist/, after all 8 locales were fixed)

Run on 2026-10-16 against the built `dist/` after the pt/fr/de/it/ja/ko commits. It covers:
- every `index.html` in each locale: visible text, every JSON-LD string (FAQPage, SoftwareApplication `description`/`featureList`, Article), and `description`/`og:*`/`twitter:*` meta;
- the words realistic/realism, real brokerage, real market conditions, real volatility, real-time, live data/market/feed/prices, actual platform, replicate/mirror/modeled on, and their es/pt/fr/it/de/ja/ko equivalents.

**Result: 178 hits, 0 overclaims left.** Each hit is classified below against the verified-facts table in `2026-10-16-realism-claims-fixes.md`.

Two items are kept as non-claims:
- the home "realism" paragraph (all 8 locales): it defines realism as the tooling, which Stockade has;
- en about's "too simplistic to reflect how actual markets behave": project motivation, not a product claim.

| Locale | File | Where | Sentence | Verdict |
|---|---|---|---|---|
| en | `about/index.html` | text | The project started as a way to practice trading strategies without financial risk, after finding that most existing simulators were either paywalled, cluttered with real-money bro… | borderline — project motivation, not a product claim (kept) |
| en | `about/index.html` | text | All trading data — tickers, prices, and market movement — is simulated rather than pulled from real markets, and this is stated clearly wherever it could otherwise be mistaken for … | true — states prices are generated / not from a live feed |
| en | `about/index.html` | text | Live & replay modes 800ms live ticks for real-time practice, or step through a full session candle-by-candle at your own pace. | true — real-time ticks of the simulator (generated in real time) |
| en | `blog/common-day-trading-mistakes/index.html` | text | Stockade’s prices are synthetic, generated in your browser rather than sourced from any exchange, so you are practicing procedure against realistic-looking price action, not market… | true — states prices are generated / not from a live feed |
| en | `blog/day-trading-vs-swing-trading/index.html` | text | Three losses before 10:30 leaves you sitting in front of a live market with the means to act on your frustration, and revenge trading is the direct result. | true — about real time pressure / deciding in real time, not data |
| en | `blog/futures-trading-explained/index.html` | text | Stockade Team · July 27, 2026 · 8 min read On this page On this page A futures contract is an obligation, not a share of ownership Contract specifications: multiplier, tick size, a… | n/a — page chrome / table of contents / related-posts text |
| en | `blog/futures-trading-explained/index.html` | text | Micro contracts as the realistic entry point for small accounts Micro contracts are one-tenth of their E-mini parent, and for most retail accounts they are the only defensible star… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| en | `blog/futures-trading-explained/index.html` | text | Keep learning Analytics How to Analyze Trading Performance: Metrics That Matter Psychology Common Day Trading Mistakes and How to Avoid Them Risk Management Risk Management 101: Po… | n/a — page chrome / table of contents / related-posts text |
| en | `blog/oco-and-bracket-orders/index.html` | text | Now you are deciding in real time, with money on the line, whether this is the top or the start of something — and the version of you making that call is not the calm version who f… | true — negation / stated limitation |
| en | `blog/paper-trading-guide/index.html` | text | Stockade’s live mode ticks every 800ms, fast enough to create real time pressure instead of five minutes of deliberation over a three-second decision. | true — real-time ticks of the simulator (generated in real time) |
| en | `blog/what-is-a-stock-market-simulator/index.html` | text | Be clear on the data: Stockade’s prices are generated algorithmically, not pulled from an exchange, and there is no live feed behind them. | true — states prices are generated / not from a live feed |
| en | `blog/what-is-a-stock-market-simulator/index.html` | text | The price data is generated, so it contains no actual market behaviour. | true — states prices are generated / not from a live feed |
| en | `disclaimer/index.html` | text | Unlike actual trading, simulated results do not account for real-world factors such as: Market liquidity and slippage Brokerage commissions, spreads, and fees Psychological pressur… | true — legal page, hedged disclaimer (legal pages out of scope) |
| en | `disclaimer/index.html` | text | A strategy that performs well in a simulator may perform significantly differently — or produce losses — when applied to live markets with real money. | true — legal page, hedged disclaimer (legal pages out of scope) |
| en | `disclaimer/index.html` | text | Stockade accepts no responsibility for any real financial losses incurred by users who apply strategies or techniques practised within the simulator to live markets. | true — legal page, hedged disclaimer (legal pages out of scope) |
| en | `disclaimer/index.html` | text | Accuracy of Information While we strive to provide an accurate and realistic simulation experience, Stockade makes no representations or warranties about the accuracy, completeness… | true — legal page, hedged disclaimer (legal pages out of scope) |
| en | `disclaimer/index.html` | text | Price data, market mechanics, and asset behaviour within the simulator are approximations and may differ materially from real market conditions. | true — legal page, hedged disclaimer (legal pages out of scope) |
| en | `index.html` | ld:text | Its prices are generated in your browser rather than pulled from a live market feed, and it does not model spreads, margin, or partial fills. | true — states prices are generated / not from a live feed |
| en | `index.html` | ld:text | What carries over is how the tools work — candlestick charts, market and limit orders, stop-loss and take-profit levels, and the P&L arithmetic behind your account — although fills… | true — negation / stated limitation |
| en | `index.html` | ld:text | Stockade's prices are randomly generated rather than taken from a live market feed, and its fills are simpler than a real exchange's: there is no bid-ask spread, no commission, no … | true — states prices are generated / not from a live feed |
| en | `index.html` | ld:text | It also cannot replicate the psychological pressure of risking real capital. | true — negation / stated limitation |
| en | `index.html` | ld:text | Think of it as a training ground for process — entries, exits, and sizing — while emotional discipline develops further in live markets. | true — about real time pressure / deciding in real time, not data |
| en | `index.html` | text | Why most trading games fall flat A lot of simulators optimize for engagement instead of realism. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| en | `index.html` | text | They strip out the indicators, the order types, and the risk metrics, and what's left is a game about watching a number go up — fun for an afternoon, and it teaches you almost noth… | true — negation / stated limitation |
| en | `simulator/index.html` | text | The 3 forex pairs and 4 futures symbols are named after real instruments, but none of their prices comes from that instrument's market: every price is synthetic data generated in y… | true — the new verified symbol sentence |
| en | `terms/index.html` | text | Any resemblance to actual market movements is coincidental. | true — legal page, hedged disclaimer (legal pages out of scope) |
| es | `es/about/index.html` | text | Todos los datos de trading — tickers, precios y movimiento de mercado — son simulados en lugar de provenir de mercados reales, y esto se indica claramente en cualquier lugar donde … | true — states prices are generated / not from a live feed |
| es | `es/about/index.html` | text | Modos en vivo y repetición Ticks en vivo de 800ms para práctica en tiempo real, o avanza por una sesión completa vela por vela a tu propio ritmo. | true — real-time ticks of the simulator (generated in real time) |
| es | `es/blog/day-trading-vs-swing-trading/index.html` | text | Tres pérdidas antes de las 10:30 te deja sentado frente a un mercado en vivo con los medios para actuar sobre tu frustración, y el revenge trading es el resultado directo. | true — about real time pressure / deciding in real time, not data |
| es | `es/blog/errores-comunes-de-day-trading/index.html` | text | Los precios de Stockade son sintéticos, generados en tu navegador en lugar de provenir de algún exchange, así que estás practicando el procedimiento contra una acción de precio de … | true — states prices are generated / not from a live feed |
| es | `es/blog/guia-de-paper-trading/index.html` | text | El modo en vivo de Stockade actualiza cada 800ms, lo bastante rápido para crear presión de tiempo real en lugar de cinco minutos deliberando una decisión de tres segundos. | true — real-time ticks of the simulator (generated in real time) |
| es | `es/blog/ordenes-de-mercado-vs-ordenes-limite/index.html` | text | Lleva ese reflejo a una plataforma real y el spread será lo único nuevo que aprender. | true — refers to the reader's future real platform/broker |
| es | `es/blog/ordenes-oco-y-bracket/index.html` | text | Ahora estás decidiendo en tiempo real, con dinero en juego, si esto es el techo o el inicio de algo — y la versión de ti que toma esa decisión no es la versión tranquila que encont… | true — negation / stated limitation |
| es | `es/blog/trading-de-cripto-para-principiantes/index.html` | text | Lo que los mercados cripto no te dan Sé realista sobre la infraestructura que falta. | true — negation / stated limitation |
| es | `es/blog/trading-de-futuros-explicado/index.html` | text | Stockade Team · 27 de julio de 2026 · 9 min de lectura En esta página En esta página Un contrato de futuros es una obligación, no una participación de propiedad Especificaciones de… | n/a — page chrome / table of contents / related-posts text |
| es | `es/blog/trading-de-futuros-explicado/index.html` | text | Los micro contratos como el punto de entrada realista para cuentas pequeñas Los micro contratos son una décima parte de su padre E-mini, y para la mayoría de las cuentas minoristas… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| es | `es/blog/trading-de-futuros-explicado/index.html` | text | Sigue aprendiendo Análisis Cómo Analizar tu Rendimiento de Trading: Métricas Clave Psicología Errores Comunes de Day Trading y Cómo Evitarlos Gestión de Riesgo Gestión de Riesgo 10… | n/a — page chrome / table of contents / related-posts text |
| es | `es/disclaimer/index.html` | text | A diferencia del trading real, los resultados simulados no tienen en cuenta factores del mundo real como: Liquidez del mercado y slippage Comisiones, spreads y cargos del bróker La… | true — legal page, hedged disclaimer (legal pages out of scope) |
| es | `es/disclaimer/index.html` | text | Precisión de la Información Aunque nos esforzamos por ofrecer una experiencia de simulación precisa y realista, Stockade no hace representaciones ni garantías sobre la precisión, i… | true — legal page, hedged disclaimer (legal pages out of scope) |
| es | `es/disclaimer/index.html` | text | Los datos de precios, la mecánica de mercado y el comportamiento de los activos dentro del simulador son aproximaciones y pueden diferir materialmente de las condiciones reales del… | true — legal page, hedged disclaimer (legal pages out of scope) |
| es | `es/index.html` | ld:text | Sus precios se generan en tu navegador en lugar de obtenerse de un feed de mercado en vivo, y no modela spreads, margen ni ejecuciones parciales. | true — negation / stated limitation |
| es | `es/index.html` | ld:text | Lo que se transfiere es cómo funcionan las herramientas — gráficos de velas, órdenes de mercado y límite, niveles de stop-loss y take-profit, y la aritmética de ganancias y pérdida… | true — refers to the reader's future real platform/broker |
| es | `es/index.html` | ld:text | Los precios de Stockade se generan aleatoriamente en lugar de obtenerse de un feed de mercado en vivo, y sus ejecuciones son más simples que las de un exchange real: no hay spread … | true — negation / stated limitation |
| es | `es/index.html` | ld:text | Tampoco puede replicar la presión psicológica de arriesgar capital real. | true — negation / stated limitation |
| es | `es/index.html` | text | Por qué la mayoría de los juegos de trading se quedan cortos Muchos simuladores priorizan el enganche por encima del realismo. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| es | `es/index.html` | text | Eliminan los indicadores, los tipos de órdenes y las métricas de riesgo, y lo que queda es un juego sobre ver un número subir — divertido por una tarde, pero que no te enseña casi … | true — negation / stated limitation |
| es | `es/index.html` | text | La idea es que los hábitos que desarrolles aquí sigan funcionando cuando pases a una plataforma real — consulta la guía de paper trading para saber cómo hacer que esa transición se… | true — refers to the reader's future real platform/broker |
| es | `es/markets/index.html` | text | Si prefieres ver la acción del precio desarrollarse vela por vela antes de comprometerte con una lectura, el Simulador de Gráficos reproduce las mismas clases de activo barra por b… | true — replay of a generated session ("reproduce/replays") |
| pt | `pt/about/index.html` | text | Todos os dados de trading — tickers, preços e movimentação de mercado — são simulados em vez de vindos de mercados reais, e isso é declarado claramente em qualquer lugar onde poder… | true — states prices are generated / not from a live feed |
| pt | `pt/about/index.html` | text | Modos ao vivo e repetição Ticks ao vivo de 800ms para prática em tempo real, ou avance por uma sessão completa vela por vela no seu próprio ritmo. | true — negation / stated limitation |
| pt | `pt/blog/day-trading-vs-swing-trading/index.html` | text | Três perdas antes das 10h30 te deixam sentado na frente de um mercado ao vivo com os meios para agir sobre sua frustração, e o trade de vingança é a consequência direta. | true — about real time pressure / deciding in real time, not data |
| pt | `pt/blog/erros-comuns-de-day-trading/index.html` | text | O que um simulador não consegue fazer é reproduzir a pressão que causa esses erros. | true — negation / stated limitation |
| pt | `pt/blog/erros-comuns-de-day-trading/index.html` | text | Os preços da Stockade são sintéticos, gerados no seu navegador em vez de vindos de qualquer exchange, então você está praticando procedimento contra uma ação de preço que parece re… | true — states prices are generated / not from a live feed |
| pt | `pt/blog/guia-de-paper-trading/index.html` | text | O modo ao vivo da Stockade atualiza a cada 800ms, rápido o suficiente para criar pressão de tempo real em vez de cinco minutos deliberando sobre uma decisão de três segundos. | true — real-time ticks of the simulator (generated in real time) |
| pt | `pt/blog/o-que-e-um-simulador-de-mercado-de-acoes/index.html` | text | Os preços gerados também não reproduzem a personalidade real de instrumentos do mundo real: um único modelo de volatilidade roda em todo símbolo. | true — states prices are generated / not from a live feed |
| pt | `pt/blog/o-que-e-um-simulador-de-mercado-de-acoes/index.html` | text | Para prática deliberada, o Simulador de Gráficos reproduz uma sessão de gráfico candle por candle, então você avança uma barra de cada vez sem saber o que vem a seguir. | true — replay of a generated session ("reproduce/replays") |
| pt | `pt/blog/ordens-a-mercado-vs-ordens-limitadas/index.html` | text | Stockade Team · 11 de maio de 2026 · 9 min de leitura Nesta página Nesta página A Stockade não consegue reproduzir o problema que este artigo descreve O que cada tipo de ordem real… | n/a — page chrome / table of contents / related-posts text |
| pt | `pt/blog/ordens-a-mercado-vs-ordens-limitadas/index.html` | text | A Stockade não consegue reproduzir o problema que este artigo descreve Isso vai logo no início, não numa nota de rodapé. | true — negation / stated limitation |
| pt | `pt/blog/ordens-a-mercado-vs-ordens-limitadas/index.html` | text | Leve esse reflexo para uma plataforma real e o spread será a única coisa nova para aprender. | true — refers to the reader's future real platform/broker |
| pt | `pt/blog/ordens-a-mercado-vs-ordens-limitadas/index.html` | text | Continue aprendendo Cripto Trading de Cripto para Iniciantes: Como Funcionam os Mercados de Ativos Digitais Forex Introdução ao Trading de Forex: Pares de Moedas e Pips Explicados … | n/a — page chrome / table of contents / related-posts text |
| pt | `pt/blog/ordens-oco-e-bracket/index.html` | text | Agora você está decidindo em tempo real, com dinheiro em jogo, se isso é o topo ou o começo de algo — e a versão de você tomando essa decisão não é a versão calma que encontrou o s… | true — negation / stated limitation |
| pt | `pt/blog/suporte-e-resistencia/index.html` | text | O simulador de gráficos da Stockade reproduz uma sessão gerada para frente candle por candle, então você pode marcar uma zona a partir das máximas e mínimas de oscilação na tela, d… | true — states prices are generated / not from a live feed |
| pt | `pt/blog/trading-de-cripto-para-iniciantes/index.html` | text | O que os mercados cripto não te dão Seja realista sobre a infraestrutura que falta. | true — negation / stated limitation |
| pt | `pt/blog/trading-de-futuros-explicado/index.html` | text | Stockade Team · 27 de julho de 2026 · 9 min de leitura Nesta página Nesta página Um contrato futuro é uma obrigação, não uma fração de propriedade Especificações do contrato: multi… | n/a — page chrome / table of contents / related-posts text |
| pt | `pt/blog/trading-de-futuros-explicado/index.html` | text | Contratos micro como o ponto de entrada realista para contas pequenas Contratos micro são um décimo do seu contrato E-mini pai, e para a maioria das contas de varejo são o único ta… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| pt | `pt/blog/trading-de-futuros-explicado/index.html` | text | Continue aprendendo Análises Como Analisar Seu Desempenho de Trading: Métricas-Chave Psicologia Erros Comuns de Day Trading e Como Evitá-los Gestão de Risco Gestão de Risco 101: Di… | n/a — page chrome / table of contents / related-posts text |
| pt | `pt/disclaimer/index.html` | text | Diferentemente do trading real, os resultados simulados não levam em conta fatores do mundo real, como: Liquidez de mercado e slippage Comissões, spreads e taxas de corretagem Pres… | true — legal page, hedged disclaimer (legal pages out of scope) |
| pt | `pt/disclaimer/index.html` | text | Precisão das Informações Embora nos esforcemos para oferecer uma experiência de simulação precisa e realista, Stockade não faz nenhuma declaração ou garantia sobre a precisão, inte… | true — legal page, hedged disclaimer (legal pages out of scope) |
| pt | `pt/disclaimer/index.html` | text | Os dados de preços, a mecânica de mercado e o comportamento dos ativos dentro do simulador são aproximações e podem diferir substancialmente das condições reais de mercado. | true — legal page, hedged disclaimer (legal pages out of scope) |
| pt | `pt/index.html` | ld:text | Seus preços são gerados no seu navegador em vez de virem de um feed de mercado ao vivo, e ele não modela spreads, margem nem execuções parciais. | true — states prices are generated / not from a live feed |
| pt | `pt/index.html` | ld:text | O que se transfere é como as ferramentas funcionam — gráficos de candles, ordens a mercado e limitadas, níveis de stop-loss e take-profit, e a aritmética de lucro e prejuízo da sua… | true — refers to the reader's future real platform/broker |
| pt | `pt/index.html` | ld:text | Os preços do Stockade são gerados aleatoriamente em vez de virem de um feed de mercado ao vivo, e suas execuções são mais simples que as de uma exchange real: não há spread entre c… | true — states prices are generated / not from a live feed |
| pt | `pt/index.html` | ld:text | Também não é capaz de replicar a pressão psicológica de arriscar capital real. | true — negation / stated limitation |
| pt | `pt/index.html` | text | Por que a maioria dos jogos de trading decepciona Muitos simuladores priorizam o engajamento em vez do realismo. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| pt | `pt/index.html` | text | Eles cortam os indicadores, os tipos de ordem e as métricas de risco, e o que sobra é um jogo sobre ver um número subir — divertido por uma tarde, mas que não ensina quase nada que… | true — negation / stated limitation |
| pt | `pt/index.html` | text | A ideia é que os hábitos que você desenvolve aqui continuem funcionando quando você migrar para uma plataforma real — veja o guia de paper trading para saber como fazer essa transi… | true — refers to the reader's future real platform/broker |
| fr | `fr/about/index.html` | text | Toutes les données de trading — cours, prix et mouvements de marché — sont simulées plutôt qu'issues des marchés réels, et cela est indiqué clairement partout où cela pourrait être… | true — states prices are generated / not from a live feed |
| fr | `fr/about/index.html` | text | Modes direct et relecture Des ticks simulés toutes les 800 ms pour un entraînement en temps réel, ou avancez chandelier par chandelier à votre propre rythme. | true — real-time ticks of the simulator (generated in real time) |
| fr | `fr/blog/day-trading-contre-swing-trading/index.html` | text | Trois pertes avant 10h30 vous laissent assis devant un marché en direct avec les moyens d’agir sur votre frustration, et le trading de vengeance en est le résultat direct. | true — about real time pressure / deciding in real time, not data |
| fr | `fr/blog/erreurs-courantes-en-day-trading/index.html` | text | Ce qu’un simulateur ne peut pas faire, c’est reproduire la pression qui cause ces erreurs. | true — negation / stated limitation |
| fr | `fr/blog/erreurs-courantes-en-day-trading/index.html` | text | Les prix de Stockade sont synthétiques, générés dans votre navigateur plutôt que provenant d’une bourse quelconque, donc vous pratiquez une procédure face à une action de prix d’ap… | true — states prices are generated / not from a live feed |
| fr | `fr/blog/ordre-au-marche-vs-ordre-limite/index.html` | text | Stockade Team · 11 mai 2026 · 9 min de lecture Sur cette page Sur cette page Stockade ne peut pas reproduire le problème que cet article décrit Ce que chaque type d’ordre instruit … | n/a — page chrome / table of contents / related-posts text |
| fr | `fr/blog/ordre-au-marche-vs-ordre-limite/index.html` | text | Stockade ne peut pas reproduire le problème que cet article décrit Ceci doit être dit d’emblée, pas en note de bas de page. | true — negation / stated limitation |
| fr | `fr/blog/ordre-au-marche-vs-ordre-limite/index.html` | text | Continuer l'apprentissage Cryptomonnaies Trading Crypto pour Débutants : Comment Fonctionnent les Marchés d'Actifs Numériques Forex Introduction au Trading Forex : Paires de Devise… | n/a — page chrome / table of contents / related-posts text |
| fr | `fr/blog/ordres-oco-et-bracket/index.html` | text | Vous décidez maintenant en temps réel, avec de l’argent en jeu, s’il s’agit du sommet ou du début de quelque chose — et la version de vous qui prend cette décision n’est pas la ver… | true — about real time pressure / deciding in real time, not data |
| fr | `fr/blog/quest-ce-qu-un-simulateur-boursier/index.html` | text | Les prix générés ne reproduisent pas non plus la personnalité propre à chaque instrument réel : un seul modèle de volatilité s’applique à tous les symboles. | true — states prices are generated / not from a live feed |
| fr | `fr/blog/trading-de-contrats-a-terme-explique/index.html` | text | Stockade Team · 27 juillet 2026 · 10 min de lecture Sur cette page Sur cette page Un contrat à terme est une obligation, pas une part de propriété Spécifications du contrat : multi… | n/a — page chrome / table of contents / related-posts text |
| fr | `fr/blog/trading-de-contrats-a-terme-explique/index.html` | text | Les micro-contrats comme point d’entrée réaliste pour les petits comptes Les micro-contrats valent un dixième de leur parent E-mini, et pour la plupart des comptes particuliers, il… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| fr | `fr/blog/trading-de-contrats-a-terme-explique/index.html` | text | Continuer l'apprentissage Analyses Analyser Ses Performances de Trading : Indicateurs Clés Psychologie Erreurs Courantes en Day Trading et Comment les Éviter Gestion du Risque Gest… | n/a — page chrome / table of contents / related-posts text |
| fr | `fr/disclaimer/index.html` | text | Contrairement au trading réel, les résultats simulés ne tiennent pas compte de facteurs concrets tels que : La liquidité du marché et le slippage Les commissions, spreads et frais … | true — legal page, hedged disclaimer (legal pages out of scope) |
| fr | `fr/disclaimer/index.html` | text | Exactitude des Informations Bien que nous nous efforcions d'offrir une expérience de simulation précise et réaliste, Stockade ne fait aucune déclaration ni garantie quant à l'exact… | true — legal page, hedged disclaimer (legal pages out of scope) |
| fr | `fr/disclaimer/index.html` | text | Les données de prix, les mécanismes de marché et le comportement des actifs au sein du simulateur sont des approximations et peuvent différer sensiblement des conditions réelles du… | true — legal page, hedged disclaimer (legal pages out of scope) |
| fr | `fr/index.html` | ld:text | Ses prix sont générés dans votre navigateur plutôt qu'issus d'un flux de marché en direct, et il ne modélise ni les spreads, ni la marge, ni les exécutions partielles. | true — states prices are generated / not from a live feed |
| fr | `fr/index.html` | ld:text | Les prix de Stockade sont générés aléatoirement plutôt qu'issus d'un flux de marché en direct, et ses exécutions sont plus simples que celles d'une vraie bourse : pas de spread bid… | true — states prices are generated / not from a live feed |
| fr | `fr/index.html` | ld:text | Il ne peut pas non plus reproduire la pression psychologique liée à la mise en jeu de capital réel. | true — negation / stated limitation |
| fr | `fr/index.html` | text | Pourquoi la plupart des jeux de trading tombent à plat Beaucoup de simulateurs sont optimisés pour l'engagement plutôt que pour le réalisme. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| fr | `fr/index.html` | text | L'idée est que les habitudes que vous développez ici restent valables lorsque vous passez à une plateforme réelle — voir le guide du paper trading pour savoir comment faire durer c… | true — refers to the reader's future real platform/broker |
| fr | `fr/simulator/index.html` | text | APXL · 1M $ 187.42 + 0.0527 ( +0.03% ) Order market limit Qty (shares) Stop Loss Take Profit BUY [B] SELL [S] FLATTEN [F] Equity $100,000.00 P&L +$0.00 Win Rate 0% Reset Balance to… | n/a — page chrome / table of contents / related-posts text |
| it | `it/about/index.html` | text | Tutti i dati di trading — ticker, prezzi e movimenti di mercato — sono simulati e non provengono da mercati reali, e questo viene dichiarato chiaramente ovunque potrebbe essere sca… | true — states prices are generated / not from a live feed |
| it | `it/about/index.html` | text | Dove una funzione presenta limiti reali — ad esempio, il simulatore al momento non riproduce lo slippage o le esecuzioni parziali come farebbe una borsa reale — questo viene indica… | true — negation / stated limitation |
| it | `it/about/index.html` | text | Modalità live e replay Tick in tempo reale ogni 800ms per la pratica dal vivo, oppure scorri un'intera sessione candela per candela al tuo ritmo. | true — real-time ticks of the simulator (generated in real time) |
| it | `it/blog/cosa-e-un-simulatore-di-mercato-azionario/index.html` | text | I prezzi generati non riproducono nemmeno la personalità reale degli strumenti: un unico modello di volatilità gira su ogni simbolo. | true — states prices are generated / not from a live feed |
| it | `it/blog/cosa-e-un-simulatore-di-mercato-azionario/index.html` | text | Per la pratica deliberata, il Chart Simulator riproduce una sessione di grafico candela per candela, così avanzi di una barra alla volta senza sapere cosa viene dopo. | true — replay of a generated session ("reproduce/replays") |
| it | `it/blog/errori-comuni-nel-day-trading/index.html` | text | Quello che un simulatore non può fare è riprodurre la pressione che causa questi errori. | true — negation / stated limitation |
| it | `it/blog/errori-comuni-nel-day-trading/index.html` | text | I prezzi di Stockade sono sintetici, generati nel tuo browser anziché provenire da una borsa, quindi stai esercitando la procedura contro un andamento dei prezzi dall’aspetto reali… | true — states prices are generated / not from a live feed |
| it | `it/blog/livelli-di-supporto-e-resistenza/index.html` | text | Il chart simulator di Stockade riproduce una sessione generata in avanti candela per candela, così puoi segnare una zona dai massimi e minimi di oscillazione sullo schermo, poi gua… | true — states prices are generated / not from a live feed |
| it | `it/blog/ordini-a-mercato-vs-ordini-a-limite/index.html` | text | Stockade Team · 11 maggio 2026 · 9 min di lettura In questa pagina In questa pagina Stockade non può riprodurre il problema descritto in questo articolo Cosa ordina davvero al tuo … | n/a — page chrome / table of contents / related-posts text |
| it | `it/blog/ordini-a-mercato-vs-ordini-a-limite/index.html` | text | Stockade non può riprodurre il problema descritto in questo articolo Questo va detto subito, non in una nota a piè di pagina. | true — negation / stated limitation |
| it | `it/blog/ordini-a-mercato-vs-ordini-a-limite/index.html` | text | Continua a imparare Crypto Trading di Criptovalute per Principianti: Come Funzionano i Mercati Digitali Forex Introduzione al Trading Forex: Coppie di Valute e Pip Spiegati Basi Pa… | n/a — page chrome / table of contents / related-posts text |
| it | `it/blog/ordini-oco-e-bracket/index.html` | text | Ora stai decidendo in tempo reale, con denaro in gioco, se questo è il massimo o l’inizio di qualcosa — e la versione di te che sta prendendo quella decisione non è la versione cal… | true — negation / stated limitation |
| it | `it/blog/trading-di-futures-spiegato/index.html` | text | Stockade Team · 27 luglio 2026 · 9 min di lettura In questa pagina In questa pagina Un contratto future è un obbligo, non una quota di proprietà Specifiche del contratto: moltiplic… | n/a — page chrome / table of contents / related-posts text |
| it | `it/blog/trading-di-futures-spiegato/index.html` | text | I contratti micro come punto d’ingresso realistico per i piccoli conti I contratti micro sono un decimo del loro genitore E-mini, e per la maggior parte dei conti retail sono l’uni… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| it | `it/blog/trading-di-futures-spiegato/index.html` | text | Continua a imparare Analisi Analizzare le Performance di Trading: le Metriche Chiave Psicologia Errori Comuni nel Day Trading e Come Evitarli Gestione del Rischio Gestione del Risc… | n/a — page chrome / table of contents / related-posts text |
| it | `it/blog/trading-forex-per-principianti/index.html` | text | Nulla è quotato da un mercato, e quei prezzi base sono punti di partenza fissi, non tassi in tempo reale. | true — negation / stated limitation |
| it | `it/disclaimer/index.html` | text | A differenza del trading reale, i risultati simulati non tengono conto di fattori del mondo reale come: Liquidità di mercato e slippage Commissioni, spread e costi del broker Press… | true — legal page, hedged disclaimer (legal pages out of scope) |
| it | `it/disclaimer/index.html` | text | Accuratezza delle Informazioni Sebbene ci impegniamo a offrire un'esperienza di simulazione accurata e realistica, Stockade non rilascia alcuna dichiarazione o garanzia sull'accura… | true — legal page, hedged disclaimer (legal pages out of scope) |
| it | `it/index.html` | ld:text | I suoi prezzi sono generati nel browser anziché provenire da un feed di mercato in tempo reale, e non modella spread, margine né esecuzioni parziali. | true — states prices are generated / not from a live feed |
| it | `it/index.html` | ld:text | Ciò che si trasferisce è il funzionamento degli strumenti — grafici a candele, ordini a mercato e a limite, livelli di stop-loss e take-profit e l'aritmetica del P&L del tuo conto … | true — refers to the reader's future real platform/broker |
| it | `it/index.html` | ld:text | I prezzi di Stockade sono generati casualmente anziché provenire da un feed di mercato in tempo reale, e le sue esecuzioni sono più semplici di quelle di una borsa reale: nessuno s… | true — states prices are generated / not from a live feed |
| it | `it/index.html` | text | Perché la maggior parte dei giochi di trading delude Molti simulatori puntano sul coinvolgimento invece che sul realismo. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| it | `it/index.html` | text | Eliminano gli indicatori, i tipi di ordine e le metriche di rischio, e ciò che resta è un gioco in cui si guarda un numero salire — divertente per un pomeriggio, ma che insegna qua… | true — negation / stated limitation |
| it | `it/markets/index.html` | text | Per tick in tempo reale ogni 800ms, usa il Simulatore di Trading . | true — real-time ticks of the simulator (generated in real time) |
| it | `it/simulator/index.html` | text | Stockade Simulatore di Trading Simulatore di Grafici Mercati Analisi Impara Live English Español Português 日本語 Français Deutsch 한국어 Italiano Inizia a Fare Trading Simulatore di Tra… | n/a — page chrome / table of contents / related-posts text |
| it | `it/simulator/index.html` | text | APXL · 1M $ 187.42 0.2145 ( -0.11% ) Order market limit Qty (shares) Stop Loss Take Profit BUY [B] SELL [S] FLATTEN [F] Equity $100,000.00 P&L +$0.00 Win Rate 0% Reset Balance to $… | n/a — page chrome / table of contents / related-posts text |
| it | `it/simulator/index.html` | text | Cosa questo simulatore non riproduce Le esecuzioni qui sono più semplici di quelle di una borsa reale, ed è utile sapere esattamente in che modo prima di dare troppo peso a un risu… | true — negation / stated limitation |
| it | `it/simulator/index.html` | text | Le 3 coppie forex e i 4 simboli futures portano i nomi di strumenti reali, ma nessuno dei loro prezzi proviene dal mercato di quello strumento: tutti i prezzi sono dati sintetici g… | true — the new verified symbol sentence |
| de | `de/about/index.html` | text | Alle Handelsdaten — Kurse, Preise und Marktbewegungen — sind simuliert und stammen nicht von echten Märkten; dies wird überall dort klar angegeben, wo eine Verwechslung mit Live-Da… | true — states prices are generated / not from a live feed |
| de | `de/about/index.html` | text | Live- und Wiedergabemodus Simulierte Kursupdates alle 800 ms für Echtzeit-Übung, oder Kerze für Kerze in Ihrem eigenen Tempo. | true — real-time ticks of the simulator (generated in real time) |
| de | `de/blog/forex-trading-fuer-einsteiger/index.html` | text | Nichts wird von einem Markt notiert, und diese Basispreise sind fixe Startpunkte, keine Live-Kurse. | true — negation / stated limitation |
| de | `de/blog/futures-trading-erklaert/index.html` | text | Lesezeit Auf dieser Seite Auf dieser Seite Ein Futures-Kontrakt ist eine Verpflichtung, kein Eigentumsanteil Kontraktspezifikationen: Multiplikator, Tick-Größe und Tick-Wert Warum … | n/a — page chrome / table of contents / related-posts text |
| de | `de/blog/futures-trading-erklaert/index.html` | text | Mikro-Kontrakte als realistischer Einstiegspunkt für kleine Konten Mikro-Kontrakte sind ein Zehntel ihres E-mini-Elternkontrakts, und für die meisten Retail-Konten sind sie die ein… | true — unrelated ("realistic" entry point for micro contracts; "be realistic") |
| de | `de/blog/futures-trading-erklaert/index.html` | text | Weiterlernen Analysen Trading-Performance analysieren: Kennzahlen, die zählen Psychologie Häufige Day-Trading-Fehler und wie Sie sie vermeiden Risikomanagement Risikomanagement 101… | n/a — page chrome / table of contents / related-posts text |
| de | `de/blog/haeufige-day-trading-fehler/index.html` | text | Stockades Kurse sind synthetisch, in Ihrem Browser generiert statt von einer Börse bezogen, sodass Sie Prozedur gegen realistisch aussehende Kursbewegung üben, nicht Markthistorie. | true — states prices are generated / not from a live feed |
| de | `de/blog/market-order-vs-limit-order/index.html` | text | Lesezeit Auf dieser Seite Auf dieser Seite Stockade kann das in diesem Artikel beschriebene Problem nicht nachbilden Was jeder Ordertyp Ihrem Broker tatsächlich anweist Der Komprom… | n/a — page chrome / table of contents / related-posts text |
| de | `de/blog/market-order-vs-limit-order/index.html` | text | Stockade kann das in diesem Artikel beschriebene Problem nicht nachbilden Das gehört an den Anfang, nicht in eine Fußnote. | true — negation / stated limitation |
| de | `de/blog/market-order-vs-limit-order/index.html` | text | Weiterlernen Krypto Krypto-Trading für Einsteiger: Wie digitale Asset-Märkte funktionieren Forex Einführung ins Forex-Trading: Währungspaare und Pips erklärt Grundlagen Paper Tradi… | n/a — page chrome / table of contents / related-posts text |
| de | `de/blog/oco-und-bracket-orders/index.html` | text | Jetzt entscheiden Sie in Echtzeit, mit Geld im Spiel, ob das der Höhepunkt ist oder der Beginn von etwas — und die Version von Ihnen, die diese Entscheidung trifft, ist nicht die r… | true — negation / stated limitation |
| de | `de/disclaimer/index.html` | text | Anders als der reale Handel berücksichtigen simulierte Ergebnisse keine realen Faktoren wie: Marktliquidität und Slippage Broker-Kommissionen, Spreads und Gebühren Psychologischer … | true — legal page, hedged disclaimer (legal pages out of scope) |
| de | `de/disclaimer/index.html` | text | Genauigkeit der Informationen Obwohl wir uns um eine genaue und realistische Simulationserfahrung bemühen, macht Stockade keine Zusicherungen oder Gewährleistungen hinsichtlich der… | true — legal page, hedged disclaimer (legal pages out of scope) |
| de | `de/index.html` | ld:text | Was sich überträgt, ist die Funktionsweise der Werkzeuge — Candlestick-Charts, Market- und Limit-Orders, Stop-Loss- und Take-Profit-Stände und die P&L-Arithmetik Ihres Kontos —, au… | true — refers to the reader's future real platform/broker |
| de | `de/index.html` | text | Warum die meisten Trading-Spiele enttäuschen Viele Simulatoren sind auf Engagement statt auf Realismus optimiert. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| de | `de/index.html` | text | Sie verzichten auf Indikatoren, Ordertypen und Risikokennzahlen, sodass übrig bleibt, wie man einer steigenden Zahl zusieht — für einen Nachmittag unterhaltsam, aber es lehrt kaum … | true — refers to the reader's future real platform/broker |
| de | `de/index.html` | text | Der Gedanke: Die Gewohnheiten, die Sie hier entwickeln, sollen auch auf einer echten Plattform Bestand haben — siehe den Paper-Trading-Leitfaden , um diesen Übergang reibungslos zu… | true — refers to the reader's future real platform/broker |
| de | `de/simulator/index.html` | text | APXL · 1M $ 187.42 + 0.5731 ( +0.31% ) Order market limit Qty (shares) Stop Loss Take Profit BUY [B] SELL [S] FLATTEN [F] Equity $100,000.00 P&L +$0.00 Win Rate 0% Reset Balance to… | n/a — page chrome / table of contents / related-posts text |
| ja | `ja/about/index.html` | text | ライブモードとリプレイモード リアルタイム練習には800ミリ秒間隔のライブティック、または自分のペースでセッション全体をローソク足ごとに進めることもできます。 | true — real-time ticks of the simulator (generated in real time) |
| ja | `ja/analytics/index.html` | text | 最終地点よりも、その形の方が重要です — 安定した右肩上がりは再現性のあるプロセスを示し、平坦な線が1〜2回の大きな跳躍で中断されているような形は、多くの場合運によるものです。 | true — replay of a generated session ("reproduce/replays") |
| ja | `ja/blog/kabushiki-shijou-simulator-toha/index.html` | text | 生成された価格は、実世界の銘柄ごとの個性を再現していません: 単一のボラティリティモデルがすべての銘柄に適用されています。 | true — states prices are generated / not from a live feed |
| ja | `ja/blog/nariyuki-vs-sashine/index.html` | text | Stockade Team · 2026年5月11日 · 1 分で読了 このページの内容 このページの内容 Stockadeはこの記事が説明する問題を再現できない それぞれの注文タイプが証券会社に実際に指示すること 他のすべてが導かれる、そのトレードオフ 買い気配・売り気配のスプレッドと、成行注文がエントリーで損をする理由 スリッページと、それを悪化させる条… | n/a — page chrome / table of contents / related-posts text |
| ja | `ja/blog/nariyuki-vs-sashine/index.html` | text | Stockadeはこの記事が説明する問題を再現できない これは脚注ではなく、冒頭に書くべきことです。 | true — negation / stated limitation |
| ja | `ja/blog/nariyuki-vs-sashine/index.html` | text | その反射神経を実際のプラットフォームに持ち込めば、スプレッドだけが新しく学ぶべきことになります。 | true — refers to the reader's future real platform/broker |
| ja | `ja/blog/nariyuki-vs-sashine/index.html` | text | 学習を続ける 暗号資産 初心者のための暗号資産トレード: デジタル資産マーケットの仕組み FX FXトレード入門: 通貨ペアとpipsの解説 基礎 ペーパートレーディング: 実際のお金をリスクにさらさずに練習する方法 このページの内容 Stockadeはこの記事が説明する問題を再現できない それぞれの注文タイプが証券会社に実際に指示すること 他のすべてが導か… | n/a — page chrome / table of contents / related-posts text |
| ja | `ja/blog/oco-bracket-chuumon-no-kaisetsu/index.html` | text | 今、あなたはお金を賭けたままリアルタイムで、これが天井なのか、それとも何かの始まりなのかを決めています — そして、その判断を下しているのは、そのセットアップを見つけた冷静なバージョンのあなたではありません。 | true — negation / stated limitation |
| ja | `ja/blog/yokuaru-deitoreedo-no-machigai/index.html` | text | シミュレーターにできないのは、これらの間違いを引き起こすプレッシャーを再現することです。 | true — negation / stated limitation |
| ja | `ja/blog/yokuaru-deitoreedo-no-machigai/index.html` | text | Stockadeの価格は合成されたものであり、どの取引所からでもなくあなたのブラウザ内で生成されているため、あなたはマーケットの履歴ではなく、リアルに見える値動きに対して手順を練習しています。 | true — states prices are generated / not from a live feed |
| ja | `ja/disclaimer/index.html` | text | 実際のトレーディングとは異なり、シミュレーション結果は次のような現実世界の要因を考慮していません: 市場の流動性とスリッページ 証券会社の手数料、スプレッド、諸費用 実際の資金で取引することによる心理的プレッシャー 約定の遅延、部分約定、注文の拒否 リアルタイムの価格発見と市場インパクト 過去のシミュレーション実績は、将来の実際の結果を示すものではありません… | true — legal page, hedged disclaimer (legal pages out of scope) |
| ja | `ja/disclaimer/index.html` | text | 情報の正確性 私たちは正確でリアルなシミュレーション体験を提供するよう努めていますが、Stockadeは本プラットフォーム上の情報や資料の正確性、完全性、適合性について、いかなる表明も保証も行いません。 | true — legal page, hedged disclaimer (legal pages out of scope) |
| ja | `ja/index.html` | ld:text | 価格はライブの市場フィードから取得したものではなくブラウザ内で生成されたもので、スプレッド、証拠金、部分約定は再現していません。 | true — states prices are generated / not from a live feed |
| ja | `ja/index.html` | ld:text | そのまま通用するのはツールの使い方 — ローソク足チャート、成行・指値注文、逆指値・利益確定の水準、口座の損益計算 — ですが、約定は実際の証券会社より単純で、スプレッド、手数料、部分約定はありません。 | true — negation / stated limitation |
| ja | `ja/index.html` | ld:text | Stockadeの価格はライブの市場フィードではなくランダムに生成されたもので、約定も実際の取引所より単純です: スプレッド、手数料、証拠金、部分約定はありません。 | true — states prices are generated / not from a live feed |
| ja | `ja/index.html` | ld:text | 実際の資金を危険にさらす心理的プレッシャーも再現できません。 | true — negation / stated limitation |
| ja | `ja/index.html` | text | インジケーターも注文タイプもリスク指標も削ぎ落とされ、残るのは数字が上がっていくのを眺めるだけのゲーム — 午後の暇つぶしにはなっても、実際の証券会社で通用することはほとんど学べません。 | true — negation / stated limitation |
| ja | `ja/index.html` | text | ここで身につけた習慣が、実際のプラットフォームに切り替えても通用することが重要です — その移行を定着させる方法は ペーパートレーディングガイド をご覧ください。 | true — refers to the reader's future real platform/broker |
| ja | `ja/simulator/index.html` | text | APXL · 1M $ 187.42 0.0280 ( -0.01% ) Order market limit Qty (shares) Stop Loss Take Profit BUY [B] SELL [S] FLATTEN [F] Equity $100,000.00 P&L +$0.00 Win Rate 0% Reset Balance to $… | n/a — page chrome / table of contents / related-posts text |
| ko | `ko/blog/deiteureiding-heunhan-silsu/index.html` | text | 시뮬레이터가 할 수 없는 것은 이 실수들을 일으키는 압박을 재현하는 것입니다. | true — negation / stated limitation |
| ko | `ko/blog/jusik-sijang-simyulleiteo-ran/index.html` | text | 생성된 가격은 또한 실제 종목의 개성을 재현하지 않습니다. | true — states prices are generated / not from a live feed |
| ko | `ko/blog/oehwan-teureiding-ipmun/index.html` | text | 포지션 사이징 공식 은 여기서도 동일하게 작동합니다. | true — "same/equally" in an unrelated sense |
| ko | `ko/blog/oehwan-teureiding-ipmun/index.html` | text | 그리고 캔들 대 캔들 변동성은 사이트의 모든 종목에 걸쳐 동일하게 각 종목 기준 가격의 고정된 비율이므로, 그곳의 EUR/USD는 실제 메이저 페어가 보이는 특유의 작은 백분율 움직임을 보이지 않습니다. | true — negation / stated limitation |
| ko | `ko/blog/sijangga-jumun-dae-jijeongga-jumun/index.html` | text | Stockade Team · 2026년 5월 11일 · 6 분 읽기 이 페이지에서 이 페이지에서 Stockade는 이 글이 설명하는 문제를 재현할 수 없습니다 각 주문 유형이 실제로 브로커에게 지시하는 것 나머지 모든 것이 흘러나오는 트레이드오프 매수·매도 호가 스프레드, 그리고 시장가 주문이 진입에서 비용을 치르는 이유… | n/a — page chrome / table of contents / related-posts text |
| ko | `ko/blog/sijangga-jumun-dae-jijeongga-jumun/index.html` | text | Stockade는 이 글이 설명하는 문제를 재현할 수 없습니다 이것은 각주가 아니라 맨 앞에서 말해야 합니다. | true — negation / stated limitation |
| ko | `ko/blog/sijangga-jumun-dae-jijeongga-jumun/index.html` | text | 그 반사 신경을 실제 플랫폼으로 가져가면 스프레드만이 새로 배울 유일한 것이 될 것입니다. | true — refers to the reader's future real platform/broker |
| ko | `ko/blog/sijangga-jumun-dae-jijeongga-jumun/index.html` | text | 계속 학습하기 암호화폐 암호화폐 트레이딩 입문: 디지털 자산 시장은 어떻게 움직이는가 외환 외환 트레이딩 입문: 통화쌍과 핍 이해하기 기초 모의투자 가이드: 실제 돈 없이 연습하는 법 이 페이지에서 Stockade는 이 글이 설명하는 문제를 재현할 수 없습니다 각 주문 유형이 실제로 브로커에게 지시하는 것 나머지 모든 것… | n/a — page chrome / table of contents / related-posts text |
| ko | `ko/blog/vwap-teureiding-jeollyak/index.html` | text | 거래량만 자리를 바꾼 같은 가격들 아홉 개의 가격 값을 모두 동일하게 유지하되 2번 봉과 3번 봉의 거래량을 바꿔서 2번 봉이 80,000주, 3번 봉이 300,000주를 거래했다고 합시다. | true — "same/equally" in an unrelated sense |
| ko | `ko/disclaimer/index.html` | text | 시뮬레이터 내의 가격 데이터, 시장 메커니즘, 자산의 움직임은 근사치이며 실제 시장 상황과 상당히 다를 수 있습니다. | true — legal page, hedged disclaimer (legal pages out of scope) |
| ko | `ko/index.html` | ld:text | 그대로 통하는 것은 도구의 작동 방식입니다 — 캔들스틱 차트, 시장가·지정가 주문, 손절매·익절 수준, 계좌의 손익 계산 — 다만 체결은 실제 증권사보다 단순해서 스프레드, 수수료, 부분 체결이 없습니다. | true — negation / stated limitation |
| ko | `ko/index.html` | ld:text | 또한 실제 자본을 거는 데서 오는 심리적 압박을 재현할 수는 없습니다. | true — negation / stated limitation |
| ko | `ko/index.html` | text | 대부분의 트레이딩 게임이 실망스러운 이유 많은 시뮬레이터는 사실성보다 몰입도를 우선시합니다. | subjective — "realism" defined as tooling (indicators, order types, risk metrics) |
| ko | `ko/index.html` | text | 지표, 주문 유형, 리스크 지표를 생략한 채 숫자가 올라가는 것을 지켜보는 게임만 남기는데, 오후 한나절은 재미있을지 몰라도 실제 증권사와 마주했을 때 살아남는 것은 거의 가르쳐주지 못합니다. | true — negation / stated limitation |
| ko | `ko/index.html` | text | 여기서 기른 습관이 실제 플랫폼으로 옮겨가도 그대로 통하게 만드는 것이 목표입니다 — 이 전환을 매끄럽게 만드는 방법은 모의투자 가이드 를 참고하세요. | true — refers to the reader's future real platform/broker |
