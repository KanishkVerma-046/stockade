---
title: "Introduzione al Trading Forex: Coppie di Valute e Pip Spiegati"
description: "Una coppia di valute significa essere lunghi su una valuta e corti sull'altra. Come leggere una quotazione, cos'è un pip, e perché la leva forex fa male."
date: 2026-07-13
tags: ["Forex", "Basi"]
slug: "trading-forex-per-principianti"
translationOf: "forex-trading-for-beginners"
---

Apri una piattaforma forex per la prima volta e la quotazione segna EUR/USD 1,0872. Nessun simbolo del dollaro, quattro decimali, e il pulsante di acquisto chiede lotti anziché azioni. Poi USD/JPY segna 157,42, con due decimali, e qualcuno ti dice che un movimento di 20 pip su entrambe le coppie è della stessa entità — anche se su una sembra 0,0020 e sull'altra 0,20.

La confusione è superficiale. Il forex ha tre convenzioni che fanno inciampare ogni trader azionario — cos'è davvero una coppia, cos'è un pip, e quanto è grande un lotto. Una volta chiarite, il resto si legge normalmente.

## Ogni operazione forex è lunga su una valuta e corta sull'altra

Questo è l'ostacolo concettuale. Compri un'azione e succede una cosa: possiedi delle azioni. Compri EUR/USD e succedono due cose contemporaneamente — vai **lungo sull'euro** e **corto sul dollaro statunitense**, nella stessa operazione, nello stesso istante. Non puoi fare l'una senza l'altra, perché una valuta non ha prezzo se non in termini di un'altra valuta. Non esiste un "prezzo dell'euro" assoluto come esiste un prezzo assoluto di un'azione.

Questo ridefinisce il grafico. EUR/USD in salita non significa che l'euro è forte; significa che l'euro è forte *rispetto al dollaro* — il che potrebbe essere ugualmente il dollaro che si indebolisce mentre l'euro non fa nulla.

La prima valuta nella coppia è la **base**, la seconda è la **quota**. Il numero è sempre: quante unità della valuta quota servono per comprare un'unità della base.

- **EUR/USD 1,0872** — un euro costa 1,0872 dollari statunitensi.
- **USD/JPY 157,42** — un dollaro statunitense costa 157,42 yen.

Nota che il dollaro sta su lati opposti in queste due coppie. Compra EUR/USD *e* compra USD/JPY e sei corto sui dollari in un'operazione e lungo sui dollari nell'altra, annullando parzialmente la tua stessa posizione senza volerlo. Per lo stesso motivo non c'è restrizione alla vendita allo scoperto nel forex: una vendita è solo un acquisto dell'altra valuta, non si prende nulla in prestito, e non c'è regola dell'uptick.

## Cos'è un pip, e perché le coppie con lo yen usano la seconda cifra decimale

Un **pip** — "percentage in point" — è l'incremento standard con cui i trader quotano un movimento. Per quasi ogni coppia è la **quarta cifra decimale**, 0,0001. Su EUR/USD, un movimento da **1,0872 a 1,0892** è 0,0020, ovvero **20 pip**.

Dove lo yen è la valuta quota, il pip è la **seconda cifra decimale**, 0,01. Su USD/JPY, un movimento da **157,42 a 157,62** è 0,20, che è anch'esso **20 pip**.

Questa eccezione è dove i principianti perdono il filo, e non è arbitraria. La convenzione mantiene un pip approssimativamente della stessa dimensione *relativa* tra le coppie:

- EUR/USD: 0,0001 ÷ 1,0872 = **0,0092%** del prezzo
- USD/JPY: 0,01 ÷ 157,42 = **0,0064%** del prezzo

Stesso ordine di grandezza, quindi 50 pip significano una cosa comparabile su entrambe. Ora supponi che lo yen usasse la quarta cifra decimale: 0,0001 ÷ 157,42 = **0,0000635%**, circa 145 volte più piccolo, e un'ordinaria giornata dello 0,8% su USD/JPY stamperebbe circa 12.600 pip. La convenzione a due decimali mantiene le quotazioni dello yen nello stesso ordine numerico di tutto il resto.

Un'ulteriore complicazione: la maggior parte dei broker mostra una cifra in più, un **pip frazionario** che vale un decimo di pip — EUR/USD come 1,08725, USD/JPY come 157,425. Leggere quell'ultima cifra come un pip gonfia ogni distanza che misuri di 10 volte.

## Il valore del pip dipende dalla dimensione del lotto e dalla valuta quota

Un pip è una distanza. Quanto *vale* dipende da quante unità detieni. Il forex tratta in **lotti** standardizzati: un **lotto standard** è 100.000 unità della valuta base, un **mini lotto** è 10.000, e un **micro lotto** è 1.000.

