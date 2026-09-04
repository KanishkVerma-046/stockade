---
title: "VWAP-Handelsstrategie: Was er ist und wie Trader ihn nutzen"
description: "VWAP ist kumulierter typischer Preis mal Volumen, geteilt durch kumuliertes Volumen. Die Arithmetik, warum Institutionen ihn verfolgen, und wo er versagt."
date: 2026-05-04
tags: ["Indikatoren", "Strategie"]
slug: "vwap-handelsstrategie"
translationOf: "vwap-trading-strategy"
---

Sie haben 500 Aktien bei 50,60 $ gekauft, und die Position bewegte sich nirgendwohin. Später fragen Sie sich, ob 50,60 $ überhaupt ein vernünftiger Preis war. Das Problem ist, dass „vernünftig" einen Referenzpunkt braucht, und die naheliegenden Kandidaten sind schlechte. Der Schlusskurs ist, wo die letzten paar Aktien den Besitzer wechselten, nicht wo die meisten es taten. Der Mittelpunkt der Tagesspanne ignoriert, ob der Tag sechs Stunden am Hoch verbrachte oder sechs Minuten.

VWAP beantwortet die Frage richtig: Er gibt Ihnen den durchschnittlichen gezahlten Preis der durchschnittlichen bis jetzt heute gehandelten Aktie. Sitzt VWAP bei 50,38 $ und Sie zahlten 50,60 $, haben Sie mehr gezahlt als das, was die typische Aktie des Tages kostete. Das ist eine Messung, kein Signal, und der Nutzen von VWAP entsteht daraus, ihn als Messung ernst zu nehmen, statt seine Kreuzungen zu handeln.

## Was VWAP berechnet, und warum das kein gleitender Durchschnitt ist

VWAP steht für Volume Weighted Average Price. Die Berechnung ist eine laufende Summe geteilt durch eine laufende Summe:

**VWAP = (kumulierter typischer Preis × Volumen) ÷ (kumuliertes Volumen)**

Der typische Preis ist `(Höchst + Tiefst + Schluss) ÷ 3` — eine Zahl, die dafür steht, wo ein Balken handelte, statt nur wo er endete. Multiplizieren Sie das mit dem Volumen des Balkens, um den gehandelten Dollarwert in diesem Balken zu erhalten, und führen Sie dann eine laufende Summe sowohl des Zählers als auch des Nenners ab der Sessioneröffnung.

Das unterscheidet sich von einem einfachen oder exponentiellen gleitenden Durchschnitt auf zwei unabhängige Arten, und beide zählen.

**Gewichtung.** Ein 20-Perioden-SMA gibt jedem seiner 20 Schlusskurse genau 1/20 des Gewichts, egal ob dieser Balken 3.000 Aktien oder 3 Millionen handelte. VWAP gewichtet jeden Balken nach den tatsächlich darin gehandelten Aktien. Ein Balken mit hohem Volumen bewegt VWAP stark; ein toter Balken kaum. Wollen Sie das vollständige Bild dessen, was Volumen sagt und nicht sagt, hat [Handelsvolumen seinen eigenen Artikel](/blog/understanding-trading-volume).

**Fenster.** Ein SMA ist ein rollierendes Fenster, das den ältesten Balken fallen lässt, sobald ein neuer ankommt. VWAP lässt nichts fallen — jeder Balken seit der Sessioneröffnung bleibt dauerhaft in beiden Summen. Diese kumulative Natur treibt das meiste Verhalten von VWAP, einschließlich seiner schlimmsten Schwäche, unten behandelt. Der [Vergleich EMA versus SMA](/blog/moving-averages-ema-vs-sma) handelt davon, wie man *jüngere* Balken gewichtet; VWAP tritt in diesem Wettbewerb überhaupt nicht an.

Schlicht gesagt: Ein gleitender Durchschnitt ist ein Glättungsfilter, angewandt auf den Preis. VWAP ist eine buchhalterische Tatsache über ausgeführte Transaktionen.

### Drei Balken Arithmetik durchrechnen

Nehmen Sie eine Aktie mit diesen drei Ein-Minuten-Balken.

<div class="table-wrap">

