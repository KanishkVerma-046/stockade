---
title: "Stops con ATR: Cómo Fijar el Stop-Loss por Volatilidad"
description: "Un stop de $1 no es lo mismo en una acción tranquila que en una agitada. Cómo mide el ATR el rango normal y cómo dimensionar un stop con ATR a riesgo fijo."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indicadores", "Gestión de Riesgo"]
slug: "stop-loss-con-atr"
translationOf: "atr-volatility-stops"
---

Toma dos acciones hipotéticas, ambas cotizando a $50. La primera suele recorrer unos $0.50 entre el máximo y el mínimo en un día. La segunda suele recorrer unos $2.50. Pon un stop de $1 debajo de cada una y habrás tomado dos decisiones muy distintas. En la primera, el stop está a dos días completos de rango. En la segunda, está a menos de la mitad del rango de un día normal.

Un stop fijo en dólares o en porcentaje trata a esas dos acciones como si fueran iguales. No lo son, y el stop que ignora la diferencia es el que salta por puro ruido. El rango verdadero promedio, o ATR (average true range), mide cuánto se mueve normalmente un instrumento, así que puedes fijar el stop según eso.

## Qué mide el rango verdadero, y por qué cuentan los gaps

[El ATR lo desarrolló J. Welles Wilder, que lo presentó en su libro de 1978 *New Concepts in Technical Trading Systems*](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). Parte del rango verdadero de una sola barra, que es la mayor de tres distancias:

```
Rango verdadero = la mayor de:
  máximo − mínimo
  |máximo − cierre anterior|
  |mínimo − cierre anterior|
```

El máximo y el mínimo son los extremos de las mechas de una vela ([la guía de velas](/es/blog/como-leer-graficos-de-velas/) explica su anatomía). En una barra normal, gana la primera distancia. Digamos que el cierre anterior fue $50.00, y hoy el máximo es $51.20 y el mínimo $49.60. Máximo menos mínimo es $1.60. El máximo está a $1.20 del cierre anterior y el mínimo a $0.40. El rango verdadero es $1.60, igual que el rango simple.

Las otras dos líneas están ahí por los gaps. Supón en cambio que la acción abre en $52.50 por una noticia y luego cotiza entre $52.10 y $53.00. El rango propio de la barra es solo $0.90, pero el máximo está $3.00 por encima del cierre de ayer. El rango verdadero es $3.00. Quien mantuvo la posición durante ese gap sintió un movimiento de $3, y el rango verdadero lo cuenta. Una medida simple de máximo menos mínimo lo llamaría un día tranquilo.

## Cómo promedia el ATR el rango verdadero en 14 barras

El ATR es un promedio del rango verdadero, y el ajuste habitual es de 14 barras. La versión de Wilder no es una media móvil simple. El primer valor es el promedio simple de los primeros 14 rangos verdaderos, y a partir de ahí cada valor nuevo es:

```
ATR = (ATR anterior × 13 + rango verdadero de hoy) ÷ 14
```

Ese es el suavizado que da la misma página de StockCharts. Pasa el día del gap por la fórmula. Si el ATR era $1.50 y el gap produce un rango verdadero de $3.00, el nuevo ATR es ($1.50 × 13 + $3.00) ÷ 14 = $22.50 ÷ 14 = $1.61. Un día del doble del tamaño normal mueve el ATR cerca de un 7%. Es intencionado: el ATR describe la barra típica de las últimas semanas, no la última.

Hay dos cosas que el ATR no te dice. No tiene dirección: una acción que cae con fuerza y una que sube con fuerza pueden tener el mismo ATR. Y está en unidades de precio, así que no puedes compararlo entre acciones. Un ATR de $2 es el 10% de una acción de $20 y el 0.5% de una de $400. Si quieres comparar, divide el ATR entre el precio.

## Un stop con ATR, de principio a fin

Este es el método, desde la entrada hasta el número de acciones. Digamos que tienes una cuenta hipotética de $25,000 y arriesgas un 1% por operación, o sea $250. Compras una acción a $80 y su ATR de 14 días es $2.00.

