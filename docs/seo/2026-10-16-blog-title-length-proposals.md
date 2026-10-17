# Proposal: shorten blog titles over 70 characters

**Status: done (2026-10-17). Every row is applied, and every rendered `<title>` in `dist/` (250 HTML files) is 69 characters or fewer, `" | Stockade"` included.** The remaining 42 rows plus the three at-70 titles below were applied in one commit per locale: en `bc3ef9d`, de `71b7678`, es `0893ae8`, fr `7c19fd3`, it `2fc5720`, pt `70b544e`. Most went in as proposed. These differ from the tables:

| Post | Applied title | Len | Why |
|---|---|---:|---|
| de `rsi-indikator-ueberkauft-ueberverkauft` | RSI-Indikator: Überkauft oder überverkauft? | 54 | chosen in review |
| de `vwap-handelsstrategie` | VWAP-Handelsstrategie: Was er ist, wie Trader ihn nutzen | 67 | was at 70, no proposal; "und" becomes a comma |
| es `ordenes-stop-loss-explicadas` | Órdenes Stop-Loss: Cómo Limitar Grandes Pérdidas | 59 | chosen in review |
| es `soporte-y-resistencia` | Entendiendo los Niveles de Soporte y Resistencia | 59 | was at 70, no proposal; drops "en Trading", like the fr sibling |
| fr `day-trading-contre-swing-trading` | Day Trading contre Swing Trading : Lequel Vous Convient | 66 | was at 70, no proposal; "Lequel" for "Quel Style" |
| fr `gestion-du-risque-et-dimensionnement-de-position` | Gestion du Risque : Dimensionnement de Position | 58 | review kept "Dimensionnement de Position" and dropped "101" and articles, but that left 73, so "et la Règle du 1%" goes too |
| fr `strategie-de-trading-vwap` | Stratégie de Trading VWAP : Comment l'Utiliser | 57 | chosen in review |
| it `gestione-del-rischio-e-dimensionamento-della-posizione` | Gestione del Rischio: Dimensionamento della Posizione | 64 | review kept "Dimensionamento della Posizione" and dropped "101" and articles, but that left 81, so "e la Regola dell'1%" goes too |
| it `ordini-stop-loss-spiegati` | Ordini Stop-Loss: Come Limitare le Grandi Perdite | 60 | chosen in review |
| it `trading-di-criptovalute-per-principianti` | Trading di Criptovalute per Principianti | 51 | chosen in review |
| pt `trading-de-cripto-para-iniciantes` | Trading de Cripto para Iniciantes: Mercados Digitais | 63 | chosen in review |

The history below is kept for the record. **Earlier, six rows were applied on 2026-10-16 in `9d5361c` because those posts were edited in the realism pass:** es `que-es-un-simulador-de-mercado-de-valores`, fr `quest-ce-qu-un-simulateur-boursier`, `ordre-au-marche-vs-ordre-limite`, `ordres-stop-loss-explique`, de `was-ist-ein-boersensimulator`, it `cosa-e-un-simulatore-di-mercato-azionario`. The en explainer (exactly 70, so not listed here) became "What Is a Stock Market Simulator and Why Use One" (59). The candlestick post's row was applied in the audit row-15 translation pass, in each locale's own commit, because that post was edited there: es, pt, fr, de, it. (The en candlestick title, exactly 70, dropped "Complete" in `cc56250` and renders at 61.) Every other row is still unapplied. Generated 2026-10-16 from the built `dist/` after commit `1756060`.

Bing Webmaster Tools flags a `<title>` over 70 characters. The rendered title is the post's frontmatter `title` plus the 11-character `" | Stockade"` suffix (`BlogPost.astro`), so the frontmatter title must be **58 characters or fewer** to land strictly under 70. 53 posts are over (en 4, es 9, pt 8, fr 15, de 8, it 9). Every proposal below renders at **69 or fewer** (longest: 69). The one post already fixed, `analyze-trading-performance-metrics` and its siblings, is not listed.

## What changing a title also changes

The frontmatter `title` is the only source for all of these, so they move together:

- `<title>` and `og:title` / `twitter:title`
- the visible **H1** on the post
- the Article JSON-LD `headline`
- the post's card on its locale's `/blog/` index and in Related Posts

Slugs and URLs do **not** change, so there are no redirects to add.

**Also at exactly 70, with no proposal yet (found by the 2026-10-17 pre-deploy title audit, which used a ≤69 limit):** de `/de/blog/vwap-handelsstrategie/` "VWAP-Handelsstrategie: Was er ist und wie Trader ihn nutzen", es `/es/blog/soporte-y-resistencia/` "Entendiendo los Niveles de Soporte y Resistencia en Trading", fr `/fr/blog/day-trading-contre-swing-trading/` "Day Trading contre Swing Trading : Quel Style Vous Convient". All three render at 70 with the suffix. The 2026-10-17 audit scoped titles to the pages in its brief, all ≤69, and left every row here unapplied. (All three were shortened later on 2026-10-17; see the status table at the top.)

