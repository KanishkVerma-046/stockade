---
title: "Strategia di Trading VWAP: Cos'è e Come la Usano i Trader"
description: "Il VWAP è il prezzo tipico cumulato per il volume, diviso per il volume cumulato. L'aritmetica, perché le istituzioni lo seguono, e dove fallisce."
date: 2026-05-04
tags: ["Indicatori", "Strategia"]
slug: "strategia-di-trading-vwap"
translationOf: "vwap-trading-strategy"
---

Hai comprato 500 azioni a 50,60$ e la posizione non è andata da nessuna parte. Più tardi ti chiedi se 50,60$ fosse persino un prezzo sensato da aver pagato. Il problema è che "sensato" ha bisogno di un punto di riferimento, e i candidati ovvi sono cattivi. Il prezzo di chiusura è dove le ultime azioni sono passate di mano, non dove lo ha fatto la maggior parte di esse. Il punto medio del range della giornata ignora se la giornata ha trascorso sei ore al massimo o sei minuti lì.

Il VWAP risponde correttamente alla domanda: ti dà il prezzo medio pagato dall'azione media scambiata finora oggi. Se il VWAP è a 50,38$ e hai pagato 50,60$, hai pagato più di quanto costava tipicamente un'azione quel giorno. Questa è una misurazione, non un segnale, e l'utilità del VWAP deriva dal prenderlo sul serio come misurazione anziché tradare i suoi incroci.

## Cosa calcola il VWAP, e perché non è una media mobile

VWAP sta per Volume Weighted Average Price (prezzo medio ponderato per il volume). Il calcolo è un totale progressivo diviso per un totale progressivo:

**VWAP = (prezzo tipico cumulato × volume) ÷ (volume cumulato)**

Il prezzo tipico è `(massimo + minimo + chiusura) ÷ 3` — un unico numero che rappresenta dove una barra ha scambiato, anziché solo dove è finita. Moltiplicalo per il volume della barra per ottenere il valore in dollari transato in quella barra, poi mantieni una somma progressiva sia del numeratore sia del denominatore dall'apertura della sessione in avanti.

Questo differisce da una media mobile semplice o esponenziale in due modi indipendenti, ed entrambi contano.

**Ponderazione.** Una SMA a 20 periodi dà a ciascuna delle sue 20 chiusure esattamente 1/20 del peso, sia che quella barra abbia scambiato 3.000 azioni sia 3 milioni. Il VWAP pesa ogni barra in base alle azioni effettivamente passate di mano in essa. Una barra ad alto volume muove molto il VWAP; una barra morta lo muove appena. Se vuoi il quadro completo di cosa il volume ti dice e cosa no, [il volume di trading ha il suo articolo dedicato](/blog/understanding-trading-volume/).

**Finestra.** Una SMA è una finestra scorrevole che elimina la barra più vecchia ogni volta che ne arriva una nuova. Il VWAP non elimina nulla — ogni barra dall'apertura della sessione resta in entrambi i totali permanentemente. Quella natura cumulativa guida la maggior parte del comportamento del VWAP, incluso il suo peggior punto debole, trattato più sotto. Il [confronto tra EMA e SMA](/blog/moving-averages-ema-vs-sma/) riguarda come ponderare le barre *recenti*; il VWAP non compete affatto in quella gara.

In parole semplici: una media mobile è un filtro di smussamento applicato al prezzo. Il VWAP è un fatto contabile sulle transazioni eseguite.

### Ripercorrere tre barre di aritmetica

Prendi un titolo con queste tre barre da un minuto.

<div class="table-wrap">

| Barra | Massimo | Minimo | Chiusura | Prezzo tipico | Volume | PT × Volume |
|---|---|---|---|---|---|---|
| 1 | 50,40 | 49,80 | 50,10 | 50,10 | 120.000 | 6.012.000 |
| 2 | 50,70 | 50,05 | 50,60 | 50,45 | 300.000 | 15.135.000 |
| 3 | 50,90 | 50,35 | 50,40 | 50,55 | 80.000 | 4.044.000 |

</div>

Il prezzo tipico della barra 1 è (50,40 + 49,80 + 50,10) ÷ 3 = 150,30 ÷ 3 = **50,10**. Quello della barra 2 è (50,70 + 50,05 + 50,60) ÷ 3 = 151,35 ÷ 3 = **50,45**. Quello della barra 3 è (50,90 + 50,35 + 50,40) ÷ 3 = 151,65 ÷ 3 = **50,55**.

Ora accumula. Dopo la barra 1, il VWAP è 6.012.000 ÷ 120.000 = **50,10** — con una sola barra, il VWAP eguaglia il prezzo tipico di quella barra.

Dopo la barra 2, il numeratore è 6.012.000 + 15.135.000 = 21.147.000 e il denominatore è 120.000 + 300.000 = 420.000. VWAP = 21.147.000 ÷ 420.000 = **50,35**.

