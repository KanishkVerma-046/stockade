---
title: "Backtesting vs Paper Trading: Qué Puede Probar Cada Uno"
description: "Un backtest pregunta si unas reglas ganaron dinero en el pasado; el paper trading, si puedes seguirlas. Qué prueba cada uno, el sobreajuste y un orden de uso."
date: 2026-12-07
author: "Stockade Team"
tags: ["Estrategia", "Fundamentos"]
slug: "backtesting-vs-paper-trading"
translationOf: "backtesting-vs-paper-trading"
---

Escribes una regla, la pasas por dos años de precios pasados y gana dinero. Ajustas la longitud de la media móvil y gana más. Luego la operas en tiempo real y no hace nada, o algo peor. O al revés: haces paper trading con un setup durante un mes, terminas en positivo y concluyes que funciona.

Las dos conclusiones se saltan un paso. Un backtest y una tanda de paper trading responden a preguntas distintas, y ninguno de los dos, por sí solo, prueba que tengas una ventaja. Este artículo aclara qué puede mostrar cada uno, de qué formas engaña cada uno y en qué orden los usaríamos.

## Dos pruebas que responden a preguntas distintas

Un **backtest** aplica reglas fijas a precios históricos y registra lo que habría pasado. Pregunta: *¿estas reglas exactas habrían ganado dinero con datos que ya existen?*

El **paper trading**, también llamado forward testing (prueba hacia adelante) cuando se hace para comprobar una estrategia, consiste en operar las reglas en tiempo real con dinero simulado. Hace dos preguntas distintas: *¿puedes de verdad seguir estas reglas a medida que llegan los precios?* y *¿el resultado se sostiene con datos que no existían cuando las escribiste?*

<div class="table-wrap">

| | Backtest | Paper trading |
|---|---|---|
| Datos | El pasado | Los precios a medida que llegan |
| Velocidad | Años de operaciones en minutos | Tiempo real, una operación a la vez |
| Tamaño de muestra | Puede ser grande | Normalmente pequeño |
| Quién toma las decisiones | Las reglas, mecánicamente | Tú, bajo presión de tiempo |
| Principal forma de engañar | Sobreajuste y sesgos en la prueba | Pocas operaciones, y nada de dinero real en juego |

</div>

Los dos se complementan. Un backtest puede mostrar que una regla tuvo ventaja en teoría, pero no puede mostrar que la vayas a ejecutar. El paper trading puede mostrar que la ejecutas, pero tarda mucho en reunir suficientes operaciones para mostrar una ventaja.

## Cómo te engaña un backtest: el sobreajuste

Sobreajuste (overfitting) significa afinar las reglas hasta que encajan con el pasado concreto en el que las probaste, incluido su ruido aleatorio, en lugar de con algo que se vaya a repetir. Cuantas más variantes pruebas, más probable es que la mejor sea una casualidad.

Lo incómodo es cuán pocas variantes hacen falta. Un artículo de 2014 en *Notices of the American Mathematical Society*, ["Pseudo-Mathematics and Financial Charlatanism", de Bailey, Borwein, López de Prado y Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf), lo calculó. El ratio de Sharpe que usan mide el rendimiento por unidad de volatilidad. Sus cifras muestran que, incluso cuando ninguna de las estrategias tiene una ventaja real, probar solo siete configuraciones independientes en un backtest de dos años basta para que se espere que la mejor muestre un ratio de Sharpe anualizado de 1 en la prueba, mientras que su ratio de Sharpe esperado con datos nuevos es cero. En otro ejemplo, generaron 1,000 precios diarios como una caminata aleatoria, de modo que no podía existir ningún efecto estacional, y aun así encontraron una estrategia estacional con un ratio de Sharpe de 1.27.

Vale la pena adoptar su conclusión como regla: un backtest que no informa cuántas variantes se probaron no puede evaluarse en busca de sobreajuste. Así que lleva la cuenta. Cada cambio de parámetro que pruebas es otra variante, incluidas las que abandonas. Si probaste 30 combinaciones de longitudes de media móvil y distancias de stop para encontrar la ganadora, los resultados de la ganadora tienen que superar una barra mucho más alta que si hubiera sido tu primera idea.

