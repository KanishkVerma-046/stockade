---
title: "Drawdown-Erholung: Warum 50 % Verlust 100 % Gewinn braucht"
description: "50 % Verlust braucht 100 % Gewinn, doch wie viele Trades dauert die Erholung? Wie oft Verlustserien kommen, Volatility Drag und ein Drawdown-Limit vorab."
date: 2026-11-02
author: "Stockade Team"
tags: ["Risikomanagement", "Analysen"]
slug: "drawdown-erholung-berechnen"
translationOf: "drawdown-recovery-math"
---

Verlieren Sie die Hälfte eines Kontos von 10.000 $, haben Sie 5.000 $. Um wieder auf 10.000 $ zu kommen, müssen Sie den Rest verdoppeln, ein Gewinn von 100 %. Dieser Satz wird oft zitiert. Wichtiger sind die Folgefragen: Wie viele Trades dauert der Weg zurück, wie tief sollten Sie eine Verlustserie erwarten, und wie viel Drawdown sollten Sie akzeptieren, bevor Sie überhaupt je einen hatten?

Dieser Beitrag rechnet diese Zahlen durch. Alles hier ist Arithmetik mit hypothetischen Werten. Nichts davon ist beruhigend, und genau deshalb lohnt es sich, das zu tun, bevor Sie es brauchen, und nicht mitten in einem schlechten Monat.

## Die Erholungsformel in einer Zeile

Ein Drawdown ist der Rückgang vom höchsten Stand Ihres Kontos (seinem Hoch) zu einem späteren Tief, in Prozent dieses Hochs. Liegen Sie um einen Anteil *D* im Minus, beträgt der Gewinn, den Sie brauchen, um zurück zum Hoch zu kommen:

```
Nötiger Gewinn = D ÷ (1 − D)
```

20 % im Minus braucht 0,20 ÷ 0,80 = 25 %. 50 % im Minus braucht 0,50 ÷ 0,50 = 100 %. Die Lücke wächst schnell, weil jeder Verlust die Basis verkleinert, auf der Sie die Erholung verdienen. [Der Leitfaden zur Positionsgröße](/de/blog/risikomanagement-positionsgroesse/) hat die vollständige Tabelle von 10 % bis 75 %, deshalb wiederholen wir sie hier nicht. Was ein Prozentsatz nicht sagen kann, ist, wie lange die Erholung dauert, deshalb misst der Rest dieses Beitrags sie in Trades.

## Erholung in Trades gemessen, nicht in Prozent

Um einen Prozentsatz in eine Anzahl Trades zu übersetzen, brauchen Sie eine Strategie. Nehmen Sie eine hypothetische: Sie gewinnt in 40 % der Fälle, Gewinner bringen 2R und Verlierer kosten 1R, wobei R der pro Trade riskierte Betrag ist. Ihr Erwartungswert beträgt 0,40 × 2 − 0,60 × 1 = +0,2R pro Trade. (Ist diese Rechnung neu für Sie, geht sie [der Leitfaden zum Chance-Risiko-Verhältnis](/de/blog/chance-risiko-verhaeltnis-erwartungswert/) Schritt für Schritt durch.) Riskieren Sie 1 % des Kontos pro Trade, verdient sie im Schnitt 0,2 % pro Trade.

Dann kommt der Zinseszinseffekt hinzu, denn wenn Sie einen festen Prozentsatz riskieren, wird jeder Trade nach dem aktuellen, kleineren Kontostand bemessen. Im Durchschnitt brauchen Sie so viele Trades für den Weg zurück:

<div class="table-wrap">

| Drawdown | Nötiger Gewinn | Trades zur Erholung bei 1 % Risiko | Trades zur Erholung bei 2 % Risiko |
|---|---|---|---|
| 10 % | 11,1 % | etwa 56 | etwa 30 |
| 20 % | 25,0 % | etwa 118 | etwa 63 |
| 30 % | 42,9 % | etwa 189 | etwa 100 |
| 50 % | 100,0 % | etwa 367 | etwa 194 |

</div>

Zwei Dinge fallen auf. Erstens kostet ein Drawdown von 20 % bei 1 % Risiko weit über hundert Trades einer Strategie, die *funktioniert*. Machen Sie drei Trades am Tag, sind das etwa zwei Monate Trading, nur um wieder dort zu stehen, wo Sie waren.

Zweitens wirkt die 2-%-Spalte schneller, und das ist eine Falle. Der richtige Vergleich ist nicht derselbe Drawdown bei zwei Risikostufen, denn dieselbe schlechte Serie gräbt bei 2 % ein tieferes Loch. Schicken Sie eine Serie von zehn Verlusten durch jede Stufe:

<div class="table-wrap">

| Risiko pro Trade | Drawdown nach 10 Verlusten in Folge | Trades für den Weg zurück |
|---|---|---|
| 1 % | 9,6 % | etwa 53 |
| 2 % | 18,3 % | etwa 57 |
| 5 % | 40,1 % | etwa 70 |

</div>

