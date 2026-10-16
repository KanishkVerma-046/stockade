# Realism-claim fixes: verified facts and replacement copy

Written 2026-10-16. Fixes the rows of `2026-10-16-realism-claims-audit.md`. Every replacement sentence below is based only on the facts in the first table, which were re-read from the code for this pass.

## Verified engine facts

Sources: `src/components/trading/TradingSimulator.tsx` (TS), `src/components/markets/MarketsView.tsx` (MV), `src/components/chartsimulator/ChartSimulator.tsx` (CS), `src/lib/limit-orders.ts`, and the "What this simulator does not model" list in `src/pages/simulator.astro`.

| Topic | Verified fact | Source |
|---|---|---|
| Price model | Prices are **randomly generated in the browser**: a random walk with a slowly drifting trend bias, starting from a hard-coded price per symbol (or the last price saved in localStorage). No feed, no exchange, no historical data. | TS `generateCandles` :75, `generateReplaySession` :100, `getBasePrice` :128, live loop :270-296 |
| Volatility model | **One model for every symbol.** Moves scale with price: 0.7% of price for the loaded history, 0.8% per replay candle, 0.5% per live tick, with no per-asset-class setting. The chart simulator scales only by price level (<5, <100, else), not by asset class. | TS :85, :109, :279; CS :310 |
| Tick behaviour (live) | One `setInterval` every **800 ms** updates **only the selected symbol**. The effect depends on `[symbol, mode]`. A new candle starts every 10 s and **opens at the previous close**. | TS :270-296 |
| Gaps / hours | **No market hours and no gaps.** Every symbol ticks around the clock; each candle opens where the last one closed (history, replay and live). | TS :87-95, :110, :291-293 |
| Replay | 600 one-minute candles are generated up front; you step with Space/→ or autoplay. | TS :100-125, :300-318 |
| Markets page | All 29 rows get a **separate** random step of up to ±0.1% of price every **2 s**. This is independent of the simulator's prices. | MV :136-148 |
| Market order | Fills **in full, instantly, at the last generated price**. **No spread, no commission, no slippage.** | TS `execOrder`, `fillOrder` :440 |
| Limit order | Marketable on arrival: fills at once at the prevailing price. Otherwise it **rests** and fills **at the limit price** when price reaches it. No queue position, no partial fills, no buying power reserved while resting. | TS `execOrder`, resting-fill effect; `limit-orders.ts` |
| Stop-loss / take-profit | Optional **levels on the open position**, not resting orders. When a tick crosses either one, the whole position closes **at that tick's price** (the only source of slippage), and both levels clear: an OCO bracket. | TS :329-349 |
| Margin / leverage | **None modelled.** A buy is rejected if its full cost exceeds the cash balance (no leverage). | TS `fillOrder` :~470 |
| Shorting | Selling from flat opens a short with **no balance or margin check**; the proceeds are credited to cash and equity subtracts the short's current value. **No borrow cost.** | TS `fillOrder`; equity :~570 |
| P&L | (price − average entry) × quantity, with the sign set by side. Adds average the entry price. **No contract multiplier.** | TS `fillOrder` |
| Symbols | **29**: 14 stocks with invented names (APXL, TRXL, NVOX, MXFT, VXON, GLPH, MXTA, STRX, AXMD, CNBX, RXBT, PLZM, QVNT, VORX); 8 crypto tokens with invented names (BLTC, ETHX, SLAX, XBEN, AVXL, DRLN, FLOX, NXVR); **3 forex pairs, all majors**: EUR/USD, GBP/USD, USD/JPY; **4 futures symbols named after real contracts**: /ES, /NQ, /CL, /GC. | TS `SYMBOL_GROUPS` :57; MV rows (14 + 8 + 3 + 4 = 29) |

The site's own limitations wording (`/simulator/`) is the model for new copy: "no spread and no commission", "fill in full and instantly", "synthetic data generated in your browser, never pulled from a live feed".

## English replacements

