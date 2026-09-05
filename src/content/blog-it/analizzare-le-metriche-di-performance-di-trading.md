---
title: "Come Analizzare le Tue Performance di Trading: le Metriche Chiave"
description: "Il tasso di successo da solo inganna. Aspettativa, profit factor, drawdown e dimensione del campione spiegati con l'analisi di Stockade."
date: 2026-08-03
tags: ["Analisi", "Gestione del Rischio"]
slug: "analizzare-le-metriche-di-performance-di-trading"
translationOf: "analyze-trading-performance-metrics"
---

Finisci una settimana di trading di pratica, apri la pagina di analisi e vedi un tasso di successo del 68%. Sembra un bel risultato. Poi guardi il P&L totale ed è negativo. Non è rotto niente — hai appena scoperto che il numero che la maggior parte dei trader cita per primo è quello che ti dice di meno.

La [pagina di analisi](/it/analytics/) di Stockade calcola sei cifre principali dalle tue operazioni chiuse: P&L totale, capitale, tasso di successo, profit factor, guadagno medio e drawdown massimo. Sotto ci sono tre schede — una curva del capitale, un diario di trading, e una heatmap del tasso di successo per ora del giorno. Ecco cosa significa ciascuna e quali possono ingannarti.

## Perché un tasso di successo del 70% può far perdere denaro mentre uno del 35% lo fa guadagnare

Il tasso di successo è la quota delle tue operazioni chiuse terminate con un P&L positivo. Su Stockade è operazioni vinte diviso operazioni totali, e un'operazione che si chiude esattamente in pareggio viene conteggiata sul lato delle perdite — quindi le operazioni in pareggio tirano leggermente il numero verso il basso.

Il problema è che non dice nulla sulla *dimensione* dei guadagni e delle perdite. Considera due trader, ciascuno con 100 operazioni chiuse.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Tasso di successo | 70% | 35% |
| Guadagno medio | 50$ | 300$ |
| Perdita media | 150$ | 80$ |
| Rapporto guadagno/perdita (guadagno medio ÷ perdita media) | 0,33 | 3,75 |
| Tasso di successo necessario per il pareggio | 75% | 21% |
| **Aspettativa per operazione** | **−10$** | **+53$** |

</div>

Il Trader A vince quasi tre volte su quattro e sta perdendo denaro. Il Trader B sbaglia due operazioni su tre e sta accumulando. Su quelle 100 operazioni, A è sotto di circa 1.000$ e B è sopra di circa 5.300$. Giudicando solo dal tasso di successo, copieresti quello sbagliato.

## Aspettativa: il numero che risponde se il tuo sistema fa guadagnare

L'aspettativa è il risultato medio in dollari che dovresti aspettarti da una singola operazione, su molte operazioni. La formula:

```
Aspettativa = (Tasso di successo × Guadagno medio) − (Tasso di perdita × Perdita media)
```

La perdita media entra come numero positivo. Calcoliamola per entrambi i trader.

**Trader A:** 0,70 × 50$ = 35$ di guadagno atteso. 0,30 × 150$ = 45$ di perdita attesa.
35$ − 45$ = **−10$ per operazione.** Ogni operazione che A prende ha un valore atteso negativo. Fare più trading peggiora la situazione, più in fretta.

**Trader B:** 0,35 × 300$ = 105$. 0,65 × 80$ = 52$. 105$ − 52$ = **+53$ per operazione.**

Stockade non stampa l'aspettativa, ma puoi calcolarla in pochi secondi dal tasso di successo, dal guadagno medio e dalla perdita media che ricavi dal diario. Fallo prima di concludere qualsiasi altra cosa. Una strategia con aspettativa negativa non si sistema facendo trading più spesso o con dimensioni maggiori — la dimensione cambia solo quanto velocemente si dispiega l'aritmetica.

La cifra correlata è il **tasso di successo di pareggio**, che è `1 ÷ (1 + rapporto guadagno/perdita)`. Il rapporto guadagno/perdita del Trader B è 300 ÷ 80 = 3,75, quindi B va in pareggio a 1 ÷ 4,75 = 21% e sta vincendo il 35%. Il rapporto guadagno/perdita del Trader A è 50 ÷ 150 = 0,33, quindi A ha bisogno del 75% e sta arrivando solo al 70%. Quel divario di cinque punti è l'intera differenza tra i due conti.

### I multipli R: l'unità che rende comparabili operazioni diverse

