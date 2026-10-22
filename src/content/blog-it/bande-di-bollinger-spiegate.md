---
title: "Bande di Bollinger Spiegate: Cosa Misurano le Bande"
description: "Le Bande di Bollinger misurano la volatilità attorno a una media a 20 periodi, non ipercomprato o ipervenduto. Calcolo, tocchi, squeeze e il mito del 95%."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indicatori", "Analisi Tecnica"]
slug: "bande-di-bollinger-spiegate"
translationOf: "bollinger-bands-explained"
---

Il prezzo sfonda verso l'alto la banda di Bollinger superiore. Il grafico sembra tirato, la banda sembra un soffitto, e vendere sembra l'operazione ovvia. Poi il prezzo continua a chiudere sulla banda superiore, candela dopo candela, e il tuo short viene stoppato da un movimento che non è mai tornato indietro.

Lì le bande non hanno fallito. Sono state lette come qualcosa che non sono. Le Bande di Bollinger misurano quanto sono dispersi i prezzi recenti attorno a una media. Non misurano se il prezzo è troppo alto, e chi le ha inventate lo dice chiaramente.

## Come si calcolano le Bande di Bollinger

[John Bollinger ha sviluppato le bande all'inizio degli anni '80](https://cmtassociation.org/presenter/john-bollinger/). Hanno tre linee:

```
Banda centrale  = media mobile semplice a 20 periodi delle chiusure
Banda superiore = banda centrale + 2 × deviazione standard delle stesse 20 chiusure
Banda inferiore = banda centrale − 2 × deviazione standard delle stesse 20 chiusure
```

[La descrizione dello stesso Bollinger](https://www.bollingerbands.com/bollinger-bands) indica 20 periodi e due deviazioni standard come impostazioni predefinite, invariate da quando le ha fissate, e aggiunge che usa la formula della popolazione per la deviazione standard.

La deviazione standard si capisce meglio con i numeri. Useremo cinque chiusure invece di 20, così l'aritmetica sta in uno schermo. Diciamo che le ultime cinque chiusure di un ipotetico titolo siano 50$, 51$, 49$, 52$ e 53$:

1. **Media:** 255 ÷ 5 = 51$.
2. **Distanza di ogni chiusura dalla media:** −1, 0, −2, +1, +2.
3. **Elevale al quadrato e fai la media dei quadrati:** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. È la varianza.
4. **Estrai la radice quadrata:** √2 = 1,41$. È la deviazione standard.
5. **Bande:** 51$ ± 2 × 1,41$, quindi 48,17$ e 53,83$.

Dividere per 5 al passo 3 è la formula della popolazione. La formula campionaria divide invece per 4, il che qui darebbe 1,58$ e bande leggermente più ampie, quindi due piattaforme di grafici possono non coincidere del tutto a seconda di quale usano.

## Cosa misurano davvero le bande

Ora prendi cinque chiusure diverse con la stessa media di 51$: 50,60$, 51,20$, 50,80$, 51,40$ e 51,00$. Ognuna sta entro 40 centesimi dalla media, quindi la deviazione standard è solo 0,28$ e le bande sono a 50,43$ e 51,57$. Stessa media, bande larghe un quinto. Tutta l'idea è questa: le bande si allargano quando i prezzi si disperdono e si stringono quando si raggruppano.

Ecco la parte che sorprende. Prova cinque chiusure che salgono in modo regolare di esattamente 1$ ciascuna: 50$, 51$, 52$, 53$, 54$. Ogni movimento è di 1$, in media più piccolo dei salti del primo esempio, eppure la deviazione standard è di nuovo 1,41$ e le bande sono altrettanto ampie, a 49,17$ e 54,83$. Le bande misurano quanto le chiusure sono lontane dalla loro *media*, e un trend allontana le chiusure dalla media anche quando ogni movimento è piccolo.

Questo le rende diverse dall'[ATR](/it/blog/stop-loss-con-atr/), che fa la media dell'ampiezza del range di ogni barra. Un trend regolare e costante fatto di candele piccole mostrerebbe un ATR modesto e Bande di Bollinger piuttosto ampie. Nessuno dei due sbaglia. Rispondono a domande diverse: l'ATR chiede quanto si muove una barra tipica, le bande chiedono quanto il prezzo si è allontanato dalla sua media recente.

L'ampiezza delle bande funziona anche come verifica approssimativa di uno stop. Con le bande ampie del primo esempio, distanti 5,66$, uno stop 0,50$ sotto il tuo ingresso sta ben dentro il range coperto di recente dalle chiusure, quindi un movimento ordinario può raggiungerlo. Con le bande strette, distanti 1,14$, gli stessi 0,50$ sono quasi metà della dispersione. In entrambi i casi, lo stop va comunque dove la tua idea viene dimostrata sbagliata, e il numero di azioni deriva comunque dalla distanza dello stop, come nell'esempio svolto della guida all'ATR.

## Toccare una banda è solo un tocco, non un segnale

È l'errore di lettura dell'inizio, e Bollinger lo affronta direttamente. Tra [le sue regole per usare le bande](https://www.bollingerbands.com/bollinger-band-rules): "I tocchi delle bande sono solo questo, tocchi, non segnali." Un tocco della banda superiore non è, di per sé, un segnale di vendita, e un tocco della banda inferiore non è un segnale di acquisto. Lo stesso elenco dice che nei mercati in trend il prezzo può salire lungo la banda superiore o scendere lungo quella inferiore, e che le chiusure fuori dalle bande sono inizialmente segnali di continuazione, non di inversione.

Questo torna con ciò che dice l'aritmetica. Il prezzo raggiunge la banda superiore solo salendo ben sopra la sua media recente, ed è proprio così che appare un movimento forte. È la stessa lezione della [lettura di "ipercomprato" dell'RSI](/it/blog/indicatore-rsi-ipercomprato-ipervenduto/): una lettura alta descrive una forza che c'è già stata, non un'inversione in arrivo.

Ciò che un tocco della banda ti dice è che il prezzo è alto o basso *rispetto al proprio range recente*. È contesto. Se sia un motivo per fare trading dipende da tutto il resto: il trend, il [supporto o la resistenza](/it/blog/livelli-di-supporto-e-resistenza/) più vicini, e cosa dice il tuo setup.

## Dove si trova il prezzo dentro le bande: il %b

Le regole di Bollinger descrivono anche il %b, che trasforma la posizione rispetto alle bande in un unico numero:

```
%b = (chiusura − banda inferiore) ÷ (banda superiore − banda inferiore)
```

Sulla banda inferiore il %b vale 0, sulla banda centrale 0,5, e sulla banda superiore 1. Va sotto 0 o sopra 1 quando il prezzo chiude fuori dalle bande. Tornando al primo esempio, una chiusura a 53$ con le bande a 48,17$ e 53,83$ dà (53 − 48,17) ÷ 5,66 = 0,85.

Il valore del %b sta nel rendere confrontabile la posizione rispetto alle bande tra strumenti diversi e nel tempo, come fa dividere l'ATR per il prezzo. Una chiusura a 53$ di per sé non significa nulla; 0,85 dice che è vicina alla parte alta della sua dispersione recente. Resta una posizione, non un segnale, e vale tutto ciò che dice la sezione precedente: in un trend forte, il %b può restare vicino a 1 o sopra a lungo.

## L'equivoco del 95%

Un'affermazione comune è che il 95% dei prezzi resti dentro le bande, quindi qualsiasi cosa fuori sarebbe un evento raro destinato a rientrare. Nasce da un fatto statistico reale: in una distribuzione normale, circa il 95% dei valori cade entro due deviazioni standard dalla media.

I prezzi non seguono una distribuzione normale, e Bollinger lo dice nelle stesse regole: non trarre conclusioni statistiche dall'uso della deviazione standard nelle bande, perché le distribuzioni dei prezzi non sono normali e i campioni sono troppo piccoli per avere significatività statistica. Aggiunge che in pratica trova di solito circa il 90%, non il 95%, dei dati dentro le bande con le impostazioni predefinite.

Anche a prenderlo alla lettera, il 90% dentro significa che una chiusura su dieci finisce fuori. Su barre giornaliere sono circa due chiusure al mese, il che è normale, non raro. E secondo le regole dello stesso Bollinger, una chiusura fuori dalle bande è inizialmente un segnale di continuazione, non di inversione.

## Lo squeeze: quando le bande si stringono

Uno squeeze è una fase in cui le bande si avvicinano in modo insolito. Si misura con la BandWidth, la distanza tra le bande come percentuale della banda centrale:

```
BandWidth = (banda superiore − banda inferiore) ÷ banda centrale × 100
```

Dai due esempi a cinque chiusure visti sopra: (53,83$ − 48,17$) ÷ 51$ × 100 = 11,1, e (51,57$ − 50,43$) ÷ 51$ × 100 = 2,2. Il secondo è uno squeeze rispetto al primo.

"Stretto" è relativo alla storia dello strumento stesso. [La guida di StockCharts alla BandWidth](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) suggerisce di giudicarla rispetto al range degli ultimi otto-dodici mesi, e dice che lo squeeze in sé non dà una direzione: quella viene dalla rottura della banda che segue, e le rotture iniziali possono fallire.

I trader cercano gli squeeze partendo dall'idea che le fasi tranquille non durano per sempre. Noi ne tratteremmo uno come una condizione più che come un innesco. Può dirti di fare attenzione. Non può dirti in che direzione operare.

## Scegliere le impostazioni e la banda centrale

Le impostazioni predefinite sono un punto di partenza, non una legge; le regole di Bollinger dicono che i parametri giusti possono variare a seconda del mercato e dello scopo. Se cambi la lunghezza, cambia con essa il moltiplicatore: le sue regole indicano 2,1 deviazioni standard a 50 periodi, e la [guida alle Bande di Bollinger](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) di StockCharts aggiunge 1,9 a 10 periodi.

La banda centrale è una media mobile semplice, non esponenziale. Se conosci le EMA dalla [guida alle medie mobili](/it/blog/medie-mobili-ema-vs-sma/), le due si seguono da vicino ma non sono la stessa linea, e una EMA reagisce più in fretta alle chiusure più recenti. Le regole di Bollinger dicono anche che la banda centrale dovrebbe descrivere il trend di medio periodo invece di essere regolata per gli incroci.

Se vuoi un secondo parere accanto alle bande, scegline uno che misuri qualcosa di diverso. L'elenco dello stesso Bollinger avverte che due indicatori di momentum non sono meglio di uno, quindi aggiungere sia l'RSI sia il [MACD](/it/blog/macd-spiegato/) accanto alle bande aggiunge meno di quanto sembri: entrambi misurano il momentum.

## Esercitati sul simulatore

Stockade non mostra le Bande di Bollinger. I suoi grafici hanno EMA 9, 20 e 50, VWAP, RSI e MACD. Ogni simbolo usa un'unica impostazione di volatilità, scalata al suo prezzo, quindi non ci sono cicli di volatilità da mercato reale. Le oscillazioni del prezzo variano comunque: salgono e scendono per caso e si allargano quando la tendenza direzionale nascosta è forte. Quindi se le bande che calcoli dalle chiusure di Stockade si stringono in quello che sembra uno squeeze, è questa variazione casuale, non il tipo di ciclo di volatilità che uno squeeze dovrebbe cogliere. Ciò su cui puoi esercitarti è il calcolo e la metà che riguarda la media mobile. Sul [simulatore di grafici](/it/chart-simulator/), passa il cursore sulle ultime 20 candele e copia ogni chiusura dalla barra dei valori in un foglio di calcolo. Calcola la media e la deviazione standard della popolazione (nella maggior parte dei fogli di calcolo in italiano, MEDIA e DEV.ST.P), segna dove cadrebbero le bande, e confronta quella SMA a 20 periodi con la linea EMA 20 sul grafico. Fallo una volta su un tratto in trend e una volta su uno laterale, e guarda come il trend allarga le bande. Poi porta la stessa abitudine sul [simulatore](/it/simulator/): prima di agire su un prezzo tirato, chiediti quanto è lontano dalla sua media e se quella distanza è insolita o è solo un trend.