Verdoppeln Sie Ihr Risiko, verdoppeln Sie das Loch und ungefähr auch Ihr Tempo, sodass der Weg zurück etwa gleich viele Trades dauert. Erhöhen Sie das Risiko weiter, wird es schlechter, nicht besser, aus einem Grund, zu dem wir beim Volatility Drag kommen. Mehr Größe kauft Ihnen keine schnellere Erholung. Sie kauft Ihnen einen tieferen Drawdown.

Diese Zahlen sind Durchschnitte. Echte Abfolgen schwanken: Manche kommen früher zurück, und eine unglückliche kann weit länger dauern.

## Mit welcher Verlustserie Sie planen sollten

Der Leitfaden zur Positionsgröße rechnet die Wahrscheinlichkeit einer bestimmten Serie aus. Eine nützlichere Planungsfrage ist, wie schlimm die *schlimmste* Serie innerhalb einer Reihe von Trades wahrscheinlich ausfällt. Für unsere Strategie mit 40 % Trefferquote ist hier die Wahrscheinlichkeit, mindestens eine Verlustserie von mindestens dieser Länge zu erleben:

<div class="table-wrap">

| Serie von mindestens | Über 100 Trades | Über 200 Trades | Über 500 Trades |
|---|---|---|---|
| 6 Verlusten | 87 % | 98 % | ~100 % |
| 8 Verlusten | 49 % | 75 % | 97 % |
| 10 Verlusten | 20 % | 38 % | 71 % |
| 12 Verlusten | 8 % | 15 % | 35 % |
| 14 Verlusten | 3 % | 6 % | 14 % |

</div>

Diese Werte stammen aus der exakten Wahrscheinlichkeit einer Serie, wobei jeder Trade unabhängig vom vorherigen ist. Über 500 Trades ist eine Serie von zehn Verlusten wahrscheinlicher als nicht. Und das bei einer Strategie mit positivem Erwartungswert. An ihr ist nichts kaputt, wenn diese Serie kommt.

Längere Stichproben bringen längere Serien hervor. Das klingt selbstverständlich, erwischt aber viele: Eine Serie, die Sie in Ihren ersten 100 Trades nie gesehen haben, sagt nichts darüber, ob Sie sie in den nächsten 400 sehen werden.

## Volatility Drag: warum die Durchschnittsrendite übertreibt, was Sie behalten

Hier kommt der seltsamste Teil der Drawdown-Mathematik. Gewinnen Sie 50 % und verlieren dann 50 %, ist Ihre Durchschnittsrendite null. Ihr Konto liegt aber 25 % im Minus, denn 1,50 × 0,50 = 0,75. Gewinnen Sie 10 % und verlieren 10 %, liegen Sie 1 % im Minus (1,10 × 0,90 = 0,99). Gewinnen Sie 20 % und verlieren 20 %, liegen Sie 4 % im Minus.

Diese Lücke zwischen der Durchschnittsrendite und der Rendite mit Zinseszins wird [oft Volatility Drag genannt und lässt sich näherungsweise berechnen, indem man die halbe Varianz vom Durchschnitt abzieht](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/):

```
Rendite pro Periode mit Zinseszins ≈ Durchschnittsrendite − (Varianz ÷ 2)
```

Die Varianz misst dabei, wie weit die Ergebnisse um ihren Durchschnitt streuen. Kleine Schwankungen bremsen kaum. Große bremsen stark, weil die Strafe mit dem Quadrat der Schwankung wächst.

Wenden Sie das auf unsere Strategie an. Ihr durchschnittlicher Gewinn pro Trade beträgt 0,2R, wer also nur auf Durchschnitte schaut, für den würde mehr Risiko immer mehr Ertrag bedeuten. Der Zinseszins sieht das anders:

<div class="table-wrap">

| Risiko pro Trade | Durchschnittlicher Gewinn pro Trade | Gewinn pro Trade mit Zinseszins |
|---|---|---|
| 1 % | 0,20 % | 0,19 % |
| 2 % | 0,40 % | 0,36 % |
| 5 % | 1,00 % | 0,74 % |
| 10 % | 2,00 % | 0,98 % |
| 15 % | 3,00 % | 0,75 % |
| 20 % | 4,00 % | 0,07 % |
| 25 % | 5,00 % | −1,04 % |

</div>

Bei 25 % Risiko pro Trade verliert eine Strategie mit positivem Erwartungswert über die Zeit Geld. Der Durchschnitt sagt weiterhin +5 % pro Trade, aber was Sie tatsächlich behalten, schrumpft mit jedem Trade. Das Wachstum erreicht bei dieser Strategie bei 10 % Risiko seinen Höhepunkt. Dieser Punkt ist als Kelly-Anteil bekannt, nach [einem Aufsatz von J. L. Kelly Jr. aus dem Jahr 1956](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf), der zeigt, dass ein Spieler, der jedes Mal den wachstumsmaximierenden Anteil setzt, irgendwann vor einem liegt, der einen beliebigen anderen festen Anteil setzt, und vorn bleibt. Volles Kelly setzt voraus, dass Sie Ihre wahre Trefferquote und Ihren Payoff exakt kennen, was in der Praxis nie der Fall ist. Wir würden nicht in seine Nähe gehen: Bei 10 % Risiko kostet eine Serie von zehn Verlusten 65 % des Kontos, und laut Erholungsformel braucht das einen Gewinn von 187 %.

