---
title: "Relação Risco-Retorno e Expectativa: Como Elas se Encaixam"
description: "A relação risco-retorno só diz a taxa de acerto necessária para empatar. A tabela de equilíbrio, como stop e alvo a mudam, e por que 1:3 é uma regra prática."
date: 2026-10-26
author: "Stockade Team"
tags: ["Gestão de Risco", "Estratégia"]
slug: "relacao-risco-retorno-e-expectativa"
translationOf: "risk-reward-ratio-expectancy"
---

Uma das primeiras regras que traders novos encontram é "só entre em operações com relação risco-retorno de pelo menos 1:3". Então você compra uma ação hipotética de $40, coloca o stop em $39 e o alvo em $43, e parece a coisa responsável a fazer. Você está arriscando $1 para ganhar $3. Difícil argumentar contra isso.

O problema é que a relação não te disse se a operação é boa. Sozinha, ela não consegue. Uma relação risco-retorno é metade de um cálculo, e a outra metade é a parte que as pessoas pulam: com que frequência o alvo realmente é atingido antes do stop.

## O que a relação risco-retorno mede e o que ela deixa de fora

A relação compara duas distâncias. O risco é entrada menos stop: $40 − $39 = $1 por ação. O retorno é alvo menos entrada: $43 − $40 = $3 por ação. Divida o retorno pelo risco e você obtém 3, que as pessoas escrevem como 1:3 ou 3:1, dependendo do costume. Aqui vamos escrever 1:3, risco primeiro, e medir o retorno em unidades de risco: o retorno desta operação é 3R, onde 1R é o valor que você pode perder. Se múltiplos de R são novidade para você, [o guia de dimensionamento de posição](/pt/blog/gestao-de-risco-e-dimensionamento-de-posicao/) explica o conceito.

O que a relação deixa de fora é a probabilidade. Uma operação 1:3 que chega ao alvo uma vez em cada dez é uma operação ruim. Uma operação 1:1 que chega ao alvo seis vezes em cada dez é uma boa operação. Olhando só a relação, você não consegue saber qual das duas tem nas mãos, porque a relação é uma afirmação sobre preços que você escolheu, não sobre o que o mercado provavelmente vai fazer.

## A taxa de acerto de equilíbrio para cada relação risco-retorno

Aqui está o que a relação diz de útil. Ao longo de muitas operações, você ganha 3R cada vez que acerta e perde 1R cada vez que erra. Você empata quando esses valores se anulam. Se a sua taxa de acerto é *w*, isso significa w × 3 = (1 − w) × 1, que dá w = 1 ÷ 4, ou 25%. A versão geral, para um retorno de R unidades de risco:

```
Taxa de acerto de equilíbrio = 1 ÷ (1 + R)
```

É a mesma fórmula que [o guia de métricas de desempenho](/pt/blog/analise-suas-metricas-de-desempenho/) usa para a relação risco-retorno realizada, aplicada antes da operação em vez de depois. Aqui está ela para as relações mais comuns:

<div class="table-wrap">

| Risco-retorno | Você ganha por $1 arriscado | Taxa de acerto de equilíbrio |
|---|---|---|
| 1:0,5 | $0,50 | 66,7% |
| 1:1 | $1,00 | 50,0% |
| 1:1,5 | $1,50 | 40,0% |
| 1:2 | $2,00 | 33,3% |
| 1:3 | $3,00 | 25,0% |
| 1:4 | $4,00 | 20,0% |
| 1:5 | $5,00 | 16,7% |

</div>

Leia a tabela como uma etiqueta de preço. Escolher 1:3 não te faz ganhar dinheiro. Isso coloca a barra em 25%: acerte com mais frequência do que isso e a estratégia dá lucro em média; acerte menos e ela dá prejuízo. Se você supera a barra ou não depende do setup, não da relação.

A distância entre a sua taxa de acerto real e a de equilíbrio é a sua vantagem. Em termos de R, a expectativa é taxa de acerto × R − taxa de perda × 1. Uma taxa de acerto de 30% em operações 1:3 dá 0,30 × 3 − 0,70 = +0,20R por operação. Os mesmos 30% em operações 1:2 dão 0,30 × 2 − 0,70 = −0,10R. Mesma taxa de acerto, resultado oposto.

## Mover o alvo muda as chances, não só o ganho

