---
title: "Medias Móviles Explicadas: EMA vs SMA y Cómo Usarlas"
description: "SMA y EMA se diferencian por un multiplicador. La aritmética, por qué 9/20/50 son estándar, cómo usarlas como soporte, y por qué siempre van rezagadas."
date: 2026-04-13
author: "Stockade Team"
tags: ["Indicadores", "Análisis Técnico"]
slug: "medias-moviles-ema-vs-sma"
translationOf: "moving-averages-ema-vs-sma"
---

Estás mirando un gráfico que subió, bajó, subió, bajó y volvió a subir durante las últimas cuarenta velas, y no puedes saber si está en tendencia o simplemente tambaleándose. Cada vela individual es ruido. La pregunta que quieres responder — "¿esto va generalmente hacia algún lado?" — no es visible en ninguna vela por sí sola, porque es una pregunta sobre toda la secuencia.

Una media móvil es la respuesta más simple a esa pregunta. Toma una serie de precios de cierre recientes, los colapsa en un solo número, y redibuja ese número en cada nueva vela. El nerviosismo se cancela, y lo que queda es una línea que puedes mirar y llamar de inmediato ascendente, descendente o plana.

## Qué calcula realmente una media móvil

Toma los últimos cinco precios de cierre de algún instrumento: 182.00, 184.50, 183.00, 186.00, 185.50. Súmalos: 921.00. Divide entre 5: **184.20**. Esa es una media móvil simple de 5 períodos, o SMA.

La palabra "móvil" es la mitad importante. En la siguiente vela llega un nuevo cierre — digamos 190.00 — y el más antiguo, 182.00, sale de la ventana. La nueva suma es 921.00 − 182.00 + 190.00 = 929.00, y la nueva SMA es 929.00 ÷ 5 = **185.80**. La ventana se desplazó una vela hacia adelante y la media subió 1.60.

Nota que la media cambió por dos razones: entró un precio nuevo *y* salió uno antiguo. Ese segundo efecto es fácil de pasar por alto — una SMA puede saltar simplemente porque un número grande salió por detrás de la ventana, aunque el precio de hoy apenas se haya movido.

## SMA vs EMA: el multiplicador de ponderación y por qué la EMA reacciona más rápido

La SMA le da el mismo voto a cada precio dentro de su ventana. En una SMA de 20 períodos, el cierre de hace 20 velas cuenta tanto como el de ayer — y luego, en la siguiente vela, no cuenta absolutamente nada. Es un modelo extraño de relevancia.

La media móvil exponencial lo corrige. En lugar de una ventana, la EMA mantiene un valor continuo y lo empuja hacia cada nuevo cierre en una fracción fija — el **multiplicador de suavizado**:

```
multiplicador = 2 / (período + 1)
```

Para una EMA de 9 períodos eso es 2 / 10 = **0.2**. La regla de actualización es:

```
nueva EMA = EMA anterior + multiplicador x (nuevo cierre - EMA anterior)
```

Trabajemos una vela. Supón que la EMA de 9 períodos marca actualmente 186.50 y la vela cierra en 188.00. La brecha es 188.00 − 186.50 = 1.50. Multiplica por 0.2 para obtener 0.30. Entonces:

**nueva EMA = 186.50 + 0.2 x (188.00 − 186.50) = 186.50 + 0.30 = 186.80**

La EMA se movió 30 centavos en respuesta a un movimiento de $1.50. Cierra el 20% de la distancia al nuevo precio en cada vela, para siempre. Nada desaparece por completo de una EMA — los precios antiguos solo se encogen. Con un multiplicador de 0.2, el peso de un cierre de hace *n* velas es 0.2 × 0.8ⁿ, así que un precio de hace 10 velas todavía carga cerca del 2.1% del peso, y uno de hace 30 velas carga un error de redondeo.

