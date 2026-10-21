---
title: "Relación Riesgo-Recompensa y Expectativa: Cómo Encajan"
description: "La relación riesgo-recompensa solo indica la tasa de acierto para no perder. Tabla de equilibrio, cómo la mueven stop y objetivo, y por qué 1:3 es una guía."
date: 2026-10-26
author: "Stockade Team"
tags: ["Gestión de Riesgo", "Estrategia"]
slug: "relacion-riesgo-recompensa-y-expectativa"
translationOf: "risk-reward-ratio-expectancy"
---

Una de las primeras reglas con las que se topan los traders nuevos es "solo toma operaciones con una relación riesgo-recompensa de al menos 1:3". Así que compras una acción hipotética de $40, pones el stop en $39 y el objetivo en $43, y parece lo responsable. Arriesgas $1 para ganar $3. Difícil discutir eso.

El problema es que la relación no te ha dicho si la operación es buena. Por sí sola, no puede. Una relación riesgo-recompensa es la mitad de un cálculo, y la otra mitad es la parte que la gente se salta: con qué frecuencia el objetivo realmente se alcanza antes que el stop.

## Qué mide una relación riesgo-recompensa y qué deja fuera

La relación compara dos distancias. El riesgo es la entrada menos el stop: $40 − $39 = $1 por acción. La recompensa es el objetivo menos la entrada: $43 − $40 = $3 por acción. Divide la recompensa entre el riesgo y obtienes 3, que se escribe 1:3 o 3:1 según la costumbre de cada uno. Aquí lo escribiremos como 1:3, riesgo primero, y mediremos la recompensa en unidades de riesgo: la recompensa de esta operación es 3R, donde 1R es lo que sea que te arriesgas a perder. Si los múltiplos de R son nuevos para ti, [la guía de tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/) los explica.

Lo que la relación deja fuera es la probabilidad. Una operación 1:3 que alcanza su objetivo una vez de cada diez es una mala operación. Una operación 1:1 que alcanza su objetivo seis veces de cada diez es una buena. Mirando la relación no puedes saber cuál de las dos tienes, porque la relación es una afirmación sobre precios que tú elegiste, no sobre lo que probablemente hará el mercado.

## La tasa de acierto de equilibrio para cada relación riesgo-recompensa

Esto es lo útil que una relación sí te dice. A lo largo de muchas operaciones, ganas 3R cada vez que aciertas y pierdes 1R cada vez que fallas. Llegas al equilibrio cuando las dos cosas se compensan. Si tu tasa de acierto es *w*, eso significa w × 3 = (1 − w) × 1, que se resuelve en w = 1 ÷ 4, o 25%. La versión general, para una recompensa de R unidades de riesgo:

```
Tasa de acierto de equilibrio = 1 ÷ (1 + R)
```

Es la misma fórmula que usa [la guía de métricas de rendimiento](/es/blog/analiza-tus-metricas-de-rendimiento/) para el ratio de pago, aplicada antes de la operación en lugar de después. Aquí está para las relaciones más habituales:

<div class="table-wrap">

| Riesgo-recompensa | Ganas por cada $1 arriesgado | Tasa de acierto de equilibrio |
|---|---|---|
| 1:0.5 | $0.50 | 66.7% |
| 1:1 | $1.00 | 50.0% |
| 1:1.5 | $1.50 | 40.0% |
| 1:2 | $2.00 | 33.3% |
| 1:3 | $3.00 | 25.0% |
| 1:4 | $4.00 | 20.0% |
| 1:5 | $5.00 | 16.7% |

</div>

Léela como una etiqueta de precio. Elegir 1:3 no te hace ganar dinero. Pone la barra en 25%: acierta más seguido que eso y la estrategia gana dinero en promedio; acierta menos y pierde. Si superas la barra depende del setup, no de la relación.

La distancia entre tu tasa de acierto real y la de equilibrio es tu ventaja. En términos de R, la expectativa es tasa de acierto × R − tasa de pérdida × 1. Una tasa de acierto del 30% en operaciones 1:3 da 0.30 × 3 − 0.70 = +0.20R por operación. El mismo 30% en operaciones 1:2 da 0.30 × 2 − 0.70 = −0.10R. Mismo porcentaje de aciertos, resultado opuesto.

## Mover el objetivo cambia las probabilidades, no solo la ganancia