Un guadagno di 60$ su un'operazione dove hai rischiato 600$ è un evento molto diverso da un guadagno di 60$ dove hai rischiato 40$, ma la colonna P&L del diario mostra entrambi come `+60,00$`. Definisci 1R come l'importo in dollari che metti a rischio all'ingresso — prezzo di ingresso meno prezzo dello stop, moltiplicato per il numero di azioni — quindi esprimi ogni risultato come multiplo di quello. Rischi 200$, guadagni 500$: +2,5R. Rischi 200$, perdi 180$: −0,9R.

In R, puoi fare una media tra simboli e dimensioni di posizione diverse senza distorsioni. L'aspettativa del Trader B è 0,35 × 3,75R − 0,65 × 1R = 1,3125 − 0,65 = **+0,66R per operazione** — una cifra che sopravvive ai cambiamenti nella dimensione del conto, il che la rende il modo più pulito per confrontare questo mese con il precedente. Presuppone che tu dimensioni in modo coerente, che è l'argomento a favore di una [regola di dimensionamento della posizione a percentuale fissa](/blog/risk-management-position-sizing/).

## Profit factor, guadagno medio e perdita media

Il profit factor è il profitto lordo diviso la perdita lorda su tutte le operazioni chiuse. Se le tue operazioni vincenti insieme hanno reso 10.500$ e quelle perdenti sono costate 6.200$, il profit factor è 10.500 ÷ 6.200 = **1,69** — per ogni dollaro perso, ne sono stati guadagnati 1,69. Qualsiasi valore sopra 1,0 è profittevole, e la scheda di Stockade lo mostra con due decimali e un suffisso `x`.

Lettura approssimativa: sotto 1,0 si perde, tra 1,0 e 1,3 è marginale e potrebbe facilmente essere rumore, tra 1,3 e 2,0 è un vantaggio rispettabile su un campione decente, e molto sopra 2,5 su un campione piccolo di solito significa fortuna. Se la scheda mostra `∞`, non hai ancora registrato un'operazione in perdita — un'affermazione sulla dimensione del campione, non sull'abilità.

Una particolarità: la riga dei KPI mostra il **guadagno medio** ma non la perdita media. Ottieni la perdita media dal diario sommando i P&L negativi e dividendo per il numero di operazioni in perdita, che la scheda Overview ti fornisce direttamente. Ti serve sia per l'aspettativa sia per il rapporto guadagno/perdita, quindi non saltarla.

## Drawdown massimo: la metrica che decide se puoi restare fedele a una strategia

Il drawdown massimo è il più grande calo dal picco al minimo subito dal tuo capitale, espresso in percentuale. Stockade lo calcola scorrendo le tue operazioni chiuse in ordine, tenendo traccia del massimo storico raggiunto e registrando il peggior calo percentuale sotto di esso.

Diciamo che porti 100.000$ fino a un picco di 112.000$, poi una serie di perdite ti trascina a 94.080$. Sono 17.920$ persi da un picco di 112.000$, quindi il drawdown massimo è del 16,0%. Nota cosa costa il recupero: risalire da 94.080$ a 112.000$ richiede un **guadagno del 19,05%**, non del 16%. I drawdown sono asimmetrici, e quelli profondi sono spietati — un −50% richiede un +100% per essere recuperato.

Questa è la metrica che decide se una strategia è utilizzabile *da te*. Un sistema con un'aspettativa forte e un drawdown del 40% è uno che la maggior parte delle persone abbandona nel punto più basso, trasformando un drawdown sulla carta in una perdita reale. Un avvertimento: Stockade lo calcola solo dalle operazioni chiuse, quindi una posizione aperta profondamente in perdita non appare finché non la chiudi.

## Cosa ti dice la forma della tua curva del capitale

La scheda Curva del Capitale traccia il tuo saldo corrente dopo ogni operazione chiusa, partendo da 100.000$, con il minimo e il massimo indicati sotto. La maggior parte delle persone legge solo l'ultimo punto. La forma dice molto di più.

Una curva che sale in modo costante con cali brevi e poco profondi indica un'aspettativa coerente e una dimensione delle perdite controllata. Una che resta piatta per lunghi tratti e poi sale verticalmente significa che una manciata di operazioni ha prodotto quasi tutto il profitto — rimuovile e non ti resta niente. Una scala che sale e poi ripetutamente restituisce un blocco consistente è la firma di chi taglia i guadagni troppo presto e lascia correre le perdite. E una linea quasi verticale senza ritracciamenti, su poche operazioni, non è una scoperta; è un campione piccolo.

Il grafico si autoregola anche sul tuo minimo e massimo, quindi un'oscillazione di 300$ e una di 30.000$ producono linee altrettanto drammatiche. Controlla le etichette prima di reagire alla pendenza.