## How the proposals were written

- **Keep the slug's head keyword.** For example `forex-trading-for-beginners` becomes "Forex Trading for Beginners: …", not a new phrasing.
- **Cut filler first.** That means "Step-by-Step for Beginners" endings, "Complete", "How to", "Explained", and "Introduction to".
- **Reuse each locale's existing terms.** For example: de *Positionsgröße*, *1-%-Regel*; es *Tamaño de Posición*; fr *Dimensionnement*, *à Cours Limité*; it *Dimensionamento*, *Ipercomprato/Ipervenduto*; pt *Dimensionamento de Posição*.
- **No new claims.** Each proposal says a subset of what the current title says.

Lengths are Unicode code points, including the suffix.


## en (4)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/blog/crypto-trading-for-beginners/` | Crypto Trading for Beginners: How Digital Asset Markets Work | 71 | Crypto Trading for Beginners: How Crypto Markets Work | 64 |
| `/blog/forex-trading-for-beginners/` | Introduction to Forex Trading: Currency Pairs and Pips Explained | 75 | Forex Trading for Beginners: Currency Pairs and Pips | 63 |
| `/blog/rsi-indicator-overbought-oversold/` | RSI Indicator: How to Identify Overbought and Oversold Conditions | 76 | RSI Indicator: How to Identify Overbought and Oversold | 65 |
| `/blog/stop-loss-orders-explained/` | Stop-Loss Orders: How to Protect Your Trades From Big Losses | 71 | Stop-Loss Orders: How to Protect Trades From Big Losses | 66 |

## es (9)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/es/blog/como-construir-un-plan-de-trading/` | Cómo Construir un Plan de Trading: Paso a Paso para Principiantes | 76 | Cómo Construir un Plan de Trading: Paso a Paso | 57 |
| `/es/blog/como-leer-graficos-de-velas/` | Cómo Leer Gráficos de Velas: Guía Completa para Principiantes | 72 | Cómo Leer Gráficos de Velas: Guía para Principiantes | 63 |
| `/es/blog/gestion-de-riesgo-y-tamano-de-posicion/` | Gestión de Riesgo 101: El Tamaño de Posición y la Regla del 1% | 73 | Gestión de Riesgo 101: Tamaño de Posición y Regla del 1% | 67 |
| `/es/blog/indicador-rsi-sobrecompra-sobreventa/` | Indicador RSI: Cómo Identificar Condiciones de Sobrecompra y Sobreventa | 82 | Indicador RSI: Cómo Identificar Sobrecompra y Sobreventa | 67 |
| `/es/blog/ordenes-stop-loss-explicadas/` | Órdenes Stop-Loss: Cómo Proteger tus Operaciones de Grandes Pérdidas | 79 | Órdenes Stop-Loss: Cómo Proteger tus Operaciones | 59 |
| `/es/blog/que-es-un-simulador-de-mercado-de-valores/` | Qué Es un Simulador de Mercado de Valores y Por Qué Deberías Usar Uno | 80 | Qué Es un Simulador de Mercado de Valores y Por Qué Usarlo | 69 |
| `/es/blog/trading-de-cripto-para-principiantes/` | Trading de Cripto para Principiantes: Cómo Funcionan los Mercados Digitales | 86 | Trading de Cripto para Principiantes: Mercados Digitales | 67 |
| `/es/blog/trading-de-forex-para-principiantes/` | Introducción al Trading de Forex: Pares de Divisas y Pips Explicados | 79 | Trading de Forex: Pares de Divisas y Pips Explicados | 63 |
| `/es/blog/trading-de-futuros-explicado/` | Trading de Futuros Explicado: Contratos, Margen y Apalancamiento | 75 | Trading de Futuros: Contratos, Margen y Apalancamiento | 65 |

