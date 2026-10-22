---
title: "Backtesting vs Paper Trading: Cosa Può Dimostrare Ciascuno"
description: "Un backtest chiede se le regole avrebbero guadagnato in passato, il paper trading se sai seguirle. Cosa prova ciascuno, l'overfitting e una sequenza da usare."
date: 2026-12-07
author: "Stockade Team"
tags: ["Strategia", "Basi"]
slug: "backtesting-vs-paper-trading"
translationOf: "backtesting-vs-paper-trading"
---

Scrivi una regola, la applichi a due anni di prezzi passati, e guadagna. Ritocchi la lunghezza della media mobile, e guadagna di più. Poi la usi in tempo reale e non fa niente, o peggio. Oppure il contrario: fai paper trading su un setup per un mese, chiudi in attivo, e concludi che funziona.

Entrambe le conclusioni saltano un passaggio. Un backtest e un periodo di paper trading rispondono a domande diverse, e nessuno dei due, da solo, dimostra che hai un vantaggio. Questo articolo chiarisce cosa può mostrare ciascuno, i modi in cui ciascuno inganna, e l'ordine in cui li useremmo.

## Due test che rispondono a domande diverse

Un **backtest** applica regole fisse ai prezzi storici e registra cosa sarebbe successo. Chiede: *queste esatte regole avrebbero guadagnato su dati che esistono già?*

Il **paper trading**, chiamato anche forward testing quando serve a verificare una strategia, significa applicare le regole in tempo reale con denaro simulato. Pone due domande diverse: *riesci davvero a seguire queste regole man mano che arrivano i prezzi?* e *il risultato regge su dati che non esistevano quando le hai scritte?*

<div class="table-wrap">

| | Backtest | Paper trading |
|---|---|---|
| Dati | Il passato | I prezzi man mano che arrivano |
| Velocità | Anni di operazioni in pochi minuti | Tempo reale, un'operazione alla volta |
| Dimensione del campione | Può essere grande | Di solito piccola |
| Chi prende le decisioni | Le regole, meccanicamente | Tu, sotto pressione di tempo |
| Principale modo in cui inganna | Overfitting e distorsioni nel test | Troppe poche operazioni, e nessun denaro reale in gioco |

</div>

I due sono complementari. Un backtest può mostrare che una regola aveva un vantaggio sulla carta ma non può mostrare che la eseguirai. Il paper trading può mostrare che la esegui ma richiede molto tempo per raccogliere abbastanza operazioni da mostrare un vantaggio.

## Come ti inganna un backtest: l'overfitting

Overfitting significa regolare le regole finché non si adattano al particolare passato su cui hai fatto il test, incluso il suo rumore casuale, invece che a qualcosa che si ripeterà. Più varianti provi, più è probabile che la migliore sia un colpo di fortuna.

La parte scomoda è quante poche varianti bastino. Un articolo del 2014 pubblicato sulle *Notices of the American Mathematical Society*, ["Pseudo-Mathematics and Financial Charlatanism" di Bailey, Borwein, López de Prado e Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf), lo ha esaminato in dettaglio. Lo Sharpe ratio che usano misura il rendimento per unità di volatilità. I loro dati mostrano che, anche quando nessuna delle strategie ha un vero vantaggio, provare solo sette configurazioni indipendenti su un backtest di due anni basta perché ci si aspetti che la migliore mostri nel test uno Sharpe ratio annualizzato di 1, mentre il suo Sharpe ratio atteso su dati nuovi è zero. In un altro esempio, hanno generato 1.000 prezzi giornalieri come un random walk, quindi nessun effetto stagionale poteva esistere, e hanno comunque trovato una strategia stagionale con uno Sharpe ratio di 1,27.

La loro conclusione merita di essere adottata come regola: un backtest che non riporta quante varianti sono state provate non può essere valutato per l'overfitting. Quindi tieni il conto. Ogni modifica di parametro che testi è un'altra variante, comprese quelle che abbandoni. Se hai provato 30 combinazioni di lunghezze della media mobile e distanze dello stop per trovare la vincente, i risultati della vincente devono superare un'asticella molto più alta che se fosse stata la tua prima idea.