Aquí es donde el hábito del 1:3 engaña a la gente. Cuando alejas un objetivo, no solo subes la recompensa. También bajas la probabilidad de alcanzarlo. Esos dos efectos tiran en sentidos opuestos, y es fácil fijarse solo en el primero.

Toma el caso extremo. Supón que un precio no tuviera tendencia en ninguna dirección, de modo que cada pequeño movimiento tuviera la misma probabilidad de ir hacia arriba que hacia abajo, como una moneda justa. Es el clásico problema de la ruina del jugador en probabilidad, y para una caminata así, [la probabilidad de subir una cantidad antes de caer otra es la caída dividida entre la suma de las dos](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). En términos de trading:

```
P(objetivo antes que stop) = distancia al stop ÷ (distancia al stop + distancia al objetivo)
```

Con un stop de $1 y un objetivo de $3, eso es 1 ÷ 4 = 25%. Exactamente la tasa de acierto de equilibrio de la tabla. Prueba cualquier otro par y pasa lo mismo: en un precio sin dirección, cada relación cae justo en su propio punto de equilibrio. Un objetivo 1:5 se alcanza el 16.7% de las veces, un objetivo 1:1 el 50%, y ninguno gana ni pierde dinero en promedio.

Creemos que ese es el dato más útil que hay sobre la relación riesgo-recompensa. La relación no puede crear una ventaja por sí sola. Los precios reales no son monedas justas, y de ahí es de donde puede venir la ventaja: un setup solo vale la pena si hace que el objetivo sea *más* probable que esa referencia. La relación pone la barra. Tu razón para tomar la operación es lo que tiene que superarla.

## Por qué "nunca aceptes menos de 1:3" es una regla orientativa

Reglas como "mínimo 1:3" existen por un motivo razonable. Te obligan a fijar un objetivo antes de entrar, y te impiden arriesgar un dólar para ganar diez centavos. Como filtro, está bien.

Como ley, se desmorona. Compara cuatro setups hipotéticos:

<div class="table-wrap">

| Setup | Riesgo-recompensa | Tasa de acierto | Equilibrio | Expectativa por operación |
|---|---|---|---|---|
| A | 1:1 | 60% | 50.0% | 0.60 × 1 − 0.40 = **+0.20R** |
| B | 1:2 | 40% | 33.3% | 0.40 × 2 − 0.60 = **+0.20R** |
| C | 1:3 | 30% | 25.0% | 0.30 × 3 − 0.70 = **+0.20R** |
| D | 1:3 | 22% | 25.0% | 0.22 × 3 − 0.78 = **−0.12R** |

</div>

A, B y C ganan lo mismo por operación. A no cumple la regla del 1:3 y está bien. D la cumple y pierde dinero. La regla no puede distinguirlos, porque solo mira uno de los dos números.

También hay un costo menos visible. Si el objetivo natural de un setup está a dos dólares y tú insistes en tres, has llevado el objetivo más allá de donde tu idea dice que es probable que llegue el precio. La relación mejora en el papel mientras la tasa de acierto baja, a menudo más de lo que la tabla puede absorber. Cuando el objetivo honesto no da una relación con la que puedas vivir, lo mejor suele ser saltarte la operación o esperar una entrada más cerca del stop, no estirar el objetivo.

## Mover el stop también cambia la relación

La misma contrapartida funciona en sentido inverso. Mantén el objetivo de $43 y ajusta el stop de $39 a $39.50. El riesgo baja a $0.50, la recompensa se queda en $3, y la relación salta de 1:3 a 1:6. El equilibrio cae del 25% a 1 ÷ 7, o 14.3%.

Parece una mejora gratis. No lo es. Un stop a la mitad de distancia lo alcanza el ruido ordinario con más frecuencia, y en el precio sin dirección de la sección anterior, la probabilidad de llegar primero a $43 cae a 0.50 ÷ 3.50 = 14.3%. Otra vez justo en el equilibrio. Ajustar el stop solo ayuda si el nuevo stop sigue estando donde tu idea de la operación queda demostrada como equivocada, que es todo el argumento de [colocar los stops según la estructura](/es/blog/ordenes-stop-loss-explicadas/).

También cambia tu tamaño. Si arriesgas $200 fijos por operación, un stop de $1 significa 200 acciones, una posición de $8,000. Un stop de $0.50 significa 400 acciones y $16,000. El riesgo en dólares es el mismo en ambos casos, pero el stop más ajustado necesita el doble de capital, así que comprueba que te alcanza antes de dar por hecho que la mejor relación está a tu disposición.

