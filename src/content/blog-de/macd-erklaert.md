---
title: "MACD erklärt: Wie man MACD liest und damit tradet"
description: "MACD sind zwei gleitende Durchschnitte, ihre Differenz, und eine geglättete Kopie dieser Differenz. So berechnen, lesen Sie ihn, und wissen, wann er lügt."
date: 2026-04-27
tags: ["Indikatoren"]
slug: "macd-erklaert"
translationOf: "macd-explained"
---

Sie beobachten, wie ein Chart steigt, und können die einzige Frage nicht beantworten, die zählt: Gewinnt diese Bewegung noch an Kraft, oder rollt sie nur aus? Eine Aktie kann fünf höhere Schlusskurse in Folge drucken, während jeder dieser Schlusskurse weniger Boden gutmacht als der davor — Trend intakt, Motor stirbt. Bis das im Preis sichtbar wird, ist es meist zu spät, um zu handeln.

MACD existiert für diese Lücke. Er sagt Ihnen nicht, wo der Preis ist. Er sagt Ihnen, ob sich der *Abstand zwischen zwei gleitenden Durchschnitten* verbreitert oder verengt, was ein grober Proxy dafür ist, ob eine Bewegung beschleunigt oder abbremst. Das ist eine engere Aufgabe, als die meisten ihm zuschreiben, und dieses Verständnis der Enge trennt die Nutzung von MACD davon, von ihm getäuscht zu werden.

## Die drei Komponenten und wie jede berechnet wird

MACD steht für Moving Average Convergence Divergence — ein ehrlicher Name, denn der gesamte Indikator handelt davon, dass zwei gleitende Durchschnitte konvergieren oder divergieren. Er hat drei Teile, jeder auf dem vorherigen aufgebaut.

<div class="table-wrap">

| Komponente | Formel | Was sie misst |
|---|---|---|
| MACD-Linie | 12-Perioden-EMA − 26-Perioden-EMA | Die Lücke zwischen schnellem und langsamem Trend |
| Signallinie | 9-Perioden-EMA der MACD-Linie | Eine geglättete Version dieser Lücke |
| Histogramm | MACD-Linie − Signallinie | Ob sich die Lücke verbreitert oder verengt |

</div>

### Die MACD-Linie

Nehmen Sie einen exponentiellen gleitenden Durchschnitt der letzten 12 Balken und einen der letzten 26 Balken, und subtrahieren Sie den langsameren vom schnelleren. Wie ein EMA jüngere Balken stärker gewichtet als alte, siehe [gleitende Durchschnitte: EMA vs. SMA](/blog/moving-averages-ema-vs-sma/).

Konkret: Ist der 12-Perioden-EMA 188,40 und der 26-Perioden-EMA 186,90, zeigt die MACD-Linie 188,40 − 186,90 = **1,50**. Der schnelle Durchschnitt liegt 1,50 $ über dem langsamen. Diese Zahl steht in den eigenen Einheiten des Preises — hier Dollar, keine Prozentzahl und keine begrenzte 0-bis-100-Skala wie [RSI](/blog/rsi-indicator-overbought-oversold/). Eine 400-$-Aktie erzeugt routinemäßig MACD-Werte zehnmal größer als eine 40-$-Aktie, weshalb MACD-Werte nie über Instrumente hinweg vergleichbar sind.

### Die Signallinie

Die MACD-Linie ist sprunghaft, also wendet MACD einen zweiten Glättungsdurchgang an: einen 9-Perioden-EMA der MACD-Linie selbst. Das ist die Signallinie, und sie hinkt der MACD-Linie konstruktionsbedingt hinterher, da sie ein Durchschnitt der jüngsten Historie dieser Linie ist.

