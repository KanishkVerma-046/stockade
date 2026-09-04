---
title: "Ordini a Mercato vs Ordini a Limite: Quando Usare Ciascuno"
description: "Un ordine a mercato garantisce l'esecuzione ma non il prezzo. Un ordine a limite garantisce il prezzo ma non l'esecuzione. Tutto il resto deriva da qui."
date: 2026-05-11
tags: ["Tipi di Ordine", "Basi"]
slug: "ordini-a-mercato-vs-ordini-a-limite"
translationOf: "market-orders-vs-limit-orders"
---

Hai fatto il lavoro. Avevi l'intera operazione pianificata: ingresso a 24,80, stop a 24,40, target a 25,60. Quaranta centesimi di rischio per ottanta centesimi di rendimento — un'operazione 2:1. Poi hai cliccato su acquisto a mercato per 400 azioni di un titolo poco scambiato, e la conferma è tornata a **25,20**.

Nulla è cambiato sul grafico in quel secondo. La tua operazione è cambiata completamente. Da 25,20 il tuo stop è a 80 centesimi di distanza e il tuo target è a 40 centesimi di distanza: stai rischiando 80 per guadagnarne 40, l'esatto inverso dell'operazione pianificata, e i 40 centesimi di differenza sono costati 160$ su 400 azioni prima che la posizione avesse un secondo di vita.

Quel singolo clic è la differenza tra i due tipi di ordine che ogni piattaforma ti mette davanti.

## Stockade non può riprodurre il problema descritto in questo articolo

Questo va detto subito, non in una nota a piè di pagina.

Le esecuzioni di Stockade hanno pochissimo attrito. Non c'è spread bid-ask, non ci sono esecuzioni parziali, e non c'è un book degli ordini nel simulatore di paper trading di Stockade. Un ordine a mercato viene eseguito esattamente al prezzo sullo schermo. Un ordine a limite viene eseguito immediatamente al prezzo che digiti nel campo — non aspetta che il mercato raggiunga il tuo livello, non si mette in coda, e non resta mai ineseguito. L'unica eccezione è un'uscita stop-loss o take-profit: queste vengono verificate contro un nuovo prezzo ogni 800 millisecondi e registrate al tick che ha superato il tuo livello, quindi vengono eseguite leggermente oltre di esso piuttosto che esattamente su di esso. Tutti i prezzi su Stockade sono generati nel tuo browser, quindi non esiste una sede di negoziazione né una controparte con cui trattare.

Puoi comunque esercitarti sulla **meccanica**: scegliere un tipo di ordine prima di cliccare, decidere un prezzo limite in anticipo invece di improvvisare, collegare uno stop-loss e un take-profit a un ingresso. Queste abitudini si trasferiscono.

Il **costo** no. Se fai paper trading su una strategia che rende 8 centesimi per azione e qui sembra profittevole, quella stessa strategia può risultare in pareggio o negativa una volta che uno spread reale di 4 centesimi e uno slippage occasionale prendono la loro parte. Non leggere mai un'esecuzione simulata come una previsione di una reale.

## Cosa ordina davvero al tuo broker ciascun tipo di ordine

Ogni ordine è una frase di istruzione.

Un **ordine a mercato** dice: *esegui questo immediatamente al miglior prezzo attualmente disponibile, qualunque esso sia.* Hai specificato quantità e direzione. Non hai specificato il prezzo, e hai rinunciato a ogni pretesa su di esso.

Un **ordine a limite** dice: *esegui questo solo al mio prezzo o meglio, e se non puoi, non eseguirlo.* "O meglio" significa più basso per un acquisto e più alto per una vendita — un ordine a limite di acquisto a 187,30 verrà eseguito volentieri a 187,25, mai a 187,35. Hai specificato il prezzo. Non hai specificato che accadrà qualcosa.

<div class="table-wrap">

| | Ordine a mercato | Ordine a limite |
|---|---|---|
| Garantisce | Esecuzione | Prezzo |
| Non garantisce | Prezzo | Esecuzione |
| Uso tipico | Uscire, urgenza | Entrare, pazienza |
| Rischio che accetti | Pagare più di quanto visto | Perdere del tutto l'operazione |

</div>

## Il compromesso da cui deriva tutto il resto

Ecco la frase da memorizzare: **un ordine a mercato garantisce l'esecuzione ma non il prezzo; un ordine a limite garantisce il prezzo ma non l'esecuzione.**

