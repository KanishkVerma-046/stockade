---
title: "Qué Son las Órdenes OCO y Bracket y Cómo Funcionan"
description: "Cómo las órdenes OCO y bracket vinculan un stop y un objetivo para que ejecutar una cancele la otra, más los errores de cantidad que cometen los principiantes."
date: 2026-05-25
author: "Stockade Team"
tags: ["Tipos de Órdenes"]
slug: "ordenes-oco-y-bracket"
translationOf: "oco-and-bracket-orders"
---

Compras 500 acciones. El precio sube un poco, después baja un poco, después sube otra vez. Ahora estás decidiendo en tiempo real, con dinero en juego, si esto es el techo o el inicio de algo — y la versión de ti que toma esa decisión no es la versión tranquila que encontró el setup.

Las órdenes OCO y bracket existen para quitarte esa decisión. No para hacerla mejor, para hacerla *más temprano*. Este artículo trata sobre la mecánica: qué se vincula con qué, qué cancela qué, qué pasa con las cantidades, y las formas específicas en que el setup se rompe.

## Qué es una orden OCO: dos órdenes en espera donde ejecutar una mata la otra

OCO significa **one-cancels-other** (una cancela la otra). No es un tipo de orden nuevo. Es un *vínculo* colocado entre dos órdenes ordinarias que ya conoces.

Envías dos órdenes al mismo tiempo. Ambas quedan en el bróker, sin ejecutar, esperando. En el momento en que una de ellas se ejecuta, el bróker cancela automáticamente la otra. Nunca terminas con ambas.

Esa última frase es toda la función. Sin el vínculo tienes dos órdenes vivas, y si el precio corre a través de ambos niveles obtienes dos ejecuciones — que para una sola posición significa que sales una vez y después accidentalmente entras en una posición nueva yendo en la otra dirección. El vínculo OCO es lo que hace que "una u otra" signifique una u otra.

El par OCO más común es un stop debajo de tu posición y una límite arriba de ella: una **orden stop** que se convierte en venta si el precio cae a tu tope de pérdida, y una **orden límite** que vende si el precio sube a tu objetivo de ganancia. El precio solo puede llegar primero a una de las dos. La que llega primero gana, la posición se cierra, y la sobreviviente se cancela.

Para la lógica de *dónde* pertenece el stop — estructura, volatilidad, por qué un número redondo es mala elección — consulta [órdenes stop-loss explicadas](/es/blog/ordenes-stop-loss-explicadas/). Este artículo asume que ya elegiste los niveles y solo le importa cómo están conectados.

## Qué agrega una orden bracket: una entrada con el par de salida adjunto

Una **orden bracket** son tres órdenes enviadas como un solo paquete:

1. Una orden de **entrada** (mercado o límite) que abre la posición.
2. Un **stop protector** que la cierra en pérdida.
3. Un **objetivo de ganancia** que la cierra en ganancia.

Las órdenes 2 y 3 son un par OCO entre sí. También son *condicionales a la orden 1* — no se activan hasta que la entrada realmente se ejecuta. Envía un bracket con una entrada límite que nunca se ejecuta y no pasa absolutamente nada; el stop y el objetivo quedan inactivos y eventualmente expiran junto con la entrada.

Así que la secuencia es: la entrada se ejecuta → el stop y el objetivo se activan ambos → uno de ellos se ejecuta → el otro se cancela → quedas plano. Tres órdenes, una operación de ida y vuelta, cero decisiones después del primer clic.

La palabra "bracket" es literal. Tu precio de entrada queda dentro de un corchete, con un piso debajo y un techo arriba, y la operación termina en el momento en que toca cualquiera de los dos.

## Un bracket trabajado: 500 acciones largo en 187.40

Supón que te vas largo 500 acciones en 187.40, stop en 185.90, objetivo en 190.40.

<div class="table-wrap">

