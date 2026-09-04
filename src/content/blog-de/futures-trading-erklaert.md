---
title: "Futures-Trading erklärt: Kontrakte, Margin und Hebel"
description: "Was ein Futures-Kontrakt wirklich ist, wie Tick-Größe und Multiplikator funktionieren, warum Margin eine Kaution ist statt ein Kredit, und wie Hebel wirkt."
date: 2026-07-27
tags: ["Futures", "Risikomanagement"]
slug: "futures-trading-erklaert"
translationOf: "futures-trading-explained"
---

Ein Trader mit 20.000 $ eröffnet ein Futures-Konto, kauft einen E-mini-S&P-500-Kontrakt bei 5.248,75, und beobachtet, wie der Index in der nächsten Session um etwa 2 % fällt. Er erwartete, etwa 2 % von irgendetwas zu verlieren. Was er tatsächlich verlor, waren 5.248,75 $ — mehr als ein Viertel des Kontos —, weil die Position nie 20.000 $ von irgendetwas war. Es waren 262.437,50 $ Index-Exposition, kontrolliert durch eine Einzahlung.

Diese Lücke zwischen dem, was Sie einzahlen, und dem, was Sie kontrollieren, ist das ganze Thema von Futures. Alles andere — Tick-Werte, Verfallsmonate, Contango — ist Detail, das darauf aufbaut.

## Ein Futures-Kontrakt ist eine Verpflichtung, kein Eigentumsanteil

Kaufen Sie eine Aktie, kaufen Sie einen anteiligen Anspruch auf ein Unternehmen. Sie besitzen etwas. Es kann auf null fallen, aber nicht darunter, und niemand schickt Ihnen eine Rechnung.

Ein Futures-Kontrakt ist ein völlig anderes Objekt: eine standardisierte, börsengehandelte Vereinbarung, eine bestimmte Menge von etwas zu einem bestimmten Datum und Preis zu kaufen oder zu verkaufen. Einen /CL-Kontrakt zu kaufen verpflichtet Sie, bei Verfall 1.000 Barrel Rohöl anzunehmen. Einen zu verkaufen verpflichtet Sie, sie zu liefern. Sie besitzen währenddessen nichts — Sie halten eine zweiseitige Verpflichtung, und die Gegenpartei hält das Spiegelbild.

„Standardisiert" ist es, was den Markt funktionieren lässt. Jeder /CL-Kontrakt sind 1.000 Barrel derselben Sorte zu denselben Bedingungen, sodass Kontrakte austauschbar sind: Sie steigen aus, indem Sie einen verkaufen, den Sie gekauft haben, nicht indem Sie sich aus einer Vereinbarung herausverhandeln, und die Clearingstelle steht zwischen jedem Käufer und Verkäufer. Fast niemand nimmt Lieferung an — Retail-Trader schließen oder rollen vor Verfall. Aber die Lieferverpflichtung verankert den Preis am zugrunde liegenden Markt, und deshalb verlangt die Börse eine Einzahlung, bevor sie Ihnen erlaubt, einen zu halten.

## Kontraktspezifikationen: Multiplikator, Tick-Größe und Tick-Wert

Ein Futures-Preis ist kein Dollarbetrag. Es ist eine Zahl, die Sie über den Multiplikator des Kontrakts in Dollar übersetzen. Stockade führt vier Futures-Symbole unter `/simulator` und `/markets`, und jedes übersetzt sich anders.

<div class="table-wrap">

| Symbol | Kontrakt | Multiplikator | Tick-Größe | Tick-Wert | Preis | Nominal |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | 50 $ pro Indexpunkt | 0,25 Pkt | 12,50 $ | 5.248,75 | 262.437,50 $ |
| /NQ | E-mini Nasdaq 100 | 20 $ pro Indexpunkt | 0,25 Pkt | 5,00 $ | 18.421,25 | 368.425,00 $ |
| /CL | Rohöl | 1.000 Barrel | 0,01 $ | 10,00 $ | 78,34 | 78.340,00 $ |
| /GC | Gold | 100 Feinunzen | 0,10 $ | 10,00 $ | 2.341,40 | 234.140,00 $ |