Die EMA-Glättungskonstante ist 2 ÷ (Periode + 1), sodass die Signallinie 2 ÷ 10 = 0,20 nutzt — jeder neue Wert ist der alte plus 20 % der Distanz zum aktuellen MACD-Wert. War die Signallinie bei 1,20 und die MACD-Linie druckt 1,72, ist das neue Signal 1,20 + 0,20 × (1,72 − 1,20) = 1,20 + 0,104 = 1,304.

### Das Histogramm

Das Histogramm ist der einfachste Teil: MACD-Linie minus Signallinie, gezeichnet als Balken über und unter null. Bei einer MACD-Linie von 1,50 und einer Signallinie von 1,20 ist der Histogrammbalken 1,50 − 1,20 = **0,30**.

Da das Histogramm als diese Differenz definiert ist, kreuzt es die Null bei genau demselben Balken, an dem die MACD-Linie die Signallinie kreuzt. Sie sind ein Ereignis, zweimal gezeichnet. Wer behauptet, ein Histogramm-Nulldurchgang *bestätige* einen Signallinien-Kreuzung, beschreibt dasselbe zweimal.

## Warum die Einstellungen 12, 26 und 9 sind

Diese Zahlen sind Konvention, keine Mathematik. Gerald Appel wählte sie, als er MACD in den späten 1970ern entwickelte, und sie sind seitdem der Standard. Es gibt keine Herleitung zu rekonstruieren: Keine Eigenschaft der Märkte macht 12 und 26 besonders, und Sie werden keine Berechnung finden, die darauf landet. Ordentlich klingende Ursprungsgeschichten kursieren — dass sie auf eine hübsche Anzahl von Wochen oder Sessions abbilden —, aber das ist nachträglich erfundene Folklore, um eine Wahl zu erklären, die einfach eine Wahl war. Was zählt, ist, was die Zahlen kontrollieren: 12 und 26 legen fest, wie schnell und wie langsam die zwei Durchschnitte sind, und 9 legt fest, wie viel Glättung obendrauf sitzt.

Sie zählen heute vor allem, weil so viele Menschen sie nutzen. Ein Standard, den Millionen Bildschirme anzeigen, wird leicht selbsterfüllend: Wenn eine viel beachtete Kreuzung druckt, handeln manche Trader danach und legen echte Orders hinter eine willkürliche Zahl. Das ist ein schwacher Effekt, kein Gesetz, aber er schlägt jede Behauptung, die Einstellungen seien optimal.

Sie können sie ändern. Verkürzt auf 6/13/5 wird MACD nervöser und früher — mehr Signale, mehr davon falsch. Verlängert auf 19/39/9 wird er langsamer und sauberer — weniger Signale, später. Keins ist besser; Sie wählen nur, wo auf der Kurve zwischen Reaktionsfreude und Rauschen Sie sitzen. Was Sie nicht tun sollten, ist die Einstellungen so lange zu justieren, bis sie die letzten drei Bewegungen im Chart vor Ihnen einfangen. Das ist Curve-Fitting, und es beschreibt Geschichte, statt irgendetwas vorherzusagen.

## Nulllinien-Kreuzungen versus Signallinien-Kreuzungen

Das sind unterschiedliche Ereignisse mit unterschiedlichen Bedeutungen, und sie zu vermischen ist der häufigste MACD-Fehler.

**Die MACD-Linie kreuzt die Null**, wenn der 12-EMA den 26-EMA gekreuzt hat — eine schlichte gleitende-Durchschnitte-Kreuzung, nur umformuliert. Über null liegt der schnelle Durchschnitt über dem langsamen; unter null umgekehrt. Es ist eine Aussage über Trendrichtung, und weil sie den langsamen 26-Perioden-Durchschnitt einbezieht, ist sie spät.

**Die MACD-Linie kreuzt die Signallinie**, wenn sich die aktuelle Lücke zwischen den Durchschnitten von ihrem eigenen jüngsten Durchschnittsabstand entfernt hat. Es ist eine Aussage über einen Dynamikwechsel und feuert früher als die Nullkreuzung — oft viel früher, und oft, wenn überhaupt kein Trendwechsel stattfindet.