| Balken | Höchst | Tiefst | Schluss | Typischer Preis | Volumen | TP × Volumen |
|---|---|---|---|---|---|---|
| 1 | 50,40 | 49,80 | 50,10 | 50,10 | 120.000 | 6.012.000 |
| 2 | 50,70 | 50,05 | 50,60 | 50,45 | 300.000 | 15.135.000 |
| 3 | 50,90 | 50,35 | 50,40 | 50,55 | 80.000 | 4.044.000 |

</div>

Der typische Preis von Balken 1 ist (50,40 + 49,80 + 50,10) ÷ 3 = 150,30 ÷ 3 = **50,10**. Der von Balken 2 ist (50,70 + 50,05 + 50,60) ÷ 3 = 151,35 ÷ 3 = **50,45**. Der von Balken 3 ist (50,90 + 50,35 + 50,40) ÷ 3 = 151,65 ÷ 3 = **50,55**.

Jetzt kumulieren. Nach Balken 1 ist VWAP 6.012.000 ÷ 120.000 = **50,10** — mit einem Balken entspricht VWAP dem typischen Preis dieses Balkens.

Nach Balken 2 ist der Zähler 6.012.000 + 15.135.000 = 21.147.000 und der Nenner 120.000 + 300.000 = 420.000. VWAP = 21.147.000 ÷ 420.000 = **50,35**.

Nach Balken 3 ist der Zähler 21.147.000 + 4.044.000 = 25.191.000 und der Nenner 500.000. VWAP = 25.191.000 ÷ 500.000 = **50,382**, also 50,38 $.

Vergleichen Sie das mit einem ungewichteten Durchschnitt der drei typischen Preise: (50,10 + 50,45 + 50,55) ÷ 3 = 151,10 ÷ 3 = 50,367. VWAP kam höher heraus, weil Balken 2 über dem ungewichteten Mittel lag und 300.000 der 500.000 Aktien trug — 60 % von allem Gehandelten.

### Dieselben Preise mit vertauschtem Volumen

Behalten Sie alle neun Preiswerte identisch und tauschen Sie die Volumina von Balken 2 und 3, sodass Balken 2 80.000 handelt und Balken 3 300.000. Der Zähler wird 6.012.000 + (50,45 × 80.000 = 4.036.000) + (50,55 × 300.000 = 15.165.000) = 25.213.000. Das Gesamtvolumen bleibt 500.000. VWAP = 25.213.000 ÷ 500.000 = **50,426**.

Identische Kursbewegung, identisches Gesamtvolumen, und VWAP bewegte sich um 4,4 Cent. Dieser Unterschied ist der ganze Sinn des Indikators. VWAP verfolgt nicht, wohin sich der Preis bewegte; er verfolgt, wohin sich die Aktien bewegten.

## Warum VWAP bei der Sessioneröffnung zurückgesetzt wird

VWAP ist über eine Session definiert, und bei der nächsten Eröffnung gehen die laufenden Summen zurück auf null. Das folgt daraus, wofür VWAP da ist. „Der durchschnittlich gezahlte Preis pro Aktie heute" ist eine kohärente Statistik. „Der durchschnittlich gezahlte Preis pro Aktie seit einem unbestimmten Punkt in der Vergangenheit" ist es nicht, weil er dorthin driftet, wo zufällig die volumenstärkste Periode lag, wie lange auch immer her.

Zwei Konsequenzen folgen. Erstens sind die Balken direkt nach der Eröffnung instabil: Mit fünf Minuten im Nenner schwankt VWAP bei fast jedem Balken, und er wird erst zu einer stabilen Referenz, sobald ein bedeutender Anteil des Tagesvolumens dahintersteht.

Zweitens überträgt sich VWAP nicht über Tage hinweg. Gesterns VWAP ist kein Niveau auf dem heutigen Chart. Trader, die eine längere Referenz wollen, nutzen *verankertes* VWAP, das die Akkumulation ab einem gewählten Ereignis zurücksetzt — eine Gewinnveröffentlichung, ein Swing-Tief, ein Breakout-Balken — statt ab der Uhr. Dieselbe Formel, bewusst gewählter Startpunkt.

## Warum Institutionen VWAP als Ausführungs-Benchmark nutzen

