---
title: "Indicador RSI: Cómo Identificar Condiciones de Sobrecompra y Sobreventa"
description: "RSI por encima de 70 no es una señal de venta. Qué mide realmente el RSI, por qué sobrecompra significa fuerza, y cómo leer la divergencia sin engañarte."
date: 2026-04-20
author: "Stockade Team"
tags: ["Indicadores"]
slug: "indicador-rsi-sobrecompra-sobreventa"
translationOf: "rsi-indicator-overbought-oversold"
---

He aquí una operación que casi todos hacen una vez. Una acción ha subido con fuerza durante una semana. Agregas el RSI al gráfico, lo ves en 78, y recuerdas la regla: por encima de 70 es sobrecompra, sobrecompra significa vender. Así que te pones corto. Durante las siguientes dos semanas la acción suma otro 22%, el RSI nunca baja de 68, y cierras la posición con una pérdida mayor que el movimiento que intentabas capturar.

La regla no estaba exactamente equivocada — tenías la idea equivocada sobre lo que dice. Un RSI de 78 no es el mercado diciéndote que viene una reversión. Te está diciendo que los compradores han dominado a los vendedores durante catorce velas seguidas, lo cual es una descripción de fuerza, no una predicción de debilidad. Operarlo como señal de venta significa apostar sistemáticamente contra lo más fuerte de la pantalla.

## Qué mide realmente el RSI

El Índice de Fuerza Relativa (RSI), publicado por J. Welles Wilder en 1978, responde una pregunta estrecha: en las últimas N velas, ¿cómo se comparan los movimientos alcistas promedio con los movimientos bajistas promedio? Eso es genuinamente todo lo que hace. Toma el cambio de cierre a cierre de cada vela en una ventana de retroceso — 14 velas por defecto — los separa en ganancias y pérdidas, promedia cada grupo, y los compara como una razón llamada RS, por fuerza relativa:

```
RS = ganancia promedio / pérdida promedio
```

Y esa razón se comprime en una escala de 0 a 100:

```
RSI = 100 - (100 / (1 + RS))
```

Trabajemos un ejemplo. Supón que en las últimas 14 velas, la ganancia promedio de la ventana es $2.40 y la pérdida promedio es $1.20. Los movimientos alcistas corren al doble del tamaño de los bajistas:

- RS = 2.40 / 1.20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33.3 = **66.7**

Dos detalles sobre esos promedios. Primero, dividen entre el período completo de retroceso, no entre el número de velas alcistas — nueve velas alcistas que suman $21.60 dan una ganancia promedio de 21.60 / 14 = $1.54, no $2.40. Segundo, después del primer cálculo Wilder usa un promedio móvil suavizado en lugar de recalcular desde cero: cada nuevo promedio es el promedio anterior multiplicado por 13, más el valor de la vela más reciente, todo dividido entre 14. Ese suavizado es la razón por la que el RSI se mueve con menos brusquedad que el precio crudo.

## Por qué la escala de 0 a 100 no es lineal como esperas

La fórmula colapsa una razón sin límite en un rango acotado, y lo hace de forma desigual. Vale la pena memorizar tres puntos de referencia:

<div class="table-wrap">

| Condición | RS | RSI |
|---|---|---|
| Ganancia promedio igual a pérdida promedio | 1.00 | 50.0 |
| Ganancia promedio es 2.33× la pérdida promedio | 2.33 | 70.0 |
| Ganancia promedio es 0.43× la pérdida promedio | 0.43 | 30.0 |

</div>

Verifica la fila del medio: 1 + 2.333 = 3.333, y 100 / 3.333 = 30, así que RSI = 100 − 30 = 70. La fila inferior: 1 + 0.4286 = 1.4286, y 100 / 1.4286 = 70, así que RSI = 30.

Nota lo que eso significa. Para imprimir 70, los movimientos alcistas solo tienen que ser un poco más del doble que los bajistas — una condición común, no extrema. Pasado ese punto la escala se comprime con fuerza: pasar de 70 a 90 requiere que el RS pase de 2.33 a 9, un cambio mucho mayor en el mercado subyacente del que sugiere el salto de veinte puntos en la pantalla.

