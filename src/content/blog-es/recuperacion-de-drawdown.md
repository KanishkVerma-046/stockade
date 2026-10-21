---
title: "Drawdown: Por Qué Perder un 50% Exige Ganar un 100%"
description: "Perder un 50% exige ganar un 100%, pero ¿cuántas operaciones lleva recuperarse? Rachas perdedoras, arrastre por volatilidad y cómo fijar tu límite de antemano."
date: 2026-11-02
author: "Stockade Team"
tags: ["Gestión de Riesgo", "Análisis"]
slug: "recuperacion-de-drawdown"
translationOf: "drawdown-recovery-math"
---

Pierde la mitad de una cuenta de $10,000 y te quedan $5,000. Para volver a $10,000 tienes que duplicar lo que queda, una ganancia del 100%. Esa frase se cita mucho. Las preguntas que vienen después importan más: cuántas operaciones lleva volver a subir, qué tan profunda deberías esperar que sea una racha perdedora, y cuánto drawdown deberías aceptar antes de haber sufrido uno.

Este artículo recorre esos números. Todo lo que hay aquí es aritmética sobre cifras hipotéticas. Nada de ello es reconfortante, y por eso vale la pena hacerlo antes de necesitarlo y no en medio de un mal mes.

## La fórmula de recuperación en una línea

Un drawdown es la caída desde el punto más alto de tu cuenta (su pico) hasta un mínimo posterior, como porcentaje de ese pico. Si estás abajo una fracción *D*, la ganancia que necesitas para volver al pico es:

```
Ganancia necesaria = D ÷ (1 − D)
```

Estar abajo un 20% necesita 0.20 ÷ 0.80 = 25%. Estar abajo un 50% necesita 0.50 ÷ 0.50 = 100%. La brecha se amplía rápido porque cada pérdida achica la base sobre la que ganas la recuperación. [La guía de tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/) tiene la tabla completa del 10% al 75%, así que no la repetiremos. Lo que un porcentaje no puede decirte es cuánto tarda la recuperación, así que el resto del artículo la mide en operaciones.

## La recuperación medida en operaciones, no en porcentaje

Para convertir un porcentaje en un número de operaciones, necesitas una estrategia. Toma una hipotética: acierta el 40% de las veces, las ganadoras hacen 2R y las perdedoras pierden 1R, donde R es la cantidad arriesgada por operación. Su expectativa es 0.40 × 2 − 0.60 × 1 = +0.2R por operación. (Si esa aritmética es nueva para ti, [la guía de riesgo-recompensa](/es/blog/relacion-riesgo-recompensa-y-expectativa/) la explica paso a paso.) Arriesga el 1% de la cuenta por operación y gana un 0.2% por operación en promedio.

Después hay que aplicar el efecto compuesto, porque cuando arriesgas un porcentaje fijo, cada operación se dimensiona sobre el saldo actual, que es más pequeño. En promedio, estas son las operaciones que lleva volver a subir:

<div class="table-wrap">

| Drawdown | Ganancia necesaria | Operaciones para recuperar al 1% de riesgo | Operaciones para recuperar al 2% de riesgo |
|---|---|---|---|
| 10% | 11.1% | unas 56 | unas 30 |
| 20% | 25.0% | unas 118 | unas 63 |
| 30% | 42.9% | unas 189 | unas 100 |
| 50% | 100.0% | unas 367 | unas 194 |

</div>

Hay dos cosas que destacan. Primero, un drawdown del 20% al 1% de riesgo cuesta bastante más de cien operaciones de una estrategia que *funciona*. Si tomas tres operaciones al día, eso son unos dos meses de trading solo para volver a donde estabas.

Segundo, la columna del 2% parece más rápida, y eso es una trampa. La comparación correcta no es el mismo drawdown a dos niveles de riesgo, porque la misma mala racha cava un hoyo más profundo al 2%. Pasa una misma racha de diez pérdidas por cada nivel:

<div class="table-wrap">

| Riesgo por operación | Drawdown tras 10 pérdidas seguidas | Operaciones para volver a subir |
|---|---|---|
| 1% | 9.6% | unas 53 |
| 2% | 18.3% | unas 57 |
| 5% | 40.1% | unas 70 |

