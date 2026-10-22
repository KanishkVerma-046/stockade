---
title: "ATR-Stops: Stop-Loss nach Volatilität setzen"
description: "Ein Stop von 1 $ heißt bei einer ruhigen Aktie etwas anderes als bei einer wilden. Wie die ATR die normale Spanne misst und ein ATR-Stop Ihr Dollar-Risiko hält."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indikatoren", "Risikomanagement"]
slug: "atr-stop-loss-setzen"
translationOf: "atr-volatility-stops"
---

Nehmen Sie zwei hypothetische Aktien, die beide bei 50 $ notieren. Die erste legt an einem Tag meist etwa 0,50 $ vom Hoch zum Tief zurück. Die zweite meist etwa 2,50 $. Setzen Sie unter jede einen Stop von 1 $, und Sie haben zwei sehr unterschiedliche Entscheidungen getroffen. Bei der ersten liegt der Stop zwei volle Tagesspannen entfernt. Bei der zweiten ist es weniger als eine halbe normale Tagesspanne.

Ein Stop mit festem Dollarbetrag oder festem Prozentsatz behandelt diese beiden Aktien gleich. Gleich sind sie aber nicht, und der Stop, der den Unterschied ignoriert, ist der, den das Rauschen trifft. Die Average True Range, kurz ATR, misst, wie weit sich ein Instrument normalerweise bewegt, sodass Sie den Stop stattdessen danach setzen können.

## Was die True Range misst, und warum Kurslücken zählen

[Die ATR wurde von J. Welles Wilder entwickelt, der sie 1978 in seinem Buch *New Concepts in Technical Trading Systems* vorstellte](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). Ihr Ausgangspunkt ist die True Range eines einzelnen Balkens, die größte von drei Strecken:

```
True Range = die größte von:
  Hoch − Tief
  |Hoch − vorheriger Schluss|
  |Tief − vorheriger Schluss|
```

Hoch und Tief sind die Enden der Dochte einer Kerze ([der Leitfaden zu Candlestick-Charts](/de/blog/candlestick-charts-lesen/) erklärt ihren Aufbau). Bei einem normalen Balken gewinnt die erste Strecke. Angenommen, der vorherige Schluss lag bei 50,00 $, das heutige Hoch liegt bei 51,20 $ und das Tief bei 49,60 $. Hoch minus Tief sind 1,60 $. Das Hoch liegt 1,20 $ vom vorherigen Schluss entfernt, das Tief 0,40 $. Die True Range beträgt 1,60 $, genauso viel wie die einfache Spanne.

Die beiden anderen Zeilen sind für Kurslücken da. Angenommen, die Aktie eröffnet stattdessen nach einer Nachricht bei 52,50 $ und handelt dann zwischen 52,10 $ und 53,00 $. Die eigene Spanne des Balkens beträgt nur 0,90 $, aber das Hoch liegt 3,00 $ über dem gestrigen Schluss. Die True Range beträgt 3,00 $. Wer über diese Lücke hinweg gehalten hat, hat eine Bewegung von 3 $ gespürt, und die True Range zählt sie mit. Ein einfaches Maß aus Hoch minus Tief würde den Tag ruhig nennen.

## Wie die ATR die True Range über 14 Balken mittelt

Die ATR ist ein Durchschnitt der True Range, und die übliche Einstellung sind 14 Balken. Wilders Version ist kein einfacher gleitender Durchschnitt. Der erste Wert ist der einfache Durchschnitt der ersten 14 True Ranges, und danach ergibt sich jeder neue Wert so:

```
ATR = (vorherige ATR × 13 + heutige True Range) ÷ 14
```

