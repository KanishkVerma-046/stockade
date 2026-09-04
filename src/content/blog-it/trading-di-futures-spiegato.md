---
title: "Trading di Futures Spiegato: Contratti, Margine e Leva"
description: "Cos'è davvero un contratto future, come funzionano tick size e moltiplicatori, perché il margine è una garanzia e non un prestito, e come agisce la leva."
date: 2026-07-27
tags: ["Futures", "Gestione del Rischio"]
slug: "trading-di-futures-spiegato"
translationOf: "futures-trading-explained"
---

Un trader con 20.000$ apre un conto futures, compra un contratto E-mini S&P 500 a 5.248,75, e vede l'indice scendere di circa il 2% nella sessione successiva. Si aspettava di perdere circa il 2% di qualcosa. Ciò che ha effettivamente perso sono stati 5.248,75$ — più di un quarto del conto — perché la posizione non è mai stata 20.000$ di niente. Erano 262.437,50$ di esposizione all'indice controllati da un deposito.

Quel divario tra ciò che depositi e ciò che controlli è l'intero argomento dei futures. Tutto il resto — valori del tick, mesi di scadenza, contango — è dettaglio sovrapposto a questo.

## Un contratto future è un obbligo, non una quota di proprietà

Quando compri un'azione, compri una quota frazionaria di una società. Possiedi qualcosa. Può andare a zero, ma non può scendere sotto zero, e nessuno ti manda un conto.

Un contratto future è un oggetto completamente diverso: un accordo standardizzato, scambiato in borsa, per comprare o vendere una quantità specifica di qualcosa a una data e un prezzo specifici. Comprare un contratto /CL ti impegna a ritirare 1.000 barili di petrolio greggio alla scadenza. Venderne uno ti impegna a consegnarli. Nel frattempo non possiedi nulla — detieni un obbligo a due facce, e la controparte detiene l'immagine speculare.

"Standardizzato" è ciò che fa funzionare il mercato. Ogni contratto /CL è 1.000 barili dello stesso grado agli stessi termini, quindi i contratti sono intercambiabili: esci vendendo quello che hai comprato, non negoziando la tua uscita da un accordo, e la clearing house sta tra ogni acquirente e venditore. Quasi nessuno prende la consegna — i trader retail chiudono o rinnovano prima della scadenza. Ma l'obbligo di consegna ancora il prezzo al mercato sottostante, ed è per questo che la borsa richiede un deposito prima di lasciarti detenere una posizione.

## Specifiche del contratto: moltiplicatore, tick size e valore del tick

Un prezzo future non è un importo in dollari. È un numero che traduci in dollari attraverso il moltiplicatore del contratto. Stockade porta quattro simboli futures su `/simulator` e `/markets`, e ognuno si traduce diversamente.

<div class="table-wrap">

| Simbolo | Contratto | Moltiplicatore | Tick size | Valore del tick | Prezzo | Nozionale |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | 50$ per punto indice | 0,25 pt | 12,50$ | 5.248,75 | 262.437,50$ |
| /NQ | E-mini Nasdaq 100 | 20$ per punto indice | 0,25 pt | 5,00$ | 18.421,25 | 368.425,00$ |
| /CL | Petrolio greggio | 1.000 barili | 0,01$ | 10,00$ | 78,34 | 78.340,00$ |
| /GC | Oro | 100 once troy | 0,10$ | 10,00$ | 2.341,40 | 234.140,00$ |

</div>

Lavora una riga a mano. /ES a 5.248,75 con un moltiplicatore di 50$ è 5.248,75 × 50 = **262.437,50$** di esposizione nozionale per contratto. L'incremento minimo è 0,25 punti indice, e 0,25 × 50 = **12,50$** per tick. Muoviti di dieci tick a tuo favore — 2,5 punti indice — e hai guadagnato 125$.

Confondere le specifiche è costoso. /NQ si muove nello stesso incremento di 0,25 di /ES, ma con un moltiplicatore di 20$ ogni tick vale 5,00$, non 12,50$ — e /NQ si muove per molti più punti al giorno, quindi il valore del tick più piccolo non lo rende il rischio più piccolo. /CL e /GC condividono un valore del tick di 10$ per strade completamente diverse: un centesimo su 1.000 barili, e dieci centesimi su 100 once.

Il nozionale non è ciò che puoi perdere — un contratto non va a zero più di quanto lo faccia l'S&P. Ma il nozionale è ciò su cui viene calcolato il tuo P&L, ed è il numero contro cui si misura la leva.

