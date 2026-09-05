---
title: "Was ist ein Börsensimulator und warum sollten Sie einen nutzen"
description: "Ein Börsensimulator lässt Sie mit virtuellem Geld echte Marktmechanik traden. So funktionieren sie und was sie lehren können — und was nicht."
date: 2026-03-23
tags: ["Grundlagen"]
slug: "was-ist-ein-boersensimulator"
translationOf: "what-is-a-stock-market-simulator"
---

Beim ersten echten Trade lernen die meisten Menschen zwei Dinge gleichzeitig: wie die Software funktioniert, und ob ihre Markteinschätzung überhaupt gut war. Das sind sehr unterschiedliche Probleme, und sie zu vermischen ist teuer. Sie klicken „Verkaufen", wo Sie „Leerverkauf" meinten, Sie kaufen 100 Aktien, wo Sie 10 meinten, Sie stellen fest, dass Ihre Stop-Order nie tatsächlich übermittelt wurde — und jeder dieser Fehler kostet echtes Geld, um etwas zu lernen, das ein Handbuch hätte lehren können.

Ein Börsensimulator trennt diese beiden Probleme. Er gibt Ihnen eine vollständige Trading-Oberfläche, ein Kurschart, das sich wie ein Markt bewegt, und ein Guthaben aus fiktivem Geld, sodass mechanische Fehler nichts kosten. Sie dürfen im Verborgenen schlecht in der Software sein.

## Was ein Börsensimulator tatsächlich ist

Ein Simulator ist eine Handelsplattform, bei der sowohl das Geld als auch der Kursfeed simuliert sind, während alles darum herum genauso funktioniert wie in echt. Seien Sie sich über die Daten im Klaren: Stockades Kurse werden algorithmisch generiert, nicht von einer Börse bezogen, und es gibt keinen Live-Feed dahinter. Was sie tun, ist, sich wie Marktdaten zu *verhalten* — echte OHLC-Kerzen mit Eröffnungs-, Höchst-, Tiefst- und Schlusskurs, Volumen, das von Balken zu Balken schwankt, und die langen Dochte, die echte Charts mühsam zu lesen machen. Die Ordertypen sind die echten Ordertypen. Die Kontomathematik — Barguthaben, Positionsgröße, unrealisierter Gewinn und Verlust, Kontoeigenkapital — folgt derselben Arithmetik wie bei Ihrem Broker. Was fehlt, ist die Abwicklung: Niemand schickt Ihre Order an eine Börse, und kein Geld verlässt ein Konto.

Dieser Unterschied ist wichtig. Ein Simulator ist kein Spiel mit Marktthema; er ist ein funktionierendes Modell eines Marktes ohne die Konsequenzen. Die Fähigkeiten, die sich übertragen, sind die mechanischen — eine Position dimensionieren, eine Order abwickeln, Buch führen. Die eine, die sich nicht überträgt, ist die, die Sie am meisten brauchen, und dazu kommen wir weiter unten.

Stockades Simulator startet Sie mit 100.000 $ virtuellem Kapital und läuft vollständig in Ihrem Browser. Es gibt keine Anmeldung und kein Konto; Ihre Positionen und Ihr Verlauf leben im lokalen Speicher Ihres Browsers. Dieses Design hat einen offensichtlichen Kompromiss — löschen Sie Ihre Browserdaten, verschwindet Ihr Verlauf mit — bedeutet aber, dass Sie in Sekunden statt nach dem Ausfüllen eines Formulars beginnen können.

## Die Mechanik, die Sie eigentlich lernen sollen

Vor jeder Strategiefrage liegt eine Schicht aus reiner Verkabelung, über die fast jeder stolpert. Das lehrt ein Simulator am besten.

### Ordertypen

Eine **Market-Order** kauft oder verkauft sofort zum aktuell verfügbaren Preis. Sie garantiert die Ausführung; sie garantiert nicht den Preis.

Eine **Limit-Order** legt ein Höchstmaß fest, das Sie zahlen, oder ein Mindestmaß, das Sie akzeptieren. Platzieren Sie einen Limit-Kauf auf eine Aktie bei 47,50 $, während sie bei 48,20 $ gehandelt wird, passiert nichts, bis der Preis zu Ihnen kommt. Sie garantiert den Preis; sie garantiert nicht überhaupt eine Ausführung. ([Market-Order vs. Limit-Order](/blog/market-orders-vs-limit-orders/) geht näher darauf ein, wann welche passt.)