Die praktische Lesart: Eine bullische Signalkreuzung, während MACD deutlich unter null sitzt, ist bis zum Beweis des Gegenteils ein Abpraller innerhalb eines Abwärtstrends. Dieselbe Kreuzung, während MACD über die Null nach oben drückt, ist eine stärkere Aussage, weil zwei Dinge übereinstimmen. Signalkreuzungen danach zu filtern, auf welcher Seite der Null sie auftreten, senkt Ihre Signalanzahl scharf, was der Sinn ist.

## Das Histogramm lesen, und die Falle darin

Hier ist die Nuance, die das Histogramm lohnenswert macht. Gehen Sie fünf Balken einer Rally durch:

<div class="table-wrap">

| Balken | Preis | MACD-Linie | Signallinie | Histogramm |
|---|---|---|---|---|
| 1 | 190,10 | 1,50 | 1,20 | 0,30 |
| 2 | 192,40 | 1,72 | 1,30 | 0,42 |
| 3 | 194,30 | 1,85 | 1,41 | 0,44 |
| 4 | 195,60 | 1,90 | 1,51 | 0,39 |
| 5 | 196,20 | 1,88 | 1,58 | 0,30 |

</div>

Der Preis stieg bei jedem einzelnen Balken, 190,10 auf 196,20. Aber das Histogramm erreichte seinen Höhepunkt bei 0,44 auf Balken 3 und schrumpfte auf den Balken 4 und 5 zurück auf den Ausgangswert.

**Ein schrumpfendes Histogramm bedeutet nicht, dass der Preis fällt. Es bedeutet, dass der Preis langsamer steigt als zuvor.** Die Bewegung bremst ab, während sie sich noch bewegt. Auf Balken 5 tickte die MACD-Linie sogar herunter, 1,90 auf 1,88, obwohl der Preis einen weiteren höheren Schluss verbuchte — die zwei Durchschnitte haben begonnen zu konvergieren.

Das ist wirklich nützlich, und es ist auch, wo Menschen sich wehtun. Verlangsamung ist keine Umkehr. Ein Trend, der abbremst, kann abflachen, sich zwanzig Balken lang konsolidieren und dann fortsetzen. Schrumpfende Balken sind ein Grund, einen Stop zu straffen oder eine Position nicht weiter aufzustocken; jeden davon als Short-Signal zu behandeln bringt Sie dazu, wiederholt gegen starke Trends zu kämpfen.

Druckte Balken 6 einen MACD von 1,60, würde sich die Signallinie auf 1,5876 bewegen und das Histogramm auf etwa 0,01 — fast flach, immer noch positiv. Ein MACD von 1,40 auf Balken 7 zieht das Signal auf 1,5500 und das Histogramm auf −0,15: die tatsächliche Kreuzung, drei Balken nachdem das Histogramm Sie zuerst gewarnt hatte.

## MACD-Divergenz und ihr Wert

Divergenz ist, wenn Preis und MACD sich über die Richtung uneinig sind.

**Bärische Divergenz:** Der Preis macht ein höheres Hoch, aber der entsprechende Höhepunkt der MACD-Linie ist niedriger als sein vorheriger Höhepunkt. Das neue Preishoch wurde mit weniger Dynamik dahinter erreicht.

**Bullische Divergenz:** Der Preis macht ein tieferes Tief, während die MACD-Linie ein höheres Tief macht. Der Verkaufsdruck lässt nach, obwohl der Preis weiter sinkt.

Divergenz ist es wert, beobachtet zu werden, und ist es nicht wert, allein gehandelt zu werden. Starke Trends erzeugen sie über lange Strecken — ein Aufwärtstrend kann über Dutzende Balken bärische Divergenz zeigen, während er neue Hochs macht, weil der anfängliche Schub einen Momentum-Höhepunkt setzte, den der Trend nie wieder erreichen muss. Divergenz sagt Ihnen, dass eine Bewegung müde ist, nicht, dass sie vorbei ist.

