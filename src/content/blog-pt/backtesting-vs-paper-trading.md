---
title: "Backtesting vs Paper Trading: O Que Cada Um Pode Provar"
description: "O backtest pergunta se as regras lucraram no passado; o paper trading, se você as segue. O que cada um prova, como o overfitting engana e uma sequência de uso."
date: 2026-12-07
author: "Stockade Team"
tags: ["Estratégia", "Fundamentos"]
slug: "backtesting-vs-paper-trading"
translationOf: "backtesting-vs-paper-trading"
---

Você escreve uma regra, roda-a sobre dois anos de preços passados e ela dá lucro. Você ajusta o comprimento da média móvel e ela dá ainda mais. Aí você a opera em tempo real e ela não faz nada, ou faz pior. Ou o contrário: você faz paper trading de um setup por um mês, termina no lucro e conclui que ele funciona.

As duas conclusões pulam uma etapa. Um backtest e uma rodada de paper trading respondem a perguntas diferentes, e nenhum dos dois, sozinho, prova que você tem uma vantagem. Este artigo organiza o que cada um consegue mostrar, as formas como cada um engana e a ordem em que nós os usaríamos.

## Dois testes que respondem a perguntas diferentes

Um **backtest** aplica regras fixas a preços históricos e registra o que teria acontecido. Ele pergunta: *essas regras exatas teriam dado lucro em dados que já existem?*

O **paper trading**, também chamado de forward testing (teste para a frente) quando é feito para conferir uma estratégia, significa operar as regras em tempo real com dinheiro simulado. Ele faz duas perguntas diferentes: *você consegue de fato seguir essas regras conforme os preços chegam?* e *o resultado se sustenta em dados que não existiam quando você as escreveu?*

<div class="table-wrap">

| | Backtest | Paper trading |
|---|---|---|
| Dados | O passado | Os preços conforme chegam |
| Velocidade | Anos de operações em minutos | Tempo real, uma operação por vez |
| Tamanho da amostra | Pode ser grande | Geralmente pequeno |
| Quem toma as decisões | As regras, mecanicamente | Você, sob pressão de tempo |
| Principal forma de enganar | Overfitting e vieses no teste | Poucas operações, e nenhum dinheiro real em jogo |

</div>

Os dois se complementam. Um backtest pode mostrar que uma regra tinha vantagem no papel, mas não consegue mostrar que você vai executá-la. O paper trading pode mostrar que você a executa, mas leva muito tempo para juntar operações suficientes para mostrar uma vantagem.

## Como um backtest te engana: o overfitting

Overfitting (sobreajuste) significa ajustar as regras até elas se encaixarem no passado específico em que você testou, incluindo o seu ruído aleatório, e não em algo que vai se repetir. Quanto mais variantes você testa, maior a chance de a melhor ser um acaso.

O desconfortável é quão poucas variantes bastam. Um artigo de 2014 no *Notices of the American Mathematical Society*, [o "Pseudo-Mathematics and Financial Charlatanism", de Bailey, Borwein, López de Prado e Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf), fez essa conta. O índice de Sharpe que eles usam mede o retorno por unidade de volatilidade. Os números deles mostram que, mesmo quando nenhuma das estratégias tem vantagem real, testar só sete configurações independentes num backtest de dois anos basta para que se espere que a melhor mostre um índice de Sharpe anualizado de 1 no teste, enquanto o índice de Sharpe esperado dela em dados novos é zero. Em outro exemplo, eles geraram 1.000 preços diários como um passeio aleatório, de modo que nenhum efeito sazonal podia existir, e mesmo assim encontraram uma estratégia sazonal com índice de Sharpe de 1,27.

