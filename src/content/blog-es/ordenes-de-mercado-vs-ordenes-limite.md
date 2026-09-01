---
title: "Órdenes de Mercado vs Órdenes Límite: Cuándo Usar Cada Una"
description: "Una orden de mercado garantiza la ejecución pero no el precio. Una orden límite garantiza el precio pero no la ejecución. Todo lo demás se deriva de eso."
date: 2026-05-11
author: "Stockade Team"
tags: ["Tipos de Órdenes", "Fundamentos"]
slug: "ordenes-de-mercado-vs-ordenes-limite"
translationOf: "market-orders-vs-limit-orders"
---

Hiciste el trabajo. Tenías toda la operación mapeada: entrar en 24.80, stop en 24.40, objetivo en 25.60. Cuarenta centavos de riesgo por ochenta centavos de recompensa — una operación de 2:1. Después hiciste clic en comprar a mercado 400 acciones de un nombre poco líquido, y la confirmación volvió en **25.20**.

Nada del gráfico cambió en ese segundo. Tu operación cambió por completo. Desde 25.20 tu stop está a 80 centavos y tu objetivo a 40 centavos: estás arriesgando 80 para ganar 40, exactamente lo inverso de la operación que planeaste, y la diferencia de 40 centavos costó $160 en 400 acciones antes de que la posición tuviera un segundo de vida.

Ese único clic es la diferencia entre los dos tipos de orden que toda plataforma pone frente a ti.

## Stockade no puede reproducir el problema que describe este artículo

Esto va al principio, no en una nota al pie.

Las ejecuciones de Stockade llevan casi ninguna fricción. No hay spread entre compra y venta, ni ejecuciones parciales, ni libro de órdenes en el simulador de paper trading de Stockade. Una orden de mercado se ejecuta exactamente al precio en pantalla. Una orden límite se ejecuta de inmediato al precio que escribes en el campo — no espera a que el mercado llegue a tu nivel, no hace cola, y nunca queda sin ejecutar. La única excepción es una salida de stop-loss o take-profit: esas se verifican contra un nuevo precio cada 800 milisegundos y se registran en el tick que cruzó tu nivel, así que se ejecutan un poco más allá de él en lugar de justo en él. Todos los precios en Stockade se generan en tu navegador, así que no hay plaza de mercado ni contraparte con quien negociar.

Aun así puedes practicar la **mecánica**: elegir un tipo de orden antes de hacer clic, decidir un precio límite de antemano en lugar de improvisar, adjuntar un stop-loss y un take-profit a una entrada. Esos hábitos se transfieren.

El **costo** no. Si haces paper trading de una estrategia que deja 8 centavos por acción y aquí se ve rentable, esa misma estrategia puede quedar plana o negativa una vez que un spread real de 4 centavos y algo de slippage ocasional se lleven su parte. Nunca leas una ejecución simulada como un pronóstico de una real.

## Qué le instruye realmente cada tipo de orden a tu bróker

Cada orden es una frase de instrucción.

Una **orden de mercado** dice: *ejecuta esto de inmediato al mejor precio disponible en este momento, sea cual sea.* Especificaste cantidad y dirección. No especificaste precio, y renunciaste a cualquier reclamo sobre él.

Una **orden límite** dice: *ejecuta esto solo a mi precio o mejor, y si no puedes, no lo ejecutes.* "O mejor" significa más bajo para una compra y más alto para una venta — una compra límite en 187.30 se ejecutará con gusto en 187.25, nunca en 187.35. Especificaste el precio. No especificaste que vaya a pasar algo en absoluto.

<div class="table-wrap">

| | Orden de mercado | Orden límite |
|---|---|---|
| Garantiza | Ejecución | Precio |
| No garantiza | Precio | Ejecución |
| Uso típico | Salir, urgencia | Entrar, paciencia |
| Riesgo que aceptas | Pagar más de lo que viste | Perderte la operación por completo |

</div>

## La disyuntiva de la que se deriva todo lo demás

Aquí está la frase para memorizar: **una orden de mercado garantiza la ejecución pero no el precio; una orden límite garantiza el precio pero no la ejecución.**