Ogni altra considerazione qui sotto è una conseguenza di quella singola frase. Ordine a mercato per uscire da una posizione in perdita? Sì — ti importa di più di uscire che degli ultimi centesimi, ed è l'esecuzione ciò che un ordine a mercato garantisce. Ordine a limite per entrare su uno strumento con spread ampio? Sì — è il prezzo ciò che è a rischio lì.

Quando non sei sicuro, chiediti quale fallimento preferiresti vivere: essere eseguito a un prezzo peggiore di quello voluto, o non essere eseguito affatto. La risposta indica il tuo tipo di ordine.

## Lo spread bid-ask, e perché un ordine a mercato ti costa in ingresso

Non esiste mai un solo prezzo. Ce ne sono sempre due. Il **bid** è il prezzo più alto che qualcuno è attualmente disposto a pagare; l'**ask** è il prezzo più basso al quale qualcuno è attualmente disposto a vendere. Diciamo che il bid è 187,38 e l'ask è 187,42. Lo **spread** è 187,42 − 187,38 = **0,04**, e il **punto medio** — il numero singolo più equo da chiamare "il prezzo" — è 187,40.

Compra 500 azioni a mercato. Un acquisto prende l'ask, quindi paghi 187,42 × 500 = **93.710$**. Al punto medio avresti pagato 187,40 × 500 = 93.700$. Sei indietro di 10$ nell'istante in cui vieni eseguito, con il prezzo immutato.

Questa è solo metà della storia, perché devi anche uscire. Vendere a mercato colpisce il bid a 187,38, quindi un'operazione completa — comprare all'ask, vendere al bid, mercato perfettamente invariato — costa l'intero spread: 0,04 × 500 = **20$**.

Venti dollari su una posizione da 93.700$ sono circa 2 punti base e sembrano irrilevanti. Non lo sono, una volta moltiplicati. Tre operazioni complete al giorno per 250 giorni di borsa fanno 750 operazioni complete; a 20$ ciascuna sono **15.000$** all'anno di solo spread, prima delle commissioni e prima di una singola operazione in perdita.

È peggio sugli strumenti poco liquidi. Se un titolo sottile mostra un bid di 42,10 e un ask di 42,35, lo spread è 0,25 — su un punto medio di 42,225 è lo 0,59%, circa 28 volte il costo relativo di sopra. Un'operazione completa di 200 azioni lì costa 0,25 × 200 = 50$, e il titolo deve muoversi di un quarto di punto a tuo favore prima che tu sia di nuovo in pareggio.

## Lo slippage, e le condizioni che lo peggiorano

Lo slippage è il divario tra il prezzo che hai visto quando hai cliccato e il prezzo che hai ottenuto. Lo spread è la parte prevedibile; lo slippage è il resto. Peggiora in tre condizioni, che spesso arrivano insieme:

- **Mercati veloci.** Durante una pubblicazione di utili o un dato economico, le quotazioni si aggiornano più in fretta di quanto il tuo clic riesca a viaggiare. L'ask che avevi puntato potrebbe non esistere più quando il tuo ordine arriva.
- **Book sottili.** Una quotazione mostra un prezzo, ma solo per una certa dimensione. Se solo 200 azioni sono offerte a 42,35 e ne compri 1.000, le altre 800 vengono eseguite contro qualunque cosa ci sia sopra — 42,40, 42,55, e così via. La tua esecuzione media è peggiore dell'ask che avevi visto.
- **Dimensione grande.** Il tuo stesso ordine è ciò che muove il prezzo. Stesso meccanismo di un book sottile, in arrivo dalla direzione opposta.

L'esempio iniziale aveva tutti e tre insieme: un book sottile, una dimensione che l'ha consumato, e una quotazione in movimento. Un ordine a limite avrebbe rifiutato quell'esecuzione.

## Ordini a limite eseguibili: il compromesso pratico

Non sei costretto a scegliere tra "qualsiasi prezzo" e "il mio prezzo o niente". Un ordine a limite prezzato dove il mercato può già raggiungerlo si chiama **ordine a limite eseguibile**, ed è quello che i trader esperti usano la maggior parte del tempo.

