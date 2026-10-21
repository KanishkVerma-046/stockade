---
title: "Stop com ATR: Como Definir o Stop-Loss pela Volatilidade"
description: "Um stop de $1 significa uma coisa numa ação calma e outra numa agitada. Como o ATR mede a amplitude normal e como dimensionar um stop com ATR a risco fixo."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indicadores", "Gestão de Risco"]
slug: "stop-loss-com-atr"
translationOf: "atr-volatility-stops"
---

Pegue duas ações hipotéticas, ambas cotadas a $50. A primeira costuma andar cerca de $0,50 da máxima à mínima num dia. A segunda costuma andar cerca de $2,50. Coloque um stop de $1 abaixo de cada uma e você tomou duas decisões bem diferentes. Na primeira, o stop está a dois dias inteiros de amplitude de distância. Na segunda, está a menos da metade da amplitude de um dia normal.

Um stop fixo em dólares ou em percentual trata essas duas ações como iguais. Elas não são, e o stop que ignora a diferença é o que acaba atingido pelo ruído. O average true range, ou ATR, mede quanto um ativo normalmente se move, então você pode definir o stop por ele.

## O que o true range mede e por que os gaps contam

[O ATR foi desenvolvido por J. Welles Wilder, que o apresentou no livro *New Concepts in Technical Trading Systems*, de 1978](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). Ele parte do true range (a amplitude verdadeira) de uma única barra, que é a maior de três distâncias:

```
True range = a maior entre:
  máxima − mínima
  |máxima − fechamento anterior|
  |mínima − fechamento anterior|
```

A máxima e a mínima são as pontas dos pavios de um candle ([o guia de candles](/pt/blog/como-ler-graficos-de-candles/) explica a anatomia). Numa barra normal, a primeira distância vence. Digamos que o fechamento anterior foi $50,00, e a máxima de hoje é $51,20 e a mínima $49,60. Máxima menos mínima dá $1,60. A máxima está a $1,20 do fechamento anterior e a mínima a $0,40 dele. O true range é $1,60, igual à amplitude simples.

As outras duas linhas existem por causa dos gaps. Suponha que, em vez disso, a ação abra a $52,50 por causa de uma notícia e depois negocie entre $52,10 e $53,00. A amplitude da própria barra é só $0,90, mas a máxima está $3,00 acima do fechamento de ontem. O true range é $3,00. Quem segurou a posição durante esse gap sentiu um movimento de $3, e o true range conta isso. Uma medida simples de máxima menos mínima chamaria esse dia de tranquilo.

## Como o ATR faz a média do true range em 14 barras

O ATR é uma média do true range, e a configuração usual é de 14 barras. A versão de Wilder não é uma média móvel simples. O primeiro valor é a média simples dos primeiros 14 true ranges e, depois disso, cada novo valor é:

```
ATR = (ATR anterior × 13 + true range de hoje) ÷ 14
```

Essa é a suavização dada na mesma página da StockCharts. Passe o dia do gap por ela. Se o ATR era $1,50 e o gap produz um true range de $3,00, o novo ATR é ($1,50 × 13 + $3,00) ÷ 14 = $22,50 ÷ 14 = $1,61. Um dia com o dobro do tamanho normal move o ATR em cerca de 7%. É de propósito: o ATR descreve a barra típica das últimas semanas, não a última.

Há duas coisas que o ATR não diz. Ele não tem direção: uma ação caindo forte e uma ação subindo forte podem ter o mesmo ATR. E ele está em unidades de preço, então não dá para compará-lo entre ações. Um ATR de $2 é 10% de uma ação de $20 e 0,5% de uma de $400. Se quiser comparar, divida o ATR pelo preço.

## Um stop com ATR, do começo ao fim

Aqui está o método, da entrada ao número de ações. Digamos que você tenha uma conta hipotética de $25.000 e arrisque 1% por operação, ou seja, $250. Você compra uma ação a $80, e o ATR de 14 dias dela é $2,00.

