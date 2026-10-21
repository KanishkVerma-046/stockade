---
title: "Recuperação de Drawdown: Perder 50% Exige Ganhar 100%"
description: "Perder 50% exige ganhar 100%, mas em quantas operações? Chances de sequências de perdas, o arrasto de volatilidade e como definir antes um limite de drawdown."
date: 2026-11-02
author: "Stockade Team"
tags: ["Gestão de Risco", "Análises"]
slug: "recuperacao-de-drawdown"
translationOf: "drawdown-recovery-math"
---

Perca metade de uma conta de $10.000 e você fica com $5.000. Para voltar a $10.000, você precisa dobrar o que sobrou, um ganho de 100%. Essa frase é muito citada. As perguntas que vêm depois importam mais: quantas operações leva a subida de volta, até onde você deve esperar que uma sequência de perdas chegue, e quanto drawdown você deve aceitar antes mesmo de ter passado por um?

Este artigo faz essas contas. Tudo aqui é aritmética sobre números hipotéticos. Nada disso é reconfortante, e é por isso que vale a pena fazer as contas antes de precisar delas, e não no meio de um mês ruim.

## A fórmula de recuperação em uma linha

Um drawdown é a queda do ponto mais alto da sua conta (o pico) até uma mínima posterior, como percentual desse pico. Se você está abaixo do pico por uma fração *D*, o ganho de que precisa para voltar a ele é:

```
Ganho necessário = D ÷ (1 − D)
```

Uma queda de 20% precisa de 0,20 ÷ 0,80 = 25%. Uma queda de 50% precisa de 0,50 ÷ 0,50 = 100%. A diferença cresce rápido porque cada perda encolhe a base sobre a qual você ganha a recuperação. [O guia de dimensionamento de posição](/pt/blog/gestao-de-risco-e-dimensionamento-de-posicao/) tem a tabela completa de 10% a 75%, então não vamos repeti-la. O que um percentual não diz é quanto tempo a recuperação leva, então o resto deste artigo mede isso em operações.

## Recuperação medida em operações, não em percentual

Para transformar um percentual num número de operações, você precisa de uma estratégia. Pegue uma hipotética: ela ganha 40% das vezes, as vencedoras rendem 2R e as perdedoras perdem 1R, onde R é o valor arriscado por operação. A expectativa dela é 0,40 × 2 − 0,60 × 1 = +0,2R por operação. (Se essa aritmética é nova para você, [o guia de risco-retorno](/pt/blog/relacao-risco-retorno-e-expectativa/) explica passo a passo.) Arrisque 1% da conta por operação e ela rende, em média, 0,2% por operação.

Depois aplique os juros compostos, porque quando você arrisca um percentual fixo, cada operação é dimensionada pelo saldo atual, que é menor. Em média, isto é quantas operações leva para subir de volta:

<div class="table-wrap">

| Drawdown | Ganho necessário | Operações para recuperar a 1% de risco | Operações para recuperar a 2% de risco |
|---|---|---|---|
| 10% | 11,1% | cerca de 56 | cerca de 30 |
| 20% | 25,0% | cerca de 118 | cerca de 63 |
| 30% | 42,9% | cerca de 189 | cerca de 100 |
| 50% | 100,0% | cerca de 367 | cerca de 194 |

</div>

Duas coisas chamam a atenção. Primeiro, um drawdown de 20% a 1% de risco custa bem mais de cem operações de uma estratégia que *funciona*. Se você faz três operações por dia, são cerca de dois meses de trading só para voltar aonde estava.

Segundo, a coluna de 2% parece mais rápida, e isso é uma armadilha. A comparação certa não é o mesmo drawdown em dois níveis de risco, porque a mesma sequência ruim cava um buraco mais fundo a 2%. Passe uma única sequência de dez perdas por cada nível:

<div class="table-wrap">

| Risco por operação | Drawdown após 10 perdas seguidas | Operações para subir de volta |
|---|---|---|
| 1% | 9,6% | cerca de 53 |
| 2% | 18,3% | cerca de 57 |
| 5% | 40,1% | cerca de 70 |

