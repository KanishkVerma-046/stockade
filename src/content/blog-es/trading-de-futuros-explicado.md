---
title: "Trading de Futuros Explicado: Contratos, Margen y Apalancamiento"
description: "Qué es realmente un contrato de futuros, cómo funcionan el tick y el multiplicador, por qué el margen es una garantía y no un préstamo, y el apalancamiento."
date: 2026-07-27
author: "Stockade Team"
tags: ["Futuros", "Gestión de Riesgo"]
slug: "trading-de-futuros-explicado"
translationOf: "futures-trading-explained"
---

Un trader con $20,000 abre una cuenta de futuros, compra un contrato E-mini S&P 500 en 5,248.75, y ve caer el índice cerca de 2% en la siguiente sesión. Esperaba perder aproximadamente 2% de algo. Lo que realmente perdió fueron $5,248.75 — más de un cuarto de la cuenta — porque la posición nunca fueron $20,000 de nada. Fueron $262,437.50 de exposición al índice controlados por un depósito.

Esa brecha entre lo que depositas y lo que controlas es todo el tema de los futuros. Todo lo demás — valores de tick, meses de vencimiento, contango — es detalle sobre esa base.

## Un contrato de futuros es una obligación, no una participación de propiedad

Cuando compras una acción compras un reclamo fraccional sobre una empresa. Eres dueño de algo. Puede llegar a cero, pero no puede bajar de cero, y nadie te envía una factura.

Un contrato de futuros es un objeto completamente distinto: un acuerdo estandarizado, operado en un exchange, para comprar o vender una cantidad específica de algo en una fecha y precio específicos. Comprar un contrato /CL te compromete a recibir 1,000 barriles de petróleo crudo al vencimiento. Venderlo te compromete a entregarlos. No eres dueño de nada mientras tanto — sostienes una obligación de dos lados, y la contraparte sostiene la imagen espejo.

"Estandarizado" es lo que hace funcionar al mercado. Cada contrato /CL son 1,000 barriles del mismo grado en los mismos términos, así que los contratos son intercambiables: sales vendiendo uno que compraste, no negociando tu salida de un acuerdo, y la cámara de compensación se sitúa entre cada comprador y vendedor. Casi nadie toma la entrega — los traders minoristas cierran o hacen rollover antes del vencimiento. Pero la obligación de entrega ancla el precio al mercado subyacente, y es por eso que el exchange exige un depósito antes de dejarte sostener uno.

## Especificaciones del contrato: multiplicador, tamaño del tick y valor del tick

Un precio de futuros no es una cantidad en dólares. Es un número que traduces a dólares a través del multiplicador del contrato. Stockade lleva cuatro símbolos de futuros en `/es/simulator/` y `/es/markets/`, y cada uno se traduce distinto.

<div class="table-wrap">

| Símbolo | Contrato | Multiplicador | Tamaño del tick | Valor del tick | Precio | Nocional |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | $50 por punto de índice | 0.25 pt | $12.50 | 5,248.75 | $262,437.50 |
| /NQ | E-mini Nasdaq 100 | $20 por punto de índice | 0.25 pt | $5.00 | 18,421.25 | $368,425.00 |
| /CL | Petróleo Crudo | 1,000 barriles | $0.01 | $10.00 | 78.34 | $78,340.00 |
| /GC | Oro | 100 onzas troy | $0.10 | $10.00 | 2,341.40 | $234,140.00 |

</div>

Trabaja una línea a mano. /ES en 5,248.75 con un multiplicador de $50 son 5,248.75 × 50 = **$262,437.50** de exposición nocional por contrato. El incremento mínimo son 0.25 puntos de índice, y 0.25 × 50 = **$12.50** por tick. Muévete diez ticks a tu favor — 2.5 puntos de índice — y ganaste $125.

Confundir las especificaciones sale caro. /NQ se mueve en el mismo incremento de 0.25 que /ES, pero con un multiplicador de $20 cada tick vale $5.00, no $12.50 — y /NQ se mueve muchos más puntos al día, así que el valor de tick menor no lo hace el riesgo menor. /CL y /GC comparten un valor de tick de $10 por rutas completamente distintas: un centavo sobre 1,000 barriles, y diez centavos sobre 100 onzas.

El nocional no es lo que puedes perder — un contrato no llega a cero más de lo que llega el S&P. Pero el nocional es sobre lo que se calcula tu G/P, y es el número contra el que se mide el apalancamiento.