É aqui que o hábito do 1:3 engana as pessoas. Quando você empurra um alvo para mais longe, não está só aumentando o retorno. Está diminuindo a chance de alcançá-lo. Esses dois efeitos puxam em sentidos opostos, e é fácil prestar atenção só no primeiro.

Pegue o caso extremo. Suponha que um preço não tivesse tendência em nenhuma direção, de modo que cada pequeno movimento tivesse a mesma chance de ser para cima ou para baixo, como uma moeda honesta. Esse é o clássico problema da ruína do jogador, da teoria da probabilidade, e num passeio desse tipo, [a chance de subir uma certa quantia antes de cair outra é a queda dividida pela soma das duas](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). Em termos de trading:

```
P(alvo antes do stop) = distância do stop ÷ (distância do stop + distância do alvo)
```

Com um stop de $1 e um alvo de $3, isso dá 1 ÷ 4 = 25%. Exatamente a taxa de acerto de equilíbrio da tabela. Tente qualquer outro par e acontece a mesma coisa: num preço sem direção, toda relação cai precisamente no seu próprio ponto de equilíbrio. Um alvo de 1:5 é atingido 16,7% das vezes, um de 1:1 em 50% delas, e nenhum deles ganha ou perde dinheiro em média.

Achamos que esse é o fato isolado mais útil sobre risco-retorno. A relação não consegue criar uma vantagem sozinha. Preços reais não são moedas honestas, e é daí que a vantagem pode vir: um setup só vale a pena se torna o alvo *mais* provável do que essa referência. A relação define a barra. O seu motivo para fazer a operação é o que precisa superá-la.

## Por que "nunca aceite menos de 1:3" é uma regra prática

Regras como "mínimo de 1:3" existem por um bom motivo. Elas te obrigam a definir um alvo antes de entrar, e te impedem de arriscar um dólar para ganhar dez centavos. Como filtro, tudo bem.

Como lei, a regra desmorona. Compare quatro setups hipotéticos:

<div class="table-wrap">

| Setup | Risco-retorno | Taxa de acerto | Equilíbrio | Expectativa por operação |
|---|---|---|---|---|
| A | 1:1 | 60% | 50,0% | 0,60 × 1 − 0,40 = **+0,20R** |
| B | 1:2 | 40% | 33,3% | 0,40 × 2 − 0,60 = **+0,20R** |
| C | 1:3 | 30% | 25,0% | 0,30 × 3 − 0,70 = **+0,20R** |
| D | 1:3 | 22% | 25,0% | 0,22 × 3 − 0,78 = **−0,12R** |

</div>

A, B e C rendem o mesmo por operação. A não passa na regra do 1:3 e está ótimo. D passa nela e perde dinheiro. A regra não consegue diferenciá-los, porque só olha para um dos dois números.

Há também um custo mais silencioso. Se o alvo natural de um setup está a dois dólares de distância e você insiste em três, você levou o alvo para além de onde a sua ideia diz que o preço provavelmente vai chegar. A relação melhora no papel enquanto a taxa de acerto cai, muitas vezes mais do que a tabela consegue absorver. Quando o alvo honesto não dá uma relação com a qual você consegue conviver, o melhor geralmente é pular a operação ou esperar uma entrada mais perto do stop, e não esticar o alvo.

## Mover o stop também muda a relação

A mesma troca vale no sentido contrário. Mantenha o alvo de $43 e aperte o stop de $39 para $39,50. O risco cai para $0,50, o retorno fica em $3, e a relação salta de 1:3 para 1:6. O equilíbrio cai de 25% para 1 ÷ 7, ou 14,3%.

Parece uma melhoria de graça. Não é. Um stop com metade da distância é atingido com mais frequência pelo ruído normal do preço, e no preço sem direção da seção acima, a chance de chegar a $43 primeiro cai para 0,50 ÷ 3,50 = 14,3%. De volta ao equilíbrio. Apertar o stop só ajuda se o novo stop ainda estiver onde a sua ideia de operação se prova errada, que é todo o argumento de [posicionar stops pela estrutura](/pt/blog/ordens-stop-loss-explicadas/).