## pt (8)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/pt/blog/como-criar-um-plano-de-trading/` | Como Criar um Plano de Trading: Passo a Passo para Iniciantes | 72 | Como Criar um Plano de Trading: Passo a Passo | 56 |
| `/pt/blog/como-ler-graficos-de-candles/` | Como Ler Gráficos de Candles: O Guia Completo para Iniciantes | 72 | Como Ler Gráficos de Candles: Guia para Iniciantes | 61 |
| `/pt/blog/gestao-de-risco-e-dimensionamento-de-posicao/` | Gestão de Risco 101: Dimensionamento de Posição e a Regra de 1% | 74 | Gestão de Risco: Dimensionamento de Posição e Regra de 1% | 68 |
| `/pt/blog/indicador-rsi-sobrecompra-e-sobrevenda/` | Indicador RSI: Como Identificar Condições de Sobrecompra e Sobrevenda | 80 | Indicador RSI: Como Identificar Sobrecompra e Sobrevenda | 67 |
| `/pt/blog/ordens-stop-loss-explicadas/` | Ordens Stop-Loss: Como Proteger Suas Operações de Grandes Perdas | 75 | Ordens Stop-Loss: Proteja Suas Operações de Grandes Perdas | 69 |
| `/pt/blog/trading-de-cripto-para-iniciantes/` | Trading de Cripto para Iniciantes: Como Funcionam os Mercados de Ativos Digitais | 91 | Trading de Cripto: Como Funcionam os Mercados Digitais | 65 |
| `/pt/blog/trading-de-forex-para-iniciantes/` | Introdução ao Trading de Forex: Pares de Moedas e Pips Explicados | 76 | Trading de Forex: Pares de Moedas e Pips Explicados | 62 |
| `/pt/blog/trading-de-futuros-explicado/` | Trading de Futuros Explicado: Contratos, Margem e Alavancagem | 72 | Trading de Futuros: Contratos, Margem e Alavancagem | 62 |

## fr (15)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/fr/blog/comment-creer-un-plan-de-trading/` | Comment Créer un Plan de Trading : Guide Étape par Étape pour Débutants | 82 | Comment Créer un Plan de Trading : Guide Étape par Étape | 67 |
| `/fr/blog/comment-lire-les-graphiques-en-chandeliers/` | Comment Lire les Graphiques en Chandeliers : Le Guide Complet du Débutant | 84 | Lire les Graphiques en Chandeliers : Guide du Débutant | 65 |
| `/fr/blog/gestion-du-risque-et-dimensionnement-de-position/` | Gestion du Risque 101 : Dimensionnement de Position et la Règle du 1% | 80 | Gestion du Risque 101 : Dimensionnement et Règle du 1% | 65 |
| `/fr/blog/guide-du-paper-trading/` | Guide du Paper Trading : Comment S'Entraîner Sans Risquer d'Argent Réel | 82 | Paper Trading : S'Entraîner Sans Risquer d'Argent Réel | 65 |
| `/fr/blog/indicateur-rsi-surachat-survente/` | Indicateur RSI : Comment Identifier le Surachat et la Survente | 73 | Indicateur RSI : Identifier le Surachat et la Survente | 65 |
| `/fr/blog/moyennes-mobiles-ema-vs-sma/` | Les Moyennes Mobiles Expliquées : EMA contre SMA et Comment les Utiliser | 83 | Moyennes Mobiles : EMA contre SMA et Comment les Utiliser | 68 |
| `/fr/blog/niveaux-de-support-et-resistance/` | Comprendre les Niveaux de Support et de Résistance en Trading | 72 | Comprendre les Niveaux de Support et de Résistance | 61 |
| `/fr/blog/ordre-au-marche-vs-ordre-limite/` | Ordre au Marché vs Ordre à Cours Limité : Quand Utiliser Chacun | 74 | Ordre au Marché ou à Cours Limité : Quand Utiliser Chacun | 68 |
| `/fr/blog/ordres-oco-et-bracket/` | Que Sont les Ordres OCO et Bracket et Comment Fonctionnent-Ils | 73 | Ordres OCO et Bracket : Comment Fonctionnent-Ils | 59 |
| `/fr/blog/ordres-stop-loss-explique/` | Ordres Stop-Loss : Comment Protéger Vos Trades des Grosses Pertes | 76 | Ordres Stop-Loss : Protéger Vos Trades des Grosses Pertes | 68 |
| `/fr/blog/quest-ce-qu-un-simulateur-boursier/` | Qu'est-ce Qu'un Simulateur Boursier et Pourquoi en Utiliser Un | 73 | Qu'est-ce Qu'un Simulateur Boursier et Pourquoi l'Utiliser | 69 |
| `/fr/blog/strategie-de-trading-vwap/` | Stratégie de Trading VWAP : Ce Que C'est et Comment les Traders l'Utilisent | 86 | Stratégie VWAP : Comment les Traders l'Utilisent | 59 |
| `/fr/blog/trading-crypto-pour-debutants/` | Trading Crypto pour Débutants : Comment Fonctionnent les Marchés d'Actifs Numériques | 95 | Trading Crypto pour Débutants : Fonctionnement des Marchés | 69 |
| `/fr/blog/trading-de-contrats-a-terme-explique/` | Trading de Contrats à Terme : Contrats, Marge et Effet de Levier | 75 | Trading de Contrats à Terme : Marge et Effet de Levier | 65 |
| `/fr/blog/trading-forex-pour-debutants/` | Introduction au Trading Forex : Paires de Devises et Pips Expliqués | 78 | Trading Forex : Paires de Devises et Pips Expliqués | 62 |

