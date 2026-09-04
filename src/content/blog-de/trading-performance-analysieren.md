---
title: "So analysieren Sie Ihre Trading-Performance: Die Kennzahlen, die zählen"
description: "Die Trefferquote allein kann Sie stark täuschen. Erwartungswert, Profitfaktor, Payoff-Ratio, Drawdown und Stichprobengröße mit Stockades Analyse-Seite."
date: 2026-08-03
tags: ["Analysen", "Risikomanagement"]
slug: "trading-performance-analysieren"
translationOf: "analyze-trading-performance-metrics"
---

Sie beenden eine Woche Übungstrading, öffnen die Analyse-Seite und sehen eine Trefferquote von 68 %. Das fühlt sich gut an. Dann schauen Sie auf den Gesamt-P&L, und er ist negativ. Nichts ist kaputt — Sie haben nur entdeckt, dass die Zahl, die die meisten Trader zuerst nennen, die ist, die am wenigsten aussagt.

Stockades [Analyse-Seite](/de/analytics/) berechnet sechs Kennzahlen aus Ihren geschlossenen Trades: Gesamt-P&L, Eigenkapital, Trefferquote, Profitfaktor, Durchschnittsgewinn und maximaler Drawdown. Darunter liegen drei Tabs — eine Equity-Kurve, ein Trade-Journal und eine Trefferquote-nach-Stunde-Heatmap. Hier ist, was jede bedeutet und welche Sie belügen können.

## Warum eine Trefferquote von 70 % Geld verlieren kann, während 35 % welches machen

Die Trefferquote ist der Anteil Ihrer geschlossenen Trades, der mit positivem P&L endete. Bei Stockade ist es Gewinn-Trades geteilt durch alle Trades, und ein Trade, der exakt ausgeglichen schließt, zählt auf der Verlustseite — Scratch-Trades ziehen die Zahl also leicht nach unten.

Das Problem ist, dass sie nichts über die *Größe* der Gewinne und Verluste aussagt. Betrachten Sie zwei Trader, je mit 100 geschlossenen Trades.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Trefferquote | 70 % | 35 % |
| Durchschnittsgewinn | 50 $ | 300 $ |
| Durchschnittsverlust | 150 $ | 80 $ |
| Payoff-Ratio (Ø-Gewinn ÷ Ø-Verlust) | 0,33 | 3,75 |
| Nötige Gewinnschwellen-Trefferquote | 75 % | 21 % |
| **Erwartungswert pro Trade** | **−10 $** | **+53 $** |

</div>

Trader A gewinnt fast drei von vier Malen und blutet Geld aus. Trader B liegt zwei von drei Trades falsch und vermehrt sein Geld. Über diese 100 Trades ist A um etwa 1.000 $ im Minus und B um etwa 5.300 $ im Plus. Beurteilt allein nach der Trefferquoten-Karte, würden Sie den falschen kopieren.

## Erwartungswert: die Zahl, die beantwortet, ob Ihr System Geld verdient

Der Erwartungswert ist das durchschnittliche Dollar-Ergebnis, das Sie von einem einzelnen Trade über viele Trades hinweg erwarten sollten. Die Formel:

```
Erwartungswert = (Trefferquote × Durchschnittsgewinn) − (Verlustquote × Durchschnittsverlust)
```

Der Durchschnittsverlust geht als positive Zahl ein. Rechnen Sie es für beide Trader durch.

**Trader A:** 0,70 × 50 $ = 35 $ erwarteter Gewinn. 0,30 × 150 $ = 45 $ erwarteter Verlust.
35 $ − 45 $ = **−10 $ pro Trade.** Jeder Trade, den A eingeht, hat einen negativen Erwartungswert. Mehr Traden macht es schneller schlimmer.

**Trader B:** 0,35 × 300 $ = 105 $. 0,65 × 80 $ = 52 $. 105 $ − 52 $ = **+53 $ pro Trade.**