## Por qué el margen de futuros es una garantía de cumplimiento, no un préstamo

Este es el punto más malentendido de los futuros, y es donde la intuición de acciones activamente te engaña.

En una cuenta de margen de acciones, el margen es dinero prestado. Depositas $30,000, el bróker te presta $30,000, compras $60,000 de acciones, y pagas interés. La acción es garantía. Es una deuda y se comporta como una.

El margen de futuros no es un préstamo. No se presta nada y no se acumula interés, porque no se ha comprado nada — entraste en un acuerdo, no compraste un activo. El margen que depositas es una **garantía de cumplimiento**: un depósito de buena fe retenido por la cámara de compensación para garantizar que puedes cumplir tus obligaciones diarias. Está más cerca de un depósito de garantía de alquiler que de una hipoteca.

Dos consecuencias se derivan de esto. No hay costo de interés por sostener una posición de futuros. Y — la mitad peligrosa — el tamaño del depósito no tiene nada que ver con el tamaño de tu obligación. Una garantía de cumplimiento se dimensiona para cubrir aproximadamente el movimiento adverso plausible de un día, no el valor del contrato. Por eso exactamente el apalancamiento es tan alto.

## Margen inicial, margen de mantenimiento, y ajuste diario a mercado

Dos umbrales gobiernan la cuenta, y no son el mismo número. El **margen inicial** es lo que debes tener disponible para abrir una posición. El **margen de mantenimiento** es el piso más bajo que tu capital debe mantener para conservarla abierta. Cae por debajo del mantenimiento y recibes una llamada de margen, y debes restaurar la cuenta — normalmente hasta el requisito inicial, no solo hasta el mantenimiento.

Entre ellos se sitúa el **ajuste diario a mercado**. Las posiciones de futuros liquidan todos los días: ganancias acreditadas en efectivo, pérdidas debitadas, cada sesión, sin importar si cierras la operación. No hay pérdida de futuros no realizada durmiendo tranquila en los libros.

Todas las cifras de margen de abajo son **solo ilustrativas** — los exchanges y brokers las fijan, varían por bróker, y suben cuando sube la volatilidad. Nunca trates una cifra de un artículo como vigente.

Digamos que el margen inicial de /ES es $13,000 y el de mantenimiento es $11,800. Depositas $20,000 y compras un contrato en 5,248.75.

- **Día 1:** el precio cae a 5,180.00 — 68.75 puntos × $50 = **−$3,437.50**, debitado esa noche. Capital: $16,562.50. Por encima del mantenimiento, sin acción.
- **Día 2:** el precio cae a 5,080.00 — 168.75 puntos × $50 = **−$8,437.50** acumulado. Capital: $11,562.50, por debajo del piso de $11,800.
- **La llamada:** restaura el capital al requisito inicial de $13,000. Transfieres **$1,437.50** o el bróker liquida por ti.

Dos sesiones ordinarias. Un movimiento de 3.2% en el índice. Una llamada de margen.

## La aritmética del apalancamiento: qué le hace un movimiento del 2% al capital depositado

Divide el nocional entre el depósito y obtienes la razón de apalancamiento. $262,437.50 ÷ $13,000 ≈ **20:1**. Estás controlando cerca de veinte dólares de índice por cada dólar depositado.

Ahora corre el número que importa:

- Movimiento adverso del 2% sobre el nocional de /ES: 262,437.50 × 0.02 = **$5,248.75**
- Como porcentaje de un depósito de margen de $13,000: 5,248.75 ÷ 13,000 = **40.4%**

Un movimiento del 2% en el subyacente borra el 40% del capital que depositaste. El S&P 500 tiene días de 2% varias veces en un año promedio. Esta asimetría — movimiento pequeño, daño proporcional enorme — es lo más importante de esta página, y es por eso que la [aritmética de la regla del 1% y el tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/) no son opcionales en futuros. También significa que la [colocación del stop-loss](/es/blog/ordenes-stop-loss-explicadas/) tiene que llegar antes de la entrada, no después. En acciones un stop olvidado es una mala operación. A 20:1, es un evento de solvencia.

## Vencimiento, rollover, y contango en futuros de materias primas

