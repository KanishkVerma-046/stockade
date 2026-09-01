---
title: "Cómo Leer Gráficos de Velas: Guía Completa para Principiantes"
description: "Cada vela empaca cuatro precios en una forma. Qué codifican el cuerpo y las mechas, los patrones que vale la pena conocer, y por qué el contexto gana."
date: 2026-03-30
author: "Stockade Team"
tags: ["Fundamentos", "Análisis Técnico"]
slug: "como-leer-graficos-de-velas"
translationOf: "how-to-read-candlestick-charts"
---

Abres un gráfico y es una pared de rectángulos rojos y verdes con pelos saliendo por arriba y por abajo. Alguien te dice que el de patas largas cerca del fondo es un Hammer, y que significa que los vendedores están agotados. Lo compras. El precio sigue cayendo. El problema nunca fue que identificaste mal la forma — fue que nadie te explicó de qué está hecha esa forma, ni qué puede decirte honestamente.

Una vela no es un símbolo que memorizas. Es un registro comprimido de una discusión entre compradores y vendedores durante un tramo fijo de tiempo, y una vez que puedes descomprimirla, los nombres dejan de importar casi tanto.

## Los cuatro precios que codifica cada vela

Elige un marco temporal — digamos cinco minutos. Cada vela en un gráfico de cinco minutos resume exactamente esa ventana de cinco minutos con cuatro números, siempre los mismos cuatro:

- **Apertura** — el primer precio operado de la ventana.
- **Máximo** — el precio más alto alcanzado durante ella.
- **Mínimo** — el precio más bajo alcanzado durante ella.
- **Cierre** — el último precio operado antes de que terminara la ventana.

Estos son los valores OHLC, y la vela los dibuja geométricamente. El **cuerpo** es el rectángulo entre la apertura y el cierre. Si el cierre está por encima de la apertura, el cuerpo se dibuja verde (o hueco) y la vela es alcista para esa ventana. Si el cierre está por debajo de la apertura, es rojo (o relleno) y la vela es bajista. Las **mechas** — también llamadas sombras o colas — son las líneas delgadas que van del cuerpo hacia arriba hasta el máximo y hacia abajo hasta el mínimo.

Así que el cuerpo te dice dónde *terminó* la ventana en relación con dónde *empezó*. Las mechas te dicen hacia dónde *fue* el precio y dónde fue rechazado. Esa segunda parte es donde vive la mayor parte de la información, y es la parte que los principiantes ignoran.

## Leer una sola vela: un ejemplo trabajado

Toma una vela. Abre en 187.42, sube hasta 189.10, cae hasta 186.90, y cierra en 187.05.

<div class="table-wrap">

| Componente | Cálculo | Valor | Parte del rango |
|---|---|---|---|
| Rango completo | 189.10 − 186.90 | 2.20 | 100% |
| Cuerpo (apertura → cierre) | 187.42 − 187.05 | 0.37 | 17% |
| Mecha superior | 189.10 − 187.42 | 1.68 | 76% |
| Mecha inferior | 187.05 − 186.90 | 0.15 | 7% |

</div>

El cierre está 0.37 por debajo de la apertura, así que es una vela roja — pero apenas. Sobre una apertura de 187.42, una caída de 0.37 es 0.20%. Si solo miraras el precio de cierre, llamarías a esta ventana plana y seguirías de largo.

La forma dice algo mucho más fuerte. Los compradores empujaron el precio 1.68 más alto — un avance de 0.90% — y luego devolvieron cada centavo y un poco más. Tres cuartas partes de todo lo que pasó en esta ventana pasó *por encima* de donde terminó la vela. Alguien estuvo dispuesto a vender dentro de ese rally, y para el cierre los compradores que lo persiguieron estaban todos en pérdida.

Esa es toda la habilidad: leer la vela como una secuencia de eventos, no como una imagen. El cuerpo de 0.37 es el número menos interesante del conjunto.

## Qué puede y no puede decirte una sola vela

Puede decirte el balance de presión dentro de una ventana y dónde fue rechazado el precio. No puede decirte qué pasa después.

