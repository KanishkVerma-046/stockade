---
title: "MACD Explicado: Cómo Leerlo y Operar Con Él"
description: "El MACD son dos medias móviles, su diferencia, y una copia suavizada de esa diferencia. Cómo calcular cada parte, leerla y saber cuándo miente."
date: 2026-04-27
author: "Stockade Team"
tags: ["Indicadores"]
slug: "macd-explicado"
translationOf: "macd-explained"
---

Estás viendo un gráfico subir y no puedes responder la única pregunta que importa: ¿este movimiento sigue ganando fuerza, o va en piloto automático? Una acción puede imprimir cinco cierres al alza seguidos mientras cada uno de esos cierres avanza menos que el anterior — tendencia intacta, motor muriendo. Para cuando eso se refleja en el precio, suele ser demasiado tarde para actuar.

El MACD existe para ese vacío. No te dice dónde está el precio. Te dice si la *distancia entre dos medias móviles* se está ampliando o cerrando, lo cual es un proxy aproximado de si un movimiento se está acelerando o desacelerando. Es un trabajo más limitado del que la mayoría le atribuye, y entender esa limitación es lo que separa usar el MACD de dejarse engañar por él.

## Los tres componentes y cómo se calcula cada uno

MACD son las siglas de Moving Average Convergence Divergence (convergencia y divergencia de medias móviles) — un nombre honesto, ya que todo el indicador trata de dos medias móviles convergiendo o divergiendo. Tiene tres partes, cada una construida sobre la anterior.

<div class="table-wrap">

| Componente | Fórmula | Qué mide |
|---|---|---|
| Línea MACD | EMA de 12 períodos − EMA de 26 períodos | La brecha entre la tendencia rápida y la lenta |
| Línea de señal | EMA de 9 períodos de la línea MACD | Una versión suavizada de esa brecha |
| Histograma | Línea MACD − línea de señal | Si la brecha se amplía o se cierra |

</div>

### La línea MACD

Toma una media móvil exponencial de las últimas 12 velas y otra de las últimas 26, y resta la lenta de la rápida. Para ver cómo una EMA pondera más los datos recientes que los antiguos, consulta [medias móviles: EMA vs SMA](/es/blog/medias-moviles-ema-vs-sma/).

En concreto: si la EMA de 12 períodos es 188.40 y la EMA de 26 períodos es 186.90, la línea MACD marca 188.40 − 186.90 = **1.50**. La media rápida está $1.50 por encima de la lenta. Ese número está en las unidades propias del precio — dólares en este caso, no un porcentaje ni una escala acotada de 0 a 100 como el [RSI](/es/blog/indicador-rsi-sobrecompra-sobreventa/). Una acción de $400 produce rutinariamente valores de MACD diez veces mayores que una de $40, por lo que las lecturas de MACD nunca son comparables entre instrumentos.

### La línea de señal

La línea MACD es errática, así que el MACD aplica un segundo paso de suavizado: una EMA de 9 períodos de la propia línea MACD. Esa es la línea de señal, y por construcción va rezagada respecto a la línea MACD, al ser un promedio del historial reciente de esa misma línea.

La constante de suavizado de la EMA es 2 ÷ (período + 1), así que la línea de señal usa 2 ÷ 10 = 0.20 — cada nuevo valor es el anterior más el 20% de la distancia al valor actual del MACD. Si la línea de señal estaba en 1.20 y la línea MACD marca 1.72, la nueva señal es 1.20 + 0.20 × (1.72 − 1.20) = 1.20 + 0.104 = 1.304.

### El histograma

El histograma es la pieza más simple: línea MACD menos línea de señal, dibujada como barras por encima y por debajo de cero. Con la línea MACD en 1.50 y la línea de señal en 1.20, la barra del histograma es 1.50 − 1.20 = **0.30**.

Como el histograma se define como esa diferencia, cruza el cero exactamente en la misma vela en la que la línea MACD cruza la línea de señal. Son un solo evento dibujado de dos formas. Cualquiera que afirme que un cruce de cero en el histograma *confirma* un cruce de la línea de señal está describiendo lo mismo dos veces.

## Por qué los ajustes son 12, 26 y 9

