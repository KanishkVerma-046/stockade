---
title: "Cómo Analizar tu Rendimiento de Trading: Las Métricas Clave"
description: "La tasa de acierto sola puede engañarte gravemente. Aprende expectativa, factor de beneficio, ratio de pago, drawdown y tamaño de muestra con Análisis."
date: 2026-08-03
author: "Stockade Team"
tags: ["Análisis", "Gestión de Riesgo"]
slug: "analiza-tus-metricas-de-rendimiento"
translationOf: "analyze-trading-performance-metrics"
---

Terminas una semana de práctica, abres el panel de análisis, y ves una tasa de acierto del 68%. Se siente bien. Después miras el G/P total y es negativo. Nada está roto — acabas de descubrir que el número que la mayoría de los traders cita primero es el que menos te dice.

El [panel de análisis](/es/analytics/) de Stockade calcula seis cifras principales a partir de tus operaciones cerradas: G/P total, capital, tasa de acierto, factor de beneficio, ganancia promedio y drawdown máximo. Debajo hay tres pestañas — una curva de capital, un diario de operaciones, y un mapa de calor de tasa de acierto por horario. Esto es lo que significa cada una y cuáles pueden mentirte.

## Por qué una tasa de acierto del 70% puede perder dinero mientras una del 35% lo gana

La tasa de acierto es la proporción de tus operaciones cerradas que terminaron con G/P positivo. En Stockade son operaciones ganadoras divididas entre el total, y una operación que cierra exactamente plana se cuenta del lado perdedor — así que las operaciones sin cambio bajan un poco el número.

El problema es que no dice nada sobre el *tamaño* de las ganancias y las pérdidas. Considera a dos traders, cada uno con 100 operaciones cerradas.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Tasa de acierto | 70% | 35% |
| Ganancia promedio | $50 | $300 |
| Pérdida promedio | $150 | $80 |
| Ratio de pago (ganancia promedio ÷ pérdida promedio) | 0.33 | 3.75 |
| Tasa de acierto de equilibrio necesaria | 75% | 21% |
| **Expectativa por operación** | **−$10** | **+$53** |

</div>

El Trader A gana casi tres de cada cuatro veces y está perdiendo dinero. El Trader B se equivoca dos operaciones de cada tres y está acumulando ganancias. A lo largo de esas 100 operaciones, A está abajo cerca de $1,000 y B está arriba cerca de $5,300. Juzgando solo por la tarjeta de tasa de acierto, copiarías al equivocado.

## Expectativa: el número que responde si tu sistema gana dinero

La expectativa es el resultado promedio en dólares que deberías esperar de una sola operación, a lo largo de muchas operaciones. La fórmula:

```
Expectativa = (Tasa de acierto × Ganancia promedio) − (Tasa de pérdida × Pérdida promedio)
```

La pérdida promedio entra como número positivo. Calculémoslo para ambos traders.

**Trader A:** 0.70 × $50 = $35 de ganancia esperada. 0.30 × $150 = $45 de pérdida esperada.
$35 − $45 = **−$10 por operación.** Cada operación que A toma tiene un valor esperado negativo. Operar más lo empeora, más rápido.

**Trader B:** 0.35 × $300 = $105. 0.65 × $80 = $52. $105 − $52 = **+$53 por operación.**

Stockade no imprime la expectativa, pero puedes calcularla en segundos a partir de la tasa de acierto, la ganancia promedio, y la pérdida promedio que derivas del diario. Haz esto antes de concluir cualquier otra cosa. Una estrategia con expectativa negativa no se arregla operándola más seguido o con mayor tamaño — el tamaño solo cambia qué tan rápido se desarrolla la aritmética.

La cifra relacionada es la **tasa de acierto de equilibrio**, que es `1 ÷ (1 + ratio de pago)`. El ratio de pago del Trader B es 300 ÷ 80 = 3.75, así que B llega al equilibrio en 1 ÷ 4.75 = 21% y está ganando 35%. El ratio de pago del Trader A es 50 ÷ 150 = 0.33, así que A necesita 75% y solo llega a 70%. Esa brecha de cinco puntos es toda la diferencia entre las dos cuentas.

### Múltiplos de R: la unidad que hace comparables operaciones distintas

