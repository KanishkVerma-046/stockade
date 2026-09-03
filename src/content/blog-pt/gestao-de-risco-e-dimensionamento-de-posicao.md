---
title: "Gestão de Risco 101: Dimensionamento de Posição e a Regra de 1%"
description: "Tamanho de posição é resultado da distância do seu stop, não um número que você escolhe. A fórmula, a regra de 1%, a matemática de recuperação, e R."
date: 2026-06-29
author: "Stockade Team"
tags: ["Gestão de Risco"]
slug: "gestao-de-risco-e-dimensionamento-de-posicao"
translationOf: "risk-management-position-sizing"
---

Pergunte a um iniciante quantas ações ele comprou e você recebe um número redondo. Duzentas. Quinhentas.
Mil, se a conta parecia cheia naquela manhã. Pergunte por quê, e a resposta geralmente é "pareceu certo" ou
"isso é mais ou menos um terço do meu poder de compra." O stop entra depois, onde quer que o gráfico
sugira, e a perda é o que der. Às vezes $180. Às vezes $2.400.

Essa sequência está de trás para frente, e inverter isso é a mudança de maior valor que a maioria dos
traders novos pode fazer. Tamanho de posição não é uma decisão. É a resposta de um problema de divisão cujos
insumos são seu orçamento de risco e a distância do seu stop. Decida esses dois e a quantidade de ações já
está determinada — você está só calculando.

## A maioria dos iniciantes escolhe uma quantidade de ações primeiro, e isso está invertido

Aqui está o que acontece quando o tamanho vem primeiro. Você compra 500 ações a 187,40. O gráfico diz que a
operação está errada abaixo de 185,90 — 1,50 por ação de risco — então a perda se o stop for executado é
500 × 1,50 = **$750**. Numa conta de $50.000 isso são 1,5% perdidos numa operação comum. Pegue o mesmo setup
com uma invalidação mais larga e mais honesta em 183,90, ainda 500 ações, e a perda vira 500 × 3,50 =
**$1.750**, ou 3,5%. Mesmo trader, mesma convicção, mesma quantidade de ações, e o dano mais que dobrou por
causa de onde uma linha num gráfico por acaso ficou.

Quando o tamanho é fixo e a distância do stop varia, seu risco em dólares oscila aleatoriamente. Quando o
risco em dólares é fixo e a distância do stop varia, sua quantidade de ações se ajusta e toda perda sai do
mesmo tamanho. O segundo arranjo é todo o ponto da gestão de risco.
[Ordens stop-loss](/blog/stop-loss-orders-explained) cobre como encontrar o preço de invalidação; este
artigo é sobre o que fazer com o número depois que você o tem.

## A fórmula de dimensionamento de posição, trabalhada do início ao fim

A fórmula é uma linha:

**ações = (conta × % de risco) ÷ (entrada − stop)**

Trabalhe com números reais. Conta: $50.000. Risco por operação: 1%.

- **Orçamento de risco:** 50.000 × 0,01 = **$500**
- **Entrada:** 187,40
- **Stop:** 185,90
- **Risco por ação:** 187,40 − 185,90 = **1,50**
- **Ações:** 500 ÷ 1,50 = 333,33, arredondado para baixo para **333 ações**
- **Risco real se parado:** 333 × 1,50 = **$499,50**
- **Valor nocional da posição:** 333 × 187,40 = **$62.404,20**

Arredonde *para baixo*, sempre. Arredondar 333,33 para cima para 334 coloca seu risco em $501 — trivialmente
acima, mas arredondar a seu próprio favor não é um hábito que você quer construir.

Note a última linha. Uma posição de $62.404 numa conta de $50.000 excede o dinheiro que você tem. Numa
conta à vista você não poderia fazer essa operação no tamanho completo; numa conta de margem você poderia,
e a alavancagem fica invisível porque o número de risco ainda mostra $500. Então adicione uma segunda
restrição: uma exposição nocional máxima. Limite-a a 100% do capital e a posição vira 266 ações arriscando
$399. A fórmula de dimensionamento te dá um teto na perda, não permissão para carregar qualquer quantidade
de ações.

<div class="table-wrap">

| Preço do stop | Risco/ação | Ações para $500 | Risco real | Nocional |
|---|---|---|---|---|
| 186,90 | 0,50 | 1.000 | $500,00 | $187.400 |
| 185,90 | 1,50 | 333 | $499,50 | $62.404 |
| 184,40 | 3,00 | 166 | $498,00 | $31.108 |
| 183,90 | 3,50 | 142 | $497,00 | $26.611 |

</div>

Toda linha arrisca essencialmente os mesmos $500. É assim que se parece quando o tamanho é um resultado.

