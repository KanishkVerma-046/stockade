---
title: "Was sind OCO- und Bracket-Orders und wie funktionieren sie"
description: "Wie OCO- und Bracket-Orders einen Stop und ein Ziel verknüpfen, sodass die Ausführung des einen den anderen storniert, plus typische Mengenfehler."
date: 2026-05-25
tags: ["Ordertypen"]
slug: "oco-und-bracket-orders"
translationOf: "oco-and-bracket-orders"
---

Sie kaufen 500 Aktien. Der Preis steigt ein wenig, fällt dann ein wenig, steigt dann wieder. Jetzt entscheiden Sie in Echtzeit, mit Geld im Spiel, ob das der Höhepunkt ist oder der Beginn von etwas — und die Version von Ihnen, die diese Entscheidung trifft, ist nicht die ruhige Version, die das Setup gefunden hat.

OCO- und Bracket-Orders existieren, um Ihnen genau diese Entscheidung abzunehmen. Nicht um sie besser zu machen, sondern *früher*. Dieser Artikel handelt von der Mechanik: was mit was verknüpft ist, was was storniert, was mit Mengen passiert, und die konkreten Arten, wie das Setup versagt.

## Was eine OCO-Order ist: zwei ruhende Orders, bei denen die Ausführung der einen die andere tötet

OCO steht für **one-cancels-other** (die eine storniert die andere). Es ist kein neuer Ordertyp. Es ist eine *Verknüpfung*, die zwischen zwei gewöhnlichen Orders gesetzt wird, die Sie bereits kennen.

Sie geben zwei Orders gleichzeitig auf. Beide liegen beim Broker, unausgeführt, wartend. In dem Moment, in dem eine davon ausgeführt wird, storniert der Broker automatisch die andere. Sie enden nie mit beiden.

Dieser letzte Satz ist das ganze Feature. Ohne die Verknüpfung haben Sie zwei laufende Orders, und läuft der Preis durch beide Niveaus, bekommen Sie zwei Ausführungen — was für eine einzelne Position bedeutet, dass Sie einmal aussteigen und dann versehentlich eine brandneue Position in die andere Richtung eröffnen. Die OCO-Verknüpfung ist es, die „entweder/oder" tatsächlich entweder/oder bedeuten lässt.

Das häufigste OCO-Paar ist ein Stop unter Ihrer Position und ein Limit darüber: eine **Stop-Order**, die zu einem Verkauf wird, wenn der Preis auf Ihre Verlustgrenze fällt, und eine **Limit-Order**, die verkauft, wenn der Preis auf Ihr Gewinnziel steigt. Der Preis kann nur eine davon zuerst erreichen. Welche auch immer dort ankommt, gewinnt, die Position schließt, und die überlebende wird storniert.

Für die Logik, *wo* der Stop hingehört — Struktur, Volatilität, warum eine runde Zahl eine schlechte Wahl ist — siehe [Stop-Loss-Orders erklärt](/blog/stop-loss-orders-explained). Dieser Artikel setzt voraus, dass Sie die Niveaus bereits gewählt haben, und interessiert sich nur dafür, wie sie miteinander verdrahtet sind.

## Was eine Bracket-Order hinzufügt: einen Einstieg mit angehängtem Ausstiegspaar

Eine **Bracket-Order** ist drei Orders, die als ein Paket aufgegeben werden:

1. Eine **Einstiegs**-Order (Market oder Limit), die die Position eröffnet.
2. Ein **schützender Stop**, der sie mit Verlust schließt.
3. Ein **Gewinnziel**, das sie mit Gewinn schließt.

Orders 2 und 3 sind ein OCO-Paar miteinander. Sie sind auch *abhängig von Order 1* — sie werden erst aktiv, wenn der Einstieg tatsächlich ausgeführt wird. Geben Sie eine Bracket-Order mit einem Limit-Einstieg auf, der nie ausgeführt wird, passiert überhaupt nichts; Stop und Ziel bleiben inaktiv und laufen irgendwann mit dem Einstieg ab.

Die Reihenfolge ist also: Einstieg wird ausgeführt → Stop und Ziel werden beide aktiv → eines davon wird ausgeführt → das andere wird storniert → Sie sind glatt. Drei Orders, ein Hin- und Rückweg, null Entscheidungen nach dem ersten Klick.

Das Wort „Bracket" (Klammer) ist wörtlich zu nehmen. Ihr Einstiegspreis sitzt innerhalb einer Klammer, mit einem Boden darunter und einer Decke darüber, und der Trade ist vorbei, sobald er eine der beiden berührt.

## Ein durchgerechnetes Bracket: 500 Aktien long bei 187,40

Angenommen, Sie gehen mit 500 Aktien bei 187,40 long, Stop bei 185,90, Ziel bei 190,40.

<div class="table-wrap">

