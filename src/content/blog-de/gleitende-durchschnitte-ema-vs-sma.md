---
title: "Gleitende Durchschnitte erklärt: EMA vs. SMA und ihre Nutzung"
description: "SMA und EMA unterscheiden sich durch einen Multiplikator. Die Arithmetik, warum 9/20/50 Standard sind, Nutzung als Unterstützung, und warum sie nachlaufen."
date: 2026-04-13
tags: ["Indikatoren", "Technische Analyse"]
slug: "gleitende-durchschnitte-ema-vs-sma"
translationOf: "moving-averages-ema-vs-sma"
---

Sie starren auf einen Chart, der in den letzten vierzig Balken hoch, runter, hoch, runter und wieder hoch gegangen ist, und Sie können nicht sagen, ob er trendet oder nur wackelt. Jede einzelne Kerze ist Rauschen. Die Frage, die Sie beantwortet haben wollen — „geht das Ding im Großen und Ganzen irgendwohin?" — ist in keinem einzelnen Balken sichtbar, weil es eine Frage über die gesamte Sequenz ist.

Ein gleitender Durchschnitt ist die einfachste Antwort auf diese Frage. Er nimmt eine Reihe jüngster Schlusskurse, komprimiert sie auf eine Zahl, und zeichnet diese Zahl bei jedem neuen Balken neu. Das Gezitter hebt sich auf, und übrig bleibt eine Linie, die Sie ansehen und sofort steigend, fallend oder flach nennen können.

## Was ein gleitender Durchschnitt tatsächlich berechnet

Nehmen Sie die letzten fünf Schlusskurse eines Instruments: 182,00, 184,50, 183,00, 186,00, 185,50. Addieren Sie sie: 921,00. Teilen Sie durch 5: **184,20**. Das ist ein 5-Perioden-einfacher-gleitender-Durchschnitt, oder SMA.

Das Wort „gleitend" ist die wichtige Hälfte. Beim nächsten Balken kommt ein neuer Schluss — sagen wir 190,00 — und der älteste, 182,00, fällt aus dem Fenster. Die neue Summe ist 921,00 − 182,00 + 190,00 = 929,00, und der neue SMA ist 929,00 ÷ 5 = **185,80**. Das Fenster rutschte einen Balken vor, und der Durchschnitt stieg um 1,60.

Beachten Sie, dass sich der Durchschnitt aus zwei Gründen änderte: Ein neuer Preis kam hinzu *und* ein alter fiel heraus. Dieser zweite Effekt wird leicht übersehen — ein SMA kann springen, nur weil eine große Zahl aus dem hinteren Ende des Fensters fällt, selbst wenn sich der heutige Preis kaum bewegt hat.

## SMA vs. EMA: der Gewichtungsmultiplikator, und warum EMA schneller reagiert

Der SMA gibt jedem Preis in seinem Fenster dieselbe Stimme. In einem 20-Perioden-SMA zählt der Schluss von vor 20 Balken so viel wie der von gestern — dann, beim nächsten Balken, zählt er überhaupt nicht mehr. Das ist ein seltsames Modell von Relevanz.

Der exponentielle gleitende Durchschnitt behebt das. Statt eines Fensters führt der EMA einen laufenden Wert und stupst ihn bei jedem neuen Schluss um einen festen Bruchteil in dessen Richtung — den **Glättungsmultiplikator**:

```
Multiplikator = 2 / (Periode + 1)
```

Für einen 9-Perioden-EMA ist das 2 / 10 = **0,2**. Die Aktualisierungsregel ist:

```
neuer EMA = alter EMA + Multiplikator x (neuer Schluss - alter EMA)
```

Rechnen Sie einen Balken durch. Angenommen, der 9-Perioden-EMA zeigt aktuell 186,50, und der Balken schließt bei 188,00. Die Lücke ist 188,00 − 186,50 = 1,50. Multiplizieren Sie mit 0,2, um 0,30 zu erhalten. Also:

**neuer EMA = 186,50 + 0,2 x (188,00 − 186,50) = 186,50 + 0,30 = 186,80**

Der EMA bewegte sich 30 Cent als Reaktion auf eine Bewegung von 1,50 $. Er schließt bei jedem Balken, für immer, 20 % der Distanz zum neuen Preis. Nichts fällt bei einem EMA vollständig heraus — alte Preise schrumpfen nur. Bei einem Multiplikator von 0,2 ist das Gewicht eines Schlusses von vor *n* Balken 0,2 × 0,8ⁿ, sodass ein Preis von vor 10 Balken noch etwa 2,1 % des Gewichts trägt, und einer von vor 30 Balken einen Rundungsfehler.