## A recuperação de drawdown é brutalmente assimétrica

Este é o argumento mais persuasivo de toda a gestão de risco, e é aritmética pura.

Perca dinheiro e você precisa recuperar uma *porcentagem maior* do que perdeu, porque está ganhando sobre
uma base menor. Perca 50% de $50.000 e você fica com $25.000. Voltar significa transformar $25.000 em
$50.000 — um ganho de 100%. Não 50%. A perda e a recuperação nunca são o mesmo número.

A forma geral é **recuperação = perda ÷ (1 − perda)**:

<div class="table-wrap">

| Drawdown | Conta restante de $50.000 | Ganho necessário para recuperar |
|---|---|---|
| 10% | $45.000 | 11,1% |
| 20% | $40.000 | 25,0% |
| 30% | $35.000 | 42,9% |
| 40% | $30.000 | 66,7% |
| 50% | $25.000 | 100,0% |
| 75% | $12.500 | 300,0% |

</div>

Confira uma linha do meio: 30% de queda deixa $35.000, e 35.000 × 1,429 = $50.015. Correto.

Leia a última linha devagar. Um drawdown de 75% exige quadruplicar o que resta só para chegar de volta à
linha de partida, e traders nessa posição quase nunca chegam lá — a única forma de tentar é assumir riscos
ainda maiores, que foi o que produziu o buraco. A curva se torna violentamente mais íngreme depois de 30%,
que é por isso que limitar perdas pequenas importa mais do que capturar ganhos grandes.

## Uma sequência de cinco perdas é comum, e aqui está o que ela custa

Suponha que sua estratégia ganha 40% das vezes — um número perfeitamente viável se seus ganhos forem
maiores que suas perdas. Então cada operação perde com probabilidade 0,60, e cinco perdas consecutivas
acontecem com probabilidade 0,60⁵ = 0,0778, cerca de **7,8%**.

Isso não é um cenário de desastre. Em 100 operações há 96 lugares onde uma sequência de cinco perdas
poderia começar, e o número esperado de tais sequências é aproximadamente **três**. Uma sequência de cinco
não é má sorte. É terça-feira. Então a única pergunta é o que uma sequência comum faz à sua conta:

<div class="table-wrap">

| Risco por operação | Depois de 5 perdas seguidas | Conta restante de $50.000 |
|---|---|---|
| 1% | 0,99⁵ = 95,1% | $47.549 |
| 2% | 0,98⁵ = 90,4% | $45.196 |
| 5% | 0,95⁵ = 77,4% | $38.689 |
| 10% | 0,90⁵ = 59,0% | $29.525 |

</div>

A 1%, cinco perdas custam 4,9% e você precisa de 5,2% para recuperar. Você mal percebe. A 5%, a mesma
sequência comum custa 22,6% e precisa de um ganho de 29,2% para desfazer. A 10% você está 41% negativo e
precisa de um ganho de 69,4% — de uma estratégia que acabou de perder cinco seguidas, que é precisamente
quando você estará menos capaz de executá-la.

Estenda a sequência. Oito perdas seguidas tem probabilidade 0,60⁸ ≈ **1,7%** — incomum, mas vai acontecer
com você. A 1% de risco, 0,99⁸ = 92,3% da conta resta. A 10% de risco, 43,0% resta e você precisa de um
ganho de 132%. Risco de ruína não é um conceito exótico; é essa tabela estendida o suficiente. Risco pequeno
por operação é o que torna uma sequência comum sobrevivível em vez de terminal.

## Múltiplos de R transformam toda operação na mesma unidade

Uma vez que o risco em dólares é constante, expresse resultados em **R**, onde 1R é seu orçamento de risco
para aquela operação — $500 no nosso exemplo.

Uma operação que ganha $1.250 é +2,5R. Uma que perde o stop completo é −1R. Uma saída antecipada de $180 é
+0,36R. Agora uma operação de 333 ações e uma de 142 ações em algo duas vezes mais caro são diretamente
comparáveis, porque ambas arriscaram uma unidade.

Isso torna a expectativa computável. Numa taxa de acerto de 40% com vencedoras médias de +2R e perdedoras
médias de −1R:

**(0,40 × 2R) + (0,60 × −1R) = 0,80R − 0,60R = +0,20R por operação**