Das ist auch der Grund, warum die Werte für den Weg zurück bei 5 % steigen. Der Drag frisst an der Erholungsgeschwindigkeit, während die Verluste genauso tief bleiben.

## Legen Sie Ihren maximalen Drawdown fest, bevor Sie ihn brauchen

Alle Zahlen oben zeigen in dieselbe Richtung: Entscheiden Sie in Ruhe, wie tief Sie zu gehen bereit sind, und rechnen Sie dann rückwärts zu einer Risikostufe. Drei Schritte:

1. **Wählen Sie den Drawdown, bei dem Sie noch weitertraden würden.** Seien Sie ehrlich. Würde ein Rückgang von 20 % Sie dazu bringen, die Strategie aufzugeben, ist das Ihre Zahl, egal was in einem Buch steht.
2. **Wählen Sie die Serie, mit der Sie planen.** Laut Serientabelle hat eine Serie von 12 Verlusten bei unserer Strategie über 500 Trades eine Wahrscheinlichkeit von etwa einem Drittel. Das ist ein vernünftiger Planungsfall.
3. **Lösen Sie nach dem Risiko pro Trade auf.** (1 − Risiko)^Serie muss über 1 − Drawdown bleiben. Für ein Limit von 20 % und eine Serie von 12 Verlusten gilt Risiko ≤ 1 − 0,80^(1/12) = **1,84 %**. Planen Sie mit 14 Verlusten, sind es 1,58 %.

Lassen Sie dann einen Puffer. Ein echter Drawdown ist meist tiefer als seine längste Serie, weil Verluste gehäuft kommen, mit ein paar kleinen Gewinnen dazwischen, und das Konto rutscht durch all das weiter ab. Den berechneten Wert zu halbieren, hier also auf etwas unter 1 %, ist ein vertretbarer Ausgangspunkt.

Schreiben Sie zum Schluss auf, was an jeder Schwelle passiert: zum Beispiel das Risiko bei −10 % halbieren und bei −15 % mit dem Trading pausieren, um alles zu überprüfen. Kleinere Positionen verlangsamen den Weg zurück, denn bei 1 % statt 2 % braucht ein Drawdown von 10 % etwa 56 Trades statt 30. Aber sie verkleinern den Schaden durch die nächste Serie, und die sehen Sie nicht kommen. Die wichtigste Regel ist die, vor der [der Leitfaden zu häufigen Day-Trading-Fehlern](/de/blog/haeufige-day-trading-fehler/) von der anderen Seite warnt: Erhöhen Sie nie die Größe, um einen Drawdown zurückzuholen. Halten Sie diese Zahlen in [Ihrem Trading-Plan](/de/blog/trading-plan-erstellen/) fest, damit sie feststehen, bevor die Verluste beginnen.

## Was Stockades Karte Maximaler Drawdown misst

Auf Stockades [Analyse-Seite](/de/analytics/) geht die Karte Maximaler Drawdown Ihre geschlossenen Trades in der Reihenfolge durch, in der sie geschlossen wurden, beginnend mit dem Startguthaben von 100.000 $ als erstem Hoch. Sie zeichnet den größten Rückgang unter das laufende Hoch auf, in Prozent dieses Hochs.

Weil sie nur geschlossene Trades verwendet, tauchen die Schwankungen einer offenen Position nie auf. Zieht ein offener Trade Ihr Eigenkapital um 8 % nach unten und erholt sich, bevor Sie ihn schließen, erscheint dieser Einbruch nie, und ein Verlust, den Sie noch halten, zählt erst, wenn Sie ihn schließen. Betrachten Sie die Karte als Untergrenze dafür, wie tief es tatsächlich ging. [Der Leitfaden zu Performance-Kennzahlen](/de/blog/trading-performance-analysieren/) behandelt den Rest der Seite.

## Üben Sie das im Simulator

Schreiben Sie vor Ihrer nächsten Session im [Simulator](/de/simulator/) drei Zahlen auf: Ihr Risiko pro Trade, die Serie, mit der Sie planen, und den Drawdown, bei dem Sie die Größe reduzieren. Bemessen Sie jeden Trade nach dem aktuellen Kontostand, nicht nach dem Startguthaben. Vergleichen Sie nach 50 Trades die Karte Maximaler Drawdown auf der [Analyse-Seite](/de/analytics/) mit dem, was Ihr Plan erlaubt hat, und zählen Sie Ihre längste Verlustserie im Journal-Tab von Hand. Stockades Kurse werden in Ihrem Browser generiert und sein Geld ist virtuell, ein Drawdown ist dort also eine Zahl auf einem Bildschirm. Die Arithmetik des Wegs zurück ist dieselbe, und die Gewohnheit, Ihre Limits im Voraus festzulegen, ist der Teil, den es sich lohnt, ins echte Trading mitzunehmen.