1. **Escolha um múltiplo.** Vamos usar 2 × ATR, então o stop fica a $4,00 de distância.
2. **Defina o stop.** $80,00 − $4,00 = $76,00.
3. **Dimensione a posição.** $250 ÷ $4,00 = 62,5, arredondado para baixo, 62 ações.
4. **Confira os números.** 62 ações × $80 = $4.960 em ações. Se o stop for executado a $76, você perde 62 × $4,00 = $248.

O múltiplo é uma escolha, não uma constante. Um ATR é mais ou menos a amplitude de uma barra típica, então um stop a um ATR de distância pode ser alcançado por uma barra comum. Múltiplos maiores dão mais espaço à operação e compram menos ações. Para comparar, um stop de 2% nessa ação ficaria a $1,60 de distância, só 0,8 ATR, dentro do movimento de um dia normal. É o problema da abertura, em números.

Não existe múltiplo certo, e ninguém consegue te dizer qual é o melhor sem testá-lo nos seus próprios setups. O que importa mais é escolher um e usá-lo de forma consistente, para que os seus resultados signifiquem alguma coisa quando você os revisar.

## O mesmo risco em dólares em ações calmas e voláteis

A verdadeira vantagem de um stop com ATR é o que ele faz com o tamanho da posição. Mantenha o risco de $250 e a regra de 2 × ATR, e aplique-os a três ações hipotéticas de $80 com ATRs diferentes:

<div class="table-wrap">

| Ação | ATR | Distância do stop (2 × ATR) | Ações | Tamanho da posição | Perda no stop |
|---|---|---|---|---|---|
| Calma | $1,00 | $2,00 | 125 | $10.000 | $250 |
| Típica | $2,00 | $4,00 | 62 | $4.960 | $248 |
| Volátil | $4,00 | $8,00 | 31 | $2.480 | $248 |

</div>

A ação volátil recebe um stop quatro vezes mais largo e uma posição com um quarto do tamanho. A perda, se você estiver errado, fica mais ou menos a mesma. Essa é a ideia toda: a volatilidade muda quantas ações você tem, não quanto você perde. [O guia de dimensionamento de posição](/pt/blog/gestao-de-risco-e-dimensionamento-de-posicao/) explica por que o tamanho deve sempre sair da distância do stop, e não entrar primeiro.

Mas atenção à linha da ação calma. Um ATR apertado significa uma posição grande, e $10.000 são 40% desta conta. Confira se a posição cabe no seu saldo em caixa antes de presumir que o número de ações da fórmula está ao seu alcance.

Manter fixo o risco em dólares também mantém intacta a sua matemática de drawdown. As sequências de perdas doem conforme quanto você arrisca por operação, não conforme a largura dos seus stops, e é por isso que [o guia de drawdown](/pt/blog/recuperacao-de-drawdown/) mede tudo em risco por operação.

## Combine o ATR com a estrutura em vez de substituí-la

Um stop com ATR tem um ponto fraco: ele não conhece a sua ideia de operação. Dois ATRs abaixo da sua entrada podem cair no meio de uma zona de suporte, onde a ideia ainda está viva, ou bem depois do ponto em que ela se provou errada. [Posicionar o stop pela estrutura](/pt/blog/ordens-stop-loss-explicadas/), além do nível que invalida a operação, responde *onde* o stop deve ficar. O ATR é melhor para responder *quanto espaço* deixar além desse nível.

Por isso, a abordagem que usaríamos combina os dois. Encontre o nível estrutural e depois some uma fração do ATR como margem. Digamos que o fundo do último swing (swing low) abaixo da sua entrada de $80 esteja em $77,40 e o ATR seja $2,00. Some meio ATR, $1,00, e o stop vai para $76,40. Se encontrar esses níveis é novidade para você, [o guia de suporte e resistência](/pt/blog/suporte-e-resistencia/) fala de fundos de swing e de por que um nível é uma zona, e não uma linha.

