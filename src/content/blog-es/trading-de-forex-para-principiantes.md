---
title: "Introducción al Trading de Forex: Pares de Divisas y Pips Explicados"
description: "Un par de divisas significa estar largo en una divisa y corto en otra. Cómo leer una cotización, qué es un pip, por qué el yen difiere, y el apalancamiento."
date: 2026-07-13
author: "Stockade Team"
tags: ["Forex", "Fundamentos"]
slug: "trading-de-forex-para-principiantes"
translationOf: "forex-trading-for-beginners"
---

Abres una plataforma de forex por primera vez y la cotización dice EUR/USD 1.0872. Sin signo de dólar, cuatro decimales, y el botón de compra pide lotes en lugar de acciones. Después USD/JPY dice 157.42, con dos decimales, y alguien te dice que un movimiento de 20 pips en ambos pares es del mismo tamaño — aunque en uno se ve como 0.0020 y en el otro como 0.20.

La confusión es superficial. El forex tiene tres convenciones que hacen tropezar a todo trader de acciones — qué es realmente un par, qué es un pip, y qué tan grande es un lote. Una vez que esas quedan claras, el resto se lee con normalidad.

## Toda operación de forex es larga en una divisa y corta en otra

Este es el obstáculo conceptual. Compra una acción y pasa una cosa: eres dueño de acciones. Compra EUR/USD y pasan dos cosas a la vez — te vas **largo en el euro** y **corto en el dólar estadounidense**, en la misma operación, en el mismo instante. No puedes hacer una sin la otra, porque una divisa no tiene precio salvo en términos de otra divisa. No existe un "precio del euro" absoluto de la forma en que existe un precio absoluto de una acción.

Eso reencuadra el gráfico. Que EUR/USD suba no significa que el euro esté fuerte; significa que el euro está fuerte *en relación con el dólar* — que igualmente podría ser el dólar debilitándose mientras el euro no hace nada.

La primera divisa del par es la **base**, la segunda es la **cotizada**. El número siempre es: cuántas unidades de la divisa cotizada compran una unidad de la base.

- **EUR/USD 1.0872** — un euro cuesta 1.0872 dólares estadounidenses.
- **USD/JPY 157.42** — un dólar estadounidense cuesta 157.42 yenes.

Nota que el dólar está en lados opuestos de esos dos pares. Compra EUR/USD *y* compra USD/JPY y estás corto en dólares en una operación y largo en dólares en la otra, cancelando parcialmente tu propia posición sin querer. Por la misma razón no hay restricción de venta en corto en forex: una venta es simplemente una compra de la otra divisa, no se pide prestado nada, y no hay regla de uptick.

## Qué es un pip, y por qué los pares con JPY usan el segundo decimal

Un **pip** — "percentage in point" — es el incremento estándar en el que los traders cotizan un movimiento. Para casi todos los pares es el **cuarto decimal**, 0.0001. En EUR/USD, un movimiento de **1.0872 a 1.0892** es 0.0020, que son **20 pips**.

Donde el yen es la divisa cotizada, el pip es el **segundo decimal**, 0.01. En USD/JPY, un movimiento de **157.42 a 157.62** es 0.20, que también son **20 pips**.

Esta excepción es donde los principiantes pierden el hilo, y no es arbitraria. La convención mantiene un pip con un tamaño *relativo* más o menos igual entre pares:

- EUR/USD: 0.0001 ÷ 1.0872 = **0.0092%** del precio
- USD/JPY: 0.01 ÷ 157.42 = **0.0064%** del precio

Mismo orden de magnitud, así que 50 pips significa algo comparable en cualquiera de los dos. Ahora supón que el yen usara el cuarto decimal: 0.0001 ÷ 157.42 = **0.0000635%**, cerca de 145 veces más pequeño, y un día ordinario de 0.8% en USD/JPY se imprimiría como unos 12,600 pips. La convención de dos decimales mantiene las cotizaciones del yen en el mismo rango numérico que todo lo demás.

Un detalle más: la mayoría de los brokers muestran un dígito extra, un **pip fraccional** que vale una décima de pip — EUR/USD como 1.08725, USD/JPY como 157.425. Leer ese último dígito como un pip infla cada distancia que midas por 10×.

## El valor del pip depende del tamaño del lote y de la divisa cotizada

Un pip es una distancia. Lo que *vale* depende de cuántas unidades tienes. El forex opera en **lotes** estandarizados: un **lote estándar** son 100,000 unidades de la divisa base, un **mini lote** son 10,000, y un **micro lote** son 1,000.