## Perché il margine futures è una garanzia di prestazione, non un prestito

Questo è il punto più frainteso nei futures, ed è dove l'intuizione azionaria ti trae attivamente in inganno.

In un conto a margine azionario, il margine è denaro preso in prestito. Versi 30.000$, il broker ti presta 30.000$, compri 60.000$ di azioni, e paghi interessi. L'azione è collaterale. È un debito e si comporta come tale.

Il margine futures non è un prestito. Non viene preso nulla in prestito e non maturano interessi, perché non è stato acquistato nulla — hai stipulato un accordo, non hai comprato un asset. Il margine che versi è una **garanzia di prestazione**: un deposito in buona fede detenuto dalla clearing house per garantire che tu possa soddisfare i tuoi obblighi giornalieri. È più vicino a un deposito cauzionale che a un mutuo.

Ne seguono due conseguenze. Non c'è costo di interesse nel detenere una posizione future. E — la metà pericolosa — la dimensione del deposito non ha alcuna relazione con la dimensione del tuo obbligo. Una garanzia di prestazione è dimensionata per coprire circa un giorno di movimento avverso plausibile, non il valore del contratto. Ecco esattamente perché la leva è così alta.

## Margine iniziale, margine di mantenimento, e mark-to-market giornaliero

Due soglie governano il conto, e non sono lo stesso numero. Il **margine iniziale** è ciò che devi avere disponibile per aprire una posizione. Il **margine di mantenimento** è il pavimento inferiore sopra cui il tuo capitale deve restare per mantenerla aperta. Scendi sotto il mantenimento e ricevi una margin call, e devi ripristinare il conto — tipicamente fino al requisito iniziale, non semplicemente fino al mantenimento.

Tra i due si trova il **mark-to-market giornaliero**. Le posizioni futures si regolano ogni singolo giorno: i guadagni vengono accreditati in contanti, le perdite addebitate, ogni sessione, che tu chiuda o meno l'operazione. Non esiste una perdita futures non realizzata che riposa tranquillamente sui libri.

Tutte le cifre di margine qui sotto sono **puramente illustrative** — le borse e i broker le fissano, variano per broker, e salgono quando sale la volatilità. Non trattare mai un numero da un articolo come attuale.

Supponi che il margine iniziale di /ES sia 13.000$ e il mantenimento 11.800$. Depositi 20.000$ e compri un contratto a 5.248,75.

- **Giorno 1:** il prezzo scende a 5.180,00 — 68,75 punti × 50$ = **−3.437,50$**, addebitati quella sera. Capitale: 16.562,50$. Sopra il mantenimento, nessuna azione.
- **Giorno 2:** il prezzo scende a 5.080,00 — 168,75 punti × 50$ = **−8.437,50$** cumulativi. Capitale: 11.562,50$, sotto il pavimento di 11.800$.
- **La chiamata:** ripristina il capitale al requisito iniziale di 13.000$. Bonifichi **1.437,50$** o il broker liquida per te.

Due sessioni ordinarie. Un movimento del 3,2% nell'indice. Una margin call.

## L'aritmetica della leva: cosa fa un movimento del 2% al capitale depositato

Dividi il nozionale per il deposito e ottieni il rapporto di leva. 262.437,50$ ÷ 13.000$ ≈ **20:1**. Stai controllando circa venti dollari di indice per ogni dollaro depositato.

Ora esegui il calcolo che conta:

- Movimento avverso del 2% sul nozionale /ES: 262.437,50 × 0,02 = **5.248,75$**
- Come quota di un deposito a margine di 13.000$: 5.248,75 ÷ 13.000 = **40,4%**

Un movimento del 2% nel sottostante cancella il 40% del capitale che hai depositato. L'S&P 500 ha giornate del 2% diverse volte in un anno medio. Questa asimmetria — piccolo movimento, danno proporzionale enorme — è la cosa più importante di questa pagina, ed è per questo che [l'aritmetica della regola dell'1% e del dimensionamento della posizione](/blog/risk-management-position-sizing) non è opzionale nei futures. Significa anche che [il posizionamento dello stop-loss](/blog/stop-loss-orders-explained) deve avvenire prima dell'ingresso, non dopo. Nelle azioni uno stop dimenticato è un'operazione sbagliata. A 20:1, è un evento di solvibilità.

## Scadenza, rollover, e contango nei futures su materie prime

