# Proposal: expand ja/ko meta descriptions under 150 characters

**Status: proposal only. Nothing here has been applied.** Generated 2026-10-16 from the built `dist/` after commit `1756060`. Covers the 52 ja/ko pages whose `<meta name="description">` is under 150 characters: 27 ja and 25 ko. The 120 Latin-script pages in the same audit are deliberately left alone.

**Updated 2026-10-16 after `0cdb335`:** 1 proposal applied (`/ja/blog/angoushisan-toreedo-nyumon/`), both markets proposals unblocked, both contact skips marked for revisit. See the section below.

**Result:** 50 proposals (1 applied, 49 pending), all **150–160** characters (Bing's 150–160 window, and inside the blog schema's hard 160 cap). **2 skips.**

## Rules followed

- **Real content only.** Every added phrase names a section, figure, or feature that is actually on that page. Most come straight from the post's own `##` headings, or the static page's body, so the terminology is the page's existing translation rather than new wording. Nothing is a generic SEO phrase.
- **Front-loaded for Google.** CJK characters render about twice as wide, so Google typically truncates a ja/ko snippet somewhere around character 80. In each proposal, **`｜` marks character 80**; it is a marker for review, not part of the text. Everything before it can stand alone: the core claim, plus the free / $100K / no-signup facts on app pages. Everything after is section topics that are fine to lose.
- **Existing first sentence kept wherever it was already the hook,** so Google's truncated snippet barely changes from today's.
- **Skip instead of padding.** A page is skipped when its description is already a complete sentence and the page has nothing more specific to add.

## Found while writing these: all four fixed on 2026-10-16

1. **FIXED in `28c2af0`: markets "Trade" button ignored locale.** `MarketsView.tsx` hardcoded `/simulator/?symbol=…` and an English "Trade" label, so every translated markets page sent visitors to the English simulator. The island now takes a `simulatorHref` prop (`localizedHref()`) and a localized `labels.trade`. Since `7f5a7aa`, the build also fails if any translated page links to an English URL with a localized sibling. **The ja/ko markets proposals below are unblocked.**
2. **FIXED in `520cde9`: English volume-unit note on the markets pages.** "Volume units follow each asset class — …" was English on all 7 translated markets pages, not only ja/ko. It now comes from `ui.ts` (`markets.volume.*`). The rest of the island (search placeholder, category buttons, column headers) is still English; see `2026-10-16-island-strings-audit.md`.
3. **FIXED in `6f98f20`: mistranslation in `/ja/blog/angoushisan-toreedo-nyumon/`.** The description read as crypto *having* circuit breakers; the post body was always correct. Fixed by applying this doc's proposal for that page (154 chars). The other six locales were checked and were already correct.
4. **FIXED in `0cdb335`: ja/ko contact pages had no email fallback.** It is now on all 7 translated contact pages, matching English. **That removes the reason both contact descriptions were skipped,** so they can be revisited: the email option is real content a description can mention.

## Japanese (27: 26 proposed, 1 skip)

### `/ja/`

- **Source:** `src/pages/ja/index.astro`
- **Current (72):** 無料の株式市場シミュレーター。$100,000の仮想資金でデイトレード・ペーパートレーディングを練習 — 株式、暗号資産、FX、先物。登録不要。
- **Proposed (154):** 無料の株式市場シミュレーター。$100,000の仮想資金で株式・暗号資産・FX・先物の29銘柄を使い、デイトレード・ペーパートレーディングを練習。登録不要。80｜0ミリ秒間隔のライブ価格とローソク足1本ずつのリプレイ、成行・指値・逆指値・利益確定注文、資産曲線や勝率を表示する分析ダッシュボードを備えています。

### `/ja/about/`

- **Source:** `src/pages/ja/about.astro`
- **Current (77):** 初心者向けの無料ブラウザ株式市場シミュレーターStockadeをご紹介します。リスクなしで練習したいトレーダーのために作られました。登録不要、カード不要。
- **Proposed (157):** Stockadeは、$100,000の仮想資金で株式・暗号資産・FX・先物を練習できる無料のブラウザ型ペーパートレーディングシミュレーターです。登録不要、カード｜不要。ローソク足チャート、プロ仕様のインジケーター、フル機能の注文パネル、パフォーマンス分析、ライブモードとリプレイモードを備え、永久に100%無料です。
- **Note:** Lead sentence reuses the page's own intro paragraph.

### `/ja/analytics/`

- **Source:** `src/pages/ja/analytics.astro`
- **Current (75):** 無料のStockadeシミュレーターで、資産曲線、勝率、ドローダウン指標、トレード日記を使ってペーパートレーディングのパフォーマンスを分析しましょう。
- **Proposed (156):** 無料のStockadeシミュレーターでペーパートレーディングのパフォーマンスを分析。決済済みの取引から総損益、資産、勝率、プロフィットファクター、平均利益、最大｜ドローダウンの6つの主要指標を計算し、資産曲線、トレード日記、時間帯別勝率ヒートマップで自分の得意な時間帯まで確認できます。取引データはブラウザに保存。

### `/ja/blog/`

- **Source:** `src/pages/ja/blog/index.astro`
- **Current (63):** ローソク足チャート、インジケーター、注文タイプ、リスク管理を学べる無料の詳しいガイド — 実践しながら学ぶトレーダーのために。
- **Proposed (154):** ローソク足チャート、インジケーター、注文タイプ、リスク管理を学べる無料の詳しいガイド20本。RSI・MACD・VWAP・移動平均線、成行・指値・逆指値・OCO注｜文、ポジションサイジング、トレーディングプラン、よくあるデイトレードの間違い、暗号資産・FX・先物の仕組みまで、シミュレーターですぐに実践できます。
- **Note:** "20本" is a live count: update it if a ja post is added or drafted out.

