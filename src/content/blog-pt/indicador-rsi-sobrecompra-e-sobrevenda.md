---
title: "Indicador RSI: Como Identificar Condições de Sobrecompra e Sobrevenda"
description: "RSI acima de 70 não é um sinal de venda. O que o RSI realmente mede, por que sobrecompra significa força, e como ler a divergência sem se enganar."
date: 2026-04-20
author: "Stockade Team"
tags: ["Indicadores"]
slug: "indicador-rsi-sobrecompra-e-sobrevenda"
translationOf: "rsi-indicator-overbought-oversold"
---

Aqui está uma operação que quase todo mundo faz uma vez. Uma ação subiu forte durante uma semana. Você
adiciona o RSI ao gráfico, vê em 78, e lembra da regra: acima de 70 é sobrecompra, sobrecompra significa
vender. Então você vende a descoberto. Nas duas semanas seguintes a ação soma outros 22%, o RSI nunca cai
abaixo de 68, e você encerra a posição com uma perda maior que o movimento que estava tentando capturar.

A regra não estava exatamente errada — você tinha a ideia errada sobre o que ela diz. Um RSI de 78 não é o
mercado te dizendo que uma reversão está vindo. Está te dizendo que compradores dominaram vendedores por
quatorze velas seguidas, o que é uma descrição de força, não uma previsão de fraqueza. Operá-lo como sinal
de venda significa apostar sistematicamente contra a coisa mais forte da tela.

## O que o RSI realmente mede

O Índice de Força Relativa, publicado por J. Welles Wilder em 1978, responde uma pergunta estreita: nas
últimas N velas, como os movimentos médios de alta se comparam aos movimentos médios de baixa? Isso é
genuinamente tudo o que ele faz. Ele pega a variação de fechamento a fechamento de cada vela numa janela de
retrocesso — 14 velas por padrão — as separa em ganhos e perdas, tira a média de cada grupo, e as compara
como uma razão chamada RS, de força relativa:

```
RS = ganho médio / perda média
```

E essa razão é comprimida numa escala de 0 a 100:

```
RSI = 100 - (100 / (1 + RS))
```

Trabalhe um exemplo. Digamos que nas últimas 14 velas, o ganho médio na janela é $2,40 e a perda média é
$1,20. Os movimentos de alta estão rodando o dobro do tamanho dos de baixa:

- RS = 2,40 / 1,20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33,3 = **66,7**

Dois detalhes sobre essas médias. Primeiro, elas dividem pelo período completo de retrocesso, não pelo
número de velas de alta — nove velas de alta somando $21,60 dão um ganho médio de 21,60 / 14 = $1,54, não
$2,40. Segundo, depois do primeiro cálculo Wilder usa uma média móvel suavizada em vez de recalcular do
zero: cada nova média é a média anterior vezes 13, mais o valor da vela mais recente, tudo dividido por 14.
Essa suavização é o motivo pelo qual o RSI se move de forma menos abrupta que o preço bruto.

## Por que a escala de 0 a 100 não é linear como você espera

A fórmula colapsa uma razão sem limite num intervalo limitado, e faz isso de forma desigual. Vale a pena
memorizar três pontos de referência:

<div class="table-wrap">

| Condição | RS | RSI |
|---|---|---|
| Ganho médio igual à perda média | 1,00 | 50,0 |
| Ganho médio é 2,33× a perda média | 2,33 | 70,0 |
| Ganho médio é 0,43× a perda média | 0,43 | 30,0 |

</div>

Confira a linha do meio: 1 + 2,333 = 3,333, e 100 / 3,333 = 30, então RSI = 100 − 30 = 70. A linha de baixo:
1 + 0,4286 = 1,4286, e 100 / 1,4286 = 70, então RSI = 30.

