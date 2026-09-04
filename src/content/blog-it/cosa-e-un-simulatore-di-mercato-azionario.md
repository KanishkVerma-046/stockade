---
title: "Cos'è un Simulatore di Mercato Azionario e Perché Dovresti Usarne Uno"
description: "Un simulatore di mercato azionario ti fa tradare la meccanica reale del mercato con denaro virtuale. Come funzionano e cosa possono insegnarti davvero."
date: 2026-03-23
tags: ["Basi"]
slug: "cosa-e-un-simulatore-di-mercato-azionario"
translationOf: "what-is-a-stock-market-simulator"
---

La prima volta che la maggior parte delle persone piazza un'operazione reale, sta imparando due cose contemporaneamente: come funziona il software, e se la sua idea sul mercato era valida. Sono problemi molto diversi, e mescolarli è costoso. Clicchi "vendi" quando intendevi "vendi allo scoperto", compri 100 azioni quando ne intendevi 10, scopri che il tuo ordine stop non è mai stato effettivamente inviato — e ognuno di questi errori costa denaro reale per imparare qualcosa che un manuale avrebbe potuto insegnarti.

Un simulatore di mercato azionario separa questi due problemi. Ti dà un'interfaccia di trading completa, un grafico dei prezzi che si muove come si muove un mercato, e un saldo di denaro finto, così gli errori meccanici non costano nulla. Puoi essere scarso con il software in privato.

## Cos'è davvero un simulatore di mercato azionario

Un simulatore è una piattaforma di trading dove sia il denaro sia il feed dei prezzi sono simulati e tutto ciò che è costruito intorno ad essi funziona come funziona davvero. Sii chiaro sui dati: i prezzi di Stockade sono generati algoritmicamente, non prelevati da una borsa, e non c'è un feed dal vivo dietro di essi. Ciò che fanno è *comportarsi* come dati di mercato — vere candele OHLC con apertura, massimo, minimo e chiusura, volume che varia da barra a barra, e le ombre lunghe che rendono i grafici reali scomodi da leggere. I tipi di ordine sono i veri tipi di ordine. L'aritmetica del conto — saldo di cassa, dimensione della posizione, profitto e perdita non realizzati, equity del conto — segue la stessa aritmetica che usa il tuo broker. Ciò che manca è il regolamento: nessuno invia il tuo ordine a una borsa, e nessun contante lascia un conto.

Quella distinzione conta. Un simulatore non è un gioco con un tema di mercato; è un modello funzionante di un mercato con le conseguenze rimosse. Le competenze che si trasferiscono sono quelle meccaniche — dimensionare una posizione, lavorare un ordine, tenere un registro. Quella che non si trasferisce è quella di cui hai più bisogno, e ci arriveremo sotto.

Il simulatore di Stockade ti fa partire con 100.000$ di capitale virtuale e gira interamente nel tuo browser. Non c'è iscrizione e non c'è account; le tue posizioni e la tua cronologia vivono nella memoria locale del tuo browser. Quel design ha un compromesso ovvio — cancella i dati del tuo browser e la tua cronologia se ne va con essi — ma significa che puoi iniziare in pochi secondi invece di compilare un modulo.

## La meccanica che sei davvero lì per imparare

Prima di qualsiasi domanda sulla strategia c'è uno strato di puro impianto che inciampa quasi tutti. Questo è ciò che un simulatore insegna meglio.

### Tipi di ordine

Un **ordine a mercato** compra o vende immediatamente al prezzo attualmente disponibile. Garantisce che tu venga eseguito; non garantisce il prezzo.

Un **ordine a limite** imposta un massimo che pagherai o un minimo che accetterai. Piazza un limite di acquisto su un titolo a 47,50$ mentre scambia a 48,20$ e non succede nulla finché il prezzo non viene da te. Garantisce il prezzo; non garantisce affatto che tu venga eseguito. ([Ordini a mercato vs ordini a limite](/blog/market-orders-vs-limit-orders) approfondisce quando ognuno si adatta.)

Uno **stop-loss** è un ordine in attesa che diventa attivo quando il prezzo si muove contro di te oltre un livello che hai scelto. È il meccanismo che trasforma "probabilmente dovrei tagliare questa" in qualcosa che accade indipendentemente dal fatto che tu stia guardando.

Un **take-profit** è la stessa idea nella direzione opposta — un ordine che chiude la tua posizione una volta raggiunto un target.