Das ist die Glättung, die dieselbe StockCharts-Seite angibt. Schicken Sie den Tag mit der Kurslücke hindurch. Lag die ATR bei 1,50 $ und ergibt die Lücke eine True Range von 3,00 $, beträgt die neue ATR (1,50 $ × 13 + 3,00 $) ÷ 14 = 22,50 $ ÷ 14 = 1,61 $. Ein doppelt so großer Tag wie normal bewegt die ATR um etwa 7 %. Das ist Absicht: Die ATR beschreibt den typischen Balken der letzten Wochen, nicht den letzten.

Zwei Dinge sagt Ihnen die ATR nicht. Sie hat keine Richtung: Eine stark fallende und eine stark steigende Aktie können dieselbe ATR haben. Und sie wird in Preiseinheiten gemessen, Sie können sie also nicht zwischen Aktien vergleichen. Eine ATR von 2 $ sind 10 % einer Aktie zu 20 $ und 0,5 % einer zu 400 $. Wollen Sie vergleichen, teilen Sie die ATR durch den Preis.

## Ein ATR-Stop, von Anfang bis Ende durchgerechnet

Hier ist die Methode vom Einstieg bis zur Stückzahl. Angenommen, Sie haben ein hypothetisches Konto von 25.000 $ und riskieren 1 % pro Trade, also 250 $. Sie kaufen eine Aktie zu 80 $, und ihre 14-Tage-ATR beträgt 2,00 $.

1. **Wählen Sie ein Vielfaches.** Wir nehmen 2 × ATR, der Stop liegt also 4,00 $ entfernt.
2. **Setzen Sie den Stop.** 80,00 $ − 4,00 $ = 76,00 $.
3. **Bemessen Sie die Position.** 250 $ ÷ 4,00 $ = 62,5, abgerundet auf 62 Aktien.
4. **Prüfen Sie die Zahlen.** 62 Aktien × 80 $ = 4.960 $ in Aktien. Wird der Stop bei 76 $ ausgeführt, verlieren Sie 62 × 4,00 $ = 248 $.

Das Vielfache ist eine Wahl, keine Konstante. Eine ATR entspricht ungefähr der Spanne eines typischen Balkens, ein Stop eine ATR entfernt kann also von einem gewöhnlichen Balken erreicht werden. Größere Vielfache geben dem Trade mehr Raum und kaufen weniger Aktien. Zum Vergleich: Ein Stop von 2 % läge bei dieser Aktie 1,60 $ entfernt, nur 0,8 ATR, also innerhalb der Bewegung eines normalen Tages. Das ist das Problem vom Anfang, in Zahlen.

Ein richtiges Vielfaches gibt es nicht, und niemand kann Ihnen das beste nennen, ohne es an Ihren eigenen Setups zu testen. Wichtiger ist, eines zu wählen und es konsequent zu verwenden, damit Ihre Ergebnisse etwas bedeuten, wenn Sie sie auswerten.

## Dasselbe Dollar-Risiko bei ruhigen und volatilen Aktien

Der eigentliche Sinn eines ATR-Stops liegt darin, was er mit der Positionsgröße macht. Behalten Sie das Risiko von 250 $ und die Regel 2 × ATR bei, und wenden Sie beides auf drei hypothetische Aktien zu 80 $ mit unterschiedlicher ATR an:

<div class="table-wrap">

| Aktie | ATR | Stop-Abstand (2 × ATR) | Stückzahl | Positionsgröße | Verlust am Stop |
|---|---|---|---|---|---|
| Ruhig | 1,00 $ | 2,00 $ | 125 | 10.000 $ | 250 $ |
| Typisch | 2,00 $ | 4,00 $ | 62 | 4.960 $ | 248 $ |
| Volatil | 4,00 $ | 8,00 $ | 31 | 2.480 $ | 248 $ |

</div>

Die volatile Aktie bekommt einen viermal so weiten Stop und eine Position von einem Viertel der Größe. Der Verlust, falls Sie falschliegen, bleibt etwa gleich. Das ist die ganze Idee: Volatilität ändert, wie viele Aktien Sie halten, nicht, wie viel Sie verlieren. [Der Leitfaden zur Positionsgröße](/de/blog/risikomanagement-positionsgroesse/) erklärt, warum die Größe immer aus dem Stop-Abstand folgen sollte, statt zuerst festzustehen.

