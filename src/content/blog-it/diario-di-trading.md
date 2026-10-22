---
title: "Come Tenere un Diario di Trading che Userai Davvero"
description: "Un diario di trading aiuta solo se continui a tenerlo. Un modello breve, un elenco fisso di tag e una revisione settimanale che porta a una modifica di regola."
date: 2026-11-16
author: "Stockade Team"
tags: ["Psicologia", "Analisi"]
slug: "diario-di-trading"
translationOf: "trading-journal-guide"
---

Il diario di trading tipico parte ambizioso. C'è una colonna per il setup, il motivo dell'ingresso, l'umore del mercato, uno screenshot, un punteggio di fiducia, quanto hai dormito, e un paragrafo di riflessione dopo ogni operazione. Il primo giorno richiede dieci minuti per operazione e sembra un progresso. Alla seconda settimana lo compili a memoria dopo la sessione, e poco dopo non lo compili più.

Quel diario non è fallito perché sei pigro. È fallito perché costava più di quanto rendeva, e il ritorno non è mai arrivato, perché nessuno aveva deciso a cosa servissero le voci. Questo articolo parla del sistema intorno a un diario: un modello abbastanza breve da compilarlo ogni volta, tag che puoi contare, e una revisione settimanale che trasforma una pila di voci in una sola modifica.

## A cosa serve un diario di trading

Un diario ha un solo compito: mostrarti quali dei tuoi comportamenti costano denaro, così puoi cambiarli uno alla volta. Tutto ciò che scrivi dovrebbe servire a quella domanda. Se un campo non salta mai fuori in una revisione, è burocrazia.

Cosa registrare per ogni operazione è spiegato altrove, quindi non lo ripeteremo. [La guida al paper trading](/it/blog/guida-al-paper-trading/) spiega cosa scrivere prima e dopo ogni operazione e perché il ragionamento deve venire prima dell'ingresso. [La guida alle metriche di performance](/it/blog/analizzare-le-metriche-di-performance-di-trading/) spiega cosa registra per te la pagina Analisi di Stockade e cosa non può registrare. Qui riduciamo quell'elenco a qualcosa che continuerai a fare, e costruiamo la routine che lo fa rendere.

## Un modello minimo: una riga prima, una riga dopo

Ecco il modello da cui partiremmo. Prima di entrare, compila una riga:

- **Numero dell'operazione,** così più tardi puoi abbinare la riga al registro della tua piattaforma.
- **Tag del setup,** da un elenco fisso (ne parliamo più sotto).
- **Ingresso, stop e target pianificati,** come prezzi.

Dopo l'uscita, aggiungi tre cose:

- **Risultato in R.** R è ciò che avevi pianificato di rischiare per azione, quindi per un'operazione long il risultato è (uscita − ingresso) ÷ (ingresso − stop).
- **Regola rispettata, S o N.** Hai eseguito il piano come era scritto?
- **Tag e una riga.** Eventuali tag di errore o di contesto, e una frase su cosa faresti diversamente, se c'è qualcosa.

Una riga compilata per un'operazione ipotetica ha questo aspetto:

<div class="table-wrap">

| # | Setup | Ingresso / stop / target | Uscita | R | Regola? | Tag | Riga |
|---|---|---|---|---|---|---|---|
| 14 | pullback-ema20 | 40,00 / 39,20 / 41,60 | 41,00 | +1,25R | N | uscita-anticipata | Venduto sul numero tondo; il target era 41,60 |

</div>

La colonna R è quella che fa il lavoro. L'operazione rischiava 0,80$ per azione e ne ha guadagnati 1,00$, quindi ha reso 1,00 ÷ 0,80 = 1,25R. Il piano era un'operazione 1:2, con un target di 2R. Scriverli entrambi mostra quanto di ogni vincita pianificata tieni davvero: il divario che [la guida al rischio-rendimento](/it/blog/rapporto-rischio-rendimento-e-aspettativa/) descrive tra il rapporto che pianifichi e quello che ottieni.