Ahora la comparación de velocidad. Nuestra SMA de 5 períodos pasó de 184.20 a 185.80 — una ganancia de 1.60 — cuando llegó 190.00. Una EMA de 5 períodos situada en ese mismo 184.20, con multiplicador 2/6 = 0.3333, pasaría a 184.20 + 0.3333 × 5.80 = **186.13**, una ganancia de 1.93. Mismos datos, más movimiento. Esa es toda la diferencia: la EMA reacciona más rápido porque pondera más los precios recientes.

Más rápido no es mejor. Más rápido significa señales más tempranas *y* más falsas. Una SMA es más silenciosa y te mantendrá en una tendencia durante retrocesos que sacudirían a un trader que usa EMA. Los gráficos de Stockade calculan las EMA de la forma estándar: el primer valor se inicializa con un promedio simple de la ventana de apertura, y cada vela posterior usa el multiplicador de arriba.

## Elegir un período, y por qué 9, 20 y 50 aparecen en todas partes

El período es un dial que equilibra la capacidad de respuesta contra la estabilidad. Los períodos cortos se pegan al precio y giran constantemente; los largos ignoran la mayor parte de lo que pasa y giran pocas veces. Mira lo que hace el multiplicador en las tres EMA que Stockade superpone, usando una EMA anterior de 186.50 y un cierre de 188.00 en cada fila:

<div class="table-wrap">

| EMA | Multiplicador | Movimiento con brecha de +1.50 | Rol |
|---|---|---|---|
| EMA 9 | 2/10 = 0.2000 | +0.30 | Momentum de corto plazo |
| EMA 20 | 2/21 = 0.0952 | +0.14 | Tendencia intradía |
| EMA 50 | 2/51 = 0.0392 | +0.06 | Sesgo estructural |

</div>

La EMA 50 apenas se inmuta ante un movimiento que desplaza la EMA 9 cinco veces más. Responden preguntas distintas: la de 9 responde "qué ha estado haciendo el precio esta hora", la de 50 responde "hacia qué lado se ha inclinado este instrumento durante toda la sesión".

¿Por qué estos números específicos? Sobre todo convención que en parte se autocumple — suficientes traders vigilan las mismas tres líneas como para que las reacciones se agrupen alrededor de ellas. Nada es matemáticamente especial en 9, 20 o 50, y deberías resistirte a buscar el período "óptimo" en datos pasados. Eso es ajustar la curva a los datos, y los períodos ajustados al gráfico de ayer se degradan rápido.

Stockade pone las tres en el gráfico en colores distintos — EMA 9 ámbar, EMA 20 azul, EMA 50 violeta — con un interruptor para cada una, así puedes reducirlo a una sola línea mientras aprendes qué hace esa línea.

## Usar medias móviles como soporte y resistencia dinámicos

Los [niveles de soporte y resistencia](/blog/support-and-resistance-levels/) horizontales son precios fijos. Una media móvil es un nivel que se mueve con el mercado, lo cual la hace útil en tendencias donde una línea fija queda obsoleta en una hora. En una tendencia alcista saludable, el precio retrocede, toca o perfora ligeramente una EMA ascendente, y reanuda — los traders llaman a esto "cabalgar la 20". En una tendencia bajista, la misma línea actúa como techo contra el que fallan los rebotes.

Sé honesto sobre lo que es esto. La EMA no es una barrera; es una línea descriptiva que resulta estar donde se ha concentrado la compra reciente, y falla rutinariamente. Si tratas una como soporte, de todas formas necesitas un stop debajo — "el precio rebotó en la 20 las últimas tres veces" describe tres eventos, no una propiedad del instrumento.

## La estrategia de cruce y su modo de falla por whipsaw

La regla mecánica clásica: compra cuando una media rápida cruza por encima de una media lenta, vende cuando cruza de vuelta por debajo. En el conjunto de gráficos de Stockade eso es la EMA 9 cruzando la EMA 20, o la 20 cruzando la 50. En una tendencia sostenida funciona bien — la línea rápida se despega de la lenta y se queda ahí, manteniéndote dentro durante todo el movimiento.