Otra comprobación que haríamos: mira a las vecinas de la ganadora. Si una media móvil de 17 barras gana dinero pero las de 16 y 18 pierden, el resultado probablemente pertenece a ese tramo de la historia más que a la idea. Una regla que merezca seguir probándose debería seguir funcionando más o menos cuando sus ajustes se mueven un poco.

## Sesgo de anticipación, sesgo de supervivencia y ejecuciones sin costo

El sobreajuste no es la única forma en que un backtest puede favorecer a una regla. Hay tres más que vale la pena comprobar cada vez.

El **sesgo de anticipación** (look-ahead bias) es usar información que la regla no podía tener en el momento en que actuó. Digamos que una regla compra en la apertura cuando el día cierra por encima de su media de 20 días. En la apertura, nadie conoce el cierre. Un backtest que deja a la regla mirar por adelantado se verá mucho mejor que cualquier cosa que puedas operar.

El **sesgo de supervivencia** es probar solo con instrumentos que todavía existen. Si pruebas una estrategia de acciones con los miembros actuales de un índice, has eliminado sin darte cuenta a todas las empresas que quebraron, dejaron de cotizar o salieron del índice durante el período de la prueba. Las perdedoras no están en tus datos, así que los resultados se inclinan hacia el optimismo.

Las **ejecuciones sin costo** consisten en suponer que cada orden se ejecutó exactamente al precio que quería la regla, sin spread, comisión ni slippage. [La guía de riesgo-recompensa](/es/blog/relacion-riesgo-recompensa-y-expectativa/) muestra cómo unos pocos centavos de costo por acción pueden mover la tasa de acierto de equilibrio de una estrategia, y las estrategias de stops ajustados son las que más lo notan.

## Lo que el paper trading prueba y lo que no puede probar

El paper trading pone a prueba la parte que un backtest no puede: tú. ¿Puedes detectar el setup en tiempo real, entrar sin dudar, dejar el stop en paz y tomar la salida que dicen las reglas? Una estrategia que funciona mecánicamente puede fallar aquí, porque la persona que la ejecuta añade una discrecionalidad que el backtest nunca tuvo. Además, cada operación se hace, por construcción, con datos nuevos, así que el forward testing no puede sobreajustarse al pasado como puede hacerlo un backtest.

Tiene tres límites. Primero, es lento, así que las muestras siguen siendo pequeñas. [La guía de métricas de rendimiento](/es/blog/analiza-tus-metricas-de-rendimiento/) muestra que con 40 operaciones, una tasa de acierto del 50% tiene un intervalo aproximado del 95% de entre un 34% y un 66%, que abarca tanto un buen sistema como uno malo. Segundo, el dinero no es real. [La guía de paper trading](/es/blog/guia-de-paper-trading/) cubre lo que eso deja fuera, y la versión corta es que la disciplina que se mantiene con dinero virtual a menudo se resbala con dinero real. Tercero, las ejecuciones simuladas suelen ser más amables que las reales.

## Comparar los resultados del paper trading con el backtest

La pregunta útil no es si el paper trading ganó dinero. Es si sus resultados son coherentes con lo que dijo el backtest y, si no lo son, por qué.

Aquí va un caso hipotético. Un backtest informa una tasa de acierto del 45% en operaciones planeadas a 1:2, así que la expectativa es 0.45 × 2 − 0.55 × 1 = +0.35R por operación. Haces paper trading durante 40 operaciones y ganas 15, una tasa de acierto del 37.5%, y tu ganadora promedio se queda en 1.8R en lugar de 2R. Tu expectativa es 0.375 × 1.8 − 0.625 × 1 = +0.05R.