Vinte centavos de R por operação, ou $100 numa unidade de $500. Isso é aritmética sobre uma amostra
passada, não uma previsão — taxas de acerto oscilam e vantagens se degradam, então uma expectativa
histórica positiva não promete nada sobre as próximas cem operações. Mas mostra por que uma taxa de acerto
de 40% está tudo bem, enquanto uma de 60% com perdedoras de −2R ainda pode ser uma estratégia perdedora.
Essa segunda afirmação depende inteiramente do tamanho das vencedoras: a 60% de acerto e perdedoras de −2R,
o equilíbrio precisa de uma vencedora média de +1,33R, então vencedoras de +2R na verdade tornariam isso um
sistema forte a +0,4R por operação, e qualquer coisa abaixo de +1,33R o afunda. Taxa de acerto sozinha nunca
é suficiente para julgar. O [painel de análises](/blog/analyze-trading-performance-metrics) da Stockade
rastreia taxa de acerto, fator de lucro, e ganho/perda médio, os insumos brutos deste cálculo.

## Limites de perda diários e semanais impedem que um dia ruim se acumule

Dimensionamento de posição limita uma única operação. Ele não faz nada sobre a sétima operação de uma
manhã frustrante, tomada no triplo do tamanho para recuperar o dia.

Defina limites rígidos em R. Uma estrutura comum é **−3R diário, −6R semanal** — a 1% de risco em $50.000,
isso são $1.500 num dia e $3.000 numa semana. Atinja o limite diário e você terminou: plataforma fechada,
nenhum "só mais um setup." O valor deles é que são definidos com antecedência por uma versão de você que
não está perdendo no momento. Trade de vingança não é um defeito de caráter; é o que acontece quando um
cérebro desequilibrado tem permissão para escolher tamanhos de posição. Escreva os números no seu
[plano de trading](/blog/how-to-build-a-trading-plan) para que a decisão já esteja tomada.

## Posições correlacionadas tornam sua exposição real maior que a soma

Três posições cada uma arriscando exatamente 1% parece 3% em risco. Geralmente não é. Se as três são ações
de semicondutores, elas compartilham um driver: um dado ruim do setor tira os três stops juntos e você
perde 3% num único movimento. Você não fez três operações de 1%, fez uma operação de 3% em três tickers. O
mesmo vale para três tokens cripto seguindo os mesmos fluxos, ou uma ação comprada junto de um futuro de
índice comprado.

O conserto é um limite combinado por tema — não mais que 2% do risco total em um setor, fator, ou direção,
independentemente de quantos tickers ele abranja. Antes de adicionar uma posição, pergunte qual manchete
única tiraria tudo que você tem de uma vez, e some o dano.

A Stockade não consegue te ensinar isso, e falha por dois motivos separados. A série de preços de cada
instrumento é gerada pelo seu próprio passeio aleatório independente, então a correlação entre símbolos não
é modelada de forma alguma. Mais fundamentalmente, o simulador mantém exatamente uma posição por vez —
trocar de símbolo descarta o que você tinha aberto — então não há uma carteira para somar mesmo que as
correlações existissem. Exposição no nível de carteira não é algo que você consegue praticar aqui; precisa
ser entendido como um conceito de mercado real e aplicado na primeira vez que você genuinamente segura duas
coisas ao mesmo tempo.

## A regra de 1% é uma convenção, não uma lei

Não há nada mágico em 1%. É um padrão comum porque sobrevive a longas sequências de perdas enquanto ainda
deixa que boas operações importem. O número defensável depende da sua taxa de acerto, do seu múltiplo de R
médio, de quão correlacionadas suas posições estão, e de como você se comporta quando está perdendo. Alguns
profissionais arriscam 0,25% porque assumem muitas posições de uma vez; alguns swing traders arriscam 2%
num punhado de ideias por mês. Ambos são coerentes. O que não é coerente é 8% "porque o setup estava muito
bom" — convicção não é um parâmetro de risco, e o mercado nunca foi informado da sua.

Uma assimetria vale a pena declarar claramente: iniciantes quase universalmente arriscam demais, não de
menos. Se você está em dúvida, comece em 1%. O custo de começar pequeno demais é uma conta mais lenta; o
custo de começar grande demais é nenhuma conta.

## Pratique isso no simulador

Faça vinte operações no saldo virtual de $100.000 da Stockade onde você calcula a quantidade de ações
*antes* de abrir o ticket — entrada, stop, risco por ação, depois tamanho, nessa ordem. A 1% isso são
$1.000 por operação, então confira o diário de operações depois para ver se suas perdas realizadas
realmente se concentram perto de 1R ou passam disso. Lembre-se de que um stop simulado é executado no tick
que cruzou seu nível em vez de no nível em si, e que dinheiro virtual torna essa disciplina muito mais
fácil do que o dinheiro real jamais será. Faça a aritmética no
[simulador de mercado de ações da Stockade](/pt/simulator/) até que a divisão se torne automática.
