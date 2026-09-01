---
title: "Gestión de Riesgo 101: El Tamaño de Posición y la Regla del 1%"
description: "El tamaño de posición es resultado de tu distancia al stop, no un número que eliges. La fórmula, la regla del 1% y la matemática del drawdown."
date: 2026-06-29
author: "Stockade Team"
tags: ["Gestión de Riesgo"]
slug: "gestion-de-riesgo-y-tamano-de-posicion"
translationOf: "risk-management-position-sizing"
---

Pregúntale a un principiante cuántas acciones compró y obtendrás un número redondo. Doscientas. Quinientas. Mil, si la cuenta se sentía generosa esa mañana. Pregunta por qué, y la respuesta suele ser "se sintió bien" o "es como un tercio de mi poder de compra". El stop se coloca después, donde sea que sugiera el gráfico, y la pérdida es lo que termine siendo. A veces $180. A veces $2,400.

Esa secuencia está al revés, y invertirla es el cambio de mayor valor que puede hacer la mayoría de los traders nuevos. El tamaño de posición no es una decisión. Es la respuesta a un problema de división cuyos datos son tu presupuesto de riesgo y tu distancia al stop. Decide esos dos y la cantidad de acciones ya está determinada — solo la estás calculando.

## La mayoría de los principiantes elige la cantidad de acciones primero, y eso está al revés

Esto es lo que pasa cuando el tamaño va primero. Compras 500 acciones a 187.40. El gráfico dice que la operación está equivocada por debajo de 185.90 — 1.50 por acción de riesgo — así que la pérdida si el stop se ejecuta es 500 × 1.50 = **$750**. En una cuenta de $50,000 eso es 1.5% perdido en una operación ordinaria. Toma el mismo setup con una invalidación más amplia y honesta en 183.90, todavía 500 acciones, y la pérdida se vuelve 500 × 3.50 = **$1,750**, o 3.5%. Mismo trader, misma convicción, misma cantidad de acciones, y el daño se más que duplicó por dónde resultó estar una línea en un gráfico.

Cuando el tamaño es fijo y la distancia al stop varía, tu riesgo en dólares oscila al azar. Cuando el riesgo en dólares es fijo y la distancia al stop varía, tu cantidad de acciones se ajusta y cada pérdida sale del mismo tamaño. El segundo arreglo es todo el punto de la gestión de riesgo. [Las órdenes stop-loss](/blog/stop-loss-orders-explained) cubren cómo encontrar el precio de invalidación; este artículo trata sobre qué hacer con ese número una vez que lo tienes.

## La fórmula de tamaño de posición, trabajada de principio a fin

La fórmula es una línea:

**acciones = (cuenta × % de riesgo) ÷ (entrada − stop)**

Trabajémosla con cifras reales. Cuenta: $50,000. Riesgo por operación: 1%.

- **Presupuesto de riesgo:** 50,000 × 0.01 = **$500**
- **Entrada:** 187.40
- **Stop:** 185.90
- **Riesgo por acción:** 187.40 − 185.90 = **1.50**
- **Acciones:** 500 ÷ 1.50 = 333.33, redondeado hacia abajo a **333 acciones**
- **Riesgo real si se ejecuta el stop:** 333 × 1.50 = **$499.50**
- **Valor nocional de la posición:** 333 × 187.40 = **$62,404.20**

Redondea siempre hacia *abajo*. Redondear 333.33 hacia arriba a 334 pone tu riesgo en $501 — apenas por encima, pero redondear a tu propio favor no es un hábito que quieras construir.

Fíjate en la última línea. Una posición de $62,404 en una cuenta de $50,000 excede el efectivo que tienes. En una cuenta de contado no podrías tomar esta operación a tamaño completo; en una cuenta de margen sí podrías, y el apalancamiento es invisible porque el número de riesgo sigue marcando $500. Así que agrega una segunda restricción: una exposición nocional máxima. Limítala al 100% del capital y la posición se convierte en 266 acciones arriesgando $399. La fórmula de tamaño te da un techo para la pérdida, no permiso para cargar cualquier cantidad de acciones.

<div class="table-wrap">

| Precio de stop | Riesgo/acción | Acciones para $500 | Riesgo real | Nocional |
|---|---|---|---|---|
| 186.90 | 0.50 | 1,000 | $500.00 | $187,400 |
| 185.90 | 1.50 | 333 | $499.50 | $62,404 |
| 184.40 | 3.00 | 166 | $498.00 | $31,108 |
| 183.90 | 3.50 | 142 | $497.00 | $26,611 |

</div>

Cada fila arriesga esencialmente los mismos $500. Así se ve cuando el tamaño es un resultado.

## La recuperación de un drawdown es brutalmente asimétrica

