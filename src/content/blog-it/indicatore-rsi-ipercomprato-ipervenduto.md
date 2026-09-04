---
title: "Indicatore RSI: Come Identificare le Condizioni di Ipercomprato e Ipervenduto"
description: "RSI sopra 70 non è un segnale di vendita. Cosa misura davvero l'RSI, perché ipercomprato significa forte, e come leggere la divergenza senza illudersi."
date: 2026-04-20
tags: ["Indicatori"]
slug: "indicatore-rsi-ipercomprato-ipervenduto"
translationOf: "rsi-indicator-overbought-oversold"
---

Ecco un'operazione che quasi tutti fanno una volta. Un titolo è corso forte per una settimana. Aggiungi l'RSI al grafico, lo vedi fermo a 78, e ti ricordi la regola: sopra 70 è ipercomprato, ipercomprato significa vendere. Quindi lo vendi allo scoperto. Nelle due settimane successive il titolo guadagna un altro 22%, l'RSI non scende mai sotto 68, e chiudi la posizione con una perdita più grande del movimento che stavi cercando di catturare.

La regola non era sbagliata, esattamente — avevi l'idea sbagliata su cosa dice. Un RSI a 78 non è il mercato che ti dice che sta arrivando un'inversione. Ti sta dicendo che i compratori hanno sopraffatto i venditori per quattordici barre di fila, il che è una descrizione di forza, non una previsione di debolezza. Tradarlo come segnale di vendita significa scommettere sistematicamente contro la cosa più forte sullo schermo.

## Cosa misura davvero l'RSI

Il Relative Strength Index, pubblicato da J. Welles Wilder nel 1978, risponde a una domanda ristretta: nelle ultime N barre, come si confrontano i movimenti al rialzo medi con quelli al ribasso medi? Questo è genuinamente tutto ciò che fa. Prende la variazione da chiusura a chiusura di ogni barra su una finestra di lookback — 14 barre di default — le separa in guadagni e perdite, fa la media di ciascun gruppo, e le confronta come rapporto chiamato RS, per relative strength (forza relativa):

```
RS = guadagno medio / perdita media
```

E quel rapporto viene compresso su una scala 0–100:

```
RSI = 100 - (100 / (1 + RS))
```

Facciamo un esempio. Supponi che nelle ultime 14 barre, il guadagno medio sulla finestra sia 2,40$ e la perdita media sia 1,20$. I movimenti al rialzo sono il doppio di quelli al ribasso:

- RS = 2,40 / 1,20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33,3 = **66,7**

Due dettagli su quelle medie. Primo, dividono per l'intero periodo di lookback, non per il numero di barre al rialzo — nove barre al rialzo che sommano 21,60$ danno un guadagno medio di 21,60 / 14 = 1,54$, non 2,40$. Secondo, dopo il primo calcolo Wilder usa una media mobile smussata anziché ricalcolare da zero: ogni nuova media è la media precedente moltiplicata per 13, più il valore della barra più recente, tutto diviso per 14. Quello smussamento è il motivo per cui l'RSI si muove in modo meno scattoso del prezzo grezzo.

## Perché la scala 0–100 non è lineare come ti aspetteresti

La formula comprime un rapporto illimitato in un intervallo limitato, e lo fa in modo non uniforme. Vale la pena memorizzare tre punti di riferimento:

<div class="table-wrap">

| Condizione | RS | RSI |
|---|---|---|
| Guadagno medio uguale a perdita media | 1,00 | 50,0 |
| Guadagno medio è 2,33× la perdita media | 2,33 | 70,0 |
| Guadagno medio è 0,43× la perdita media | 0,43 | 30,0 |

</div>

Verifica la riga centrale: 1 + 2,333 = 3,333, e 100 / 3,333 = 30, quindi RSI = 100 − 30 = 70. La riga inferiore: 1 + 0,4286 = 1,4286, e 100 / 1,4286 = 70, quindi RSI = 30.

