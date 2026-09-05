---
title: "Medie Mobili Spiegate: EMA vs SMA e Come Usarle"
description: "SMA ed EMA differiscono per un solo moltiplicatore. L'aritmetica, perché 9/20/50 sono standard, come usarle come supporto e perché sono sempre in ritardo."
date: 2026-04-13
tags: ["Indicatori", "Analisi Tecnica"]
slug: "medie-mobili-ema-vs-sma"
translationOf: "moving-averages-ema-vs-sma"
---

Stai fissando un grafico che è salito, sceso, salito, sceso e salito di nuovo nelle ultime quaranta barre, e non riesci a capire se sta trendando o semplicemente oscillando. Ogni singola candela è rumore. La domanda a cui vuoi risposta — "questa cosa sta andando genericamente da qualche parte?" — non è visibile in nessuna barra singola, perché è una domanda sull'intera sequenza.

Una media mobile è la risposta più semplice a questa domanda. Prende una serie di prezzi di chiusura recenti, li collassa in un unico numero, e ridisegna quel numero su ogni nuova barra. Il tremolio si annulla, e ciò che resta è una linea che puoi guardare e chiamare immediatamente crescente, decrescente o piatta.

## Cosa calcola davvero una media mobile

Prendi gli ultimi cinque prezzi di chiusura di uno strumento: 182,00, 184,50, 183,00, 186,00, 185,50. Sommali: 921,00. Dividi per 5: **184,20**. Questa è una media mobile semplice a 5 periodi, o SMA.

La parola "mobile" è la metà importante. Sulla barra successiva arriva una nuova chiusura — diciamo 190,00 — e la più vecchia, 182,00, esce dalla finestra. La nuova somma è 921,00 − 182,00 + 190,00 = 929,00, e la nuova SMA è 929,00 ÷ 5 = **185,80**. La finestra è scorsa avanti di una barra e la media è salita di 1,60.

Nota che la media è cambiata per due motivi: è arrivato un nuovo prezzo *e* un vecchio prezzo è uscito. Quel secondo effetto è facile da perdere di vista — una SMA può balzare semplicemente perché un numero grande è uscito dal retro della finestra, anche se il prezzo di oggi si è mosso a malapena.

## SMA vs EMA: il moltiplicatore di ponderazione e perché l'EMA reagisce più in fretta

La SMA dà a ogni prezzo nella sua finestra lo stesso voto. In una SMA a 20 periodi, la chiusura di 20 barre fa conta quanto quella di ieri — poi, sulla barra successiva, non conta più nulla. È un modello strano di rilevanza.

La media mobile esponenziale lo risolve. Invece di una finestra, l'EMA mantiene un valore in corso e lo spinge verso ogni nuova chiusura di una frazione fissa — il **moltiplicatore di smussamento**:

```
moltiplicatore = 2 / (periodo + 1)
```

Per un'EMA a 9 periodi è 2 / 10 = **0,2**. La regola di aggiornamento è:

```
nuova EMA = EMA precedente + moltiplicatore x (nuova chiusura - EMA precedente)
```

Facciamo una barra. Supponi che l'EMA a 9 periodi legga attualmente 186,50 e la barra chiuda a 188,00. Il divario è 188,00 − 186,50 = 1,50. Moltiplica per 0,2 per ottenere 0,30. Quindi:

**nuova EMA = 186,50 + 0,2 x (188,00 − 186,50) = 186,50 + 0,30 = 186,80**

L'EMA si è mossa di 30 centesimi in risposta a un movimento di 1,50$. Chiude il 20% della distanza verso il nuovo prezzo su ogni barra, per sempre. Nulla esce mai completamente da un'EMA — i vecchi prezzi si limitano a rimpicciolirsi. Con un moltiplicatore di 0,2 il peso su una chiusura di *n* barre fa è 0,2 × 0,8ⁿ, quindi un prezzo di 10 barre fa porta ancora circa il 2,1% del peso, e uno di 30 barre fa porta un errore di arrotondamento.