Jetzt der Geschwindigkeitsvergleich. Unser 5-Perioden-SMA bewegte sich von 184,20 auf 185,80 — ein Gewinn von 1,60 —, als 190,00 ankam. Ein 5-Perioden-EMA, der bei demselben 184,20 sitzt, Multiplikator 2/6 = 0,3333, würde auf 184,20 + 0,3333 × 5,80 = **186,13** gehen, ein Gewinn von 1,93. Dieselben Daten, mehr Bewegung. Das ist der ganze Unterschied: Der EMA reagiert schneller, weil er jüngere Preise stärker gewichtet.

Schneller ist nicht besser. Schneller bedeutet frühere Signale *und* mehr falsche. Ein SMA ist ruhiger und hält Sie durch Rücksetzer in einem Trend, die einen EMA-Trader hinausschütteln. Stockades Charts berechnen EMAs auf die Standardweise: Der erste Wert wird mit einem einfachen Durchschnitt des Eröffnungsfensters angesetzt, und jeder Balken danach nutzt den obigen Multiplikator.

## Eine Periode wählen, und warum 9, 20 und 50 überall auftauchen

Die Periode ist ein Regler, der Reaktionsfreude gegen Stabilität abwägt. Kurze Perioden schmiegen sich an den Preis und wenden sich ständig; lange Perioden ignorieren das meiste, was passiert, und wenden sich selten. Betrachten Sie, was der Multiplikator bei den drei EMAs bewirkt, die Stockade überlagert, mit einem vorherigen EMA von 186,50 und einem Schluss von 188,00 in jeder Zeile:

<div class="table-wrap">

| EMA | Multiplikator | Bewegung bei einer Lücke von +1,50 | Rolle |
|---|---|---|---|
| EMA 9 | 2/10 = 0,2000 | +0,30 | Kurzfristige Dynamik |
| EMA 20 | 2/21 = 0,0952 | +0,14 | Intraday-Trend |
| EMA 50 | 2/51 = 0,0392 | +0,06 | Strukturelle Tendenz |

</div>

Der EMA 50 zuckt kaum bei einer Bewegung, die den EMA 9 fünfmal so stark verschiebt. Sie beantworten unterschiedliche Fragen: Der 9er beantwortet „was hat der Preis diese Stunde getan", der 50er beantwortet „in welche Richtung neigte sich dieses Instrument die ganze Session."

Warum diese spezifischen Zahlen? Größtenteils Konvention, die sich teilweise selbst erfüllt — genug Trader beobachten dieselben drei Linien, dass sich Reaktionen um sie herum ballen. Nichts ist mathematisch besonders an 9 oder 20 oder 50, und Sie sollten widerstehen, nach der „optimalen" Periode in vergangenen Daten zu suchen. Das ist Curve-Fitting, und auf gestrige Charts justierte Perioden verfallen schnell.

Stockade zeigt alle drei im Chart in unterschiedlichen Farben — EMA 9 bernstein, EMA 20 blau, EMA 50 violett —, mit einem Umschalter für jede, sodass Sie es auf eine Linie reduzieren können, während Sie lernen, was diese Linie tut.

## Gleitende Durchschnitte als dynamische Unterstützung und Widerstand nutzen

Horizontale [Unterstützungs- und Widerstandsniveaus](/blog/support-and-resistance-levels/) sind feste Preise. Ein gleitender Durchschnitt ist ein Niveau, das sich mit dem Markt bewegt, was ihn in Trends nützlich macht, wo eine feste Linie innerhalb einer Stunde veraltet. In einem gesunden Aufwärtstrend zieht der Preis zurück, berührt oder unterschreitet leicht einen steigenden EMA und setzt sich fort — Trader nennen das „auf dem 20er reiten." In einem Abwärtstrend fungiert dieselbe Linie als Decke, an der Rallys scheitern.

Seien Sie ehrlich, was das ist. Der EMA ist keine Barriere; er ist eine beschreibende Linie, die zufällig dort sitzt, wo sich jüngstes Kaufinteresse konzentriert hat, und er versagt routinemäßig. Behandeln Sie einen als Unterstützung, brauchen Sie trotzdem einen Stop darunter — „der Preis prallte die letzten drei Male vom 20er ab" beschreibt drei Ereignisse, keine Eigenschaft des Instruments.

## Die Kreuzungsstrategie und ihr Whipsaw-Fehlermodus

Die klassische mechanische Regel: kaufen, wenn ein schneller MA über einen langsamen MA kreuzt, verkaufen, wenn er zurückkreuzt. Auf Stockades Chart-Set ist das der EMA 9, der den EMA 20 kreuzt, oder der 20er, der den 50er kreuzt. In einem anhaltenden Trend funktioniert das gut — die schnelle Linie hebt vom langsamen Durchschnitt ab und bleibt dort, was Sie für die Dauer im Trade hält.