</div>

Duplicar tu riesgo duplica el hoyo y aproximadamente duplica tu velocidad, así que la subida lleva más o menos el mismo número de operaciones. Si subes más el riesgo, empeora en lugar de mejorar, por una razón que veremos en el arrastre por volatilidad. Un tamaño mayor no te compra una recuperación más rápida. Te compra un drawdown más profundo.

Estas cifras son promedios. Las secuencias reales se desvían: algunas se recuperan antes, y una con mala suerte puede tardar mucho más.

## Para qué racha perdedora planificar

La guía de tamaño de posición calcula las probabilidades de una racha concreta. Una pregunta más útil para planificar es qué tan mala es probable que sea la *peor* racha en un tramo de operaciones. Para nuestra estrategia con un 40% de aciertos, esta es la probabilidad de ver al menos una racha de pérdidas de al menos esta longitud:

<div class="table-wrap">

| Racha de al menos | En 100 operaciones | En 200 operaciones | En 500 operaciones |
|---|---|---|---|
| 6 pérdidas | 87% | 98% | ~100% |
| 8 pérdidas | 49% | 75% | 97% |
| 10 pérdidas | 20% | 38% | 71% |
| 12 pérdidas | 8% | 15% | 35% |
| 14 pérdidas | 3% | 6% | 14% |

</div>

Estas cifras salen de la probabilidad exacta de una racha, con cada operación independiente de la anterior. En 500 operaciones, una racha de diez pérdidas es más probable que improbable. Y esta es una estrategia con expectativa positiva. No hay nada roto en ella cuando llega esa racha.

Las muestras más largas producen rachas más largas. Suena obvio, pero toma a la gente por sorpresa: que nunca hayas visto una racha en tus primeras 100 operaciones no dice nada sobre si la verás en las siguientes 400.

## Arrastre por volatilidad: por qué un rendimiento promedio exagera lo que conservas

Esta es la parte más extraña de la matemática del drawdown. Gana un 50% y luego pierde un 50%, y tu rendimiento promedio es cero. Tu cuenta está abajo un 25%, porque 1.50 × 0.50 = 0.75. Gana un 10% y pierde un 10% y estás abajo un 1% (1.10 × 0.90 = 0.99). Gana un 20% y pierde un 20% y estás abajo un 4%.

Esa brecha entre el rendimiento promedio y el compuesto [suele llamarse arrastre por volatilidad (volatility drag), y puede aproximarse restando la mitad de la varianza al promedio](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/):

```
Rendimiento compuesto por período ≈ rendimiento promedio − (varianza ÷ 2)
```

donde la varianza mide qué tan ampliamente oscilan los resultados alrededor de su promedio. Las oscilaciones pequeñas apenas frenan. Las grandes frenan mucho, porque la penalización crece con el cuadrado de la oscilación.

Aplícalo a nuestra estrategia. Su ganancia promedio por operación es 0.2R, así que si solo miraras los promedios, arriesgar más siempre significaría ganar más. El efecto compuesto dice otra cosa:

<div class="table-wrap">

| Riesgo por operación | Ganancia promedio por operación | Ganancia compuesta por operación |
|---|---|---|
| 1% | 0.20% | 0.19% |
| 2% | 0.40% | 0.36% |
| 5% | 1.00% | 0.74% |
| 10% | 2.00% | 0.98% |
| 15% | 3.00% | 0.75% |
| 20% | 4.00% | 0.07% |
| 25% | 5.00% | −1.04% |

</div>

Con un 25% de riesgo por operación, una estrategia con expectativa positiva pierde dinero con el tiempo. El promedio sigue diciendo +5% por operación, pero lo que realmente conservas se encoge con cada operación. Para esta estrategia, el crecimiento alcanza su máximo con un 10% de riesgo. Ese pico se conoce como la fracción de Kelly, por [un artículo de 1956 de J. L. Kelly Jr.](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf) que mostró que un apostador que apuesta cada vez la fracción que maximiza el crecimiento acabará por delante de otro que apueste cualquier otra fracción fija, y seguirá por delante. El Kelly completo supone que conoces exactamente tu verdadera tasa de acierto y tu ratio de pago, algo que en la práctica nunca ocurre. Nosotros no nos acercaríamos a él: con un 10% de riesgo, una racha de diez pérdidas se lleva el 65% de la cuenta, y la fórmula de recuperación dice que eso necesita una ganancia del 187%.