Una ganancia de $60 en una operación donde arriesgaste $600 es un evento muy distinto a una ganancia de $60 donde arriesgaste $40, pero la columna de G/P del diario muestra ambas como `+$60.00`. Define 1R como la cantidad en dólares que pusiste en riesgo al entrar — precio de entrada menos precio de stop, por la cantidad de acciones — y luego expresa cada resultado como un múltiplo de eso. Arriesga $200, gana $500: +2.5R. Arriesga $200, pierde $180: −0.9R.

En R, puedes promediar entre símbolos y tamaños de posición sin distorsión. La expectativa del Trader B es 0.35 × 3.75R − 0.65 × 1R = 1.3125 − 0.65 = **+0.66R por operación** — una cifra que sobrevive cambios en el tamaño de la cuenta, lo que la vuelve la forma más limpia de comparar este mes con el pasado. Asume que dimensionas de forma consistente, que es el argumento a favor de una [regla de tamaño de posición de porcentaje fijo](/es/blog/gestion-de-riesgo-y-tamano-de-posicion/).

## Factor de beneficio, ganancia promedio y pérdida promedio

El factor de beneficio es la ganancia bruta dividida entre la pérdida bruta a lo largo de todas las operaciones cerradas. Si tus ganadoras juntas hicieron $10,500 y tus perdedoras costaron $6,200, el factor de beneficio es 10,500 ÷ 6,200 = **1.69** — por cada dólar perdido, se ganaron $1.69. Cualquier valor por encima de 1.0 es rentable en términos netos, y la tarjeta de Stockade lo muestra con dos decimales y un sufijo `x`.

Lectura aproximada: por debajo de 1.0 es perder dinero, de 1.0 a 1.3 es marginal y fácilmente podría ser ruido, de 1.3 a 2.0 es una ventaja respetable sobre una muestra decente, y bastante por encima de 2.5 en una muestra pequeña generalmente significa suerte. Si la tarjeta muestra `∞`, todavía no has registrado una operación perdedora — una afirmación sobre el tamaño de muestra, no sobre habilidad.

Un detalle curioso: la fila de KPIs muestra **Ganancia Promedio** pero no la pérdida promedio. Obtienes la pérdida promedio del diario sumando las entradas de G/P negativas y dividiendo entre el número de operaciones perdedoras, lo cual la pestaña de resumen te da directamente. La necesitas tanto para la expectativa como para el ratio de pago, así que no te la saltes.

## Drawdown máximo: la métrica que decide si puedes seguir con una estrategia

El drawdown máximo es la mayor caída de pico a valle que ha sufrido tu capital, como porcentaje. Stockade lo calcula recorriendo tus operaciones cerradas en orden, siguiendo la marca de agua más alta acumulada, y registrando la peor caída porcentual por debajo de ella.

Digamos que llevas $100,000 hasta un pico de $112,000, y luego una racha perdedora te arrastra a $94,080. Eso es $17,920 por debajo de un pico de $112,000, así que el drawdown máximo es 16.0%. Nota lo que cuesta la recuperación: subir de $94,080 de vuelta a $112,000 requiere una **ganancia del 19.05%**, no del 16%. Los drawdowns son asimétricos, y los profundos son brutales — un 50% de caída necesita un 100% de subida.

Esta es la métrica que decide si una estrategia es utilizable *para ti*. Un sistema con expectativa sólida y un drawdown del 40% es uno que la mayoría abandona en el fondo, convirtiendo un drawdown de papel en una pérdida real. Una advertencia: Stockade lo calcula solo a partir de operaciones cerradas, así que una posición abierta profundamente en pérdida no aparece hasta que la cierras.

## Qué te dice la forma de tu curva de capital

La pestaña de Curva de Capital grafica tu saldo acumulado después de cada operación cerrada, empezando en $100,000, con el mínimo y el máximo etiquetados debajo. La mayoría lee solo el último punto. La forma dice más.

Una curva que asciende con caídas cortas y superficiales es expectativa consistente y pérdidas controladas. Una que está plana durante largos tramos y luego salta verticalmente significa que un puñado de operaciones produjo casi toda la ganancia — quítalas y no queda nada. Una escalera que sube y repetidamente devuelve un bloque grande es la firma de cortar las ganadoras temprano y dejar correr las perdedoras. Y una línea casi vertical sin retrocesos, con pocas operaciones, no es un descubrimiento; es una muestra pequeña.

El gráfico también se autoescala a tu propio mínimo y máximo, así que un movimiento de $300 y uno de $30,000 producen líneas igualmente dramáticas. Revisa las etiquetas antes de reaccionar a la pendiente.