Il valore del pip è unità × dimensione del pip, espresso nella valuta **quota**. Un lotto standard di EUR/USD: 100.000 × 0,0001 = **10 USD per pip**. La valuta quota è già il dollaro, quindi sono esattamente 10$ senza conversione, e il movimento di 20 pip da 1,0872 a 1,0892 è 20 × 10$ = **200$**. Qualsiasi coppia quotata in USD, GBP/USD inclusa, è un netto 10$ per pip per lotto standard.

USD/JPY non lo è. La sua valuta quota è lo yen, quindi un lotto standard guadagna 100.000 × 0,01 = **¥1.000 per pip**, e per arrivare ai dollari bisogna dividere per il tasso corrente: 1.000 ÷ 157,42 = **6,35$ per pip**. Lo stesso movimento di 20 pip è ¥20.000, ovvero 20.000 ÷ 157,42 = **127,05$** — non 200$. Dimensionare un'operazione in yen come se i pip valessero 10$ ti lascia a rischiare il 36% in meno di quanto intendevi.

<div class="table-wrap">

| Lotto | Unità | Valore pip EUR/USD | Valore pip USD/JPY (a 157,42) |
|---|---|---|---|
| Standard | 100.000 | 10,00$ | ¥1.000 = 6,35$ |
| Mini | 10.000 | 1,00$ | ¥100 = 0,64$ |
| Micro | 1.000 | 0,10$ | ¥10 = 0,06$ |

</div>

I lotti piccoli sono ciò che rende il dimensionamento forex praticabile su un piccolo conto. Con 5.000$ e l'1% di rischio per operazione — 50$ — su un setup EUR/USD con uno stop di 25 pip, ti serve un valore del pip di 50 ÷ 25 = **2,00$**, ovvero 2 mini lotti, o 20.000 unità. Valore nozionale: 20.000 × 1,0872 = **21.744$**. Quattro volte il tuo conto controllato con 50$ a rischio. La [formula di dimensionamento della posizione](/blog/risk-management-position-sizing) funziona identicamente qui; cambia solo l'unità, da rischio-per-azione a rischio-per-pip.

## Lo spread è il costo principale che paghi nel forex retail

La maggior parte dei broker forex retail non addebita commissioni. Vengono pagati tramite lo **spread** — il divario tra il prezzo a cui puoi vendere (bid) e il prezzo a cui puoi comprare (ask).

Se EUR/USD è quotato 1,0871 / 1,0873, lo spread è 2 pip. Compri a 1,0873 e la piattaforma marca la tua posizione al bid, 1,0871, quindi apri **sotto di 2 pip** — 20$ su un lotto standard, prima che il mercato abbia fatto qualcosa.

Sembra trascurabile finché non lo moltiplichi per la frequenza. Dieci giri completi al giorno su un lotto standard con uno spread di 1 pip fanno 10$ × 10 = 100$ al giorno, e su 250 giorni di trading, **25.000$** solo di spread. Gli spread si allargano anche bruscamente intorno alle pubblicazioni economiche e nelle ore magre dopo la chiusura di New York.

## La leva forex è di gran lunga più alta di quella azionaria, ed è lì il pericolo

Un lotto standard di EUR/USD a 1,0872 sono 108.720$ di valuta. Nessuno versa quella cifra; i broker richiedono invece un deposito a margine, e i requisiti forex sono estremi rispetto agli standard azionari. Un conto azionario statunitense ti dà 2:1 overnight, mentre la leva forex regolamentata arriva a 30:1 nell'UE e nel Regno Unito e a 50:1 negli Stati Uniti sui major — e i broker offshore pubblicizzano 500:1 e oltre.

<div class="table-wrap">

| Leva | Margine per 1 lotto standard EUR/USD (108.720$ di nozionale) |
|---|---|
| 2:1 (tipico conto azionario) | 54.360,00$ |
| 30:1 (tetto retail UE/UK) | 3.624,00$ |
| 50:1 (tetto retail USA) | 2.174,40$ |
| 500:1 (offshore) | 217,44$ |

</div>

Leggi l'ultima riga e la trappola è evidente. Con 2.000$ e 500:1 puoi detenere cinque lotti standard — 543.600$ di valuta — per 1.087,20$ di margine, lasciandoti 912,80$ liberi. Cinque lotti sono 50$ per pip, quindi un movimento di **20 pip** contro di te costa 1.000$, più del tuo margine libero, e vieni liquidato. Venti pip sono 0,0020 ÷ 1,0872 = **0,18%** del prezzo. Un movimento avverso più piccolo di un errore di arrotondamento su un grafico azionario chiude il conto.

