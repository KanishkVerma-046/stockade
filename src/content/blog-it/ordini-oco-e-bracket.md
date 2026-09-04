---
title: "Cosa Sono gli Ordini OCO e Bracket e Come Funzionano"
description: "Come gli ordini OCO e bracket collegano uno stop e un target così che l'esecuzione di uno annulla l'altro, più gli errori di quantità dei principianti."
date: 2026-05-25
tags: ["Tipi di Ordine"]
slug: "ordini-oco-e-bracket"
translationOf: "oco-and-bracket-orders"
---

Compri 500 azioni. Il prezzo sale un po', poi scende un po', poi sale di nuovo. Ora stai decidendo in tempo reale, con denaro in gioco, se questo è il massimo o l'inizio di qualcosa — e la versione di te che sta prendendo quella decisione non è la versione calma che ha trovato il setup.

Gli ordini OCO e bracket esistono per toglierti quella decisione. Non per renderla migliore, per renderla *più anticipata*. Questo articolo parla della meccanica: cosa si collega a cosa, cosa annulla cosa, cosa succede alle quantità, e i modi specifici in cui il setup si rompe.

## Cos'è un ordine OCO: due ordini in attesa dove l'esecuzione di uno uccide l'altro

OCO sta per **one-cancels-other** (uno annulla l'altro). Non è un nuovo tipo di ordine. È un *collegamento* posto tra due ordini ordinari che già conosci.

Invii due ordini contemporaneamente. Entrambi restano presso il broker, ineseguiti, in attesa. Nel momento in cui uno dei due viene eseguito, il broker annulla automaticamente l'altro. Non ti ritrovi mai con entrambi.

Quest'ultima frase è l'intera funzionalità. Senza il collegamento hai due ordini attivi, e se il prezzo attraversa entrambi i livelli ottieni due esecuzioni — il che per una singola posizione significa uscire una volta e poi entrare accidentalmente in una posizione completamente nuova nella direzione opposta. Il collegamento OCO è ciò che fa sì che "l'uno o l'altro" significhi davvero l'uno o l'altro.

La coppia OCO più comune è uno stop sotto la tua posizione e un limite sopra di essa: un **ordine stop** che diventa una vendita se il prezzo scende fino al tuo limite di perdita, e un **ordine a limite** che vende se il prezzo sale fino al tuo target di profitto. Il prezzo può raggiungere solo uno dei due per primo. Chi arriva prima vince, la posizione si chiude, e il sopravvissuto viene annullato.

Per la logica di *dove* posizionare lo stop — struttura, volatilità, perché un numero tondo è una scelta sbagliata — vedi [ordini stop-loss spiegati](/blog/stop-loss-orders-explained). Questo articolo presuppone che tu abbia già scelto i livelli e si occupa solo di come sono collegati tra loro.

## Cosa aggiunge un ordine bracket: un ingresso con la coppia di uscite allegata

Un **ordine bracket** è un pacchetto di tre ordini inviati insieme:

1. Un ordine di **ingresso** (a mercato o a limite) che apre la posizione.
2. Uno **stop di protezione** che la chiude in perdita.
3. Un **target di profitto** che la chiude in guadagno.

Gli ordini 2 e 3 formano una coppia OCO tra loro. Sono anche *condizionati all'ordine 1* — non diventano attivi finché l'ingresso non viene effettivamente eseguito. Invia un bracket con un ingresso a limite che non viene mai eseguito e non succede assolutamente nulla; lo stop e il target restano dormienti e alla fine scadono insieme all'ingresso.

Quindi la sequenza è: l'ingresso viene eseguito → stop e target si attivano entrambi → uno dei due viene eseguito → l'altro viene annullato → sei fuori. Tre ordini, un'operazione completa, zero decisioni dopo il primo clic.

La parola "bracket" (parentesi) è letterale. Il tuo prezzo di ingresso si trova dentro una parentesi, con un pavimento sotto e un soffitto sopra, e l'operazione finisce nel momento in cui tocca uno dei due.

## Un bracket calcolato: 500 azioni long a 187,40

Supponi di andare long su 500 azioni a 187,40, stop a 185,90, target a 190,40.

<div class="table-wrap">

| Gamba | Prezzo | Distanza dall'ingresso | Per azione | Totale su 500 azioni |
|---|---|---|---|---|
| Ingresso (acquisto) | 187,40 | — | — | 93.700$ di valore posizione |
| Stop (vendita) | 185,90 | 1,50 sotto | −1,50 | −750$ |
| Target (vendita) | 190,40 | 3,00 sopra | +3,00 | +1.500$ |

</div>

Verifica l'aritmetica. Il rischio per azione è 187,40 − 185,90 = 1,50, quindi 500 × 1,50 = **750$ a rischio**. Il rendimento per azione è 190,40 − 187,40 = 3,00, quindi 500 × 3,00 = **1.500$ come target**. Il rendimento diviso il rischio è 3,00 ÷ 1,50 = 2, un **rapporto rischio-rendimento di 2:1**.

**Quel rapporto è fissato nell'istante in cui invii il bracket.** Non scopri il tuo rapporto rischio-rendimento dopo, guardando il risultato — l'hai scelto quando hai digitato tre numeri in una casella.

**E un bracket 2:1 ha bisogno di un tasso di successo sopra il 33,3% solo per andare in pareggio.** Dieci operazioni di questa dimensione: quattro vincenti producono 4 × 1.500$ = 6.000$, sei perdenti producono 6 × 750$ = 4.500$, netto +1.500$ a un tasso di successo del 40%. Scendi a tre vincenti ed è 4.500$ vinti contro 5.250$ persi — negativo al 30%. Il rapporto non ti rende profittevole; fissa l'asticella che devi comunque superare.

Su un conto da 100.000$, quei 750$ sono lo 0,75% del capitale — dentro il tetto comune dell'1% descritto in [dimensionamento della posizione e la regola dell'1%](/blog/risk-management-position-sizing). Nota che la posizione vale 93.700$, circa il 94% del conto, mentre l'importo genuinamente a rischio è 750$. La dimensione della posizione e la dimensione del rischio sono due numeri diversi, ed è lo stop a separarli.

