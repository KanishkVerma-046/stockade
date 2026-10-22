---
title: "Backtesting vs. Paper Trading: Was beides beweisen kann"
description: "Backtest: Hätten die Regeln mit alten Daten Geld verdient? Paper Trading: Können Sie ihnen folgen? Was jedes beweist, wie Overfitting täuscht, und eine Abfolge."
date: 2026-12-07
author: "Stockade Team"
tags: ["Strategie", "Grundlagen"]
slug: "backtesting-vs-paper-trading"
translationOf: "backtesting-vs-paper-trading"
---

Sie schreiben eine Regel auf, lassen sie über zwei Jahre vergangener Kurse laufen, und sie verdient Geld. Sie justieren die Länge des gleitenden Durchschnitts, und sie verdient mehr. Dann traden Sie sie in Echtzeit, und sie bringt nichts oder Schlimmeres. Oder umgekehrt: Sie traden ein Setup einen Monat lang auf dem Papier, liegen am Ende vorn und schließen daraus, dass es funktioniert.

Beide Schlüsse überspringen einen Schritt. Ein Backtest und ein Paper-Trading-Durchgang beantworten verschiedene Fragen, und keiner von beiden beweist allein, dass Sie einen Edge haben. Dieser Beitrag sortiert, was jeder zeigen kann, wie jeder in die Irre führt, und in welcher Reihenfolge wir sie einsetzen würden.

## Zwei Tests, die verschiedene Fragen beantworten

Ein **Backtest** wendet feste Regeln auf historische Kurse an und zeichnet auf, was passiert wäre. Er fragt: *Hätten genau diese Regeln mit Daten, die es bereits gibt, Geld verdient?*

**Paper Trading**, auch Forward-Testing genannt, wenn es der Prüfung einer Strategie dient, heißt, die Regeln in Echtzeit mit simuliertem Geld zu traden. Es stellt zwei andere Fragen: *Können Sie diesen Regeln tatsächlich folgen, während die Kurse eintreffen?* und *Hält das Ergebnis auf Daten stand, die es noch nicht gab, als Sie die Regeln geschrieben haben?*

<div class="table-wrap">

| | Backtest | Paper Trading |
|---|---|---|
| Daten | Die Vergangenheit | Kurse, wie sie eintreffen |
| Tempo | Jahre an Trades in Minuten | Echtzeit, ein Trade nach dem anderen |
| Stichprobengröße | Kann groß sein | Meist klein |
| Wer entscheidet | Die Regeln, mechanisch | Sie, unter Zeitdruck |
| Wie er vor allem täuscht | Overfitting und Verzerrungen im Test | Zu wenige Trades, und kein echtes Geld im Spiel |

</div>

Die beiden ergänzen sich. Ein Backtest kann zeigen, dass eine Regel auf dem Papier einen Edge hatte, aber nicht, dass Sie sie umsetzen werden. Paper Trading kann zeigen, dass Sie sie umsetzen, braucht aber lange, um genug Trades für den Nachweis eines Edge zu sammeln.

## Wie ein Backtest Sie täuscht: Overfitting

Overfitting heißt, Regeln so lange zu justieren, bis sie zu genau der Vergangenheit passen, an der Sie getestet haben, einschließlich ihres zufälligen Rauschens, statt zu etwas, das sich wiederholen wird. Je mehr Varianten Sie ausprobieren, desto wahrscheinlicher ist die beste ein Zufallstreffer.

