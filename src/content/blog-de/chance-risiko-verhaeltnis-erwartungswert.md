---
title: "Chance-Risiko-Verhältnis und Erwartungswert verstehen"
description: "Ein Chance-Risiko-Verhältnis nennt nur die Trefferquote für die Gewinnschwelle. Die Tabelle, wie Stop und Ziel sie verschieben, warum 1:3 eine Faustregel ist."
date: 2026-10-26
author: "Stockade Team"
tags: ["Risikomanagement", "Strategie"]
slug: "chance-risiko-verhaeltnis-erwartungswert"
translationOf: "risk-reward-ratio-expectancy"
---

Eine der ersten Regeln, auf die neue Trader stoßen, lautet: „Gehen Sie nur Trades mit einem Chance-Risiko-Verhältnis von mindestens 1:3 ein." Also kaufen Sie eine hypothetische Aktie zu 40 $, setzen den Stop bei 39 $ und das Ziel bei 43 $, und es fühlt sich nach dem Verantwortungsvollen an. Sie riskieren 1 $, um 3 $ zu verdienen. Schwer, dagegen etwas einzuwenden.

Das Problem ist, dass Ihnen das Verhältnis nicht gesagt hat, ob der Trade etwas taugt. Für sich allein kann es das auch nicht. Ein Chance-Risiko-Verhältnis ist die Hälfte einer Rechnung, und die andere Hälfte ist der Teil, den viele überspringen: wie oft das Ziel tatsächlich vor dem Stop erreicht wird.

## Was ein Chance-Risiko-Verhältnis misst und was es auslässt

Das Verhältnis vergleicht zwei Abstände. Das Risiko ist Einstieg minus Stop: 40 $ − 39 $ = 1 $ pro Aktie. Das Gewinnpotenzial ist Ziel minus Einstieg: 43 $ − 40 $ = 3 $ pro Aktie. Teilen Sie das Gewinnpotenzial durch das Risiko, erhalten Sie 3, was man je nach Gewohnheit als 1:3 oder 3:1 schreibt. Wir schreiben es hier als 1:3, Risiko zuerst, und messen das Gewinnpotenzial in Einheiten des Risikos: Das Gewinnpotenzial dieses Trades beträgt 3R, wobei 1R der Betrag ist, den Sie verlieren können. Sind R-Vielfache neu für Sie, erklärt sie [der Leitfaden zur Positionsgröße](/de/blog/risikomanagement-positionsgroesse/).

Was das Verhältnis auslässt, ist die Wahrscheinlichkeit. Ein 1:3-Trade, der sein Ziel einmal in zehn Fällen erreicht, ist ein schlechter Trade. Ein 1:1-Trade, der sein Ziel sechsmal in zehn Fällen erreicht, ist ein guter. Welche Art Sie gerade halten, können Sie am Verhältnis nicht ablesen, denn das Verhältnis ist eine Aussage über Preise, die Sie gewählt haben, nicht darüber, was der Markt wahrscheinlich tun wird.

## Die Gewinnschwellen-Trefferquote für jedes Chance-Risiko-Verhältnis

Eines sagt Ihnen ein Verhältnis aber doch, und das ist nützlich. Über viele Trades verdienen Sie bei jedem Gewinn 3R und verlieren bei jedem Verlust 1R. Die Gewinnschwelle erreichen Sie, wenn sich beides aufhebt. Ist Ihre Trefferquote *w*, heißt das w × 3 = (1 − w) × 1, aufgelöst w = 1 ÷ 4, also 25 %. Die allgemeine Form, für ein Gewinnpotenzial von R Risikoeinheiten:

```
Gewinnschwellen-Trefferquote = 1 ÷ (1 + R)
```

Das ist dieselbe Formel, die [der Leitfaden zu Performance-Kennzahlen](/de/blog/trading-performance-analysieren/) für die Payoff-Ratio verwendet, nur vor dem Trade angewandt statt danach. Hier ist sie für gängige Verhältnisse:

<div class="table-wrap">