Estos números son convención, no matemática. Gerald Appel los eligió al construir el MACD a finales de los años setenta, y han sido el valor predeterminado desde entonces. No hay ninguna derivación que recuperar: ninguna propiedad de los mercados hace que 12 y 26 sean especiales, y no encontrarás ningún cálculo que llegue a ellos. Circulan historias de origen que suenan ordenadas — que corresponden a algún conteo prolijo de semanas o sesiones — pero son folclore inventado después de los hechos para explicar una elección que simplemente fue una elección. Lo que importa es qué controlan esos números: 12 y 26 determinan qué tan rápida y qué tan lenta es cada media, y 9 determina cuánto suavizado se aplica encima.

Importan hoy sobre todo porque mucha gente los usa. Un valor predeterminado que millones de pantallas muestran se vuelve levemente autocumplido: cuando aparece un cruce muy observado, algunos traders actúan sobre él, poniendo órdenes reales detrás de un número arbitrario. Es un efecto débil, no una ley, pero supera cualquier afirmación de que los ajustes son óptimos.

Puedes cambiarlos. Acortar a 6/13/5 hace que el MACD sea más nervioso y temprano — más señales, más de ellas equivocadas. Alargar a 19/39/9 lo hace más lento y limpio — menos señales, más tardías. Ninguno es mejor; estás eligiendo en qué punto de la curva entre capacidad de respuesta y ruido quieres situarte. Lo que no debes hacer es ajustar los parámetros hasta que capturen los últimos tres movimientos del gráfico que tienes enfrente. Eso es ajustar la curva a los datos pasados, y describe la historia en lugar de predecir algo.

## Cruces de la línea cero versus cruces de la línea de señal

Son eventos distintos con significados distintos, y confundirlos es el error más común con el MACD.

**Que la línea MACD cruce el cero** significa que la EMA de 12 ha cruzado la EMA de 26 — un cruce de medias móviles simple, dicho de otra forma. Por encima de cero, la media rápida está por encima de la lenta; por debajo, al revés. Es una afirmación sobre la dirección de la tendencia, y por involucrar la media lenta de 26 períodos, llega tarde.

**Que la línea MACD cruce la línea de señal** significa que la brecha actual entre las medias se ha alejado de su propia brecha promedio reciente. Es una afirmación sobre un cambio de momentum, y aparece antes que el cruce de cero — a menudo mucho antes, y a menudo cuando no hay ningún cambio de tendencia en absoluto.

La lectura práctica: un cruce alcista de señal mientras el MACD está bien por debajo de cero es un rebote dentro de una tendencia bajista hasta que se demuestre lo contrario. Ese mismo cruce mientras el MACD empuja hacia arriba a través de cero es una afirmación más fuerte, porque dos cosas están de acuerdo. Filtrar los cruces de señal según de qué lado del cero ocurren reduce drásticamente tu número de señales, que es justamente el punto.

## Leer el histograma, y la trampa que contiene

Aquí está el matiz que hace que valga la pena tener el histograma. Recorre cinco velas de un rally:

<div class="table-wrap">

| Vela | Precio | Línea MACD | Línea de señal | Histograma |
|---|---|---|---|---|
| 1 | 190.10 | 1.50 | 1.20 | 0.30 |
| 2 | 192.40 | 1.72 | 1.30 | 0.42 |
| 3 | 194.30 | 1.85 | 1.41 | 0.44 |
| 4 | 195.60 | 1.90 | 1.51 | 0.39 |
| 5 | 196.20 | 1.88 | 1.58 | 0.30 |

</div>

El precio subió en cada una de las velas, de 190.10 a 196.20. Pero el histograma alcanzó su punto máximo de 0.44 en la vela 3 y se redujo en las velas 4 y 5, hasta volver a donde empezó.

**Un histograma que se reduce no significa que el precio esté cayendo. Significa que el precio sube más lento de lo que subía.** El movimiento se está desacelerando mientras sigue avanzando. En la vela 5 la línea MACD de hecho bajó, de 1.90 a 1.88, incluso cuando el precio marcó otro cierre más alto — las dos medias han empezado a converger.

Eso es genuinamente útil, y también es donde la gente sale lastimada. Desaceleración no es reversión. Una tendencia que se ralentiza puede aplanarse, consolidar durante veinte velas y reanudarse. Un histograma que se reduce es una razón para ajustar un stop o dejar de sumar a una posición; tratar cada reducción como una señal de venta corta te hace pelear contra tendencias fuertes una y otra vez.