</div>

Dobrar o risco dobra o buraco e mais ou menos dobra a sua velocidade, então a subida leva mais ou menos o mesmo número de operações. Aumente o risco ainda mais e fica pior, não melhor, por um motivo que vamos ver na parte sobre arrasto de volatilidade. Um tamanho maior não te compra uma recuperação mais rápida. Ele te compra um drawdown mais fundo.

Esses números são médias. Sequências reais oscilam: algumas sobem de volta mais cedo, e uma sequência azarada pode levar muito mais tempo.

## Para qual sequência de perdas se preparar

O guia de dimensionamento de posição calcula as chances de uma sequência específica. Uma pergunta mais útil para o planejamento é quão ruim a *pior* sequência num trecho de operações tende a ser. Para a nossa estratégia com 40% de acerto, esta é a chance de ver pelo menos uma sequência de perdas com pelo menos este tamanho:

<div class="table-wrap">

| Sequência de pelo menos | Em 100 operações | Em 200 operações | Em 500 operações |
|---|---|---|---|
| 6 perdas | 87% | 98% | ~100% |
| 8 perdas | 49% | 75% | 97% |
| 10 perdas | 20% | 38% | 71% |
| 12 perdas | 8% | 15% | 35% |
| 14 perdas | 3% | 6% | 14% |

</div>

Esses números vêm da probabilidade exata de uma sequência, com cada operação independente da anterior. Em 500 operações, uma sequência de dez perdas é mais provável do que improvável. E esta é uma estratégia com expectativa positiva. Nada nela está quebrado quando essa sequência chega.

Amostras mais longas produzem sequências mais longas. Parece óbvio, mas pega as pessoas desprevenidas: uma sequência que você nunca viu nas suas primeiras 100 operações não diz nada sobre se você vai vê-la nas próximas 400.

## Arrasto de volatilidade: por que um retorno médio exagera o que você mantém

Esta é a parte mais estranha da matemática do drawdown. Ganhe 50% e depois perca 50%, e o seu retorno médio é zero. A sua conta está 25% abaixo, porque 1,50 × 0,50 = 0,75. Ganhe 10% e perca 10% e você está 1% abaixo (1,10 × 0,90 = 0,99). Ganhe 20% e perca 20% e você está 4% abaixo.

Essa diferença entre o retorno médio e o composto [costuma ser chamada de arrasto de volatilidade (volatility drag), e pode ser aproximada subtraindo metade da variância da média](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/):

```
Retorno composto por período ≈ retorno médio − (variância ÷ 2)
```

em que a variância mede o quanto os resultados oscilam em torno da média. Oscilações pequenas quase não pesam. Oscilações grandes pesam muito, porque a penalidade cresce com o quadrado da oscilação.

Aplique isso à nossa estratégia. O ganho médio dela por operação é 0,2R, então, se você olhasse só as médias, arriscar mais sempre significaria ganhar mais. Os juros compostos discordam:

<div class="table-wrap">

| Risco por operação | Ganho médio por operação | Ganho composto por operação |
|---|---|---|
| 1% | 0,20% | 0,19% |
| 2% | 0,40% | 0,36% |
| 5% | 1,00% | 0,74% |
| 10% | 2,00% | 0,98% |
| 15% | 3,00% | 0,75% |
| 20% | 4,00% | 0,07% |
| 25% | 5,00% | −1,04% |

</div>

A 25% de risco por operação, uma estratégia com expectativa positiva perde dinheiro ao longo do tempo. A média ainda diz +5% por operação, mas o que você realmente mantém encolhe a cada operação. Para esta estratégia, o crescimento chega ao máximo com 10% de risco. Esse ponto máximo é conhecido como fração de Kelly, em referência a [um artigo de 1956 de J. L. Kelly Jr.](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf) que mostra que um apostador que aposta toda vez a fração que maximiza o crescimento acaba ficando à frente de outro que aposta qualquer outra fração fixa, e continua à frente. O Kelly completo pressupõe que você conhece exatamente a sua verdadeira taxa de acerto e a sua verdadeira relação risco-retorno, o que na prática nunca acontece. Nós não chegaríamos nem perto: a 10% de risco, uma sequência de dez perdas leva 65% da conta, e a fórmula de recuperação diz que isso exige um ganho de 187%.

