---
title: "Gestione del Rischio 101: Dimensionamento della Posizione e la Regola dell'1%"
description: "La dimensione della posizione è il risultato della distanza dello stop, non un numero a caso: formula, regola dell'1%, recupero da drawdown e multipli R."
date: 2026-06-29
tags: ["Gestione del Rischio"]
slug: "gestione-del-rischio-e-dimensionamento-della-posizione"
translationOf: "risk-management-position-sizing"
---

Chiedi a un principiante quante azioni ha comprato e otterrai un numero tondo. Duecento. Cinquecento. Mille, se quella mattina il conto sembrava pieno. Chiedi il perché, e la risposta è di solito "mi sembrava giusto" oppure "è circa un terzo del mio potere d'acquisto". Lo stop viene piazzato dopo, ovunque suggerisca il grafico, e la perdita è quella che risulta. A volte 180$. A volte 2.400$.

Quella sequenza è al contrario, e invertirla è il cambiamento a più alto valore che la maggior parte dei nuovi trader può fare. La dimensione della posizione non è una decisione. È la risposta a un problema di divisione i cui input sono il tuo budget di rischio e la distanza del tuo stop. Decidi questi due elementi e il numero di azioni è già determinato — lo stai solo calcolando.

## La maggior parte dei principianti sceglie prima il numero di azioni, ed è al contrario

Ecco cosa succede quando la dimensione viene decisa per prima. Compri 500 azioni a 187,40. Il grafico dice che l'operazione è sbagliata sotto 185,90 — 1,50 di rischio per azione — quindi la perdita se lo stop si attiva è 500 × 1,50 = **750$**. Su un conto da 50.000$ è l'1,5% andato in fumo su un'operazione ordinaria. Prendi lo stesso setup con un'invalidazione più ampia e più onesta a 183,90, sempre 500 azioni, e la perdita diventa 500 × 3,50 = **1.750$**, ovvero il 3,5%. Stesso trader, stessa convinzione, stesso numero di azioni, e il danno è più che raddoppiato per il solo fatto di dove si trovava una linea sul grafico.

Quando la dimensione è fissa e la distanza dello stop varia, il tuo rischio in dollari oscilla casualmente. Quando il rischio in dollari è fisso e la distanza dello stop varia, il numero di azioni si adatta e ogni perdita risulta della stessa entità. La seconda disposizione è l'intero punto della gestione del rischio. [Gli ordini stop-loss](/blog/stop-loss-orders-explained) spiegano come trovare il prezzo di invalidazione; questo articolo riguarda cosa fare con quel numero una volta che lo hai.

## La formula di dimensionamento della posizione, passo dopo passo

La formula sta in una riga:

**azioni = (conto × % di rischio) ÷ (ingresso − stop)**

Sviluppiamola con cifre reali. Conto: 50.000$. Rischio per operazione: 1%.

- **Budget di rischio:** 50.000 × 0,01 = **500$**
- **Ingresso:** 187,40
- **Stop:** 185,90
- **Rischio per azione:** 187,40 − 185,90 = **1,50**
- **Azioni:** 500 ÷ 1,50 = 333,33, arrotondato per difetto a **333 azioni**
- **Rischio effettivo se lo stop si attiva:** 333 × 1,50 = **499,50$**
- **Valore nozionale della posizione:** 333 × 187,40 = **62.404,20$**

Arrotonda sempre *per difetto*. Arrotondare 333,33 a 334 porta il tuo rischio a 501$ — di poco superiore, ma arrotondare a proprio favore non è un'abitudine che vuoi costruire.

Nota l'ultima riga. Una posizione da 62.404$ su un conto da 50.000$ eccede la liquidità che hai. In un conto cash non potresti prendere questa operazione a piena dimensione; in un conto a margine potresti, e la leva è invisibile perché il numero di rischio continua a leggersi 500$. Aggiungi quindi un secondo vincolo: un'esposizione nozionale massima. Limitala al 100% del capitale e la posizione diventa 266 azioni con un rischio di 399$. La formula di dimensionamento ti dà un tetto alla perdita, non il permesso di detenere qualsiasi quantità di titoli.

<div class="table-wrap">

| Prezzo dello stop | Rischio/azione | Azioni per 500$ | Rischio effettivo | Nozionale |
|---|---|---|---|---|
| 186,90 | 0,50 | 1.000 | 500,00$ | 187.400$ |
| 185,90 | 1,50 | 333 | 499,50$ | 62.404$ |
| 184,40 | 3,00 | 166 | 498,00$ | 31.108$ |
| 183,90 | 3,50 | 142 | 497,00$ | 26.611$ |

</div>

Ogni riga rischia sostanzialmente gli stessi 500$. Ecco come si presenta quando la dimensione è un risultato.

## Il recupero da un drawdown è brutalmente asimmetrico

Questo è l'argomento più persuasivo di tutta la gestione del rischio, ed è pura aritmetica.