Este es el argumento más persuasivo de toda la gestión de riesgo, y es pura aritmética.

Pierde dinero y tendrás que recuperar un *porcentaje mayor* del que perdiste, porque lo estás ganando sobre una base más pequeña. Pierde 50% de $50,000 y te quedan $25,000. Recuperarte significa convertir $25,000 en $50,000 — una ganancia del 100%. No 50%. La pérdida y la recuperación nunca son el mismo número.

La forma general es **recuperación = pérdida ÷ (1 − pérdida)**:

<div class="table-wrap">

| Drawdown | Capital restante de $50,000 | Ganancia necesaria para recuperar |
|---|---|---|
| 10% | $45,000 | 11.1% |
| 20% | $40,000 | 25.0% |
| 30% | $35,000 | 42.9% |
| 40% | $30,000 | 66.7% |
| 50% | $25,000 | 100.0% |
| 75% | $12,500 | 300.0% |

</div>

Verifica una fila del medio: 30% de caída deja $35,000, y 35,000 × 1.429 = $50,015. Correcto.

Lee la última fila despacio. Un drawdown del 75% requiere cuadruplicar lo que queda solo para llegar a la línea de partida, y los traders en esa posición casi nunca lo logran — la única forma de intentarlo es tomar riesgos aún mayores, que es justo lo que produjo el hoyo. La curva se empina viciosamente después del 30%, por eso limitar las pérdidas pequeñas importa más que capturar ganancias grandes.

## Una racha de cinco pérdidas es normal, y esto es lo que cuesta

Supón que tu estrategia gana el 40% de las veces — una cifra perfectamente viable si tus ganadoras son más grandes que tus perdedoras. Entonces cada operación pierde con probabilidad 0.60, y cinco pérdidas consecutivas ocurren con probabilidad 0.60⁵ = 0.0778, cerca de **7.8%**.

Eso no es un escenario de desastre. A lo largo de 100 operaciones hay 96 lugares donde podría comenzar una racha de cinco pérdidas, y el número esperado de esas rachas es aproximadamente **tres**. Una racha de cinco no es mala suerte. Es un martes cualquiera. Así que la única pregunta es qué le hace a tu cuenta una racha ordinaria:

<div class="table-wrap">

| Riesgo por operación | Después de 5 pérdidas seguidas | Capital restante de $50,000 |
|---|---|---|
| 1% | 0.99⁵ = 95.1% | $47,549 |
| 2% | 0.98⁵ = 90.4% | $45,196 |
| 5% | 0.95⁵ = 77.4% | $38,689 |
| 10% | 0.90⁵ = 59.0% | $29,525 |

</div>

Al 1%, cinco pérdidas te cuestan 4.9% y necesitas 5.2% para recuperarte. Apenas lo notas. Al 5%, la misma racha ordinaria cuesta 22.6% y necesita una ganancia del 29.2% para deshacerse. Al 10% estás abajo 41% y necesitas una ganancia del 69.4% — de una estrategia que acaba de perder cinco seguidas, que es precisamente cuando estarás menos capaz de ejecutarla.

Extiende la racha. Ocho pérdidas seguidas tiene probabilidad 0.60⁸ ≈ **1.7%** — poco común, pero te va a pasar. Al 1% de riesgo, queda 0.99⁸ = 92.3% de la cuenta. Al 10% de riesgo, queda 43.0% y necesitas una ganancia del 132%. El riesgo de ruina no es un concepto exótico; es esta tabla extendida lo suficiente. Un riesgo pequeño por operación es lo que hace que una racha ordinaria sea sobrevivible en lugar de terminal.

## Los múltiplos de R convierten cada operación en la misma unidad

Una vez que el riesgo en dólares es constante, expresa los resultados en **R**, donde 1R es tu presupuesto de riesgo para esa operación — $500 en nuestro ejemplo.

Una operación que gana $1,250 es +2.5R. Una que pierde el stop completo es −1R. Una salida temprana por $180 es +0.36R. Ahora una operación de 333 acciones en una acción y una de 142 acciones en algo del doble de precio son directamente comparables, porque ambas arriesgaron una unidad.

Esto hace que la expectativa sea calculable. Con una tasa de acierto del 40% y ganadoras promedio de +2R y perdedoras promedio de −1R:

**(0.40 × 2R) + (0.60 × −1R) = 0.80R − 0.60R = +0.20R por operación**