Un **bracket OCO** ("one cancels the other", uno annulla l'altro) accoppia uno stop-loss e un take-profit intorno a una posizione aperta. Qualunque dei due si esegua per primo annulla l'altro, così non puoi ritrovarti con un ordine pendente che apre una nuova posizione dopo che sei già uscito. Vedi [ordini OCO e bracket spiegati](/blog/oco-and-bracket-orders) per la meccanica completa.

Stockade supporta tutti e cinque. Piazzarne un centinaio con denaro finto è come il vocabolario diventa memoria muscolare. Le scorciatoie da tastiera aiutano: `B` per comprare, `S` per vendere, `F` per azzerare (chiudere tutto). Quando le tue mani conoscono il tasto di uscita, l'esitazione smette di essere un fattore.

### Dimensionamento della posizione, con numeri reali

Ecco il calcolo che la maggior parte dei principianti non fa mai, e la singola cosa più utile da esercitare in un simulatore.

Supponi di avere un conto da 100.000$ e decidi che nessuna singola operazione può perdere più dell'1% di esso. Sono 1.000$ di rischio per operazione.

Vuoi comprare un titolo a 52,00$. Guardi il grafico e decidi che se scambia sotto 50,00$, la tua idea era sbagliata. Il tuo rischio per azione è 52,00$ − 50,00$ = 2,00$.

La dimensione della tua posizione è il tuo rischio in dollari diviso per il tuo rischio per azione: 1.000$ ÷ 2,00$ = **500 azioni**.

Quella è una posizione da 26.000$ (500 × 52,00$) su un conto da 100.000$. Nota cosa è successo: non hai scelto prima la dimensione e poi sperato. Il livello dello stop e il tuo limite di rischio l'hanno prodotta per te.

Ora cambia un input. Stesso titolo, stesso ingresso a 52,00$, ma decidi che il livello che invalida la tua idea è 51,00$ invece. Il rischio per azione è 1,00$, quindi la dimensione diventa 1.000$ ÷ 1,00$ = **1.000 azioni** — una posizione da 52.000$, il doppio grande, con lo stesso 1.000$ a rischio. Uno stop più stretto non significa meno rischio; significa una posizione più grande e una probabilità più alta di essere fermato dal rumore ordinario.

Fai quell'aritmetica trenta volte in un simulatore e diventa automatica. Imparala su un conto reale e ogni ripetizione ha un prezzo. [Dimensionamento della posizione e la regola dell'1%](/blog/risk-management-position-sizing) copre la formula per intero, incluso il calcolo del recupero da drawdown.

## Leggere il grafico è una competenza separata

I grafici del simulatore sono grafici a candele con un istogramma di volume sotto, ogni candela che riassume un periodo di tempo. Gli overlay disponibili — EMA 9, EMA 20, EMA 50, più VWAP, RSI e MACD — sono quelli comuni che vedrai citati ovunque, e averli sullo schermo mentre fai trading è come scopri quali usi davvero rispetto a quali fanno solo sembrare il grafico affollato.

La maggior parte delle persone inizia con sei indicatori e finisce con due. Un simulatore è dove puoi permetterti di scoprirlo.

La [pagina dei mercati](/it/markets/) porta 29 strumenti: 14 azioni, 8 token crypto, 3 coppie forex, e 4 futures (/NQ, /ES, /CL, /GC). Le azioni e i token sono ticker inventati, non aziende o monete reali; solo le coppie forex e i futures usano nomi del mondo reale. Si trovano a livelli di prezzo molto diversi, il che vale la pena esercitare — dimensionare una coppia forex quotata a quattro decimali è un esercizio mentale diverso dal dimensionare un future su indice che scambia nelle migliaia, e sbagliare la posizione del punto decimale è un classico errore da principianti che qui non costa nulla.

I prezzi generati non riproducono nemmeno la personalità reale degli strumenti: un unico modello di volatilità gira su ogni simbolo. Ciò che impari qui è l'aritmetica e il flusso di lavoro.

Per la pratica deliberata, il [Chart Simulator](/it/chart-simulator/) riproduce una sessione di grafico candela per candela, così avanzi di una barra alla volta senza sapere cosa viene dopo. La sessione è generata anziché prelevata da un archivio, quindi non puoi riconoscere il grafico e barare — e non sapere cosa fa la prossima candela è tutto il punto. La modalità live si muove a tick di 800ms, più vicina al ritmo reale e alla pressione reale.

## Cosa ti dicono le statistiche che la tua memoria non ti dirà

La memoria è una pessima tenutrice di registri per il trading. Ti ricorderai l'operazione che è corsa dell'8% a tuo favore e dimenticherai le quattro piccole perdite che l'hanno finanziata.

La [pagina di analisi](/it/analytics/) tiene il registro al posto tuo: curva del capitale, diario di trading, tasso di successo, profit factor, guadagno medio e perdita media, drawdown massimo, e una heatmap oraria.

Due di questi meritano una spiegazione:

**Il profit factor** è il profitto lordo diviso la perdita lorda. Se le tue operazioni vincenti hanno reso 6.200$ e quelle perdenti sono costate 4.000$, il tuo profit factor è 1,55 — hai guadagnato 1,55$ per ogni 1,00$ perso. Qualsiasi valore sopra 1,0 è netto positivo.