Tampoco puede decirte el *orden* de los eventos. Nuestra vela de ejemplo es consistente con "subió a 189.10 primero, luego se derrumbó a 186.90" e igualmente consistente con "cayó a 186.90 primero, luego subió a 189.10 y se desvaneció". Los mismos cuatro números, el mismo dibujo, dos historias muy distintas. Baja a un marco temporal más corto y la ambigüedad se resuelve — pero en la vela que tienes enfrente, no.

Y una vela solo significa algo en relación con sus vecinas. Un rango de 2.20 es enorme en un instrumento que normalmente se mueve 0.40 en cinco minutos e insignificante en uno que normalmente se mueve 3.00.

## Patrones de una sola vela que vale la pena conocer

Cuatro formas cubren la mayor parte de lo que puede expresar una sola vela. Los nombres de los patrones se dejan en inglés, tal como aparecen en el panel de Patterns del simulador de gráficos de Stockade.

### Doji — el empate

La apertura y el cierre son casi idénticos, así que el cuerpo es una línea delgada. Ejemplo: abre en 42.18, cierra en 42.21, con un máximo de 42.66 y un mínimo de 41.79. El cuerpo es 0.03 contra un rango de 0.87 — menos del 4%. El precio recorrió un 2% completo de su valor y volvió a casi exactamente donde empezó. Compradores y vendedores lucharon hasta un empate. Después de una tendencia larga, ese estancamiento vale la pena notarlo. En medio de un lateral tranquilo, es ruido.

### Hammer — rechazo desde abajo

Cuerpo pequeño cerca de la parte superior del rango, mecha inferior larga, poca o ninguna mecha superior. Ejemplo: abre en 64.30, cae a 61.90, se recupera, cierra en 64.10, máximo 64.55. La mecha inferior es 2.20 de un rango de 2.65 — el 83% de todo lo que pasó estuvo por debajo del cuerpo, y el precio se negó a quedarse ahí. Los vendedores lo empujaron hacia abajo y fueron superados. La misma forma apareciendo después de una *tendencia alcista* se llama hanging man, y se lee como bajista. Misma geometría, implicación opuesta, decidida enteramente por lo que vino antes.

### Shooting star — rechazo desde arriba

El Hammer al revés: cuerpo pequeño cerca del mínimo, mecha superior larga. Nuestro ejemplo de 187.42 de antes se acerca a esta forma. Los compradores empujaron, fallaron, y la vela cerró cerca de donde abrió o por debajo.

### Marubozu — un solo lado dominó toda la ventana

Casi sin mechas en absoluto. Ejemplo: abre en 23.10, cierra en 23.95, máximo 23.98, mínimo 23.08. El cuerpo es 0.85 de un rango de 0.90 — 94%. El precio abrió, fue en una dirección para una ganancia de 3.7%, y nunca devolvió nada. Eso es convicción de un solo lado, y la señal de una sola vela más limpia que existe.

## Patrones de dos y tres velas

Los patrones de varias velas son más fuertes porque muestran un *cambio* en el balance, no solo su estado.

**Bullish engulfing.** Una vela bajista abre en 51.40 y cierra en 50.85 (un cuerpo de 0.55). La siguiente vela abre más abajo en 50.72 y cierra en 51.63 — un cuerpo de 0.91 que cubre completamente el cuerpo anterior, 1.65 veces su tamaño. Los vendedores tenían el control, luego los compradores lo tomaron y terminaron por encima de donde empezó la venta. La versión bajista lo refleja exactamente.

**Harami.** El arreglo inverso: una vela grande seguida de una pequeña completamente dentro de su cuerpo. Una vela verde corre de 128.40 a 132.10 (cuerpo de 3.70); la siguiente abre en 131.20 y cierra en 130.05 — un cuerpo de 1.15, el 31% del primero, ubicado enteramente dentro de él. Eso no es una reversión, es una *pausa*. El momentum se detuvo. Lo que sigue está indeciso.