## Perché piazzare il bracket prima dell'ingresso è tutto il punto psicologico

Ecco la parte che conta più di qualsiasi meccanica.

Quando colleghi lo stop e il target *prima* che l'ingresso venga eseguito, prendi la decisione di uscita nell'unico momento in cui non hai posizione, nessun P&L non realizzato, e nessun ego nell'operazione. Stai guardando un grafico e chiedendoti "dove avrei torto, e dove incasserei il denaro?" Sono domande analitiche.

Una volta che la posizione esiste, le stesse due domande diventano emotive. "Dove avrei torto" diventa "quanto ancora riesco a sopportare di vedere scendere questo". "Dove incasserei il denaro" diventa "e se continuasse a salire?" I trader che impostano le uscite dopo essere entrati allargano regolarmente lo stop, perché allargarlo fa sparire il dolore attuale, e stringono il target, perché incassare qualcosa di piccolo sembra più sicuro che aspettare.

Un bracket non ti rende disciplinato. Sposta la decisione al momento in cui la disciplina costa poco. Sii onesto con te stesso, però: nulla ti impedisce di annullare e reinserire gli ordini a metà operazione, e i principianti fanno esattamente questo.

## Errori con i bracket che fanno i principianti

### Disallineamento della quantità dopo un'esecuzione parziale

Invii un bracket per 500 azioni. In un mercato reale, solo 300 vengono eseguite prima che il prezzo si allontani. Il tuo stop e il tuo target, se erano dimensionati per 500, ora coprono 200 azioni che non possiedi.

Se lo stop si attiva, una vendita di 500 azioni contro una posizione long di 300 chiude la tua posizione *e apre uno short di 200 azioni* — una posizione che non hai mai voluto, ora senza protezione, perché il bracket ha già fatto il suo lavoro e ha annullato il target. Alcuni broker adattano automaticamente le quantità del bracket all'importo eseguito; altri no. Devi sapere quale tipo stai usando prima che conti, non dopo.

### Dimenticare che gli ordini sopravvivono al tuo schermo