**Il tasso di successo da solo non ti dice quasi nulla.** Una strategia che vince il 35% delle volte con un guadagno medio di 900$ e una perdita media di 300$ produce, su 100 operazioni, (35 × 900$) − (65 × 300$) = 31.500$ − 19.500$ = **12.000$**. Una strategia che vince il 70% delle volte con un guadagno medio di 200$ e una perdita media di 600$ produce (70 × 200$) − (30 × 600$) = 14.000$ − 18.000$ = **−4.000$**. Il tasso di successo più alto è la strategia perdente. Non puoi vederlo senza tenere i numeri.

La heatmap oraria tende a produrre la scoperta più scomoda: molte persone trovano che un tratto specifico della sessione è responsabile della maggior parte delle loro perdite.

## Cosa non può insegnarti un simulatore

Questa parte viene tralasciata dalla maggior parte degli articoli sull'argomento, e ometterla è disonesto.

**Il trading simulato rimuove il peso emotivo del denaro reale, che è la parte più difficile del trading.** Attraversare un drawdown di 2.400$ in capitale virtuale è moderatamente interessante. Attraversare un drawdown di 2.400$ in denaro che hai guadagnato è un'esperienza fisica — e la disciplina che ha tenuto perfettamente per tre mesi su un simulatore molto spesso crolla nella prima settimana di trading reale. Le regole non falliscono perché erano cattive regole. Falliscono perché seguirle costa qualcosa. Un simulatore non può addebitarti quel costo, quindi non può testare se sei disposto a pagarlo.

**Le esecuzioni in un simulatore hanno pochissimo attrito.** Il tuo ordine si esegue al prezzo che vedi, istantaneamente, per intero; solo le uscite stop e target slittano, del tick che ha superato il tuo livello. Gli ordini reali affrontano lo slippage — il divario tra il prezzo che ti aspettavi e il prezzo che hai ottenuto, che si allarga esattamente quando il mercato si muove veloce e tu vuoi di più essere eseguito. Gli ordini reali affrontano anche esecuzioni parziali, dove chiedi 500 azioni e ne ottieni 300. Nessuno dei due appare a scala reale qui, quindi i risultati simulati sono sistematicamente un po' migliori di quanto le stesse decisioni produrrebbero dal vivo.

**Commissioni, spread, costi di prestito e tasse non sono modellati nel modo in cui il tuo broker specifico li applicherà.** Una strategia che chiude con un profitto sottile in un simulatore può essere una perdente netta una volta che i costi reali gravano su di essa.

**I dati dei prezzi sono generati, quindi non contengono comportamento di mercato reale.** Le candele di Stockade provengono da un algoritmo, non da una borsa. Va bene per esercitare la meccanica — un ticket d'ordine non si preoccupa da dove viene il numero — ma un pattern che "funziona" qui è stato testato contro l'aritmetica, non contro un mercato. Non ci sono pubblicazioni di utili, nessuno shock di notizie, nessuna delle strutture ricorrenti che i trader cercano davvero di sfruttare. Le conclusioni in stile backtest tratte da dati generati non valgono nulla. Usa il simulatore per imparare come tradare, non per scoprire cosa tradare.

Il modo corretto di leggere un buon risultato del simulatore è: "la mia meccanica è solida e la mia idea non è ovviamente rotta." Non: "questo funzionerà."

## Come usare un simulatore così che aiuti davvero

Tratta il saldo virtuale come se fosse reale. Nel momento in cui inizi a prendere posizioni da 40.000$ "per vedere cosa succede", la pratica smette di essere pratica.

Fai trading con una sola dimensione e un solo setup finché non hai 40 o 50 ingressi nel diario, poi guarda le statistiche anziché il tuo ricordo. Scrivi perché sei entrato prima di entrare, non dopo essere uscito. E quando passi a denaro reale, riduci la tua dimensione finché una perdita completa non è genuinamente noiosa — a quel punto non stai più testando la strategia, stai testando te stesso. [La guida al paper trading](/blog/paper-trading-guide) copre quella transizione in maggiore dettaglio.

## Esercitati sul simulatore

Apri il Simulatore di Trading, prendi il saldo virtuale di 100.000$, e fai una cosa prima di tutto: calcola il numero di azioni dal tuo livello di stop prima di entrare, nel modo in cui funziona l'aritmetica sopra. Fallo dieci volte, premendo `F` per azzerare quando il tuo stop viene raggiunto invece di convincerti a "un'altra candela". Poi controlla il diario di trading sulla pagina di analisi e confronta la tua perdita media con quella che intendevi. Quel singolo ciclo insegna più di una settimana di lettura.

[Inizia sul simulatore](/it/simulator/)
