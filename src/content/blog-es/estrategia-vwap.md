---
title: "Estrategia VWAP: Qué Es y Cómo lo Usan los Traders"
description: "VWAP es el precio típico acumulado por volumen, dividido entre el volumen acumulado. La aritmética, por qué las instituciones lo vigilan y dónde falla."
date: 2026-05-04
author: "Stockade Team"
tags: ["Indicadores", "Estrategia"]
slug: "estrategia-vwap"
translationOf: "vwap-trading-strategy"
---

Compraste 500 acciones a $50.60 y la posición no fue a ningún lado. Después te preguntas si $50.60 siquiera fue un precio razonable para haber pagado. El problema es que "razonable" necesita un punto de referencia, y los candidatos obvios son malos. El precio de cierre es donde cambiaron de manos las últimas acciones, no donde lo hizo la mayoría. El punto medio del rango del día ignora si el día pasó seis horas en el máximo o seis minutos ahí.

El VWAP responde la pregunta correctamente: te da el precio promedio pagado por la acción promedio operada hasta ahora hoy. Si el VWAP está en $50.38 y pagaste $50.60, pagaste por encima de lo que costó la acción típica del día. Eso es una medición, no una señal, y la utilidad del VWAP viene de tomarlo en serio como medición en lugar de operar sus cruces.

## Qué calcula el VWAP, y por qué eso no es una media móvil

VWAP son las siglas de Volume Weighted Average Price (precio promedio ponderado por volumen). El cálculo es un total acumulado dividido entre otro total acumulado:

**VWAP = (precio típico acumulado × volumen) ÷ (volumen acumulado)**

El precio típico es `(máximo + mínimo + cierre) ÷ 3` — un número que representa dónde operó una vela, en lugar de solo dónde terminó. Multiplica eso por el volumen de la vela para obtener el valor en dólares transaccionado en esa vela, y luego mantén una suma acumulada tanto del numerador como del denominador desde la apertura de la sesión en adelante.

Esto difiere de una media móvil simple o exponencial de dos formas independientes, y ambas importan.

**Ponderación.** Una SMA de 20 períodos le da a cada uno de sus 20 cierres exactamente 1/20 del peso, sin importar si esa vela operó 3,000 acciones o 3 millones. El VWAP pondera cada vela por las acciones que realmente cambiaron de manos en ella. Una vela de volumen alto mueve mucho el VWAP; una vela muerta apenas lo mueve. Si quieres el panorama completo de qué dice y qué no dice el volumen, [el volumen de trading tiene su propio artículo](/es/blog/entendiendo-el-volumen-de-trading/).

**Ventana.** Una SMA es una ventana móvil que descarta la vela más antigua cada vez que llega una nueva. El VWAP no descarta nada — cada vela desde la apertura de la sesión permanece en ambos totales de forma permanente. Esa naturaleza acumulativa impulsa la mayor parte del comportamiento del VWAP, incluyendo su peor debilidad, cubierta más abajo. La [comparación entre EMA y SMA](/es/blog/medias-moviles-ema-vs-sma/) trata sobre cómo ponderar las velas *recientes*; el VWAP ni siquiera compite en esa categoría.

Dicho claramente: una media móvil es un filtro de suavizado aplicado al precio. El VWAP es un hecho contable sobre transacciones ejecutadas.

### Trabajando tres velas de aritmética

Toma una acción con estas tres velas de un minuto.

<div class="table-wrap">

| Vela | Máximo | Mínimo | Cierre | Precio típico | Volumen | PT × Volumen |
|---|---|---|---|---|---|---|
| 1 | 50.40 | 49.80 | 50.10 | 50.10 | 120,000 | 6,012,000 |
| 2 | 50.70 | 50.05 | 50.60 | 50.45 | 300,000 | 15,135,000 |
| 3 | 50.90 | 50.35 | 50.40 | 50.55 | 80,000 | 4,044,000 |

</div>

El precio típico de la vela 1 es (50.40 + 49.80 + 50.10) ÷ 3 = 150.30 ÷ 3 = **50.10**. El de la vela 2 es (50.70 + 50.05 + 50.60) ÷ 3 = 151.35 ÷ 3 = **50.45**. El de la vela 3 es (50.90 + 50.35 + 50.40) ÷ 3 = 151.65 ÷ 3 = **50.55**.

Ahora acumulemos. Después de la vela 1, el VWAP es 6,012,000 ÷ 120,000 = **50.10** — con una sola vela, el VWAP es igual al precio típico de esa vela.

Después de la vela 2, el numerador es 6,012,000 + 15,135,000 = 21,147,000 y el denominador es 120,000 + 300,000 = 420,000. VWAP = 21,147,000 ÷ 420,000 = **50.35**.

