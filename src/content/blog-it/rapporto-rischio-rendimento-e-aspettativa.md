---
title: "Rapporto Rischio-Rendimento e Aspettativa: Come si Legano"
description: "Il rapporto rischio-rendimento ti dice solo il tasso di successo di pareggio. La tabella, come stop e target lo spostano e perché 1:3 è una regola empirica."
date: 2026-10-26
author: "Stockade Team"
tags: ["Gestione del Rischio", "Strategia"]
slug: "rapporto-rischio-rendimento-e-aspettativa"
translationOf: "risk-reward-ratio-expectancy"
---

Una delle prime regole in cui si imbatte chi inizia a fare trading è "prendi solo operazioni con un rischio-rendimento di almeno 1:3". Così compri un ipotetico titolo da 40$, metti lo stop a 39$ e il target a 43$, e ti sembra la cosa responsabile da fare. Rischi 1$ per guadagnarne 3$. Difficile obiettare.

Il problema è che il rapporto non ti ha detto se l'operazione è buona. Da solo, non può farlo. Un rapporto rischio-rendimento è metà di un calcolo, e l'altra metà è la parte che quasi tutti saltano: quanto spesso il target viene davvero raggiunto prima dello stop.

## Cosa misura un rapporto rischio-rendimento e cosa lascia fuori

Il rapporto confronta due distanze. Il rischio è l'ingresso meno lo stop: 40$ − 39$ = 1$ per azione. Il rendimento è il target meno l'ingresso: 43$ − 40$ = 3$ per azione. Dividi il rendimento per il rischio e ottieni 3, che si scrive 1:3 o 3:1 a seconda dell'abitudine. Qui lo scriveremo 1:3, prima il rischio, e misureremo il rendimento in unità di rischio: il rendimento di questa operazione è 3R, dove 1R è quanto rischi di perdere. Se i multipli R sono nuovi per te, [la guida al dimensionamento della posizione](/it/blog/gestione-del-rischio-e-dimensionamento-della-posizione/) li spiega.

Ciò che il rapporto lascia fuori è la probabilità. Un'operazione 1:3 che raggiunge il target una volta su dieci è un'operazione cattiva. Un'operazione 1:1 che raggiunge il target sei volte su dieci è buona. Dal rapporto non puoi capire quale delle due hai in mano, perché il rapporto è un'affermazione sui prezzi che hai scelto, non su ciò che il mercato probabilmente farà.

## Il tasso di successo di pareggio per ogni rapporto rischio-rendimento

Ecco la cosa utile che un rapporto ti dice. Su molte operazioni, guadagni 3R ogni volta che vinci e perdi 1R ogni volta che perdi. Vai in pareggio quando le due cose si compensano. Se il tuo tasso di successo è *w*, significa w × 3 = (1 − w) × 1, che dà w = 1 ÷ 4, ovvero il 25%. La versione generale, per un rendimento di R unità di rischio:

```
Tasso di successo di pareggio = 1 ÷ (1 + R)
```

È la stessa formula che [la guida alle metriche di performance](/it/blog/analizzare-le-metriche-di-performance-di-trading/) usa per il rapporto guadagno/perdita, applicata prima dell'operazione invece che dopo. Eccola per i rapporti più comuni:

<div class="table-wrap">

| Rischio-rendimento | Guadagni per 1$ rischiato | Tasso di successo di pareggio |
|---|---|---|
| 1:0,5 | 0,50$ | 66,7% |
| 1:1 | 1,00$ | 50,0% |
| 1:1,5 | 1,50$ | 40,0% |
| 1:2 | 2,00$ | 33,3% |
| 1:3 | 3,00$ | 25,0% |
| 1:4 | 4,00$ | 20,0% |
| 1:5 | 5,00$ | 16,7% |

</div>

Leggila come un cartellino del prezzo. Scegliere 1:3 non ti fa guadagnare. Fissa l'asticella al 25%: vinci più spesso di così e in media la strategia guadagna, vinci meno spesso e perde. Superare o no l'asticella dipende dal setup, non dal rapporto.

La distanza tra il tuo tasso di successo reale e quello di pareggio è il tuo vantaggio. In termini di R, l'aspettativa è tasso di successo × R − tasso di perdita × 1. Un tasso di successo del 30% su operazioni 1:3 dà 0,30 × 3 − 0,70 = +0,20R per operazione. Lo stesso 30% su operazioni 1:2 dà 0,30 × 2 − 0,70 = −0,10R. Stessa frequenza di successo, risultato opposto.

## Spostare il target cambia le probabilità, non solo il guadagno