### `/ja/blog/angoushisan-toreedo-nyumon/`

- **Source:** `src/content/blog-ja/angoushisan-toreedo-nyumon.md`
- **Current (85):** 暗号資産は24時間365日、サーキットブレーカーも弱い保護も、水増しされた出来高とともに取引されます。株式と実際に何が違うのか、それに合わせたサイジング方法を解説します。
- **Proposed (154):** 暗号資産はサーキットブレーカーのないまま24時間365日取引され、保護は弱く、出来高は水増しされています。24時間取引がリスク管理を変える理由、中央集権型・分散｜型取引所、カストディと秘密鍵、時価総額と価格の違い、ステーブルコイン、ボラティリティと流動性、それに合わせたポジションのサイジング方法を解説します。
- **Note:** **APPLIED in `6f98f20`** (2026-10-16); it is the live description. It also fixed a mistranslation: the old first sentence ("サーキットブレーカーも弱い保護も…とともに") read as crypto *having* circuit breakers, while English and every other locale say it has none.

### `/ja/blog/deitoreedo-vs-suingu-toreedo/`

- **Source:** `src/content/blog-ja/deitoreedo-vs-suingu-toreedo.md`
- **Current (82):** どちらのスタイルが優れているわけでもありません。時間、資金、ギャップリスク、取引コスト、フィードバック速度が実際にどう違うのか、自分に合う方の見分け方を解説します。
- **Proposed (156):** どちらのスタイルが優れているわけでもありません。それぞれが1日に何を要求するか、時間、資金、米国のパターンデイトレーダールールと口座の最低残高、オーバーナイト・｜週末のギャップリスク、取引コスト、フィードバック速度がそれぞれあなたをどう形作るか、同じ$500のリスクでの比較と、自分に合う方の見分け方を解説します。

### `/ja/blog/dekidaka-wo-rikai-suru/`

- **Source:** `src/content/blog-ja/dekidaka-wo-rikai-suru.md`
- **Current (78):** 出来高は方向ではなく参加度を測ります。相対出来高の読み方、ブレイクアウトの裏付け、セリングクライマックスの見分け方、出来高データが嘘をつく場面を解説します。
- **Proposed (153):** 出来高は方向ではなく参加度を測ります。出来高バーが実際に数えているもの、基準なしの生の数字が無意味な理由、相対出来高の読み方、トレンドの裏付けと乖離、静かなブレ｜イクアウトが疑わしい理由、セリングクライマックス、サポート・レジスタンスでの出来高、ヒストグラムの読み方、出来高データが嘘をつく場面を解説します。

### `/ja/blog/ema-vs-sma-idou-heikinsen/`

- **Source:** `src/content/blog-ja/ema-vs-sma-idou-heikinsen.md`
- **Current (76):** SMAとEMAの違いは、たった1つの乗数です。その計算方法、9/20/50が標準である理由、サポートとしての使い方、そして常に遅行する理由を解説します。
- **Proposed (153):** SMAとEMAの違いは、たった1つの乗数です。移動平均が実際に計算しているもの、EMAがより速く反応する理由、9/20/50が標準である理由、動的なサポート・レ｜ジスタンスとしての使い方、クロスオーバー戦略とダマシ（ホイップソー）、傾きをトレンドフィルターとして読む方法、そして常に遅行する理由を解説します。

### `/ja/blog/fx-toreedo-nyumon/`

- **Source:** `src/content/blog-ja/fx-toreedo-nyumon.md`
- **Current (89):** 通貨ペアとは、一方の通貨をロングし、もう一方をショートすることを意味します。気配値の読み方、pipsとは何か、円ペアが異なる理由、FXレバレッジがなぜ痛手になるのかを解説します。
- **Proposed (156):** 通貨ペアとは、一方の通貨をロングし、もう一方をショートすることを意味します。気配値の読み方、pipsとは何か、円ペアが小数点以下2桁目を使う理由、ロットサイズと｜クオート通貨で決まるpipの価値、主なコストであるスプレッド、メジャー・マイナー・エキゾチック、FXレバレッジが株式よりはるかに危険な理由を解説します。

### `/ja/blog/kabushiki-shijou-simulator-toha/`

- **Source:** `src/content/blog-ja/kabushiki-shijou-simulator-toha.md`
- **Current (67):** 株式市場シミュレーターを使えば、仮想資金で本物の市場の仕組みを取引できます。その仕組みと、教えてくれること・くれないことを解説します。
- **Proposed (155):** 株式市場シミュレーターを使えば、仮想資金で本物の市場の仕組みを取引できます。シミュレーターとは実際には何か、あなたが本当に学びに来た仕組み、注文タイプ、実際の数｜字で見るポジションサイジング、別のスキルとしてのチャートの読み方、記憶ではなく統計で振り返る方法、教えてくれないこと、本当に役立つ使い方を解説します。

### `/ja/blog/macd-toha/`

- **Source:** `src/content/blog-ja/macd-toha.md`
- **Current (68):** MACDは2本の移動平均、その差、そして差を平滑化したものです。各要素の計算方法、読み方、そしてMACDが「嘘をつく」場面を解説します。
- **Proposed (157):** MACDは2本の移動平均、その差、そして差を平滑化したものです。MACDライン・シグナルライン・ヒストグラムの計算方法、設定が12・26・9である理由、ゼロライ｜ンとシグナルラインのクロス、ヒストグラムの読み方とその中に潜む罠、MACDダイバージェンスの価値、二重に遅行し、もみ合い相場で機能しない理由を解説します。