L'inquadramento di marketing è che la leva permette a un piccolo conto di accedere a un grande mercato. L'inquadramento onesto è che la leva moltiplica un esito il cui segno non controlli: scala i guadagni e le perdite dello stesso fattore e non cambia in nulla la tua aspettativa per operazione, quindi se la tua strategia perde denaro in media, la leva non è una via più veloce al profitto ma una via più veloce allo zero. I broker regolamentati nell'UE e nel Regno Unito devono pubblicare la quota di conti retail che perdono denaro, e le cifre divulgate si attestano generalmente nella fascia 70-80%; le perdite guidate dalla leva sono la ragione dominante.

Tratta la leva come una capacità che declini per lo più: dimensionati dalla distanza del tuo stop e dal tuo budget di rischio, e lascia che il requisito di margine cada dove cade. [I futures portano meccaniche di leva simili](/blog/futures-trading-explained) tramite il margine del contratto, e vale la stessa disciplina.

## Major, minori, esotiche, e la settimana di trading da 24 ore

Le coppie sono raggruppate per liquidità. I **major** includono tutti il dollaro statunitense — EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD — e portano gli spread più stretti. Le **minori**, o croci, accoppiano due major senza il dollaro: EUR/GBP, EUR/JPY, GBP/JPY. Le **esotiche** accoppiano un major con una valuta più piccola o di un mercato emergente — USD/TRY, USD/ZAR, USD/MXN — dove gli spread corrono dieci o venti volte quelli di un major e il prezzo si muove violentemente su notizie politiche interne. I principianti appartengono ai major solo per una questione di costo.

Il forex tratta 24 ore al giorno, cinque giorni a settimana, aprendo con Sydney intorno alle 17:00 ET di domenica e chiudendo alle 17:00 ET di venerdì, con quattro sessioni regionali che si alternano: Sydney, Tokyo, Londra, New York. Il volume più pesante è la **sovrapposizione Londra-New York**, circa dalle 8:00 alle 12:00 ET, quando entrambi i centri più grandi sono aperti — gli spread sono più stretti e i movimenti più ampi in quel momento. Le sole ore asiatiche sono tipicamente tranquille e a range.

L'accesso ininterrotto non è un invito a tradare senza sosta. Scegli la finestra adatta ai tuoi setup e alla tua vita; che sia una sovrapposizione di due ore o una detenzione multi-giorno è la decisione tra [day trading e swing trading](/blog/day-trading-vs-swing-trading). E sebbene la settimana sia continua, il forex presenta gap nel weekend — il lunedì può aprire lontano dalla chiusura di venerdì, oltre qualsiasi stop in attesa nel mezzo.

## Cosa possono e non possono insegnarti le tre coppie di valute di Stockade

Il simulatore e la lista mercati di Stockade portano esattamente tre coppie — EUR/USD, GBP/USD e USD/JPY — a partire da 1,0872, 1,2714 e 157,42. Questi sono nomi di coppie reali, ma i dati di prezzo dietro di esse sono generati lato client da un random walk. Nulla è quotato da un mercato, e quei prezzi base sono punti di partenza fissi, non tassi in tempo reale.

Sii chiaro su cosa manca. Stockade non modella affatto uno spread bid-ask — un unico prezzo, quindi un'operazione lì non paga mai il costo che domina il forex retail reale. Non ci sono lotti, non c'è margine, non c'è leva e non c'è swap overnight; compri una quantità di unità contro un saldo virtuale di 100.000$, esattamente come faresti con un'azione. La serie generata non presenta mai gap, quindi non appare alcun gap del weekend. E la volatilità candela per candela è una frazione fissa del prezzo base di ogni strumento, identica su ogni simbolo del sito, quindi EUR/USD lì non mostra i movimenti percentuali caratteristicamente piccoli di una vera coppia major.

Ciò per cui è utile è la pratica di lettura: una quotazione a quattro decimali, contare i pip su un grafico senza prima tradurli in dollari, e 1,0872 accanto a 157,42 finché le due convenzioni non smettono di richiedere un attimo di riflessione.

## Esercitati sul simulatore

Apri EUR/USD e USD/JPY su Stockade e leggi le distanze in pip anziché in decimali — misura un'oscillazione su ciascuna e conferma che le convenzioni a quattro e due decimali producono movimenti comparabili. Poi prezza la stessa operazione due volte sul paper: cosa costerebbe o renderebbe con un lotto standard (10$ a pip su EUR/USD, 6,35$ su USD/JPY a 157,42) contro un micro lotto. Ricorda che né lo spread né la leva sono modellati lì, quindi le due forze che dominano il forex retail reale sono assenti, e che il denaro virtuale rende la disciplina di dimensionamento molto più facile di quanto sarà mai il denaro reale. Rendi le convenzioni automatiche sul [simulatore di paper trading di Stockade](/it/simulator/) prima che qualcosa di tutto ciò conti finanziariamente.