Gli ordini in attesa vivono presso il broker, non nel tuo browser. Chiudi la piattaforma, spegni il portatile, vai a dormire — lo stop e il target continuano a lavorare. Questo è il punto, ma significa anche che un bracket che hai impostato e dimenticato è un'istruzione attiva che può eseguirsi mentre dormi o sei in una riunione. Ogni bracket non gestito è una decisione che il te del passato ha preso al posto tuo.

### Bracket su entrambi i lati di un range

Un setup comune: il prezzo è bloccato tra due livelli, quindi piazzi un bracket buy-stop sopra la resistenza e un bracket sell-stop sotto il supporto, pianificando di catturare qualunque direzione rompa.

La trappola è che quei due *ingressi* non sono collegati tra loro a meno che tu non li renda esplicitamente una coppia OCO. Se non sono collegati e il prezzo sfonda sopra la resistenza, esegue il tuo long, inverte, poi rompe sotto il supporto, vieni eseguito anche sullo short — passato da long a short nel punto peggiore del contraccolpo. Collega gli ingressi come OCO e l'ingresso al ribasso muore nel momento in cui quello al rialzo viene eseguito.

## Cosa non può fare un ordine bracket

Un bracket è una macchina, e le macchine non leggono i grafici.

**Non può adattarsi a nuove informazioni.** Se il setup cambia forma — il movimento si ferma, il volume si prosciuga, il livello contro cui stavi facendo trading smette di tenere — al tuo bracket non importa. Resta sui due prezzi che hai scelto venti minuti fa e aspetta.

**Un target meccanico può trovarsi in un punto che il grafico non ha mai giustificato.** Se imposti ogni target esattamente a 2R perché 2R suona professionale, a volte parcheggerai un ordine a limite in uno spazio vuoto appena oltre uno scaffale di resistenza evidente, per poi vedere il prezzo girare 20 centesimi prima di raggiungerlo. Il rapporto dovrebbe essere un risultato di dove si trovano i livelli di uscita sensati, non un input che il grafico è costretto ad accomodare. Un bracket 2:1 è valido solo se il mercato offre plausibilmente quei 3,00 di rialzo prima dell'1,50 di ribasso.

**E non garantisce il prezzo che hai digitato.** Nei mercati reali uno stop diventa un ordine a mercato quando si attiva, e gli ordini a mercato vengono eseguiti a qualunque prezzo sia disponibile, che può essere peggiore del tuo livello di stop — vedi [ordini a mercato vs ordini a limite](/blog/market-orders-vs-limit-orders) per capire perché quella distinzione morde. Il tuo rischio di 750$ è una stima, non una garanzia.

## Esercitati sul simulatore

Il pannello ordini di `/simulator` su Stockade ha i campi opzionali **Stop Loss** e **Take Profit** proprio sotto la quantità, e si comportano come una coppia OCO: qualunque livello il prezzo simulato raggiunga per primo chiude l'intera posizione e cancella entrambi i campi contemporaneamente. Compila tutti e tre i numeri prima di premere B, poi deliberatamente non toccare più il pannello e osserva quale lato viene colpito.

Un avvertimento onesto, perché cambia cosa puoi imparare qui. Le esecuzioni di Stockade hanno molto meno attrito di quelle reali — nessuno spread bid-ask, nessuna esecuzione parziale — ma non sono letteralmente prive di attrito. Il simulatore verifica i tuoi livelli contro un nuovo prezzo ogni 800 millisecondi, e registra l'uscita al tick che *ha superato* il livello anziché al livello stesso, quindi uno stop o un target atterra qualche centesimo oltre il punto in cui l'hai impostato. L'assenza di esecuzioni parziali è la parte che conta qui: significa che il problema del disallineamento di quantità descritto sopra **non può accadere sul simulatore**, quindi è l'unica modalità di fallimento del bracket che devi imparare a conoscere invece di sperimentare. Tutto il resto — impegnarsi in anticipo su un rapporto, resistere all'impulso di allargare lo stop, scoprire quanto spesso un target 2:1 manca per pochi centesimi — è pienamente disponibile.

Esegui venti operazioni con bracket in cui imposti i livelli per primi e non li modifichi mai, poi controlla i tuoi risultati realizzati sul [simulatore di paper trading di Stockade](/it/simulator/) e scopri quale dovrebbe essere davvero il tuo tasso di successo.