### `/ja/blog/nariyuki-vs-sashine/`

- **Source:** `src/content/blog-ja/nariyuki-vs-sashine.md`
- **Current (69):** 成行注文は約定を保証しますが価格は保証しません。指値注文は価格を保証しますが約定は保証しません。他のすべての考慮事項はそこから導かれます。
- **Proposed (157):** 成行注文は約定を保証しますが価格は保証しません。指値注文は価格を保証しますが約定は保証しません。他のすべての考慮事項はそこから導かれます。買い気配・売り気配のス｜プレッドで成行注文が損をする理由、スリッページ、約定可能な指値注文という中間地点、それぞれが正しい選択である場合、約定しない指値注文のコストを解説します。
- **Note:** Same extension shape as the live ko sibling.

### `/ja/blog/oco-bracket-chuumon-no-kaisetsu/`

- **Source:** `src/content/blog-ja/oco-bracket-chuumon-no-kaisetsu.md`
- **Current (81):** OCO・ブラケット注文が、どちらかが約定すればもう一方がキャンセルされるようにストップとターゲットを連結する仕組みと、初心者が犯しがちな数量の間違いを解説します。
- **Proposed (150):** OCO・ブラケット注文が、どちらかが約定すればもう一方がキャンセルされるようにストップとターゲットを連結する仕組みを、187.40で500株ロングの実例で解説。｜エントリー前に配置することが心理的に重要な理由、部分約定後の数量のミスマッチ、注文が画面より長生きすることなど初心者の間違いも取り上げます。

### `/ja/blog/peipa-toreido-gaido/`

- **Source:** `src/content/blog-ja/peipa-toreido-gaido.md`
- **Current (71):** ほとんどのペーパートレーディングは何も生み出しません。練習セッションの組み立て方、思考の記録方法、本当に上達しているかを測る方法を解説します。
- **Proposed (151):** ほとんどのペーパートレーディングは何も生み出しません。その理由と、1回の練習セッションの組み立て方、すべての取引で書き留めるべきこと、結果ではなく判断の質による｜レビュー、進歩を示す数字とノイズの見分け方、実際のお金に移行するタイミングとその方法、ペーパートレーディングでテストできないことを解説します。

### `/ja/blog/risuku-kanri-to-pojishon-saijingu/`

- **Source:** `src/content/blog-ja/risuku-kanri-to-pojishon-saijingu.md`
- **Current (78):** ポジションサイズは自分で選ぶ数字ではなく、ストップ幅から導かれる結果です。サイジングの計算式、1%ルール、ドローダウン回復の数学、Rマルチプルを解説します。
- **Proposed (159):** ポジションサイズは自分で選ぶ数字ではなく、ストップ幅から導かれる結果です。株数を先に決めるのが逆である理由、サイジングの計算式、慣習にすぎない1%ルール、非対称｜なドローダウン回復の数学、5連敗が普通である理由、Rマルチプル、日次・週次の損失上限、相関したポジションが実際のエクスポージャーを大きくする理由を解説します。

### `/ja/blog/rousokuashi-no-yomikata/`

- **Source:** `src/content/blog-ja/rousokuashi-no-yomikata.md`
- **Current (74):** すべてのローソク足は4つの価格を1つの形に凝縮しています。実体とヒゲが何を表すか、覚えておくべきパターン、文脈がパターン発見に勝る理由を解説します。
- **Proposed (158):** すべてのローソク足は4つの価格を1つの形に凝縮しています。実体とヒゲが何を表すかを実例で読み、Doji・Hammer・Shooting star・Maruboz｜uなど覚えておくべき単一ローソク足パターン、2本・3本のローソク足パターン、パターンより「場所」が重要な理由と、ローソク足パターンの正直な限界を解説します。

### `/ja/blog/rsi-kaiwaresugi-uriwaresugi/`

- **Source:** `src/content/blog-ja/rsi-kaiwaresugi-uriwaresugi.md`
- **Current (86):** RSIが70を超えても売りシグナルではありません。RSIが実際に何を測っているのか、買われすぎが「強さ」を意味する理由、自分を欺かないダイバージェンスの読み方を解説します。
- **Proposed (159):** RSIが70を超えても売りシグナルではありません。RSIが実際に何を測っているのか、70と30が慣習にすぎない理由、買われすぎが「強さ」を意味する理由、0〜10｜0のスケールが直線的でない理由、自分を欺かないダイバージェンスの読み方、50ラインのトレンドフィルター、80/20への調整、RSIにできないことを解説します。

### `/ja/blog/sakimono-toreedo-no-kaisetsu/`

- **Source:** `src/content/blog-ja/sakimono-toreedo-no-kaisetsu.md`
- **Current (74):** 先物契約が実際には何であるか、ティックサイズと乗数の仕組み、証拠金がローンではなく履行保証金である理由、レバレッジが諸刃の剣である理由を解説します。
- **Proposed (157):** 先物契約は所有権の一部ではなく義務です。乗数・ティックサイズ・ティック価値の仕組み、証拠金がローンではなく履行保証金である理由、当初証拠金・維持証拠金と日次値洗｜い、レバレッジの算術: 2%の値動きが預けた資金に何をするか、満期・ロールオーバー・コンタンゴ、小さな口座の現実的な入り口であるマイクロ契約を解説します。
- **Note:** Leads with the post's own first heading instead of the current "先物契約が実際には何であるか".

### `/ja/blog/sapooto-to-resisutansu/`