Note o que isso significa. Para imprimir 70, os movimentos de alta só precisam ser um pouco mais que o
dobro dos de baixa — uma condição comum, não extrema. Depois desse ponto a escala comprime forte: passar
de 70 para 90 exige que o RS vá de 2,33 para 9, uma mudança muito maior no mercado subjacente do que o
salto de vinte pontos na tela sugere.

## Por que 70 e 30 são convenções, não leis

Wilder escolheu 70 e 30. Ele poderia ter escolhido 75 e 25. Não há derivação por trás deles, nenhum limiar
estatístico onde o comportamento muda, nenhum mecanismo que liga em 70,0 e desliga em 69,9. São números
redondos que pareciam razoáveis nos gráficos que ele estudou nos anos 1970, e ficaram porque todo mundo
copiou os padrões. A maioria dos softwares de gráficos desenha essas linhas para você, o que reforça
silenciosamente a ideia de que são fronteiras. O gráfico da Stockade faz o mesmo — mude o painel inferior
para RSI e você recebe linhas tracejadas em 70 e 30. São marcas de referência, não veredictos.

O mesmo vale para o retrocesso de 14 períodos. Uma configuração mais curta como 7 reage mais rápido e
alcança os extremos constantemente; uma mais longa como 21 raramente chega lá. O período muda com que
frequência você vê um sinal, não quão confiável ele é — a mesma troca que governa
[escolher o comprimento de uma média móvel](/blog/moving-averages-ema-vs-sma).

## Sobrecompra significa força, não "prestes a reverter"

Este é o ponto em que a operação de abertura errou, e merece sua própria aritmética.

Imagine uma tendência de alta forte: no retrocesso, 12 velas fecharam em alta e 2 em baixa. Os ganhos somam
$28,00, as perdas somam $2,80.

- Ganho médio = 28,00 / 14 = **$2,00**
- Perda média = 2,80 / 14 = **$0,20**
- RS = 2,00 / 0,20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9,1 = **90,9**

Agora pergunte o que seria preciso para o RSI voltar abaixo de 70. Pela tabela acima, o RS precisa cair de
10 para 2,33 — as perdas médias precisariam mais que quadruplicar em relação aos ganhos médios. Numa média
suavizada de 14 velas isso leva muitas velas de comportamento genuinamente diferente. Não acontece porque a
ação teve uma vela vermelha.

Então o RSI não apenas *tolera* estar acima de 70 numa tendência; ele fica aritmeticamente preso lá até que
o caráter do movimento mude. Traders chamam isso do RSI "se incrustar." Uma leitura de 90 diz que a
tendência é incomumente limpa, e uma tendência limpa é a última coisa que você quer apostar contra.

Há uma versão mais sutil da mesma armadilha. Suponha que o RSI esteja em 66,7 (ganho médio $2,40, perda
média $1,20) e a próxima vela feche em alta $1,00. Aplique a suavização: o novo ganho médio é
(2,40 × 13 + 1,00) / 14 = 32,20 / 14 = $2,30, e a nova perda média é (1,20 × 13 + 0) / 14 = 15,60 / 14 =
$1,114. RS = 2,30 / 1,114 = 2,064, então RSI = 100 − (100 / 3,064) = **67,4**.

O preço subiu e o RSI mal se moveu, porque o ganho foi menor que o ganho médio em curso. O RSI acompanha o
momentum, não o preço. Ele pode andar de lado ou até cair enquanto o preço faz novas máximas — que é
exatamente o setup que as pessoas chamam de divergência.

## Como ler a divergência do RSI

Divergência é um desacordo entre preço e momentum.

**Divergência de baixa:** o preço faz uma máxima mais alta, o RSI faz uma máxima mais baixa. O preço foi
mais longe, mas com menos força por trás do que da última vez.

**Divergência de alta:** o preço faz uma mínima mais baixa, o RSI faz uma mínima mais alta. Vendedores
empurraram o preço para baixo de novo mas com menos convicção.