Stockade zeigt den Erwartungswert nicht an, aber Sie können ihn in Sekunden aus Trefferquote, Durchschnittsgewinn und dem aus dem Journal abgeleiteten Durchschnittsverlust berechnen. Tun Sie das, bevor Sie irgendetwas anderes schließen. Eine Strategie mit negativem Erwartungswert lässt sich nicht durch häufigeres oder größeres Traden reparieren — Größe ändert nur, wie schnell sich die Arithmetik durchspielt.

Die verwandte Kennzahl ist die **Gewinnschwellen-Trefferquote**, `1 ÷ (1 + Payoff-Ratio)`. Trader Bs Payoff-Ratio ist 300 ÷ 80 = 3,75, also erreicht B die Gewinnschwelle bei 1 ÷ 4,75 = 21 % und gewinnt bei 35 %. Trader As Payoff-Ratio ist 50 ÷ 150 = 0,33, also braucht A 75 % und erreicht nur 70 %. Diese Fünf-Punkte-Lücke ist der gesamte Unterschied zwischen den beiden Konten.

### R-Vielfache: die Einheit, die verschiedene Trades vergleichbar macht

Ein Gewinn von 60 $ bei einem Trade, bei dem Sie 600 $ riskiert haben, ist ein sehr anderes Ereignis als ein Gewinn von 60 $, bei dem Sie 40 $ riskiert haben, aber die P&L-Spalte des Journals zeigt beide als `+60,00 $`. Definieren Sie 1R als den Dollarbetrag, den Sie beim Einstieg riskiert haben — Einstiegspreis minus Stop-Preis, mal Stückzahl — und drücken Sie dann jedes Ergebnis als Vielfaches davon aus. Riskieren Sie 200 $, verdienen Sie 500 $: +2,5R. Riskieren Sie 200 $, verlieren Sie 180 $: −0,9R.

In R können Sie über Symbole und Positionsgrößen hinweg mitteln, ohne zu verzerren. Trader Bs Erwartungswert ist 0,35 × 3,75R − 0,65 × 1R = 1,3125 − 0,65 = **+0,66R pro Trade** — eine Zahl, die Änderungen der Kontogröße übersteht, was sie zum saubersten Weg macht, diesen Monat mit dem letzten zu vergleichen. Sie setzt voraus, dass Sie konsistent dimensionieren, was das Argument für eine [feste prozentuale Positionsgrößenregel](/blog/risk-management-position-sizing) ist.

## Profitfaktor, Durchschnittsgewinn und Durchschnittsverlust

Der Profitfaktor ist der Bruttogewinn geteilt durch den Bruttoverlust über alle geschlossenen Trades. Haben Ihre Gewinner zusammen 10.500 $ erwirtschaftet und Ihre Verlierer 6.200 $ gekostet, ist der Profitfaktor 10.500 ÷ 6.200 = **1,69** — für jeden verlorenen Dollar wurden 1,69 $ gewonnen. Alles über 1,0 ist netto profitabel, und Stockades Karte zeigt es mit zwei Dezimalstellen und einem `x`-Suffix.

Grobe Einordnung: Unter 1,0 ist Verlust, 1,0 bis 1,3 ist marginal und könnte leicht Rauschen sein, 1,3 bis 2,0 ist ein respektabler Edge bei einer ordentlichen Stichprobe, und deutlich über 2,5 bei kleiner Stichprobe bedeutet meist Glück. Zeigt die Karte `∞`, haben Sie noch keinen Verlust-Trade verbucht — eine Aussage über die Stichprobengröße, nicht über Können.

Eine Eigenart: Die KPI-Zeile zeigt **Ø-Gewinn**, aber nicht den Durchschnittsverlust. Den Durchschnittsverlust bekommen Sie aus dem Journal, indem Sie die negativen P&L-Einträge summieren und durch die Anzahl der Verlust-Trades teilen, die Ihnen der Übersichts-Tab direkt liefert. Sie brauchen ihn sowohl für den Erwartungswert als auch die Payoff-Ratio, überspringen Sie ihn also nicht.

## Maximaler Drawdown: die Kennzahl, die entscheidet, ob Sie bei einer Strategie bleiben können

Der maximale Drawdown ist der größte Rückgang von einem Hoch zu einem Tief, den Ihr Eigenkapital erlitten hat, in Prozent. Stockade berechnet ihn, indem es Ihre geschlossenen Trades der Reihe nach durchgeht, den laufenden Höchststand verfolgt und den schlimmsten prozentualen Fall darunter aufzeichnet.