| Chance-Risiko | Gewinn pro riskiertem 1 $ | Gewinnschwellen-Trefferquote |
|---|---|---|
| 1:0,5 | 0,50 $ | 66,7 % |
| 1:1 | 1,00 $ | 50,0 % |
| 1:1,5 | 1,50 $ | 40,0 % |
| 1:2 | 2,00 $ | 33,3 % |
| 1:3 | 3,00 $ | 25,0 % |
| 1:4 | 4,00 $ | 20,0 % |
| 1:5 | 5,00 $ | 16,7 % |

</div>

Lesen Sie die Tabelle wie ein Preisschild. 1:3 zu wählen bringt Ihnen kein Geld. Es legt die Latte auf 25 %: Gewinnen Sie öfter, verdient die Strategie im Schnitt Geld, gewinnen Sie seltener, verliert sie. Ob Sie die Latte überspringen, hängt vom Setup ab, nicht vom Verhältnis.

Der Abstand zwischen Ihrer tatsächlichen Trefferquote und der Gewinnschwellen-Trefferquote ist Ihr Edge. In R ausgedrückt ist der Erwartungswert Trefferquote × R − Verlustquote × 1. Eine Trefferquote von 30 % bei 1:3-Trades ergibt 0,30 × 3 − 0,70 = +0,20R pro Trade. Dieselben 30 % bei 1:2-Trades ergeben 0,30 × 2 − 0,70 = −0,10R. Gleiche Trefferquote, entgegengesetztes Ergebnis.

## Ein verschobenes Ziel ändert die Wahrscheinlichkeit, nicht nur den Gewinn

Hier führt die 1:3-Gewohnheit in die Irre. Wenn Sie ein Ziel weiter weg schieben, erhöhen Sie nicht nur das Gewinnpotenzial. Sie senken auch die Wahrscheinlichkeit, es zu erreichen. Diese beiden Effekte ziehen in entgegengesetzte Richtungen, und man achtet leicht nur auf den ersten.