| Teil | Preis | Abstand vom Einstieg | Pro Aktie | Gesamt auf 500 Aktien |
|---|---|---|---|---|
| Einstieg (Kauf) | 187,40 | — | — | 93.700 $ Positionswert |
| Stop (Verkauf) | 185,90 | 1,50 darunter | −1,50 | −750 $ |
| Ziel (Verkauf) | 190,40 | 3,00 darüber | +3,00 | +1.500 $ |

</div>

Prüfen Sie die Arithmetik. Risiko pro Aktie ist 187,40 − 185,90 = 1,50, also 500 × 1,50 = **750 $ Risiko**. Belohnung pro Aktie ist 190,40 − 187,40 = 3,00, also 500 × 3,00 = **1.500 $ Ziel**. Belohnung geteilt durch Risiko ist 3,00 ÷ 1,50 = 2, ein **Chance-Risiko-Verhältnis von 2:1**.

**Dieses Verhältnis steht in dem Moment fest, in dem Sie die Bracket-Order aufgeben.** Sie entdecken Ihr Chance-Risiko-Verhältnis nicht nachträglich, indem Sie das Ergebnis betrachten — Sie haben es gewählt, als Sie drei Zahlen in ein Feld eingegeben haben.

**Und ein 2:1-Bracket braucht eine Trefferquote über 33,3 %, nur um die Gewinnschwelle zu erreichen.** Zehn Trades in dieser Größe: vier Gewinner erzeugen 4 × 1.500 $ = 6.000 $, sechs Verlierer erzeugen 6 × 750 $ = 4.500 $, netto +1.500 $ bei 40 % Trefferquote. Fallen Sie auf drei Gewinner, sind es 4.500 $ gewonnen gegen 5.250 $ verloren — negativ bei 30 %. Das Verhältnis macht Sie nicht profitabel; es setzt die Latte, die Sie trotzdem überspringen müssen.

Auf einem Konto von 100.000 $ sind diese 750 $ 0,75 % des Eigenkapitals — innerhalb der üblichen 1-%-Obergrenze aus [Positionsgrößenbestimmung und die 1-%-Regel](/blog/risk-management-position-sizing). Beachten Sie, dass die Position 93.700 $ wert ist, etwa 94 % des Kontos, während der tatsächlich riskierte Betrag 750 $ beträgt. Positionsgröße und Risikogröße sind unterschiedliche Zahlen, und der Stop ist es, der sie trennt.

## Warum das Bracket vor dem Einstieg zu platzieren der ganze psychologische Punkt ist

Hier kommt der Teil, der mehr zählt als die gesamte Mechanik.

Hängen Sie Stop und Ziel *vor* der Ausführung des Einstiegs an, treffen Sie die Ausstiegsentscheidung in dem einzigen Moment, in dem Sie keine Position, kein unrealisiertes P&L und kein Ego im Trade haben. Sie schauen auf einen Chart und fragen: „Wo würde ich falsch liegen, und wo würde ich das Geld mitnehmen?" Das sind analytische Fragen.

Sobald die Position existiert, werden dieselben zwei Fragen emotional. „Wo würde ich falsch liegen" wird zu „wie viel weiter kann ich es aushalten, diesem Fall zuzusehen." „Wo würde ich das Geld mitnehmen" wird zu „was, wenn es weitergeht." Trader, die Ausstiege nach dem Einstieg setzen, weiten routinemäßig den Stop, weil das Weiten den aktuellen Schmerz verschwinden lässt, und verengen das Ziel, weil etwas Kleines einzustreichen sicherer wirkt als zu warten.

Ein Bracket macht Sie nicht diszipliniert. Es verschiebt die Entscheidung auf den Moment, in dem Disziplin billig ist. Seien Sie trotzdem ehrlich zu sich selbst: Nichts hindert Sie daran, die Orders mitten im Trade zu stornieren und neu zu setzen, und Anfänger tun genau das.

## Bracket-Fehler, die Anfänger machen

### Mengen-Fehlanpassung nach einer Teilausführung

Sie geben ein Bracket für 500 Aktien auf. In einem echten Markt werden nur 300 ausgeführt, bevor sich der Preis wegbewegt. Ihr Stop und Ziel, wenn sie auf 500 dimensioniert waren, decken jetzt 200 Aktien ab, die Sie nicht besitzen.

Löst der Stop dann aus, schließt ein Verkauf von 500 Aktien gegen eine Long-Position von 300 Aktien Ihre Position *und eröffnet einen Short von 200 Aktien* — eine Position, die Sie nie beabsichtigt haben, jetzt ungeschützt, weil das Bracket seine Aufgabe bereits erfüllt und das Ziel storniert hat. Manche Broker passen Bracket-Mengen automatisch an die ausgeführte Menge an; manche nicht. Sie müssen wissen, welche Art Sie nutzen, bevor es zählt, nicht danach.

### Vergessen, dass die Orders Ihren Bildschirm überdauern

Ruhende Orders leben beim Broker, nicht in Ihrem Browser. Schließen Sie die Plattform, klappen Sie den Laptop zu, gehen Sie schlafen — der Stop und das Ziel arbeiten weiter. Das ist der Sinn, aber es bedeutet auch, dass ein Bracket, das Sie eingerichtet und vergessen haben, eine aktive Anweisung ist, die ausgeführt werden kann, während Sie schlafen oder in einer Besprechung sind. Jedes unbeaufsichtigte Bracket ist eine Entscheidung, die Ihr vergangenes Ich in Ihrem Namen getroffen hat.

