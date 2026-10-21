---
title: "Bandas de Bollinger Explicadas: Qué Miden las Bandas"
description: "Bandas de Bollinger: miden volatilidad en torno a una media de 20 períodos, no sobrecompra ni sobreventa. El cálculo, los toques, el squeeze y el mito del 95%."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indicadores", "Análisis Técnico"]
slug: "bandas-de-bollinger-explicadas"
translationOf: "bollinger-bands-explained"
---

El precio atraviesa hacia arriba la banda superior de Bollinger. El gráfico se ve estirado, la banda parece un techo, y vender parece la operación obvia. Luego el precio sigue cerrando en la banda superior, vela tras vela, y tu corto salta por el stop en un movimiento que nunca volvió.

Ahí las bandas no fallaron. Se leyeron como algo que no son. Las bandas de Bollinger miden qué tan dispersos están los precios recientes alrededor de un promedio. No miden si el precio está demasiado alto, y la persona que las inventó lo dice con claridad.

## Cómo se calculan las bandas de Bollinger

[John Bollinger desarrolló las bandas a principios de los años ochenta](https://cmtassociation.org/presenter/john-bollinger/). Tienen tres líneas:

```
Banda media    = media móvil simple de 20 períodos de los cierres
Banda superior = banda media + 2 × desviación estándar de los mismos 20 cierres
Banda inferior = banda media − 2 × desviación estándar de los mismos 20 cierres
```

[La descripción del propio Bollinger](https://www.bollingerbands.com/bollinger-bands) da 20 períodos y dos desviaciones estándar como valores por defecto, sin cambios desde que se decidió por ellos, y añade que usa la fórmula poblacional de la desviación estándar.

La desviación estándar se entiende mejor con números. Usaremos cinco cierres en lugar de 20 para que la aritmética quepa en una pantalla. Digamos que los últimos cinco cierres de una acción hipotética son $50, $51, $49, $52 y $53:

1. **Promedio:** 255 ÷ 5 = $51.
2. **Distancia de cada cierre al promedio:** −1, 0, −2, +1, +2.
3. **Eleva cada una al cuadrado y promedia los cuadrados:** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. Esa es la varianza.
4. **Saca la raíz cuadrada:** √2 = $1.41. Esa es la desviación estándar.
5. **Bandas:** $51 ± 2 × $1.41, es decir, $48.17 y $53.83.

Dividir entre 5 en el paso 3 es la fórmula poblacional. La fórmula muestral divide entre 4, lo que aquí daría $1.58 y unas bandas algo más anchas, así que dos plataformas de gráficos pueden discrepar un poco según cuál usen.

## Lo que las bandas miden en realidad

Ahora toma cinco cierres distintos con el mismo promedio de $51: $50.60, $51.20, $50.80, $51.40 y $51.00. Todos quedan a 40 centavos o menos del promedio, así que la desviación estándar es solo $0.28 y las bandas están en $50.43 y $51.57. Mismo promedio, bandas con una quinta parte del ancho. Esa es toda la idea: las bandas se ensanchan cuando los precios se dispersan y se estrechan cuando se agrupan.

Esta es la parte que sorprende a la gente. Prueba con cinco cierres que suben de forma constante exactamente $1 cada uno: $50, $51, $52, $53, $54. Cada movimiento es de $1, en promedio más pequeño que los saltos del primer ejemplo, y aun así la desviación estándar vuelve a ser $1.41 y las bandas son igual de anchas, en $49.17 y $54.83. Las bandas miden qué tan lejos quedan los cierres de su *promedio*, y una tendencia aleja los cierres del promedio incluso cuando cada movimiento es pequeño.

Eso las diferencia del [ATR](/es/blog/stop-loss-con-atr/), que promedia el tamaño del rango de cada barra. Una tendencia suave y constante hecha de velas pequeñas mostraría un ATR moderado y unas bandas de Bollinger bastante anchas. Ninguno de los dos se equivoca. Responden a preguntas distintas: el ATR pregunta cuánto se mueve una barra típica, y las bandas preguntan qué tan lejos se ha alejado el precio de su promedio reciente.

El ancho de las bandas también sirve para comprobar a grandes rasgos un stop. Con las bandas anchas del primer ejemplo, separadas por $5.66, un stop $0.50 por debajo de tu entrada queda muy dentro del rango que han cubierto los cierres últimamente, así que el movimiento ordinario puede alcanzarlo. Con las bandas estrechas, separadas por $1.14, esos mismos $0.50 son casi la mitad de la dispersión. En cualquier caso, el stop sigue yendo donde tu idea queda demostrada como errónea, y el número de acciones sigue saliendo de la distancia del stop, como en el ejemplo resuelto de la guía de ATR.

## Tocar la banda es un toque, no una señal

Este es el error de lectura del principio, y Bollinger lo aborda directamente. Entre [sus reglas para usar las bandas](https://www.bollingerbands.com/bollinger-band-rules): "Los toques de las bandas son solo eso, toques, no señales". Un toque de la banda superior no es, por sí solo, una señal de venta, y un toque de la banda inferior no es una señal de compra. La misma lista dice que en mercados con tendencia el precio puede subir pegado a la banda superior o bajar pegado a la inferior, y que los cierres fuera de las bandas son inicialmente señales de continuación, no de reversión.

Eso encaja con lo que dice la aritmética. El precio solo llega a la banda superior subiendo bastante por encima de su promedio reciente, que es justo el aspecto de un movimiento fuerte. Es la misma lección que [la lectura de "sobrecompra" del RSI](/es/blog/indicador-rsi-sobrecompra-sobreventa/): una lectura alta describe una fuerza que ya ocurrió, no una reversión pendiente.

Lo que sí te dice un toque de la banda es que el precio está alto o bajo *respecto a su propio rango reciente*. Eso es contexto. Que sea un motivo para operar depende de todo lo demás: la tendencia, el [soporte o la resistencia](/es/blog/soporte-y-resistencia/) más cercanos, y lo que diga tu setup.

## Dónde está el precio dentro de las bandas: %b

Las reglas de Bollinger también describen el %b, que convierte la posición dentro de las bandas en un solo número:

```
%b = (cierre − banda inferior) ÷ (banda superior − banda inferior)
```

En la banda inferior el %b es 0, en la banda media 0.5 y en la banda superior 1. Baja de 0 o supera 1 cuando el precio cierra fuera de las bandas. Volviendo al primer ejemplo, un cierre de $53 con bandas en $48.17 y $53.83 da (53 − 48.17) ÷ 5.66 = 0.85.

Lo valioso del %b es que hace comparable la posición dentro de las bandas entre instrumentos y a lo largo del tiempo, como hace dividir el ATR entre el precio. Un cierre en $53 no significa nada por sí solo; 0.85 dice que está cerca de la parte alta de su dispersión reciente. Sigue siendo una ubicación, no una señal, y todo lo de la sección anterior se aplica: en una tendencia fuerte, el %b puede quedarse cerca de 1 o por encima durante un tramo largo.

## La mala lectura del 95%

Una afirmación común es que el 95% de los precios se queda dentro de las bandas, así que cualquier cosa fuera es un evento raro que debería volver de golpe. Viene de un dato estadístico real: en una distribución normal, cerca del 95% de los valores cae a menos de dos desviaciones estándar de la media.

Los precios no siguen una distribución normal, y Bollinger lo dice en las mismas reglas: no hagas suposiciones estadísticas a partir del uso de la desviación estándar en las bandas, porque las distribuciones de precios no son normales y las muestras son demasiado pequeñas para tener significación estadística. Añade que en la práctica suele encontrar cerca del 90%, no el 95%, de los datos dentro de las bandas con los valores por defecto.

Incluso tomándolo al pie de la letra, un 90% dentro significa que uno de cada diez cierres queda fuera. En barras diarias, eso son unos dos cierres al mes, algo normal, no raro. Y según las propias reglas de Bollinger, un cierre fuera de las bandas es inicialmente una señal de continuación, no de reversión.

## El squeeze: cuando las bandas se estrechan

Un squeeze (o compresión) es un tramo en el que las bandas se juntan de forma inusual. Se mide con el BandWidth, la distancia entre las bandas como porcentaje de la banda media:

```
BandWidth = (banda superior − banda inferior) ÷ banda media × 100
```

Con los dos ejemplos de cinco cierres de arriba: ($53.83 − $48.17) ÷ $51 × 100 = 11.1, y ($51.57 − $50.43) ÷ $51 × 100 = 2.2. El segundo es un squeeze comparado con el primero.

"Estrecho" es relativo a la propia historia del instrumento. [La guía de StockCharts sobre el BandWidth](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) sugiere juzgarlo frente al rango de los últimos ocho a doce meses, y dice que el squeeze por sí mismo no da una dirección: esa sale de la ruptura de las bandas que viene después, y las primeras rupturas pueden fallar.

Los traders vigilan los squeezes partiendo de la premisa de que los tramos tranquilos no duran para siempre. Nosotros trataríamos uno como una condición más que como un disparador. Puede decirte que prestes atención. No puede decirte hacia qué lado operar.

## Cómo elegir los ajustes y la banda media

Los valores por defecto son un punto de partida, no una ley; las reglas de Bollinger dicen que los parámetros adecuados pueden variar según el mercado y la tarea. Si cambias la longitud, cambia el multiplicador con ella: sus reglas dan 2.1 desviaciones estándar a 50 períodos, y la [guía de bandas de Bollinger](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) de StockCharts añade 1.9 a 10 períodos.

La banda media es una media móvil simple, no una exponencial. Si conoces las EMA por [la guía de medias móviles](/es/blog/medias-moviles-ema-vs-sma/), las dos se siguen de cerca pero no son la misma línea, y una EMA reacciona más rápido a los últimos cierres. Las reglas de Bollinger también dicen que la banda media debería describir la tendencia de plazo intermedio, en lugar de ajustarse para buscar cruces.

Si quieres una segunda opinión junto a las bandas, elige una que mida algo distinto. La propia lista de Bollinger advierte que dos indicadores de momentum no son mejores que uno, así que añadir tanto el RSI como el [MACD](/es/blog/macd-explicado/) junto a las bandas aporta menos de lo que parece: los dos miden momentum.

## Practica esto en el simulador

Stockade no muestra bandas de Bollinger. Sus gráficos tienen EMA 9, 20 y 50, VWAP, RSI y MACD. Todos los símbolos funcionan con un único ajuste de volatilidad, escalado a su precio, así que no hay ciclos de volatilidad como los de un mercado real. Aun así, las oscilaciones del precio varían: suben y bajan por azar y se amplían cuando el sesgo de tendencia oculto es fuerte. Así que si las bandas que calculas con los cierres de Stockade se estrechan en lo que parece un squeeze, es esa variación por azar, no el tipo de ciclo de volatilidad que un squeeze pretende captar. Lo que sí puedes practicar es el cálculo y la mitad de la media móvil. En el [simulador de gráficos](/es/chart-simulator/), pasa el cursor sobre las últimas 20 velas y copia cada cierre de la barra de lectura a una hoja de cálculo. Calcula el promedio y la desviación estándar poblacional (en la mayoría de las hojas de cálculo, PROMEDIO y DESVEST.P en español, o AVERAGE y STDEV.P en inglés), marca dónde quedarían las bandas y compara esa SMA de 20 períodos con la línea EMA 20 del gráfico. Hazlo una vez en un tramo con tendencia y otra en uno lateral, y observa cómo la tendencia ensancha las bandas. Luego lleva el mismo hábito al [simulador](/es/simulator/): antes de actuar ante un precio estirado, pregúntate qué tan lejos está de su promedio y si esa distancia es inusual o simplemente una tendencia.