Para ler uma, marque dois pontos de giro do mesmo tipo no preço — duas máximas claras, ou duas mínimas
claras — e compare o RSI em cada uma. Só conta se as duas forem oscilações comparáveis com um recuo real
entre elas; traçar linhas entre velas arbitrárias produz uma divergência em quase qualquer gráfico, por
isso são tão fáceis de ver em retrospectiva.

Seja direto sobre a taxa de acerto: a divergência falha com frequência, e falha pior precisamente onde
parece mais tentadora. Uma tendência forte vai imprimir três ou quatro divergências de baixa a caminho de
cima, e só a última marca alguma coisa — cada uma das anteriores é uma armadilha que custa dinheiro. Trate
a divergência como um motivo para apertar um stop ou parar de adicionar a uma posição ganhadora, não como
uma entrada independente contra a tendência. Apostar contra a força num sinal de divergência é um dos
[hábitos mais caros que traders novos desenvolvem](/blog/common-day-trading-mistakes).

## Usando a linha 50 como filtro de tendência

O nível de RSI mais útil é o que ninguém desenha. RSI 50 é onde os ganhos médios igualam exatamente as
perdas médias. Acima dele, os movimentos de alta estão vencendo; abaixo, os de baixa.

Isso torna o 50 um filtro de regime barato:

- **RSI persistentemente acima de 50** — trate o 30 como inalcançável e pare de procurar entradas compradas
  por sobrevenda. Numa tendência de alta, os recuos tendem a parar por volta de 40–50.
- **RSI persistentemente abaixo de 50** — a imagem espelhada. As altas estagnam perto de 50–60 e nunca
  chegam a 70.

Essa assimetria é mais acionável que os extremos. Numa tendência de alta, uma queda do RSI para 45 que se
sustenta e vira para cima é um recuo terminando dentro de uma tendência forte. Esperar pelo 30 ali significa
esperar por uma leitura que a tendência não vai produzir.

### Ajustando os limiares para 80/20

Uma vez que você aceita que os limiares são convenções, ajustá-los é óbvio. Num mercado fortemente em
tendência, mova as bandas para 80 e 20. Você recebe muito menos sinais, e os que recebe marcam leituras
genuinamente incomuns em vez de força de tendência rotineira. Num mercado em range o padrão 70/30 funciona
melhor, porque ali a reversão à média é de fato o comportamento dominante.

A ordem importa: identifique o regime primeiro, depois escolha os limiares. Usar o RSI para te dizer o
regime e depois usar o mesmo RSI para operar contra ele é raciocínio circular.

## O que o RSI não consegue fazer

O RSI é construído inteiramente com preços de fechamento que você já viu. É uma medida atrasada e derivada
— todo valor é um fato sobre o passado. Ele não vê a ação dentro da vela, e não carrega nenhuma informação
que já não esteja na série de preços.

Também não tem noção de *por que* os preços se moveram. Uma leitura de 90,9 vinda de uma subida constante e
uma vinda de um único gap parecem idênticas para a fórmula. Esse é um bom motivo para ler o RSI junto com a
estrutura de preço e o volume, e para saber em que ele difere do [MACD](/blog/macd-explained), que mede a
separação entre duas médias móveis em vez de uma razão de ganho/perda.

## Pratique ler o RSI no simulador

A forma mais rápida de desaprender "70 significa vender" é observar o RSI se manter acima de 70 por
quarenta velas enquanto o preço sobe. Abra o
[simulador de mercado de ações da Stockade](/pt/simulator/), mude o painel inferior do gráfico de volume
para RSI, e encontre um trecho onde a linha se incrusta acima de 70 — depois anote o quanto o preço percorre
antes de o RSI voltar para 50. Faça também o exercício oposto: marque toda divergência de baixa num gráfico
ascendente e conte quantas realmente precederam uma queda. Os preços são gerados algoritmicamente em vez de
serem dados reais de mercado, mas a aritmética do indicador é idêntica, e essa contagem vai mudar como você
usa a ferramenta.