Angenommen, Sie bauen 100.000 $ auf einen Höchststand von 112.000 $ auf, dann zieht Sie eine Verlustserie auf 94.080 $. Das sind 17.920 $ unter einem Höchststand von 112.000 $, also beträgt der maximale Drawdown 16,0 %. Beachten Sie, was die Erholung kostet: Von 94.080 $ zurück auf 112.000 $ zu klettern erfordert einen **Gewinn von 19,05 %**, nicht 16 %. Drawdowns sind asymmetrisch, und tiefe sind brutal — 50 % im Minus braucht 100 % im Plus.

Das ist die Kennzahl, die entscheidet, ob eine Strategie *für Sie* nutzbar ist. Ein System mit starkem Erwartungswert und 40 % Drawdown ist eines, das die meisten Menschen am Tiefpunkt aufgeben und dabei einen Papier-Drawdown in einen echten Verlust verwandeln. Ein Vorbehalt: Stockade berechnet ihn nur aus geschlossenen Trades, sodass eine offene Position, die tief im Minus liegt, erst erscheint, wenn Sie sie schließen.

## Was die Form Ihrer Equity-Kurve Ihnen sagt

Der Equity-Kurve-Tab zeichnet Ihr laufendes Guthaben nach jedem geschlossenen Trade auf, beginnend bei 100.000 $, mit Minimum und Maximum darunter beschriftet. Die meisten lesen nur den letzten Punkt. Die Form trägt mehr.

Eine Kurve, die sich mit flachen, kurzen Rücksetzern stetig nach oben arbeitet, ist konsistenter Erwartungswert und kontrollierte Verlustgröße. Eine, die lange flach bleibt und dann vertikal springt, bedeutet, dass eine Handvoll Trades fast den gesamten Gewinn erzeugt hat — entfernen Sie sie, und es bleibt nichts. Eine Treppe, die klettert und dann wiederholt einen großen Block zurückgibt, ist die Signatur davon, Gewinner früh zu beenden und Verlierer laufen zu lassen. Und eine nahezu senkrechte Linie ohne Rücksetzer bei wenigen Trades ist keine Entdeckung; es ist eine kleine Stichprobe.

Der Chart skaliert auch automatisch auf Ihr eigenes Minimum und Maximum, sodass ein Schwung von 300 $ und einer von 30.000 $ gleichermaßen dramatische Linien erzeugen. Prüfen Sie die Beschriftungen, bevor Sie auf die Steigung reagieren.

## Stichprobengröße: warum weniger als 100 Trades fast nichts beweisen

Hier geht die meiste Selbstanalyse schief. Angenommen, Sie haben 40 geschlossene Trades und eine Trefferquote von 50 %. Der Standardfehler dieser Schätzung ist:

```
SE = sqrt(0,5 × 0,5 / 40) = sqrt(0,00625) = 0,079 → 7,9 Prozentpunkte
```

Ein grobes 95-%-Intervall umfasst etwa zwei Standardfehler in beide Richtungen, sodass Ihre wahre langfristige Trefferquote plausibel irgendwo zwischen etwa **34 % und 66 %** liegen könnte. Diese Spanne enthält sowohl ein sehr gutes als auch ein sehr schlechtes System. Vierzig Trades haben Ihnen fast nichts gesagt.

Der Standardfehler schrumpft mit der Quadratwurzel der Anzahl, dieses Band zu halbieren braucht also die vierfache Trade-Anzahl — bei 160 Trades sinkt der SE auf etwa 4,0 Punkte. Deshalb sind etwa 100 geschlossene Trades die übliche Untergrenze, bevor Schlüsse gezogen werden, und deshalb ist der häufigste analytische Fehler das Overfitting: das Umschreiben Ihrer Regeln nach acht schlechten Trades, wenn acht Trades reines Rauschen sind. Entscheiden Sie im Voraus, wie viele Trades eine Regeländerung bekommt, bevor Sie sie beurteilen, und schreiben Sie das in [Ihren Trading-Plan](/blog/how-to-build-a-trading-plan).