### Brackets auf beiden Seiten einer Range

Ein häufiges Setup: Der Preis steckt zwischen zwei Niveaus fest, also platzieren Sie ein Kauf-Stop-Bracket über dem Widerstand und ein Verkauf-Stop-Bracket unter der Unterstützung, in der Absicht, zu fangen, in welche Richtung auch immer er ausbricht.

Die Falle ist, dass diese beiden *Einstiege* nicht miteinander verknüpft sind, es sei denn, Sie machen sie explizit zu einem OCO-Paar. Sind sie unverknüpft und der Preis stößt über den Widerstand, führt Ihre Long-Position aus, dreht, und fällt dann unter die Unterstützung, werden Sie auch beim Short ausgeführt — vom Long zum Short gewechselt am schlimmsten Punkt der Zangenbewegung. Verknüpfen Sie die Einstiege als OCO, und der Abwärts-Einstieg stirbt in dem Moment, in dem der Aufwärts-Einstieg ausgeführt wird.

## Was eine Bracket-Order nicht kann

Ein Bracket ist eine Maschine, und Maschinen lesen keine Charts.

**Sie kann sich nicht an neue Informationen anpassen.** Ändert sich die Form des Setups — die Bewegung stockt, das Volumen versiegt, das Niveau, gegen das Sie handelten, hält nicht mehr — ist es Ihrem Bracket egal. Es sitzt bei den zwei Preisen, die Sie vor zwanzig Minuten gewählt haben, und wartet.

**Ein mechanisches Ziel kann irgendwo sitzen, das der Chart nie rechtfertigte.** Setzen Sie jedes Ziel auf genau 2R, weil 2R professionell klingt, und Sie werden manchmal eine Limit-Order in totem Raum knapp hinter einem offensichtlichen Widerstandsregal parken und dann zusehen, wie der Preis 20 Cent davor dreht. Das Verhältnis sollte ein Ergebnis dessen sein, wo die sinnvollen Ausstiegsniveaus liegen, kein Eingabewert, den der Chart erfüllen muss. Ein 2:1-Bracket ist nur gut, wenn der Markt diese 3,00 Aufwärtspotenzial vor den 1,50 Abwärtsrisiko plausibel bietet.

**Und sie garantiert nicht den eingegebenen Preis.** In echten Märkten wird ein Stop bei Auslösung zu einer Market-Order, und Market-Orders werden zu dem ausgeführt, was verfügbar ist, was schlechter sein kann als Ihr Stop-Niveau — siehe [Market-Order vs. Limit-Order](/blog/market-orders-vs-limit-orders) dafür, warum dieser Unterschied zubeißt. Ihr Risiko von 750 $ ist eine Schätzung, keine Garantie.

## Üben Sie das im Simulator

Stockades Order-Panel unter `/simulator` hat optionale Felder für **Stop Loss** und **Take Profit** direkt unter der Menge, und sie verhalten sich wie ein OCO-Paar: Welches Niveau der simulierte Preis auch zuerst erreicht, schließt Ihre gesamte Position und leert beide Felder gleichzeitig. Füllen Sie alle drei Zahlen aus, bevor Sie B drücken, dann fassen Sie das Panel bewusst nicht mehr an und beobachten Sie, welche Seite getroffen wird.

Ein ehrlicher Vorbehalt, weil er ändert, was Sie hier lernen können. Stockades Ausführungen tragen weit weniger Reibung als echte — kein Bid-Ask-Spread, keine Teilausführungen — aber sie sind nicht buchstäblich reibungsfrei. Der Simulator prüft Ihre Niveaus alle 800 Millisekunden gegen einen neuen Preis und bucht den Ausstieg zu dem Tick, der das Niveau *überschritten* hat, statt am Niveau selbst, sodass ein Stop oder Ziel ein paar Cent hinter dem landet, wo Sie es gesetzt haben. Das Fehlen von Teilausführungen ist der Teil, der hier zählt: Es bedeutet, dass das oben beschriebene Mengen-Fehlanpassungsproblem **im Simulator nicht passieren kann**, sodass es der eine Bracket-Fehlerfall ist, über den Sie lernen müssen statt ihn zu erleben. Alles andere — sich vorab auf ein Verhältnis festlegen, dem Drang widerstehen, den Stop zu weiten, entdecken, wie oft ein 2:1-Ziel um ein paar Cent verfehlt — ist vollständig verfügbar.

Führen Sie zwanzig Bracket-Trades durch, bei denen Sie die Niveaus zuerst setzen und nie anpassen, prüfen Sie dann Ihre realisierten Ergebnisse in [Stockades Paper-Trading-Simulator](/de/simulator/) und sehen Sie, wie hoch Ihre tatsächliche Trefferquote sein müsste.