- **Source:** `src/content/blog-ja/sapooto-to-resisutansu.md`
- **Current (72):** サポートとレジスタンスは、正確な価格ではなく待機注文のゾーンです。見つけ方、ストップがヒゲで狩られる理由、本物のブレイクの見分け方を解説します。
- **Proposed (154):** サポートとレジスタンスは、正確な価格ではなく待機注文のゾーンです。スイングハイ・スイングローからの見つけ方、水準がゾーンである理由、ストップがヒゲで狩られる理由｜と広いストップに合わせたサイジング、破られたレジスタンスがサポートになる役割の反転、ラウンドナンバー、本物のブレイクとダマシの見分け方を解説します。

### `/ja/blog/vwap-senryaku/`

- **Source:** `src/content/blog-ja/vwap-senryaku.md`
- **Current (75):** VWAPは累積のtypical price×出来高を、累積出来高で割ったものです。その計算方法、機関投資家が追跡する理由、機能しない場面を解説します。
- **Proposed (159):** VWAPは累積のtypical price×出来高を、累積出来高で割ったものです。3本のバーでの計算方法と出来高だけを入れ替えた例、移動平均ではない理由、セッシ｜ョン開始時にリセットされる理由、機関投資家が執行ベンチマークにする理由、デイトレードでのサポート・レジスタンスとしての読み方、機能しなくなる場面を解説します。

### `/ja/blog/yokuaru-deitoreedo-no-machigai/`

- **Source:** `src/content/blog-ja/yokuaru-deitoreedo-no-machigai.md`
- **Current (83):** 過大なサイズ、動かしたストップ、リベンジトレード、ナンピン買い。それぞれの間違いがどう見えるか、脳がなぜそれを生み出すのか、それを止める確認可能なルールを解説します。
- **Proposed (156):** 過大なサイズ、動かしたストップ、リベンジトレード、ナンピン買い。勝ちを早く切り上げ負けを伸ばすこと、オーバートレード、エントリーの追いかけ、プランなしの取引、忘｜れがちなコスト、疲れや金額目標を抱えた取引も含め、それぞれの間違いがどう見えるか、脳がなぜそれを生み出すのか、それを止める確認可能なルールを解説します。

### `/ja/chart-simulator/`

- **Source:** `src/pages/ja/chart-simulator.astro`
- **Current (89):** 無料のインタラクティブなチャートシミュレーターでローソク足パターンを学ぼう。Doji、Hammer、Engulfing、Morning Starなど20種類以上のパターンを解説。
- **Proposed (152):** 無料のローソク足リプレイツールで、パターンがローソク足1本ずつ形成される過程を見てみよう。Doji、Hammer、Engulfing、Morning Starな｜ど24種類のパターンを、解説付きでじっくり学べます。1倍〜10倍の再生速度、EMA・VWAPオーバーレイ、出来高・RSI・MACDパネルに対応。
- **Note:** Mirrors the live /ko/chart-simulator/ description. **Revised 2026-10-18** (realism audit row 20, C2): the earlier proposal (153) said 「20種類以上のパターンを検出してチャート上にマーク」, copying the ko claim that the chart detects 20+ patterns. At most 15 distinct patterns appear in a session and 9 of the 24 can never be detected, so it now says the library has 24 patterns to learn, as ko does since the same date.

### `/ja/contact/`

- **Source:** `src/pages/ja/contact.astro`
- **Current (64):** 無料の株式市場シミュレーターStockadeについてのご意見をお聞かせください。ご感想、不具合の報告、ご提案などお気軽にどうぞ。
- **Proposed: SKIP**
- **Note:** **REVISIT.** Skipped originally because the page was only a feedback form plus an FAQ pointer. Since `0cdb335` it also offers a direct email option (メールでのご連絡…直接ご連絡いただけます), which is real content a description can mention. Re-check whether 150 is now reachable without padding; if not, keep the skip.

### `/ja/disclaimer/`

- **Source:** `src/pages/ja/disclaimer.astro`
- **Current (78):** Stockadeは教育目的のみのトレーディングシミュレーターです。すべての取引は仮想資金で行われます。これは投資助言ではありません。免責事項の全文はこちら。
- **Proposed (153):** Stockadeは教育目的のみのトレーディングシミュレーターです。すべての取引は仮想資金で行われ、これは投資助言ではありません。シミュレーターでの結果をもとに実｜際のお金を投資しないでください。シミュレーション実績が実際の結果と異なる理由、リスクの開示、情報の正確性について、免責事項の全文をご確認ください。

### `/ja/markets/`

- **Source:** `src/pages/ja/markets.astro`
- **Current (61):** 無料のオンライン株式市場シミュレーターで29種類のシミュレーション資産（株式、暗号資産、FX、先物）をチェック。登録不要。
- **Proposed (152):** 無料のオンライン株式市場シミュレーターで29種類のシミュレーション資産（株式、暗号資産、FX、先物）をチェック。登録不要。価格は2秒ごとに更新。暗号資産のウォッ｜チリスト、FXのスキャナー、取引前の価格確認に使え、価格変動率で並び替えて最も動いている資産と隣の出来高列を確認してから、そのまま取引できます。
- **Note:** **UNBLOCKED.** Since `28c2af0` the Trade button opens `/ja/simulator/?symbol=…`, so "そのまま取引できます" is accurate. The table's search box, category buttons and column headers are still English (see the island-strings audit), but this description makes no claim about them.

### `/ja/privacy/`