Después de la vela 3, el numerador es 21,147,000 + 4,044,000 = 25,191,000 y el denominador es 500,000. VWAP = 25,191,000 ÷ 500,000 = **50.382**, o sea $50.38.

Compara eso con un promedio no ponderado de los tres precios típicos: (50.10 + 50.45 + 50.55) ÷ 3 = 151.10 ÷ 3 = 50.367. El VWAP salió más alto porque la vela 2 estuvo por encima de la media no ponderada y cargó 300,000 de las 500,000 acciones — el 60% de todo lo operado.

### Los mismos precios con el volumen intercambiado

Mantén los nueve valores de precio idénticos e intercambia los volúmenes de las velas 2 y 3, de modo que la vela 2 opere 80,000 y la vela 3 opere 300,000. El numerador se convierte en 6,012,000 + (50.45 × 80,000 = 4,036,000) + (50.55 × 300,000 = 15,165,000) = 25,213,000. El volumen total sigue siendo 500,000. VWAP = 25,213,000 ÷ 500,000 = **50.426**.

Misma acción del precio, mismo volumen total, y el VWAP se movió 4.4 centavos. Esa diferencia es todo el punto del indicador. El VWAP no rastrea a dónde fue el precio; rastrea a dónde fueron las acciones.

## Por qué el VWAP se reinicia en la apertura de la sesión

El VWAP se define sobre una sesión, y en la siguiente apertura los totales acumulados vuelven a cero. Eso se sigue de para qué sirve el VWAP. "El precio promedio pagado por acción hoy" es una estadística coherente. "El precio promedio pagado por acción desde algún punto sin especificar en el pasado" no lo es, porque va derivando hacia lo que haya sido el período de mayor volumen, sin importar cuánto tiempo atrás.

De ahí se siguen dos consecuencias. Primero, las velas justo después de la apertura son inestables: con cinco minutos en el denominador, el VWAP oscila en casi cada vela, y solo se vuelve una referencia estable una vez que una porción significativa del volumen del día está detrás de él.

Segundo, el VWAP no se traslada entre días. El VWAP de ayer no es un nivel en el gráfico de hoy. Los traders que quieren una referencia más larga usan VWAP *anclado*, reiniciando la acumulación desde un evento elegido — una publicación de resultados, un mínimo de swing, una vela de ruptura — en lugar de desde el reloj. Misma fórmula, punto de inicio elegido deliberadamente.

## Por qué las instituciones usan el VWAP como punto de referencia de ejecución

Esta es la razón por la que el VWAP importa en absoluto, y no tiene nada que ver con patrones de gráfico.

Un fondo que necesita comprar 4 millones de acciones no puede enviar una sola orden. Divide la posición a lo largo de la sesión. Después, alguien tiene que juzgar si el trader hizo bien su trabajo, y la vara estándar es el VWAP: ¿el precio promedio de ejecución superó el VWAP ponderado por volumen del día? Comprar 4 millones de acciones a un promedio de $50.31 contra un VWAP de sesión de $50.38 significa que ahorraste siete centavos por acción — $280,000. Muchas mesas de operaciones se compensan exactamente contra este benchmark, y las estrategias de ejecución algorítmica están construidas explícitamente para seguirlo.

Eso crea un comportamiento real alrededor de la línea: los compradores que trabajan órdenes grandes se vuelven más dispuestos por debajo del VWAP y más reacios por encima de él, porque su marcador así lo indica. A esto se refiere la gente cuando dice que el VWAP es "donde las instituciones defienden el precio". Es un efecto genuino en mercados líquidos — pero es un efecto *conductual* producido por cómo se mide a los traders, no una ley física, y está mayormente ausente en instrumentos poco operados.

## Leer el VWAP como soporte y resistencia intradía

Debido a esa presión del benchmark, el VWAP a menudo actúa como un nivel dinámico: el precio retrocede hacia él, los compradores que van atrasados en su día entran, y el precio reanuda. A diferencia de un nivel horizontal trazado en un máximo previo, el VWAP se mueve a lo largo de la sesión, así que el nivel que estás observando a las 10:15 no es el nivel a las 14:30.

Coexisten dos lecturas, y confundirlas es la forma más común en que los traders usan mal el indicador.

**Reversión a la media** aplica en una sesión equilibrada y lateral. El precio se estira lejos del VWAP, el estiramiento no tiene volumen detrás, y regresa de golpe. Los traders desvanecen las extensiones y apuntan al VWAP mismo.