Todo contrato de futuros muere en un calendario. /ES vence trimestralmente — marzo, junio, septiembre, diciembre. El petróleo crudo vence mensualmente. Para mantener exposición más allá del vencimiento debes hacer **rollover**: cerrar el contrato que vence y abrir el del mes siguiente, generalmente en la semana o dos antes del vencimiento mientras la liquidez migra hacia adelante.

Los dos meses no operan al mismo precio. Cuando el contrato de fecha más lejana es más caro que el más cercano — a menudo porque almacenar crudo físico cuesta dinero — el mercado está en **contango**. Cuando es más barato, típicamente cuando una escasez actual hace que los compradores paguen más por barriles inmediatos, está en **backwardation**.

El contango es un costo real para un tenedor largo. Si /CL del mes frontal es 78.34 y el del mes siguiente es 78.95, hacer rollover de un contrato largo significa vender bajo y comprar alto: 0.61 × 1,000 barriles = **$610** por rollover. Haz rollover mensual durante un año en un mercado persistentemente en contango y el arrastre se acumula incluso si el petróleo termina el año sin cambios. Por eso las posiciones en materias primas sostenidas a través de muchos rollovers a menudo van a la zaga del precio spot que siguen.

## Los micro contratos como el punto de entrada realista para cuentas pequeñas

Los micro contratos son una décima parte de su padre E-mini, y para la mayoría de las cuentas minoristas son el único tamaño inicial defendible. /MES es 1/10 de /ES: **$5 por punto de índice**, valor de tick 0.25 × 5 = **$1.25**, nocional a 5,248.75 de 5,248.75 × 5 = **$26,243.75**. /MNQ es 1/10 de /NQ a $2 por punto.

La diferencia para una cuenta pequeña no es cosmética. En una cuenta de $5,000 con un stop a 10 puntos de índice:

- **1 contrato /ES:** 10 × $50 = **$500** en riesgo — **10%** de la cuenta en una sola operación.
- **1 contrato /MES:** 10 × $5 = **$50** en riesgo — **1%** de la cuenta.

La versión /MES es una operación normal. La versión /ES es una apuesta que ninguna cantidad de convicción justifica. Los micros también te permiten escalar en décimas en lugar de enfrentar una decisión de todo o nada — el mismo argumento de granularidad que hace viable el [tamaño de posición en forex](/es/blog/trading-de-forex-para-principiantes/) con mini y micro lotes.

## Qué pueden y no pueden enseñarte los símbolos de futuros de Stockade

Sé claro sobre el límite. Los símbolos /ES, /NQ, /CL y /GC de Stockade llevan nombres del mundo real, pero los precios detrás de ellos se generan del lado del cliente mediante una caminata aleatoria — sin feed de exchange, sin datos de mercado, sin archivo histórico en ningún lugar del producto. Los símbolos son etiquetas sobre series sintéticas.

El simulador tampoco modela la mecánica de futuros. El G/P se calcula por unidad de cantidad, exactamente como para una acción: sin multiplicador de contrato, sin margen inicial ni de mantenimiento, sin débito de ajuste a mercado, sin llamada de margen, sin vencimiento ni rollover. Operar 1 unidad de /ES ahí no es operar un contrato que vale $262,437.50, y nada en el sitio te pedirá jamás una transferencia bancaria.

Para lo que sí sirve es para ensayar el *proceso* contra una acción de precio con forma de futuros: fijar un stop antes de la entrada con los atajos B/S/F, hacer la aritmética del multiplicador en papel junto a una posición abierta, revisar los resultados en `/es/analytics/`. Y la limitación habitual aplica más duro aquí — un simulador elimina el peso emocional del dinero real, y los futuros reales pueden entregarte una pérdida mayor que el margen que depositaste si el mercado hace gap a través de tu stop durante la noche.

## Practica la mecánica de futuros en el simulador

Abre /ES en el simulador y, antes de colocar nada, escribe el multiplicador, el valor del tick, y el nocional al precio actual. Después toma una posición y traduce cada movimiento a dólares de contrato en tu cabeza — 2.5 puntos son $125, diez puntos son $500 — hasta que la conversión sea automática. Haz lo mismo en /CL, donde un centavo son $10, así el reflejo se transfiere en lugar de pegarse a un solo símbolo. Después corre la verificación de apalancamiento: a 20:1, ¿qué tanto puede moverse este mercado antes de que se pierda el 40% de un depósito?

Comienza en el [simulador de paper trading de Stockade](/es/simulator/) con esa aritmética escrita, no estimada.