Nota cosa significa. Per stampare 70, i movimenti al rialzo devono essere solo un po' più del doppio di quelli al ribasso — una condizione comune, non estrema. Oltre quel punto la scala si comprime bruscamente: spingere da 70 a 90 richiede che RS passi da 2,33 a 9, uno spostamento molto più grande nel mercato sottostante di quanto suggerisca il movimento di venti punti sul display.

## Perché 70 e 30 sono convenzioni, non leggi

Wilder scelse 70 e 30. Avrebbe potuto scegliere 75 e 25. Non c'è nessuna derivazione dietro di essi, nessuna soglia statistica a cui il comportamento cambia, nessun meccanismo che si attiva a 70,0 e si disattiva a 69,9. Sono numeri tondi che sembravano ragionevoli sui grafici che studiò negli anni '70, e sono rimasti perché tutti hanno copiato i default. La maggior parte dei software di grafici disegna quelle linee per te, il che rinforza silenziosamente l'idea che siano confini. Il grafico di Stockade fa lo stesso — passa il pannello inferiore a RSI e ottieni linee tratteggiate a 70 e 30. Sono segni di riferimento, non verdetti.

Lo stesso vale per il periodo di lookback di 14. Un'impostazione più breve come 7 reagisce più in fretta e colpisce gli estremi costantemente; una più lunga come 21 ci arriva raramente. Il periodo cambia quanto spesso vedi un segnale, non quanto è affidabile — lo stesso compromesso che governa [la scelta della lunghezza di una media mobile](/blog/moving-averages-ema-vs-sma).

## Ipercomprato significa forte, non "sul punto di invertire"

Questo è il punto su cui l'operazione iniziale ha sbagliato, e merita la sua aritmetica.

Immagina un forte uptrend: sulla finestra di lookback, 12 barre hanno chiuso al rialzo e 2 al ribasso. I guadagni sommano 28,00$, le perdite sommano 2,80$.

- Guadagno medio = 28,00 / 14 = **2,00$**
- Perdita media = 2,80 / 14 = **0,20$**
- RS = 2,00 / 0,20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9,1 = **90,9**

Ora chiediti cosa servirebbe per far scendere l'RSI di nuovo sotto 70. Dalla tabella sopra, RS deve scendere da 10 a 2,33 — le perdite medie dovrebbero più che quadruplicare rispetto ai guadagni medi. In una media smussata a 14 barre questo richiede molte barre di comportamento genuinamente diverso. Non succede perché il titolo ha avuto una candela rossa.

Quindi l'RSI non solo *tollera* di stare sopra 70 in un trend; ci resta aritmeticamente fissato finché il carattere del movimento non cambia. I trader chiamano questo "embedding" dell'RSI. Una lettura di 90 dice che il trend è insolitamente pulito, e un trend pulito è l'ultima cosa che vuoi tradare in contro-tendenza.

C'è una versione più sottile della stessa trappola. Supponi che l'RSI sia a 66,7 (guadagno medio 2,40$, perdita media 1,20$) e la barra successiva chiuda in rialzo di 1,00$. Applica lo smussamento: il nuovo guadagno medio è (2,40 × 13 + 1,00) / 14 = 32,20 / 14 = 2,30$, e la nuova perdita media è (1,20 × 13 + 0) / 14 = 15,60 / 14 = 1,114$. RS = 2,30 / 1,114 = 2,064, quindi RSI = 100 − (100 / 3,064) = **67,4**.

Il prezzo è salito e l'RSI si è mosso appena, perché il guadagno era più piccolo del guadagno medio corrente. L'RSI traccia il momentum, non il prezzo. Può muoversi lateralmente o scendere mentre il prezzo fa nuovi massimi — che è esattamente il setup che le persone chiamano divergenza.

## Come leggere la divergenza dell'RSI

La divergenza è un disaccordo tra prezzo e momentum.

**Divergenza ribassista:** il prezzo fa un massimo più alto, l'RSI fa un massimo più basso. Il prezzo è arrivato più lontano, ma con meno forza dietro rispetto all'ultima volta.

**Divergenza rialzista:** il prezzo fa un minimo più basso, l'RSI fa un minimo più alto. I venditori hanno spinto di nuovo il prezzo verso il basso ma con meno convinzione.

