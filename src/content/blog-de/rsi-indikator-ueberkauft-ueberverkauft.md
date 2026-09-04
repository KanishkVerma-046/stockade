---
title: "RSI-Indikator: Überkaufte und überverkaufte Zustände erkennen"
description: "RSI über 70 ist kein Verkaufssignal. Was RSI tatsächlich misst, warum überkauft stark bedeutet, und wie man Divergenz liest, ohne sich zu täuschen."
date: 2026-04-20
tags: ["Indikatoren"]
slug: "rsi-indikator-ueberkauft-ueberverkauft"
translationOf: "rsi-indicator-overbought-oversold"
---

Hier ist ein Trade, den fast jeder einmal macht. Eine Aktie ist eine Woche lang stark gelaufen. Sie fügen dem Chart RSI hinzu, sehen ihn bei 78 sitzen, und erinnern sich an die Regel: über 70 ist überkauft, überkauft bedeutet verkaufen. Also shorten Sie sie. In den nächsten zwei Wochen legt die Aktie weitere 22 % zu, RSI fällt nie unter 68, und Sie decken sich mit einem Verlust ein, der größer ist als die Bewegung, die Sie einfangen wollten.

Die Regel war nicht falsch, genau genommen — Sie hatten die falsche Vorstellung davon, was sie sagt. RSI bei 78 ist nicht der Markt, der Ihnen sagt, eine Umkehr komme. Er sagt Ihnen, dass Käufer Verkäufer vierzehn Balken lang überwältigt haben, was eine Beschreibung von Stärke ist, keine Vorhersage von Schwäche. Ihn als Verkaufssignal zu handeln bedeutet, systematisch gegen das Stärkste auf dem Bildschirm zu wetten.

## Was RSI tatsächlich misst

Der Relative Strength Index, veröffentlicht von J. Welles Wilder 1978, beantwortet eine enge Frage: Wie verhalten sich über die letzten N Balken die durchschnittlichen Aufwärtsbewegungen zu den durchschnittlichen Abwärtsbewegungen? Das ist wirklich alles, was er tut. Er nimmt die Schluss-zu-Schluss-Veränderung jedes Balkens über ein Rückblickfenster — standardmäßig 14 Balken —, trennt sie in Gewinne und Verluste, mittelt jede Gruppe und vergleicht sie als Verhältnis namens RS, für relative Stärke:

```
RS = durchschnittlicher Gewinn / durchschnittlicher Verlust
```

Und dieses Verhältnis wird auf eine 0–100-Skala gequetscht:

```
RSI = 100 - (100 / (1 + RS))
```

Rechnen Sie eins durch. Angenommen, über die letzten 14 Balken beträgt der durchschnittliche Gewinn im Fenster 2,40 $ und der durchschnittliche Verlust 1,20 $. Aufwärtsbewegungen laufen doppelt so groß wie Abwärtsbewegungen:

- RS = 2,40 / 1,20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33,3 = **66,7**

Zwei Details zu diesen Durchschnitten. Erstens teilen sie durch die volle Rückblickperiode, nicht durch die Anzahl der Aufwärtsbalken — neun Aufwärtsbalken mit insgesamt 21,60 $ ergeben einen Durchschnittsgewinn von 21,60 / 14 = 1,54 $, nicht 2,40 $. Zweitens nutzt Wilder nach der ersten Berechnung einen geglätteten laufenden Durchschnitt statt einer Neuberechnung von Grund auf: Jeder neue Durchschnitt ist der vorherige Durchschnitt mal 13, plus der Wert des neuesten Balkens, alles geteilt durch 14. Diese Glättung ist, warum sich RSI weniger ruckartig bewegt als der rohe Preis.

## Warum die 0–100-Skala nicht so linear ist, wie Sie erwarten

Die Formel presst ein unbegrenztes Verhältnis in einen begrenzten Bereich, und sie tut das ungleichmäßig. Es lohnt sich, drei Ankerpunkte auswendig zu lernen:

<div class="table-wrap">

| Bedingung | RS | RSI |
|---|---|---|
| Durchschnittsgewinn gleich Durchschnittsverlust | 1,00 | 50,0 |
| Durchschnittsgewinn ist 2,33× Durchschnittsverlust | 2,33 | 70,0 |
| Durchschnittsgewinn ist 0,43× Durchschnittsverlust | 0,43 | 30,0 |

</div>

Prüfen Sie die mittlere Zeile: 1 + 2,333 = 3,333, und 100 / 3,333 = 30, also RSI = 100 − 30 = 70. Die untere Zeile: 1 + 0,4286 = 1,4286, und 100 / 1,4286 = 70, also RSI = 30.