Isso também muda o seu tamanho. Se você arrisca $200 fixos por operação, um stop de $1 significa 200 ações, uma posição de $8.000. Um stop de $0,50 significa 400 ações e $16.000. O risco em dólares é o mesmo nos dois casos, mas o stop mais apertado precisa do dobro de capital, então confira se cabe antes de presumir que a relação melhor está ao seu alcance.

## A relação que você planeja não é a relação que você obtém

A relação que você anota antes da entrada é um plano. A que aparece nos seus resultados é o que aconteceu, e geralmente é pior. Quatro coisas a corroem:

- **Saídas antecipadas.** Realizar o lucro em $41,80 porque ficou nervoso transforma uma vencedora de 3R numa de 1,8R.
- **Stops movidos.** Alargar um stop no meio da operação transforma uma perda de 1R numa perda maior.
- **Preços de execução.** Num mercado rápido, um stop pode ser executado além do seu nível, então um plano de −1R vira −1,1R.
- **Custos.** Comissão e spread saem de toda vencedora e se somam a toda perdedora.

Os custos pesam mais em stops apertados. Digamos que os custos de ida e volta na nossa ação de $40 somem hipotéticos $0,05 por ação. Com o stop de $1, uma vencedora rende $2,95 líquidos e uma perdedora custa $1,05, então o equilíbrio passa a ser 1,05 ÷ (1,05 + 2,95) = 26,25% em vez de 25%. Com o stop de $0,50, uma perdedora custa $0,55 e o equilíbrio passa a ser 0,55 ÷ 3,50 = 15,7% em vez de 14,3%. São os mesmos cinco centavos, mas eles são uma fatia maior de um risco pequeno.

A solução é medir a sua relação realizada em vez de confiar na planejada. O ganho médio dividido pela perda média (sem o sinal) é a sua relação risco-retorno real. Se você planejou 1:3 com $200 de risco, mas a sua vencedora média é de $420 e a sua perdedora média é de $210, na verdade você está operando 1:2. O seu equilíbrio é 33,3%, não 25%, e uma taxa de acerto de 28% que parecia saudável está perdendo dinheiro.

## Como escolher um alvo pensando na taxa de acerto

Juntando tudo, esta é a ordem em que nós trabalharíamos:

1. **Defina o stop primeiro,** no preço que prova que a ideia está errada.
2. **Defina o alvo onde o preço poderia chegar de forma realista,** como o próximo [nível de suporte ou resistência](/pt/blog/suporte-e-resistencia/), e não num múltiplo que você escolheu de antemão.
3. **Calcule a relação e o seu equilíbrio** pela tabela.
4. **Compare esse equilíbrio com a sua taxa de acerto registrada** para esse tipo de setup, e exija uma margem clara acima dele. Se você tem só algumas dezenas de operações, essa taxa de acerto ainda é um palpite grosseiro; [a seção sobre tamanho de amostra](/pt/blog/analise-suas-metricas-de-desempenho/) explica o quão grosseiro.
5. **Se não passar, pule a operação.** Nada de esticar o alvo.

Quando uma operação passa, uma [ordem bracket](/pt/blog/ordens-oco-e-bracket/) segura as duas saídas por você, então o plano não depende da força de vontade na hora. E escreva a sua margem mínima acima do equilíbrio no [seu plano de trading](/pt/blog/como-criar-um-plano-de-trading/), para decidir isso uma vez só, e não operação por operação.

## Pratique isso no simulador

No [simulador](/pt/simulator/) da Stockade, os campos Stop Loss e Take Profit recebem preços, e juntos funcionam como um bracket OCO na sua posição aberta: quando um deles dispara, a posição inteira fecha ao preço daquele tick e os dois níveis são limpos. Não há spread nem comissão, então ali a diferença entre a relação planejada e a realizada vem das suas próprias saídas e dos ticks que cruzam um nível. Antes de cada operação, anote a relação e o seu equilíbrio. Depois de 30 operações, abra [Análises](/pt/analytics/), divida o Ganho Médio pela Perda Média sem o sinal de menos e compare o resultado com o que você planejou, e a sua Taxa de Acerto com o equilíbrio de que você precisava. Os preços da Stockade são gerados no seu navegador, um passeio aleatório com um viés de tendência que muda lentamente, então uma taxa de acerto ali não diz nada sobre como um setup se sai num mercado real. O que ela treina é o hábito: stop, alvo, relação, equilíbrio, toda vez.
