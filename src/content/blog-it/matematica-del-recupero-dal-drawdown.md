---
title: "La Matematica del Drawdown: Perché −50% Richiede +100%"
description: "Perdere il 50% richiede un +100%, ma in quante operazioni si recupera? Probabilità delle serie di perdite, volatility drag e un limite di drawdown deciso prima."
date: 2026-11-02
author: "Stockade Team"
tags: ["Gestione del Rischio", "Analisi"]
slug: "matematica-del-recupero-dal-drawdown"
translationOf: "drawdown-recovery-math"
---

Perdi metà di un conto da 10.000$ e ti restano 5.000$. Per tornare a 10.000$ devi raddoppiare ciò che resta, un guadagno del 100%. È una frase che si cita spesso. Le domande che vengono dopo contano di più: quante operazioni richiede la risalita, quanto in profondità devi aspettarti che arrivi una serie di perdite, e quanto drawdown dovresti accettare prima ancora di averne avuto uno?

Questo articolo fa i conti su quei numeri. Tutto qui è aritmetica su cifre ipotetiche. Niente di tutto ciò è rassicurante, ed è per questo che vale la pena farlo prima che ti serva, non nel mezzo di un brutto mese.

## La formula del recupero in una riga

Un drawdown è il calo dal punto più alto del tuo conto (il suo picco) a un minimo successivo, in percentuale di quel picco. Se sei sotto di una frazione *D*, il guadagno che ti serve per tornare al picco è:

```
Guadagno necessario = D ÷ (1 − D)
```

Un calo del 20% richiede 0,20 ÷ 0,80 = 25%. Un calo del 50% richiede 0,50 ÷ 0,50 = 100%. Il divario si allarga in fretta perché ogni perdita restringe la base su cui guadagni il recupero. [La guida al dimensionamento della posizione](/it/blog/gestione-del-rischio-e-dimensionamento-della-posizione/) ha la tabella completa dal 10% al 75%, quindi non la ripetiamo. Ciò che una percentuale non può dirti è quanto tempo richiede il recupero, quindi il resto dell'articolo lo misura in operazioni.

## Il recupero misurato in operazioni, non in percentuale

Per trasformare una percentuale in un numero di operazioni ti serve una strategia. Prendine una ipotetica: vince il 40% delle volte, le operazioni vincenti rendono 2R e quelle perdenti perdono 1R, dove R è l'importo rischiato per operazione. La sua aspettativa è 0,40 × 2 − 0,60 × 1 = +0,2R per operazione. (Se questa aritmetica è nuova per te, [la guida al rischio-rendimento](/it/blog/rapporto-rischio-rendimento-e-aspettativa/) la spiega passo per passo.) Rischia l'1% del conto per operazione e in media guadagna lo 0,2% per operazione.

Poi applica la capitalizzazione composta, perché quando rischi una percentuale fissa ogni operazione è dimensionata sul saldo attuale, più piccolo. In media, ecco quante operazioni servono per risalire:

<div class="table-wrap">

| Drawdown | Guadagno necessario | Operazioni per recuperare con rischio all'1% | Operazioni per recuperare con rischio al 2% |
|---|---|---|---|
| 10% | 11,1% | circa 56 | circa 30 |
| 20% | 25,0% | circa 118 | circa 63 |
| 30% | 42,9% | circa 189 | circa 100 |
| 50% | 100,0% | circa 367 | circa 194 |

</div>

Spiccano due cose. Primo, un drawdown del 20% con rischio all'1% costa ben più di cento operazioni di una strategia che *funziona*. Se fai tre operazioni al giorno, sono circa due mesi di trading solo per tornare dove eri.

Secondo, la colonna al 2% sembra più veloce, ed è una trappola. Il confronto corretto non è lo stesso drawdown a due livelli di rischio, perché la stessa brutta serie scava una buca più profonda al 2%. Fai passare una stessa serie di dieci perdite attraverso ciascun livello:

<div class="table-wrap">

| Rischio per operazione | Drawdown da 10 perdite consecutive | Operazioni per risalire |
|---|---|---|
| 1% | 9,6% | circa 53 |
| 2% | 18,3% | circa 57 |
| 5% | 40,1% | circa 70 |

