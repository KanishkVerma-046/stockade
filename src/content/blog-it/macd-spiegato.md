---
title: "MACD Spiegato: Come Leggerlo e Fare Trading Con Esso"
description: "Il MACD è due medie mobili, la loro differenza e una copia smussata di quella differenza. Come calcolare ogni parte, leggerlo e sapere quando inganna."
date: 2026-04-27
tags: ["Indicatori"]
slug: "macd-spiegato"
translationOf: "macd-explained"
---

Stai guardando un grafico salire e non riesci a rispondere all'unica domanda che conta: questo movimento sta ancora guadagnando forza, o sta andando per inerzia? Un titolo può stampare cinque chiusure più alte di fila mentre ognuna di quelle chiusure guadagna meno terreno della precedente — trend intatto, motore morente. Quando questo si manifesta nel prezzo è di solito troppo tardi per agire.

Il MACD esiste per colmare questo divario. Non ti dice dove si trova il prezzo. Ti dice se la *distanza tra due medie mobili* si sta allargando o restringendo, il che è un'approssimazione grezza di se un movimento sta accelerando o decelerando. È un compito più ristretto di quanto la maggior parte delle persone gli attribuisca, e capire questa ristrettezza è ciò che separa l'usare il MACD dall'esserne ingannati.

## Le tre componenti e come viene calcolata ciascuna

MACD sta per Moving Average Convergence Divergence (convergenza e divergenza di medie mobili) — un nome onesto, dato che l'intero indicatore riguarda due medie mobili che convergono o divergono. Ha tre parti, ciascuna costruita sulla precedente.

<div class="table-wrap">

| Componente | Formula | Cosa misura |
|---|---|---|
| Linea MACD | EMA a 12 periodi − EMA a 26 periodi | Il divario tra trend veloce e lento |
| Linea di segnale | EMA a 9 periodi della linea MACD | Una versione smussata di quel divario |
| Istogramma | Linea MACD − linea di segnale | Se il divario si sta allargando o restringendo |

</div>

### La linea MACD

Prendi una media mobile esponenziale delle ultime 12 barre e una delle ultime 26 barre, poi sottrai la più lenta dalla più veloce. Per come un'EMA pesa le barre recenti più di quelle vecchie, vedi [medie mobili: EMA vs SMA](/blog/moving-averages-ema-vs-sma/).

Concretamente: se l'EMA a 12 periodi è 188,40 e l'EMA a 26 periodi è 186,90, la linea MACD legge 188,40 − 186,90 = **1,50**. La media veloce si trova 1,50$ sopra quella lenta. Quel numero è nelle unità proprie del prezzo — dollari qui, non una percentuale e non una scala limitata da 0 a 100 come l'[RSI](/blog/rsi-indicator-overbought-oversold/). Un titolo da 400$ produce di routine valori MACD dieci volte più grandi di un titolo da 40$, motivo per cui le letture del MACD non sono mai confrontabili tra strumenti diversi.

### La linea di segnale

La linea MACD è nervosa, quindi il MACD applica un secondo passaggio di smussamento: un'EMA a 9 periodi della linea MACD stessa. Questa è la linea di segnale, ed è in ritardo rispetto alla linea MACD per costruzione, essendo una media della cronologia recente di quella stessa linea.

La costante di smussamento dell'EMA è 2 ÷ (periodo + 1), quindi la linea di segnale usa 2 ÷ 10 = 0,20 — ogni nuovo valore è il precedente più il 20% della distanza verso il valore MACD attuale. Se la linea di segnale era a 1,20 e la linea MACD stampa 1,72, il nuovo segnale è 1,20 + 0,20 × (1,72 − 1,20) = 1,20 + 0,104 = 1,304.

### L'istogramma

L'istogramma è la parte più semplice: linea MACD meno linea di segnale, disegnata come barre sopra e sotto lo zero. Con la linea MACD a 1,50 e la linea di segnale a 1,20, la barra dell'istogramma è 1,50 − 1,20 = **0,30**.

Poiché l'istogramma è definito come quella differenza, attraversa lo zero esattamente sulla stessa barra in cui la linea MACD attraversa la linea di segnale. Sono un unico evento disegnato in due modi. Chiunque affermi che un attraversamento dello zero dell'istogramma *conferma* un incrocio della linea di segnale sta descrivendo la stessa cosa due volte.

## Perché le impostazioni sono 12, 26 e 9