Ein **Stop-Loss** ist eine ruhende Order, die aktiv wird, wenn sich der Preis über ein von Ihnen gewähltes Niveau hinaus gegen Sie bewegt. Er ist der Mechanismus, der aus „ich sollte das wohl beenden" etwas macht, das passiert, egal ob Sie hinschauen oder nicht.

Ein **Take-Profit** ist dieselbe Idee in die andere Richtung — eine Order, die Ihre Position schließt, sobald sie ein Ziel erreicht.

Eine **OCO-Bracket-Order** („one cancels the other") paart einen Stop-Loss und einen Take-Profit um eine offene Position herum. Welcher zuerst ausgeführt wird, storniert den anderen, sodass Sie nicht mit einer verwaisten Order enden können, die nach Ihrem Ausstieg eine neue Position eröffnet. Siehe [OCO- und Bracket-Orders erklärt](/blog/oco-and-bracket-orders/) für die vollständige Mechanik.

Stockade unterstützt alle fünf. Hundert davon mit fiktivem Geld zu platzieren ist, wie das Vokabular zum Muskelgedächtnis wird. Die Tastenkürzel helfen: `B` zum Kaufen, `S` zum Verkaufen, `F` zum Glattstellen (alles schließen). Wenn Ihre Hände die Ausstiegstaste kennen, hört Zögern auf, ein Faktor zu sein.

### Positionsgrößenbestimmung, mit echten Zahlen

Hier ist die Berechnung, die die meisten Anfänger nie machen, und das Nützlichste, was Sie in einem Simulator einüben können.

Angenommen, Sie haben ein Konto mit 100.000 $ und entscheiden, dass kein einzelner Trade mehr als 1 % davon verlieren darf. Das sind 1.000 $ Risiko pro Trade.

Sie möchten eine Aktie bei 52,00 $ kaufen. Sie sehen sich den Chart an und entscheiden, dass Ihre Idee falsch war, wenn sie unter 50,00 $ fällt. Ihr Risiko pro Aktie ist 52,00 $ − 50,00 $ = 2,00 $.

Ihre Positionsgröße ist Ihr Dollarrisiko geteilt durch Ihr Risiko pro Aktie: 1.000 $ ÷ 2,00 $ = **500 Aktien**.

Das ist eine Position von 26.000 $ (500 × 52,00 $) auf einem Konto von 100.000 $. Beachten Sie, was passiert ist: Sie haben nicht zuerst die Größe gewählt und dann gehofft. Das Stop-Niveau und Ihr Risikolimit haben sie für Sie erzeugt.

Ändern Sie jetzt eine Eingabe. Dieselbe Aktie, derselbe Einstieg bei 52,00 $, aber Sie entscheiden, dass das Niveau, das Ihre Idee invalidiert, bei 51,00 $ statt liegt. Das Risiko pro Aktie ist 1,00 $, also wird die Größe 1.000 $ ÷ 1,00 $ = **1.000 Aktien** — eine Position von 52.000 $, doppelt so groß, mit demselben Risiko von 1.000 $. Ein engerer Stop bedeutet nicht weniger Risiko; er bedeutet eine größere Position und eine höhere Chance, durch gewöhnliches Rauschen ausgestoppt zu werden.

Rechnen Sie das dreißigmal in einem Simulator durch, und es wird automatisch. Lernen Sie es auf einem echten Konto, und jede Wiederholung hat einen Preis. [Positionsgrößenbestimmung und die 1-%-Regel](/blog/risk-management-position-sizing/) behandelt die Formel vollständig, einschließlich der Drawdown-Erholungsmathematik.

## Das Chart-Lesen ist eine eigene Fähigkeit

Die Charts des Simulators sind Candlestick-Charts mit einem Volumen-Histogramm darunter, jede Kerze fasst eine Zeitperiode zusammen. Die verfügbaren Overlays — EMA 9, EMA 20, EMA 50, plus VWAP, RSI und MACD — sind die gängigen, auf die Sie überall stoßen werden, und sie beim Traden auf dem Bildschirm zu haben zeigt Ihnen, welche Sie tatsächlich nutzen und welche den Chart nur unübersichtlich machen.

Die meisten beginnen mit sechs Indikatoren und enden mit zwei. Ein Simulator ist der Ort, an dem Sie sich diese Entdeckung leisten können.

Die [Märkte-Seite](/de/markets/) führt 29 Instrumente: 14 Aktien, 8 Krypto-Token, 3 Forex-Paare und 4 Futures (/NQ, /ES, /CL, /GC). Die Aktien und Token sind erfundene Ticker, keine echten Unternehmen oder Coins; nur die Forex-Paare und Futures nutzen reale Bezeichnungen. Sie liegen auf sehr unterschiedlichen Preisniveaus, was es wert ist, zu üben — die Dimensionierung eines auf vier Dezimalstellen notierten Forex-Paars ist eine andere gedankliche Übung als die eines im Tausenderbereich handelnden Index-Futures, und das Verrutschen des Dezimalpunkts ist ein klassischer Anfängerfehler, der hier nichts kostet.

Die generierten Kurse bilden auch keine reale Instrumentenpersönlichkeit nach: Ein einziges Volatilitätsmodell läuft über jedes Symbol. Was Sie hier lernen, ist die Arithmetik und der Arbeitsablauf.

Für bewusstes Üben spielt der [Chart-Simulator](/de/chart-simulator/) eine Chart-Session Kerze für Kerze ab, sodass Sie einen Balken nach dem anderen vorrücken, ohne zu wissen, was als Nächstes kommt. Die Session wird generiert statt aus einem Archiv gezogen, sodass Sie den Chart nicht wiedererkennen und schummeln können — und nicht zu wissen, was die nächste Kerze macht, ist genau der Punkt. Der Live-Modus bewegt sich mit 800-ms-Ticks, näher am echten Tempo und dem echten Druck.

## Was die Statistik Ihnen sagt, was Ihre Erinnerung nicht wird

Die Erinnerung ist ein schlechter Buchhalter fürs Trading. Sie werden sich an den Trade erinnern, der 8 % zu Ihren Gunsten lief, und die vier kleinen Verluste vergessen, die ihn finanziert haben.

Die [Analyse-Seite](/de/analytics/) führt stattdessen die Aufzeichnung: Equity-Kurve, Trade-Journal, Trefferquote, Profitfaktor, Durchschnittsgewinn und Durchschnittsverlust, maximaler Drawdown und eine Tageszeit-Heatmap.

Zwei davon verdienen eine Erklärung:

**Der Profitfaktor** ist der Bruttogewinn geteilt durch den Bruttoverlust. Wenn Ihre Gewinn-Trades 6.200 $ erwirtschaftet haben und Ihre Verlust-Trades 4.000 $ gekostet haben, ist Ihr Profitfaktor 1,55 — Sie haben 1,55 $ für jeden verlorenen Dollar verdient. Alles über 1,0 ist netto positiv.

**Die Trefferquote allein sagt fast nichts aus.** Eine Strategie, die 35 % der Zeit gewinnt, mit einem Durchschnittsgewinn von 900 $ und einem Durchschnittsverlust von 300 $, erzeugt über 100 Trades (35 × 900 $) − (65 × 300 $) = 31.500 $ − 19.500 $ = **12.000 $**. Eine Strategie, die 70 % der Zeit gewinnt, mit einem Durchschnittsgewinn von 200 $ und einem Durchschnittsverlust von 600 $, erzeugt (70 × 200 $) − (30 × 600 $) = 14.000 $ − 18.000 $ = **−4.000 $**. Die höhere Trefferquote ist die Verluststrategie. Ohne die Zahlen zu führen, sehen Sie das nicht.

Die Tageszeit-Heatmap führt tendenziell zur unangenehmsten Entdeckung: Viele Menschen stellen fest, dass ein bestimmter Abschnitt der Session für den Großteil ihrer Verluste verantwortlich ist.

## Was ein Simulator Ihnen nicht beibringen kann

Dieser Teil wird in den meisten Artikeln zum Thema weggelassen, und das ist unredlich.

**Simuliertes Trading nimmt die emotionale Last des echten Geldes weg, was der schwierigste Teil des Tradings ist.** Einen Drawdown von 2.400 $ in virtuellem Kapital auszusitzen ist mäßig interessant. Einen Drawdown von 2.400 $ in Geld, das Sie verdient haben, auszusitzen ist eine körperliche Erfahrung — und die Disziplin, die drei Monate lang auf einem Simulator perfekt hielt, bricht sehr oft in der ersten Woche echten Tradings zusammen. Regeln scheitern nicht, weil sie schlechte Regeln waren. Sie scheitern, weil ihre Befolgung etwas kostet. Ein Simulator kann Ihnen diese Kosten nicht in Rechnung stellen, kann also nicht testen, ob Sie sie zahlen werden.

**Ausführungen in einem Simulator tragen fast keine Reibung.** Ihre Order wird zum angezeigten Preis ausgeführt, sofort, vollständig; nur Stop- und Zielausstiege rutschen, um den Tick, der Ihr Niveau überschritten hat. Echte Orders sehen sich Slippage gegenüber — die Lücke zwischen dem erwarteten und dem erhaltenen Preis, die sich gerade dann vergrößert, wenn sich der Markt schnell bewegt und Sie am meisten ausgeführt werden wollen. Echte Orders sehen sich auch Teilausführungen gegenüber, bei denen Sie 500 Aktien anfragen und 300 erhalten. Keines von beidem erscheint hier in echtem Ausmaß, sodass simulierte Ergebnisse systematisch etwas besser ausfallen, als dieselben Entscheidungen live erzeugen würden.

**Kommissionen, Spreads, Finanzierungskosten und Steuern werden nicht so modelliert, wie Ihr spezifischer Broker sie anwenden wird.** Eine Strategie, die in einem Simulator einen dünnen Gewinn erzielt, kann nach Abzug echter Kosten ein Nettoverlierer sein.

**Die Kursdaten sind generiert und enthalten daher kein tatsächliches Marktverhalten.** Stockades Kerzen stammen von einem Algorithmus, nicht von einer Börse. Das ist in Ordnung, um Mechanik einzuüben — ein Orderticket ist egal, woher die Zahl kam — aber ein Muster, das hier „funktioniert", wurde gegen Arithmetik getestet, nicht gegen einen Markt. Es gibt keine Gewinnveröffentlichungen, keine Nachrichtenschocks, keine der wiederkehrenden Strukturen, die Trader tatsächlich auszunutzen versuchen. Backtest-artige Schlussfolgerungen aus generierten Daten sind nichts wert. Nutzen Sie den Simulator, um zu lernen, wie man tradet, nicht um herauszufinden, was Sie traden sollten.

Der korrekte Weg, ein gutes Simulator-Ergebnis zu lesen, lautet: „meine Mechanik ist solide und meine Idee ist nicht offensichtlich fehlerhaft." Nicht: „das wird funktionieren."

## Wie Sie einen Simulator nutzen, damit er wirklich hilft

Behandeln Sie das virtuelle Guthaben, als wäre es real. In dem Moment, in dem Sie anfangen, 40.000-$-Positionen einzugehen, „um zu sehen, was passiert", hört die Übung auf, Übung zu sein.

Handeln Sie eine Größe und ein Setup, bis Sie 40 oder 50 Einträge im Journal haben, und schauen Sie dann auf die Statistik statt auf Ihre Erinnerung. Schreiben Sie auf, warum Sie eingestiegen sind, bevor Sie einsteigen, nicht nachdem Sie ausgestiegen sind. Und wenn Sie zu echtem Geld wechseln, verkleinern Sie Ihre Größe, bis ein voller Verlust echt langweilig ist — an diesem Punkt testen Sie nicht mehr die Strategie, Sie testen sich selbst. [Der Paper-Trading-Leitfaden](/blog/paper-trading-guide/) behandelt diesen Übergang ausführlicher.

## Üben Sie das im Simulator

Öffnen Sie den Trading-Simulator, nehmen Sie das virtuelle Guthaben von 100.000 $, und tun Sie zuerst eines: Berechnen Sie die Stückzahl aus Ihrem Stop-Niveau, bevor Sie einsteigen, so wie es die obige Arithmetik zeigt. Tun Sie das zehnmal, drücken Sie `F` zum Glattstellen, wenn Ihr Stop erreicht ist, statt sich „noch eine Kerze" einzureden. Prüfen Sie dann das Trade-Journal auf der Analyse-Seite und vergleichen Sie Ihren Durchschnittsverlust mit dem, was Sie beabsichtigt hatten. Diese eine Schleife lehrt mehr als eine Woche Lesen.

[Auf dem Simulator starten](/de/simulator/)