É também por isso que os números de "operações para subir de volta" aumentam a 5%. O arrasto come a velocidade da recuperação enquanto as perdas continuam tão fundas quanto antes.

## Escolha o seu drawdown máximo antes de precisar dele

Todos os números acima apontam na mesma direção: decida até onde você está disposto a ir enquanto está calmo, e depois faça a conta de trás para frente até chegar a um nível de risco. Três passos:

1. **Escolha o drawdown com o qual você continuaria operando.** Seja honesto. Se uma queda de 20% faria você abandonar a estratégia, esse é o seu número, diga o que disser um livro.
2. **Escolha a sequência para a qual você está se planejando.** Pela tabela de sequências, uma sequência de 12 perdas tem cerca de uma chance em três de acontecer em 500 operações da nossa estratégia. É um cenário razoável para o planejamento.
3. **Resolva para o risco por operação.** Você precisa que (1 − risco)^sequência fique acima de 1 − drawdown. Para um limite de 20% e uma sequência de 12 perdas, risco ≤ 1 − 0,80^(1/12) = **1,84%**. Planeje para 14 perdas e o resultado é 1,58%.

Depois deixe uma margem. Um drawdown real costuma ser mais fundo do que a sua sequência mais longa, porque as perdas vêm em grupos com algumas pequenas vitórias espalhadas entre elas, e a conta continua escorregando durante tudo isso. Cortar o número calculado pela metade, para algo abaixo de 1% neste caso, é um ponto de partida defensável.

Por fim, anote o que acontece em cada marco: por exemplo, cortar o risco pela metade a −10% e parar de operar para revisar a −15%. Reduzir o tamanho deixa a subida mais lenta, já que a 1% em vez de 2% um drawdown de 10% leva cerca de 56 operações em vez de 30. Mas reduz o estrago da próxima sequência, que é aquela que você não consegue ver chegando. A regra que mais importa é a que [o guia de erros de day trading](/pt/blog/erros-comuns-de-day-trading/) alerta pelo outro lado: nunca aumente o tamanho para recuperar um drawdown. Coloque esses números no [seu plano de trading](/pt/blog/como-criar-um-plano-de-trading/) para que estejam decididos antes de as perdas começarem.

## O que o cartão de Drawdown Máximo da Stockade mede

Na [página de Análises](/pt/analytics/) da Stockade, o Drawdown Máximo percorre as suas operações fechadas na ordem em que foram fechadas, começando pelo saldo inicial de $100.000 como o primeiro pico. Ele registra a maior queda abaixo do pico em curso, como percentual desse pico.

Como usa apenas operações fechadas, as oscilações de uma posição aberta nunca aparecem. Se uma operação aberta derruba o seu capital em 8% e depois se recupera antes de você fechá-la, essa queda nunca aparece, e uma perda que você ainda está carregando não conta até você fechar a posição. Trate o cartão como um piso para o quanto a queda realmente foi funda. [O guia de métricas de desempenho](/pt/blog/analise-suas-metricas-de-desempenho/) cobre o resto da página.

## Pratique isso no simulador

Antes da sua próxima sessão no [simulador](/pt/simulator/), anote três números: o seu risco por operação, a sequência para a qual você está se planejando e o drawdown no qual vai reduzir o tamanho. Dimensione cada operação pelo saldo atual, não pelo inicial. Depois de 50 operações, compare o Drawdown Máximo em [Análises](/pt/analytics/) com o que o seu plano permitia, e conte à mão a sua maior sequência de perdas na aba Diário. Os preços da Stockade são gerados no seu navegador e o dinheiro dela é virtual, então um drawdown ali é um número numa tela. A aritmética de subir de volta é a mesma, e o hábito de decidir os seus limites com antecedência é a parte que vale a pena levar para o trading real.