Un altro controllo che faremmo: guarda le impostazioni vicine a quella vincente. Se una media mobile a 17 barre guadagna ma quelle a 16 e a 18 perdono, il risultato probabilmente appartiene a quel tratto di storia più che all'idea. Una regola che vale la pena di testare ancora dovrebbe funzionare più o meno anche quando le sue impostazioni si spostano di poco.

## Look-ahead bias, survivorship bias ed esecuzioni gratuite

L'overfitting non è l'unico modo in cui un backtest può abbellire una regola. Ce ne sono altri tre da controllare ogni volta.

Il **look-ahead bias** (distorsione da informazione futura) consiste nell'usare informazioni che la regola non poteva avere nel momento in cui ha agito. Diciamo che una regola compra all'apertura quando la giornata chiude sopra la sua media a 20 giorni. All'apertura, nessuno conosce la chiusura. Un backtest che lascia sbirciare la regola apparirà molto migliore di qualsiasi cosa tu possa davvero tradare.

Il **survivorship bias** (distorsione di sopravvivenza) consiste nel testare solo strumenti che esistono ancora. Se testi una strategia azionaria sui componenti attuali di un indice, hai tolto senza accorgertene ogni società fallita, delistata o uscita dall'indice durante il periodo del test. I perdenti non sono nei tuoi dati, quindi i risultati pendono verso l'ottimismo.

Le **esecuzioni gratuite** consistono nel dare per scontato che ogni ordine sia stato eseguito al prezzo esatto voluto dalla regola, senza spread, commissioni o slippage. [La guida al rischio-rendimento](/it/blog/rapporto-rischio-rendimento-e-aspettativa/) mostra come pochi centesimi di costo per azione possano spostare il tasso di successo di pareggio di una strategia, e le strategie con stop stretti lo sentono di più.

## Cosa dimostra il paper trading e cosa non può dimostrare

Il paper trading testa la parte che un backtest non può testare: te. Riesci a individuare il setup in tempo reale, entrare senza esitare, lasciare in pace lo stop, e prendere l'uscita che dicono le regole? Una strategia che funziona meccanicamente può fallire qui, perché chi la esegue aggiunge una discrezionalità che il backtest non ha mai avuto. Inoltre ogni operazione è, per costruzione, su dati nuovi, quindi il forward testing non può adattarsi al passato come può fare un backtest.

Ha tre limiti. Primo, è lento, quindi i campioni restano piccoli. [La guida alle metriche di performance](/it/blog/analizzare-le-metriche-di-performance-di-trading/) mostra che a 40 operazioni un tasso di successo del 50% ha un intervallo approssimativo al 95% che va da circa il 34% a circa il 66%, che comprende sia un buon sistema sia uno cattivo. Secondo, il denaro non è reale. [La guida al paper trading](/it/blog/guida-al-paper-trading/) spiega cosa lascia fuori, e in breve: la disciplina che regge con denaro virtuale spesso cede con denaro reale. Terzo, le esecuzioni simulate di solito sono più generose di quelle reali.

## Confrontare i risultati del paper trading con il backtest

La domanda utile non è se il paper trading abbia guadagnato. È se i risultati del paper trading siano coerenti con ciò che diceva il backtest, e se no, perché.

Ecco un esempio ipotetico. Un backtest riporta un tasso di successo del 45% su operazioni pianificate a 1:2, quindi l'aspettativa è 0,45 × 2 − 0,55 × 1 = +0,35R per operazione. Fai 40 operazioni in paper trading e ne vinci 15, un tasso di successo del 37,5%, e la tua vincita media arriva a 1,8R invece di 2R. La tua aspettativa è 0,375 × 1,8 − 0,625 × 1 = +0,05R.