## de (8)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/de/blog/candlestick-charts-lesen/` | Candlestick-Charts lesen: Der vollständige Leitfaden für Einsteiger | 78 | Candlestick-Charts lesen: Leitfaden für Einsteiger | 61 |
| `/de/blog/forex-trading-fuer-einsteiger/` | Einführung ins Forex-Trading: Währungspaare und Pips erklärt | 71 | Forex-Trading für Einsteiger: Währungspaare und Pips | 63 |
| `/de/blog/gleitende-durchschnitte-ema-vs-sma/` | Gleitende Durchschnitte erklärt: EMA vs. SMA und ihre Nutzung | 72 | Gleitende Durchschnitte: EMA vs. SMA und ihre Nutzung | 64 |
| `/de/blog/krypto-trading-fuer-einsteiger/` | Krypto-Trading für Einsteiger: Wie digitale Asset-Märkte funktionieren | 81 | Krypto-Trading für Einsteiger: So funktionieren die Märkte | 69 |
| `/de/blog/risikomanagement-positionsgroesse/` | Risikomanagement 101: Positionsgrößenbestimmung und die 1-%-Regel | 76 | Risikomanagement 101: Positionsgröße und die 1-%-Regel | 65 |
| `/de/blog/rsi-indikator-ueberkauft-ueberverkauft/` | RSI-Indikator: Überkaufte und überverkaufte Zustände erkennen | 72 | RSI-Indikator: Überkauft und überverkauft erkennen | 61 |
| `/de/blog/stop-loss-orders-erklaert/` | Stop-Loss-Orders: So schützen Sie Ihre Trades vor großen Verlusten | 77 | Stop-Loss-Orders: Trades vor großen Verlusten schützen | 65 |
| `/de/blog/was-ist-ein-boersensimulator/` | Was ist ein Börsensimulator und warum sollten Sie einen nutzen | 73 | Was ist ein Börsensimulator und warum ihn nutzen | 59 |

## it (9)

| Post | Current title | Len | Proposed title | Len |
|---|---|---:|---|---:|
| `/it/blog/come-creare-un-piano-di-trading/` | Come Creare un Piano di Trading: Guida Passo Passo per Principianti | 78 | Come Creare un Piano di Trading: Guida Passo Passo | 61 |
| `/it/blog/come-leggere-i-grafici-a-candele/` | Come Leggere i Grafici a Candele: la Guida Completa per Principianti | 79 | Come Leggere i Grafici a Candele: Guida per Principianti | 67 |
| `/it/blog/cosa-e-un-simulatore-di-mercato-azionario/` | Cos'è un Simulatore di Mercato Azionario e Perché Dovresti Usarne Uno | 80 | Cos'è un Simulatore di Mercato Azionario e Perché Usarlo | 67 |
| `/it/blog/gestione-del-rischio-e-dimensionamento-della-posizione/` | Gestione del Rischio 101: Dimensionamento della Posizione e la Regola dell'1% | 88 | Gestione del Rischio 101: Dimensionamento e Regola dell'1% | 69 |
| `/it/blog/guida-al-paper-trading/` | Paper Trading: Come Esercitarsi Senza Rischiare Denaro Reale | 71 | Paper Trading: Esercitarsi Senza Rischiare Denaro Reale | 66 |
| `/it/blog/indicatore-rsi-ipercomprato-ipervenduto/` | Indicatore RSI: Come Identificare le Condizioni di Ipercomprato e Ipervenduto | 88 | Indicatore RSI: Identificare Ipercomprato e Ipervenduto | 66 |
| `/it/blog/ordini-stop-loss-spiegati/` | Ordini Stop-Loss: Come Proteggere le Tue Operazioni da Grandi Perdite | 80 | Ordini Stop-Loss: Come Proteggerti da Grandi Perdite | 63 |
| `/it/blog/trading-di-criptovalute-per-principianti/` | Trading di Criptovalute per Principianti: Come Funzionano i Mercati Digitali | 87 | Trading di Criptovalute: Come Funzionano i Mercati | 61 |
| `/it/blog/trading-forex-per-principianti/` | Introduzione al Trading Forex: Coppie di Valute e Pip Spiegati | 73 | Trading Forex: Coppie di Valute e Pip Spiegati | 57 |

## Applying

Change the `title:` line in each listed `src/content/blog*/…md` file (the files are LF in the working tree; git stores them CRLF). Then check the built `<title>`, H1, og:title and JSON-LD `headline` in `dist/`, not the source.