Dopo la barra 3, il numeratore è 21.147.000 + 4.044.000 = 25.191.000 e il denominatore è 500.000. VWAP = 25.191.000 ÷ 500.000 = **50,382**, quindi 50,38$.

Confrontalo con una media non ponderata dei tre prezzi tipici: (50,10 + 50,45 + 50,55) ÷ 3 = 151,10 ÷ 3 = 50,367. Il VWAP è uscito più alto perché la barra 2 stava sopra la media non ponderata e portava 300.000 delle 500.000 azioni — il 60% di tutto ciò che è stato scambiato.

### Gli stessi prezzi con il volume spostato

Mantieni identici tutti e nove i valori di prezzo e scambia i volumi delle barre 2 e 3, così la barra 2 scambia 80.000 e la barra 3 scambia 300.000. Il numeratore diventa 6.012.000 + (50,45 × 80.000 = 4.036.000) + (50,55 × 300.000 = 15.165.000) = 25.213.000. Il volume totale è ancora 500.000. VWAP = 25.213.000 ÷ 500.000 = **50,426**.

Azione di prezzo identica, volume totale identico, e il VWAP si è mosso di 4,4 centesimi. Quella differenza è l'intero punto dell'indicatore. Il VWAP non traccia dove è andato il prezzo; traccia dove sono andate le azioni.

## Perché il VWAP si azzera all'apertura della sessione

Il VWAP è definito su una sessione, e alla prossima apertura i totali progressivi tornano a zero. Questo deriva da a cosa serve il VWAP. "Il prezzo medio pagato per azione oggi" è una statistica coerente. "Il prezzo medio pagato per azione da un punto non specificato nel passato" non lo è, perché deriva verso qualunque periodo con il volume più grande sia capitato, per quanto lontano nel tempo.

Seguono due conseguenze. Primo, le barre subito dopo l'apertura sono instabili: con cinque minuti al denominatore, il VWAP oscilla su quasi ogni barra, e diventa un riferimento stabile solo una volta che una quota significativa del volume della giornata sta dietro di esso.

Secondo, il VWAP non si trasporta tra i giorni. Il VWAP di ieri non è un livello sul grafico di oggi. I trader che vogliono un riferimento più lungo usano il VWAP *ancorato*, azzerando l'accumulo da un evento scelto — una pubblicazione di utili, un minimo di oscillazione, una barra di breakout — anziché dall'orologio. Stessa formula, punto di partenza scelto deliberatamente.

## Perché le istituzioni usano il VWAP come benchmark di esecuzione

Questo è il motivo per cui il VWAP conta affatto, e non ha nulla a che fare con i pattern grafici.

Un fondo che deve comprare 4 milioni di azioni non può inviare un solo ordine. Suddivide la posizione lungo la sessione. Dopo, qualcuno deve giudicare se il trader ha fatto bene il lavoro, e il metro standard è il VWAP: il prezzo medio di esecuzione ha battuto il VWAP ponderato per volume della giornata? Comprare 4 milioni di azioni a una media di 50,31$ contro un VWAP di sessione di 50,38$ significa aver risparmiato sette centesimi per azione — 280.000$. Molti desk sono compensati esattamente contro questo benchmark, e le strategie di esecuzione algoritmica sono esplicitamente costruite per seguirlo.

Questo crea un comportamento reale attorno alla linea: i compratori che lavorano ordini grandi diventano più disposti sotto il VWAP e più riluttanti sopra di esso, perché la loro pagella lo dice. Questo è ciò a cui le persone alludono quando chiamano il VWAP "dove le istituzioni difendono il prezzo". È un effetto genuino nei mercati liquidi — ma un effetto *comportamentale* prodotto da come vengono misurati i trader, non una legge fisica, ed è in gran parte assente nei titoli poco scambiati.

## Leggere il VWAP come supporto e resistenza intraday

A causa di quella pressione da benchmark, il VWAP agisce spesso come un livello dinamico: il prezzo ritraccia verso di esso, i compratori che sono indietro nella loro giornata intervengono, e il prezzo riprende. A differenza di un livello orizzontale disegnato a un massimo precedente, il VWAP si muove lungo la sessione, quindi il livello che stai osservando alle 10:15 non è il livello alle 14:30.

Due letture coesistono, e confonderle è il modo più comune in cui i trader usano male l'indicatore.

**Il ritorno alla media** si applica in una sessione bilanciata e laterale. Il prezzo si allontana dal VWAP, l'allontanamento non ha volume dietro di sé, e scatta indietro. I trader tradano contro le estensioni e puntano al VWAP stesso.