**Continuación de tendencia** aplica en una sesión direccional. El precio se aleja del VWAP y nunca regresa más que para un toque, así que desvanecer las extensiones significa pelear contra la tendencia todo el día. Esta lectura trata un retroceso *al* VWAP que se sostiene como una entrada en la dirección del movimiento existente, y un cierre decisivo a través del VWAP como el fallo de la tendencia.

La versión honesta es que no puedes saber en cuál de las dos estás hasta que la sesión se ha desarrollado parcialmente. Lo que sí puedes revisar es si el precio ha cruzado el VWAP repetidamente hoy o se ha quedado de un solo lado. Cruces repetidos significan que la lectura de reversión a la media ha estado funcionando; sesiones de un solo lado significan que no.

Algunas plataformas agregan bandas de desviación estándar — VWAP más y menos una, dos o tres desviaciones estándar del precio respecto al VWAP. Le dan a la idea de "estirado" un número en lugar de un cálculo a ojo, y un toque de la segunda banda es el disparador habitual para desvanecer. Son un refinamiento genuino, y heredan cada limitación de abajo. Stockade dibuja solo la línea de VWAP, sin bandas.

## Dónde falla el VWAP

**Se vuelve más lento durante toda la sesión.** Para las 15:30, el denominador contiene seis horas de volumen. Una sola vela nueva apenas mueve el promedio, sin importar qué tan violenta sea. El VWAP es más sensible cuando es menos confiable y más confiable cuando es menos sensible, y nada arregla eso — es aritmética.

**No significa nada por encima del marco temporal intradía.** Un promedio de sesión acumulado no tiene interpretación en un gráfico diario o semanal. No hay sesión a la cual reiniciarse. Si mantienes posiciones a través de varios días, el VWAP no es tu herramienta; consulta [day trading versus swing trading](/blog/day-trading-vs-swing-trading) para ver qué cambia según el horizonte de la posición.

**Es tan bueno como los datos de volumen detrás de él.** El VWAP es una estadística ponderada por volumen, así que datos de volumen malos producen una línea equivocada con mucha confianza. Los feeds minoristas que no capturan impresiones fuera de bolsa, o instrumentos donde el volumen reportado no es confiable, te entregarán un VWAP contra el que ninguna institución realmente se está midiendo.

Y como todo indicador, el VWAP mira hacia atrás. Resume transacciones que ya ocurrieron. No puede decirte que la sesión está a punto de revertirse.

## Practica leer el VWAP en el simulador

Los gráficos de Stockade traen un interruptor de VWAP tanto en `/es/simulator/` como en el simulador de gráficos, calculado con la misma fórmula de arriba — precio típico por volumen, acumulado y dividido. El ancla es distinta, sin embargo, y la diferencia vale la pena conocerla: la línea del simulador nunca se reinicia en una apertura de sesión. Se acumula sobre una ventana móvil de las velas más recientes, así que lo que estás leyendo es un VWAP acumulado sin ancla en lugar del VWAP de sesión que describe la sección de reinicio de arriba. Misma aritmética, sin ancla. Actívalo y entrena la habilidad mecánica: el precio está por encima o por debajo, cuánto se ha estirado, si esta sesión está cruzando la línea o cabalgando de un lado. Aun así, ten claro qué estás practicando. Los precios de Stockade se generan del lado del cliente mediante caminatas aleatorias, y su volumen es un número aleatorio sorteado por vela, sin correlación con el movimiento del precio. No hay participación real detrás, así que el volumen ahí no confirma nada y el efecto del benchmark institucional no existe. Eso vacía la línea misma, lo cual vale la pena decir explícitamente: el código de VWAP del simulador pondera cada vela por ese volumen aleatorio, y los pesos aleatorios son efectivamente pesos uniformes, así que la línea dibujada se comporta cerca de un promedio no ponderado del precio típico en lugar de uno realmente ponderado por volumen. La distinción de ponderación descrita cerca del inicio de este artículo es real, pero no es lo que estás viendo aquí — de las dos cosas que separan al VWAP de una media móvil, solo la ventana acumulativa es observable en Stockade. Es aritmética real sobre datos inventados — buena para entrenar el ojo, inútil como señal.

Una advertencia que sobrevive al simulador: las ejecuciones ahí llevan casi ninguna fricción — sin spread entre compra y venta, sin ejecuciones parciales, y solo unos pocos centavos de slippage cuando se activa un stop o un objetivo — y no hay dinero real en juego. Esperar a que el precio regrese al VWAP en lugar de perseguirlo es la parte difícil, y es exactamente la parte que el paper trading no pone a prueba. [Abre el simulador de mercado de valores de Stockade](/es/simulator/), activa el VWAP, y practica decir en voz alta, antes de que cierre cada vela, si la sesión está revirtiendo hacia la línea o alejándose en tendencia.