Das ist der Grund, warum VWAP überhaupt zählt, und er hat nichts mit Chartmustern zu tun.

Ein Fonds, der 4 Millionen Aktien kaufen muss, kann keine einzige Order senden. Er zerlegt die Position über die Session. Danach muss jemand beurteilen, ob der Trader die Aufgabe gut erledigt hat, und der Standardmaßstab ist VWAP: Hat der durchschnittliche Ausführungspreis den volumengewichteten Tagesdurchschnitt geschlagen? 4 Millionen Aktien im Schnitt bei 50,31 $ gegen einen Session-VWAP von 50,38 $ zu kaufen spart sieben Cent pro Aktie — 280.000 $. Viele Desks werden genau gegen diesen Benchmark vergütet, und algorithmische Ausführungsstrategien sind explizit darauf gebaut, ihn zu verfolgen.

Das erzeugt echtes Verhalten um die Linie herum: Käufer, die große Orders abarbeiten, werden unter VWAP williger und darüber zögerlicher, weil ihre Bewertungskarte das so vorgibt. Das ist gemeint, wenn Leute sagen, VWAP sei „wo Institutionen den Preis verteidigen." Es ist ein echter Effekt in liquiden Märkten — aber ein *verhaltensbedingter*, erzeugt dadurch, wie Trader gemessen werden, kein Naturgesetz, und er fehlt größtenteils bei dünn gehandelten Titeln.

## VWAP als Intraday-Unterstützung und -Widerstand lesen

Wegen dieses Benchmark-Drucks fungiert VWAP oft als dynamisches Niveau: Der Preis zieht darauf zurück, Käufer, die hinter ihrem Tagesziel liegen, steigen ein, und der Preis setzt sich fort. Anders als ein horizontales Niveau, gezeichnet an einem vorherigen Hoch, bewegt sich VWAP durch die Session, sodass das Niveau, das Sie um 10:15 beobachten, nicht das Niveau um 14:30 ist.

Zwei Lesarten koexistieren, und sie zu verwechseln ist die häufigste Art, wie Trader den Indikator missbrauchen.

**Mean Reversion** gilt in einer ausgeglichenen, rangebegrenzten Session. Der Preis dehnt sich von VWAP weg, die Dehnung hat kein Volumen dahinter, und er schnellt zurück. Trader faden Ausdehnungen und zielen auf VWAP selbst.

**Trendfortsetzung** gilt in einer gerichteten Session. Der Preis bewegt sich von VWAP weg und kehrt nie für mehr als eine Berührung zurück, sodass das Faden von Ausdehnungen bedeutet, den ganzen Tag gegen den Trend zu kämpfen. Diese Lesart behandelt einen Rücksetzer *auf* VWAP, der hält, als Einstieg in Richtung der bestehenden Bewegung, und einen entschiedenen Schluss durch VWAP als Trendversagen.

Die ehrliche Version ist, dass Sie nicht wissen können, in welcher der beiden Sie sich befinden, bis die Session teilweise abgelaufen ist. Was Sie prüfen können, ist, ob der Preis VWAP heute wiederholt gekreuzt hat oder auf einer Seite geblieben ist. Wiederholte Kreuzungen bedeuten, die Mean-Reversion-Lesart hat funktioniert; einseitige Sessions bedeuten, sie hat es nicht.

Manche Plattformen fügen Standardabweichungs-Bänder hinzu — VWAP plus und minus eine, zwei oder drei Standardabweichungen des Preises von VWAP. Sie geben der „gedehnten" Idee eine Zahl statt eines Augenmaßes, und eine Berührung des zweiten Bands ist der übliche Fade-Auslöser. Sie sind eine echte Verfeinerung und erben jede Einschränkung unten. Stockade zeichnet nur die VWAP-Linie, ohne Bänder.

## Wo VWAP versagt

**Er wird die ganze Session über langsamer.** Bis 15:30 hält der Nenner sechs Stunden Volumen. Ein einzelner neuer Balken bewegt den Durchschnitt kaum, egal wie heftig er ist. VWAP ist am reaktionsfreudigsten, wenn er am wenigsten verlässlich ist, und am verlässlichsten, wenn er am wenigsten reaktionsfreudig ist, und nichts behebt das — es ist Arithmetik.

