---
title: "Cómo Construir un Plan de Trading: Paso a Paso para Principiantes"
description: "Un plan de trading es un documento, no una intención. Cada sección que necesita, un ejemplo de setup trabajado por completo, y la regla para cuándo cambiarlo."
date: 2026-06-15
author: "Stockade Team"
tags: ["Estrategia", "Gestión de Riesgo"]
slug: "como-construir-un-plan-de-trading"
translationOf: "how-to-build-a-trading-plan"
---

Ya conoces tus reglas. Podrías recitarlas ahora mismo: corta las pérdidas rápido, deja correr las ganadoras, no persigas el precio. Después una posición va en tu contra, y la regla silenciosamente se convierte en "corta las pérdidas rápido, a menos que esté a punto de volver, que es lo que suele pasar". Nada se sintió como una violación, porque no había nada que violar. La regla vivía en tu cabeza, y tu cabeza la reescribió mientras estabas ocupado perdiendo dinero.

Ese es todo el argumento para escribir un plan: no la disciplina como rasgo de personalidad, sino un documento con secciones nombradas, abierto junto a tu gráfico, que dice lo que decidiste cuando estabas tranquilo y no tenías nada en juego.

## Por qué un plan no escrito no es un plan

Un plan no escrito es un conjunto de intenciones, y las intenciones se reconfiguran bajo presión. En una operación perdedora tu cerebro está resolviendo un problema distinto al de hace diez minutos — hacer que la incomodidad pare — y la ruta más rápida hacia eso es decidir que la regla nunca fue exactamente lo que pensabas.

Un plan escrito elimina esa negociación. O se cumplió la condición en la página o no se cumplió. Todavía puedes romper la regla, pero ahora sabes que la rompiste, y queda en tu diario como una violación en lugar de disolverse en "esa vez leí el setup diferente".

También es **falsable**. Después de cuarenta operaciones puedes preguntar si esas condiciones exactas produjeron algo. Un plan no escrito nunca puede ponerse a prueba, porque nunca fue el mismo plan dos veces.

## Las nueve secciones que necesita tu documento de plan

Abre un archivo de texto o una página de cuaderno y escribe estos encabezados. Todo debería caber en una o dos páginas — un plan que no leerás es decoración.

```
PLAN DE TRADING — v1 — iniciado [fecha]

1. MERCADO Y MARCO TEMPORAL   Qué instrumentos, qué gráfico, qué horario.
2. DEFINICIÓN DEL SETUP       Las condiciones exactas que deben cumplirse todas.
3. DISPARADOR DE ENTRADA      El único evento que me mete en la operación.
4. COLOCACIÓN DEL STOP        Dónde estoy equivocado, decidido antes de entrar.
5. OBJETIVO Y SALIDA          Dónde tomo ganancias, y la regla de salida parcial.
6. RIESGO POR OPERACIÓN       Porcentaje de la cuenta, y el tamaño resultante.
7. LÍMITE DE PÉRDIDA DIARIO   El número que termina mi sesión.
8. LISTA DE VERIFICACIÓN      Cinco o seis preguntas de sí/no.
9. REVISIÓN Y MODIFICACIÓN    Cuándo reviso, y cuándo puedo cambiar esta página.
```

Cada sección te obliga a una decisión que de otro modo tomarías en el momento. Trabájalas en orden.

## Reducir tu mercado y marco temporal supera a cubrirlo todo

Los principiantes vigilan todo, con la teoría de que más instrumentos significa más oportunidades. En la práctica significa juicios más superficiales y ningún sentido de cómo se comporta nada. Elige **uno o dos instrumentos y un marco temporal de gráfico** y anótalos. Si tienes un trabajo de tiempo completo esa elección ya está en gran parte hecha por ti — un gráfico de 5 minutos que no puedes vigilar no es una opción real. Intradía contra sostener posiciones varios días es la bifurcación más grande del documento; [day trading vs swing trading](/es/blog/day-trading-vs-swing-trading/) cubre las restricciones que la deciden. Después escribe tu horario de sesión: "opero entre las 09:45 y las 11:30 y no abro nada nuevo después de eso" se puede verificar, y "opero cuando hay oportunidad" no.

## Escribir una definición de setup que un extraño podría verificar

Esta es la sección que los principiantes se saltan, y la que hace posible el resto del plan. La prueba: **¿podría un extraño leer tu definición, mirar un gráfico, y decir si el setup está presente — sin hacer una sola pregunta de seguimiento?**