- **Source:** `src/pages/ja/privacy.astro`
- **Current (82):** Stockadeが皆様のデータをどのように扱うかについてご説明します。個人情報は一切収集せず、すべてのシミュレーション状態はお使いのブラウザにローカル保存されます。
- **Proposed (156):** Stockadeが皆様のデータをどのように扱うかについてご説明します。個人情報は一切収集せず、アカウント登録も不要で、すべてのシミュレーション状態はブラウザにロ｜ーカル保存されます。Google Fonts・Analytics・AdSense、ホスティング、Cookieの同意、オプトアウトの方法も記載しています。

### `/ja/terms/`

- **Source:** `src/pages/ja/terms.astro`
- **Current (91):** Stockadeの利用規約をご確認ください。無料のトレーディングシミュレーターをご利用いただくことで、本規約に同意したものとみなされます。実際のお金は使わず、投資助言でもありません。
- **Proposed (155):** Stockadeの利用規約をご確認ください。無料のトレーディングシミュレーターをご利用いただくことで、本規約に同意したものとみなされます。実際のお金は使わず、投｜資助言でもありません。本サービスの内容、仮想残高に金銭的価値がないこと、許可される利用、保証の否認、責任の制限、サービスの終了、準拠法も定めています。
- **Note:** Uses "仮想残高" (the clause's own wording) instead of its "仮想通貨" heading, since in Japanese 仮想通貨 usually means cryptocurrency.

## Korean (25: 24 proposed, 1 skip)

### `/ko/about/`

- **Source:** `src/pages/ko/about.astro`
- **Current (86):** 위험 없이 연습하고 싶은 트레이더를 위해 만들어진 무료 브라우저 기반 주식 시장 시뮬레이터, Stockade를 소개합니다. 가입도, 카드도 필요 없습니다.
- **Proposed (156):** Stockade는 10만 달러의 가상 자금으로 주식, 암호화폐, 외환, 선물 거래를 연습하는 무료 브라우저 기반 모의투자 시뮬레이터입니다. 가입｜도, 카드도 필요 없습니다. 캔들스틱 차트, 전문가용 지표, 완전한 주문창, 성과 분석, 실시간·리플레이 모드를 영구 무료로 제공합니다.
- **Note:** Lead sentence reuses the page's own intro paragraph.

### `/ko/analytics/`

- **Source:** `src/pages/ko/analytics.astro`
- **Current (59):** 무료 Stockade 시뮬레이터에서 자본 곡선, 승률, 낙폭 지표, 매매일지로 모의투자 성과를 분석하세요.
- **Proposed (155):** 무료 Stockade 시뮬레이터에서 모의투자 성과를 분석하세요. 종료된 트레이드로부터 총손익, 자본, 승률, 손익비, 평균 이익, 최대 낙폭의 ｜여섯 가지 핵심 통계를 계산하고, 자본 곡선, 매매일지, 시간대별 승률 히트맵으로 어떤 시간대에 잘 거래하는지까지 확인할 수 있습니다.

### `/ko/blog/`

- **Source:** `src/pages/ko/blog/index.astro`
- **Current (58):** 캔들스틱 차트, 지표, 주문 유형, 리스크 관리에 관한 무료 심층 가이드 — 실전처럼 연습하며 배우세요.
- **Proposed (154):** 캔들스틱 차트, 지표, 주문 유형, 리스크 관리에 관한 무료 심층 가이드 20편. RSI·MACD·VWAP·이동평균선, 시장가·지정가·손절매·O｜CO 주문, 포지션 사이징, 트레이딩 계획, 데이트레이딩 실수, 암호화폐·외환·선물의 구조까지 시뮬레이터에서 바로 연습하며 배우세요.
- **Note:** "20편" is a live count: update it if a ko post is added or drafted out.

### `/ko/blog/deiteureiding-dae-seuwing-teureiding/`

- **Source:** `src/content/blog-ko/deiteureiding-dae-seuwing-teureiding.md`
- **Current (89):** 어느 쪽도 더 낫지 않습니다. 시간, 자본, 갭 리스크, 거래 비용, 피드백 속도가 실제로 어떻게 다른지, 그리고 나에게 맞는 스타일을 고르는 법을 알아보세요.
- **Proposed (157):** 어느 쪽도 더 낫지 않습니다. 각 스타일이 하루에 요구하는 것, 시간, 자본, 미국 패턴 데이트레이더 규칙과 계좌 최소 요건, 오버나이트·주말 ｜갭 리스크, 거래 비용, 피드백 속도가 어떻게 다른지, 같은 500달러 리스크의 비교와 함께 나에게 맞는 스타일을 고르는 법을 알아보세요.

### `/ko/blog/deiteureiding-heunhan-silsu/`

- **Source:** `src/content/blog-ko/deiteureiding-heunhan-silsu.md`
- **Current (84):** 과도한 사이징, 옮긴 손절, 복수 매매, 물타기. 각 실수가 어떤 모습인지, 뇌가 왜 그것을 만드는지, 그리고 막아주는 확인 가능한 규칙을 알아보세요.
- **Proposed (151):** 과도한 사이징, 옮긴 손절, 복수 매매, 물타기. 수익은 짧게 자르고 손실은 달리게 두기, 오버트레이딩, 진입 쫓아가기, 서면 계획 없는 트레이｜드, 잊기 쉬운 비용까지, 각 실수가 어떤 모습인지, 뇌가 왜 그것을 만드는지, 그리고 막아주는 확인 가능한 규칙을 알아보세요.

### `/ko/blog/georaeryang-ihaehagi/`

- **Source:** `src/content/blog-ko/georaeryang-ihaehagi.md`
- **Current (81):** 거래량은 방향이 아니라 참여도를 측정합니다. 상대 거래량, 돌파 확인, 투매성 스파이크를 읽는 법과 거래량 데이터가 거짓말하는 지점을 알아보세요.
- **Proposed (157):** 거래량은 방향이 아니라 참여도를 측정합니다. 기준선 없는 원시 숫자가 무의미한 이유, 상대 거래량, 추세 확인과 이탈, 조용한 돌파가 의심스러운｜ 이유, 투매성 스파이크, 지지선·저항선에서의 거래량, 가격 차트 아래 히스토그램 읽는 법과 거래량 데이터가 거짓말하는 지점을 알아보세요.

### `/ko/blog/idongpyeonggyunseon-ema-dae-sma/`

- **Source:** `src/content/blog-ko/idongpyeonggyunseon-ema-dae-sma.md`
- **Current (82):** SMA와 EMA는 곱셈값 하나만큼 다릅니다. 계산법, 9/20/50이 표준인 이유, 지지선으로 활용하는 법, 그리고 왜 항상 지연되는지 알아보세요.
- **Proposed (154):** SMA와 EMA는 곱셈값 하나만큼 다릅니다. 이동평균이 실제로 계산하는 것, EMA가 더 빠르게 반응하는 이유, 9/20/50이 표준인 이유, ｜동적 지지선·저항선으로 활용하는 법, 크로스오버 전략과 휩소, 기울기를 추세 필터로 읽는 법, 그리고 왜 항상 지연되는지 알아보세요.

### `/ko/blog/jijiseon-gwa-jeohangseon/`

- **Source:** `src/content/blog-ko/jijiseon-gwa-jeohangseon.md`
- **Current (72):** 지지선과 저항선은 정확한 가격이 아니라 대기 주문의 구역입니다. 찾는 법, 손절이 흔들리는 이유, 진짜 돌파의 모습을 알아보세요.
- **Proposed (154):** 지지선과 저항선은 정확한 가격이 아니라 대기 주문의 구역입니다. 스윙 고점·저점으로 찾는 법, 레벨이 구역인 이유, 손절이 흔들리는 이유와 더 ｜넓은 손절에 맞춘 사이징, 깨진 저항선이 지지선이 되는 역할 반전, 라운드 넘버, 진짜 돌파와 가짜 돌파를 구분하는 법을 알아보세요.

### `/ko/blog/jusik-sijang-simyulleiteo-ran/`

- **Source:** `src/content/blog-ko/jusik-sijang-simyulleiteo-ran.md`
- **Current (81):** 주식 시장 시뮬레이터는 가상 자금으로 실제 시장 메커니즘을 트레이드하게 해줍니다. 어떻게 작동하는지, 무엇을 가르쳐줄 수 있고 없는지 알아보세요.
- **Proposed (160):** 주식 시장 시뮬레이터는 가상 자금으로 실제 시장 메커니즘을 트레이드하게 해줍니다. 시뮬레이터가 실제로 무엇인지, 주문 유형, 실제 숫자로 하는 ｜포지션 사이징, 별개의 스킬인 차트 읽기, 기억 대신 통계로 돌아보는 법, 가르쳐줄 수 있는 것과 없는 것, 도움이 되게 쓰는 법을 알아보세요.

### `/ko/blog/kaendeulseutik-chateu-ingneun-beop/`

- **Source:** `src/content/blog-ko/kaendeulseutik-chateu-ingneun-beop.md`
- **Current (83):** 캔들 하나가 네 가지 가격을 한 형태에 담습니다. 몸통과 꼬리가 인코딩하는 것, 알아둘 가치가 있는 패턴, 패턴보다 맥락이 중요한 이유를 배워보세요.
- **Proposed (154):** 캔들 하나가 네 가지 가격을 한 형태에 담습니다. 몸통과 꼬리가 인코딩하는 것을 계산 예시로 읽고, Doji·Hammer·Shooting sta｜r·Marubozu 등 알아둘 가치가 있는 패턴, 두 개·세 개 캔들 패턴, 패턴보다 맥락이 중요한 이유와 정직한 한계를 배워보세요.

### `/ko/blog/macd-ihaehagi/`

- **Source:** `src/content/blog-ko/macd-ihaehagi.md`
- **Current (79):** MACD는 두 이동평균과 그 차이, 그리고 그 차이를 평활화한 값입니다. 각 요소를 계산하는 법, 읽는 법, 그리고 언제 속이는지 알아보세요.
- **Proposed (157):** MACD는 두 이동평균과 그 차이, 그리고 그 차이를 평활화한 값입니다. MACD 라인·시그널 라인·히스토그램 계산법, 설정값이 12, 26, ｜9인 이유, 제로 라인과 시그널 라인 교차, 히스토그램의 함정, 다이버전스의 가치, 이중으로 지연되고 횡보장에서 속이는 이유를 알아보세요.

### `/ko/blog/moeuituja-gaideu/`

- **Source:** `src/content/blog-ko/moeuituja-gaideu.md`
- **Current (79):** 대부분의 모의투자는 아무것도 남기지 않습니다. 연습 세션을 구조화하고, 판단 근거를 기록하고, 실력이 실제로 느는지 측정하는 법을 알아보세요.
- **Proposed (152):** 대부분의 모의투자는 아무것도 남기지 않습니다. 연습 세션을 구조화하는 법, 모든 트레이드마다 기록할 것, 결과가 아니라 결정의 질로 리뷰하기, ｜어떤 숫자가 발전을 보여주고 어떤 것이 잡음인지, 실제 돈으로 넘어갈 시점과 방법, 모의투자가 테스트할 수 없는 것을 알아보세요.

### `/ko/blog/oco-wa-beuraket-jumun/`

- **Source:** `src/content/blog-ko/oco-wa-beuraket-jumun.md`
- **Current (82):** OCO와 브라켓 주문이 손절과 목표가를 어떻게 연결해 하나가 체결되면 다른 하나가 취소되는지, 그리고 초보자가 수량에서 저지르는 실수를 알아보세요.
- **Proposed (160):** OCO와 브라켓 주문이 손절과 목표가를 어떻게 연결해 하나가 체결되면 다른 하나가 취소되는지 187.40에 500주 롱 예시로 살펴보고, 진입 ｜전에 브라켓을 붙이는 것이 심리적으로 핵심인 이유, 부분 체결 후 수량 불일치, 주문이 화면보다 오래 산다는 점 같은 초보자 실수를 알아보세요.

### `/ko/blog/oehwan-teureiding-ipmun/`

- **Source:** `src/content/blog-ko/oehwan-teureiding-ipmun.md`
- **Current (90):** 통화쌍은 한 통화를 롱하고 다른 통화를 숏한다는 뜻입니다. 호가 읽는 법, 핍이란 무엇인지, JPY 페어가 다른 이유, 외환 레버리지가 위험한 이유를 알아보세요.
- **Proposed (156):** 통화쌍은 한 통화를 롱하고 다른 통화를 숏한다는 뜻입니다. 호가 읽는 법, 핍이란 무엇인지, JPY 페어가 둘째 자리를 쓰는 이유, 랏 크기와 ｜쿼트 통화로 정해지는 핍 가치, 주된 비용인 스프레드, 메이저·마이너·이그조틱, 외환 레버리지가 주식보다 훨씬 위험한 이유를 알아보세요.

### `/ko/blog/riseukeu-gwalli-pojisyeon-saijing/`

- **Source:** `src/content/blog-ko/riseukeu-gwalli-pojisyeon-saijing.md`
- **Current (76):** 포지션 사이즈는 스스로 고르는 숫자가 아니라 손절 거리의 결과물입니다. 사이징 공식, 1% 규칙, 낙폭 회복 계산, R배수를 알아보세요.
- **Proposed (151):** 포지션 사이즈는 스스로 고르는 숫자가 아니라 손절 거리의 결과물입니다. 사이징 공식, 관행일 뿐인 1% 규칙, 비대칭적인 낙폭 회복 계산, 다섯｜ 번 연속 손실이 평범한 이유, R배수, 일일·주간 손실 한도, 상관관계가 있는 포지션이 실제 노출을 키우는 이유를 알아보세요.

### `/ko/blog/rsi-jipyo-gwamaesu-gwamaedo/`

- **Source:** `src/content/blog-ko/rsi-jipyo-gwamaesu-gwamaedo.md`
- **Current (89):** RSI 70 이상은 매도 신호가 아닙니다. RSI가 실제로 측정하는 것, 과매수가 왜 강함을 뜻하는지, 스스로를 속이지 않고 다이버전스를 읽는 법을 알아보세요.
- **Proposed (152):** RSI 70 이상은 매도 신호가 아닙니다. RSI가 실제로 측정하는 것, 0~100 스케일이 선형이 아닌 이유, 70과 30이 관행일 뿐인 이유｜, 과매수가 왜 강함을 뜻하는지, 스스로를 속이지 않고 다이버전스를 읽는 법, 50선 추세 필터와 80/20 임계값을 알아보세요.

### `/ko/blog/seonmul-teureiding-ihaehagi/`

- **Source:** `src/content/blog-ko/seonmul-teureiding-ihaehagi.md`
- **Current (86):** 선물 계약이 실제로 무엇인지, 틱 사이즈와 승수는 어떻게 작동하는지, 증거금이 대출이 아니라 이행보증금인 이유, 레버리지가 양날의 검인 이유를 알아보세요.
- **Proposed (153):** 선물 계약은 소유권의 지분이 아니라 의무입니다. 승수·틱 사이즈·틱 가치, 증거금이 대출이 아니라 이행보증금인 이유, 최초·유지 증거금과 일일 ｜시가평가, 레버리지 산술: 2% 움직임이 예치 자본에 하는 일, 만기·롤오버·콘탱고, 소형 계좌를 위한 마이크로 계약을 알아보세요.
- **Note:** Leads with the post's own first heading.

### `/ko/blog/sonjeolmae-jumun-ihaehagi/`

- **Source:** `src/content/blog-ko/sonjeolmae-jumun-ihaehagi.md`
- **Current (83):** 손절은 임의의 금액이 아니라 트레이드 아이디어가 깨지는 지점에 둡니다. 손절-시장가 대 손절-지정가, 구조 너머의 배치, 그리고 사이징을 알아보세요.
- **Proposed (155):** 손절은 임의의 금액이 아니라 트레이드 아이디어가 깨지는 지점에 둡니다. 손절-시장가 대 손절-지정가와 두 번째 것의 함정, 구조 너머의 배치, ｜손절 거리와 포지션 사이즈가 같은 결정인 이유, 트레일링 스탑으로 포기하는 것, 갭에서 손절이 가격을 보장하지 않는 이유를 알아보세요.
- **Note:** Same added topics as the live ja sibling.

### `/ko/blog/teureiding-gyehoek-seuneun-beop/`

- **Source:** `src/content/blog-ko/teureiding-gyehoek-seuneun-beop.md`
- **Current (79):** 트레이딩 계획은 의도가 아니라 문서입니다. 필요한 모든 섹션, 완전히 계산된 셋업 예시, 그리고 계획을 바꿔도 되는 시점의 규칙을 알아보세요.
- **Proposed (152):** 트레이딩 계획은 의도가 아니라 문서입니다. 계획 문서에 필요한 아홉 개의 섹션, 종목과 타임프레임 좁히기, 낯선 사람도 확인할 수 있는 셋업 정｜의, 트레이드당 리스크와 일일 손실 한도, 진입 전 체크리스트와 일일·주간 리뷰, 계획을 바꿔도 될 때와 안 될 때를 알아보세요.

### `/ko/blog/vwap-teureiding-jeollyak/`

- **Source:** `src/content/blog-ko/vwap-teureiding-jeollyak.md`
- **Current (76):** VWAP은 누적 대표가격 × 거래량을 누적 거래량으로 나눈 값입니다. 계산법, 기관이 지켜보는 이유, 그리고 실패하는 지점을 알아보세요.
- **Proposed (151):** VWAP은 누적 대표가격 × 거래량을 누적 거래량으로 나눈 값입니다. 세 봉으로 직접 해보는 계산법, 이동평균이 아닌 이유, 세션 시작에 리셋되｜는 이유, 기관이 실행 벤치마크로 지켜보는 이유, 인트라데이 지지선·저항선으로 읽는 법, VWAP이 무너지는 지점을 알아보세요.

### `/ko/contact/`

- **Source:** `src/pages/ko/contact.astro`
- **Current (77):** 무료 주식 시장 시뮬레이터 Stockade에 대한 피드백을 남겨주세요. 버그, 아이디어, 그 밖의 의견도 몇 초 만에 전달할 수 있습니다.
- **Proposed: SKIP**
- **Note:** **REVISIT.** Skipped originally because the page was only a feedback form plus an FAQ pointer. Since `0cdb335` it also offers a direct email option (이메일이 더 편하신가요? … 직접 연락하실 수 있습니다), which is real content a description can mention. Re-check whether 150 is now reachable without padding; if not, keep the skip.

### `/ko/disclaimer/`

- **Source:** `src/pages/ko/disclaimer.astro`
- **Current (89):** Stockade는 오직 교육 목적의 트레이딩 시뮬레이터입니다. 모든 거래는 가상 자금으로 이루어집니다. 이는 투자 자문이 아닙니다. 전체 면책조항을 확인하세요.
- **Proposed (159):** Stockade는 오직 교육 목적의 트레이딩 시뮬레이터입니다. 모든 거래는 가상 자금으로 이루어지며, 이는 투자 자문이 아닙니다. 시뮬레이터 결｜과를 근거로 실제 자금을 투자하지 마세요. 시뮬레이션 성과가 실제 결과와 다른 이유, 위험 고지, 정보의 정확성을 담은 면책조항을 확인하세요.

### `/ko/markets/`

- **Source:** `src/pages/ko/markets.astro`
- **Current (75):** 무료 온라인 주식 시장 시뮬레이터에서 주식, 암호화폐, 외환, 선물 등 29개 시뮬레이션 자산을 확인하세요. 가입이 필요하지 않습니다.
- **Proposed (154):** 무료 온라인 주식 시장 시뮬레이터에서 주식, 암호화폐, 외환, 선물 등 29개 시뮬레이션 자산을 확인하세요. 가입 불필요. 가격은 2초마다 갱신｜되며, 외환 스캐너처럼 가격 변동률로 정렬해 가장 활발히 움직이는 자산과 거래량을 확인한 뒤 바로 시뮬레이터에서 거래할 수 있습니다.
- **Note:** **UNBLOCKED.** Since `28c2af0` the Trade button opens `/ko/simulator/?symbol=…`, so "바로 시뮬레이터에서 거래할 수 있습니다" is accurate.

### `/ko/privacy/`

- **Source:** `src/pages/ko/privacy.astro`
- **Current (81):** Stockade가 여러분의 데이터를 어떻게 다루는지 알아보세요. 개인정보는 수집하지 않으며, 모든 시뮬레이션 상태는 브라우저에 로컬로 저장됩니다.
- **Proposed (152):** Stockade가 여러분의 데이터를 어떻게 다루는지 알아보세요. 개인정보는 수집하지 않고 계정도 필요 없으며, 모든 시뮬레이션 상태는 브라우저에｜ 로컬로 저장됩니다. Google Fonts·Analytics·AdSense, 호스팅, 쿠키 동의, 수신 거부 방법도 안내합니다.

### `/ko/terms/`

- **Source:** `src/pages/ko/terms.astro`
- **Current (86):** Stockade의 이용약관을 확인하세요. 무료 트레이딩 시뮬레이터를 이용함으로써 여러분은 본 약관에 동의하게 됩니다. 실제 자금도, 투자 자문도 아닙니다.
- **Proposed (160):** Stockade의 이용약관을 확인하세요. 무료 트레이딩 시뮬레이터를 이용함으로써 여러분은 본 약관에 동의하게 됩니다. 실제 자금도, 투자 자문도｜ 아닙니다. 서비스 설명, 가상 잔고에 금전적 가치가 없다는 점, 허용되는 이용, 보증의 부인, 책임의 제한, 서비스 종료, 준거법도 다룹니다.

## Applying

- **Blog posts:** edit the `description:` frontmatter line. The schema rejects anything over 160 characters at build time.
- **Pages:** edit the `description="…"` prop on `<Layout>` / `<AppLayout>`.
- **Verify in `dist/`.** `og:description` and `twitter:description` are derived from the same prop, so check that all three match.