## Dimensione del campione: perché meno di 100 operazioni non dimostrano quasi nulla

È qui che la maggior parte delle autoanalisi va storta. Supponi di avere 40 operazioni chiuse e un tasso di successo del 50%. L'errore standard di quella stima è:

```
ES = sqrt(0,5 × 0,5 / 40) = sqrt(0,00625) = 0,079 → 7,9 punti percentuali
```

Un intervallo approssimativo al 95% è circa due errori standard per lato, quindi il tuo vero tasso di successo a lungo termine potrebbe plausibilmente essere ovunque tra circa il **34% e il 66%**. Quell'intervallo contiene sia un sistema molto buono sia uno molto cattivo. Quaranta operazioni non ti hanno detto quasi nulla.

L'errore standard si riduce con la radice quadrata del numero di campioni, quindi dimezzare quella banda richiede quattro volte più operazioni — a 160 operazioni l'ES scende a circa 4,0 punti. Ecco perché circa 100 operazioni chiuse è la soglia minima abituale prima di trarre conclusioni, e perché l'errore analitico più comune è l'overfitting: riscrivere le tue regole dopo otto operazioni negative, quando otto operazioni sono puro rumore. Decidi in anticipo quante operazioni concedere a una modifica delle regole prima di giudicarla, e scrivilo nel [tuo piano di trading](/blog/how-to-build-a-trading-plan/).

## Trovare le tue ore migliori con la heatmap oraria

La scheda Heatmap Oraria dispone i giorni della settimana rispetto alle ore dalle 9:00 alle 20:00 e colora ogni cella in base al tasso di successo in quella fascia: verde al 65% e oltre, rosso sotto il 50%, neutro nel mezzo, e un trattino dove non hai operazioni. Passa il mouse su una cella per vederne il numero di operazioni.

Questo risponde a una domanda genuinamente utile: le tue operazioni del pomeriggio stanno silenziosamente finanziando quelle del mattino? Due avvertenze. Le celle sono colorate solo in base al tasso di successo, quindi una cella verde può comunque essere un'ora in perdita se quei guadagni sono minuscoli — verifica incrociata con il P&L del diario per quella fascia. E i campioni per cella sono piccoli: quattro operazioni con tre vincenti mostra il 75% e non significa nulla. Aspetta 20 o 30 operazioni in una fascia prima di chiamarlo un pattern. Le ore sono nel fuso orario locale del tuo browser, non di una sessione di borsa.

## Cosa registra il diario di trading e cosa devi registrare tu stesso

Il diario mostra otto colonne per ogni operazione chiusa: Simbolo, Direzione, Ingresso, Uscita, Quantità, P&L, Durata e Data, dalla più recente. È un registro completo di *cosa* hai fatto.

Non ha un campo per note o ragionamenti. Niente cattura perché sei entrato, quale setup pensavi di vedere, o se hai seguito le tue stesse regole — e la domanda di revisione più preziosa non è "quali operazioni hanno perso denaro" ma "quali operazioni hanno violato le mie regole", perché un'operazione che viola le regole ma per caso vince è più pericolosa di una perdita disciplinata. Tieni un documento separato che registri il setup, lo stop e il target pianificati, e una riga su se hai eseguito il piano, poi collegalo al diario per simbolo e orario. Quell'abitudine separa la pratica deliberata dal [semplice cliccare pulsanti](/blog/paper-trading-guide/), e fa emergere gli [errori ripetibili](/blog/common-day-trading-mistakes/) che nessuna dashboard può rilevare.

Due limiti. I dati vivono nella memoria locale del tuo browser, quindi cancellare i dati del sito cancella la tua cronologia. Più importante: queste metriche misurano il tuo processo decisionale, non il tuo temperamento. I prezzi di Stockade sono sintetici, non c'è spread bid-ask, e nessun denaro reale è in gioco. Un drawdown del 16% su una curva simulata è un numero; lo stesso drawdown con il tuo capitale è un'esperienza fisica, e la disciplina che tiene qui in modo pulito crolla regolarmente là.

## Esercitati sul simulatore

Fai 20 operazioni, poi apri la pagina di analisi e calcola a mano la tua aspettativa dal tasso di successo e dal guadagno medio più la perdita media che ricavi dal diario — scrivi la risposta prima di guardare il P&L totale. Poi continua fino a 100 operazioni e ricalcolala, e osserva quanto si è spostato il numero. Quello spostamento è l'errore standard di cui sopra, reso concreto.
[Apri il simulatore](/it/simulator/) e inizia a registrare operazioni degne di analisi.