È qui che l'abitudine dell'1:3 trae in inganno. Quando sposti un target più lontano, non aumenti solo il rendimento. Riduci anche la probabilità di raggiungerlo. I due effetti tirano in direzioni opposte, ed è facile guardare solo il primo.

Prendi il caso estremo. Supponi che un prezzo non abbia alcuna tendenza in nessuna direzione, così che ogni piccolo movimento abbia la stessa probabilità di andare su o giù, come una moneta equa. È il classico problema della rovina del giocatore del calcolo delle probabilità, e per un percorso del genere [la probabilità di salire di un certo importo prima di scendere di un altro è la discesa divisa per la somma delle due](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). In termini di trading:

```
P(target prima dello stop) = distanza dello stop ÷ (distanza dello stop + distanza del target)
```

Con uno stop di 1$ e un target di 3$, fa 1 ÷ 4 = 25%. Esattamente il tasso di successo di pareggio della tabella. Prova qualsiasi altra coppia e succede la stessa cosa: su un prezzo senza direzione, ogni rapporto atterra esattamente sul proprio pareggio. Un target 1:5 viene raggiunto il 16,7% delle volte, un target 1:1 il 50%, e nessuno di questi in media guadagna o perde.

Pensiamo che sia il singolo fatto più utile sul rischio-rendimento. Il rapporto da solo non può creare un vantaggio. I prezzi reali non sono monete eque, ed è da lì che il vantaggio può venire: un setup vale la pena di essere tradato solo se rende il target *più* probabile di quella base di partenza. Il rapporto fissa l'asticella. È la tua ragione per entrare nell'operazione che deve superarla.

## Perché "mai meno di 1:3" è una regola empirica

Regole come "minimo 1:3" esistono per una ragione sensata. Ti costringono a indicare un target prima di entrare, e ti impediscono di rischiare un dollaro per guadagnare dieci centesimi. Come filtro, va bene.

Come legge, non regge. Confronta quattro setup ipotetici:

<div class="table-wrap">

| Setup | Rischio-rendimento | Tasso di successo | Pareggio | Aspettativa per operazione |
|---|---|---|---|---|
| A | 1:1 | 60% | 50,0% | 0,60 × 1 − 0,40 = **+0,20R** |
| B | 1:2 | 40% | 33,3% | 0,40 × 2 − 0,60 = **+0,20R** |
| C | 1:3 | 30% | 25,0% | 0,30 × 3 − 0,70 = **+0,20R** |
| D | 1:3 | 22% | 25,0% | 0,22 × 3 − 0,78 = **−0,12R** |

</div>

A, B e C rendono lo stesso per operazione. A non rispetta la regola dell'1:3 e va bene. D la rispetta e perde denaro. La regola non riesce a distinguerli, perché guarda solo uno dei due numeri.

C'è anche un costo meno visibile. Se il target naturale di un setup è a due dollari di distanza e tu insisti per tre, hai spostato il target oltre il punto in cui, secondo la tua idea, il prezzo probabilmente arriverà. Il rapporto migliora sulla carta mentre la frequenza di successo cala, spesso più di quanto la tabella possa assorbire. Quando il target onesto non dà un rapporto accettabile, la mossa migliore di solito è saltare l'operazione o aspettare un ingresso più vicino allo stop, non allungare il target.

## Anche spostare lo stop cambia il rapporto

Lo stesso compromesso vale nell'altro senso. Tieni il target a 43$ e stringi lo stop da 39$ a 39,50$. Il rischio scende a 0,50$, il rendimento resta 3$, e il rapporto salta da 1:3 a 1:6. Il pareggio scende dal 25% a 1 ÷ 7, ovvero il 14,3%.

Sembra un miglioramento gratuito. Non lo è. Uno stop a metà distanza viene colpito più spesso dal rumore ordinario, e sul prezzo senza direzione della sezione precedente la probabilità di raggiungere prima 43$ scende a 0,50 ÷ 3,50 = 14,3%. Di nuovo sul pareggio. Stringere lo stop aiuta solo se il nuovo stop si trova ancora dove la tua idea di trading viene dimostrata sbagliata, che è tutto il ragionamento alla base del [posizionare gli stop in base alla struttura](/it/blog/ordini-stop-loss-spiegati/).

Cambia anche la tua dimensione. Se rischi 200$ fissi per operazione, uno stop di 1$ significa 200 azioni, una posizione da 8.000$. Uno stop di 0,50$ significa 400 azioni e 16.000$. Il rischio in dollari è lo stesso in entrambi i casi, ma lo stop più stretto richiede il doppio del capitale, quindi verifica che ci stia prima di dare per scontato che il rapporto migliore sia alla tua portata.