Nota cosa manca: screenshot, punteggi sull'umore, lunghe riflessioni. Aggiungine uno solo quando una revisione settimanale pone una domanda a cui i campi attuali non sanno rispondere.

## Tag che puoi contare

Le note a testo libero sono difficili da rivedere. Dopo un mese hai cinquanta frasi che sembrano tutte ragionevoli, e non puoi sommarle. I tag risolvono il problema, purché vengano da un elenco breve che scrivi in anticipo e non improvvisi. Noi useremmo tre famiglie:

<div class="table-wrap">

| Famiglia | Esempi | Regola |
|---|---|---|
| Setup | pullback-ema20, rottura-range, nessuno | Esattamente uno per operazione |
| Errore | uscita-anticipata, stop-spostato, inseguimento, sovradimensionata | Tutti quelli che si applicano |
| Contesto | dopo-perdita, prima-operazione, ultima-ora | Tutti quelli che si applicano |

</div>

L'elenco dei setup dovrebbe corrispondere ai setup del [tuo piano di trading](/it/blog/come-creare-un-piano-di-trading/). Includi "nessuno". Le operazioni prese senza un setup sono quelle che hai più bisogno di contare, e spariscono se l'unica opzione è lasciare il campo vuoto.

Tieni l'elenco degli errori breve e abbastanza specifico perché due persone etichettino la stessa operazione nello stesso modo. "Stop-spostato" supera quel test. "Poca disciplina" no. Se ti sorprendi a inventare un nuovo tag a metà settimana, scrivilo invece nel campo della riga e decidi alla revisione settimanale se si merita un posto nell'elenco.

## La revisione settimanale che si chiude con una modifica di regola

Una volta a settimana, a un orario fisso, dedica mezz'ora a quattro passi:

1. **Raggruppa le operazioni per tag di setup.** Per ogni setup, conta operazioni e vincite e somma le R.
2. **Conta ogni tag di errore e di contesto,** e somma le R delle operazioni che lo portano.
3. **Trova il comportamento più costoso.** Non l'operazione più frustrante: il tag con il costo totale più alto.
4. **Scrivi una modifica di regola** che lo prenda di mira, e mettici la data.

Ecco un'ipotetica settimana di 20 operazioni:

<div class="table-wrap">

| Setup | Operazioni | Vincite | R netto |
|---|---|---|---|
| pullback-ema20 | 8 | 4 | +2,6R |
| rottura-range | 6 | 2 | −1,0R |
| nessuno | 6 | 1 | −3,4R |
| **Settimana** | **20** | **7** | **−1,8R** |

</div>

<div class="table-wrap">

| Tag | Operazioni con il tag | R netto su quelle operazioni |
|---|---|---|
| dopo-perdita | 5 | −4,0R |
| stop-spostato | 2 | −3,1R |
| uscita-anticipata | 4 | +2,8R |

</div>

Un'operazione può portare più tag, quindi la seconda tabella non torna con il totale della settimana. Non deve. Mostra dove sta il danno.

Saltano all'occhio due cose. Le sei operazioni senza setup hanno perso 3,4R, più dell'intera perdita della settimana. E il tag dopo-perdita ha perso 4,0R su cinque operazioni. Se controlli la sovrapposizione e scopri che la maggior parte delle operazioni senza setup è arrivata subito dopo una perdita, la modifica di regola si scrive da sola: dopo un'operazione in perdita, nessun nuovo ingresso finché non compare un setup dell'elenco, e prima una pausa. [La guida agli errori nel day trading](/it/blog/errori-comuni-nel-day-trading/) ha una regola di pausa pensata esattamente per questo.

Ciò che *non* dovresti fare è abbandonare rottura-range. Sei operazioni non possono dirti se un setup funziona; [la sezione sulla dimensione del campione della guida alle metriche](/it/blog/analizzare-le-metriche-di-performance-di-trading/) mostra quanto è ampia l'incertezza anche a 40. È questa la distinzione utile in una revisione settimanale. Una regola di comportamento ("non fare trading senza un setup") può cambiare dopo una settimana, perché averla infranta o no è un fatto, non una stima. Una regola sui setup ha bisogno di molte più operazioni prima che i numeri significhino qualcosa, quindi continua a etichettare e giudicala più avanti.