| Tramo | Precio | Distancia desde la entrada | Por acción | Total en 500 acciones |
|---|---|---|---|---|
| Entrada (compra) | 187.40 | — | — | Posición de $93,700 |
| Stop (venta) | 185.90 | 1.50 abajo | −1.50 | −$750 |
| Objetivo (venta) | 190.40 | 3.00 arriba | +3.00 | +$1,500 |

</div>

Verifica la aritmética. El riesgo por acción es 187.40 − 185.90 = 1.50, así que 500 × 1.50 = **$750 en riesgo**. La recompensa por acción es 190.40 − 187.40 = 3.00, así que 500 × 3.00 = **$1,500 como objetivo**. La recompensa dividida entre el riesgo es 3.00 ÷ 1.50 = 2, una **relación recompensa-riesgo de 2:1**.

**Esa relación queda fija en el instante en que envías el bracket.** No descubres tu relación recompensa-riesgo después mirando el resultado — la elegiste cuando escribiste tres números en un campo.

**Y un bracket de 2:1 necesita una tasa de acierto por encima del 33.3% solo para llegar al punto de equilibrio.** Diez operaciones a este tamaño: cuatro ganadoras producen 4 × $1,500 = $6,000, seis perdedoras producen 6 × $750 = $4,500, neto +$1,500 a una tasa de acierto del 40%. Baja a tres ganadoras y son $4,500 ganados contra $5,250 perdidos — negativo al 30%. La relación no te hace rentable; fija la barra que igual tienes que superar.

En una cuenta de $100,000, esos $750 son 0.75% del capital — dentro del techo común del 1% descrito en [tamaño de posición y la regla del 1%](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/). Nota que la posición vale $93,700, cerca del 94% de la cuenta, mientras que la cantidad genuinamente en riesgo es $750. El tamaño de posición y el tamaño de riesgo son números distintos, y el stop es lo que los separa.

## Por qué colocar el bracket antes de la entrada es todo el punto psicológico

Aquí está la parte que importa más que cualquiera de la mecánica.

Cuando adjuntas el stop y el objetivo *antes* de que se ejecute la entrada, tomas la decisión de salida en el único momento en que no tienes posición, ni G/P no realizado, ni ego en la operación. Estás mirando un gráfico y preguntando "¿dónde estaría equivocado, y dónde tomaría el dinero?". Esas son preguntas analíticas.

Una vez que la posición existe, esas mismas dos preguntas se vuelven emocionales. "¿Dónde estaría equivocado?" se convierte en "¿cuánto más puedo aguantar viendo esto caer?". "¿Dónde tomaría el dinero?" se convierte en "¿y si sigue subiendo?". Los traders que fijan las salidas después de entrar rutinariamente amplían el stop, porque ampliarlo hace que el dolor actual desaparezca, y ajustan el objetivo, porque asegurar algo pequeño se siente más seguro que esperar.

Un bracket no te hace disciplinado. Mueve la decisión al momento en que la disciplina es barata. Sé honesto contigo mismo, sin embargo: nada te impide cancelar y volver a colocar las órdenes a mitad de la operación, y los principiantes hacen exactamente eso.

## Errores de bracket que cometen los principiantes

### Descalce de cantidad después de una ejecución parcial

Envías un bracket para 500 acciones. En un mercado real, solo se ejecutan 300 antes de que el precio se aleje. Tu stop y tu objetivo, si estaban dimensionados a 500, ahora cubren 200 acciones que no posees.

Si el stop entonces se dispara, una venta de 500 acciones contra una posición larga de 300 cierra tu posición *y abre un corto de 200 acciones* — una posición que nunca pretendiste, ahora sin protección, porque el bracket ya cumplió su función y canceló el objetivo. Algunos brokers ajustan automáticamente las cantidades del bracket a lo realmente ejecutado; otros no. Necesitas saber cuál tipo estás usando antes de que importe, no después.

### Olvidar que las órdenes sobreviven a tu pantalla