Sie wird glaubwürdiger, wenn etwas Unabhängiges zustimmt: eine gebrochene Trendlinie, ein Scheitern an einem Niveau, das zuvor hielt, oder ein Volumenmuster, das der Preisbewegung widerspricht. [Volumen](/blog/understanding-trading-volume/) ist hier nützliche Bestätigung, genau weil es aus einem anderen Input stammt als MACD. Zwei Indikatoren, abgeleitet aus denselben Schlusskursen, die übereinstimmen, ist keine Bestätigung; es ist Arithmetik.

## Warum MACD doppelt nachläuft und in Seitwärtsmärkten versagt

Zwei strukturelle Schwächen, beide dauerhaft.

**Es ist Nachlauf auf Nachlauf gebaut.** Ein EMA ist bereits rückwärtsgewandt — der 26-Perioden-EMA hat einen Schwerpunkt etwa zwölfeinhalb Balken zurück. MACD subtrahiert zwei davon und glättet das Ergebnis dann mit einem *dritten* EMA, um die Signallinie zu bilden. Jede Kreuzung beschreibt etwas, das bereits geschehen ist. Nichts an MACD ist vorhersagend; er komprimiert jüngste Kursgeschichte auf eine Zahl, und die Komprimierung braucht Zeit.

**Er erzeugt in Seitwärtsmärkten ständig Fehlsignale.** MACDs Prämisse ist, dass es einen Trend zu messen gibt. Oszilliert der Preis in einer Range, sitzen die zwei EMAs fast übereinander, die MACD-Linie schwebt nahe null, und sie kreuzt alle paar Balken die Signallinie hin und her. Jede Kreuzung sieht identisch zu einer echten aus. Ein wackeliger Nachmittag kann acht Kreuzungen erzeugen, alle Rauschen, und sie zu nehmen kostet Sie Spread und Kommissionen, bevor Richtung überhaupt ins Bild kommt.

Die Standardverteidigung ist, MACD-Signale nur in Richtung eines längerfristigen Trends zu nehmen — zum Beispiel nur bullische Kreuzungen, während der Preis über seinem 50-Perioden-EMA liegt. Eine günstigere ist zu prüfen, ob die MACD-Linie überhaupt weit von null entfernt ist; Kreuzungen mit kaum sichtbaren Histogrammbalken zählen selten.

## Üben Sie das im Simulator

Über ein schrumpfendes Histogramm zu lesen ist nicht dasselbe, wie eines zu bemerken, während eine Position offen und im Plus ist. Schalten Sie MACD ein und beobachten Sie das Histogramm durch eine vollständige Bewegung — markieren Sie den Balken, an dem es seinen Höhepunkt erreicht, und zählen Sie dann, wie viele weitere Balken der Preis kletterte, bevor die MACD-Linie tatsächlich kreuzte. Diese Lücke ist Ihr Nachlauf, gemessen statt beschrieben.

Traden Sie es dann. Entscheiden Sie bei jeder gedruckten Signallinien-Kreuzung vor dem nächsten Balken, ob Sie sie nehmen würden, und notieren Sie, auf welcher Seite der Null sie passierte. Tun Sie das dreißig Mal, und Sie haben Ihre eigene Zählung, wie viele Kreuzungen in Seitwärtsphasen es wert waren, danach zu handeln — überzeugender als alles hier. Jeder Preis auf Stockade wird algorithmisch generiert statt von einem echten Markt bezogen, sodass Sie das Lesen trainieren, keine Prognose. Und seien Sie ehrlich: Mit 100.000 $ virtuellem Handelskapital ist es weit leichter, ein schrumpfendes Histogramm auszusitzen, als es mit Geld sein wird, das wirklich Ihnen gehört. Beginnen Sie auf [Stockades Börsensimulator](/de/simulator/).