| # | Where | Before (claim part) | After |
|---|---|---|---|
| 1 | `index.astro` FAQ "What is a stock market simulator?" | "…a virtual trading platform that **replicates real market conditions** using fake money, letting you practice … right in your browser, no signup required." | "A stock market simulator is a virtual trading platform that lets you practice buying and selling stocks, crypto, forex, and futures with fake money, without financial risk. Stockade gives you $100,000 in virtual capital and professional-grade tools — candlestick charts, technical indicators, and multiple order types — right in your browser, no signup required. Its prices are generated in your browser rather than pulled from a live market feed, and it does not model spreads, margin, or partial fills." |
| 2 | FAQ "Is the stock market simulator real or fake?" | "The prices and charts use realistic simulated market data **modeled on real brokerage behavior**, so the trading mechanics, chart patterns, and order types **mirror what you'd use in an actual platform**." | "The money is fake — entirely virtual capital, starting at $100,000, so there is zero financial risk. The prices are simulated too: they are randomly generated in your browser, not pulled from any exchange. What carries over is how the tools work — candlestick charts, market and limit orders, stop-loss and take-profit levels, and the P&L arithmetic behind your account — although fills are simpler than at a real broker, with no spread, commission, or partial fills. The skill-building is genuine even though the money is not." |
| 3 | FAQ "How does a stock market simulator work?" | "Stockade generates **realistic price data** … market, limit, stop-loss, take-profit, and OCO bracket orders — and **the simulator fills them instantly**." | "Stockade generates simulated prices for 29 assets across stocks, crypto, forex, and futures. You trade from an order panel with market and limit orders, plus optional stop-loss and take-profit levels that work as an OCO bracket. Market orders fill instantly at the last price; limit orders wait until price reaches them. Your virtual P&L, equity curve, win rate, and performance metrics are tracked automatically in your browser with no account required." |
| 4 | FAQ "What are the limitations of the simulator?" | "…so exact real-world **spreads, slippage, and after-hours gaps are approximated** rather than precisely reproduced. … a training ground that covers all the technical skills…" | "Stockade's prices are randomly generated rather than taken from a live market feed, and its fills are simpler than a real exchange's: there is no bid-ask spread, no commission, no margin, and no partial fills. Orders fill in full at the price shown, or at their limit price, so the only slippage comes from a stop-loss or take-profit closing at the tick that crossed it, and prices never gap, because the simulated market has no closing hours. It also cannot replicate the psychological pressure of risking real capital. Think of it as a training ground for process — entries, exits, and sizing — while emotional discipline develops further in live markets." |
| 10 | FAQ "What is the main advantage of a simulator?" | "…and a detailed analytics dashboard — **the same environment as a real brokerage**, completely free and consequence-free." | "…and a detailed analytics dashboard — completely free and consequence-free." |
| 5 | Home "Stocks, crypto, forex, and futures in one place" | "There are 14 equity tickers with realistic price behavior, 8 crypto assets that **move with the volatility you'd expect from the real thing**, **major and minor currency pairs**, and four futures contracts — NQ, ES, CL, and GC. That range matters more than it sounds: a strategy that looks brilliant on a slow-moving equity often falls apart on a currency pair or a futures contract, and having everything on one platform makes that easy to find out." | "There are 14 stock tickers and 8 crypto tokens, all with invented names, plus three major currency pairs (EUR/USD, GBP/USD, and USD/JPY) and four futures symbols named after real contracts — NQ, ES, CL, and GC. All 29 prices are randomly generated with the same volatility model, so the range is for practicing on different price scales and quote formats, not for comparing how real asset classes behave — and with everything on one platform, switching between them takes a click." The second sentence goes too: Stockade has one volatility model, so the asset classes don't behave differently there and can't be compared. |
| 6 | Home "Two ways to practice" | "**Live mode streams six assets at once** with prices updating every 800 milliseconds, so you can…" | "Live mode ticks the symbol you are trading every 800 milliseconds, so you can…" (rest unchanged) |
| 9a | Home hero subhead | "…with **realistic** simulated market data." | "The free stock & crypto trading simulator with simulated market data." |
| 9b | Home feature card | "**Real** Candlestick Charts" | "Candlestick Charts & Indicators" (the description, which already opens "Full candlestick…", is unchanged; the indicators it lists exist) |
| 9c | `about.astro` | "with **realistic** order types (market, limit, stop-loss, OCO/bracket orders)" | "with standard order types (market and limit orders, plus stop-loss and take-profit OCO brackets)" |
| 9d | Home "realism" paragraph | "optimize for engagement instead of realism…" | **No change.** It defines realism as the tooling (indicators, order types, risk metrics), which Stockade has. |
| 7a | `what-is-a-stock-market-simulator.md` description (143 → 158 chars) | "lets you **trade real market mechanics** with virtual money" | "A stock market simulator lets you practice real order types and account math with virtual money. Here is how they work and what they can and cannot teach you." |
| 7b | same post, intro | "…both simulated and **everything built around them works the way it really works**. … The order types are the real order types. The account math … follows the same arithmetic your broker uses. What is missing is the settlement: nobody sends your order to an exchange, and no cash leaves an account." | "…both simulated, while the tools built around them — charts, orders, account math — work the way they do at a broker. … Market and limit orders work as they are defined. The account math … follows the same arithmetic your broker uses. What is missing is the market around them: there is no spread, no commission, no margin requirement and no partial fill, nobody sends your order to an exchange, and no cash leaves an account." |
| 7c | same post, next paragraph | "it is a **working model of a market** with the consequences removed" | "it is a working model of the trading workflow with the consequences removed" |
| R | `simulator.astro` limitations list | "All 29 tickers are fictional and their price movement is fake — synthetic data generated in your browser, never pulled from a live feed. **No symbol represents a real security.**" | "The 14 stock and 8 crypto tickers are invented names. The 3 forex pairs and 4 futures symbols are named after real instruments, but none of their prices comes from that instrument's market: every price is synthetic data generated in your browser, never pulled from a live feed." |
| 8 | ko only | see the ko section | |
| 11 | de, fr only | see the de/fr sections | |