</div>

Raddoppiare il rischio raddoppia la buca e all'incirca raddoppia la velocità, quindi la risalita richiede più o meno lo stesso numero di operazioni. Spingi il rischio più in alto e la situazione peggiora invece di migliorare, per una ragione che vedremo parlando di volatility drag. Una dimensione maggiore non ti compra un recupero più veloce. Ti compra un drawdown più profondo.

Queste cifre sono medie. Le sequenze reali divagano: alcune risalgono prima, e una sfortunata può richiedere molto più tempo.

## Per quale serie di perdite prepararsi

La guida al dimensionamento della posizione calcola le probabilità di una serie specifica. Una domanda più utile per pianificare è quanto sarà probabilmente lunga la serie *peggiore* in un certo numero di operazioni. Per la nostra strategia con il 40% di successo, ecco la probabilità di vedere almeno una serie di perdite lunga almeno così:

<div class="table-wrap">

| Serie di almeno | Su 100 operazioni | Su 200 operazioni | Su 500 operazioni |
|---|---|---|---|
| 6 perdite | 87% | 98% | ~100% |
| 8 perdite | 49% | 75% | 97% |
| 10 perdite | 20% | 38% | 71% |
| 12 perdite | 8% | 15% | 35% |
| 14 perdite | 3% | 6% | 14% |

</div>

Queste cifre vengono dalla probabilità esatta di una serie, con ogni operazione indipendente dalla precedente. Su 500 operazioni, una serie di dieci perdite è più probabile che no. E questa è una strategia con aspettativa positiva. Quando arriva quella serie, non c'è niente di rotto.

Campioni più lunghi producono serie più lunghe. Sembra ovvio, ma coglie molti di sorpresa: una serie che non hai mai visto nelle tue prime 100 operazioni non dice nulla sul fatto che la vedrai nelle prossime 400.

## Volatility drag: perché un rendimento medio sovrastima ciò che tieni

Ecco la parte più strana della matematica del drawdown. Guadagna il 50% e poi perdi il 50%, e il tuo rendimento medio è zero. Il tuo conto è sotto del 25%, perché 1,50 × 0,50 = 0,75. Guadagna il 10% e perdi il 10% e sei sotto dell'1% (1,10 × 0,90 = 0,99). Guadagna il 20% e perdi il 20% e sei sotto del 4%.

Quel divario tra il rendimento medio e quello composto è [spesso chiamato volatility drag, e si può approssimare sottraendo metà della varianza dalla media](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/):

```
Rendimento composto per periodo ≈ rendimento medio − (varianza ÷ 2)
```

dove la varianza misura quanto ampiamente i risultati oscillano intorno alla loro media. Le oscillazioni piccole frenano a malapena. Quelle grandi frenano molto, perché la penalità cresce con il quadrato dell'oscillazione.

Applicalo alla nostra strategia. Il suo guadagno medio per operazione è 0,2R, quindi se guardassi solo le medie, rischiare di più significherebbe sempre guadagnare di più. La capitalizzazione composta non è d'accordo:

<div class="table-wrap">

| Rischio per operazione | Guadagno medio per operazione | Guadagno composto per operazione |
|---|---|---|
| 1% | 0,20% | 0,19% |
| 2% | 0,40% | 0,36% |
| 5% | 1,00% | 0,74% |
| 10% | 2,00% | 0,98% |
| 15% | 3,00% | 0,75% |
| 20% | 4,00% | 0,07% |
| 25% | 5,00% | −1,04% |

</div>

Con un rischio del 25% per operazione, una strategia con aspettativa positiva perde denaro nel tempo. La media dice ancora +5% per operazione, ma ciò che tieni davvero si riduce a ogni operazione. Per questa strategia la crescita raggiunge il massimo con un rischio del 10%. Quel picco è noto come frazione di Kelly, da [un articolo del 1956 di J. L. Kelly Jr.](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf) che mostra come un giocatore che punta ogni volta la frazione che massimizza la crescita finirà per superare chi punta qualsiasi altra frazione fissa, e resterà in vantaggio. Il Kelly pieno presuppone che tu conosca esattamente il tuo vero tasso di successo e il tuo rapporto guadagno/perdita, cosa che in pratica non succede mai. Noi non ci andremmo nemmeno vicino: con un rischio del 10%, una serie di dieci perdite si porta via il 65% del conto, e la formula del recupero dice che servirebbe un guadagno del 187%.