## Por qué 70 y 30 son convenciones, no leyes

Wilder eligió 70 y 30. Pudo haber elegido 75 y 25. No hay una derivación detrás de ellos, ningún umbral estadístico donde el comportamiento cambie, ningún mecanismo que se active en 70.0 y se desactive en 69.9. Son números redondos que se veían razonables en los gráficos que estudió en los años setenta, y se quedaron porque todos copiaron los valores predeterminados. La mayoría del software de gráficos dibuja esas líneas por ti, lo cual refuerza silenciosamente la idea de que son fronteras. El gráfico de Stockade hace lo mismo — cambia el panel inferior a RSI y obtienes líneas punteadas en 70 y 30. Son marcas de referencia, no veredictos.

Lo mismo aplica al período de retroceso de 14. Un ajuste más corto como 7 reacciona más rápido y llega a los extremos constantemente; uno más largo como 21 rara vez llega. El período cambia qué tan seguido ves una señal, no qué tan confiable es — la misma disyuntiva que gobierna [elegir la longitud de una media móvil](/blog/moving-averages-ema-vs-sma/).

## Sobrecompra significa fuerza, no "a punto de revertir"

Este es el punto en el que la operación de apertura se equivocó, y merece su propia aritmética.

Imagina una tendencia alcista fuerte: en la ventana de retroceso, 12 velas cerraron al alza y 2 a la baja. Las ganancias suman $28.00, las pérdidas suman $2.80.

- Ganancia promedio = 28.00 / 14 = **$2.00**
- Pérdida promedio = 2.80 / 14 = **$0.20**
- RS = 2.00 / 0.20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9.1 = **90.9**

Ahora pregunta qué haría falta para que el RSI vuelva a bajar de 70. Según la tabla anterior, el RS tiene que caer de 10 a 2.33 — las pérdidas promedio tendrían que más que cuadruplicarse en relación con las ganancias promedio. En un promedio suavizado de 14 velas eso toma muchas velas de comportamiento genuinamente distinto. No pasa porque la acción tuvo una vela roja.

Así que el RSI no solo *tolera* estar por encima de 70 en una tendencia; queda aritméticamente fijado ahí hasta que cambia el carácter del movimiento. Los traders llaman a esto que el RSI se "incrusta". Una lectura de 90 dice que la tendencia es inusualmente limpia, y una tendencia limpia es lo último que quieres apostar en contra.

Hay una versión más sutil de la misma trampa. Supón que el RSI está en 66.7 (ganancia promedio $2.40, pérdida promedio $1.20) y la siguiente vela cierra al alza $1.00. Aplica el suavizado: la nueva ganancia promedio es (2.40 × 13 + 1.00) / 14 = 32.20 / 14 = $2.30, y la nueva pérdida promedio es (1.20 × 13 + 0) / 14 = 15.60 / 14 = $1.114. RS = 2.30 / 1.114 = 2.064, así que RSI = 100 − (100 / 3.064) = **67.4**.

El precio subió y el RSI apenas se movió, porque la ganancia fue menor que la ganancia promedio en curso. El RSI sigue el momentum, no el precio. Puede moverse de lado o incluso caer mientras el precio hace nuevos máximos — que es exactamente el setup que se llama divergencia.

## Cómo leer la divergencia del RSI

La divergencia es un desacuerdo entre el precio y el momentum.

**Divergencia bajista:** el precio hace un máximo más alto, el RSI hace un máximo más bajo. El precio llegó más lejos, pero con menos fuerza detrás que la vez anterior.

**Divergencia alcista:** el precio hace un mínimo más bajo, el RSI hace un mínimo más alto. Los vendedores empujaron el precio hacia abajo de nuevo pero con menos convicción.