Cada otra consideración de abajo es consecuencia de esa única línea. ¿Orden de mercado para salir de una perdedora? Sí — te importa más salir que los últimos centavos, y la ejecución es lo que garantiza una orden de mercado. ¿Orden límite para entrar en un instrumento de spread amplio? Sí — ahí lo que está en riesgo es el precio.

Cuando tengas dudas, pregúntate qué fallo prefieres vivir: ejecutarte a un precio peor del que querías, o no ejecutarte en absoluto. La respuesta nombra tu tipo de orden.

## El spread entre bid y ask, y por qué una orden de mercado te cuesta al entrar

Nunca hay un solo precio. Siempre hay dos. El **bid** es el precio más alto que alguien está dispuesto a pagar ahora mismo; el **ask** es el precio más bajo al que alguien está dispuesto a vender ahora mismo. Digamos que el bid es 187.38 y el ask es 187.42. El **spread** es 187.42 − 187.38 = **0.04**, y el **punto medio** — el número único más justo para llamar "el precio" — es 187.40.

Compra 500 acciones a mercado. Una compra toma el ask, así que pagas 187.42 × 500 = **$93,710**. Al punto medio habrías pagado 187.40 × 500 = $93,700. Estás $10 atrás en el instante en que te ejecutas, con el precio sin moverse.

Esa es solo la mitad de la historia, porque también tienes que salir. Vender a mercado golpea el bid en 187.38, así que una operación de ida y vuelta — comprar el ask, vender el bid, mercado perfectamente sin cambios — cuesta el spread completo: 0.04 × 500 = **$20**.

Veinte dólares en una posición de $93,700 son cerca de 2 puntos básicos y suenan triviales. No lo son, una vez que multiplicas. Tres operaciones de ida y vuelta al día durante 250 días de trading son 750 operaciones de ida y vuelta; a $20 cada una eso son **$15,000** al año solo en spread, antes de comisiones y antes de una sola operación perdedora.

Es peor en instrumentos ilíquidos. Si un nombre poco líquido muestra un bid de 42.10 y un ask de 42.35, el spread es 0.25 — sobre un punto medio de 42.225 eso es 0.59%, cerca de 28 veces el costo relativo de arriba. Una operación de ida y vuelta de 200 acciones ahí cuesta 0.25 × 200 = $50, y la acción tiene que moverse un cuarto de punto a tu favor solo para llegar al punto de equilibrio.

## Slippage, y las condiciones que lo empeoran

El slippage es la brecha entre el precio que viste cuando hiciste clic y el precio que obtuviste. El spread es la parte predecible; el slippage es el resto. Empeora bajo tres condiciones, que a menudo llegan juntas:

- **Mercados rápidos.** Durante una publicación de resultados o un dato económico, las cotizaciones se actualizan más rápido de lo que viaja tu clic. El ask al que apuntabas puede no existir para cuando llega tu orden.
- **Libros de órdenes delgados.** Una cotización muestra un precio, pero solo para cierto tamaño. Si solo se ofrecen 200 acciones en 42.35 y compras 1,000, las otras 800 se ejecutan contra lo que haya arriba — 42.40, 42.55, y así sucesivamente. Tu ejecución promedio es peor que el ask que viste.
- **Tamaño grande.** Tu propia orden es lo que mueve el precio. Mismo mecanismo que un libro delgado, llegando desde la otra dirección.

El ejemplo inicial fue las tres cosas a la vez: un libro delgado, un tamaño que lo consumió, y una cotización en movimiento. Una orden límite habría rechazado esa ejecución.

## Órdenes límite ejecutables: el término medio práctico

No estás obligado a elegir entre "cualquier precio" y "mi precio o nada". Una orden límite fijada donde el mercado ya puede alcanzarla se llama una **orden límite ejecutable**, y es lo que usan la mayoría del tiempo los traders experimentados.

