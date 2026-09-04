---
title: "Risikomanagement 101: Positionsgrößenbestimmung und die 1-%-Regel"
description: "Die Positionsgröße ist ein Ergebnis Ihres Stop-Abstands, keine gewählte Zahl. Die Formel, die 1-%-Regel, Drawdown-Erholung und R-Vielfache."
date: 2026-06-29
tags: ["Risikomanagement"]
slug: "risikomanagement-positionsgroesse"
translationOf: "risk-management-position-sizing"
---

Fragen Sie einen Anfänger, wie viele Aktien er gekauft hat, bekommen Sie eine runde Zahl. Zweihundert. Fünfhundert. Tausend, wenn sich das Konto an dem Morgen üppig anfühlte. Fragen Sie warum, lautet die Antwort meist „fühlte sich richtig an" oder „das ist etwa ein Drittel meiner Kaufkraft." Der Stop kommt danach hinzu, wo auch immer der Chart es nahelegt, und der Verlust ist, was er eben wird. Manchmal 180 $. Manchmal 2.400 $.

Diese Reihenfolge ist verkehrt, und sie umzukehren ist die wertvollste Änderung, die die meisten neuen Trader vornehmen können. Positionsgröße ist keine Entscheidung. Sie ist die Antwort auf eine Divisionsaufgabe, deren Eingaben Ihr Risikobudget und Ihr Stop-Abstand sind. Entscheiden Sie diese zwei, und die Stückzahl steht bereits fest — Sie berechnen sie nur noch.

## Die meisten Anfänger wählen zuerst eine Stückzahl, und das ist verkehrt

So läuft es ab, wenn die Größe zuerst kommt. Sie kaufen 500 Aktien bei 187,40. Der Chart sagt, der Trade ist unter 185,90 falsch — 1,50 Risiko pro Aktie — also ist der Verlust bei Stop-Ausführung 500 × 1,50 = **750 $**. Auf einem Konto mit 50.000 $ sind das 1,5 % bei einem gewöhnlichen Trade. Nehmen Sie dasselbe Setup mit einer breiteren, ehrlicheren Invalidierung bei 183,90, immer noch 500 Aktien, wird der Verlust zu 500 × 3,50 = **1.750 $**, oder 3,5 %. Derselbe Trader, dieselbe Überzeugung, dieselbe Stückzahl, und der Schaden hat sich mehr als verdoppelt, nur weil eine Linie im Chart zufällig dort lag.

Ist die Größe fix und der Stop-Abstand variabel, schwankt Ihr Dollar-Risiko zufällig. Ist das Dollar-Risiko fix und der Stop-Abstand variabel, passt sich Ihre Stückzahl an, und jeder Verlust fällt gleich groß aus. Die zweite Anordnung ist der ganze Sinn von Risikomanagement. [Stop-Loss-Orders](/blog/stop-loss-orders-explained) behandelt, wie man den Invalidierungspreis findet; dieser Artikel handelt davon, was mit der Zahl zu tun ist, sobald Sie sie haben.

## Die Formel zur Positionsgrößenbestimmung, komplett durchgerechnet

Die Formel ist eine Zeile:

**Aktien = (Konto × Risiko %) ÷ (Einstieg − Stop)**

Rechnen Sie sie mit echten Zahlen durch. Konto: 50.000 $. Risiko pro Trade: 1 %.

- **Risikobudget:** 50.000 × 0,01 = **500 $**
- **Einstieg:** 187,40
- **Stop:** 185,90
- **Risiko pro Aktie:** 187,40 − 185,90 = **1,50**
- **Aktien:** 500 ÷ 1,50 = 333,33, abgerundet auf **333 Aktien**
- **Tatsächliches Risiko bei Stop:** 333 × 1,50 = **499,50 $**
- **Nominaler Positionswert:** 333 × 187,40 = **62.404,20 $**

Runden Sie immer *ab*. 333,33 auf 334 aufzurunden setzt Ihr Risiko auf 501 $ — trivial darüber, aber zu Ihren eigenen Gunsten zu runden ist keine Gewohnheit, die Sie sich antrainieren wollen.