The heading "Prices are generated, not real." on `/simulator/` stays.

## Per-locale log

Each locale is one commit. The dist checks for each are recorded below as it lands.

### en

- **Files:** `index.astro` (FAQ #1–#4 and #10, subhead, feature card, assets paragraph, live-mode sentence), `about.astro`, `simulator.astro`, `blog/what-is-a-stock-market-simulator.md`.
- **dist:** FAQ visible text == FAQPage JSON-LD for all 11 items. Descriptions: home 154 (unchanged), about 152 (unchanged), simulator 140 (unchanged), explainer 158 (was 143). og:description and twitter:description equal the meta description on all four. No `<title>` or frontmatter title changed. The explainer's 70-char title predates this pass; it's in `2026-10-16-blog-title-length-proposals.md`.
- **Old phrases:** none of the 14 removed phrases remain in any English page in `dist/`.

### es

- **Files:** `es/index.astro` (FAQ #1–#4 and #10, subhead, feature card, assets paragraph, live-mode sentence), `es/about.astro`, `es/simulator.astro`, `blog-es/que-es-un-simulador-de-mercado-de-valores.md`.
- **Terms reused:**
  - From the es `/simulator/` limitations list: "sin spread y sin comisión", "ejecuciones parciales", "feed en vivo".
  - From es posts: "spread entre bid y ask" (forex post), "con los nombres de los contratos reales" (futures post, `025da5e`), "panel de órdenes", "bracket OCO", "proceso — entradas, salidas, tamaño".
- **Explainer body:** the es intro had swapped in the FAQ's "replica las condiciones reales del mercado". It now translates the English intro.
- **dist:**
  - FAQ visible text == FAQPage JSON-LD (11/11). og/twitter == meta description on all four pages.
  - Explainer description 149 → 151. Home 146, simulator 151 and about 184 are unchanged.
  - No title changed. The explainer's 80-char title is pre-existing; it's in the title proposals doc.
- **Old phrases:** none of the 13 removed es phrases remain in `dist/es/`.

### es — step-5 items (`b888875`)

- **Wording:** "acciones negociadas en acciones" is fixed in both places it appeared: the es markets how-to and the ui.ts `markets.volume.all` note. Both now read "en acciones, el número de acciones negociadas; …".
- **Numbers checked against the code:** 2-second refresh, 29 = 14 + 8 + 3 + 4, default sort by Change, and market cap "—" for forex and futures. All correct; no English change needed.

## Proposed ja / ko replacements (awaiting approval)

**ja terms reused:**
- From the ja `/simulator/` list: スプレッド, 手数料, 部分約定, ライブフィード, 生成される合成データ, エントリー・エグジット・サイジング.
- From ja posts: 架空の銘柄/トークン, 実世界の名称, 単一のボラティリティモデル, 主要通貨ペア, 証拠金, OCOブラケット.

**ko terms reused:**
- From the ko `/simulator/` list: 스프레드, 수수료, 부분 체결, 실시간 피드, 합성 데이터, 진입·청산·사이징.
- From ko posts: 가상의 티커/토큰, 실제 명칭, 하나의 변동성 모델, 주요 페어, 증거금, 매수·매도 호가 스프레드, OCO 브라켓, 주문창.

| # | ja (after) | ko (after) |
|---|---|---|
| 1 FAQ | 株式市場シミュレーターとは、仮想の資金で株式・暗号資産・FX・先物の売買を金銭的リスクなしに練習できる仮想トレーディングプラットフォームです。Stockadeでは…（中略、変更なし）…すぐに利用できます。価格はライブの市場フィードから取得したものではなくブラウザ内で生成されたもので、スプレッド、証拠金、部分約定は再現していません。 | 주식 시장 시뮬레이터는 가상 자금으로 재정적 위험 없이 주식, 암호화폐, 외환, 선물의 매매를 연습할 수 있게 해주는 가상 거래 플랫폼입니다. Stockade는 …(변경 없음)… 가입도 필요 없습니다. 가격은 실시간 시장 피드에서 가져오는 것이 아니라 브라우저에서 생성되며, 스프레드, 증거금, 부분 체결은 반영하지 않습니다. |
| 2 FAQ | お金は架空のものです — …金銭的リスクはゼロです。価格もシミュレーションです: ブラウザ内でランダムに生成されており、どの取引所からも取得していません。そのまま通用するのはツールの使い方 — ローソク足チャート、成行・指値注文、逆指値・利益確定の水準、口座の損益計算 — ですが、約定は実際の証券会社より単純で、スプレッド、手数料、部分約定はありません。お金は本物ではなくても、身につくスキルは本物です。 | 자금은 가짜입니다 — …재정적 위험이 전혀 없습니다. 가격도 시뮬레이션입니다: 어떤 거래소에서도 가져오지 않고 브라우저에서 무작위로 생성됩니다. 그대로 통하는 것은 도구의 작동 방식입니다 — 캔들스틱 차트, 시장가·지정가 주문, 손절매·익절 수준, 계좌의 손익 계산 — 다만 체결은 실제 증권사보다 단순해서 스프레드, 수수료, 부분 체결이 없습니다. 자금은 가짜지만 익히는 실력은 진짜입니다. |
| 3 FAQ | Stockadeは株式・暗号資産・FX・先物の29銘柄について、シミュレーションの価格を生成します。注文パネルから成行・指値注文を出せるほか、OCOブラケットとして機能する逆指値・利益確定の水準を任意で設定できます。成行注文は直近の価格で即座に約定し、指値注文は価格がその水準に達するまで待機します。仮想の損益、…（変更なし） | Stockade는 주식, 암호화폐, 외환, 선물 등 29개 자산에 대한 시뮬레이션 가격을 생성합니다. 주문창에서 시장가·지정가 주문을 넣을 수 있고, OCO 브라켓으로 작동하는 손절매·익절 수준을 선택적으로 설정할 수 있습니다. 시장가 주문은 마지막 가격에 즉시 체결되고, 지정가 주문은 가격이 그 수준에 도달할 때까지 대기합니다. 가상 손익, …(변경 없음) |
| 4 FAQ | Stockadeの価格はライブの市場フィードではなくランダムに生成されたもので、約定も実際の取引所より単純です: スプレッド、手数料、証拠金、部分約定はありません。注文は表示された価格、または指値の価格で全量約定するため、スリッページが生じるのは逆指値・利益確定がその水準を越えたティックで決済される場合だけです。また、シミュレーション上の市場には取引時間の区切りがないため、価格がギャップを空けることもありません。実際の資金を危険にさらす心理的プレッシャーも再現できません。エントリー・エグジット・サイジングといったプロセスを練習する場と捉え、感情面の規律は実際の市場でさらに磨かれていくものと考えてください。 | Stockade의 가격은 실시간 시장 피드가 아니라 무작위로 생성되며, 체결도 실제 거래소보다 단순합니다: 매수·매도 호가 스프레드, 수수료, 증거금, 부분 체결이 없습니다. 주문은 화면에 표시된 가격이나 지정가에 전량 체결되므로, 슬리피지는 손절매나 익절이 그 수준을 넘은 틱에서 청산될 때만 생기며, 시뮬레이션 시장에는 장 마감이 없어 가격 갭도 생기지 않습니다. 또한 실제 자본을 거는 데서 오는 심리적 압박을 재현할 수는 없습니다. 진입, 청산, 사이징이라는 프로세스를 연습하는 훈련장으로 생각하시되, 감정적 규율은 실전 시장에서 더 발전한다는 점을 염두에 두세요. |
| 10 FAQ | …プロ仕様のツールを — 完全に無料かつノーリスクで利用できます。（「実際の証券会社と同じ環境で、」を削除） | …등 전문 도구를 제공합니다 — 완전 무료로, 아무 결과 없이 이용할 수 있습니다. ("실제 증권사와 동일한 환경을," 삭제) |
| 8 ko | — | FAQ:31 "800밀리초 간격의 실시간 시세를 스트리밍" → "800밀리초마다 갱신되는 시뮬레이션 가격을 스트리밍". Meta description:88 "800밀리초 실시간 시세" → "800밀리초 간격 시뮬레이션 가격" (153 → 158 chars). markets:29 "800밀리초 간격의 실시간 시세를 원하시면" → "800밀리초 간격으로 갱신되는 시뮬레이션 가격을 원하시면" |
| 9a subhead | シミュレーション相場データを使った、無料の株式・暗号資産トレーディングシミュレーター。 | 시뮬레이션 시장 데이터를 사용하는 무료 주식 &amp; 암호화폐 트레이딩 시뮬레이터입니다. |
| 9b card | ローソク足チャートとインジケーター | 캔들스틱 차트와 지표 |
| 6 live | ライブモードは取引中の銘柄を800ミリ秒ごとに更新するため、… | 실시간 모드는 거래 중인 종목의 가격을 800밀리초마다 갱신하여 … |
| 5 assets | 架空の名前の株式銘柄が14種類と暗号資産トークンが8種類、さらに3つの主要通貨ペア（EUR/USD、GBP/USD、USD/JPY）と、実在の契約にちなんだ名前の先物銘柄4つ — NQ・ES・CL・GC — があります。29銘柄の価格はすべて同じボラティリティモデルでランダムに生成されているため、この幅広さは実際の資産クラスごとの値動きの違いを比べるためではなく、さまざまな価格水準や表示形式に慣れるためのものです — そして、すべてが<a>1つのプラットフォーム</a>にあるので、切り替えはワンクリックです。 | 가상의 이름을 가진 14개 주식 종목과 8개 암호화폐 토큰, 3개 주요 통화 페어(EUR/USD, GBP/USD, USD/JPY), 그리고 실제 계약에서 이름을 딴 4개의 선물 종목(NQ, ES, CL, GC)을 제공합니다. 29개 가격은 모두 같은 변동성 모델로 무작위 생성되므로, 이 다양성은 실제 자산군의 움직임 차이를 비교하기 위한 것이 아니라 서로 다른 가격 수준과 호가 형식을 연습하기 위한 것입니다 — 그리고 모든 것이 <a>하나의 플랫폼</a>에 있어 클릭 한 번으로 전환할 수 있습니다. |
| 9c about | 標準的な注文タイプ（成行・指値注文と、逆指値・利益確定のOCOブラケット） | 표준 주문 유형(시장가·지정가 주문과 손절매·익절 OCO 브라켓) |
| 12 ja about | 「ヒストリカルなプライスアクション」→「過去データ風のプライスアクション」 (matches ko 과거 데이터풍의) | — |
| R simulator | 株式14銘柄と暗号資産8銘柄は架空の名前です。FXペア3つと先物4銘柄は実在の銘柄にちなんだ名前ですが、どの価格もその銘柄の実際の市場から取得したものではありません: すべての価格はブラウザ内で生成される合成データであり、ライブフィードから取得されることは一切ありません。 | 주식 14개와 암호화폐 8개 티커는 가상의 이름입니다. 외환 페어 3개와 선물 4개 심볼은 실제 상품에서 이름을 땄지만, 어떤 가격도 해당 상품의 실제 시장에서 오지 않습니다: 모든 가격은 브라우저에서 생성되는 합성 데이터일 뿐 실시간 피드에서 가져오지 않습니다. |
| 7a explainer description | 株式市場シミュレーターを使えば、本物の注文タイプと口座の計算を仮想資金で練習できます。その仕組みと、教えてくれること・くれないことを解説します。 | 주식 시장 시뮬레이터로 가상 자금을 써서 실제 주문 유형과 계좌 계산을 연습할 수 있습니다. 어떻게 작동하는지, 무엇을 가르쳐줄 수 있고 없는지 알아보세요. |
| 7b explainer intro | 「その周りに構築されたすべてのものが本物同様に機能する」→「その周りに構築されたツール — チャート、注文、口座の計算 — は証券会社と同じように機能する」; 「注文タイプは本物の注文タイプです。」→「成行注文と指値注文は定義どおりに機能します。」; 「欠けているのは決済です: …」→「欠けているのは、その周りの市場です: スプレッドも手数料も証拠金の要件も部分約定もなく、誰もあなたの注文を取引所に送らず、口座から現金が出ていくこともありません。」 | "그 주변에 구축된 모든 것이 실제로 작동하는 방식대로 작동하는" → "그 주변에 구축된 도구들 — 차트, 주문, 계좌 산술 — 이 증권사에서와 같은 방식으로 작동하는"; "주문 유형은 진짜 주문 유형입니다." → "시장가 주문과 지정가 주문은 정의대로 작동합니다."; "빠진 것은 정산입니다: …" → "빠진 것은 그 주변의 시장입니다: 스프레드도, 수수료도, 증거금 요건도, 부분 체결도 없고, 아무도 여러분의 주문을 거래소로 보내지 않으며, 어떤 현금도 계좌를 떠나지 않습니다." |
| 7c explainer | 「結果を取り除いたマーケットの実働モデル」→「結果を取り除いたトレーディングの作業手順の実働モデル」 | "결과가 제거된 시장의 작동하는 모형" → "결과가 제거된 트레이딩 작업 흐름의 작동하는 모형" |
| step 5 | volume post 「10以上の取引所」→「12を超える取引所」 ("more than a dozen") | — |

### pt

- **Rows fixed:** 1, 2, 3, 4, 10, 13 (FAQ), 5, 6, 9a, 9b (home), 9c (about), R (simulator), 7a–7c (explainer). The explainer paragraphs are re-wrapped at ≤104 chars, and no wrapped line starts with a markdown marker.
- **Terms:**
  - From the pt `/simulator/` list: "sem spread e sem comissão", "execuções parciais", "feed ao vivo".
  - From pt posts: "nomes do mundo real", "tokens inventados", "um único modelo de volatilidade", "processo — entradas, saídas"; "spread entre compra e venda" for bid-ask.
- **dist:**
  - FAQ == JSON-LD (11/11). og/twitter == meta on all four pages. No title changed (explainer title 69).
  - Explainer description 146 → 158. Home 143, about 159 and simulator 149 are unchanged.
- **Leftover sweep:** remaining hits on these pages are true statements (negations, "realismo" defined as tooling, real-time ticks).

### fr

- **Rows fixed:** 1–7, 9, 10, 13, R, plus **11** and **14**.
  - **Row 11 (order-book false friend):** all 9 "carnet d'ordres" lines meaning Stockade's panel now say **"panneau d'ordres"**, fr's existing term (`blog-fr/ordres-oco-et-bracket.md:102`, "Le panneau d'ordres de `/fr/simulator/`"). That's index 47/59/315/349, about 78, simulator 48, and the three blog lines.
  - "Carnet d'ordres" stays where it means a real exchange's book: simulator 82, the market-vs-limit post's "vrai carnet d'ordres", and the crypto and support/resistance posts.
  - **Row 14:** "cotations en direct" becomes "ticks simulés" (about, markets).
- **Terms:**
  - From the fr `/simulator/` list and posts: "spread bid-ask", "exécution partielle", "flux en direct", "jetons inventés", "processus — entrées, sorties, dimensionnement".
- **dist:**
  - FAQ == JSON-LD (11/11). og/twitter == meta on all pages checked. No title changed.
  - Explainer description 157 → 154.
  - Unchanged descriptions over 160: home 178, about 170, simulator 173 (report-only list).