Ora il confronto di velocità. La nostra SMA a 5 periodi è passata da 184,20 a 185,80 — un guadagno di 1,60 — quando è arrivato 190,00. Un'EMA a 5 periodi ferma allo stesso 184,20, moltiplicatore 2/6 = 0,3333, andrebbe a 184,20 + 0,3333 × 5,80 = **186,13**, un guadagno di 1,93. Stessi dati, più movimento. Questa è l'intera differenza: l'EMA reagisce più velocemente perché pesa maggiormente i prezzi recenti.

Più veloce non significa migliore. Più veloce significa segnali più precoci *e* più falsi. Una SMA è più silenziosa e ti terrà in un trend attraverso ritracciamenti che scacciano un trader che usa l'EMA. I grafici di Stockade calcolano le EMA nel modo standard: il primo valore viene seminato con una media semplice della finestra di apertura, e ogni barra successiva usa il moltiplicatore sopra.

## Scegliere un periodo, e perché 9, 20 e 50 compaiono ovunque

Il periodo è una manopola che bilancia reattività contro stabilità. Periodi brevi aderiscono al prezzo e girano costantemente; periodi lunghi ignorano la maggior parte di ciò che accade e girano raramente. Guarda cosa fa il moltiplicatore attraverso le tre EMA che Stockade sovrappone, usando un'EMA precedente di 186,50 e una chiusura di 188,00 in ogni riga:

<div class="table-wrap">

| EMA | Moltiplicatore | Movimento su un divario di +1,50 | Ruolo |
|---|---|---|---|
| EMA 9 | 2/10 = 0,2000 | +0,30 | Momentum a breve termine |
| EMA 20 | 2/21 = 0,0952 | +0,14 | Trend intraday |
| EMA 50 | 2/51 = 0,0392 | +0,06 | Inclinazione strutturale |

</div>

L'EMA 50 quasi non si muove a un movimento che sposta l'EMA 9 cinque volte tanto. Rispondono a domande diverse: la 9 risponde a "cosa ha fatto il prezzo quest'ora", la 50 risponde a "in che direzione ha pendere questo strumento per tutta la sessione".

Perché proprio questi numeri? Soprattutto convenzione che in parte si autoavvera — abbastanza trader guardano le stesse tre linee che le reazioni si raggruppano attorno a esse. Nulla è matematicamente speciale in 9, 20 o 50, e dovresti resistere alla tentazione di cercare il periodo "ottimale" sui dati passati. Questo è curve-fitting, e i periodi ottimizzati sul grafico di ieri decadono in fretta.

Stockade mette tutte e tre sul grafico in colori distinti — EMA 9 ambra, EMA 20 blu, EMA 50 viola — con un interruttore per ciascuna, così puoi ridurre tutto a una sola linea mentre impari cosa fa quella linea.

## Usare le medie mobili come supporto e resistenza dinamici

I [livelli di supporto e resistenza](/blog/support-and-resistance-levels/) orizzontali sono prezzi fissi. Una media mobile è un livello che si muove con il mercato, il che la rende utile nei trend dove una linea fissa diventa obsoleta entro un'ora. In un uptrend sano, il prezzo ritraccia, tocca o leggermente sottopassa un'EMA in salita, e riprende — i trader la chiamano "cavalcare la 20". In un downtrend la stessa linea agisce come un soffitto contro cui falliscono i rally.

Sii onesto su cosa sia questo. L'EMA non è una barriera; è una linea descrittiva che capita di trovarsi dove si è concentrato l'acquisto recente, e fallisce di routine. Se la tratti come supporto ti serve comunque uno stop sotto di essa — "il prezzo è rimbalzato dalla 20 le ultime tre volte" descrive tre eventi, non una proprietà dello strumento.

## La strategia dell'incrocio e la sua modalità di fallimento a scossa (whipsaw)

La regola meccanica classica: compra quando una MA veloce incrocia sopra una MA lenta, vendi quando incrocia di nuovo sotto. Sul set di grafici di Stockade è l'EMA 9 che incrocia l'EMA 20, o la 20 che incrocia la 50. In un trend sostenuto funziona bene — la linea veloce si stacca dalla linea lenta e ci resta, tenendoti dentro per tutta la durata.