A conclusão deles vale a pena adotar como regra: um backtest que não informa quantas variantes foram testadas não pode ser avaliado quanto ao overfitting. Então mantenha uma contagem. Cada mudança de parâmetro que você testa é mais uma variante, incluindo as que você abandona. Se você testou 30 combinações de comprimentos de média móvel e distâncias de stop para achar a vencedora, os resultados dela precisam superar uma barra muito mais alta do que se ela tivesse sido a sua primeira ideia.

Mais uma conferência que faríamos: olhe os vizinhos da vencedora. Se uma média móvel de 17 barras dá lucro, mas as de 16 e 18 dão prejuízo, o resultado provavelmente pertence àquele trecho da história, e não à ideia. Uma regra que merece mais testes deve continuar funcionando mais ou menos quando as configurações dela mudam um pouco.

## Viés de antecipação, viés de sobrevivência e execuções de graça

O overfitting não é a única forma de um backtest favorecer uma regra. Há mais três que vale conferir toda vez.

O **viés de antecipação** (look-ahead bias) é usar informações que a regra não poderia ter no momento em que agiu. Digamos que uma regra compre na abertura quando o dia fecha acima da sua média de 20 dias. Na abertura, ninguém sabe o fechamento. Um backtest que deixa a regra espiar vai parecer muito melhor do que qualquer coisa que você consiga operar.

O **viés de sobrevivência** (survivorship bias) é testar só em ativos que ainda existem. Se você testa uma estratégia de ações nos membros atuais de um índice, removeu sem perceber todas as empresas que faliram, foram deslistadas ou saíram do índice durante o período do teste. As perdedoras não estão nos seus dados, então os resultados pendem para o otimismo.

As **execuções de graça** significam presumir que toda ordem foi executada exatamente ao preço que a regra queria, sem spread, comissão ou slippage. [O guia de risco-retorno](/pt/blog/relacao-risco-retorno-e-expectativa/) mostra como alguns centavos de custo por ação podem mudar a taxa de acerto de equilíbrio de uma estratégia, e as estratégias com stop apertado são as que mais sentem isso.

## O que o paper trading prova e o que não consegue provar

O paper trading testa a parte que um backtest não consegue: você. Você consegue identificar o setup em tempo real, entrar sem hesitar, deixar o stop quieto e pegar a saída que as regras mandam? Uma estratégia que funciona mecanicamente pode fracassar aqui, porque a pessoa que a executa acrescenta uma discricionariedade que o backtest nunca teve. Cada operação também é, por construção, em dados novos, então o forward testing não consegue fazer overfitting do passado como um backtest consegue.

Ele tem três limites. Primeiro, é lento, então as amostras continuam pequenas. [O guia de métricas de desempenho](/pt/blog/analise-suas-metricas-de-desempenho/) mostra que, com 40 operações, uma taxa de acerto de 50% tem uma faixa aproximada de 95% que vai de cerca de 34% a 66%, o que cobre tanto um sistema bom quanto um ruim. Segundo, o dinheiro não é real. [O guia de paper trading](/pt/blog/guia-de-paper-trading/) explica o que isso deixa de fora, e a versão curta é que a disciplina que se mantém com dinheiro virtual muitas vezes escorrega com dinheiro real. Terceiro, as execuções simuladas costumam ser mais gentis do que as reais.

## Como comparar os resultados no papel com o backtest

A pergunta útil não é se o paper trading deu lucro. É se os resultados no papel são coerentes com o que o backtest disse e, se não forem, por quê.

Aqui está um exemplo hipotético. Um backtest informa uma taxa de acerto de 45% em operações planejadas a 1:2, então a expectativa é 0,45 × 2 − 0,55 × 1 = +0,35R por operação. Você faz 40 operações em paper trading e ganha 15, uma taxa de acerto de 37,5%, e a sua vencedora média sai em 1,8R em vez de 2R. A sua expectativa é 0,375 × 1,8 − 0,625 × 1 = +0,05R.

