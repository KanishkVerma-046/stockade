---
title: "Stop ATR: Fissare lo Stop-Loss in Base alla Volatilità"
description: "Uno stop di 1$ non è lo stesso su un titolo calmo e su uno agitato. Come l'ATR misura il range normale e come dimensionare uno stop ATR a rischio fisso."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indicatori", "Gestione del Rischio"]
slug: "stop-loss-con-atr"
translationOf: "atr-volatility-stops"
---

Prendi due ipotetici titoli, entrambi scambiati a 50$. Il primo di solito copre circa 0,50$ dal massimo al minimo in una giornata. Il secondo di solito ne copre circa 2,50$. Metti uno stop di 1$ sotto ciascuno e hai preso due decisioni molto diverse. Sul primo, lo stop è lontano due giornate intere di range. Sul secondo, è a meno di metà del range di una giornata normale.

Uno stop a importo fisso o a percentuale fissa tratta quei due titoli come se fossero uguali. Non lo sono, e lo stop che ignora la differenza è quello che viene colpito dal rumore. L'average true range, o ATR, misura quanto si muove normalmente uno strumento, così puoi impostare lo stop su quella base.

## Cosa misura il true range, e perché i gap contano

[L'ATR è stato sviluppato da J. Welles Wilder, che lo ha introdotto nel suo libro del 1978 *New Concepts in Technical Trading Systems*](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). Parte dal true range di una singola barra, che è la maggiore di tre distanze:

```
True range = la maggiore tra:
  massimo − minimo
  |massimo − chiusura precedente|
  |minimo − chiusura precedente|
```

Il massimo e il minimo sono le estremità delle ombre di una candela ([la guida alle candele](/it/blog/come-leggere-i-grafici-a-candele/) ne spiega l'anatomia). Su una barra normale vince la prima distanza. Diciamo che la chiusura precedente era 50,00$, e oggi il massimo è 51,20$ e il minimo 49,60$. Massimo meno minimo fa 1,60$. Il massimo è a 1,20$ dalla chiusura precedente e il minimo a 0,40$. Il true range è 1,60$, uguale al range semplice.

Le altre due righe servono per i gap. Supponi invece che il titolo apra a 52,50$ su una notizia, poi scambi tra 52,10$ e 53,00$. Il range della barra è solo 0,90$, ma il massimo è 3,00$ sopra la chiusura di ieri. Il true range è 3,00$. Chi ha tenuto la posizione durante quel gap ha subito un movimento di 3$, e il true range lo conta. Una semplice misura massimo meno minimo la chiamerebbe una giornata tranquilla.

## Come l'ATR fa la media del true range su 14 barre

L'ATR è una media del true range, e l'impostazione abituale è 14 barre. La versione di Wilder non è una semplice media mobile. Il primo valore è la media semplice dei primi 14 true range, e da lì in poi ogni nuovo valore è:

```
ATR = (ATR precedente × 13 + true range di oggi) ÷ 14
```

È lo smoothing riportato nella stessa pagina di StockCharts. Applicalo alla giornata del gap. Se l'ATR era 1,50$ e il gap produce un true range di 3,00$, il nuovo ATR è (1,50$ × 13 + 3,00$) ÷ 14 = 22,50$ ÷ 14 = 1,61$. Una giornata grande il doppio del normale sposta l'ATR di circa il 7%. È voluto: l'ATR descrive la barra tipica delle ultime settimane, non l'ultima.

Due cose che l'ATR non ti dice. Non ha direzione: un titolo che scende forte e uno che sale forte possono avere lo stesso ATR. Ed è espresso in unità di prezzo, quindi non puoi confrontarlo tra titoli diversi. Un ATR di 2$ è il 10% di un titolo da 20$ e lo 0,5% di uno da 400$. Se vuoi confrontarli, dividi l'ATR per il prezzo.

## Uno stop ATR, dall'inizio alla fine

Ecco il metodo, dall'ingresso al numero di azioni. Diciamo che hai un ipotetico conto da 25.000$ e rischi l'1% per operazione, quindi 250$. Compri un titolo a 80$, e il suo ATR a 14 giorni è 2,00$.

1. **Scegli un multiplo.** Useremo 2 × ATR, quindi lo stop è a 4,00$ di distanza.
2. **Fissa lo stop.** 80,00$ − 4,00$ = 76,00$.
3. **Dimensiona la posizione.** 250$ ÷ 4,00$ = 62,5, arrotondato per difetto a 62 azioni.
4. **Controlla i numeri.** 62 azioni × 80$ = 4.960$ di titolo. Se lo stop viene eseguito a 76$, perdi 62 × 4,00$ = 248$.

Il multiplo è una scelta, non una costante. Un ATR è grosso modo il range di una barra tipica, quindi uno stop a un ATR di distanza può essere raggiunto da una barra qualunque. Multipli più ampi danno più spazio all'operazione e comprano meno azioni. Per confronto, uno stop del 2% su questo titolo sarebbe a 1,60$ di distanza, solo 0,8 ATR, cioè dentro il movimento di una giornata normale. È il problema dell'inizio, tradotto in numeri.

Non esiste un multiplo giusto, e nessuno può dirti qual è il migliore senza testarlo sui tuoi setup. Conta di più sceglierne uno e usarlo con coerenza, così i tuoi risultati significano qualcosa quando li rivedi.

## Lo stesso rischio in dollari su titoli calmi e volatili

Il vero senso di uno stop ATR è ciò che fa alla dimensione della posizione. Tieni il rischio di 250$ e la regola 2 × ATR, e applicala a tre ipotetici titoli da 80$ con ATR diversi:

<div class="table-wrap">

| Titolo | ATR | Distanza dello stop (2 × ATR) | Azioni | Dimensione della posizione | Perdita allo stop |
|---|---|---|---|---|---|
| Calmo | 1,00$ | 2,00$ | 125 | 10.000$ | 250$ |
| Tipico | 2,00$ | 4,00$ | 62 | 4.960$ | 248$ |
| Volatile | 4,00$ | 8,00$ | 31 | 2.480$ | 248$ |

</div>

Il titolo volatile riceve uno stop quattro volte più ampio e una posizione grande un quarto. La perdita se hai torto resta più o meno la stessa. Tutta l'idea è questa: la volatilità cambia quante azioni tieni, non quanto perdi. [La guida al dimensionamento della posizione](/it/blog/gestione-del-rischio-e-dimensionamento-della-posizione/) spiega perché la dimensione dovrebbe sempre derivare dalla distanza dello stop invece di essere decisa per prima.

Attenzione però alla riga del titolo calmo. Un ATR stretto significa una posizione grande, e 10.000$ sono il 40% di questo conto. Verifica che la posizione rientri nella tua liquidità prima di dare per scontato che il numero di azioni della formula sia alla tua portata.

Tenere fisso il rischio in dollari mantiene intatta anche la matematica del drawdown. Le serie di perdite fanno male in base a quanto rischi per operazione, non a quanto sono ampi i tuoi stop, ed è per questo che [la guida al drawdown](/it/blog/matematica-del-recupero-dal-drawdown/) misura tutto in rischio per operazione.

## Combina l'ATR con la struttura invece di sostituirla

Uno stop ATR ha un punto debole: non conosce la tua idea di trading. Due ATR sotto il tuo ingresso potrebbero cadere nel mezzo di una zona di supporto, dove l'idea è ancora valida, o ben oltre il punto in cui è stata dimostrata sbagliata. [Posizionare lo stop in base alla struttura](/it/blog/ordini-stop-loss-spiegati/), oltre il livello che invalida l'operazione, risponde a *dove* va lo stop. L'ATR è più adatto a rispondere a *quanto spazio* lasciare oltre quel livello.

Quindi l'approccio che useremmo li combina. Trova il livello strutturale, poi aggiungi una frazione di ATR come margine. Diciamo che il minimo di oscillazione sotto il tuo ingresso a 80$ è 77,40$ e l'ATR è 2,00$. Aggiungi mezzo ATR, 1,00$, e lo stop va a 76,40$. Se sei alle prime armi nel trovare quei livelli, [la guida a supporto e resistenza](/it/blog/livelli-di-supporto-e-resistenza/) spiega i minimi di oscillazione e perché un livello è una zona e non una linea.

Ora dimensionala. Il rischio per azione è 80,00$ − 76,40$ = 3,60$, quindi 250$ ÷ 3,60$ = 69,4, arrotondato per difetto a 69 azioni, per una perdita di 248,40$ allo stop. Se la resistenza successiva è a 87,20$, il rendimento è 7,20$, esattamente 2R. È un'operazione 1:2 con un tasso di successo di pareggio del 33,3%, e [la guida al rischio-rendimento](/it/blog/rapporto-rischio-rendimento-e-aspettativa/) spiega come decidere se il tuo setup può superare quell'asticella.

## Uno stop dinamico con l'ATR: il Chandelier Exit

L'ATR funziona anche per gli stop dinamici (trailing). Una versione nota è il Chandelier Exit, [sviluppato da Charles Le Beau, che per impostazione predefinita si colloca a tre volte l'ATR a 22 periodi sotto il massimo più alto degli ultimi 22 periodi](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit):

```
Chandelier Exit (long) = massimo a 22 periodi − ATR(22) × 3
```

Se il massimo a 22 periodi è 90$ e l'ATR è 2,00$, l'uscita è 90$ − 6,00$ = 84,00$. Man mano che il prezzo fa nuovi massimi, la linea li segue verso l'alto.

La formula nasconde un tranello. Se l'ATR sale mentre il massimo resta fermo, la linea scende: con lo stesso massimo a 90$, un ATR di 2,50$ la porta a 82,50$. Usata come stop, significa allentarlo nel mezzo di un'operazione. Noi non lo faremmo. Uno stop dovrebbe muoversi solo a favore dell'operazione, la regola che sostiene la guida agli stop-loss, quindi se usi questa formula per uno stop dinamico, lascia lo stop dov'è ogni volta che la formula scende sotto di esso.

## Dove sbaglia l'ATR

L'ATR è una descrizione del passato, e ne ha i limiti.

- **È in ritardo.** Fa la media di 14 barre, quindi dopo una fase tranquilla è piccolo proprio prima di uno shock, e lento a recuperare dopo. Il gap di 3$ visto sopra l'ha spinto solo a 1,61$.
- **Non può fermare un gap.** Uno stop ATR è pur sempre un ordine stop. Se il prezzo apre oltre il livello, viene eseguito all'apertura, per quanto accuratamente tu abbia misurato il range.
- **Dipende dalla dimensione della barra.** Un ATR a 14 periodi su barre da cinque minuti è una frazione di quello giornaliero per lo stesso titolo. Misuralo sul timeframe su cui fai trading. Lo stop di un day trader dimensionato sull'ATR giornaliero sarà decisamente troppo ampio, e quello di uno swing trader dimensionato sull'ATR a cinque minuti sarà decisamente troppo stretto.
- **Non dice nulla sulla direzione o sul vantaggio.** Uno stop ben piazzato limita quanto costa un'operazione sbagliata. Non rende buona l'operazione.

## Esercitati sul simulatore

Stockade non ha un indicatore ATR. I suoi grafici mostrano EMA 9, 20 e 50, VWAP, RSI e MACD. Inoltre ogni simbolo usa la stessa impostazione di volatilità, scalata al suo prezzo, quindi non ci sono cicli di volatilità da mercato reale a cui adattarsi. Il range delle candele varia comunque: il range medio su qualche candela sale e scende per caso, e le candele si allargano nelle fasi occasionali in cui la tendenza direzionale nascosta è forte. E poiché ogni candela di Stockade apre esattamente dove ha chiuso la precedente, lì il true range è sempre uguale a massimo meno minimo.

Puoi comunque esercitarti con l'aritmetica. Sul [simulatore di grafici](/it/chart-simulator/), passa il cursore su ciascuna delle ultime 14 candele e annota i valori H e L nella barra dei valori in basso. Fai la media dei 14 range per ottenere un ATR semplice. Poi apri il [simulatore](/it/simulator/) in modalità replay, dove il grafico non mostra quei valori, e stima a occhio il range tipico delle ultime 14 candele rispetto alla scala dei prezzi. Metti lo stop a due di quei range sotto il tuo ingresso, controlla dove cade rispetto al minimo di oscillazione più vicino, calcola il numero di azioni per un rischio fisso in dollari prima di entrare, e scrivi il prezzo dello stop nel campo Stop Loss. I prezzi di Stockade sono generati nel tuo browser, quindi nulla di tutto questo dice qualcosa sulla volatilità di un titolo reale. L'abitudine che costruisce è quella che conta: misura il range, poi fissa lo stop, poi dimensiona.