## Ihre besten Stunden mit der Tageszeit-Heatmap finden

Der Zeit-Heatmap-Tab legt Wochentage gegen Stunden von 9:00 bis 20:00 an und färbt jede Zelle nach Trefferquote in diesem Slot: Grün bei 65 % und darüber, Rot unter 50 %, neutral dazwischen, und ein Strich, wo Sie keine Trades haben. Bewegen Sie den Mauszeiger über eine Zelle für ihre Trade-Anzahl.

Das beantwortet eine wirklich nützliche Frage: Finanzieren Ihre Nachmittags-Trades still Ihre Vormittags-Trades? Zwei Vorbehalte. Zellen färben sich nur nach Trefferquote, sodass eine grüne Zelle trotzdem eine Geld verlierende Stunde sein kann, wenn diese Gewinne winzig sind — gleichen Sie das P&L des Journals für diesen Slot gegen. Und Stichproben pro Zelle sind winzig: Vier Trades mit drei Gewinnern zeigen 75 % und bedeuten nichts. Warten Sie auf 20 oder 30 Trades in einem Slot, bevor Sie es ein Muster nennen. Die Stunden sind die lokale Zeit Ihres Browsers, keine Börsensession.

## Was das Trade-Journal aufzeichnet und was Sie selbst aufzeichnen müssen

Das Journal zeigt acht Spalten pro geschlossenem Trade: Symbol, Richtung, Einstieg, Ausstieg, Menge, P&L, Dauer und Datum, neueste zuerst. Das ist eine vollständige Aufzeichnung dessen, *was* Sie getan haben.

Es hat kein Feld für Notizen oder Überlegungen. Nichts erfasst, warum Sie eingestiegen sind, welches Setup Sie zu sehen glaubten, oder ob Sie Ihren eigenen Regeln gefolgt sind — und die wertvollste Auswertungsfrage lautet nicht „welche Trades haben Geld verloren", sondern „welche Trades haben meine Regeln verletzt", denn ein regelbrechender Trade, der zufällig gewonnen hat, ist gefährlicher als ein disziplinierter Verlust. Führen Sie ein separates Dokument, das das Setup, den geplanten Stop und das Ziel protokolliert, und eine Zeile dazu, ob Sie den Plan ausgeführt haben, und verbinden Sie es dann mit dem Journal über Symbol und Zeitstempel. Diese Gewohnheit trennt bewusstes Üben von [reinem Buttons-Klicken](/blog/paper-trading-guide), und sie deckt die [wiederholbaren Fehler](/blog/common-day-trading-mistakes) auf, die kein Dashboard erkennen kann.

Zwei Einschränkungen. Die Daten leben im lokalen Speicher Ihres Browsers, sodass das Löschen der Website-Daten Ihren Verlauf löscht. Wichtiger noch: Diese Kennzahlen messen Ihre Entscheidungsfindung, nicht Ihr Temperament. Stockades Kurse sind synthetisch, es gibt keinen Bid-Ask-Spread, und es steht kein echtes Geld auf dem Spiel. Ein Drawdown von 16 % auf einer simulierten Kurve ist eine Zahl; derselbe Drawdown mit Ihrem eigenen Kapital ist eine körperliche Erfahrung, und Disziplin, die hier sauber hält, bricht dort routinemäßig zusammen.

## Üben Sie das im Simulator

Nehmen Sie 20 Trades, öffnen Sie dann die Analyse-Seite und berechnen Sie Ihren Erwartungswert von Hand aus den Karten für Trefferquote und Durchschnittsgewinn plus dem aus dem Journal abgeleiteten Durchschnittsverlust — schreiben Sie die Antwort auf, bevor Sie auf den Gesamt-P&L schauen. Machen Sie dann bis 100 Trades weiter und berechnen Sie es erneut, und beachten Sie, wie weit sich die Zahl bewegt hat. Diese Bewegung ist der oben genannte Standardfehler, konkret gemacht. [Öffnen Sie den Simulator](/de/simulator/) und beginnen Sie, auswertbare Trades zu protokollieren.