## La relación que planeas no es la relación que obtienes

La relación que anotas antes de entrar es un plan. La que aparece en tus resultados es lo que pasó, y suele ser peor. Cuatro cosas la erosionan:

- **Salidas anticipadas.** Tomar ganancias en $41.80 porque te pusiste nervioso convierte una ganadora de 3R en una de 1.8R.
- **Stops movidos.** Ampliar un stop a mitad de la operación convierte una pérdida de 1R en una mayor.
- **Precios de ejecución.** Un stop puede ejecutarse más allá de su nivel en un mercado rápido, así que un plan de −1R se convierte en −1.1R.
- **Costos.** La comisión y el spread se restan de cada ganadora y se suman a cada perdedora.

Los costos golpean más fuerte a los stops ajustados. Digamos que los costos de ida y vuelta en nuestra acción de $40 suman unos hipotéticos $0.05 por acción. Con el stop de $1, una ganadora deja $2.95 netos y una perdedora cuesta $1.05, así que el equilibrio pasa a ser 1.05 ÷ (1.05 + 2.95) = 26.25% en lugar de 25%. Con el stop de $0.50, una perdedora cuesta $0.55 y el equilibrio pasa a ser 0.55 ÷ 3.50 = 15.7% en lugar de 14.3%. Son los mismos cinco centavos, pero pesan más sobre un riesgo pequeño.

La solución es medir tu relación realizada en lugar de confiar en la planeada. La ganancia promedio dividida entre la pérdida promedio (sin el signo) es tu ratio de pago real. Si planeaste 1:3 con $200 de riesgo pero tu ganadora promedio es de $420 y tu perdedora promedio es de $210, en realidad estás operando a 1:2. Tu equilibrio es 33.3%, no 25%, y una tasa de acierto del 28% que parecía sana está perdiendo dinero.

## Cómo elegir un objetivo con la tasa de acierto en mente

Juntándolo todo, este es el orden en que lo haríamos nosotros:

1. **Fija primero el stop,** en el precio que demuestra que la idea está equivocada.
2. **Fija el objetivo donde el precio podría llegar de forma realista,** como el siguiente [nivel de soporte o resistencia](/es/blog/soporte-y-resistencia/), no en un múltiplo que elegiste de antemano.
3. **Calcula la relación y su equilibrio** con la tabla.
4. **Compara ese equilibrio con tu tasa de acierto registrada** para este tipo de setup, y exige un margen claro por encima. Si solo tienes unas pocas docenas de operaciones, esa tasa de acierto sigue siendo una estimación aproximada; [la sección sobre tamaño de muestra](/es/blog/analiza-tus-metricas-de-rendimiento/) explica qué tan aproximada.
5. **Si no la supera, pasa.** Nada de estirar el objetivo.

Una vez que una operación pasa el filtro, una [orden bracket](/es/blog/ordenes-oco-y-bracket/) sostiene ambas salidas por ti, así que el plan no depende de tu fuerza de voluntad en el momento. Y escribe tu margen mínimo sobre el equilibrio en [tu plan de trading](/es/blog/como-construir-un-plan-de-trading/), para decidirlo una sola vez y no operación por operación.

## Practica esto en el simulador

En el [simulador](/es/simulator/) de Stockade, los campos Stop Loss y Take Profit aceptan precios, y juntos funcionan como un bracket OCO sobre tu posición abierta: cuando uno se dispara, toda la posición se cierra al precio de ese tick y ambos niveles se borran. No hay spread ni comisión, así que ahí la diferencia entre la relación planeada y la realizada viene de tus propias salidas y de los ticks que cruzan un nivel. Antes de cada operación, anota la relación y su equilibrio. Después de 30 operaciones, abre [Análisis](/es/analytics/), divide la Ganancia Promedio entre la Pérdida Promedio sin el signo menos, y compáralo con lo que planeaste, y tu Tasa de Acierto con el equilibrio que necesitabas. Los precios de Stockade se generan en tu navegador, como una caminata aleatoria con un sesgo de tendencia que deriva lentamente, así que una tasa de acierto ahí no dice nada sobre cómo le iría a un setup en un mercado real. Lo que sí entrena es el hábito: stop, objetivo, relación, equilibrio, cada vez.