Achten Sie aber auf die Zeile „Ruhig". Eine kleine ATR bedeutet eine große Position, und 10.000 $ sind 40 % dieses Kontos. Prüfen Sie, ob die Position in Ihr Barguthaben passt, bevor Sie annehmen, dass Ihnen die Stückzahl aus der Formel offensteht.

Ein festes Dollar-Risiko hält auch Ihre Drawdown-Rechnung intakt. Wie sehr Verlustserien schmerzen, hängt davon ab, wie viel Sie pro Trade riskieren, nicht davon, wie weit Ihre Stops sind. Deshalb misst [der Leitfaden zur Drawdown-Erholung](/de/blog/drawdown-erholung-berechnen/) alles im Risiko pro Trade.

## ATR mit Struktur kombinieren, statt sie zu ersetzen

Ein ATR-Stop hat eine Schwäche: Er kennt Ihre Trade-Idee nicht. Zwei ATR unter Ihrem Einstieg können mitten in einer Unterstützungszone landen, wo die Idee noch lebt, oder weit hinter dem Punkt, an dem sie widerlegt war. [Einen Stop nach der Struktur zu platzieren](/de/blog/stop-loss-orders-erklaert/), jenseits des Niveaus, das den Trade ungültig macht, beantwortet, *wo* der Stop hingehört. Die ATR beantwortet besser, *wie viel Raum* Sie jenseits dieses Niveaus lassen.

Unser Ansatz kombiniert deshalb beides. Suchen Sie das strukturelle Niveau, und geben Sie dann einen Bruchteil der ATR als Puffer dazu. Angenommen, das Swing-Tief unter Ihrem Einstieg bei 80 $ liegt bei 77,40 $ und die ATR beträgt 2,00 $. Geben Sie eine halbe ATR dazu, 1,00 $, und der Stop kommt auf 76,40 $. Ist das Finden solcher Niveaus neu für Sie, behandelt [der Leitfaden zu Unterstützung und Widerstand](/de/blog/unterstuetzung-und-widerstand/) Swing-Tiefs und warum ein Niveau eine Zone ist und keine Linie.

Jetzt zur Größe. Das Risiko pro Aktie beträgt 80,00 $ − 76,40 $ = 3,60 $, also 250 $ ÷ 3,60 $ = 69,4, abgerundet auf 69 Aktien, bei einem Verlust von 248,40 $ am Stop. Liegt der nächste Widerstand bei 87,20 $, beträgt das Gewinnpotenzial 7,20 $, genau 2R. Das ist ein 1:2-Trade mit einer Gewinnschwellen-Trefferquote von 33,3 %, und [der Leitfaden zum Chance-Risiko-Verhältnis](/de/blog/chance-risiko-verhaeltnis-erwartungswert/) erklärt, wie Sie entscheiden, ob Ihr Setup diese Latte überspringen kann.

## Einen Stop mit der ATR nachziehen: der Chandelier Exit

Die ATR funktioniert auch für Trailing-Stops. Eine bekannte Variante ist der Chandelier Exit, [von Charles Le Beau entwickelt, der standardmäßig das Dreifache der 22-Perioden-ATR unter dem höchsten Hoch der letzten 22 Perioden liegt](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit):

```
Chandelier Exit (Long) = 22-Perioden-Hoch − ATR(22) × 3
```

Liegt das 22-Perioden-Hoch bei 90 $ und die ATR bei 2,00 $, liegt der Ausstieg bei 90 $ − 6,00 $ = 84,00 $. Macht der Preis neue Hochs, folgt die Linie ihnen nach oben.