In un range è uno sminuzzatore. Immagina il prezzo che oscilla tra circa 184 e 188. L'EMA 9 incrocia sopra l'EMA 20 a 186,40 — compri. Sei barre dopo il prezzo rotola a 185,20 e le linee incrociano di nuovo — vendi con una perdita di 1,20$. Quattro barre dopo incrociano di nuovo verso l'alto a 186,10 — compri — e il prezzo scivola a 185,00, altri 1,10$ persi. Due operazioni, nessun trend, e sei sotto di 2,30$ per azione prima di qualsiasi costo, puramente perché un mercato laterale fa incrociare avanti e indietro due linee quasi identiche. Questo è **whipsaw**, e non è un difetto nelle impostazioni. È ciò che succede quando applichi uno strumento di trend-following a un mercato che non ha trend.

La difesa non è un periodo migliore. È un filtro: prendi gli incroci solo quando la linea lenta è chiaramente inclinata, o richiedi conferma da qualcosa che misura una cosa diversa, come il [MACD](/blog/macd-explained/) — che è esso stesso costruito da EMA — o un riferimento ancorato al volume come il [VWAP](/blog/vwap-trading-strategy/).

## Leggere la pendenza della media mobile come filtro di trend

Prima dell'incrocio, guarda la pendenza. Un'EMA 50 piatta è il mercato che ti dice che non c'è un vantaggio direzionale qui, ed è il filtro più economico disponibile.

Quantificala invece di valutarla a occhio. Se l'EMA 20 leggeva 182,40 dieci barre fa e legge 186,90 ora, è salita di 4,50 in 10 barre — 0,45 per barra, circa lo 0,24% del prezzo per barra. Questa è una pendenza reale. Se leggeva 186,70 dieci barre fa e 186,90 ora, sono 0,02 per barra, circa lo 0,01% — piatta, e qualsiasi incrocio produca è rumore.

Una regola difendibile: prendi gli incroci long solo quando l'EMA 50 sta salendo, quelli short solo quando sta scendendo, e resta fuori quando è piatta. Ridurrà drasticamente il tuo numero di operazioni. Questo è il punto.

## Il limite che non puoi progettare via: le medie mobili sono in ritardo

Ogni media mobile è calcolata da prezzi che sono già stampati. Non c'è impostazione né variante che sfugga a questo. L'EMA riduce il ritardo rispetto a una SMA; non lo elimina, perché un moltiplicatore applicato a chiusure passate è comunque una funzione di chiusure passate.

Quindi una media mobile non ti farà mai entrare al minimo o uscire al massimo. Nel momento in cui un'EMA 9 gira verso l'alto, il minimo è già alle spalle; nel momento in cui un incrocio conferma un downtrend, una parte del declino è già avvenuta. Chiunque ti venda una configurazione che "predice" le inversioni ti sta vendendo una curva adattata a un grafico che ha già visto.

Ciò che una media mobile ti dà genuinamente è una descrizione coerente e non emotiva di dove si è trovato il prezzo rispetto a se stesso. Vale molto — ti impedisce di chiamare un downtrend un affare — ma è descrizione, non previsione. Usala per filtrare e per inquadrare, e metti la tua gestione del rischio da un'altra parte.

## Esercita le medie mobili sul simulatore

Apri un grafico su Stockade e disattiva tutto tranne l'EMA 20. Osserva qualche centinaio di barre e nota dove il prezzo la rispetta e dove la taglia dritta. Poi attiva l'EMA 9 e la 50 e conta quanti incroci sono avvenuti mentre l'EMA 50 era chiaramente inclinata rispetto a piatta — quel conteggio è l'intero argomento a favore del filtro di pendenza, nei tuoi stessi dati.

Tieni presente su cosa ti stai esercitando: i prezzi di Stockade sono generati nel browser, non provengono da nessuna borsa, quindi queste EMA descrivono un mercato simulato. L'aritmetica e le abitudini di lettura sono identiche; lo strumento sottostante è fittizio. Scorri una sessione generata candela per candela sul chart simulator così puoi fermarti a ogni incrocio e impegnarti prima che la barra successiva riveli la risposta. Inizia sul [simulatore di borsa di Stockade](/it/simulator/).