In einer Range ist es ein Schredder. Stellen Sie sich einen Preis vor, der zwischen etwa 184 und 188 oszilliert. Der EMA 9 kreuzt bei 186,40 über den EMA 20 — Sie kaufen. Sechs Balken später rollt der Preis auf 185,20 zurück, und die Linien kreuzen zurück — Sie verkaufen mit 1,20 $ Verlust. Vier Balken weiter kreuzen sie bei 186,10 wieder nach oben — Sie kaufen — und der Preis rutscht auf 185,00 zurück, weitere 1,10 $ weg. Zwei Trades, kein Trend, und Sie sind 2,30 $ pro Aktie im Minus, vor jeglichen Kosten, rein weil ein Seitwärtsmarkt zwei nahezu identische Linien immer wieder kreuzen lässt. Das ist **Whipsaw**, und es ist kein Bug in den Einstellungen. Es ist, was passiert, wenn Sie ein trendfolgendes Werkzeug auf einen Markt anwenden, der keinen Trend hat.

Die Verteidigung ist keine bessere Periode. Es ist ein Filter: Nehmen Sie Kreuzungen nur, wenn die langsame Linie klar geneigt ist, oder verlangen Sie Bestätigung von etwas, das etwas anderes misst, wie [MACD](/blog/macd-explained/) — das selbst aus EMAs gebaut ist — oder eine volumenverankerte Referenz wie [VWAP](/blog/vwap-trading-strategy/).

## Die Steigung des gleitenden Durchschnitts als Trendfilter lesen

Schauen Sie vor der Kreuzung auf die Steigung. Ein flacher EMA 50 ist der Markt, der Ihnen sagt, dass es hier keinen Richtungs-Edge gibt, und es ist der billigste verfügbare Filter.

Quantifizieren Sie es, statt nur hinzuschauen. Zeigte der EMA 20 vor zehn Balken 182,40 und zeigt jetzt 186,90, ist er über 10 Balken um 4,50 gestiegen — 0,45 pro Balken, etwa 0,24 % des Preises pro Balken. Das ist eine echte Steigung. Zeigte er vor zehn Balken 186,70 und jetzt 186,90, sind das 0,02 pro Balken, etwa 0,01 % — flach, und jede daraus erzeugte Kreuzung ist Rauschen.

Eine vertretbare Regel: Nehmen Sie Long-Kreuzungen nur, wenn der EMA 50 steigt, Short-Kreuzungen nur, wenn er fällt, und bleiben Sie an der Seitenlinie, wenn er flach ist. Das senkt Ihre Trade-Anzahl deutlich. Das ist der Sinn.

## Die Einschränkung, die Sie nicht wegkonstruieren können: gleitende Durchschnitte laufen nach

Jeder gleitende Durchschnitt wird aus Preisen berechnet, die bereits gedruckt haben. Es gibt keine Einstellung und keine Variante, die dem entkommt. Der EMA reduziert den Nachlauf gegenüber einem SMA; er entfernt ihn nicht, weil ein auf vergangene Schlusskurse angewandter Multiplikator immer noch eine Funktion vergangener Schlusskurse ist.

Ein gleitender Durchschnitt bringt Sie also nie am Tief hinein oder am Hoch hinaus. Bis sich ein EMA 9 nach oben dreht, liegt das Tief bereits hinter Ihnen; bis eine Kreuzung einen Abwärtstrend bestätigt, ist ein Teil des Rückgangs bereits geschehen. Wer Ihnen eine Konfiguration verkauft, die Wenden „vorhersagt", verkauft Ihnen eine an einen bereits gesehenen Chart angepasste Kurve.

Was Ihnen ein gleitender Durchschnitt wirklich gibt, ist eine konsistente, unemotionale Beschreibung, wo der Preis relativ zu sich selbst war. Das ist eine ganze Menge wert — er hindert Sie daran, einen Abwärtstrend ein Schnäppchen zu nennen —, aber es ist Beschreibung, keine Vorhersage. Nutzen Sie ihn zum Filtern und Rahmen, und legen Sie Ihr Risikomanagement woanders hin.

## Üben Sie gleitende Durchschnitte im Simulator

Rufen Sie einen Chart auf Stockade auf und schalten Sie alles außer dem EMA 20 aus. Beobachten Sie ein paar hundert Balken und notieren Sie, wo der Preis ihn respektiert und wo er glatt hindurchschneidet. Schalten Sie dann den EMA 9 und 50 ein und zählen Sie, wie viele Kreuzungen passierten, während der EMA 50 klar geneigt war, gegenüber flach — diese Zählung ist das ganze Argument für den Steigungsfilter, in Ihren eigenen Daten.

Behalten Sie im Kopf, woran Sie üben: Stockades Kurse werden im Browser generiert, nicht von einer Börse bezogen, sodass diese EMAs einen simulierten Markt beschreiben. Die Arithmetik und die Lesegewohnheiten sind identisch; das darunterliegende Instrument ist fiktiv. Gehen Sie eine generierte Session Kerze für Kerze im Chart-Simulator durch, sodass Sie bei jeder Kreuzung pausieren und sich festlegen können, bevor der nächste Balken die Antwort verrät. Beginnen Sie auf [Stockades Börsensimulator](/de/simulator/).