Per leggerne una, segna due punti di oscillazione dello stesso tipo sul prezzo — due massimi chiari, o due minimi chiari — e confronta l'RSI su ciascuno. Conta solo se i due sono oscillazioni comparabili con un vero ritracciamento tra di esse; tracciare linee tra barre arbitrarie produce una divergenza su quasi ogni grafico, motivo per cui sono così facili da vedere col senno di poi.

Sii diretto sul tasso di successo: la divergenza fallisce spesso, e fallisce peggio proprio dove sembra più allettante. Un trend forte stamperà tre o quattro divergenze ribassiste durante la salita, e solo l'ultima segna qualcosa — ognuna delle precedenti è una trappola che costa denaro. Tratta la divergenza come un motivo per stringere uno stop o smettere di aggiungere a una posizione vincente, non come un ingresso autonomo contro il trend. Tradare in contro-tendenza sulla forza in base a un segnale di divergenza è una delle [abitudini più costose che i nuovi trader sviluppano](/blog/common-day-trading-mistakes).

## Usare la linea 50 come filtro di trend

Il livello RSI più utile è quello che nessuno disegna. RSI 50 è dove i guadagni medi eguagliano esattamente le perdite medie. Sopra di essa, i movimenti al rialzo stanno vincendo; sotto, quelli al ribasso.

Questo rende 50 un filtro di regime economico:

- **RSI persistentemente sopra 50** — tratta 30 come irraggiungibile e smetti di cercare long in ipervenduto. In un uptrend, i ritracciamenti tendono a toccare il fondo intorno a 40–50.
- **RSI persistentemente sotto 50** — l'immagine speculare. I rally si bloccano vicino a 50–60 e non raggiungono mai 70.

Quell'asimmetria è più utilizzabile degli estremi. In un uptrend, un calo dell'RSI a 45 che regge e gira verso l'alto è un ritracciamento che finisce dentro un trend forte. Aspettare 30 lì significa aspettare una lettura che il trend non produrrà.

### Spostare le soglie a 80/20

Una volta accettato che le soglie sono convenzioni, adattarle è ovvio. In un mercato fortemente trendante, sposta le bande a 80 e 20. Ottieni molti meno segnali, e quelli che ottieni segnano letture genuinamente insolite anziché la normale forza del trend. In un mercato laterale, il default 70/30 funziona meglio, perché il ritorno alla media è effettivamente il comportamento dominante lì.

L'ordine conta: identifica prima il regime, poi scegli le soglie. Usare l'RSI per dirti il regime e poi usare lo stesso RSI per tradare contro di esso è un ragionamento circolare.

## Cosa non può fare l'RSI

L'RSI è costruito interamente da prezzi di chiusura che hai già visto. È una misura derivata e in ritardo — ogni valore è un fatto sul passato. Non vede l'azione intrabarra, e non porta nessuna informazione che non sia già nella serie di prezzi.

Non ha neppure una nozione del *perché* i prezzi si sono mossi. Una lettura di 90,9 da una salita costante e una da un singolo gap sembrano identiche alla formula. Questo è un buon motivo per leggere l'RSI insieme alla struttura del prezzo e al volume, e per sapere come differisce dal [MACD](/blog/macd-explained), che misura il divario tra due medie mobili anziché un rapporto guadagno/perdita.

## Esercitati a leggere l'RSI sul simulatore

Il modo più veloce per disimparare "70 significa vendi" è guardare l'RSI restare sopra 70 per quaranta barre mentre il prezzo sale. Apri il [simulatore di borsa di Stockade](/it/simulator/), passa il pannello inferiore del grafico da volume a RSI, e trova un tratto dove la linea si incorpora sopra 70 — poi nota quanta strada percorre il prezzo prima che l'RSI torni a 50. Fai anche l'esercizio opposto: segna ogni divergenza ribassista su un grafico in salita e conta quante hanno effettivamente preceduto un calo. I prezzi sono generati algoritmicamente anziché essere dati di mercato reali, ma l'aritmetica dell'indicatore è identica, e quel conteggio cambierà come usi lo strumento.