**Morning star.** Tres velas. Primero, una roja decisiva: abre en 78.90, cierra en 75.60. Segundo, una vela pequeña e indecisa cerca de los mínimos — abre en 75.20, cierra en 75.35, un cuerpo de 0.15. Tercero, una vela verde que abre en 75.55 y cierra en 77.80. El punto medio del cuerpo de la primera vela es 77.25, y el tercer cierre lo supera, recuperando 2.20 de la caída original de 3.30 — cerca de dos tercios. Liquidación, estancamiento, recuperación. El **evening star** es la misma estructura de tres tiempos en un techo.

## Por qué la ubicación importa más que el patrón

Aquí está la parte que separa a quienes leen gráficos de quienes solo detectan formas: una vela idéntica significa cosas distintas en precios distintos.

Un Hammer que se forma justo en un nivel de precio que ha rebotado tres veces antes es un rechazo en un lugar que otros traders están vigilando. El mismo Hammer en medio de la nada es una vela donde alguien compró un retroceso. El patrón no cambió; la ubicación sí. Por eso vale la pena aprender los [niveles de soporte y resistencia](/es/blog/soporte-y-resistencia/) antes de memorizar un solo nombre de patrón.

Las otras dos piezas de contexto que vale la pena revisar:

- **Volumen.** Una vela engulfing con el triple del volumen promedio reciente significa que entró participación real. La misma forma con volumen bajo significa que pasó muy poco. El [volumen de trading](/es/blog/entendiendo-el-volumen-de-trading/) es la prueba de cordura para cada patrón que encuentres.
- **Tendencia.** Los patrones de reversión necesitan algo que revertir. Un Morning star después de tres días de caída es una señal; un Morning star en un rango lateral es decoración. Una [media móvil](/es/blog/medias-moviles-ema-vs-sma/) te da una lectura rápida y objetiva de en qué régimen estás.

Confluencia es la palabra para lo que estás buscando: patrón, ubicación y participación apuntando todos en la misma dirección. Cuando solo uno de los tres está presente, tienes una forma, no un setup.

## Los límites honestos de los patrones de velas

Los patrones de velas tienen un poder predictivo modesto por sí solos. Cuando los investigadores los prueban sistemáticamente en muestras grandes, las tasas de acierto quedan lo bastante cerca del azar como para que el patrón solo no sea una ventaja — y cualquier ventaja que sí aparezca tiende a reducirse una vez que restas spread, comisión y slippage.

Fallan constantemente. Un Bullish engulfing de libro de texto en un soporte obvio se resuelve a la baja con la frecuencia suficiente como para que, si no puedes sobrevivir a una racha de que te salgan mal, no deberías operarlos. Los patrones también miran hacia atrás por construcción: describen una discusión que ya concluyó. Nada en el dibujo sabe qué hace la siguiente vela.

Para lo que genuinamente sirven es para *encuadrar*. Un Hammer en soporte te da una estructura definida — un punto de invalidación justo debajo del mínimo de la mecha, una razón para estar interesado, y un lugar donde equivocarte rápido. Eso vale mucho, y es algo distinto de predecir.

## Practica leer velas una a la vez

La forma más rápida de interiorizar esto es encontrarte con las velas una a la vez en lugar de estudiar un gráfico que ya terminó. El [simulador de gráficos](/es/chart-simulator/) de Stockade recorre una sesión generada vela por vela al ritmo que elijas, lo cual te permite detenerte antes de que aparezca la siguiente barra, decir en voz alta qué esperas que sea, y luego avanzar un paso para averiguarlo. Adivinar antes de la revelación es la parte que te entrena; desplazarte por un gráfico ya terminado nunca lo hace. Cada precio en Stockade se genera algorítmicamente — no son datos reales ni de un exchange — pero la estructura OHLC, las mechas y el volumen se comportan como se comporta la estructura real de un gráfico, que es exactamente lo que necesitas para entrenar tu ojo. Si quieres ver una barra construirse en lugar de aparecer completa, el [simulador de mercado de valores de Stockade](/es/simulator/) actualiza continuamente, así que la vela más nueva se estira y se repinta frente a ti hasta que su ventana se cierra. De cualquier forma, trabaja con un solo instrumento, nombra cada vela durante diez minutos, y nota qué tan seguido la forma de la que estabas seguro se resolvió al revés.