Perdi denaro e devi guadagnare indietro una *percentuale maggiore* di quella persa, perché la stai guadagnando su una base più piccola. Perdi il 50% di 50.000$ e ti restano 25.000$. Tornare indietro significa trasformare 25.000$ in 50.000$ — un guadagno del 100%. Non del 50%. La perdita e il recupero non sono mai lo stesso numero.

La forma generale è **recupero = perdita ÷ (1 − perdita)**:

<div class="table-wrap">

| Drawdown | Conto rimasto da 50.000$ | Guadagno necessario per recuperare |
|---|---|---|
| 10% | 45.000$ | 11,1% |
| 20% | 40.000$ | 25,0% |
| 30% | 35.000$ | 42,9% |
| 40% | 30.000$ | 66,7% |
| 50% | 25.000$ | 100,0% |
| 75% | 12.500$ | 300,0% |

</div>

Verifica una riga centrale: -30% lascia 35.000$, e 35.000 × 1,429 = 50.015$. Corretto.

Leggi lentamente l'ultima riga. Un drawdown del 75% richiede di quadruplicare ciò che resta solo per tornare al punto di partenza, e i trader in quella posizione quasi mai ci arrivano — l'unico modo per provarci è assumersi rischi ancora maggiori, che è esattamente ciò che ha prodotto il buco. La curva si irrigidisce ferocemente oltre il 30%, ed è per questo che limitare le piccole perdite conta più che catturare i grandi guadagni.

## Una serie di cinque perdite è ordinaria, ed ecco cosa costa

Supponi che la tua strategia vinca il 40% delle volte — una cifra perfettamente praticabile se i tuoi guadagni sono più grandi delle tue perdite. Allora ogni operazione perde con probabilità 0,60, e cinque perdite consecutive accadono con probabilità 0,60⁵ = 0,0778, circa **7,8%**.

Non è uno scenario da disastro. Su 100 operazioni ci sono 96 punti in cui una serie di cinque perdite potrebbe iniziare, e il numero atteso di tali serie è circa **tre**. Una serie di cinque non è sfortuna. È un martedì qualunque. Quindi l'unica domanda è cosa fa una serie ordinaria al tuo conto:

<div class="table-wrap">

| Rischio per operazione | Dopo 5 perdite consecutive | Conto rimasto da 50.000$ |
|---|---|---|
| 1% | 0,99⁵ = 95,1% | 47.549$ |
| 2% | 0,98⁵ = 90,4% | 45.196$ |
| 5% | 0,95⁵ = 77,4% | 38.689$ |
| 10% | 0,90⁵ = 59,0% | 29.525$ |

</div>

All'1%, cinque perdite ti costano il 4,9% e hai bisogno del 5,2% per recuperare. Non lo noti quasi. Al 5%, la stessa serie ordinaria costa il 22,6% e richiede un guadagno del 29,2% per essere annullata. Al 10% sei sotto del 41% e hai bisogno di un guadagno del 69,4% — da una strategia che ha appena perso cinque volte di fila, che è precisamente il momento in cui sarai meno capace di eseguirla.

Estendi la serie. Otto perdite di fila hanno probabilità 0,60⁸ ≈ **1,7%** — non comune, ma ti succederà. Al rischio dell'1%, resta il 0,99⁸ = 92,3% del conto. Al rischio del 10%, resta il 43,0% e hai bisogno di un guadagno del 132%. Il rischio di rovina non è un concetto esotico; è questa tabella estesa abbastanza a lungo. Un piccolo rischio per operazione è ciò che rende una serie ordinaria sopravvivibile invece che fatale.

## I multipli R trasformano ogni operazione nella stessa unità

Una volta che il rischio in dollari è costante, esprimi i risultati in **R**, dove 1R è il tuo budget di rischio per quell'operazione — 500$ nel nostro esempio.

Un'operazione che guadagna 1.250$ è +2,5R. Una che perde l'intero stop è -1R. Un'uscita anticipata a 180$ è +0,36R. Ora un'operazione da 333 azioni su un titolo e una da 142 azioni su qualcosa che costa il doppio sono direttamente confrontabili, perché entrambe hanno rischiato un'unità.

Questo rende l'aspettativa calcolabile. A un tasso di successo del 40% con guadagni medi di +2R e perdite medie di -1R:

**(0,40 × 2R) + (0,60 × −1R) = 0,80R − 0,60R = +0,20R per operazione**