Beachten Sie die letzte Zeile. Eine Position von 62.404 $ auf einem Konto mit 50.000 $ übersteigt das vorhandene Bargeld. In einem Barkonto könnten Sie diesen Trade nicht in voller Größe eingehen; in einem Margin-Konto könnten Sie es, und der Hebel bleibt unsichtbar, weil die Risikozahl weiterhin 500 $ anzeigt. Fügen Sie also eine zweite Einschränkung hinzu: eine maximale nominale Exposition. Deckeln Sie sie auf 100 % des Eigenkapitals, und die Position wird zu 266 Aktien mit 399 $ Risiko. Die Größenformel gibt Ihnen eine Verlustobergrenze, keine Erlaubnis, eine beliebige Menge an Aktien zu halten.

<div class="table-wrap">

| Stop-Preis | Risiko/Aktie | Aktien für 500 $ | Tatsächliches Risiko | Nominal |
|---|---|---|---|---|
| 186,90 | 0,50 | 1.000 | 500,00 $ | 187.400 $ |
| 185,90 | 1,50 | 333 | 499,50 $ | 62.404 $ |
| 184,40 | 3,00 | 166 | 498,00 $ | 31.108 $ |
| 183,90 | 3,50 | 142 | 497,00 $ | 26.611 $ |

</div>

Jede Zeile riskiert im Wesentlichen dieselben 500 $. So sieht es aus, wenn Größe ein Ergebnis ist.

## Drawdown-Erholung ist brutal asymmetrisch

Das ist das überzeugendste Argument im gesamten Risikomanagement, und es ist reine Arithmetik.

Verlieren Sie Geld, müssen Sie einen *größeren Prozentsatz* zurückverdienen, als Sie verloren haben, weil Sie ihn auf einer kleineren Basis verdienen. Verlieren Sie 50 % von 50.000 $, haben Sie 25.000 $. Um zurückzukommen, müssen Sie 25.000 $ in 50.000 $ verwandeln — ein Gewinn von 100 %. Nicht 50 %. Der Verlust und die Erholung sind nie dieselbe Zahl.

Die allgemeine Form ist **Erholung = Verlust ÷ (1 − Verlust)**:

<div class="table-wrap">

| Drawdown | Verbleibendes Konto von 50.000 $ | Nötiger Gewinn zur Erholung |
|---|---|---|
| 10 % | 45.000 $ | 11,1 % |
| 20 % | 40.000 $ | 25,0 % |
| 30 % | 35.000 $ | 42,9 % |
| 40 % | 30.000 $ | 66,7 % |
| 50 % | 25.000 $ | 100,0 % |
| 75 % | 12.500 $ | 300,0 % |

</div>

Prüfen Sie eine mittlere Zeile: 30 % Verlust hinterlässt 35.000 $, und 35.000 × 1,429 = 50.015 $. Korrekt.

Lesen Sie die unterste Zeile langsam. Ein Drawdown von 75 % erfordert, das Verbleibende zu vervierfachen, nur um an den Ausgangspunkt zurückzukehren, und Trader in dieser Lage schaffen es fast nie — der einzige Weg, es zu versuchen, besteht darin, noch größere Risiken einzugehen, was genau das Loch verursacht hat. Die Kurve wird jenseits von 30 % bösartig steiler, weshalb das Begrenzen kleiner Verluste mehr zählt als das Einfangen großer Gewinne.

## Eine Fünf-Verluste-Serie ist normal, und das kostet sie

Angenommen, Ihre Strategie gewinnt 40 % der Zeit — eine durchaus praktikable Zahl, wenn Ihre Gewinner größer sind als Ihre Verlierer. Dann verliert jeder Trade mit Wahrscheinlichkeit 0,60, und fünf aufeinanderfolgende Verluste passieren mit Wahrscheinlichkeit 0,60⁵ = 0,0778, etwa **7,8 %**.

Das ist kein Katastrophenszenario. Über 100 Trades gibt es 96 Stellen, an denen eine Fünf-Verluste-Serie beginnen könnte, und die erwartete Anzahl solcher Serien liegt bei etwa **drei**. Eine Serie von fünf ist kein Pech. Es ist Dienstag. Die einzige Frage ist also, was eine gewöhnliche Serie Ihrem Konto antut:

<div class="table-wrap">

| Risiko pro Trade | Nach 5 Verlusten in Folge | Verbleibendes Konto von 50.000 $ |
|---|---|---|
| 1 % | 0,99⁵ = 95,1 % | 47.549 $ |
| 2 % | 0,98⁵ = 90,4 % | 45.196 $ |
| 5 % | 0,95⁵ = 77,4 % | 38.689 $ |
| 10 % | 0,90⁵ = 59,0 % | 29.525 $ |