Questi numeri sono convenzione, non matematica. Gerald Appel li scelse quando costruì il MACD alla fine degli anni '70, e sono rimasti il default da allora. Non c'è nessuna derivazione da recuperare: nessuna proprietà dei mercati rende speciali 12 e 26, e non troverai nessun calcolo che ci arrivi. Circolano storie di origine dal suono ordinato — che corrispondano a qualche pulito conteggio di settimane o sessioni — ma sono folklore inventato dopo il fatto per spiegare una scelta che era semplicemente una scelta. Ciò che conta è cosa controllano i numeri: 12 e 26 impostano quanto veloci e quanto lente sono le due medie, e 9 imposta quanto smussamento sta sopra.

Contano ora soprattutto perché così tante persone li usano. Un default che milioni di schermi mostrano diventa leggermente autoavverante: quando stampa un incrocio ampiamente osservato, alcuni trader agiscono di conseguenza, mettendo ordini reali dietro un numero arbitrario. È un effetto debole, non una legge, ma batte qualsiasi affermazione secondo cui le impostazioni sono ottimali.

Puoi cambiarle. Accorciare a 6/13/5 rende il MACD più nervoso e precoce — più segnali, più di essi sbagliati. Allungare a 19/39/9 lo rende più lento e pulito — meno segnali, più tardivi. Nessuno dei due è migliore; stai scegliendo dove posizionarti sulla curva reattività-contro-rumore. Ciò che non dovresti fare è calibrare le impostazioni finché non catturano gli ultimi tre movimenti sul grafico che hai davanti. Questo è curve-fitting, e descrive la storia piuttosto che prevedere qualcosa.

## Attraversamenti della linea zero contro attraversamenti della linea di segnale

Questi sono eventi diversi con significati diversi, e confonderli è l'errore più comune sul MACD.

**La linea MACD che attraversa lo zero** significa che l'EMA a 12 ha incrociato l'EMA a 26 — un semplice incrocio di medie mobili, riformulato. Sopra lo zero la media veloce è sopra quella lenta; sotto zero, il contrario. È un'affermazione sulla direzione del trend, e poiché coinvolge la media lenta a 26 periodi, è tardiva.

**La linea MACD che attraversa la linea di segnale** significa che il divario attuale tra le medie si è allontanato dal proprio divario medio recente. È un'affermazione su un cambiamento di momentum, e scatta prima dell'attraversamento dello zero — spesso molto prima, e spesso quando non c'è affatto un cambio di trend.

La lettura pratica: un incrocio rialzista di segnale mentre il MACD si trova ben sotto zero è un rimbalzo dentro un downtrend fino a prova contraria. Lo stesso incrocio mentre il MACD spinge verso l'alto attraverso lo zero è un'affermazione più forte, perché due cose stanno concordando. Filtrare gli incroci di segnale in base a quale lato dello zero si verificano riduce drasticamente il tuo numero di segnali, ed è questo il punto.

## Leggere l'istogramma, e la trappola al suo interno

Ecco la sfumatura che rende utile avere l'istogramma. Ripercorri cinque barre di un rally:

<div class="table-wrap">

| Barra | Prezzo | Linea MACD | Linea di segnale | Istogramma |
|---|---|---|---|---|
| 1 | 190,10 | 1,50 | 1,20 | 0,30 |
| 2 | 192,40 | 1,72 | 1,30 | 0,42 |
| 3 | 194,30 | 1,85 | 1,41 | 0,44 |
| 4 | 195,60 | 1,90 | 1,51 | 0,39 |
| 5 | 196,20 | 1,88 | 1,58 | 0,30 |

</div>

Il prezzo è salito su ogni singola barra, da 190,10 a 196,20. Ma l'istogramma ha raggiunto il picco a 0,44 sulla barra 3 e si è ridotto sulle barre 4 e 5, tornando dove era iniziato.

**Un istogramma che si restringe non significa che il prezzo sta scendendo. Significa che il prezzo sta salendo più lentamente di prima.** Il movimento sta decelerando pur continuando a muoversi. Sulla barra 5 la linea MACD è effettivamente scesa, da 1,90 a 1,88, anche mentre il prezzo registrava un'altra chiusura più alta — le due medie hanno iniziato a convergere.

Questo è genuinamente utile, ed è anche dove le persone si fanno male. La decelerazione non è inversione. Un trend che rallenta può appiattirsi, consolidare per venti barre, e riprendere. Barre che si restringono sono un motivo per stringere uno stop o smettere di aggiungere a una posizione; trattare ognuna di esse come un segnale short ti fa combattere ripetutamente trend forti.