</div>

Rechnen Sie eine Zeile von Hand durch. /ES bei 5.248,75 mit einem Multiplikator von 50 $ sind 5.248,75 × 50 = **262.437,50 $** nominale Exposition pro Kontrakt. Die Mindestschrittweite sind 0,25 Indexpunkte, und 0,25 × 50 = **12,50 $** pro Tick. Bewegt sich der Preis zehn Ticks zu Ihren Gunsten — 2,5 Indexpunkte —, haben Sie 125 $ verdient.

Die Spezifikationen zu verwechseln ist teuer. /NQ tickt in derselben 0,25-Schrittweite wie /ES, aber bei einem Multiplikator von 20 $ ist jeder Tick 5,00 $ wert, nicht 12,50 $ — und /NQ bewegt sich pro Tag um weit mehr Punkte, sodass der kleinere Tick-Wert es nicht zum kleineren Risiko macht. /CL und /GC teilen sich einen Tick-Wert von 10 $ auf völlig unterschiedlichen Wegen: ein Cent auf 1.000 Barrel, und ein Dime auf 100 Unzen.

Der Nominalwert ist nicht das, was Sie verlieren können — ein Kontrakt fällt so wenig auf null wie der S&P. Aber der Nominalwert ist es, worauf Ihr P&L berechnet wird, und die Zahl, gegen die Hebel gemessen wird.

## Warum Futures-Margin eine Kaution ist, kein Kredit

Das ist der am meisten missverstandene Punkt bei Futures, und hier führt Ihre Aktien-Intuition Sie aktiv in die Irre.

In einem Aktien-Margin-Konto ist Margin geliehenes Geld. Sie hinterlegen 30.000 $, der Broker leiht Ihnen 30.000 $, Sie kaufen 60.000 $ Aktien, und Sie zahlen Zinsen. Die Aktie ist Sicherheit. Es ist eine Schuld und verhält sich wie eine.

Futures-Margin ist kein Kredit. Nichts wird geliehen, und keine Zinsen fallen an, weil nichts gekauft wurde — Sie sind eine Vereinbarung eingegangen, Sie haben kein Asset gekauft. Die Margin, die Sie hinterlegen, ist eine **Kaution**: eine Vertrauenseinzahlung, die von der Clearingstelle gehalten wird, um zu garantieren, dass Sie Ihre täglichen Verpflichtungen erfüllen können. Sie ähnelt eher einer Mietkaution als einer Hypothek.

Daraus folgen zwei Konsequenzen. Es gibt keine Zinskosten fürs Halten einer Futures-Position. Und — die gefährliche Hälfte — die Größe der Einzahlung hat nichts mit der Größe Ihrer Verpflichtung zu tun. Eine Kaution ist so bemessen, dass sie etwa eine plausible Tagesbewegung abdeckt, nicht den Wert des Kontrakts. Genau deshalb ist der Hebel so hoch.

## Initial Margin, Maintenance Margin und tägliches Mark-to-Market

Zwei Schwellenwerte regieren das Konto, und es sind nicht dieselbe Zahl. **Initial Margin** ist, was Sie verfügbar haben müssen, um eine Position zu eröffnen. **Maintenance Margin** ist die niedrigere Untergrenze, über der Ihr Eigenkapital bleiben muss, um sie offen zu halten. Fallen Sie unter Maintenance, bekommen Sie einen Margin Call und müssen das Konto wiederherstellen — üblicherweise zurück auf die Initial-Anforderung, nicht nur auf Maintenance.

Dazwischen liegt das **tägliche Mark-to-Market**. Futures-Positionen werden jeden einzelnen Tag abgerechnet: Gewinne bar gutgeschrieben, Verluste belastet, jede Session, egal ob Sie den Trade schließen. Es gibt keinen unrealisierten Futures-Verlust, der still in den Büchern liegt.

Alle Margin-Zahlen unten sind **nur illustrativ** — Börsen und Broker setzen sie, sie variieren je nach Broker, und sie steigen, wenn die Volatilität steigt. Behandeln Sie eine Zahl aus einem Artikel nie als aktuell.

