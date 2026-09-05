---
title: "Market-Order vs. Limit-Order: Wann Sie welche nutzen"
description: "Eine Market-Order garantiert die Ausführung, nicht den Preis. Eine Limit-Order garantiert den Preis, nicht die Ausführung. Alles andere folgt daraus."
date: 2026-05-11
tags: ["Ordertypen", "Grundlagen"]
slug: "market-order-vs-limit-order"
translationOf: "market-orders-vs-limit-orders"
---

Sie haben die Arbeit gemacht. Der ganze Trade war durchgeplant: Einstieg bei 24,80, Stop bei 24,40, Ziel bei 25,60. Vierzig Cent Risiko für achtzig Cent Belohnung — ein 2:1-Trade. Dann haben Sie einen Market-Kauf über 400 Aktien eines dünn gehandelten Titels geklickt, und die Bestätigung kam zurück bei **25,20**.

In dieser Sekunde hat sich am Chart nichts geändert. Ihr Trade hat sich vollständig geändert. Von 25,20 aus ist Ihr Stop 80 Cent entfernt und Ihr Ziel 40 Cent entfernt: Sie riskieren 80, um 40 zu gewinnen, genau das Umgekehrte des geplanten Trades, und die Differenz von 40 Cent kostete 160 $ auf 400 Aktien, bevor die Position eine Sekunde alt war.

Dieser einzige Klick ist der Unterschied zwischen den beiden Ordertypen, die jede Plattform Ihnen vor die Nase setzt.

## Stockade kann das in diesem Artikel beschriebene Problem nicht nachbilden

Das gehört an den Anfang, nicht in eine Fußnote.

Stockades Ausführungen tragen fast keine Reibung. Es gibt keinen Bid-Ask-Spread, keine Teilausführung und kein Orderbuch in Stockades Paper-Trading-Simulator. Eine Market-Order wird exakt zum angezeigten Preis ausgeführt. Eine Limit-Order wird sofort zu dem Preis ausgeführt, den Sie in das Feld eingeben — sie wartet nicht darauf, dass der Markt Ihr Niveau erreicht, sie reiht sich nicht ein, und sie bleibt nie unausgeführt. Die eine Ausnahme ist ein Stop-Loss- oder Take-Profit-Ausstieg: Diese werden alle 800 Millisekunden gegen einen neuen Preis geprüft und zu dem Tick gebucht, der Ihr Niveau überschritten hat, sodass sie leicht darüber hinaus ausgeführt werden statt genau darauf. Alle Preise auf Stockade werden in Ihrem Browser generiert, es gibt also weder einen Handelsplatz noch eine Gegenpartei, mit der verhandelt werden könnte.

Sie können trotzdem die **Mechanik** üben: einen Ordertyp wählen, bevor Sie klicken, einen Limitpreis im Voraus festlegen statt zu improvisieren, einen Stop-Loss und Take-Profit an einen Einstieg anhängen. Diese Gewohnheiten übertragen sich.

Die **Kosten** übertragen sich nicht. Wenn Sie eine Strategie im Paper Trading testen, die 8 Cent pro Aktie einbringt und hier profitabel aussieht, kann dieselbe Strategie ausgeglichen oder negativ sein, sobald ein echter Spread von 4 Cent und gelegentliche Slippage ihren Anteil nehmen. Lesen Sie eine simulierte Ausführung nie als Prognose für eine echte.

## Was jeder Ordertyp Ihrem Broker tatsächlich anweist

Jede Order ist ein Satz Anweisung.

Eine **Market-Order** sagt: *führe das sofort zum aktuell besten verfügbaren Preis aus, was auch immer das sein wird.* Sie haben Menge und Richtung angegeben. Sie haben keinen Preis angegeben und auf jeden Anspruch darauf verzichtet.

Eine **Limit-Order** sagt: *führe das nur zu meinem Preis oder besser aus, und wenn du nicht kannst, führe es nicht aus.* „Oder besser" bedeutet niedriger bei einem Kauf und höher bei einem Verkauf — ein Kauflimit bei 187,30 wird bereitwillig bei 187,25 ausgeführt, niemals bei 187,35. Sie haben den Preis angegeben. Sie haben nicht angegeben, dass überhaupt etwas passieren wird.

<div class="table-wrap">

| | Market-Order | Limit-Order |
|---|---|---|
| Garantiert | Ausführung | Preis |
| Garantiert nicht | Preis | Ausführung |
| Typische Nutzung | Aussteigen, Dringlichkeit | Einsteigen, Geduld |
| Akzeptiertes Risiko | Mehr zahlen als gesehen | Den Trade komplett verpassen |

</div>

## Der Kompromiss, aus dem alles andere folgt

Hier ist der Satz zum Auswendiglernen: **eine Market-Order garantiert die Ausführung, nicht den Preis; eine Limit-Order garantiert den Preis, nicht die Ausführung.**