Die Formel hat einen Haken. Steigt die ATR, während das Hoch gleich bleibt, fällt die Linie: Beim selben Hoch von 90 $ setzt eine ATR von 2,50 $ sie auf 82,50 $. Als Stop verwendet heißt das, ihn mitten im Trade zu lockern. Das würden wir nicht tun. Ein Stop sollte sich nur zugunsten des Trades bewegen, die Regel, für die der Leitfaden zu Stop-Loss-Orders eintritt. Ziehen Sie also mit dieser Formel nach, lassen Sie den Stop stehen, wann immer die Formel unter ihn fällt.

## Was die ATR falsch macht

Die ATR ist eine Beschreibung der Vergangenheit und hat deren Schwächen.

- **Sie hinkt hinterher.** Sie mittelt 14 Balken, ist also nach einer ruhigen Phase kurz vor einem Schock klein und holt danach nur langsam auf. Die Lücke von 3 $ oben hat sie nur auf 1,61 $ angehoben.
- **Sie kann keine Kurslücke aufhalten.** Ein ATR-Stop ist immer noch eine Stop-Order. Eröffnet der Preis jenseits davon, wird er zur Eröffnung ausgeführt, egal wie sorgfältig Sie die Spanne gemessen haben.
- **Sie hängt von der Balkengröße ab.** Eine 14-Perioden-ATR auf Fünf-Minuten-Balken ist ein Bruchteil der täglichen ATR derselben Aktie. Messen Sie sie auf der Zeiteinheit, auf der Sie traden. Bemisst ein Day-Trader seinen Stop nach der Tages-ATR, wird er viel zu weit, und bemisst ein Swing-Trader ihn nach der Fünf-Minuten-ATR, wird er viel zu eng.
- **Sie sagt nichts über Richtung oder Edge.** Ein gut platzierter Stop begrenzt, was ein schlechter Trade kostet. Er macht den Trade nicht gut.

## Üben Sie das im Simulator

Stockade hat keinen ATR-Indikator. Seine Charts zeigen EMA 9, 20 und 50, VWAP, RSI und MACD. Außerdem läuft jedes Symbol mit derselben Volatilitätseinstellung, skaliert auf seinen Preis, es gibt also keine Volatilitätszyklen wie im echten Markt, an die Sie sich anpassen müssten. Die Kerzenspannen schwanken trotzdem: Die durchschnittliche Spanne über ein paar Kerzen driftet zufällig auf und ab, und in den gelegentlichen Phasen, in denen die verborgene Trendneigung stark ist, fallen die Kerzen breiter aus. Und weil jede Kerze bei Stockade genau dort eröffnet, wo die vorherige geschlossen hat, entspricht die True Range dort immer Hoch minus Tief.

Die Arithmetik können Sie trotzdem üben. Fahren Sie im [Chart-Simulator](/de/chart-simulator/) mit dem Mauszeiger über jede der letzten 14 Kerzen und notieren Sie die Werte H und L in der Anzeigeleiste am unteren Rand. Mitteln Sie die 14 Spannen für eine einfache ATR. Öffnen Sie dann den [Simulator](/de/simulator/) im Wiedergabemodus, wo der Chart keine solche Anzeige hat, und schätzen Sie die typische Spanne der letzten 14 Kerzen nach Augenmaß an der Preisskala. Setzen Sie Ihren Stop zwei dieser Spannen unter Ihren Einstieg, prüfen Sie, wo er im Verhältnis zum nächsten Swing-Tief landet, rechnen Sie vor dem Einstieg die Stückzahl für ein festes Dollar-Risiko aus, und tippen Sie den Stop-Preis in das Feld Stop Loss. Stockades Kurse werden in Ihrem Browser generiert, nichts davon sagt also etwas über die Volatilität einer echten Aktie aus. Die Gewohnheit, die es aufbaut, ist die, auf die es ankommt: erst die Spanne messen, dann den Stop setzen, dann die Größe bemessen.