El valor del pip es unidades × tamaño del pip, expresado en la divisa **cotizada**. Un lote estándar de EUR/USD: 100,000 × 0.0001 = **10 USD por pip**. La divisa cotizada ya es el dólar, así que son exactamente $10 sin conversión, y el movimiento de 20 pips de 1.0872 a 1.0892 son 20 × $10 = **$200**. Cualquier par cotizado en USD, GBP/USD incluido, son $10 limpios por pip por lote estándar.

USD/JPY no. Su divisa cotizada es el yen, así que un lote estándar gana 100,000 × 0.01 = **¥1,000 por pip**, y llevarlo a dólares significa dividir entre la tasa actual: 1,000 ÷ 157.42 = **$6.35 por pip**. El mismo movimiento de 20 pips son ¥20,000, o 20,000 ÷ 157.42 = **$127.05** — no $200. Dimensionar una operación en yenes como si los pips valieran $10 te deja arriesgando 36% menos de lo que pretendías.

<div class="table-wrap">

| Lote | Unidades | Valor del pip EUR/USD | Valor del pip USD/JPY (a 157.42) |
|---|---|---|---|
| Estándar | 100,000 | $10.00 | ¥1,000 = $6.35 |
| Mini | 10,000 | $1.00 | ¥100 = $0.64 |
| Micro | 1,000 | $0.10 | ¥10 = $0.06 |

</div>

Los lotes pequeños son lo que hace viable el dimensionamiento de forex en una cuenta pequeña. Con $5,000 y 1% de riesgo por operación — $50 — en un setup de EUR/USD con un stop de 25 pips, necesitas un valor de pip de 50 ÷ 25 = **$2.00**, que son 2 mini lotes, o 20,000 unidades. Valor nocional: 20,000 × 1.0872 = **$21,744**. Cuatro veces tu cuenta controlada con $50 en riesgo. La [fórmula de tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/) funciona idéntico aquí; solo cambia la unidad de riesgo-por-acción a riesgo-por-pip.

## El spread es el costo principal que pagas en forex minorista

La mayoría de los brokers de forex minoristas no cobran comisión. Se pagan a través del **spread** — la brecha entre el precio al que puedes vender (bid) y el precio al que puedes comprar (ask).

Si EUR/USD cotiza 1.0871 / 1.0873, el spread es 2 pips. Compras en 1.0873 y la plataforma marca tu posición en el bid, 1.0871, así que abres **abajo 2 pips** — $20 en un lote estándar, antes de que el mercado haya hecho nada.

Eso suena trivial hasta que lo multiplicas por frecuencia. Diez operaciones de ida y vuelta al día en un lote estándar con un spread de 1 pip son $10 × 10 = $100 al día, y en 250 días de trading, **$25,000** solo en spread. Los spreads también se amplían drásticamente alrededor de publicaciones económicas y en las horas delgadas después del cierre de Nueva York.

## El apalancamiento en forex es mucho mayor que en acciones, y ahí está el peligro

Un lote estándar de EUR/USD a 1.0872 son $108,720 de divisa. Nadie deposita eso; los brokers exigen un depósito de margen en su lugar, y los requisitos de forex son extremos comparados con los de acciones. Una cuenta de acciones en EE. UU. te da 2:1 de un día para otro, mientras que el apalancamiento regulado de forex corre en 30:1 en la UE y el Reino Unido y 50:1 en EE. UU. para los pares mayores — y los brokers offshore anuncian 500:1 y más.

<div class="table-wrap">

| Apalancamiento | Margen para 1 lote estándar de EUR/USD ($108,720 nocional) |
|---|---|
| 2:1 (cuenta de acciones típica) | $54,360.00 |
| 30:1 (tope minorista UE/Reino Unido) | $3,624.00 |
| 50:1 (tope minorista EE. UU.) | $2,174.40 |
| 500:1 (offshore) | $217.44 |

</div>

Lee la última fila y la trampa es obvia. Con $2,000 y 500:1 puedes sostener cinco lotes estándar — $543,600 de divisa — por $1,087.20 de margen, dejando $912.80 libres. Cinco lotes son $50 por pip, así que un movimiento de **20 pips** en tu contra cuesta $1,000, más que tu margen libre, y te liquidan. Veinte pips son 0.0020 ÷ 1.0872 = **0.18%** del precio. Un movimiento adverso más pequeño que un error de redondeo en un gráfico de acciones termina la cuenta.

