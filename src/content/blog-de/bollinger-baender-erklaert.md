---
title: "Bollinger-Bänder erklärt: Was die Bänder messen"
description: "Bollinger-Bänder messen Volatilität um einen 20-Perioden-Durchschnitt, nicht überkauft oder überverkauft. Rechnung, Bandberührung, Squeeze und der 95-%-Mythos."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indikatoren", "Technische Analyse"]
slug: "bollinger-baender-erklaert"
translationOf: "bollinger-bands-explained"
---

Der Preis drückt durch das obere Bollinger-Band nach oben. Der Chart wirkt überdehnt, das Band sieht aus wie eine Decke, und ein Verkauf fühlt sich wie der naheliegende Trade an. Dann schließt der Preis Kerze für Kerze weiter am oberen Band, und Ihr Short wird von einer Bewegung ausgestoppt, die nie zurückkam.

Die Bänder haben dort nicht versagt. Sie wurden als etwas gelesen, das sie nicht sind. Bollinger-Bänder messen, wie weit die jüngsten Preise um einen Durchschnitt streuen. Sie messen nicht, ob der Preis zu hoch ist, und ihr Erfinder sagt das ganz offen.

## Wie Bollinger-Bänder berechnet werden

[John Bollinger entwickelte die Bänder in den frühen 1980er-Jahren](https://cmtassociation.org/presenter/john-bollinger/). Sie bestehen aus drei Linien:

```
Mittleres Band = einfacher gleitender 20-Perioden-Durchschnitt der Schlusskurse
Oberes Band    = mittleres Band + 2 × Standardabweichung derselben 20 Schlusskurse
Unteres Band   = mittleres Band − 2 × Standardabweichung derselben 20 Schlusskurse
```

[Bollingers eigene Beschreibung](https://www.bollingerbands.com/bollinger-bands) nennt 20 Perioden und zwei Standardabweichungen als Standardwerte, unverändert, seit er sich darauf festgelegt hat, und ergänzt, dass er für die Standardabweichung die Formel für die Grundgesamtheit verwendet.

Die Standardabweichung ist mit Zahlen leichter nachzuvollziehen. Wir nehmen fünf Schlusskurse statt 20, damit die Rechnung auf einen Bildschirm passt. Angenommen, die letzten fünf Schlusskurse einer hypothetischen Aktie lauten 50 $, 51 $, 49 $, 52 $ und 53 $:

1. **Durchschnitt:** 255 ÷ 5 = 51 $.
2. **Abstand jedes Schlusskurses vom Durchschnitt:** −1, 0, −2, +1, +2.
3. **Quadrieren und den Durchschnitt der Quadrate bilden:** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. Das ist die Varianz.
4. **Die Wurzel ziehen:** √2 = 1,41 $. Das ist die Standardabweichung.
5. **Bänder:** 51 $ ± 2 × 1,41 $, also 48,17 $ und 53,83 $.

Die Division durch 5 in Schritt 3 ist die Formel für die Grundgesamtheit. Die Formel für die Stichprobe teilt stattdessen durch 4, was hier 1,58 $ und etwas weitere Bänder ergäbe. Zwei Charting-Plattformen können sich also leicht unterscheiden, je nachdem, welche Formel sie verwenden.

## Was die Bänder tatsächlich messen

Nehmen Sie jetzt fünf andere Schlusskurse mit demselben Durchschnitt von 51 $: 50,60 $, 51,20 $, 50,80 $, 51,40 $ und 51,00 $. Jeder liegt höchstens 40 Cent vom Durchschnitt entfernt, die Standardabweichung beträgt also nur 0,28 $, und die Bänder liegen bei 50,43 $ und 51,57 $. Gleicher Durchschnitt, Bänder nur ein Fünftel so breit. Das ist die ganze Idee: Die Bänder weiten sich, wenn die Preise auseinanderlaufen, und ziehen sich zusammen, wenn sie dicht beieinanderliegen.

Jetzt der Teil, der viele überrascht. Probieren Sie fünf Schlusskurse, die gleichmäßig um genau 1 $ steigen: 50 $, 51 $, 52 $, 53 $, 54 $. Jede Bewegung beträgt 1 $, im Schnitt weniger als die Sprünge im ersten Beispiel, und doch beträgt die Standardabweichung wieder 1,41 $, und die Bänder sind mit 49,17 $ und 54,83 $ genauso breit. Die Bänder messen, wie weit die Schlusskurse von ihrem *Durchschnitt* entfernt liegen, und ein Trend zieht die Schlusskurse vom Durchschnitt weg, auch wenn jede einzelne Bewegung klein ist.

Damit unterscheiden sie sich von der [ATR](/de/blog/atr-stop-loss-setzen/), die die Größe der Spanne jedes Balkens mittelt. Ein glatter, gleichmäßiger Trend aus kleinen Kerzen würde eine bescheidene ATR und recht breite Bollinger-Bänder zeigen. Keines von beiden ist falsch. Sie beantworten verschiedene Fragen: Die ATR fragt, wie viel sich ein typischer Balken bewegt, und die Bänder fragen, wie weit sich der Preis von seinem jüngsten Durchschnitt entfernt hat.

Die Bandbreite taugt auch als grobe Prüfung für einen Stop. Bei den breiten Bändern aus dem ersten Beispiel, 5,66 $ auseinander, liegt ein Stop 0,50 $ unter Ihrem Einstieg deutlich innerhalb der Spanne, die die Schlusskurse zuletzt abgedeckt haben, sodass gewöhnliche Bewegungen ihn erreichen können. Bei den schmalen Bändern, 1,14 $ auseinander, sind dieselben 0,50 $ fast die Hälfte der Streuung. So oder so gehört der Stop dorthin, wo Ihre Idee widerlegt ist, und die Stückzahl ergibt sich weiterhin aus dem Stop-Abstand, wie im durchgerechneten Beispiel des ATR-Leitfadens.

## Eine Bandberührung ist eine Berührung, kein Signal

Das ist die Fehldeutung vom Anfang, und Bollinger spricht sie direkt an. Unter [seinen Regeln für die Arbeit mit den Bändern](https://www.bollingerbands.com/bollinger-band-rules) steht: „Berührungen der Bänder sind genau das, Berührungen, keine Signale." Eine Berührung des oberen Bands ist für sich allein kein Verkaufssignal, und eine Berührung des unteren Bands kein Kaufsignal. Dieselbe Liste sagt, dass der Preis in Trendmärkten am oberen Band entlang nach oben oder am unteren entlang nach unten laufen kann, und dass Schlusskurse außerhalb der Bänder zunächst Fortsetzungssignale sind, keine Umkehrsignale.

Das passt zu dem, was die Arithmetik sagt. Der Preis erreicht das obere Band nur, indem er deutlich über seinen jüngsten Durchschnitt steigt, und genau so sieht eine starke Bewegung aus. Es ist dieselbe Lektion wie beim [„überkauften" Wert des RSI](/de/blog/rsi-indikator-ueberkauft-ueberverkauft/): Ein hoher Wert beschreibt Stärke, die bereits stattgefunden hat, keine Umkehr, die fällig wäre.

Was Ihnen eine Bandberührung sagt, ist, dass der Preis *im Verhältnis zu seiner eigenen jüngsten Spanne* hoch oder niedrig ist. Das ist Kontext. Ob es ein Grund zum Traden ist, hängt von allem anderen ab: dem Trend, der nächsten [Unterstützung oder dem nächsten Widerstand](/de/blog/unterstuetzung-und-widerstand/) und dem, was Ihr Setup sagt.

## Wo der Preis innerhalb der Bänder steht: %b

Bollingers Regeln beschreiben auch %b, das die Position im Band in eine einzige Zahl übersetzt:

```
%b = (Schlusskurs − unteres Band) ÷ (oberes Band − unteres Band)
```

Am unteren Band ist %b 0, am mittleren Band 0,5 und am oberen Band 1. Schließt der Preis außerhalb der Bänder, fällt %b unter 0 oder steigt über 1. Zurück zum ersten Beispiel: Ein Schlusskurs von 53 $ bei Bändern auf 48,17 $ und 53,83 $ ergibt (53 − 48,17) ÷ 5,66 = 0,85.

Der Wert von %b liegt darin, dass es die Position im Band zwischen Instrumenten und über die Zeit vergleichbar macht, so wie die Division der ATR durch den Preis. Ein Schlusskurs von 53 $ sagt für sich allein nichts; 0,85 sagt, dass er nahe am oberen Rand seiner jüngsten Streuung liegt. Es bleibt eine Position, kein Signal, und alles aus dem vorigen Abschnitt gilt: In einem starken Trend kann %b lange nahe bei 1 oder darüber bleiben.

## Die 95-%-Fehldeutung

Oft heißt es, 95 % der Preise blieben innerhalb der Bänder, alles außerhalb sei also ein seltenes Ereignis, das zurückschnappen müsse. Das stammt von einer echten statistischen Tatsache: Bei einer Normalverteilung liegen etwa 95 % der Werte innerhalb von zwei Standardabweichungen um den Mittelwert.

Preise sind aber nicht normalverteilt, und Bollinger sagt das in denselben Regeln: Ziehen Sie aus der Verwendung der Standardabweichung in den Bändern keine statistischen Annahmen, denn Preisverteilungen sind nicht normal und die Stichproben zu klein für statistische Signifikanz. Er fügt hinzu, dass er in der Praxis bei den Standardeinstellungen typischerweise etwa 90 %, nicht 95 %, der Daten innerhalb der Bänder findet.

Selbst wörtlich genommen bedeuten 90 % innerhalb, dass jeder zehnte Schlusskurs außerhalb landet. Auf Tagesbalken sind das ungefähr zwei Schlusskurse im Monat, also etwas Gewöhnliches, nichts Seltenes. Und nach Bollingers eigenen Regeln ist ein Schlusskurs außerhalb der Bänder zunächst ein Fortsetzungssignal, kein Umkehrsignal.

## Der Squeeze: wenn sich die Bänder verengen

Ein Squeeze ist eine Phase, in der die Bänder ungewöhnlich eng zusammenrücken. Gemessen wird er mit der BandWidth, dem Abstand zwischen den Bändern in Prozent des mittleren Bands:

```
BandWidth = (oberes Band − unteres Band) ÷ mittleres Band × 100
```

Aus den beiden Beispielen mit fünf Schlusskursen oben: (53,83 $ − 48,17 $) ÷ 51 $ × 100 = 11,1 und (51,57 $ − 50,43 $) ÷ 51 $ × 100 = 2,2. Das zweite ist im Vergleich zum ersten ein Squeeze.

„Eng" ist relativ zur eigenen Geschichte des Instruments. [Der BandWidth-Leitfaden von StockCharts](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) schlägt vor, sie an der Spanne der letzten acht bis zwölf Monate zu messen, und sagt, dass der Squeeze selbst keine Richtung vorgibt: Die kommt aus dem Bandbruch, der darauf folgt, und erste Brüche können scheitern.

Trader achten auf Squeezes, weil ruhige Phasen nicht ewig dauern. Wir würden einen Squeeze als Bedingung behandeln, nicht als Auslöser. Er kann Ihnen sagen, dass Sie aufmerksam sein sollten. In welche Richtung Sie traden sollten, kann er Ihnen nicht sagen.

## Einstellungen wählen und das mittlere Band

Die Standardwerte sind ein Ausgangspunkt, kein Gesetz; laut Bollingers Regeln können die richtigen Parameter je nach Markt und Aufgabe verschieden sein. Ändern Sie die Länge, ändern Sie den Multiplikator mit: Seine Regeln nennen 2,1 Standardabweichungen bei 50 Perioden, und StockCharts' [Leitfaden zu Bollinger-Bändern](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) ergänzt 1,9 bei 10 Perioden.

Das mittlere Band ist ein einfacher gleitender Durchschnitt, kein exponentieller. Kennen Sie EMAs aus [dem Leitfaden zu gleitenden Durchschnitten](/de/blog/gleitende-durchschnitte-ema-vs-sma/), wissen Sie: Die beiden verlaufen eng beieinander, sind aber nicht dieselbe Linie, und ein EMA reagiert schneller auf die jüngsten Schlusskurse. Bollingers Regeln sagen außerdem, dass das mittlere Band den mittelfristigen Trend beschreiben soll, statt für Kreuzungen optimiert zu werden.

Wollen Sie neben den Bändern eine zweite Meinung, wählen Sie eine, die etwas anderes misst. Bollingers eigene Liste warnt, dass zwei Momentum-Indikatoren nicht besser sind als einer. RSI und [MACD](/de/blog/macd-erklaert/) beide neben die Bänder zu legen, bringt also weniger, als es scheint: Beide messen Momentum.

## Üben Sie das im Simulator

Stockade zeichnet keine Bollinger-Bänder. Seine Charts haben EMA 9, 20 und 50, VWAP, RSI und MACD. Jedes Symbol läuft mit einer einzigen Volatilitätseinstellung, skaliert auf seinen Preis, es gibt also keine Volatilitätszyklen wie im echten Markt. Die Preisschwankungen variieren trotzdem: Sie nehmen zufällig zu und ab und werden breiter, wenn die verborgene Trendneigung stark ist. Ziehen sich Bänder, die Sie aus Stockades Schlusskursen berechnen, also zu etwas zusammen, das wie ein Squeeze aussieht, ist das diese zufällige Schwankung, nicht die Art Volatilitätszyklus, die ein Squeeze erfassen soll. Üben können Sie die Rechnung und die Hälfte mit dem gleitenden Durchschnitt. Fahren Sie im [Chart-Simulator](/de/chart-simulator/) mit dem Mauszeiger über die letzten 20 Kerzen und übertragen Sie jeden Schlusskurs aus der Anzeigeleiste in eine Tabelle. Berechnen Sie den Durchschnitt und die Standardabweichung der Grundgesamtheit (in den meisten deutschsprachigen Tabellenprogrammen MITTELWERT und STABW.N), markieren Sie, wo die Bänder lägen, und vergleichen Sie diesen 20-Perioden-SMA mit der Linie des EMA 20 im Chart. Machen Sie das einmal auf einer Strecke mit Trend und einmal auf einer, die seitwärts pendelt, und sehen Sie, wie der Trend die Bänder weitet. Nehmen Sie dann dieselbe Gewohnheit in den [Simulator](/de/simulator/) mit: Bevor Sie auf einen überdehnten Preis reagieren, fragen Sie, wie weit er von seinem Durchschnitt entfernt ist und ob dieser Abstand ungewöhnlich ist oder nur ein Trend.