Con il bid a 187,38 e l'ask a 187,42, piazza un ordine a limite di acquisto a **187,45**. Poiché si trova sopra l'ask corrente, viene eseguito subito come un ordine a mercato — ma si rifiuta di essere eseguito sopra 187,45. Se il book è sottile e il prezzo corre, il tuo scenario peggiore è limitato invece che illimitato. Contro il punto medio di 187,40 quello scenario peggiore costa 0,05 × 500 = **25$**, contro i 10$ all'ask, contro i 200$ che uno scivolamento di 40 centesimi avrebbe preso.

Scambi una piccola quantità di certezza di esecuzione per un tetto rigido al disastro. Di solito è lo scambio giusto.

## Quando un ordine a mercato è davvero la scelta giusta

C'è una sola situazione in cui un ordine a mercato non è solo accettabile ma corretto: **uscire da una posizione che sta andando contro di te.**

Se il tuo livello di stop viene violato e devi essere fuori, la certezza dell'esecuzione è tutto ciò che conta. Un'uscita a limite al tuo prezzo ideale può restare ineseguita mentre la perdita si allarga, e una piccola perdita che non si esegue diventa una grande perdita che alla fine si esegue. L'alternativa a pagare qualche centesimo in più non è "un'esecuzione migliore", è "essere ancora dentro". Ecco perché gli [ordini stop-loss](/blog/stop-loss-orders-explained) tipicamente attivano un ordine a mercato una volta che il prezzo di stop viene scambiato.

La stessa logica vale per qualsiasi urgenza reale: chiudere prima di un annuncio programmato, uscire quando la tua tesi si è rotta, chiudere tutto alla fine della tua sessione. Quando devi essere fuori, sii fuori.

## Quando un ordine a limite è la scelta giusta

Quasi ovunque altrove.

**Ingressi.** Nulla ti obbliga a entrare in un'operazione. Se il tuo piano dice 24,80, piazza un limite a 24,80 e lascia che sia il mercato a venire da te. Un ingresso che insegui si è già mosso contro il tuo piano.

**Strumenti poco liquidi.** Dove lo spread è 0,25 anziché 0,04, un ordine a mercato consegna denaro reale su entrambi i lati dell'operazione.

**Scalare con pazienza.** Se vuoi 900 azioni, impila limiti su tre livelli — 300 a 24,80, 300 a 24,65, 300 a 24,50 — e accetta che potresti ottenerne solo una parte. Questo interagisce direttamente con il tuo [dimensionamento della posizione](/blog/risk-management-position-sizing): un ingresso parzialmente eseguito è una posizione più piccola, e il tuo calcolo del rischio dovrebbe riflettere la dimensione che hai effettivamente ottenuto.

**Uscite su un target.** Un target di profitto per definizione non è urgente, quindi un limite al tuo prezzo è esattamente giusto. Abbinare un take-profit a limite con un'uscita stop-loss è la struttura dietro gli [ordini OCO e bracket](/blog/oco-and-bracket-orders).

## L'ordine a limite che non si esegue mai ha un suo costo

Un ordine a limite che manca il bersaglio non è gratuito, e i principianti lo sottovalutano sistematicamente.

Torna alla quotazione 187,38 / 187,42. L'ask sembra caro, quindi piazzi un ordine a limite di acquisto a 187,30 — dodici centesimi sotto l'ask, che varrebbero 0,12 × 500 = 60$ se venisse eseguito. Non viene eseguito. Il prezzo non scende mai fino al tuo livello e corre fino a 191,00. Il movimento che avevi identificato correttamente era 191,00 − 187,42 = 3,58 per azione, ovvero **1.790$** su 500 azioni. Hai protetto 60$ e rinunciato a 1.790$.

Questo non è un argomento contro gli ordini a limite. È un argomento contro il prezzarli con avidità. Imposta il limite dove vuoi davvero l'operazione, non qualche centesimo meglio per sentirti furbo. Un guadagno mancato non lascia traccia nel tuo diario di trading, ed è esattamente per questo che è così facile ignorarlo.

## Esercita la decisione sul simulatore

Le esecuzioni di Stockade sono perfette, quindi non puoi esercitarti a pagare uno spread lì — ma puoi esercitarti nella decisione che determina se ne pagherai uno. Apri il [simulatore di borsa gratuito di Stockade](/it/simulator/), passa il ticket dell'ordine da mercato a limite prima di ogni ingresso, e scrivi il prezzo limite che useresti contro un book reale. Poi riserva gli ordini a mercato per chiudere le posizioni — il tasto F esiste proprio per questo. Porta quel riflesso su una piattaforma reale e lo spread sarà l'unica cosa nuova da imparare.