El marco de marketing dice que el apalancamiento le da acceso a un mercado grande a una cuenta pequeña. El marco honesto es que el apalancamiento multiplica un resultado cuyo signo no controlas: escala las ganancias y las pérdidas por el mismo factor y no cambia en nada tu expectativa por operación, así que si tu estrategia pierde dinero en promedio, el apalancamiento no es una ruta más rápida a la ganancia sino una ruta más rápida a cero. Los brokers regulados en la UE y el Reino Unido deben publicar el porcentaje de cuentas minoristas que pierden dinero, y las cifras divulgadas generalmente se ubican en la banda del 70–80%; las pérdidas impulsadas por apalancamiento son la razón dominante.

Trata el apalancamiento como capacidad que en su mayoría rechazas: dimensiona a partir de tu distancia al stop y tu presupuesto de riesgo, y deja que el requisito de margen caiga donde caiga. [Los futuros tienen una mecánica de apalancamiento similar](/es/blog/trading-de-futuros-explicado/) a través del margen de contrato, y aplica la misma disciplina.

## Mayores, menores, exóticos, y la semana de trading de 24 horas

Los pares se agrupan por liquidez. Los **mayores** todos incluyen el dólar estadounidense — EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD — y llevan los spreads más ajustados. Los **menores**, o cruces, emparejan dos mayores sin el dólar: EUR/GBP, EUR/JPY, GBP/JPY. Los **exóticos** emparejan un mayor con una divisa más pequeña o de mercado emergente — USD/TRY, USD/ZAR, USD/MXN — donde los spreads corren diez o veinte veces los de un mayor y el precio se mueve violentamente con noticias políticas domésticas. Los principiantes pertenecen a los mayores solo por costo.

El forex corre 24 horas al día, cinco días a la semana, abriendo con Sídney cerca de las 5pm ET del domingo y cerrando a las 5pm ET del viernes, con cuatro sesiones regionales rotando: Sídney, Tokio, Londres, Nueva York. El volumen más pesado es el **solapamiento Londres–Nueva York**, aproximadamente de 8am a 12pm ET, cuando ambos de los centros más grandes están abiertos — los spreads son más ajustados y los movimientos más grandes entonces. Las horas de solo Asia suelen ser tranquilas y de rango.

El acceso las 24 horas no es una invitación a operar las 24 horas. Elige la ventana que se ajuste a tus setups y a tu vida; si eso es un solapamiento de dos horas o una posición sostenida varios días es la decisión de [day trading versus swing trading](/es/blog/day-trading-vs-swing-trading/). Y aunque la semana es continua, el forex hace gap durante el fin de semana — el lunes puede abrir lejos del cierre del viernes, más allá de cualquier stop en espera en el medio.

## Qué pueden y no pueden enseñarte los tres pares de divisas de Stockade

El simulador y la lista de mercados de Stockade llevan exactamente tres pares — EUR/USD, GBP/USD y USD/JPY — empezando en 1.0872, 1.2714 y 157.42. Estos son nombres de pares reales, pero los datos de precio detrás de ellos se generan del lado del cliente mediante una caminata aleatoria. Nada está cotizado desde un mercado, y esos precios base son puntos de partida fijos, no tasas en vivo.

Sé claro sobre lo que deja fuera. Stockade no modela ningún spread entre bid y ask — un solo precio, así que una operación ahí nunca paga el costo que domina el forex minorista real. No hay lotes, no hay margen, no hay apalancamiento y no hay swap nocturno; compras una cantidad de unidades contra un saldo virtual de $100,000, exactamente como harías con una acción. La serie generada nunca hace gap, así que no aparece ningún gap de fin de semana. Y la volatilidad vela a vela es una fracción fija del precio base de cada instrumento, idéntica en todos los símbolos del sitio, así que EUR/USD ahí no muestra los movimientos porcentuales característicamente pequeños de un par mayor real.

Para lo que sí sirve es para practicar la lectura: una cotización de cuatro decimales, contar pips en un gráfico sin traducir a dólares primero, y 1.0872 junto a 157.42 hasta que las dos convenciones dejen de necesitar un momento de reflexión.

## Practica esto en el simulador

Abre EUR/USD y USD/JPY en Stockade y lee distancias en pips en lugar de decimales — mide un swing en cada uno y confirma que las convenciones de cuatro y dos decimales producen movimientos comparables. Después calcula el precio de la misma operación dos veces en papel: qué costaría o rendiría con un lote estándar ($10 por pip en EUR/USD, $6.35 en USD/JPY a 157.42) contra un micro lote. Recuerda que ahí no se modelan ni spread ni apalancamiento, así que las dos fuerzas que dominan el forex minorista real están ausentes, y que el dinero virtual hace que la disciplina de dimensionamiento sea mucho más fácil de lo que será con dinero real. Automatiza las convenciones en el [simulador de paper trading de Stockade](/es/simulator/) antes de que algo de esto importe financieramente.