Leggi i due divari separatamente. Il divario nel tasso di successo rientra nel rumore: l'errore standard di un tasso di successo del 45% su 40 operazioni è √(0,45 × 0,55 ÷ 40), circa 7,9 punti percentuali, e il 37,5% è 7,5 punti sotto. Non puoi dire se quel divario sia reale. La vincita media è un'altra storia. Arrivare a 1,8R invece di 2R è qualcosa che puoi controllare operazione per operazione, e se [il tuo diario](/it/blog/diario-di-trading/) mostra uscite anticipate, è un problema di esecuzione, non di strategia. Sistema l'esecuzione e continua a testare prima di trarre qualsiasi conclusione sulle regole.

## La sequenza che useremmo

1. **Scrivi le regole in modo abbastanza preciso che uno sconosciuto possa verificarle.** [La guida al piano di trading](/it/blog/come-creare-un-piano-di-trading/) spiega come. Se non riesci a scriverle, non puoi né fare un backtest né seguirle.
2. **Fai il backtest su un periodo, e conta ogni variante che provi.**
3. **Tieni da parte un periodo successivo che non hai mai guardato, e testaci la versione finale una volta sola.** Se lì fallisce, hai imparato qualcosa a poco prezzo. Non ritoccarla finché non passa, o i dati tenuti da parte diventano solo altri dati su cui hai adattato la regola.
4. **Fai paper trading in avanti per un numero di operazioni fissato in anticipo,** registrando ognuna nel diario, e confronta i risultati con il backtest come nella sezione precedente.
5. **Passa al denaro reale con una dimensione piccola,** come descrive la guida al paper trading, e aumenta solo quando i risultati reali restano coerenti con entrambi i test.

Prima di ogni fase, scrivi quale risultato la chiuderebbe. Per la fase di paper trading potrebbe essere: dopo il numero di operazioni pianificato, con le regole rispettate in quasi tutte, l'aspettativa è sotto zero o molto sotto quella del backtest. Decidere dopo apre la porta allo stesso piegare delle regole che l'overfitting fa a un backtest.

Ogni fase può solo scartare una strategia o lasciarla passare alla successiva. Nessuna dimostra che il vantaggio durerà, e i mercati cambiano. Per questo il passo 5 parte in piccolo.

## Dove si colloca Stockade, e dove no

Stockade non può fare backtest. Non ha dati storici sui prezzi né un modo per eseguire regole in automatico. La sua modalità replay genera 600 candele da un minuto nel tuo browser e mostra le prime 61; il resto lo scorri a mano con Spazio o la freccia destra, oppure lo lasci avanzare in automatico, senza vedere cosa viene dopo.

Quindi il replay è un forward test della tua esecuzione, su dati sintetici. È utile per le abitudini da cui dipende il passo 4: seguire regole scritte, inserire gli stop al momento dell'ingresso, registrare ogni operazione. Non può dirti se una strategia ha un vantaggio. I prezzi di Stockade vengono da un algoritmo, un random walk con una tendenza direzionale che deriva lentamente, senza alcun legame con un mercato reale, quindi come va una strategia lì non dice nulla su come andrebbe sui prezzi reali. E come mostra l'esempio del random walk nell'articolo di Bailey, anche una serie senza alcun pattern reale può produrre risultati che sembrano quelli di una strategia che funziona. Un buon risultato su Stockade documenta la tua disciplina, non è una prova sulle regole. [La guida ai simulatori di mercato](/it/blog/cosa-e-un-simulatore-di-mercato-azionario/) spiega cos'altro un simulatore può e non può insegnare.

## Esercitati sul simulatore

Scrivi un insieme di regole su una pagina, poi apri il [simulatore](/it/simulator/) in modalità replay e fai 30 setup rispettandole alla lettera, con uno stop inserito nel campo Stop Loss su ogni operazione. Registra ognuna nel diario: setup, ingresso, stop e target pianificati, e se hai seguito le regole. Alla fine, non chiederti se hai guadagnato. Chiediti quante operazioni hanno violato le regole e qual è stata la tua vincita media in R rispetto a quella pianificata, perché sono questi i numeri che un vero forward test ti chiederebbe di fare bene.