</div>

Bei 1 % kosten fünf Verluste 4,9 %, und Sie brauchen 5,2 % zur Erholung. Sie merken es kaum. Bei 5 % kostet dieselbe gewöhnliche Serie 22,6 % und braucht einen Gewinn von 29,2 %, um sie rückgängig zu machen. Bei 10 % sind Sie 41 % im Minus und brauchen einen Gewinn von 69,4 % — von einer Strategie, die gerade fünf hintereinander verloren hat, was genau der Moment ist, in dem Sie sie am wenigsten gut ausführen können.

Verlängern Sie die Serie. Acht Verluste in Folge haben eine Wahrscheinlichkeit von 0,60⁸ ≈ **1,7 %** — selten, aber es wird Ihnen passieren. Bei 1 % Risiko verbleiben 0,99⁸ = 92,3 % des Kontos. Bei 10 % Risiko verbleiben 43,0 %, und Sie brauchen einen Gewinn von 132 %. Ruinrisiko ist kein exotisches Konzept; es ist diese Tabelle, weit genug fortgesetzt. Kleines Risiko pro Trade ist es, was eine gewöhnliche Serie überlebbar statt existenzbedrohend macht.

## R-Vielfache machen jeden Trade zur selben Einheit

Ist das Dollar-Risiko einmal konstant, drücken Sie Ergebnisse in **R** aus, wobei 1R Ihr Risikobudget für diesen Trade ist — 500 $ in unserem Beispiel.

Ein Trade, der 1.250 $ gewinnt, ist +2,5R. Einer, der den vollen Stop verliert, ist −1R. Ein früher Ausstieg bei 180 $ ist +0,36R. Jetzt sind ein Aktientrade mit 333 Aktien und ein Trade mit 142 Aktien in etwas doppelt so Teurem direkt vergleichbar, weil beide eine Einheit riskiert haben.

Das macht den Erwartungswert berechenbar. Bei einer Trefferquote von 40 % mit durchschnittlichen Gewinnern von +2R und durchschnittlichen Verlierern von −1R:

**(0,40 × 2R) + (0,60 × −1R) = 0,80R − 0,60R = +0,20R pro Trade**

Zwanzig Cent R pro Trade, oder 100 $ bei einer Einheit von 500 $. Das ist Arithmetik über eine vergangene Stichprobe, keine Prognose — Trefferquoten driften und Edges verfallen, sodass ein positiver historischer Erwartungswert nichts über die nächsten hundert Trades verspricht. Aber es zeigt, warum eine Trefferquote von 40 % in Ordnung ist, während eine Trefferquote von 60 % mit −2R-Verlierern immer noch eine Verluststrategie sein kann. Diese zweite Behauptung hängt vollständig von der Gewinnergröße ab: Bei 60 % Gewinnen und −2R-Verlierern braucht die Gewinnschwelle einen Durchschnittsgewinner von +1,33R, sodass +2R-Gewinner es tatsächlich zu einem starken System mit +0,4R pro Trade machen würden, und alles unter +1,33R lässt es sinken. Die Trefferquote allein reicht nie zur Beurteilung. Stockades [Analyse-Ansicht](/blog/analyze-trading-performance-metrics) verfolgt Trefferquote, Profitfaktor und Durchschnittsgewinn/-verlust, die Rohdaten für diese Berechnung.

## Tägliche und wöchentliche Verlustlimits verhindern, dass sich ein schlechter Tag aufschaukelt

Positionsgrößenbestimmung begrenzt einen einzelnen Trade. Sie tut nichts gegen den siebten Trade eines frustrierenden Vormittags, in dreifacher Größe genommen, um den Tag wieder gutzumachen.

Legen Sie feste Limits in R fest. Eine übliche Struktur ist **−3R täglich, −6R wöchentlich** — bei 1 % Risiko auf 50.000 $ sind das 1.500 $ am Tag und 3.000 $ in der Woche. Erreichen Sie das Tageslimit, sind Sie fertig: Plattform geschlossen, kein „noch ein Setup." Ihr Wert liegt darin, dass sie im Voraus von einer Version von Ihnen festgelegt werden, die gerade nicht verliert. Revenge-Trading ist kein Charakterfehler; es ist, was passiert, wenn ein aus der Fassung gebrachtes Gehirn Positionsgrößen wählen darf. Schreiben Sie die Zahlen in Ihren [Trading-Plan](/blog/how-to-build-a-trading-plan), damit die Entscheidung bereits getroffen ist.