Veinte centavos de R por operación, o $100 con una unidad de $500. Eso es aritmética sobre una muestra pasada, no un pronóstico — las tasas de acierto varían y las ventajas se degradan, así que una expectativa histórica positiva no promete nada sobre las próximas cien operaciones. Pero sí muestra por qué una tasa de acierto del 40% está bien, mientras que una del 60% con perdedoras de −2R puede seguir siendo una estrategia perdedora. Esa segunda afirmación depende enteramente del tamaño de la ganadora: con 60% de aciertos y perdedoras de −2R, el equilibrio necesita una ganadora promedio de +1.33R, así que ganadoras de +2R en realidad convertirían esto en un sistema sólido a +0.4R por operación, y cualquier cosa por debajo de +1.33R lo hunde. La tasa de acierto sola nunca es suficiente para juzgar. La [vista de análisis](/es/blog/analiza-tus-metricas-de-rendimiento/) de Stockade sigue la tasa de acierto, el factor de beneficio y la ganancia/pérdida promedio, los datos crudos para este cálculo.

## Los límites de pérdida diarios y semanales evitan que un mal día se acumule

El tamaño de posición limita una sola operación. No hace nada respecto a la séptima operación de una mañana frustrante, tomada al triple de tamaño para recuperar el día.

Establece límites duros en R. Una estructura común es **−3R diario, −6R semanal** — al 1% de riesgo en $50,000, eso es $1,500 en un día y $3,000 en una semana. Llega al límite diario y terminaste: plataforma cerrada, sin "un setup más". Su valor está en que los define de antemano una versión de ti que en ese momento no está perdiendo. El revenge trading no es un defecto de carácter; es lo que pasa cuando se le permite a un cerebro alterado elegir el tamaño de las posiciones. Escribe los números en tu [plan de trading](/blog/how-to-build-a-trading-plan) para que la decisión ya esté tomada.

## Las posiciones correlacionadas hacen que tu exposición real sea mayor que la suma

Tres posiciones arriesgando cada una exactamente 1% se siente como 3% en riesgo. Normalmente no lo es. Si las tres son acciones de semiconductores, comparten un solo motor: un mal dato del sector activa los tres stops juntos y pierdes 3% en un solo movimiento. No tomaste tres operaciones del 1%, tomaste una operación del 3% en tres tickers. Lo mismo aplica a tres tokens cripto que siguen los mismos flujos, o una acción larga junto a un futuro de índice largo.

La solución es un límite combinado por tema — no más del 2% del riesgo total en un sector, factor o dirección, sin importar cuántos tickers abarque. Antes de agregar una posición, pregúntate qué titular único detendría todo lo que tienes al mismo tiempo, y suma el daño.

Stockade no puede enseñarte esto, y falla en dos aspectos distintos. Cada serie de precios de cada instrumento se genera con su propia caminata aleatoria independiente, así que la correlación entre símbolos no está modelada en absoluto. Más fundamentalmente, el simulador mantiene exactamente una posición a la vez — cambiar de símbolo descarta lo que tenías abierto — así que no hay una cartera que sumar aunque las correlaciones existieran. La exposición a nivel de cartera no es algo que puedas practicar aquí en absoluto; hay que entenderla como un concepto de mercado real y aplicarla la primera vez que genuinamente sostengas dos cosas a la vez.

## La regla del 1% es una convención, no una ley

No hay nada mágico en el 1%. Es un valor predeterminado común porque sobrevive rachas perdedoras largas mientras deja que las buenas operaciones importen. El número defendible depende de tu tasa de acierto, tu múltiplo de R promedio, qué tan correlacionadas están tus posiciones, y cómo te comportas cuando vas perdiendo. Algunos profesionales arriesgan 0.25% porque toman muchas posiciones a la vez; algunos swing traders arriesgan 2% en un puñado de ideas al mes. Ambos son coherentes. Lo que no es coherente es 8% "porque el setup estaba realmente bueno" — la convicción no es un parámetro de riesgo, y al mercado nunca se le informó de la tuya.

Vale la pena decir una asimetría claramente: los principiantes casi universalmente arriesgan demasiado, no muy poco. Si tienes dudas, empieza en 1%. El costo de empezar demasiado pequeño es una cuenta más lenta; el costo de empezar demasiado grande es no tener cuenta.

## Practica esto en el simulador

Toma veinte operaciones en el saldo virtual de $100,000 de Stockade donde calcules la cantidad de acciones *antes* de abrir la orden — entrada, stop, riesgo por acción, y luego tamaño, en ese orden. Al 1% eso es $1,000 por operación, así que revisa el diario de operaciones después para ver si tus pérdidas realizadas realmente se agrupan cerca de 1R o se pasan de largo. Recuerda que un stop simulado se ejecuta en el tick que cruzó tu nivel en lugar de en el nivel mismo, y que el dinero virtual hace que esta disciplina sea mucho más fácil de lo que será nunca el dinero real. Practica la aritmética en el [simulador de mercado de valores de Stockade](/es/simulator/) hasta que la división sea automática.