1. **Elige un múltiplo.** Usaremos 2 × ATR, así que el stop queda a $4.00.
2. **Fija el stop.** $80.00 − $4.00 = $76.00.
3. **Dimensiona la posición.** $250 ÷ $4.00 = 62.5, redondeado hacia abajo a 62 acciones.
4. **Comprueba los números.** 62 acciones × $80 = $4,960 en acciones. Si el stop se ejecuta en $76, pierdes 62 × $4.00 = $248.

El múltiplo es una elección, no una constante. Un ATR es aproximadamente el rango de una barra típica, así que una barra ordinaria puede alcanzar un stop situado a un ATR de distancia. Los múltiplos más amplios le dan más espacio a la operación y compran menos acciones. Como comparación, un stop del 2% en esta acción estaría a $1.60, solo 0.8 ATR, dentro del movimiento de un día normal. Ese es el problema del principio, en números.

No hay un múltiplo correcto, y nadie puede decirte cuál es el mejor sin probarlo en tus propios setups. Lo que más importa es elegir uno y usarlo siempre, para que tus resultados signifiquen algo cuando los revises.

## El mismo riesgo en dólares en acciones tranquilas y volátiles

La verdadera utilidad de un stop con ATR es lo que hace con el tamaño de la posición. Mantén el riesgo de $250 y la regla de 2 × ATR, y aplícala a tres acciones hipotéticas de $80 con ATR distintos:

<div class="table-wrap">

| Acción | ATR | Distancia del stop (2 × ATR) | Acciones | Tamaño de la posición | Pérdida en el stop |
|---|---|---|---|---|---|
| Tranquila | $1.00 | $2.00 | 125 | $10,000 | $250 |
| Típica | $2.00 | $4.00 | 62 | $4,960 | $248 |
| Volátil | $4.00 | $8.00 | 31 | $2,480 | $248 |

</div>

La acción volátil recibe un stop cuatro veces más amplio y una posición de la cuarta parte del tamaño. La pérdida si te equivocas se mantiene más o menos igual. Esa es toda la idea: la volatilidad cambia cuántas acciones tienes, no cuánto pierdes. [La guía de tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/) explica por qué el tamaño siempre debe salir de la distancia del stop y no decidirse primero.

Ojo con la fila tranquila, eso sí. Un ATR estrecho significa una posición grande, y $10,000 es el 40% de esta cuenta. Comprueba que la posición cabe en tu efectivo antes de dar por hecho que tienes disponible el número de acciones que da la fórmula.

Mantener fijo el riesgo en dólares también mantiene intacta la matemática del drawdown. Las rachas perdedoras duelen según cuánto arriesgas por operación, no según qué tan amplios son tus stops, y por eso [la guía de drawdown](/es/blog/recuperacion-de-drawdown/) lo mide todo en riesgo por operación.

## Combina el ATR con la estructura en lugar de sustituirla

Un stop con ATR tiene un punto débil: no conoce tu idea de la operación. Dos ATR por debajo de tu entrada podrían caer en medio de una zona de soporte, donde la idea sigue viva, o mucho más allá del punto en que quedó demostrado que era errónea. [Colocar un stop según la estructura](/es/blog/ordenes-stop-loss-explicadas/), más allá del nivel que invalida la operación, responde *dónde* va el stop. El ATR responde mejor *cuánto margen* dejar más allá de ese nivel.

Así que el enfoque que usaríamos combina los dos. Encuentra el nivel estructural y añade una fracción del ATR como colchón. Digamos que el mínimo de swing bajo tu entrada de $80 está en $77.40 y el ATR es $2.00. Suma medio ATR, $1.00, y el stop va en $76.40. Si todavía no sabes encontrar esos niveles, [la guía de soporte y resistencia](/es/blog/soporte-y-resistencia/) explica los mínimos de swing y por qué un nivel es una zona y no una línea.