Si la vela 6 marcara un MACD de 1.60, la línea de señal pasaría a 1.5876 y el histograma a aproximadamente 0.01 — casi plano, aún positivo. Un MACD de 1.40 en la vela 7 lleva la señal a 1.5500 y el histograma a −0.15: el cruce real, tres velas después de que el histograma te advirtiera por primera vez.

## La divergencia del MACD y cuánto vale

La divergencia ocurre cuando el precio y el MACD no están de acuerdo sobre la dirección.

**Divergencia bajista:** el precio hace un máximo más alto, pero el pico correspondiente de la línea MACD es más bajo que su pico anterior. El nuevo máximo de precio se logró con menos momentum detrás.

**Divergencia alcista:** el precio hace un mínimo más bajo mientras la línea MACD hace un mínimo más alto. La presión vendedora se está debilitando incluso mientras el precio sigue cayendo.

La divergencia vale la pena observarla y no vale la pena operarla sola. Las tendencias fuertes la producen durante tramos extensos — una tendencia alcista puede mostrar divergencia bajista a lo largo de docenas de velas mientras hace nuevos máximos, porque el impulso inicial fijó un pico de momentum que la tendencia nunca necesita volver a igualar. La divergencia te dice que un movimiento está cansado, no que ha terminado.

Se vuelve más creíble cuando algo independiente coincide: una línea de tendencia rota, un fallo en un nivel que antes se sostuvo, o un patrón de volumen que contradice el movimiento de precio. El [volumen](/es/blog/entendiendo-el-volumen-de-trading/) es útil como confirmación precisamente aquí porque proviene de un input distinto al del MACD. Que dos indicadores derivados de los mismos precios de cierre coincidan no es confirmación; es aritmética.

## Por qué el MACD tiene doble rezago y falla en mercados laterales

Dos debilidades estructurales, ambas permanentes.

**Es rezago construido sobre rezago.** Una EMA ya mira hacia atrás — la EMA de 26 períodos tiene un centro de masa a unas doce velas y media atrás. El MACD resta dos de esas, y luego suaviza el resultado con una *tercera* EMA para crear la línea de señal. Cada cruce describe algo que ya terminó de suceder. Nada en el MACD es predictivo; comprime el historial reciente de precios en un número, y esa compresión toma tiempo.

**Produce señales falsas constantes en mercados laterales.** La premisa del MACD es que hay una tendencia que medir. Cuando el precio oscila dentro de un rango, las dos EMA quedan casi una encima de la otra, la línea MACD ronda el cero, y cruza la línea de señal una y otra vez cada pocas velas. Cada cruce se ve idéntico a uno real. Una tarde volátil puede generar ocho cruces, todos ruido, y tomarlos te cuesta spread y comisiones antes de que la dirección siquiera entre en juego.

La defensa estándar es tomar señales del MACD solo en la dirección de una tendencia de mayor plazo — solo cruces alcistas mientras el precio está por encima de su EMA de 50 períodos, por ejemplo. Una más barata es revisar si la línea MACD está lejos de cero; los cruces que aparecen con barras de histograma apenas visibles rara vez importan.

## Practica esto en el simulador

Leer sobre un histograma que se reduce no es lo mismo que notarlo mientras una posición está abierta y en verde. Activa el MACD y observa el histograma durante un movimiento completo — marca la vela donde alcanza su pico, y luego cuenta cuántas velas más siguió subiendo el precio antes de que la línea MACD realmente cruzara. Esa brecha es tu rezago, medido en lugar de descrito.

Después opéralo. Cada vez que aparezca un cruce de línea de señal, decide antes de la siguiente vela si lo tomarías y anota de qué lado de cero ocurrió. Haz eso treinta veces y tendrás tu propio conteo de cuántos cruces en mercado lateral valía la pena tomar — más convincente que cualquier cosa dicha aquí. Cada precio en Stockade se genera algorítmicamente en lugar de extraerse de un mercado real, así que lo que estás entrenando es la lectura, no un pronóstico. Y sé honesto: con $100,000 de capital virtual, aguantar un histograma que se reduce es mucho más fácil que cuando el dinero sea realmente tuyo. Comienza en el [simulador de mercado de valores de Stockade](/es/simulator/).