Jede weitere Überlegung unten ist eine Konsequenz dieser einen Zeile. Market-Order, um einen Verlierer zu verlassen? Ja — Ihnen liegt mehr daran, draußen zu sein, als an den letzten paar Cent, und Ausführung ist, was eine Market-Order garantiert. Limit-Order, um in ein Instrument mit weitem Spread einzusteigen? Ja — dort steht der Preis auf dem Spiel.

Wenn Sie unsicher sind, fragen Sie sich, mit welchem Fehlschlag Sie lieber leben würden: zu einem schlechteren Preis als gewünscht ausgeführt zu werden, oder überhaupt nicht ausgeführt zu werden. Die Antwort nennt Ihren Ordertyp.

## Der Bid-Ask-Spread, und warum eine Market-Order Sie beim Einstieg kostet

Es gibt nie nur einen Preis. Es gibt immer zwei. Das **Bid** ist der höchste Preis, den jemand gerade zu zahlen bereit ist; das **Ask** ist der niedrigste Preis, zu dem jemand gerade verkaufen möchte. Angenommen, das Bid liegt bei 187,38 und das Ask bei 187,42. Der **Spread** ist 187,42 − 187,38 = **0,04**, und der **Mittelpunkt** — die fairste einzelne Zahl, um sie „den Preis" zu nennen — ist 187,40.

Kaufen Sie 500 Aktien zum Market. Ein Kauf nimmt das Ask, also zahlen Sie 187,42 × 500 = **93.710 $**. Zum Mittelpunkt hätten Sie 187,40 × 500 = 93.700 $ gezahlt. Sie liegen in dem Moment, in dem die Ausführung erfolgt, 10 $ zurück, ohne dass sich der Preis bewegt hat.

Das ist erst die halbe Geschichte, denn Sie müssen auch wieder raus. Zum Market verkaufen trifft das Bid bei 187,38, sodass ein Hin- und Rückweg — Ask kaufen, Bid verkaufen, Markt perfekt unverändert — den vollen Spread kostet: 0,04 × 500 = **20 $**.

Zwanzig Dollar auf einer Position von 93.700 $ sind etwa 2 Basispunkte und klingen trivial. Sind sie nicht, sobald Sie multiplizieren. Drei Hin- und Rückwege pro Tag über 250 Handelstage sind 750 Hin- und Rückwege; bei je 20 $ sind das **15.000 $** pro Jahr allein an Spread, vor Kommissionen und vor einem einzigen Verlust-Trade.

Bei illiquiden Instrumenten ist es schlimmer. Zeigt ein dünn gehandelter Titel ein Bid von 42,10 und ein Ask von 42,35, ist der Spread 0,25 — bei einem Mittelpunkt von 42,225 sind das 0,59 %, etwa 28-mal die relativen Kosten oben. Ein Hin- und Rückweg über 200 Aktien kostet dort 0,25 × 200 = 50 $, und die Aktie muss sich um einen Viertelpunkt zu Ihren Gunsten bewegen, bevor Sie wieder auf null sind.

## Slippage, und die Bedingungen, die sie schlimmer machen

Slippage ist die Lücke zwischen dem Preis, den Sie beim Klicken sahen, und dem Preis, den Sie bekamen. Der Spread ist der vorhersehbare Teil; Slippage ist der Rest. Sie wird unter drei Bedingungen schlimmer, die oft gemeinsam auftreten:

- **Schnelle Märkte.** Bei einer Gewinnveröffentlichung oder einer Wirtschaftszahl aktualisieren sich Kurse schneller, als Ihr Klick reist. Das Ask, auf das Sie zielten, existiert möglicherweise nicht mehr, wenn Ihre Order ankommt.
- **Dünne Orderbücher.** Ein Kurs zeigt einen Preis, aber nur für eine bestimmte Menge. Werden nur 200 Aktien bei 42,35 angeboten und Sie kaufen 1.000, werden die anderen 800 gegen das ausgeführt, was darüber liegt — 42,40, 42,55 und so weiter. Ihre durchschnittliche Ausführung ist schlechter als das gesehene Ask.
- **Große Menge.** Ihre eigene Order ist es, die den Preis bewegt. Derselbe Mechanismus wie bei einem dünnen Buch, nur aus der anderen Richtung.

Das einleitende Beispiel war alle drei zugleich: ein dünnes Buch, eine Menge, die es aufbrauchte, und ein sich bewegender Kurs. Eine Limit-Order hätte diese Ausführung verweigert.

## Marktfähige Limit-Orders: der praktische Mittelweg

Sie müssen nicht zwischen „jeder Preis" und „mein Preis oder nichts" wählen. Eine Limit-Order, die dort platziert wird, wo der Markt sie bereits erreichen kann, heißt **marktfähige Limit-Order**, und das ist es, was erfahrene Trader meistens nutzen.

Bei einem Bid von 187,38 und einem Ask von 187,42 platzieren Sie ein Kauflimit bei **187,45**. Weil es über dem aktuellen Ask liegt, wird es sofort wie eine Market-Order ausgeführt — aber es verweigert eine Ausführung über 187,45. Ist das Buch dünn und läuft der Preis, ist Ihr schlimmster Fall gedeckelt statt unbegrenzt. Gegen den Mittelpunkt von 187,40 kostet dieser schlimmste Fall 0,05 × 500 = **25 $**, gegenüber 10 $ am Ask, gegenüber den 200 $, die ein Rutsch von 40 Cent gekostet hätte.