È anche il motivo per cui le cifre delle "operazioni per risalire" aumentano al 5%. Il drag erode la velocità di recupero mentre le perdite restano altrettanto profonde.

## Scegli il tuo drawdown massimo prima che ti serva

Ogni numero visto finora punta nella stessa direzione: decidi quanto in profondità sei disposto a scendere mentre sei calmo, poi lavora a ritroso fino a un livello di rischio. Tre passi:

1. **Scegli il drawdown con cui continueresti a fare trading.** Sii onesto. Se un calo del 20% ti farebbe abbandonare la strategia, quello è il tuo numero, qualunque cosa dica un libro.
2. **Scegli la serie per cui ti prepari.** Dalla tabella delle serie, per la nostra strategia una serie di 12 perdite ha circa una probabilità su tre su 500 operazioni. È un caso ragionevole su cui pianificare.
3. **Ricava il rischio per operazione.** Ti serve che (1 − rischio)^serie resti sopra 1 − drawdown. Per un limite del 20% e una serie di 12 perdite, rischio ≤ 1 − 0,80^(1/12) = **1,84%**. Pianifica per 14 perdite ed è 1,58%.

Poi lascia un margine. Un drawdown reale di solito è più profondo della sua serie più lunga, perché le perdite arrivano a grappoli con qualche piccolo guadagno sparso in mezzo, e il conto continua a scivolare attraverso tutto questo. Dimezzare la cifra calcolata, qui a qualcosa sotto l'1%, è un punto di partenza difendibile.

Infine, scrivi cosa succede a ogni soglia: per esempio, dimezza il rischio a −10% e smetti di fare trading per una revisione a −15%. Ridurre la dimensione rallenta la risalita, dato che all'1% invece che al 2% un drawdown del 10% richiede circa 56 operazioni invece di 30. Ma riduce il danno della prossima serie, quella che non puoi vedere arrivare. La regola che conta di più è quella da cui [la guida agli errori nel day trading](/it/blog/errori-comuni-nel-day-trading/) mette in guardia dal lato opposto: non aumentare mai la dimensione per recuperare un drawdown. Metti questi numeri nel [tuo piano di trading](/it/blog/come-creare-un-piano-di-trading/) così sono decisi prima che inizino le perdite.

## Cosa misura la scheda Drawdown massimo di Stockade

Nella [pagina di analisi](/it/analytics/) di Stockade, Drawdown massimo scorre le tue operazioni chiuse nell'ordine in cui si sono chiuse, partendo dal saldo iniziale di 100.000$ come primo picco. Registra il calo più grande sotto il picco corrente, in percentuale di quel picco.

Poiché usa solo le operazioni chiuse, le oscillazioni di una posizione aperta non compaiono mai. Se un'operazione aperta trascina il tuo capitale giù dell'8% e poi recupera prima che tu la chiuda, quel calo non appare mai, e una perdita che stai ancora tenendo non conta finché non la chiudi. Considera la scheda un limite inferiore di quanto in profondità sei davvero sceso. [La guida alle metriche di performance](/it/blog/analizzare-le-metriche-di-performance-di-trading/) copre il resto della pagina.

## Esercitati sul simulatore

Prima della tua prossima sessione sul [simulatore](/it/simulator/), scrivi tre numeri: il tuo rischio per operazione, la serie per cui ti prepari, e il drawdown a cui ridurrai la dimensione. Dimensiona ogni operazione sul saldo attuale, non su quello iniziale. Dopo 50 operazioni, confronta Drawdown massimo in [Analisi](/it/analytics/) con ciò che il tuo piano consentiva, e conta a mano la tua serie di perdite più lunga dalla scheda Diario. I prezzi di Stockade sono generati nel tuo browser e il suo denaro è virtuale, quindi lì un drawdown è un numero su uno schermo. L'aritmetica della risalita è la stessa, e l'abitudine di decidere i tuoi limiti in anticipo è la parte che vale la pena portare nel trading reale.