Venti centesimi di R per operazione, ovvero 100$ su un'unità di 500$. Questa è aritmetica su un campione passato, non una previsione — i tassi di successo si spostano e i vantaggi decadono, quindi un'aspettativa storica positiva non promette nulla sulle prossime cento operazioni. Ma mostra perché un tasso di successo del 40% va bene, mentre un tasso di successo del 60% con perdite di -2R può comunque essere una strategia perdente. Questa seconda affermazione dipende interamente dalla dimensione dei guadagni: al 60% di vincite e perdite di -2R, il pareggio richiede un guadagno medio di +1,33R, quindi guadagni di +2R renderebbero effettivamente un sistema forte a +0,4R per operazione, e qualsiasi cosa sotto +1,33R lo affonda. Il tasso di successo da solo non basta mai per giudicare. La [pagina di analisi](/blog/analyze-trading-performance-metrics) di Stockade traccia tasso di successo, profit factor e guadagno/perdita medio, gli input grezzi di questo calcolo.

## I limiti di perdita giornalieri e settimanali fermano una brutta giornata prima che si accumuli

Il dimensionamento della posizione limita una singola operazione. Non fa nulla per la settima operazione di una mattinata frustrante, presa a tripla dimensione per recuperare la giornata.

Imposta limiti rigidi in R. Una struttura comune è **-3R giornaliero, -6R settimanale** — a un rischio dell'1% su 50.000$, sono 1.500$ in un giorno e 3.000$ in una settimana. Raggiungi il limite giornaliero e hai finito: piattaforma chiusa, niente "un altro setup". Il loro valore sta nell'essere fissati in anticipo da una versione di te che al momento non sta perdendo. Il trading di vendetta non è un difetto di carattere; è ciò che succede quando a un cervello alterato viene permesso di scegliere le dimensioni delle posizioni. Scrivi i numeri nel tuo [piano di trading](/blog/how-to-build-a-trading-plan) così la decisione è già presa.

## Le posizioni correlate rendono la tua esposizione reale più grande della somma

Tre posizioni che rischiano ciascuna esattamente l'1% sembrano un rischio del 3%. Di solito non lo è. Se tutte e tre sono titoli di semiconduttori, condividono un solo motore: un dato di settore negativo fa scattare tutti e tre gli stop insieme e perdi il 3% in un singolo movimento. Non hai preso tre operazioni all'1%, hai preso un'operazione al 3% su tre ticker. Vale lo stesso per tre token crypto che seguono gli stessi flussi, o una posizione lunga su un'azione insieme a una posizione lunga su un future su indice.

La soluzione è un limite combinato per tema — non più del 2% del rischio totale in un solo settore, fattore o direzione, indipendentemente da quanti ticker copra. Prima di aggiungere una posizione, chiediti quale singola notizia farebbe scattare tutti gli stop di ciò che detieni contemporaneamente, e somma il danno.

Stockade non può insegnarti questo, e fallisce per due motivi distinti. La serie di prezzi di ogni strumento è generata dal proprio random walk indipendente, quindi la correlazione tra simboli non è modellata affatto. Più fondamentalmente, il simulatore detiene esattamente una posizione alla volta — cambiare simbolo scarta qualunque cosa avessi aperto — quindi non c'è un portafoglio da sommare anche se le correlazioni esistessero. L'esposizione a livello di portafoglio non è qualcosa che puoi esercitarti qui; deve essere compresa come un concetto di mercato reale e applicata la prima volta che detieni davvero due cose contemporaneamente.

## La regola dell'1% è una convenzione, non una legge

Non c'è nulla di magico nell'1%. È un default comune perché sopravvive a lunghe serie di perdite pur lasciando che le buone operazioni contino. Il numero difendibile dipende dal tuo tasso di successo, dal tuo multiplo R medio, da quanto sono correlate le tue posizioni, e da come ti comporti quando sei in perdita. Alcuni professionisti rischiano lo 0,25% perché prendono molte posizioni contemporaneamente; alcuni swing trader rischiano il 2% su una manciata di idee al mese. Entrambi sono coerenti. Ciò che non è coerente è l'8% "perché il setup era davvero buono" — la convinzione non è un parametro di rischio, e il mercato non è mai stato informato della tua.

Un'asimmetria vale la pena di essere dichiarata chiaramente: i principianti quasi universalmente rischiano troppo, non troppo poco. Se non sei sicuro, inizia all'1%. Il costo di iniziare troppo in piccolo è un conto più lento; il costo di iniziare troppo in grande è nessun conto.

## Esercitati sul simulatore

Fai venti operazioni sul saldo di trading virtuale da 100.000$ di Stockade in cui calcoli il numero di azioni *prima* di aprire il ticket — ingresso, stop, rischio per azione, poi dimensione, in quest'ordine. All'1% sono 1.000$ per operazione, quindi controlla il diario di trading dopo per vedere se le tue perdite realizzate si raggruppano davvero vicino a 1R o vanno oltre. Ricorda che uno stop simulato si esegue al tick che ha superato il tuo livello anziché al livello stesso, e che il denaro virtuale rende questa disciplina molto più facile di quanto il denaro reale sarà mai. Fai i calcoli sul [simulatore di borsa di Stockade](/it/simulator/) finché la divisione non diventa automatica.