Sie tauschen ein wenig Ausführungssicherheit gegen eine harte Obergrenze für das Desaster. Das ist meist der richtige Tausch.

## Wann eine Market-Order wirklich die richtige Wahl ist

Es gibt eine Situation, in der eine Market-Order nicht nur akzeptabel, sondern korrekt ist: **eine Position verlassen, die gegen Sie läuft.**

Wird Ihr Stop-Niveau durchbrochen und Sie müssen glattstellen, ist Ausführungssicherheit der ganze Punkt. Ein Limit-Ausstieg zu Ihrem Wunschpreis kann unausgeführt sitzen bleiben, während sich der Verlust vergrößert, und ein kleiner Verlust, der nicht ausgeführt wird, wird zu einem großen, der es irgendwann wird. Die Alternative dazu, ein paar zusätzliche Cent zu zahlen, ist nicht „eine bessere Ausführung", sondern „immer noch halten." Deshalb lösen [Stop-Loss-Orders](/blog/stop-loss-orders-explained/) typischerweise eine Market-Order aus, sobald der Stop-Preis gehandelt wird.

Dieselbe Logik gilt für jede echte Dringlichkeit: vor einer geplanten Ankündigung schließen, aussteigen, wenn Ihre These gebrochen ist, am Ende Ihrer Session glattstellen. Wenn Sie raus müssen, müssen Sie raus.

## Wann eine Limit-Order die richtige Wahl ist

Fast überall sonst.

**Einstiege.** Nichts zwingt Sie in einen Trade. Sagt Ihr Plan 24,80, platzieren Sie ein Limit bei 24,80 und lassen den Markt zu Ihnen kommen. Ein Einstieg, dem Sie hinterherjagen, hat sich bereits gegen Ihren Plan bewegt.

**Illiquide Instrumente.** Wo der Spread 0,25 statt 0,04 beträgt, gibt eine Market-Order auf beiden Seiten des Trades echtes Geld weg.

**Geduldiges Skalieren.** Wollen Sie 900 Aktien, stapeln Sie Limits auf drei Niveaus — 300 bei 24,80, 300 bei 24,65, 300 bei 24,50 — und akzeptieren Sie, dass Sie vielleicht nur einen Teil davon bekommen. Das wirkt direkt auf Ihre [Positionsgrößenbestimmung](/blog/risk-management-position-sizing/): Ein teilweise ausgeführter Einstieg ist eine kleinere Position, und Ihre Risikoberechnung sollte die tatsächlich erhaltene Größe widerspiegeln.

**Ausstiege bei einem Ziel.** Ein Gewinnziel ist per Definition nicht dringend, also ist ein Limit bei Ihrem Preis genau richtig. Ein Limit-Take-Profit mit einem Stop-Loss-Ausstieg zu paaren ist die Struktur hinter [OCO- und Bracket-Orders](/blog/oco-and-bracket-orders/).

## Die Limit-Order, die nie ausgeführt wird, hat ihre eigenen Kosten

Eine verpasste Limit-Order ist nicht kostenlos, und Anfänger unterschätzen das systematisch.

Zurück zum Kurs 187,38 / 187,42. Das Ask sieht üppig aus, also platzieren Sie ein Kauflimit bei 187,30 — zwölf Cent unter dem Ask, wert 0,12 × 500 = 60 $, wenn es ausgeführt wird. Es wird nicht ausgeführt. Der Preis handelt nie bis zu Ihrem Niveau herunter und läuft auf 191,00. Die Bewegung, die Sie korrekt identifiziert haben, war 191,00 − 187,42 = 3,58 pro Aktie, oder **1.790 $** auf 500 Aktien. Sie haben 60 $ geschützt und 1.790 $ verloren.

Das ist kein Argument gegen Limit-Orders. Es ist ein Argument gegen gierige Preisstellung. Setzen Sie das Limit dorthin, wo Sie den Trade wirklich wollen, nicht ein paar Cent besser, um sich clever zu fühlen. Ein verpasster Gewinner hinterlässt keine Spur in Ihrem Trade-Log, genau deshalb ist es so leicht, ihn zu ignorieren.

## Üben Sie die Entscheidung im Simulator

Stockades Ausführungen sind perfekt, sodass Sie dort nicht üben können, einen Spread zu zahlen — aber Sie können die Entscheidung üben, die bestimmt, ob Sie einen zahlen. Öffnen Sie [Stockades kostenlosen Börsensimulator](/de/simulator/), stellen Sie das Order-Ticket vor jedem Einstieg von Market auf Limit um, und schreiben Sie den Limitpreis auf, den Sie gegen ein echtes Orderbuch nutzen würden. Reservieren Sie Market-Orders dann fürs Glattstellen — die F-Taste existiert genau dafür. Nehmen Sie diesen Reflex mit auf eine echte Plattform, und der Spread wird das einzig Neue sein, das Sie lernen müssen.