En un rango es una trituradora. Imagina el precio oscilando entre aproximadamente 184 y 188. La EMA 9 cruza por encima de la EMA 20 en 186.40 — compras. Seis velas después el precio cae a 185.20 y las líneas se cruzan de vuelta — vendes con una pérdida de $1.20. Cuatro velas más tarde cruzan hacia arriba otra vez en 186.10 — compras — y el precio se desvanece a 185.00, otros $1.10 perdidos. Dos operaciones, ninguna tendencia, y llevas $2.30 por acción en contra antes de cualquier costo, únicamente porque un mercado lateral hace que dos líneas casi idénticas se crucen una y otra vez. Eso es **whipsaw** (una sucesión de falsos cruces que sacude al trader dentro y fuera), y no es un defecto de los ajustes. Es lo que pasa cuando aplicas una herramienta de seguimiento de tendencia a un mercado que no tiene tendencia.

La defensa no es un mejor período. Es un filtro: toma cruces solo cuando la línea lenta tiene una pendiente clara, o exige confirmación de algo que mida una cosa distinta, como el [MACD](/es/blog/macd-explicado/) — que está construido a partir de EMA — o una referencia anclada al volumen como el [VWAP](/es/blog/estrategia-vwap/).

## Leer la pendiente de la media móvil como filtro de tendencia

Antes del cruce, mira la pendiente. Una EMA 50 plana es el mercado diciéndote que no hay una ventaja direccional aquí, y es el filtro más barato disponible.

Cuantifícalo en lugar de estimarlo a ojo. Si la EMA 20 marcaba 182.40 hace diez velas y marca 186.90 ahora, ha subido 4.50 en 10 velas — 0.45 por vela, cerca del 0.24% del precio por vela. Esa es una pendiente real. Si marcaba 186.70 hace diez velas y 186.90 ahora, eso es 0.02 por vela, aproximadamente 0.01% — plana, y cualquier cruce que produzca es ruido.

Una regla defendible: toma cruces largos solo cuando la EMA 50 esté subiendo, cortos solo cuando esté bajando, y quédate al margen cuando esté plana. Reducirá drásticamente tu número de operaciones. Ese es el punto.

## La limitación que no puedes eliminar con ingeniería: las medias móviles van rezagadas

Toda media móvil se calcula con precios que ya se imprimieron. No hay ningún ajuste ni variante que escape a esto. La EMA reduce el rezago respecto a una SMA; no lo elimina, porque un multiplicador aplicado a cierres pasados sigue siendo una función de cierres pasados.

Así que una media móvil nunca te meterá en el fondo ni te sacará en el techo. Para cuando una EMA 9 gira al alza, el mínimo ya quedó atrás; para cuando un cruce confirma una tendencia bajista, ya ocurrió buena parte de la caída. Cualquiera que te venda una configuración que "predice" giros te está vendiendo una curva ajustada a un gráfico que ya vio.

Lo que una media móvil sí te da genuinamente es una descripción consistente y sin emociones de dónde ha estado el precio en relación consigo mismo. Eso vale mucho — te evita llamar "ganga" a una tendencia bajista — pero es descripción, no predicción. Úsala para filtrar y para encuadrar, y pon tu gestión de riesgo en otro lado.

## Practica medias móviles en el simulador

Abre un gráfico en Stockade y desactiva todo excepto la EMA 20. Observa unas cuantas cientas de velas y anota dónde el precio la respeta y dónde la atraviesa de lleno. Después activa la EMA 9 y la 50 y cuenta cuántos cruces ocurrieron mientras la EMA 50 tenía una pendiente clara frente a cuando estaba plana — ese conteo es todo el argumento a favor del filtro de pendiente, en tus propios datos.

Ten presente sobre qué estás practicando: los precios de Stockade se generan en el navegador, no provienen de ningún exchange, así que estas EMA describen un mercado simulado. La aritmética y los hábitos de lectura son idénticos; el instrumento debajo es ficticio. Recorre una sesión generada vela por vela en el simulador de gráficos para poder pausar en cada cruce y decidir antes de que la siguiente vela revele la respuesta. Comienza en el [simulador de mercado de valores de Stockade](/es/simulator/).