Ogni contratto future muore secondo un calendario. /ES scade trimestralmente — marzo, giugno, settembre, dicembre. Il petrolio greggio scade mensilmente. Per mantenere l'esposizione oltre la scadenza devi **rinnovare**: chiudere il contratto in scadenza e aprire quello del mese successivo, di solito nella settimana o due prima della scadenza mentre la liquidità migra in avanti.

I due mesi non trattano allo stesso prezzo. Quando il contratto con scadenza più lontana è più costoso di quello più vicino — spesso perché immagazzinare petrolio fisico costa denaro — il mercato è in **contango**. Quando è più economico, tipicamente quando una carenza attuale fa pagare di più agli acquirenti per barili immediati, è in **backwardation**.

Il contango è un costo reale per chi detiene una posizione lunga. Se /CL del mese corrente è a 78,34 e il mese successivo è a 78,95, rinnovare un contratto lungo significa vendere basso e comprare alto: 0,61 × 1.000 barili = **610$** per rinnovo. Rinnova mensilmente per un anno in un mercato persistentemente in contango e il drag si accumula anche se il petrolio finisce l'anno invariato. Ecco perché le posizioni su materie prime detenute attraverso molti rinnovi spesso restano indietro rispetto al prezzo spot che seguono.

## I contratti micro come punto d'ingresso realistico per i piccoli conti

I contratti micro sono un decimo del loro genitore E-mini, e per la maggior parte dei conti retail sono l'unica dimensione di partenza difendibile. /MES è 1/10 di /ES: **5$ per punto indice**, valore del tick 0,25 × 5 = **1,25$**, nozionale a 5.248,75 di 5.248,75 × 5 = **26.243,75$**. /MNQ è 1/10 di /NQ a 2$ per punto.

La differenza per un piccolo conto non è cosmetica. Su un conto da 5.000$ con uno stop a 10 punti indice di distanza:

- **1 contratto /ES:** 10 × 50$ = **500$** a rischio — **10%** del conto su un'operazione.
- **1 contratto /MES:** 10 × 5$ = **50$** a rischio — **1%** del conto.

La versione /MES è un'operazione normale. La versione /ES è una scommessa che nessuna convinzione giustifica. I micro ti permettono anche di scalare in decimi invece di affrontare una decisione tutto-o-niente — lo stesso argomento della granularità che rende [il dimensionamento della posizione forex](/blog/forex-trading-for-beginners) praticabile con mini e micro lotti.

## Cosa possono e non possono insegnarti i simboli futures di Stockade

Sii chiaro sul confine. I simboli /ES, /NQ, /CL e /GC di Stockade portano nomi del mondo reale, ma i prezzi dietro di essi sono generati lato client da un random walk — nessun feed di borsa, nessun dato di mercato, nessun archivio storico da nessuna parte nel prodotto. I simboli sono etichette su serie sintetiche.

Il simulatore non modella nemmeno le meccaniche futures. Il P&L viene calcolato per unità di quantità, esattamente come per un'azione: nessun moltiplicatore del contratto, nessun margine iniziale o di mantenimento, nessun addebito mark-to-market, nessuna margin call, nessuna scadenza o rinnovo. Tradare 1 unità di /ES lì non equivale a tradare un contratto da 262.437,50$, e nulla sul sito richiederà mai un bonifico.

Ciò per cui è utile è provare il *processo* contro un andamento dei prezzi a forma di futures: impostare uno stop prima dell'ingresso con le scorciatoie B/S/F, fare l'aritmetica del moltiplicatore sulla carta insieme a una posizione aperta, rivedere i risultati in `/analytics`. E il solito limite si applica qui più duramente che altrove — un simulatore rimuove il peso emotivo del denaro reale, e i veri futures possono infliggerti una perdita più grande del margine che hai depositato se il mercato salta con un gap oltre il tuo stop durante la notte.

## Esercitati sulla meccanica dei futures sul simulatore

Apri /ES sul simulatore e, prima di piazzare qualsiasi cosa, scrivi il moltiplicatore, il valore del tick, e il nozionale al prezzo corrente. Poi prendi una posizione e traduci ogni movimento in dollari di contratto nella tua testa — 2,5 punti sono 125$, dieci punti sono 500$ — finché la conversione non diventa automatica. Fai lo stesso su /CL, dove un centesimo vale 10$, così il riflesso si trasferisce invece di attaccarsi a un solo simbolo. Poi esegui il controllo della leva: a 20:1, quanto può muoversi questo mercato prima che sparisca il 40% di un deposito versato?

Inizia sul [simulatore di paper trading di Stockade](/it/simulator/) con quell'aritmetica scritta, non stimata.