Para leer una, marca dos puntos de giro del mismo tipo en el precio — dos máximos claros, o dos mínimos claros — y compara el RSI en cada uno. Solo cuenta si los dos son giros comparables con un retroceso real entre ellos; trazar líneas entre velas arbitrarias produce una divergencia en casi cualquier gráfico, por eso son tan fáciles de ver en retrospectiva.

Sé directo sobre la tasa de acierto: la divergencia falla seguido, y falla peor precisamente donde parece más tentadora. Una tendencia fuerte imprimirá tres o cuatro divergencias bajistas en su camino hacia arriba, y solo la última marca algo — cada una de las anteriores es una trampa que cuesta dinero. Trata la divergencia como una razón para ajustar un stop o dejar de sumar a una posición ganadora, no como una entrada independiente contra la tendencia. Apostar contra la fuerza en una señal de divergencia es uno de los [hábitos más costosos que desarrollan los traders nuevos](/blog/common-day-trading-mistakes/).

## Usar la línea 50 como filtro de tendencia

El nivel de RSI más útil es el que nadie dibuja. El RSI 50 es donde las ganancias promedio igualan exactamente a las pérdidas promedio. Por encima, los movimientos alcistas están ganando; por debajo, los bajistas.

Eso hace del 50 un filtro de régimen barato:

- **RSI persistentemente por encima de 50** — trata el 30 como inalcanzable y deja de buscar entradas largas por sobreventa. En una tendencia alcista, los retrocesos tienden a detenerse alrededor de 40–50.
- **RSI persistentemente por debajo de 50** — la imagen espejo. Los rebotes se estancan cerca de 50–60 y nunca llegan a 70.

Esa asimetría es más accionable que los extremos. En una tendencia alcista, una caída del RSI a 45 que se sostiene y gira al alza es un retroceso terminando dentro de una tendencia fuerte. Esperar el 30 ahí significa esperar una lectura que la tendencia no va a producir.

### Ajustar los umbrales a 80/20

Una vez que aceptas que los umbrales son convenciones, ajustarlos es obvio. En un mercado con tendencia fuerte, mueve las bandas a 80 y 20. Obtienes muchas menos señales, y las que obtienes marcan lecturas genuinamente inusuales en lugar de fuerza de tendencia rutinaria. En un mercado en rango el 70/30 predeterminado funciona mejor, porque ahí la reversión a la media es realmente el comportamiento dominante.

El orden importa: identifica primero el régimen, luego elige los umbrales. Usar el RSI para decirte el régimen y después usar el mismo RSI para operar en su contra es razonamiento circular.

## Lo que el RSI no puede hacer

El RSI se construye enteramente con precios de cierre que ya has visto. Es una medida rezagada y derivada — cada valor es un hecho sobre el pasado. No ve la acción intravela, y no lleva ninguna información que no esté ya en la serie de precios.

Tampoco tiene noción de *por qué* se movieron los precios. Una lectura de 90.9 que viene de un ascenso constante y una que viene de un solo hueco de apertura se ven idénticas para la fórmula. Esa es una buena razón para leer el RSI junto con la estructura del precio y el volumen, y para saber en qué se diferencia del [MACD](/blog/macd-explained/), que mide la separación entre dos medias móviles en lugar de una razón de ganancia/pérdida.

## Practica leer el RSI en el simulador

La forma más rápida de desaprender "70 significa vender" es observar el RSI mantenerse por encima de 70 durante cuarenta velas mientras el precio sube. Abre el [simulador de mercado de valores de Stockade](/es/simulator/), cambia el panel inferior del gráfico de volumen a RSI, y encuentra un tramo donde la línea se incruste por encima de 70 — luego anota cuánto recorre el precio antes de que el RSI regrese a 50. Haz también el ejercicio opuesto: marca cada divergencia bajista en un gráfico ascendente y cuenta cuántas realmente precedieron una caída. Los precios se generan algorítmicamente en lugar de ser datos reales del mercado, pero la aritmética del indicador es idéntica, y ese conteo cambiará cómo usas la herramienta.