Ahora dimensiónalo. El riesgo por acción es $80.00 − $76.40 = $3.60, así que $250 ÷ $3.60 = 69.4, redondeado hacia abajo a 69 acciones, para una pérdida de $248.40 en el stop. Si la siguiente resistencia está en $87.20, la recompensa es $7.20, exactamente 2R. Es una operación 1:2 con una tasa de acierto de equilibrio del 33.3%, y [la guía de riesgo-recompensa](/es/blog/relacion-riesgo-recompensa-y-expectativa/) explica cómo decidir si tu setup puede superar esa barra.

## Un trailing stop con ATR: el Chandelier Exit

El ATR también sirve para trailing stops. Una versión conocida es el Chandelier Exit, [desarrollado por Charles Le Beau, que por defecto se sitúa a tres veces el ATR de 22 períodos por debajo del máximo más alto de los últimos 22 períodos](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit):

```
Chandelier Exit (largo) = máximo de 22 períodos − ATR(22) × 3
```

Si el máximo de 22 períodos es $90 y el ATR es $2.00, la salida está en $90 − $6.00 = $84.00. A medida que el precio marca nuevos máximos, la línea los sigue hacia arriba.

La fórmula tiene una trampa. Si el ATR sube mientras el máximo no se mueve, la línea baja: con el mismo máximo de $90, un ATR de $2.50 la pone en $82.50. Usada como stop, eso significa aflojarlo en plena operación. Nosotros no lo haríamos. Un stop solo debería moverse a favor de la operación, la regla que defiende la guía de stop-loss, así que si sigues el precio con esta fórmula, deja el stop donde está siempre que la fórmula caiga por debajo de él.

## En qué falla el ATR

El ATR es una descripción del pasado, y tiene los puntos débiles de una.

- **Va rezagado.** Promedia 14 barras, así que tras un tramo tranquilo es pequeño justo antes de un shock, y tarda en ponerse al día después. El gap de $3 de arriba solo lo empujó a $1.61.
- **No puede frenar un gap.** Un stop con ATR sigue siendo una orden stop. Si el precio abre más allá, se ejecuta en la apertura, por muy cuidadosamente que hayas medido el rango.
- **Depende del tamaño de la barra.** Un ATR de 14 períodos en barras de cinco minutos es una fracción del diario para la misma acción. Mídelo en el marco temporal en el que operas. El stop de un day trader dimensionado con el ATR diario será demasiado amplio, y el de un swing trader dimensionado con el ATR de cinco minutos será demasiado ajustado.
- **No dice nada de dirección ni de ventaja.** Un stop bien colocado limita lo que cuesta una mala operación. No hace que la operación sea buena.

## Practica esto en el simulador

Stockade no tiene un indicador ATR. Sus gráficos muestran EMA 9, 20 y 50, VWAP, RSI y MACD. Además, todos los símbolos funcionan con el mismo ajuste de volatilidad, escalado a su precio, así que no hay ciclos de volatilidad como los de un mercado real a los que adaptarse. Eso sí, el rango de las velas varía: el rango promedio de unas cuantas velas sube y baja por azar, y las velas se amplían en algún tramo ocasional en que el sesgo de tendencia oculto es fuerte. Y como cada vela de Stockade abre exactamente donde cerró la anterior, ahí el rango verdadero siempre es igual a máximo menos mínimo.

Aun así puedes practicar la aritmética. En el [simulador de gráficos](/es/chart-simulator/), pasa el cursor sobre cada una de las últimas 14 velas y anota los valores H y L de la barra de lectura de abajo. Promedia los 14 rangos para obtener un ATR simple. Luego abre el [simulador](/es/simulator/) en modo repetición, donde el gráfico no tiene barra de lectura, y estima a ojo el rango típico de las últimas 14 velas contra la escala de precios. Pon el stop a dos de esos rangos por debajo de tu entrada, comprueba dónde queda respecto al mínimo de swing más cercano, calcula el número de acciones para un riesgo fijo en dólares antes de entrar, y escribe el precio del stop en el campo Stop Loss. Los precios de Stockade se generan en tu navegador, así que nada de esto dice algo sobre la volatilidad de una acción real. El hábito que construye es el que importa: mide el rango, luego fija el stop, luego dimensiona.