Nehmen Sie den Extremfall. Angenommen, ein Preis hätte keinerlei Neigung in eine Richtung, sodass jede kleine Bewegung genauso wahrscheinlich nach oben wie nach unten ginge, wie bei einer fairen Münze. Das ist das klassische Ruinproblem der Wahrscheinlichkeitsrechnung (Gambler's Ruin), und für einen solchen Zufallslauf gilt: [Die Wahrscheinlichkeit, um einen Betrag zu steigen, bevor man um einen anderen fällt, ist der Fall geteilt durch die Summe beider](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). Auf das Trading übertragen:

```
P(Ziel vor Stop) = Stop-Abstand ÷ (Stop-Abstand + Ziel-Abstand)
```

Mit einem Stop von 1 $ und einem Ziel von 3 $ sind das 1 ÷ 4 = 25 %. Genau die Gewinnschwellen-Trefferquote aus der Tabelle. Probieren Sie jedes andere Paar, und es passiert dasselbe: Bei einem richtungslosen Preis landet jedes Verhältnis exakt auf seiner eigenen Gewinnschwelle. Ein 1:5-Ziel wird in 16,7 % der Fälle erreicht, ein 1:1-Ziel in 50 %, und keines davon verdient oder verliert im Schnitt Geld.

Wir halten das für die nützlichste einzelne Tatsache über das Chance-Risiko-Verhältnis. Das Verhältnis kann für sich allein keinen Edge erzeugen. Echte Preise sind keine fairen Münzen, und genau daher kann ein Edge kommen: Ein Setup ist nur dann einen Trade wert, wenn es das Ziel *wahrscheinlicher* macht als diese Basis. Das Verhältnis legt die Latte. Ihr Grund für den Trade ist das, was sie überspringen muss.

## Warum „nie unter 1:3" eine Faustregel ist

Regeln wie „mindestens 1:3" gibt es aus einem vernünftigen Grund. Sie zwingen Sie, vor dem Einstieg ein Ziel zu benennen, und sie halten Sie davon ab, einen Dollar zu riskieren, um zehn Cent zu verdienen. Als Filter ist das in Ordnung.

Als Gesetz taugt die Regel nichts. Vergleichen Sie vier hypothetische Setups:

<div class="table-wrap">

| Setup | Chance-Risiko | Trefferquote | Gewinnschwelle | Erwartungswert pro Trade |
|---|---|---|---|---|
| A | 1:1 | 60 % | 50,0 % | 0,60 × 1 − 0,40 = **+0,20R** |
| B | 1:2 | 40 % | 33,3 % | 0,40 × 2 − 0,60 = **+0,20R** |
| C | 1:3 | 30 % | 25,0 % | 0,30 × 3 − 0,70 = **+0,20R** |
| D | 1:3 | 22 % | 25,0 % | 0,22 × 3 − 0,78 = **−0,12R** |

</div>

A, B und C verdienen pro Trade dasselbe. A fällt durch die 1:3-Regel und ist trotzdem in Ordnung. D besteht sie und verliert Geld. Die Regel kann die beiden nicht auseinanderhalten, weil sie nur auf eine der zwei Zahlen schaut.

Es gibt auch leisere Kosten. Liegt das natürliche Ziel eines Setups zwei Dollar entfernt und Sie bestehen auf drei, haben Sie das Ziel über den Punkt hinausgeschoben, den der Preis nach Ihrer Idee wahrscheinlich erreicht. Das Verhältnis verbessert sich auf dem Papier, während die Trefferquote sinkt, oft stärker, als die Tabelle auffangen kann. Ergibt das ehrliche Ziel kein Verhältnis, mit dem Sie leben können, ist es meist besser, den Trade auszulassen oder auf einen Einstieg näher am Stop zu warten, statt das Ziel zu strecken.

## Auch ein verschobener Stop ändert das Verhältnis

Derselbe Zielkonflikt wirkt auch in die andere Richtung. Behalten Sie das Ziel bei 43 $ und ziehen Sie den Stop von 39 $ auf 39,50 $ nach. Das Risiko sinkt auf 0,50 $, das Gewinnpotenzial bleibt bei 3 $, und das Verhältnis springt von 1:3 auf 1:6. Die Gewinnschwelle fällt von 25 % auf 1 ÷ 7, also 14,3 %.

Das sieht nach einem kostenlosen Upgrade aus. Ist es nicht. Ein Stop, der nur halb so weit entfernt ist, wird öfter von gewöhnlichem Rauschen getroffen, und bei dem richtungslosen Preis aus dem vorigen Abschnitt fällt die Wahrscheinlichkeit, zuerst 43 $ zu erreichen, auf 0,50 ÷ 3,50 = 14,3 %. Wieder genau auf der Gewinnschwelle. Ein engerer Stop hilft nur, wenn der neue Stop immer noch dort sitzt, wo Ihre Trade-Idee widerlegt ist, und genau darum geht es beim [Platzieren von Stops anhand der Struktur](/de/blog/stop-loss-orders-erklaert/).

Er ändert auch Ihre Positionsgröße. Riskieren Sie fest 200 $ pro Trade, bedeutet ein Stop von 1 $ 200 Aktien, eine Position von 8.000 $. Ein Stop von 0,50 $ bedeutet 400 Aktien und 16.000 $. Das Dollar-Risiko ist in beiden Fällen gleich, aber der engere Stop braucht doppelt so viel Kapital, prüfen Sie also, ob das passt, bevor Sie annehmen, dass Ihnen das bessere Verhältnis offensteht.

## Das geplante Verhältnis ist nicht das, das Sie bekommen

Das Verhältnis, das Sie vor dem Einstieg aufschreiben, ist ein Plan. Das in Ihren Ergebnissen ist das, was passiert ist, und es ist meist schlechter. Vier Dinge zehren daran:

- **Frühe Ausstiege.** Wer aus Nervosität bei 41,80 $ Gewinne mitnimmt, macht aus einem 3R-Gewinner einen 1,8R-Gewinner.
- **Verschobene Stops.** Einen Stop mitten im Trade zu weiten macht aus einem 1R-Verlust einen größeren.
- **Ausführungspreise.** Ein Stop kann in einem schnellen Markt jenseits seines Niveaus ausgeführt werden, sodass aus geplanten −1R dann −1,1R werden.
- **Kosten.** Kommission und Spread gehen von jedem Gewinner ab und kommen zu jedem Verlierer hinzu.

Kosten treffen enge Stops am härtesten. Angenommen, die Kosten für Kauf und Verkauf zusammen betragen bei unserer Aktie zu 40 $ hypothetische 0,05 $ pro Aktie. Mit dem Stop von 1 $ bringt ein Gewinner netto 2,95 $ und ein Verlierer kostet 1,05 $, sodass die Gewinnschwelle bei 1,05 ÷ (1,05 + 2,95) = 26,25 % statt 25 % liegt. Mit dem Stop von 0,50 $ kostet ein Verlierer 0,55 $, und die Gewinnschwelle wird zu 0,55 ÷ 3,50 = 15,7 % statt 14,3 %. Dieselben fünf Cent, aber sie sind ein größerer Anteil an einem kleinen Risiko.

Die Lösung ist, Ihr realisiertes Verhältnis zu messen, statt Ihrem geplanten zu vertrauen. Durchschnittsgewinn geteilt durch Durchschnittsverlust (ohne Vorzeichen) ist Ihre tatsächliche Payoff-Ratio. Haben Sie 1:3 bei 200 $ Risiko geplant, liegt Ihr durchschnittlicher Gewinner aber bei 420 $ und Ihr durchschnittlicher Verlierer bei 210 $, traden Sie in Wahrheit 1:2. Ihre Gewinnschwelle liegt bei 33,3 %, nicht bei 25 %, und eine Trefferquote von 28 %, die gesund aussah, verliert Geld.

## So wählen Sie ein Ziel mit Blick auf die Trefferquote

Zusammengefasst würden wir in dieser Reihenfolge vorgehen:

1. **Setzen Sie zuerst den Stop,** und zwar auf den Preis, der die Idee widerlegt.
2. **Setzen Sie das Ziel dorthin, wo der Preis realistisch hinkommen kann,** etwa an das nächste [Unterstützungs- oder Widerstandsniveau](/de/blog/unterstuetzung-und-widerstand/), nicht auf ein Vielfaches, das Sie vorab festgelegt haben.
3. **Berechnen Sie das Verhältnis und seine Gewinnschwelle** anhand der Tabelle.
4. **Vergleichen Sie diese Gewinnschwelle mit Ihrer protokollierten Trefferquote** für diese Art von Setup, und verlangen Sie einen klaren Abstand darüber. Haben Sie erst ein paar Dutzend Trades, ist diese Trefferquote noch eine grobe Schätzung; [der Abschnitt zur Stichprobengröße](/de/blog/trading-performance-analysieren/) erklärt, wie grob.
5. **Reicht es nicht, lassen Sie den Trade aus.** Kein Strecken des Ziels.

Hat ein Trade die Prüfung bestanden, hält eine [Bracket-Order](/de/blog/oco-und-bracket-orders/) beide Ausstiege für Sie, sodass der Plan nicht von Ihrer Willenskraft im Moment abhängt. Und schreiben Sie Ihren Mindestabstand über der Gewinnschwelle in [Ihren Trading-Plan](/de/blog/trading-plan-erstellen/), damit Sie ihn einmal festlegen statt bei jedem Trade neu.

## Üben Sie das im Simulator

Im [Simulator](/de/simulator/) von Stockade nehmen die Felder Stop Loss und Take Profit Preise entgegen, und zusammen wirken sie als OCO-Bracket auf Ihre offene Position: Löst eines aus, schließt die gesamte Position zum Preis dieses Ticks, und beide Niveaus werden geleert. Es gibt keinen Spread und keine Kommission, die Lücke zwischen geplantem und realisiertem Verhältnis entsteht dort also durch Ihre eigenen Ausstiege und durch Ticks, die über ein Niveau hinausspringen. Schreiben Sie vor jedem Trade das Verhältnis und seine Gewinnschwelle auf. Öffnen Sie nach 30 Trades die [Analyse-Seite](/de/analytics/), teilen Sie Durchschnittsgewinn durch Durchschnittsverlust ohne Minuszeichen und vergleichen Sie das Ergebnis mit Ihrem Plan, und Ihre Trefferquote mit der Gewinnschwelle, die Sie gebraucht hätten. Stockades Kurse werden in Ihrem Browser generiert, als Zufallslauf mit einer langsam driftenden Trendneigung, sodass eine Trefferquote dort nichts darüber aussagt, wie sich ein Setup in einem echten Markt schlägt. Was der Simulator aber trainiert, ist die Gewohnheit: Stop, Ziel, Verhältnis, Gewinnschwelle, jedes Mal.