Beachten Sie, was das bedeutet. Um 70 zu drucken, müssen Aufwärtsbewegungen nur etwas mehr als doppelt so groß sein wie Abwärtsbewegungen — ein häufiger Zustand, kein extremer. Ab diesem Punkt staucht sich die Skala stark: Von 70 auf 90 zu drücken erfordert, dass RS von 2,33 auf 9 geht, eine weit größere Verschiebung im zugrunde liegenden Markt, als die Zwanzig-Punkte-Bewegung auf dem Display nahelegt.

## Warum 70 und 30 Konventionen sind, keine Gesetze

Wilder wählte 70 und 30. Er hätte 75 und 25 wählen können. Es gibt keine Herleitung dahinter, keine statistische Schwelle, an der sich Verhalten ändert, keinen Mechanismus, der bei 70,0 ein- und bei 69,9 ausschaltet. Es sind runde Zahlen, die auf den Charts, die er in den 1970ern studierte, vernünftig aussahen, und sie blieben, weil jeder die Standards kopierte. Die meiste Chart-Software zeichnet diese Linien für Sie, was die Vorstellung, sie seien Grenzen, still verstärkt. Stockades Chart tut dasselbe — schalten Sie das untere Panel auf RSI, bekommen Sie gestrichelte Linien bei 70 und 30. Es sind Referenzmarken, keine Urteile.

Dasselbe gilt für die 14-Perioden-Rückblickzeit. Eine kürzere Einstellung wie 7 reagiert schneller und trifft ständig die Extreme; eine längere wie 21 erreicht sie selten. Die Periode ändert, wie oft Sie ein Signal sehen, nicht wie verlässlich es ist — derselbe Kompromiss, der [die Wahl einer gleitenden-Durchschnitts-Länge](/blog/moving-averages-ema-vs-sma) bestimmt.

## Überkauft bedeutet stark, nicht „kurz vor der Umkehr"

Das ist der Punkt, den der Eröffnungstrade falsch verstanden hat, und er verdient seine eigene Arithmetik.

Stellen Sie sich einen starken Aufwärtstrend vor: Über die Rückblickzeit schlossen 12 Balken im Plus und 2 im Minus. Gewinne summieren sich auf 28,00 $, Verluste auf 2,80 $.

- Durchschnittsgewinn = 28,00 / 14 = **2,00 $**
- Durchschnittsverlust = 2,80 / 14 = **0,20 $**
- RS = 2,00 / 0,20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9,1 = **90,9**

Fragen Sie nun, was nötig wäre, um RSI wieder unter 70 zu drücken. Aus der Tabelle oben muss RS von 10 auf 2,33 fallen — Durchschnittsverluste müssten sich relativ zu Durchschnittsgewinnen mehr als vervierfachen. In einem geglätteten 14-Balken-Durchschnitt braucht das viele Balken echt anderen Verhaltens. Es passiert nicht, weil die Aktie eine rote Kerze hatte.

RSI *toleriert* also nicht nur, über 70 in einem Trend zu bleiben; er ist arithmetisch dort fixiert, bis sich der Charakter der Bewegung ändert. Trader nennen das RSI-„Embedding." Ein Wert von 90 sagt, der Trend ist ungewöhnlich sauber, und ein sauberer Trend ist das Letzte, wogegen Sie fighten wollen.

Es gibt eine subtilere Version derselben Falle. Angenommen, RSI sitzt bei 66,7 (Durchschnittsgewinn 2,40 $, Durchschnittsverlust 1,20 $), und der nächste Balken schließt 1,00 $ im Plus. Wenden Sie die Glättung an: Der neue Durchschnittsgewinn ist (2,40 × 13 + 1,00) / 14 = 32,20 / 14 = 2,30 $, und der neue Durchschnittsverlust ist (1,20 × 13 + 0) / 14 = 15,60 / 14 = 1,114 $. RS = 2,30 / 1,114 = 2,064, also RSI = 100 − (100 / 3,064) = **67,4**.

Der Preis stieg, und RSI bewegte sich kaum, weil der Gewinn kleiner war als der laufende Durchschnittsgewinn. RSI verfolgt Dynamik, nicht Preis. Er kann seitwärts driften oder fallen, während der Preis neue Hochs macht — genau das Setup, das man Divergenz nennt.

## Wie man RSI-Divergenz liest

Divergenz ist eine Uneinigkeit zwischen Preis und Dynamik.

**Bärische Divergenz:** Der Preis macht ein höheres Hoch, RSI macht ein niedrigeres Hoch. Der Preis kam weiter, aber mit weniger Kraft dahinter als beim letzten Mal.

**Bullische Divergenz:** Der Preis macht ein tieferes Tief, RSI macht ein höheres Tief. Verkäufer drückten den Preis erneut nach unten, aber mit weniger Überzeugung.