Por eso también suben al 5% las cifras de "operaciones para volver a subir". El arrastre se come la velocidad de recuperación mientras las pérdidas siguen siendo igual de profundas.

## Elige tu drawdown máximo antes de necesitarlo

Todos los números de arriba apuntan en la misma dirección: decide hasta qué profundidad estás dispuesto a llegar mientras estás tranquilo, y luego trabaja hacia atrás hasta un nivel de riesgo. Tres pasos:

1. **Elige el drawdown con el que seguirías operando.** Sé honesto. Si una caída del 20% te haría abandonar la estrategia, ese es tu número, diga lo que diga un libro.
2. **Elige la racha para la que planificas.** Según la tabla de rachas, una racha de 12 pérdidas tiene cerca de una probabilidad entre tres en 500 operaciones para nuestra estrategia. Es un caso razonable para planificar.
3. **Despeja el riesgo por operación.** Necesitas que (1 − riesgo)^racha se mantenga por encima de 1 − drawdown. Para un límite del 20% y una racha de 12 pérdidas, riesgo ≤ 1 − 0.80^(1/12) = **1.84%**. Si planificas para 14 pérdidas, es 1.58%.

Luego deja un margen. Un drawdown real suele ser más profundo que su racha más larga, porque las pérdidas vienen agrupadas con algunas ganancias pequeñas dispersas entre ellas, y la cuenta sigue cayendo a lo largo de todo eso. Reducir a la mitad la cifra calculada, a algo por debajo del 1% en este caso, es un punto de partida defendible.

Por último, anota qué pasa en cada hito: por ejemplo, reduce el riesgo a la mitad en −10% y deja de operar para revisar en −15%. Reducir el tamaño frena la subida de vuelta, ya que al 1% en lugar del 2% un drawdown del 10% lleva unas 56 operaciones en lugar de 30. Pero reduce el daño de la siguiente racha, que es la que no ves venir. La regla que más importa es la que [la guía de errores de day trading](/es/blog/errores-comunes-de-day-trading/) advierte desde el otro lado: nunca subas el tamaño para recuperar un drawdown. Pon estos números en [tu plan de trading](/es/blog/como-construir-un-plan-de-trading/) para que estén decididos antes de que empiecen las pérdidas.

## Qué mide la tarjeta Drawdown Máximo de Stockade

En la [página de Análisis](/es/analytics/) de Stockade, Drawdown Máximo recorre tus operaciones cerradas en el orden en que se cerraron, empezando por el saldo inicial de $100,000 como primer pico. Registra la mayor caída por debajo del pico acumulado como porcentaje de ese pico.

Como solo usa operaciones cerradas, las oscilaciones de una posición abierta nunca aparecen. Si una operación abierta baja tu capital un 8% y luego se recupera antes de que la cierres, esa caída nunca aparece, y una pérdida que todavía mantienes no cuenta hasta que la cierras. Trata la tarjeta como un piso de qué tan profundo llegó realmente. [La guía de métricas de rendimiento](/es/blog/analiza-tus-metricas-de-rendimiento/) cubre el resto de la página.

## Practica esto en el simulador

Antes de tu próxima sesión en el [simulador](/es/simulator/), anota tres números: tu riesgo por operación, la racha para la que planificas y el drawdown en el que reducirás el tamaño. Dimensiona cada operación sobre el saldo actual, no sobre el inicial. Después de 50 operaciones, compara el Drawdown Máximo en [Análisis](/es/analytics/) con lo que permitía tu plan, y cuenta a mano tu racha perdedora más larga en la pestaña Diario. Los precios de Stockade se generan en tu navegador y su dinero es virtual, así que un drawdown ahí es un número en una pantalla. La aritmética de volver a subir es la misma, y el hábito de decidir tus límites de antemano es la parte que vale la pena llevar al trading real.