Leia as duas diferenças separadamente. A diferença na taxa de acerto está dentro do ruído: o erro padrão de uma taxa de acerto de 45% em 40 operações é √(0,45 × 0,55 ÷ 40), cerca de 7,9 pontos percentuais, e 37,5% está 7,5 pontos abaixo. Você não consegue saber se essa diferença é real. A vencedora média é outra história. Sair em 1,8R em vez de 2R é algo que você consegue conferir operação por operação e, se [o seu diário](/pt/blog/diario-de-trading/) mostrar saídas antecipadas, isso é um problema de execução, não de estratégia. Corrija a execução e continue testando antes de tirar qualquer conclusão sobre as regras.

## A sequência que usaríamos

1. **Escreva as regras com precisão suficiente para que um desconhecido consiga conferi-las.** [O guia de plano de trading](/pt/blog/como-criar-um-plano-de-trading/) explica como. Se você não consegue escrever, não consegue fazer o backtest nem segui-las.
2. **Faça o backtest num período e conte cada variante que testar.**
3. **Separe um período posterior que você nunca olhou e teste a versão final nele uma única vez.** Se ela falhar ali, você aprendeu algo barato. Não fique ajustando até passar, senão os dados separados viram só mais dados aos quais você se ajustou.
4. **Faça paper trading para a frente por um número de operações fixado com antecedência,** com cada uma registrada no diário, e compare os resultados com o backtest como a seção anterior faz.
5. **Passe para dinheiro real com um tamanho pequeno,** como descreve o guia de paper trading, e só aumente quando os resultados reais continuarem coerentes com os dois testes.

Anote antes de cada etapa qual resultado a encerraria. Na etapa do papel, poderia ser: depois do número planejado de operações, com as regras seguidas em quase todas, a expectativa está abaixo de zero ou muito abaixo da do backtest. Decidir depois convida a mesma flexibilização de regras que o overfitting faz com um backtest.

Cada etapa só pode rejeitar uma estratégia ou deixá-la passar para a próxima. Nenhuma delas prova que a vantagem vai durar, e os mercados mudam. É por isso que o passo 5 começa pequeno.

## Onde a Stockade se encaixa, e onde não se encaixa

A Stockade não consegue fazer backtest. Ela não tem dados históricos de preços nem uma forma de executar regras automaticamente. O modo repetição dela gera 600 candles de um minuto no seu navegador e mostra os primeiros 61; você avança pelo resto à mão com Espaço ou a seta para a direita, ou deixa reproduzir sozinho, sem ver o que vem depois.

Então o modo repetição é um forward test da sua execução, em dados sintéticos. Ele é útil para os hábitos de que o passo 4 depende: seguir regras escritas, colocar os stops no momento da entrada, registrar cada operação. Ele não consegue dizer se uma estratégia tem vantagem. Os preços da Stockade vêm de um algoritmo, um passeio aleatório com um viés de tendência que muda lentamente, sem ligação com nenhum mercado real, então o desempenho de uma estratégia ali não diz nada sobre como ela se sairia em preços reais. E, como mostra o exemplo do passeio aleatório do artigo de Bailey, até uma série sem nenhum padrão real pode produzir resultados que parecem uma estratégia funcionando. Uma boa sequência na Stockade é um registro da sua disciplina, não uma evidência sobre as regras. [O guia sobre simuladores](/pt/blog/o-que-e-um-simulador-de-mercado-de-acoes/) explica o que mais um simulador pode e não pode ensinar.

## Pratique isso no simulador

Escreva um conjunto de regras numa página, depois abra o [simulador](/pt/simulator/) no modo repetição e opere 30 setups estritamente por ele, com um stop digitado no campo Stop Loss em cada operação. Registre cada uma no diário: setup, entrada, stop e alvo planejados, e se você seguiu as regras. No fim, não pergunte se ganhou dinheiro. Pergunte quantas operações quebraram as regras e qual foi a sua vencedora média em R comparada com o que você planejou, porque esses são os números que um forward test real exigiria que você acertasse.