Lee las dos brechas por separado. La brecha en la tasa de acierto está dentro del ruido: el error estándar de una tasa de acierto del 45% en 40 operaciones es √(0.45 × 0.55 ÷ 40), unos 7.9 puntos porcentuales, y 37.5% está 7.5 puntos por debajo. No puedes saber si esa brecha es real. La ganadora promedio es distinta. Quedarse en 1.8R en lugar de 2R es algo que puedes comprobar operación por operación, y si [tu diario](/es/blog/diario-de-trading/) muestra salidas anticipadas, es un problema de ejecución, no de estrategia. Corrige la ejecución y sigue probando antes de sacar ninguna conclusión sobre las reglas.

## La secuencia que usaríamos

1. **Escribe las reglas con tanta precisión que un desconocido pudiera comprobarlas.** [La guía del plan de trading](/es/blog/como-construir-un-plan-de-trading/) explica cómo. Si no puedes escribirlas, no puedes hacerles un backtest ni seguirlas.
2. **Haz el backtest en un período, y cuenta cada variante que pruebes.**
3. **Reserva un período posterior que nunca hayas mirado, y prueba la versión final en él una sola vez.** Si falla ahí, has aprendido algo barato. No la ajustes hasta que pase, o los datos reservados se convierten en más datos a los que te has ajustado.
4. **Haz paper trading hacia adelante durante un número de operaciones fijado de antemano,** registrando cada una en el diario, y compara los resultados con el backtest como en la sección anterior.
5. **Pasa a dinero real con un tamaño pequeño,** como describe la guía de paper trading, y solo aumenta cuando los resultados reales sigan siendo coherentes con ambas pruebas.

Antes de cada etapa, escribe qué resultado le pondría fin. Para la etapa de paper trading, podría ser: después del número de operaciones planeado, con las reglas cumplidas en casi todas, la expectativa está por debajo de cero o muy por debajo de la del backtest. Decidirlo después invita a torcer las reglas igual que el sobreajuste las tuerce en un backtest.

Cada etapa solo puede rechazar una estrategia o dejarla pasar a la siguiente. Ninguna prueba que la ventaja vaya a durar, y los mercados cambian. Por eso el paso 5 empieza con poco.

## Dónde encaja Stockade, y dónde no

Stockade no puede hacer backtests. No tiene datos históricos de precios ni forma de ejecutar reglas automáticamente. Su modo repetición genera 600 velas de un minuto en tu navegador y muestra las primeras 61; avanzas por el resto a mano con Espacio o la flecha derecha, o dejas que se reproduzca solo, sin ver lo que viene después.

Así que la repetición es una prueba hacia adelante de tu ejecución, con datos sintéticos. Es útil para los hábitos de los que depende el paso 4: seguir reglas escritas, poner los stops en el momento de la entrada, registrar cada operación. No puede decirte si una estrategia tiene ventaja. Los precios de Stockade salen de un algoritmo, una caminata aleatoria con un sesgo de tendencia que deriva lentamente, sin conexión con ningún mercado real, así que cómo le va a una estrategia ahí no dice nada sobre cómo le iría con precios reales. Y como muestra el ejemplo de la caminata aleatoria del artículo de Bailey, incluso una serie sin ningún patrón real puede producir resultados que parecen una estrategia funcionando. Una buena racha en Stockade es un registro de tu disciplina, no evidencia sobre las reglas. [La guía sobre simuladores](/es/blog/que-es-un-simulador-de-mercado-de-valores/) explica qué más puede y no puede enseñar un simulador.

## Practica esto en el simulador

Escribe un conjunto de reglas en una página, luego abre el [simulador](/es/simulator/) en modo repetición y opera 30 setups estrictamente según ellas, con un stop escrito en el campo Stop Loss en cada operación. Registra cada una en tu diario: setup, entrada, stop y objetivo planeados, y si seguiste las reglas. Al final, no te preguntes si ganaste dinero. Pregúntate cuántas operaciones rompieron las reglas y cuál fue tu ganadora promedio en R comparada con lo que planeaste, porque esos son los números que una prueba hacia adelante real te exigiría hacer bien.