Wie wenige Varianten dafür reichen, ist der unangenehme Teil. Ein Aufsatz von 2014 in den *Notices of the American Mathematical Society*, [„Pseudo-Mathematics and Financial Charlatanism" von Bailey, Borwein, López de Prado und Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf), hat das durchgerechnet. Die Sharpe-Ratio, die sie verwenden, misst die Rendite pro Einheit Volatilität. Ihre Zahlen zeigen: Selbst wenn keine der Strategien einen echten Edge hat, reichen schon sieben unabhängige Konfigurationen in einem zweijährigen Backtest, damit von der besten zu erwarten ist, dass sie im Test eine annualisierte Sharpe-Ratio von 1 zeigt, während ihre erwartete Sharpe-Ratio auf neuen Daten null beträgt. In einem anderen Beispiel erzeugten sie 1.000 Tageskurse als Zufallslauf, sodass kein saisonaler Effekt existieren konnte, und fanden trotzdem eine saisonale Strategie mit einer Sharpe-Ratio von 1,27.

Ihre Schlussfolgerung lohnt sich als Regel: Ein Backtest, der nicht angibt, wie viele Varianten ausprobiert wurden, lässt sich nicht auf Overfitting prüfen. Führen Sie also Buch. Jede Parameteränderung, die Sie testen, ist eine weitere Variante, auch die, die Sie verwerfen. Haben Sie 30 Kombinationen aus Längen gleitender Durchschnitte und Stop-Abständen ausprobiert, um den Gewinner zu finden, müssen dessen Ergebnisse eine viel höhere Latte überspringen, als wenn er Ihre erste Idee gewesen wäre.

Eine weitere Prüfung würden wir machen: Schauen Sie sich die Nachbarn des Gewinners an. Verdient ein gleitender Durchschnitt über 17 Balken Geld, verlieren aber 16 und 18, gehört das Ergebnis wahrscheinlich zu diesem Abschnitt der Geschichte und nicht zur Idee. Eine Regel, die es wert ist, weiter getestet zu werden, sollte auch dann noch ungefähr funktionieren, wenn sich ihre Einstellungen ein wenig verschieben.

## Look-Ahead-Bias, Survivorship-Bias und perfekte Ausführungen

Overfitting ist nicht die einzige Art, wie ein Backtest eine Regel schönrechnen kann. Drei weitere lohnt es sich jedes Mal zu prüfen.

**Look-Ahead-Bias** heißt, Informationen zu verwenden, die die Regel in dem Moment, in dem sie handelte, nicht haben konnte. Angenommen, eine Regel kauft zur Eröffnung, wenn der Tag über seinem 20-Tage-Durchschnitt schließt. Zur Eröffnung kennt niemand den Schlusskurs. Ein Backtest, der die Regel spicken lässt, sieht weit besser aus als alles, was Sie traden können.

**Survivorship-Bias** heißt, nur an Instrumenten zu testen, die es noch gibt. Testen Sie eine Aktienstrategie an den heutigen Mitgliedern eines Index, haben Sie stillschweigend jedes Unternehmen entfernt, das während des Testzeitraums pleiteging, von der Börse genommen wurde oder aus dem Index fiel. Die Verlierer fehlen in Ihren Daten, die Ergebnisse fallen also zu optimistisch aus.

**Perfekte Ausführungen** heißt anzunehmen, dass jede Order genau zu dem Preis ausgeführt wurde, den die Regel wollte, ohne Spread, Kommission oder Slippage. [Der Leitfaden zum Chance-Risiko-Verhältnis](/de/blog/chance-risiko-verhaeltnis-erwartungswert/) zeigt, wie ein paar Cent Kosten pro Aktie die Gewinnschwellen-Trefferquote einer Strategie verschieben können, und Strategien mit engen Stops spüren das am stärksten.

## Was Paper Trading beweist und was nicht

Paper Trading testet den Teil, den ein Backtest nicht testen kann: Sie. Erkennen Sie das Setup in Echtzeit, steigen Sie ohne Zögern ein, lassen Sie den Stop in Ruhe, und nehmen Sie den Ausstieg, den die Regeln vorgeben? Eine Strategie, die mechanisch funktioniert, kann hier scheitern, weil der Mensch, der sie ausführt, Ermessen hinzufügt, das der Backtest nie hatte. Außerdem findet jeder Trade naturgemäß auf neuen Daten statt, Forward-Testing kann die Vergangenheit also nicht so überanpassen, wie es ein Backtest kann.

Es hat drei Grenzen. Erstens ist es langsam, die Stichproben bleiben also klein. [Der Leitfaden zu Performance-Kennzahlen](/de/blog/trading-performance-analysieren/) zeigt, dass eine Trefferquote von 50 % bei 40 Trades eine grobe 95-%-Spanne von etwa 34 % bis 66 % hat, die ein gutes wie ein schlechtes System abdeckt. Zweitens ist das Geld nicht echt. [Der Paper-Trading-Leitfaden](/de/blog/paper-trading-leitfaden/) behandelt, was dadurch fehlt, und die Kurzfassung lautet: Disziplin, die mit virtuellem Geld hält, rutscht mit echtem Geld oft ab. Drittens sind simulierte Ausführungen meist gnädiger als echte.

## Paper-Ergebnisse mit dem Backtest vergleichen

Die nützliche Frage ist nicht, ob Paper Trading Geld verdient hat. Sie lautet, ob die Paper-Ergebnisse zu dem passen, was der Backtest gesagt hat, und wenn nicht, warum.

Hier ein hypothetisches Beispiel. Ein Backtest meldet eine Trefferquote von 45 % bei Trades, die mit 1:2 geplant sind, der Erwartungswert beträgt also 0,45 × 2 − 0,55 × 1 = +0,35R pro Trade. Sie machen 40 Paper-Trades und gewinnen 15, eine Trefferquote von 37,5 %, und Ihr durchschnittlicher Gewinner liegt bei 1,8R statt 2R. Ihr Erwartungswert beträgt 0,375 × 1,8 − 0,625 × 1 = +0,05R.

Betrachten Sie die beiden Lücken getrennt. Die Lücke bei der Trefferquote liegt im Rauschen: Der Standardfehler einer Trefferquote von 45 % über 40 Trades beträgt √(0,45 × 0,55 ÷ 40), etwa 7,9 Prozentpunkte, und 37,5 % liegen 7,5 Punkte darunter. Ob diese Lücke echt ist, können Sie nicht sagen. Beim durchschnittlichen Gewinner ist das anders. Dass er bei 1,8R statt 2R landet, können Sie Trade für Trade prüfen, und zeigt [Ihr Journal](/de/blog/trading-journal-fuehren/) frühe Ausstiege, ist das ein Ausführungsproblem, kein Strategieproblem. Beheben Sie die Ausführung und testen Sie weiter, bevor Sie irgendeinen Schluss über die Regeln ziehen.

## Die Abfolge, die wir verwenden würden

1. **Schreiben Sie die Regeln so genau auf, dass ein Fremder sie überprüfen könnte.** [Der Leitfaden zum Trading-Plan](/de/blog/trading-plan-erstellen/) erklärt, wie. Können Sie es nicht aufschreiben, können Sie es weder backtesten noch befolgen.
2. **Backtesten Sie auf einem Zeitraum, und zählen Sie jede Variante, die Sie ausprobieren.**
3. **Halten Sie einen späteren Zeitraum zurück, den Sie nie angeschaut haben, und testen Sie die endgültige Version einmal darauf.** Scheitert sie dort, haben Sie günstig etwas gelernt. Justieren Sie nicht nach, bis sie besteht, sonst werden die zurückgehaltenen Daten einfach zu weiteren Daten, an die Sie angepasst haben.
4. **Traden Sie vorwärts auf dem Papier, für eine vorab festgelegte Anzahl Trades,** jeden einzelnen im Journal festgehalten, und vergleichen Sie die Ergebnisse mit dem Backtest, wie im vorigen Abschnitt.
5. **Wechseln Sie mit kleiner Größe zu echtem Geld,** wie es der Paper-Trading-Leitfaden beschreibt, und erhöhen Sie erst, wenn die echten Ergebnisse zu beiden Tests passen.

Schreiben Sie vor jeder Stufe auf, welches Ergebnis sie beenden würde. Für die Paper-Stufe könnte das lauten: Nach der geplanten Anzahl Trades, bei fast allen davon mit befolgten Regeln, liegt der Erwartungswert unter null oder weit unter dem des Backtests. Wer erst hinterher entscheidet, lädt dasselbe Verbiegen von Regeln ein, das Overfitting mit einem Backtest anstellt.

Jede Stufe kann eine Strategie nur verwerfen oder zur nächsten durchlassen. Keine beweist, dass der Edge Bestand hat, und Märkte verändern sich. Deshalb beginnt Schritt 5 klein.

## Wo Stockade passt und wo nicht

Stockade kann nicht backtesten. Es hat keine historischen Kursdaten und keine Möglichkeit, Regeln automatisch laufen zu lassen. Sein Wiedergabemodus erzeugt in Ihrem Browser 600 Einminutenkerzen und zeigt die ersten 61; den Rest gehen Sie von Hand mit der Leertaste oder der Pfeiltaste nach rechts durch, oder Sie lassen ihn automatisch abspielen, ohne zu sehen, was als Nächstes kommt.

Die Wiedergabe ist also ein Forward-Test Ihrer Ausführung, auf synthetischen Daten. Sie ist nützlich für die Gewohnheiten, von denen Schritt 4 abhängt: geschriebenen Regeln folgen, Stops im Moment des Einstiegs eingeben, jeden Trade protokollieren. Ob eine Strategie einen Edge hat, kann sie Ihnen nicht sagen. Stockades Kurse stammen von einem Algorithmus, einem Zufallslauf mit einer langsam driftenden Trendneigung, ohne Verbindung zu einem echten Markt. Wie sich eine Strategie dort schlägt, sagt also nichts darüber, wie sie sich mit echten Kursen schlagen würde. Und wie das Zufallslauf-Beispiel aus dem Aufsatz von Bailey zeigt, kann selbst eine Reihe ohne echtes Muster Ergebnisse liefern, die nach einer funktionierenden Strategie aussehen. Ein guter Durchgang auf Stockade ist ein Beleg Ihrer Disziplin, kein Beweis für die Regeln. [Der Leitfaden zum Börsensimulator](/de/blog/was-ist-ein-boersensimulator/) behandelt, was ein Simulator sonst noch lehren kann und was nicht.

## Üben Sie das im Simulator

Schreiben Sie ein Regelwerk auf eine Seite, öffnen Sie dann den [Simulator](/de/simulator/) im Wiedergabemodus und traden Sie 30 Setups streng danach, mit einem Stop im Feld Stop Loss bei jedem Trade. Halten Sie jeden im Journal fest: Setup, geplanter Einstieg, Stop und Ziel, und ob Sie die Regeln befolgt haben. Fragen Sie am Ende nicht, ob Sie Geld verdient haben. Fragen Sie, wie viele Trades die Regeln gebrochen haben und wie groß Ihr durchschnittlicher Gewinner in R im Vergleich zum Plan war, denn das sind die Zahlen, die Sie bei einem echten Forward-Test richtig hinbekommen müssen.