Una modifica a settimana, scritta con la data. Cambia tre cose insieme e i numeri della settimana dopo non sapranno dirti quale ha aiutato.

## Abbinare le tue note alla scheda Diario di Stockade

Se ti eserciti su Stockade, la [pagina Analisi](/it/analytics/) tiene per te la metà oggettiva. La sua scheda Diario elenca ogni operazione chiusa, dalla più recente, con Simbolo, Direzione, Ingresso, Uscita, Quantità, P&L, Durata e Data. Non ha un campo per le note, quindi il tuo modello vive accanto, in un foglio di calcolo o in un quaderno.

Qualche dettaglio rende l'abbinamento più facile. La colonna Data mostra il giorno in cui l'operazione si è chiusa, senza orario, quindi più operazioni chiuse nello stesso giorno hanno la stessa data. Abbinale invece per simbolo, direzione e prezzi di ingresso e uscita, e tieni i tuoi numeri di operazione nello stesso ordine. Non c'è un'esportazione, quindi copia le cifre che ti servono nel tuo foglio alla fine di ogni sessione. E il pulsante Cancella nel pannello Storico operazioni del simulatore elimina le operazioni salvate, svuotando il Diario insieme alle statistiche sulle operazioni, quindi non premerlo finché il tuo foglio non è aggiornato.

## Tenere vivo il diario oltre la seconda settimana

Il modello funziona solo se sopravvive a una settimana negativa. Qualche regola aiuta:

- **Compila la riga del piano prima di cliccare.** Se non sai indicare il setup e i tre prezzi, quella è la tua risposta sull'operazione.
- **Compila il risultato prima dell'operazione successiva,** non ore dopo. Bastano pochi secondi finché l'operazione è fresca.
- **Non ricostruire a memoria le righe mancanti.** Se una sessione non è stata registrata, annota il buco e il P&L della sessione preso dalla piattaforma, e fermati lì. I motivi scritti dopo sono supposizioni.
- **Non toccare il modello per un mese.** Cambiare i campi ogni settimana rende impossibile confrontare le settimane.
- **Rispetta l'appuntamento della revisione** anche quando la settimana è andata bene. Le settimane buone possono nascondere violazioni delle regole che per caso hanno pagato, che secondo la guida al paper trading sono il tipo più pericoloso.

La colonna R ti dà anche i dati per la pianificazione della [guida al drawdown](/it/blog/matematica-del-recupero-dal-drawdown/). Conta ogni mese la tua serie più lunga di operazioni in perdita e confrontala con la serie a cui il tuo rischio per operazione doveva permetterti di sopravvivere.

## Cosa un diario non può dirti

Un diario è un resoconto che scrivi su te stesso, quindi ne ha i limiti. Le tue operazioni le valuti tu, ed è allettante segnare con una S una violazione al limite. Decidi S o N in base alla regola scritta, non a come è andata l'operazione.

Inoltre non può rendere grande un campione piccolo. Un mese di voci basta per cogliere comportamenti ripetuti, ed è lontanissimo da quanto serve per dimostrare che un setup ha un vantaggio. E un diario tenuto con denaro virtuale registra come fai trading quando perdere non costa nulla. Il denaro reale può aggiungere violazioni delle regole che sul simulatore non sono mai comparse.

## Esercitati sul simulatore

Prepara il modello in un foglio di calcolo, scrivi i tuoi elenchi di tag di setup e di errore, e fai 20 operazioni sul [simulatore](/it/simulator/), compilando la riga del piano prima di ogni ingresso e il risultato prima dell'operazione successiva. A fine settimana, abbina le righe alla scheda Diario in Analisi, fai la revisione in quattro passi, e scrivi una modifica di regola per la settimana seguente. I prezzi di Stockade sono generati nel tuo browser, quindi le statistiche sui setup non varranno in un mercato reale. La routine sì: riga del piano, risultato, tag, revisione, una modifica.