Agora dimensione. O risco por ação é $80,00 − $76,40 = $3,60, então $250 ÷ $3,60 = 69,4, arredondado para baixo, 69 ações, com uma perda de $248,40 no stop. Se a próxima resistência estiver em $87,20, o retorno é $7,20, exatamente 2R. É uma operação 1:2 com taxa de acerto de equilíbrio de 33,3%, e [o guia de risco-retorno](/pt/blog/relacao-risco-retorno-e-expectativa/) explica como decidir se o seu setup consegue superar essa barra.

## Stop móvel com ATR: o Chandelier Exit

O ATR também serve para stops móveis. Uma versão conhecida é o Chandelier Exit, [desenvolvido por Charles Le Beau, que por padrão fica três vezes o ATR de 22 períodos abaixo da máxima mais alta dos últimos 22 períodos](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit):

```
Chandelier Exit (comprado) = máxima de 22 períodos − ATR(22) × 3
```

Se a máxima de 22 períodos é $90 e o ATR é $2,00, a saída fica em $90 − $6,00 = $84,00. Conforme o preço faz novas máximas, a linha sobe junto.

A fórmula tem uma pegadinha. Se o ATR sobe enquanto a máxima fica parada, a linha cai: com a mesma máxima de $90, um ATR de $2,50 a coloca em $82,50. Usada como stop, isso significa afrouxá-lo no meio da operação. Nós não faríamos isso. Um stop só deve se mover a favor da operação, a regra que o guia de stop-loss defende, então, se você usar essa fórmula como stop móvel, mantenha o stop onde está sempre que a fórmula cair abaixo dele.

## Onde o ATR erra

O ATR é uma descrição do passado e tem os pontos fracos de uma.

- **Ele atrasa.** Ele faz a média de 14 barras, então, depois de um trecho tranquilo, está pequeno logo antes de um choque e demora a se ajustar depois dele. O gap de $3 acima só o empurrou para $1,61.
- **Ele não segura um gap.** Um stop com ATR continua sendo uma ordem stop. Se o preço abrir além dele, ela é executada na abertura, por mais cuidado que você tenha tido ao medir a amplitude.
- **Ele depende do tamanho da barra.** Um ATR de 14 períodos em barras de cinco minutos é uma fração do diário para a mesma ação. Meça-o no tempo gráfico em que você opera. O stop de um day trader dimensionado pelo ATR diário vai ficar largo demais, e o stop de um swing trader dimensionado pelo ATR de cinco minutos vai ficar apertado demais.
- **Ele não diz nada sobre direção nem sobre vantagem.** Um stop bem posicionado limita o que uma operação ruim custa. Ele não torna a operação boa.

## Pratique isso no simulador

A Stockade não tem um indicador de ATR. Os gráficos dela mostram EMA 9, 20 e 50, VWAP, RSI e MACD. Todos os símbolos também rodam com a mesma configuração de volatilidade, proporcional ao preço, então não há ciclos de volatilidade de mercado real aos quais se adaptar. As amplitudes dos candles ainda variam: a amplitude média ao longo de alguns candles sobe e desce por acaso, e os candles ficam mais largos nos trechos ocasionais em que o viés de tendência oculto está forte. E como cada candle da Stockade abre exatamente onde o anterior fechou, ali o true range é sempre igual a máxima menos mínima.

Mesmo assim, dá para praticar a aritmética. No [simulador de gráficos](/pt/chart-simulator/), passe o cursor sobre cada um dos últimos 14 candles e anote os valores H e L na barra de leitura na parte de baixo. Faça a média das 14 amplitudes para ter um ATR simples. Depois abra o [simulador](/pt/simulator/) no modo repetição, em que o gráfico não tem leitura de valores, e estime a amplitude típica dos últimos 14 candles a olho, contra a escala de preço. Coloque o stop a duas dessas amplitudes abaixo da sua entrada, confira onde ele cai em relação ao fundo mais próximo, calcule o número de ações para um risco fixo em dólares antes de entrar e digite o preço do stop no campo Stop Loss. Os preços da Stockade são gerados no seu navegador, então nada disso diz algo sobre a volatilidade de uma ação real. O hábito que isso cria é o que importa: medir a amplitude, depois definir o stop, depois dimensionar.