**La continuazione del trend** si applica in una sessione direzionale. Il prezzo si allontana dal VWAP e non torna mai indietro per più di un tocco, quindi tradare contro le estensioni significa combattere il trend tutto il giorno. Questa lettura tratta un ritracciamento *verso* il VWAP che regge come un ingresso nella direzione del movimento esistente, e una chiusura decisa attraverso il VWAP come il trend che fallisce.

La versione onesta è che non puoi sapere in quale delle due ti trovi finché la sessione non si è parzialmente svolta. Ciò che puoi controllare è se il prezzo ha attraversato il VWAP ripetutamente oggi o è rimasto da un lato. Attraversamenti ripetuti significano che la lettura del ritorno alla media ha funzionato; sessioni a senso unico significano che non ha funzionato.

Alcune piattaforme aggiungono bande di deviazione standard — VWAP più e meno una, due o tre deviazioni standard del prezzo dal VWAP. Danno all'idea di "allungamento" un numero anziché una stima a occhio, e un tocco della seconda banda è il trigger abituale per tradare contro il movimento. Sono un raffinamento genuino, ed ereditano ogni limite di seguito. Stockade disegna solo la linea VWAP, senza bande.

## Dove il VWAP si rompe

**Diventa più lento per tutta la sessione.** Alle 15:30, il denominatore contiene sei ore di volume. Una singola nuova barra muove appena la media, non importa quanto sia violenta. Il VWAP è al massimo della sua reattività quando è meno affidabile e al massimo della sua affidabilità quando è meno reattivo, e nulla lo risolve — è aritmetica.

**È privo di significato oltre il timeframe intraday.** Una media di sessione cumulativa non ha interpretazione su un grafico giornaliero o settimanale. Non c'è una sessione a cui azzerarsi. Se stai mantenendo posizioni attraverso i giorni, il VWAP non è il tuo strumento; vedi [day trading contro swing trading](/blog/day-trading-vs-swing-trading/) per cosa cambia con il periodo di detenzione.

**Vale quanto i dati di volume dietro di esso.** Il VWAP è una statistica ponderata per volume, quindi dati di volume scadenti producono una linea sbagliata con sicurezza. Feed retail che perdono le stampe fuori borsa, o strumenti dove il volume riportato non è affidabile, ti daranno un VWAP contro cui nessuna istituzione sta effettivamente misurandosi.

E come ogni indicatore, il VWAP guarda indietro. Riassume transazioni già avvenute. Non può dirti che la sessione sta per invertire.

## Esercitati a leggere il VWAP sul simulatore

I grafici di Stockade portano un interruttore VWAP sia su `/simulator` sia sul chart simulator, calcolato con la stessa formula di sopra — prezzo tipico per volume, accumulato e diviso. L'ancora differisce, però, e la differenza vale la pena conoscerla: la linea del simulatore non si azzera mai all'apertura di una sessione. Accumula su una finestra scorrevole delle candele più recenti, quindi ciò che stai leggendo è un VWAP progressivo senza ancora anziché il VWAP di sessione descritto nella sezione sull'azzeramento sopra. Stessa aritmetica, nessuna ancora. Attivalo ed esercita la competenza meccanica: il prezzo è sopra o sotto, quanto si è allungato, questa sessione sta attraversando la linea o cavalcando un lato di essa. Sii però chiaro su cosa stai esercitando. I prezzi di Stockade sono generati lato client da random walk, e il suo volume è un numero casuale estratto per candela, non correlato al movimento di prezzo. Non c'è partecipazione reale dietro di esso, quindi il volume lì non conferma nulla e l'effetto del benchmark istituzionale non esiste. Questo svuota la linea stessa, il che vale la pena dire esplicitamente: il codice VWAP del simulatore pesa ogni barra per quel volume casuale, e pesi casuali sono effettivamente pesi uniformi, quindi la linea disegnata si comporta più vicino a una media non ponderata del prezzo tipico che a un vero VWAP. La distinzione di ponderazione descritta all'inizio di questo articolo è reale, ma non è ciò che stai osservando qui — delle due cose che separano il VWAP da una media mobile, solo la finestra cumulativa è osservabile su Stockade. È aritmetica reale su input inventati — utile per allenare l'occhio, inutile come segnale.

Un avvertimento sopravvive al simulatore: le esecuzioni lì hanno pochissimo attrito — nessuno spread bid-ask, nessuna esecuzione parziale, e solo pochi centesimi di slippage quando uno stop o un target si attiva — e non c'è denaro reale in gioco. Aspettare che il prezzo torni al VWAP invece di inseguirlo è la parte difficile, ed è esattamente la parte che il paper trading non mette alla prova. [Apri il simulatore di borsa di Stockade](/it/simulator/), attiva il VWAP, ed esercitati a nominare ad alta voce, prima che ogni barra si chiuda, se la sessione sta tornando verso la linea o si sta allontanando da essa.