## Korrelierte Positionen machen Ihre echte Exposition größer als die Summe

Drei Positionen, die jeweils genau 1 % riskieren, fühlen sich wie 3 % Risiko an. Meist sind sie es nicht. Sind alle drei Halbleiteraktien, teilen sie einen Treiber: Eine schlechte Sektormeldung löst alle drei Stops gemeinsam aus, und Sie verlieren 3 % in einer einzigen Bewegung. Sie haben nicht drei 1-%-Trades gemacht, sondern einen 3-%-Trade in drei Tickern. Dasselbe gilt für drei Krypto-Token, die denselben Strömen folgen, oder eine Long-Aktie neben einem Long-Index-Future.

Die Lösung ist ein kombiniertes Limit pro Thema — nicht mehr als 2 % des Gesamtrisikos in einem Sektor, Faktor oder einer Richtung, egal wie viele Ticker das umfasst. Fragen Sie sich vor dem Hinzufügen einer Position, welche einzelne Schlagzeile alles, was Sie halten, gleichzeitig ausstoppen würde, und summieren Sie den Schaden.

Stockade kann Ihnen das nicht beibringen, und zwar aus zwei getrennten Gründen. Die Kursreihe jedes Instruments wird von ihrem eigenen unabhängigen Zufallslauf generiert, sodass Korrelation zwischen Symbolen überhaupt nicht modelliert wird. Grundlegender noch hält der Simulator immer nur eine Position gleichzeitig — ein Symbolwechsel verwirft, was Sie offen hatten —, es gibt also kein Buch zum Aufsummieren, selbst wenn die Korrelationen existierten. Exposition auf Portfolio-Ebene können Sie hier überhaupt nicht üben; sie muss als Konzept des echten Marktes verstanden und beim ersten Mal angewendet werden, wenn Sie tatsächlich zwei Dinge gleichzeitig halten.

## Die 1-%-Regel ist eine Konvention, kein Gesetz

An 1 % ist nichts Magisches. Es ist ein üblicher Standard, weil er lange Verlustserien übersteht und trotzdem gute Trades zählen lässt. Die vertretbare Zahl hängt von Ihrer Trefferquote, Ihrem durchschnittlichen R-Vielfachen, wie korreliert Ihre Positionen sind, und wie Sie sich verhalten, wenn Sie im Minus sind, ab. Manche Profis riskieren 0,25 %, weil sie viele Positionen gleichzeitig eingehen; manche Swing-Trader riskieren 2 % auf eine Handvoll Ideen im Monat. Beides ist stimmig. Nicht stimmig sind 8 %, „weil das Setup wirklich gut war" — Überzeugung ist kein Risikoparameter, und der Markt wurde nie über Ihre informiert.

Eine Asymmetrie ist es wert, klar ausgesprochen zu werden: Anfänger riskieren fast durchweg zu viel, nicht zu wenig. Sind Sie unsicher, beginnen Sie bei 1 %. Die Kosten, zu klein zu beginnen, sind ein langsameres Konto; die Kosten, zu groß zu beginnen, sind kein Konto.

## Üben Sie das im Simulator

Nehmen Sie zwanzig Trades auf Stockades virtuellem Handelsguthaben von 100.000 $, bei denen Sie die Stückzahl *vor* dem Öffnen des Tickets berechnen — Einstieg, Stop, Risiko pro Aktie, dann Größe, in dieser Reihenfolge. Bei 1 % sind das 1.000 $ pro Trade, prüfen Sie also anschließend das Trade-Journal, ob sich Ihre tatsächlichen Verluste nahe 1R häufen oder darüber hinausschießen. Denken Sie daran, dass ein simulierter Stop zu dem Tick ausgeführt wird, der Ihr Niveau überschritten hat, nicht am Niveau selbst, und dass virtuelles Geld diese Disziplin weit leichter macht, als es echtes Geld je sein wird. Rechnen Sie die Arithmetik auf [Stockades Börsensimulator](/de/simulator/) durch, bis die Division automatisch wird.