Con el bid en 187.38 y el ask en 187.42, coloca una compra límite en **187.45**. Como está por encima del ask actual, se ejecuta de inmediato como una orden de mercado — pero se niega a ejecutarse por encima de 187.45. Si el libro está delgado y el precio corre, tu peor caso queda limitado en lugar de ilimitado. Contra el punto medio de 187.40 ese peor caso cuesta 0.05 × 500 = **$25**, frente a $10 en el ask, frente a los $200 que se habría llevado un deslizamiento de 40 centavos.

Cambias una pequeña cantidad de certeza de ejecución por un techo firme sobre el desastre. Normalmente es el cambio correcto.

## Cuándo una orden de mercado es genuinamente la decisión correcta

Hay una situación donde una orden de mercado no es solo aceptable sino correcta: **salir de una posición que va en tu contra.**

Si tu nivel de stop se rompe y necesitas quedar plano, la certeza de ejecución es todo el punto. Una salida límite a tu precio ideal puede quedar sin ejecutarse mientras la pérdida se amplía, y una pérdida pequeña que no se ejecuta se convierte en una pérdida grande que eventualmente sí lo hace. La alternativa a pagar unos centavos extra no es "una mejor ejecución", es "seguir sosteniendo". Por eso las [órdenes stop-loss](/es/blog/ordenes-stop-loss-explicadas/) típicamente disparan una orden de mercado una vez que el precio de stop se opera.

La misma lógica cubre cualquier urgencia real: cerrar antes de un anuncio programado, salir cuando tu tesis se rompió, cerrar todo al final de tu sesión. Cuando debes salir, sal.

## Cuándo una orden límite es la decisión correcta

Casi en cualquier otro caso.

**Entradas.** Nada te obliga a entrar en una operación. Si tu plan dice 24.80, coloca una límite en 24.80 y deja que el mercado llegue a ti. Una entrada que persigues ya se movió en contra de tu plan.

**Instrumentos ilíquidos.** Donde el spread es 0.25 en lugar de 0.04, una orden de mercado entrega dinero real en ambos lados de la operación.

**Escalado paciente.** Si quieres 900 acciones, apila límites en tres niveles — 300 en 24.80, 300 en 24.65, 300 en 24.50 — y acepta que quizás solo obtengas una parte. Eso interactúa directamente con tu [tamaño de posición](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/): una entrada parcialmente ejecutada es una posición más pequeña, y tu cálculo de riesgo debería reflejar el tamaño que realmente obtuviste.

**Salidas en un objetivo.** Un objetivo de ganancia no es urgente por definición, así que una límite a tu precio es exactamente correcta. Emparejar un take-profit límite con una salida de stop-loss es la estructura detrás de las [órdenes OCO y bracket](/es/blog/ordenes-oco-y-bracket/).

## La orden límite que nunca se ejecuta tiene su propio costo

Una orden límite que falla no es gratis, y los principiantes lo subestiman sistemáticamente.

Vuelve a la cotización 187.38 / 187.42. El ask se ve caro, así que colocas una compra límite en 187.30 — doce centavos por debajo del ask, con un valor de 0.12 × 500 = $60 si se ejecuta. No se ejecuta. El precio nunca opera hasta tu nivel y corre a 191.00. El movimiento que identificaste correctamente fue 191.00 − 187.42 = 3.58 por acción, o **$1,790** en 500 acciones. Protegiste $60 y perdiste $1,790.

Eso no es un argumento en contra de las órdenes límite. Es un argumento en contra de precificarlas con codicia. Fija el límite donde realmente quieres la operación, no unos centavos mejor para sentirte listo. Una ganadora perdida no deja registro en tu diario de operaciones, que es precisamente por qué es tan fácil ignorarla.

## Practica la decisión en el simulador

Las ejecuciones de Stockade son perfectas, así que no puedes practicar pagar un spread ahí — pero sí puedes practicar la decisión que determina si pagas uno. Abre el [simulador de mercado de valores gratuito de Stockade](/es/simulator/), cambia el ticket de orden de mercado a límite antes de cada entrada, y anota el precio límite que usarías contra un libro real. Después reserva las órdenes de mercado para cerrar todo — la tecla F existe exactamente para eso. Lleva ese reflejo a una plataforma real y el spread será lo único nuevo que aprender.