"Comprar el retroceso en una tendencia alcista" falla estrepitosamente. ¿Qué es un retroceso? ¿Qué tan profundo? Dos personas marcarían el mismo gráfico de forma distinta, y tú también en dos días distintos. Aquí está la misma idea escrita de forma que se pueda verificar.

**Setup: continuación por retroceso a la EMA-9 de 5 minutos.** Las seis condiciones deben cumplirse.

1. En el gráfico de 5 minutos, la EMA 9 está por encima de la EMA 20, la EMA 20 está por encima de la EMA 50, y las tres han estado subiendo durante al menos las últimas 12 velas.
2. El precio ha marcado un máximo más alto en las últimas 10 velas.
3. El precio retrocede y toca o cae ligeramente por debajo de la EMA 9, pero ninguna vela del retroceso **cierra** por debajo de la EMA 20.
4. El retroceso dura 3 velas o menos.
5. El volumen de cada vela del retroceso es menor que el volumen de la vela de impulso que hizo el máximo.
6. El reloj marca entre las 10:00 y las 15:00.

Cada una de esas es un sí o un no. La condición 3 termina la discusión sobre si un retroceso "se fue demasiado lejos" — el cierre por debajo de la EMA 20 lo decide, no tu estado de ánimo. Nota también que las EMA van rezagadas por construcción: describen lo que ya pasó, así que esto define una condición que ya se formó, no una predicción. No estás afirmando que el setup funciona, solo que está definido lo suficientemente bien como para averiguarlo.

## Entrada, stop y objetivo son tres decisiones separadas

Tomadas juntas en el momento, colapsan en un solo sentimiento: "esto se ve bien". Tomadas por separado y de antemano, se interrogan entre sí — y a menudo la respuesta es que la operación no vale la pena tomarla.

**Disparador de entrada.** Un evento, no una zona: *compra stop 0.02 por encima del máximo de la primera vela de 5 minutos que cierra de vuelta por encima de la EMA 9 después del retroceso. Si no se dispara dentro de 3 velas, cancela.* Sin esa cláusula de cancelación tienes una orden en espera atada a un setup que ya expiró.

**Colocación del stop.** Una ubicación en el gráfico, no una cantidad en dólares: *0.02 por debajo del mínimo más bajo del retroceso.* Después un veto: *si ese stop está a más de 0.60 de la entrada, sáltate la operación.* Un stop pertenece donde el setup queda demostrado como equivocado; si ese punto está demasiado lejos para dimensionar con sensatez, pasa en lugar de mover el stop a un lugar conveniente.

**Objetivo y salida.** *Toma ganancias al doble de la distancia de riesgo. Sal al cierre de la vela de las 15:00 sin importar qué.* La salida basada en tiempo previene el desangre lento de una posición que sostienes porque no puedes decidir.

Un caso concreto: la entrada se ejecuta en 48.32, el mínimo del retroceso fue 47.86, así que el stop queda en 47.84. El riesgo por acción es 48.32 − 47.84 = **0.48**, y el objetivo es 48.32 + (2 × 0.48) = **49.28**. Cada número existía antes de que hicieras clic en comprar, y los tres pueden entrar juntos como un bracket.

## Riesgo por operación y el límite de pérdida diario que termina tu sesión

La sección 6 convierte el riesgo en cantidad de acciones. En una cuenta de $25,000 arriesgando 1% — $250 — a 0.48 por acción, eso es 250 ÷ 0.48 = **520 acciones**. Nota que 520 acciones a 48.32 son $25,126 de exposición a partir de una decisión de riesgo de $250; una cifra de riesgo pequeña puede implicar una posición grande, por lo cual esa aritmética recibe su propio tratamiento en [tamaño de posición y la regla del 1%](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/). Tu plan necesita el porcentaje y la fórmula en la página, no un número que rederivas bajo presión.

La sección 7 es la que más principiantes omiten y la que más necesitan. **Escribe un límite de pérdida diario y qué pasa cuando lo alcanzas.** Aquí, tres pérdidas completas son $750, o 3% — así que: *en −$750 en el día, cierro la plataforma.* No "opero más pequeño". Cerrado. Limita el daño desde el estado exacto en el que tomas tus peores decisiones, que es inmediatamente después de perder.

## La lista de verificación previa y las revisiones diaria y semanal

La lista de verificación es tu plan comprimido en algo que puedes ejecutar en veinte segundos antes de cada entrada:

- ¿Las seis condiciones del setup son verdaderas ahora mismo?
- ¿Mi stop está identificado, y dentro de 0.60?
- ¿Derivé la cantidad de acciones del stop en lugar de la costumbre?
- ¿Mi objetivo está fijado en 2R?
- ¿Estoy dentro del horario de sesión y por debajo de mi límite de pérdida diario?
- ¿Estoy tomando esto porque cumple el plan, o porque quiero estar en una operación?

Después, dos revisiones. La **revisión diaria** toma diez minutos después de la sesión: para cada operación, ¿estaba en el plan, y la ejecutaste como estaba escrito? Puntúa el cumplimiento por separado de la ganancia y la pérdida — una ganadora tomada fuera del plan es un peor resultado que una perdedora tomada dentro de él, porque enseña la lección equivocada y se repetirá.

La **revisión semanal** mira agregados: setups tomados, setups saltados, tasa de cumplimiento, y las cifras de rendimiento cubiertas en [analizar tus métricas de trading](/es/blog/analiza-tus-metricas-de-rendimiento/). Aquí es donde notas que las pérdidas se concentran en una hora, o que las operaciones fuera del plan explican la mayor parte de tu drawdown.

## Cuándo se te permite cambiar el plan, y cuándo no

Una regla, y vale la pena ponerla en negrita en la página: **el plan solo puede revisarse en una revisión programada, después de una muestra significativa de operaciones — nunca a mitad de sesión, y nunca inmediatamente después de una pérdida.**

Cambiar el plan a mitad de sesión se siente como adaptabilidad. Es racionalización disfrazada de plan. El stop que amplías a las 10:40 porque "las condiciones cambiaron" es el stop que habrías ampliado por cualquier razón; encontraste la razón después. Lo que te enseñó una operación perdedora seguirá siendo cierto el domingo.

"Muestra significativa" significa suficientes operaciones como para que un cambio responda a un patrón en lugar de a ruido — treinta o cuarenta es un piso, e incluso eso es poco. Cuando revises, cambia **una sola cosa**, sube el número de versión, y ponle fecha. Altera tres reglas a la vez y nunca sabrás cuál importó.

Espera que tus primeros planes estén equivocados. Eso es el proceso funcionando: la versión 1 existe para que la evidencia demuestre que es inadecuada, algo que un plan no escrito nunca puede lograr. Los traders que mejoran no son los que acertaron en el primer borrador — son aquellos cuyo borrador fue lo bastante específico como para que se le demostrara equivocado.

Y sé claro sobre lo que compra el documento. Un plan no te hace rentable; ningún arreglo de reglas fabrica una ventaja. Te hace **consistente**, que es la única condición bajo la cual puedes averiguar si tu ventaja existe siquiera. Cuarenta operaciones ejecutadas de la misma forma producen un resultado que puedes interpretar. Cuarenta ejecutadas de cuarenta formas distintas producen una historia.

## Practica esto en el simulador

Escribe tus nueve secciones, y luego toma veinte operaciones en el [simulador de paper trading de Stockade](/es/simulator/) sin hacer nada más que ejecutar la lista de verificación — el saldo virtual de $100,000 y los atajos B / S / F hacen que entrar sea trivial, que es exactamente por qué la lista de verificación debe ser deliberada. Dos de las seis condiciones no sobrevivirán el viaje, así que decide de antemano cómo las manejarás. La condición 5 lee el volumen, y Stockade dibuja el volumen como un número aleatorio por vela — verificarla ahí es leer ruido. La condición 6 lee un reloj de sesión que el simulador no tiene: corre continuamente, cerrando una vela en vivo cada diez segundos, sin apertura, sin cierre y sin las 10:00, lo cual también deja inerte la línea de horario de sesión de la sección 1 y la pregunta correspondiente de la lista. Trata ambas como automáticamente satisfechas y acepta que el ejercicio pone a prueba las otras cuatro condiciones; las seis se quedan en el documento, porque las seis son correctas para el mercado real para el que estás escribiendo esto. Después usa `/es/analytics/` para comparar operaciones que cumplieron tu definición de setup contra las que te convenciste de tomar. Dos advertencias sobre el resultado: los precios de Stockade vienen de una caminata aleatoria del lado del cliente, no de ningún mercado, así que un setup que "funciona" aquí dice que tu ejecución fue consistente y nada sobre la ventaja — y el capital virtual elimina el peso emocional que te hizo reescribir la regla en primer lugar. Ensayar el proceso igual ayuda, como explica [practicar paper trading deliberadamente](/es/blog/guia-de-paper-trading/); solo nunca confundas un resultado simulado con un plan validado.