Um eine zu lesen, markieren Sie zwei Swing-Punkte derselben Art im Preis — zwei klare Hochs oder zwei klare Tiefs — und vergleichen Sie RSI bei jedem. Es zählt nur, wenn die zwei vergleichbare Swings mit einem echten Rücksetzer dazwischen sind; Linien zwischen willkürlichen Balken zu ziehen erzeugt auf fast jedem Chart eine Divergenz, weshalb sie im Nachhinein so leicht zu sehen sind.

Seien Sie direkt über die Trefferrate: Divergenz versagt oft, und sie versagt am schlimmsten genau dort, wo sie am verlockendsten aussieht. Ein starker Trend druckt auf dem Weg nach oben drei oder vier bärische Divergenzen, und nur die letzte markiert überhaupt etwas — jede frühere ist eine Falle, die Geld kostet. Behandeln Sie Divergenz als Grund, einen Stop zu straffen oder einen Gewinner nicht weiter aufzustocken, nicht als eigenständigen Einstieg gegen den Trend. Stärke bei einem Divergenzsignal zu faden ist eine der [teureren Gewohnheiten, die neue Trader entwickeln](/blog/common-day-trading-mistakes).

## Die 50-Linie als Trendfilter nutzen

Das nützlichste RSI-Niveau ist das, das niemand einzeichnet. RSI 50 ist, wo Durchschnittsgewinne exakt Durchschnittsverlusten entsprechen. Darüber gewinnen Aufwärtsbewegungen; darunter Abwärtsbewegungen.

Das macht 50 zu einem billigen Regimefilter:

- **RSI dauerhaft über 50** — behandeln Sie 30 als unerreichbar und suchen Sie nicht länger nach überverkauften Longs. In einem Aufwärtstrend tendieren Rücksetzer dazu, um 40–50 herum den Boden zu finden.
- **RSI dauerhaft unter 50** — das Spiegelbild. Rallys stocken nahe 50–60 und erreichen nie 70.

Diese Asymmetrie ist handlungsrelevanter als die Extreme. In einem Aufwärtstrend ist ein RSI-Rückgang auf 45, der hält und nach oben dreht, ein Rücksetzer, der innerhalb eines starken Trends endet. Dort auf 30 zu warten bedeutet, auf einen Wert zu warten, den der Trend nicht erzeugen wird.

### Die Schwellen auf 80/20 verschieben

Akzeptieren Sie einmal, dass die Schwellen Konventionen sind, ist ihre Anpassung offensichtlich. In einem stark trendenden Markt verschieben Sie die Bänder auf 80 und 20. Sie bekommen weit weniger Signale, und die, die Sie bekommen, markieren wirklich ungewöhnliche Werte statt routinemäßige Trendstärke. In einem rangebegrenzten Markt funktioniert der Standard 70/30 besser, weil Mean Reversion dort tatsächlich das dominante Verhalten ist.

Die Reihenfolge zählt: Identifizieren Sie zuerst das Regime, wählen Sie dann die Schwellen. RSI zu nutzen, um Ihnen das Regime zu sagen, und dann denselben RSI zu nutzen, um dagegen zu traden, ist zirkuläre Logik.

## Was RSI nicht kann

RSI ist vollständig aus Schlusskursen gebaut, die Sie bereits gesehen haben. Es ist ein nachlaufendes, abgeleitetes Maß — jeder Wert ist eine Tatsache über die Vergangenheit. Er sieht kein Intrabar-Geschehen und trägt keine Information, die nicht bereits in der Preisreihe steckt.

Er hat auch keine Vorstellung davon, *warum* sich Preise bewegten. Ein Wert von 90,9 aus einem stetigen Anstieg und einer aus einem einzigen Gap sehen für die Formel identisch aus. Das ist ein guter Grund, RSI zusammen mit Preisstruktur und Volumen zu lesen und zu wissen, wie er sich von [MACD](/blog/macd-explained) unterscheidet, das die Spanne zwischen zwei gleitenden Durchschnitten misst statt eines Gewinn/Verlust-Verhältnisses.

## Üben Sie das Lesen von RSI im Simulator

Der schnellste Weg, „70 bedeutet verkaufen" zu verlernen, ist zu beobachten, wie RSI vierzig Balken lang über 70 sitzt, während der Preis klettert. Öffnen Sie [Stockades Börsensimulator](/de/simulator/), schalten Sie das untere Chart-Panel von Volumen auf RSI, und finden Sie eine Strecke, wo sich die Linie über 70 einbettet — notieren Sie dann, wie weit der Preis läuft, bevor RSI zu 50 zurückkehrt. Machen Sie auch die umgekehrte Übung: Markieren Sie jede bärische Divergenz auf einem steigenden Chart und zählen Sie, wie viele tatsächlich einem Rückgang vorausgingen. Die Preise sind algorithmisch generiert statt echte Marktdaten, aber die Indikator-Arithmetik ist identisch, und diese Zählung wird ändern, wie Sie das Werkzeug nutzen.