Angenommen, die /ES-Initial-Margin ist 13.000 $ und die Maintenance 11.800 $. Sie zahlen 20.000 $ ein und kaufen einen Kontrakt bei 5.248,75.

- **Tag 1:** Der Preis fällt auf 5.180,00 — 68,75 Punkte × 50 $ = **−3.437,50 $**, an diesem Abend belastet. Eigenkapital: 16.562,50 $. Über Maintenance, keine Aktion.
- **Tag 2:** Der Preis fällt auf 5.080,00 — 168,75 Punkte × 50 $ = **−8.437,50 $** kumulativ. Eigenkapital: 11.562,50 $, unter der 11.800-$-Grenze.
- **Der Call:** Eigenkapital auf die Initial-Anforderung von 13.000 $ wiederherstellen. Sie überweisen **1.437,50 $**, oder der Broker liquidiert für Sie.

Zwei gewöhnliche Sessions. Eine 3,2-%-Bewegung im Index. Ein Margin Call.

## Die Hebel-Arithmetik: was eine 2-%-Bewegung dem hinterlegten Kapital antut

Teilen Sie den Nominalwert durch die Einzahlung, und Sie erhalten die Hebel-Ratio. 262.437,50 $ ÷ 13.000 $ ≈ **20:1**. Sie kontrollieren etwa zwanzig Dollar Index für jeden hinterlegten Dollar.

Jetzt rechnen Sie die Zahl durch, die zählt:

- 2 % ungünstige Bewegung auf /ES-Nominal: 262.437,50 × 0,02 = **5.248,75 $**
- Als Anteil einer Margin-Einzahlung von 13.000 $: 5.248,75 ÷ 13.000 = **40,4 %**

Eine 2-%-Bewegung im Basiswert löscht 40 % des hinterlegten Kapitals aus. Der S&P 500 hat im durchschnittlichen Jahr mehrfach 2-%-Tage. Diese Asymmetrie — kleine Bewegung, enormer proportionaler Schaden — ist das Wichtigste auf dieser Seite, und deshalb sind die [1-%-Regel und die Positionsgrößen-Arithmetik](/blog/risk-management-position-sizing) bei Futures nicht optional. Es bedeutet auch, dass die [Stop-Loss-Platzierung](/blog/stop-loss-orders-explained) vor dem Einstieg kommen muss, nicht danach. Bei Aktien ist ein vergessener Stop ein schlechter Trade. Bei 20:1 ist es ein Solvenzereignis.

## Verfall, Rollover und Contango bei Rohstoff-Futures

Jeder Futures-Kontrakt stirbt nach Fahrplan. /ES verfällt vierteljährlich — März, Juni, September, Dezember. Rohöl verfällt monatlich. Um Exposition über den Verfall hinaus zu halten, müssen Sie **rollen**: den verfallenden Kontrakt schließen und den des nächsten Monats öffnen, meist in der Woche oder zwei vor Verfall, wenn die Liquidität nach vorne wandert.

Die zwei Monate handeln nicht zum selben Preis. Ist der weiter entfernte Kontrakt teurer als der nähere — oft weil die Lagerung von physischem Rohöl Geld kostet —, ist der Markt in **Contango**. Ist er billiger, typischerweise wenn eine aktuelle Knappheit Käufer für sofortige Barrel mehr zahlen lässt, ist er in **Backwardation**.

Contango ist für einen Long-Halter eine echte Kostenquelle. Ist der Frontmonat /CL bei 78,34 und der nächste Monat bei 78,95, bedeutet das Rollen eines Long-Kontrakts, billig zu verkaufen und teuer zu kaufen: 0,61 × 1.000 Barrel = **610 $** pro Rollvorgang. Rollen Sie monatlich ein Jahr lang in einem dauerhaft contangoierten Markt, summiert sich der Widerstand, selbst wenn Öl das Jahr unverändert beendet. Deshalb hinken Rohstoffpositionen, die über viele Rolls gehalten werden, oft dem Spotpreis hinterher, den sie verfolgen.