**Er ist jenseits des Intraday-Zeitrahmens bedeutungslos.** Ein kumulativer Session-Durchschnitt hat auf einem Tages- oder Wochenchart keine Interpretation. Es gibt keine Session, auf die zurückgesetzt werden könnte. Halten Sie Positionen über Tage hinweg, ist VWAP nicht Ihr Werkzeug; siehe [Day Trading versus Swing Trading](/blog/day-trading-vs-swing-trading) dafür, was sich mit der Haltedauer ändert.

**Er ist nur so gut wie die Volumendaten dahinter.** VWAP ist eine volumengewichtete Statistik, sodass schlechte Volumendaten eine selbstsicher falsche Linie erzeugen. Retail-Feeds, die außerbörsliche Prints verpassen, oder Instrumente, bei denen gemeldetes Volumen unzuverlässig ist, geben Ihnen einen VWAP, gegen den keine Institution tatsächlich benchmarkt.

Und wie jeder Indikator ist VWAP rückwärtsgewandt. Er fasst bereits geschehene Transaktionen zusammen. Er kann Ihnen nicht sagen, dass die Session kurz vor der Umkehr steht.

## Üben Sie das Lesen von VWAP im Simulator

Stockades Charts tragen einen VWAP-Umschalter sowohl auf `/simulator` als auch im Chart-Simulator, berechnet mit derselben Formel wie oben — typischer Preis mal Volumen, akkumuliert und geteilt. Der Anker unterscheidet sich jedoch, und der Unterschied ist es wert, gekannt zu werden: Die Linie des Simulators setzt sich nie bei einer Sessioneröffnung zurück. Sie akkumuliert über ein rollierendes Fenster der jüngsten Kerzen, sodass Sie ein ankerloses laufendes VWAP lesen statt des Session-VWAP, das der Rücksetzungsabschnitt oben beschreibt. Dieselbe Arithmetik, kein Anker. Schalten Sie es ein und üben Sie die mechanische Fähigkeit: Liegt der Preis darüber oder darunter, wie weit hat er sich gedehnt, kreuzt diese Session die Linie oder reitet sie auf einer Seite. Seien Sie sich jedoch klar darüber, was Sie üben. Stockades Kurse werden clientseitig durch Zufallsläufe generiert, und sein Volumen ist eine pro Kerze gezogene Zufallszahl, unkorreliert mit der Kursbewegung. Es steht keine echte Beteiligung dahinter, sodass Volumen dort nichts bestätigt und der institutionelle Benchmark-Effekt nicht existiert. Das höhlt die Linie selbst aus, was es wert ist, explizit zu sagen: Der VWAP-Code des Simulators gewichtet jeden Balken mit diesem Zufallsvolumen, und zufällige Gewichte sind effektiv gleichmäßige Gewichte, sodass sich die gezeichnete Linie eher wie ein ungewichteter Durchschnitt des typischen Preises verhält als wie ein echtes volumengewichtetes. Die Gewichtungsunterscheidung, die zu Beginn dieses Artikels beschrieben wurde, ist echt, aber es ist nicht das, was Sie hier sehen — von den zwei Dingen, die VWAP von einem gleitenden Durchschnitt trennen, ist auf Stockade nur das kumulative Fenster beobachtbar. Es ist echte Arithmetik auf erfundenen Eingaben — gut zum Trainieren Ihres Auges, nutzlos als Signal.

Eine Vorsicht überlebt den Simulator: Ausführungen tragen dort fast keine Reibung — kein Bid-Ask-Spread, keine Teilausführungen, und nur ein paar Cent Slippage, wenn ein Stop oder Ziel auslöst —, und es steht kein echtes Geld auf dem Spiel. Zu warten, bis der Preis zu VWAP zurückkehrt, statt hinterherzujagen, ist der schwere Teil, und genau das testet Paper Trading nicht. [Öffnen Sie Stockades Börsensimulator](/de/simulator/), schalten Sie VWAP ein, und üben Sie, vor jedem Balkenschluss laut zu benennen, ob die Session zur Linie zurückkehrt oder davon wegtrendet.