Se la barra 6 stampasse un MACD di 1,60, la linea di segnale si sposterebbe a 1,5876 e l'istogramma a circa 0,01 — quasi piatto, ancora positivo. Un MACD di 1,40 sulla barra 7 porta il segnale a 1,5500 e l'istogramma a −0,15: l'effettivo incrocio, tre barre dopo che l'istogramma ti aveva avvertito per la prima volta.

## Divergenza del MACD e quanto vale

La divergenza è quando il prezzo e il MACD non concordano sulla direzione.

**Divergenza ribassista:** il prezzo fa un massimo più alto, ma il picco corrispondente della linea MACD è più basso del picco precedente. Il nuovo massimo di prezzo è stato raggiunto con meno momentum dietro di esso.

**Divergenza rialzista:** il prezzo fa un minimo più basso mentre la linea MACD fa un minimo più alto. La pressione di vendita sta svanendo anche mentre il prezzo continua a scendere.

La divergenza vale la pena di essere osservata e non vale la pena di essere tradata da sola. I trend forti la producono per tratti prolungati — un uptrend può mostrare divergenza ribassista per decine di barre mentre fa nuovi massimi, perché la spinta iniziale ha fissato un picco di momentum che il trend non ha mai più bisogno di eguagliare. La divergenza ti dice che un movimento è stanco, non che è finito.

Diventa più credibile quando qualcosa di indipendente concorda: una trendline rotta, un fallimento su un livello che aveva tenuto in precedenza, o un pattern di volume che contraddice il movimento di prezzo. Il [volume](/blog/understanding-trading-volume/) è una conferma utile qui proprio perché deriva da un input diverso rispetto al MACD. Due indicatori derivati dagli stessi prezzi di chiusura che concordano non è conferma; è aritmetica.

## Perché il MACD è doppiamente in ritardo e fallisce nel range

Due debolezze strutturali, entrambe permanenti.

**È ritardo costruito su ritardo.** Un'EMA è già rivolta al passato — l'EMA a 26 periodi ha un centro di massa a circa dodici barre e mezza fa. Il MACD ne sottrae due, poi smussa il risultato con una *terza* EMA per creare la linea di segnale. Ogni incrocio descrive qualcosa che è già successo. Nulla nel MACD è predittivo; comprime la storia recente del prezzo in un unico numero, e la compressione richiede tempo.

**Produce segnali falsi costanti nei mercati laterali.** La premessa del MACD è che ci sia un trend da misurare. Quando il prezzo oscilla in un range, le due EMA si trovano quasi sovrapposte, la linea MACD oscilla vicino allo zero, e incrocia la linea di segnale avanti e indietro ogni poche barre. Ogni incrocio sembra identico a uno reale. Un pomeriggio agitato può generare otto incroci, tutti rumore, e prenderli ti costa spread e commissioni prima ancora che la direzione entri in gioco.

La difesa standard è prendere i segnali MACD solo nella direzione di un trend di più lungo termine — solo incroci rialzisti mentre il prezzo è sopra la sua EMA a 50 periodi, per esempio. Una più economica è controllare se la linea MACD è del tutto lontana dallo zero; gli incroci stampati con barre dell'istogramma appena visibili raramente contano.

## Esercitati sul simulatore

Leggere di un istogramma che si restringe non è la stessa cosa che notarne uno mentre una posizione è aperta e in guadagno. Attiva il MACD e osserva l'istogramma durante un intero movimento — segna la barra dove raggiunge il picco, poi conta quante altre barre il prezzo ha continuato a salire prima che la linea MACD incrociasse davvero. Quel divario è il tuo ritardo, misurato anziché descritto.

Poi fai trading con esso. Ogni volta che stampa un incrocio della linea di segnale, decidi prima della barra successiva se lo prenderesti e nota su quale lato dello zero è avvenuto. Fallo trenta volte e avrai il tuo conteggio personale di quanti incroci nel range valevano la pena di essere presi — più convincente di qualsiasi cosa qui. Ogni prezzo su Stockade è generato algoritmicamente anziché estratto da un mercato reale, quindi ciò che stai allenando è la lettura, non una previsione. E sii onesto: con 100.000$ di capitale di trading virtuale, sopportare un istogramma che si restringe è molto più facile di quanto sarà con denaro che è davvero tuo. Inizia sul [simulatore di borsa di Stockade](/it/simulator/).