## Mikro-Kontrakte als realistischer Einstiegspunkt für kleine Konten

Mikro-Kontrakte sind ein Zehntel ihres E-mini-Elternkontrakts, und für die meisten Retail-Konten sind sie die einzig vertretbare Startgröße. /MES ist 1/10 von /ES: **5 $ pro Indexpunkt**, Tick-Wert 0,25 × 5 = **1,25 $**, Nominal bei 5.248,75 von 5.248,75 × 5 = **26.243,75 $**. /MNQ ist 1/10 von /NQ bei 2 $ pro Punkt.

Der Unterschied für ein kleines Konto ist nicht kosmetisch. Auf einem Konto mit 5.000 $ und einem Stop 10 Indexpunkte entfernt:

- **1 /ES-Kontrakt:** 10 × 50 $ = **500 $** Risiko — **10 %** des Kontos auf einem Trade.
- **1 /MES-Kontrakt:** 10 × 5 $ = **50 $** Risiko — **1 %** des Kontos.

Die /MES-Version ist ein normaler Trade. Die /ES-Version ist ein Glücksspiel, das keine Überzeugung rechtfertigt. Mikros lassen Sie auch in Zehnteln skalieren statt vor einer Alles-oder-nichts-Entscheidung zu stehen — dasselbe Granularitätsargument, das [Forex-Positionsgrößenbestimmung](/blog/forex-trading-for-beginners) mit Mini- und Mikro-Lots praktikabel macht.

## Was Stockades Futures-Symbole Ihnen beibringen können und was nicht

Seien Sie sich der Grenze klar bewusst. Stockades /ES, /NQ, /CL und /GC tragen reale Bezeichnungen, aber die dahinterliegenden Kurse werden clientseitig durch einen Zufallslauf generiert — kein Börsenfeed, keine Marktdaten, kein historisches Archiv irgendwo im Produkt. Die Symbole sind Beschriftungen auf synthetischen Reihen.

Der Simulator modelliert auch keine Futures-Mechanik. P&L wird pro Mengeneinheit berechnet, genau wie bei einer Aktie: kein Kontrakt-Multiplikator, keine Initial- oder Maintenance-Margin, keine Mark-to-Market-Belastung, kein Margin Call, kein Verfall oder Roll. Dort 1 Einheit /ES zu handeln bedeutet nicht, einen Kontrakt im Wert von 262.437,50 $ zu handeln, und nichts auf der Website wird je eine Überweisung verlangen.

Wofür es nützlich ist, ist den *Prozess* gegen futures-förmige Kursbewegung einzuüben: einen Stop vor dem Einstieg mit den B/S/F-Kürzeln setzen, die Multiplikator-Arithmetik auf Papier neben einer offenen Position durchführen, die Ergebnisse in `/analytics` auswerten. Und die übliche Einschränkung gilt hier am stärksten — ein Simulator nimmt die emotionale Last echten Geldes weg, und echte Futures können Ihnen einen Verlust größer als die hinterlegte Margin bescheren, wenn der Markt über Nacht durch Ihren Stop hindurch springt.

## Üben Sie Futures-Mechanik im Simulator

Rufen Sie /ES im Simulator auf und schreiben Sie, bevor Sie irgendetwas platzieren, den Multiplikator, den Tick-Wert und den Nominalwert beim aktuellen Preis auf. Nehmen Sie dann eine Position ein und übersetzen Sie jede Bewegung im Kopf in Kontrakt-Dollar — 2,5 Punkte sind 125 $, zehn Punkte sind 500 $ — bis die Umrechnung automatisch wird. Tun Sie dasselbe bei /CL, wo ein Cent 10 $ sind, damit sich der Reflex überträgt, statt an ein Symbol gebunden zu bleiben. Machen Sie dann die Hebel-Prüfung: Bei 20:1, wie weit kann sich dieser Markt bewegen, bevor 40 % einer hinterlegten Einzahlung weg sind?

Beginnen Sie auf [Stockades Paper-Trading-Simulator](/de/simulator/) mit dieser Arithmetik aufgeschrieben, nicht geschätzt.