## Tamaño de muestra: por qué menos de 100 operaciones no prueba casi nada

Aquí es donde falla la mayoría de los autoanálisis. Supón que tienes 40 operaciones cerradas y una tasa de acierto del 50%. El error estándar de esa estimación es:

```
EE = raíz(0.5 × 0.5 / 40) = raíz(0.00625) = 0.079 → 7.9 puntos porcentuales
```

Un intervalo aproximado del 95% es cerca de dos errores estándar a cada lado, así que tu verdadera tasa de acierto a largo plazo podría estar plausiblemente entre aproximadamente **34% y 66%**. Ese rango contiene tanto un sistema muy bueno como uno muy malo. Cuarenta operaciones no te han dicho casi nada.

El error estándar se reduce con la raíz cuadrada del conteo, así que reducir esa banda a la mitad requiere cuatro veces más operaciones — con 160 operaciones el EE baja a cerca de 4.0 puntos. Por eso cerca de 100 operaciones cerradas es el piso habitual antes de sacar conclusiones, y por eso el error de análisis más común es el sobreajuste: reescribir tus reglas después de ocho malas operaciones, cuando ocho operaciones son puro ruido. Decide de antemano cuántas operaciones se le dan a un cambio de regla antes de juzgarlo, y escríbelo en [tu plan de trading](/blog/how-to-build-a-trading-plan).

## Encontrar tus mejores horarios con el mapa de calor por hora del día

La pestaña de Mapa de Calor por Horario organiza los días de la semana contra las horas de 9:00 a 20:00 y colorea cada celda según la tasa de acierto en ese tramo: verde en 65% o más, rojo por debajo de 50%, neutro en medio, y un guion donde no tienes operaciones. Pasa el cursor sobre una celda para ver su número de operaciones.

Esto responde una pregunta genuinamente útil: ¿tus operaciones de la tarde están financiando silenciosamente las de la mañana? Dos advertencias. Las celdas se colorean solo por tasa de acierto, así que una celda verde todavía puede ser una hora que pierde dinero si esas ganancias son minúsculas — verifica el G/P del diario para ese tramo. Y las muestras por celda son diminutas: cuatro operaciones con tres ganadoras muestra 75% y no significa nada. Espera a tener 20 o 30 operaciones en un tramo antes de llamarlo patrón. Las horas son la hora local de tu navegador, no una sesión de exchange.

## Qué registra el diario de operaciones y qué debes registrar tú mismo

El diario muestra ocho columnas por operación cerrada: Símbolo, Lado, Entrada, Salida, Cantidad, G/P, Duración y Fecha, la más reciente primero. Ese es un registro completo de *qué* hiciste.

No tiene campo de notas ni de razonamiento. Nada captura por qué entraste, qué setup creíste ver, o si seguiste tus propias reglas — y la pregunta de revisión más valiosa no es "qué operaciones perdieron dinero" sino "qué operaciones rompieron mis reglas", porque una operación que rompe las reglas y por casualidad gana es más peligrosa que una pérdida disciplinada. Lleva un documento aparte que registre el setup, el stop y el objetivo planeados, y una línea sobre si ejecutaste el plan, y luego únelo al diario por símbolo y marca de tiempo. Ese hábito separa la práctica deliberada de [simplemente hacer clic en botones](/es/blog/guia-de-paper-trading/), y saca a la luz los [errores repetibles](/blog/common-day-trading-mistakes) que ningún panel puede detectar.

Dos límites. Los datos viven en el almacenamiento local de tu navegador, así que borrar los datos del sitio elimina tu historial. Más importante aún, estas métricas miden tu toma de decisiones, no tu temperamento. Los precios de Stockade son sintéticos, no hay spread entre compra y venta, y no hay dinero real en juego. Un drawdown del 16% en una curva simulada es un número; el mismo drawdown con tu propio capital es una experiencia física, y la disciplina que se sostiene limpiamente aquí suele colapsar ahí.

## Practica esto en el simulador

Toma 20 operaciones, luego abre el panel de análisis y calcula tu expectativa a mano a partir de la tasa de acierto y la ganancia promedio de las tarjetas más la pérdida promedio que derives del diario — anota la respuesta antes de mirar el G/P total. Después sigue hasta 100 operaciones y calcúlala de nuevo, y nota cuánto se movió el número. Ese movimiento es el error estándar de arriba, hecho concreto. [Abre el simulador](/es/simulator/) y empieza a registrar operaciones que valga la pena analizar.