Las órdenes en espera viven en el bróker, no en tu navegador. Cierra la plataforma, apaga la laptop, vete a dormir — el stop y el objetivo siguen funcionando. Ese es el punto, pero también significa que un bracket que configuraste y olvidaste es una instrucción viva que puede ejecutarse mientras duermes o estás en una reunión. Cada bracket sin supervisar es una decisión que tu yo del pasado tomó en tu nombre.

### Brackets en ambos lados de un rango

Un setup común: el precio está atrapado entre dos niveles, así que colocas un bracket de compra-stop arriba de la resistencia y un bracket de venta-stop debajo del soporte, planeando atrapar el lado que rompa.

La trampa es que esas dos *entradas* no están vinculadas entre sí a menos que explícitamente las conviertas en un par OCO. Si están sin vincular y el precio asoma sobre la resistencia, ejecuta tu largo, revierte, y luego rompe debajo del soporte, también te ejecutan el corto — volteado de largo a corto en el peor punto del whipsaw. Vincula las entradas como OCO y la entrada del lado contrario muere en el momento en que se ejecuta la de arriba.

## Lo que una orden bracket no puede hacer

Un bracket es una máquina, y las máquinas no leen gráficos.

**No puede adaptarse a información nueva.** Si el setup cambia de forma — el movimiento se estanca, el volumen se seca, el nivel contra el que operabas deja de sostenerse — a tu bracket no le importa. Se queda en los dos precios que elegiste hace veinte minutos y espera.

**Un objetivo mecánico puede quedar en un lugar que el gráfico nunca justificó.** Fija cada objetivo exactamente en 2R porque 2R suena profesional y a veces estacionarás una orden límite en espacio muerto justo pasando una resistencia obvia, y verás el precio girar 20 centavos antes de llegar. La relación debería ser un resultado de dónde están los niveles de salida sensatos, no un dato que se le impone al gráfico a la fuerza. Un bracket de 2:1 solo es bueno si el mercado plausiblemente ofrece esos 3.00 de alza antes que los 1.50 de baja.

**Y no garantiza el precio que escribiste.** En mercados reales un stop se convierte en una orden de mercado cuando se dispara, y las órdenes de mercado se ejecutan a lo que haya disponible, que puede ser peor que tu nivel de stop — consulta [órdenes de mercado vs límite](/es/blog/ordenes-de-mercado-vs-ordenes-limite/) para saber por qué esa distinción muerde. Tu riesgo de $750 es una estimación, no una garantía.

## Practica esto en el simulador

El panel de órdenes de `/es/simulator/` de Stockade tiene campos opcionales de **Stop Loss** y **Take Profit** justo debajo de la cantidad, y se comportan como un par OCO: el nivel que el precio simulado alcance primero cierra toda tu posición y limpia ambos campos a la vez. Llena los tres números antes de presionar B, y después deliberadamente no vuelvas a tocar el panel y observa qué lado se activa.

Una advertencia honesta, porque cambia lo que puedes aprender aquí. Las ejecuciones de Stockade llevan mucha menos fricción que las reales — sin spread entre compra y venta, sin ejecuciones parciales — pero no son literalmente sin fricción. El simulador verifica tus niveles contra un nuevo precio cada 800 milisegundos, y registra la salida en el tick que *cruzó* el nivel en lugar de en el nivel mismo, así que un stop u objetivo cae unos centavos más allá de donde lo fijaste. La ausencia de ejecuciones parciales es la parte que importa aquí: significa que el problema de descalce de cantidad descrito arriba **no puede pasar en el simulador**, así que es el único modo de falla de bracket que tienes que aprender en lugar de experimentar. Todo lo demás — comprometerte de antemano a una relación, resistir el impulso de ampliar el stop, descubrir con qué frecuencia un objetivo de 2:1 falla por unos centavos — está completamente disponible.

Corre veinte operaciones con bracket donde fijes los niveles primero y nunca los ajustes, y después revisa tus resultados realizados en el [simulador de paper trading de Stockade](/es/simulator/) y averigua qué tasa de acierto real necesitarías.