## Il rapporto che pianifichi non è il rapporto che ottieni

Il rapporto che scrivi prima di entrare è un piano. Quello nei tuoi risultati è ciò che è successo, e di solito è peggiore. Quattro cose lo erodono:

- **Uscite anticipate.** Prendere profitto a 41,80$ perché ti sei innervosito trasforma un guadagno da 3R in uno da 1,8R.
- **Stop spostati.** Allargare uno stop a operazione in corso trasforma una perdita da 1R in una più grande.
- **Prezzi di esecuzione.** In un mercato veloce uno stop può essere eseguito oltre il suo livello, quindi un piano da −1R diventa −1,1R.
- **Costi.** Commissioni e spread si sottraggono da ogni operazione vincente e si aggiungono a ogni perdente.

I costi colpiscono di più gli stop stretti. Diciamo che i costi di andata e ritorno sul nostro titolo da 40$ ammontino a un ipotetico 0,05$ per azione. Con lo stop di 1$, un'operazione vincente rende al netto 2,95$ e una perdente costa 1,05$, quindi il pareggio diventa 1,05 ÷ (1,05 + 2,95) = 26,25% invece del 25%. Con lo stop di 0,50$, una perdente costa 0,55$ e il pareggio diventa 0,55 ÷ 3,50 = 15,7% invece del 14,3%. Stessi cinque centesimi, ma pesano di più su un rischio piccolo.

La soluzione è misurare il rapporto realizzato invece di fidarti di quello pianificato. Il guadagno medio diviso la perdita media (senza segno) è il tuo vero rapporto guadagno/perdita. Se hai pianificato 1:3 su 200$ di rischio ma il tuo guadagno medio è 420$ e la tua perdita media è 210$, in realtà stai facendo trading a 1:2. Il tuo pareggio è al 33,3%, non al 25%, e un tasso di successo del 28% che sembrava sano sta perdendo denaro.

## Come scegliere un target tenendo conto del tasso di successo

Mettendo tutto insieme, ecco l'ordine in cui lavoreremmo noi:

1. **Fissa prima lo stop,** al prezzo che dimostra che l'idea è sbagliata.
2. **Fissa il target dove il prezzo potrebbe realisticamente arrivare,** come il prossimo [livello di supporto o resistenza](/it/blog/livelli-di-supporto-e-resistenza/), non a un multiplo scelto in anticipo.
3. **Calcola il rapporto e il suo pareggio** dalla tabella.
4. **Confronta quel pareggio con il tasso di successo che hai registrato** per questo tipo di setup, e pretendi un margine netto sopra di esso. Se hai solo qualche decina di operazioni, quel tasso di successo è ancora una stima approssimativa; [la sezione sulla dimensione del campione](/it/blog/analizzare-le-metriche-di-performance-di-trading/) spiega quanto approssimativa.
5. **Se non lo supera, lascia perdere.** Niente target allungati.

Una volta che un'operazione supera il filtro, un [ordine bracket](/it/blog/ordini-oco-e-bracket/) tiene entrambe le uscite al posto tuo, così il piano non dipende dalla forza di volontà del momento. E scrivi il tuo margine minimo sopra il pareggio nel [tuo piano di trading](/it/blog/come-creare-un-piano-di-trading/), così lo decidi una volta sola invece che operazione per operazione.

## Esercitati sul simulatore

Sul [simulatore](/it/simulator/) di Stockade, i campi Stop Loss e Take Profit accettano prezzi, e insieme funzionano come un bracket OCO sulla tua posizione aperta: quando uno dei due si attiva, l'intera posizione si chiude al prezzo di quel tick ed entrambi i livelli vengono cancellati. Non ci sono spread né commissioni, quindi lì il divario tra rapporto pianificato e realizzato viene dalle tue uscite e dai tick che superano un livello. Prima di ogni operazione, scrivi il rapporto e il suo pareggio. Dopo 30 operazioni, apri [Analisi](/it/analytics/), dividi Guadagno medio per Perdita media senza il segno meno, e confronta il risultato con ciò che avevi pianificato, e il tuo Tasso di successo con il pareggio di cui avevi bisogno. I prezzi di Stockade sono generati nel tuo browser, un random walk con una tendenza direzionale che deriva lentamente, quindi una frequenza di successo lì non dice nulla su come si comporta un setup in un mercato reale. Ciò che allena è l'abitudine: stop, target, rapporto, pareggio, ogni volta.
