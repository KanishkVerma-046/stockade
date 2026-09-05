---
title: "MACD Explicado: Como Ler e Operar com o MACD"
description: "MACD são duas médias móveis, sua diferença, e uma cópia suavizada dessa diferença. Veja como calcular cada parte, lê-la, e saber quando ela mente."
date: 2026-04-27
author: "Stockade Team"
tags: ["Indicadores"]
slug: "macd-explicado"
translationOf: "macd-explained"
---

Você está vendo um gráfico subir e não consegue responder a única pergunta que importa: esse movimento
ainda está ganhando força, ou está desacelerando? Uma ação pode imprimir cinco fechamentos mais altos
seguidos enquanto cada um desses fechamentos ganha menos terreno que o anterior — tendência intacta, motor
morrendo. Quando isso aparece no preço, geralmente já é tarde demais para agir.

O MACD existe para essa lacuna. Ele não te diz onde o preço está. Ele te diz se a *distância entre duas
médias móveis* está aumentando ou diminuindo, o que é uma aproximação grosseira de se um movimento está
acelerando ou desacelerando. Esse é um trabalho mais estreito do que a maioria das pessoas imagina, e
entender essa estreiteza é o que separa usar o MACD de ser enganado por ele.

## Os três componentes e como cada um é calculado

MACD significa Moving Average Convergence Divergence (Convergência e Divergência de Médias Móveis) — um
nome honesto, já que o indicador inteiro é sobre duas médias móveis convergindo ou divergindo. Ele tem três
partes, cada uma construída a partir da anterior.

<div class="table-wrap">

| Componente | Fórmula | O que mede |
|---|---|---|
| Linha MACD | EMA de 12 períodos − EMA de 26 períodos | O intervalo entre a tendência rápida e a lenta |
| Linha de sinal | EMA de 9 períodos da linha MACD | Uma versão suavizada desse intervalo |
| Histograma | Linha MACD − linha de sinal | Se o intervalo está aumentando ou diminuindo |

</div>

### A linha MACD

Pegue uma média móvel exponencial das últimas 12 barras e uma das últimas 26 barras, depois subtraia a
mais lenta da mais rápida. Para entender como uma EMA pondera as barras recentes mais fortemente que as
antigas, veja [médias móveis: EMA vs SMA](/blog/moving-averages-ema-vs-sma/).

Concretamente: se a EMA de 12 períodos é 188,40 e a EMA de 26 períodos é 186,90, a linha MACD marca
188,40 − 186,90 = **1,50**. A média rápida está $1,50 acima da lenta. Esse número está nas unidades do
próprio preço — dólares aqui, não um percentual e não uma escala limitada de 0 a 100 como o
[RSI](/blog/rsi-indicator-overbought-oversold/). Uma ação de $400 rotineiramente produz valores de MACD dez
vezes maiores que uma ação de $40, o que é por isso que leituras de MACD nunca são comparáveis entre
instrumentos.

### A linha de sinal

A linha MACD é agitada, então o MACD aplica uma segunda passada de suavização: uma EMA de 9 períodos da
própria linha MACD. Essa é a linha de sinal, e ela atrasa em relação à linha MACD por construção, sendo uma
média do próprio histórico recente dessa linha.

A constante de suavização da EMA é 2 ÷ (período + 1), então a linha de sinal usa 2 ÷ 10 = 0,20 — cada novo
valor é o antigo mais 20% da distância até o valor MACD atual. Se a linha de sinal estava em 1,20 e a
linha MACD imprime 1,72, o novo sinal é 1,20 + 0,20 × (1,72 − 1,20) = 1,20 + 0,104 = 1,304.

### O histograma

O histograma é a parte mais simples: linha MACD menos linha de sinal, desenhada como barras acima e abaixo
de zero. Com a linha MACD em 1,50 e a linha de sinal em 1,20, a barra do histograma é 1,50 − 1,20 =
**0,30**.

Como o histograma é definido como essa diferença, ele cruza zero exatamente na mesma barra em que a linha
MACD cruza a linha de sinal. É um evento desenhado de duas formas. Quem afirma que um cruzamento de zero
do histograma *confirma* um cruzamento da linha de sinal está descrevendo a mesma coisa duas vezes.

## Por que as configurações são 12, 26 e 9

Esses números são convenção, não matemática. Gerald Appel os escolheu quando construiu o MACD no final dos
anos 1970, e eles têm sido o padrão desde então. Não há derivação para recuperar: nenhuma propriedade dos
mercados torna 12 e 26 especiais, e você não vai encontrar nenhum cálculo que chegue neles. Histórias de
origem que soam elegantes circulam — que eles correspondem a alguma contagem organizada de semanas ou
sessões — mas são folclore inventado depois do fato para explicar uma escolha que foi simplesmente uma
escolha. O que importa é o que os números controlam: 12 e 26 definem quão rápida e quão lenta são as duas
médias, e 9 define quanta suavização fica por cima.

Eles importam hoje principalmente porque tanta gente os usa. Um padrão que milhões de telas exibem se torna
levemente autorrealizável: quando um cruzamento amplamente observado imprime, alguns traders agem sobre
ele, colocando ordens reais atrás de um número arbitrário. Esse é um efeito fraco, não uma lei, mas supera
qualquer alegação de que as configurações são ótimas.

Você pode alterá-las. Encurtar para 6/13/5 torna o MACD mais nervoso e mais precoce — mais sinais, mais
deles errados. Alongar para 19/39/9 o torna mais lento e mais limpo — menos sinais, mais tarde. Nenhum é
melhor; você está escolhendo onde na curva de responsividade versus ruído quer ficar. O que você não deve
fazer é ajustar as configurações até que capturem os últimos três movimentos do gráfico na sua frente. Isso
é curve-fitting, e descreve a história em vez de prever qualquer coisa.

## Cruzamentos da linha zero versus cruzamentos da linha de sinal

Esses são eventos diferentes com significados diferentes, e confundi-los é o erro de MACD mais comum.

**A linha MACD cruzando zero** significa que a EMA de 12 cruzou a EMA de 26 — um cruzamento comum de médias
móveis, reafirmado. Acima de zero a média rápida está acima da lenta; abaixo de zero, o contrário. É uma
afirmação sobre direção de tendência, e como envolve a média lenta de 26 períodos, é atrasada.

**A linha MACD cruzando a linha de sinal** significa que o intervalo atual entre as médias se afastou do
seu próprio intervalo médio recente. É uma afirmação sobre mudança de momentum, e dispara antes do
cruzamento de zero — frequentemente muito antes, e frequentemente quando não há mudança de tendência
nenhuma.

A leitura prática: um cruzamento de sinal de alta enquanto o MACD está bem abaixo de zero é um repique
dentro de uma tendência de baixa até que se prove o contrário. O mesmo cruzamento conforme o MACD empurra
para cima através de zero é uma afirmação mais forte, porque duas coisas estão concordando. Filtrar
cruzamentos de sinal por qual lado de zero eles ocorrem corta drasticamente sua contagem de sinais, que é
o objetivo.

## Lendo o histograma, e a armadilha dentro dele

Aqui está a nuance que torna o histograma útil. Percorra cinco barras de uma alta:

<div class="table-wrap">

| Barra | Preço | Linha MACD | Linha de sinal | Histograma |
|---|---|---|---|---|
| 1 | 190,10 | 1,50 | 1,20 | 0,30 |
| 2 | 192,40 | 1,72 | 1,30 | 0,42 |
| 3 | 194,30 | 1,85 | 1,41 | 0,44 |
| 4 | 195,60 | 1,90 | 1,51 | 0,39 |
| 5 | 196,20 | 1,88 | 1,58 | 0,30 |

</div>

O preço subiu em cada barra, de 190,10 a 196,20. Mas o histograma atingiu o pico de 0,44 na barra 3 e
encolheu nas barras 4 e 5, voltando para onde começou.

**Um histograma encolhendo não significa que o preço está caindo. Significa que o preço está subindo mais
devagar do que estava.** O movimento está desacelerando enquanto ainda se move. Na barra 5 a linha MACD na
verdade caiu um pouco, de 1,90 para 1,88, mesmo com o preço postando outro fechamento mais alto — as duas
médias começaram a convergir.

Isso é genuinamente útil, e também é onde as pessoas se machucam. Desaceleração não é reversão. Uma
tendência que desacelera pode achatar, consolidar por vinte barras, e retomar. Barras encolhendo são um
motivo para apertar um stop ou parar de adicionar a uma posição; tratar cada uma como um sinal de venda te
faz lutar contra tendências fortes repetidamente.

Se a barra 6 imprimisse um MACD de 1,60, a linha de sinal se moveria para 1,5876 e o histograma para
aproximadamente 0,01 — quase plano, ainda positivo. Um MACD de 1,40 na barra 7 puxa o sinal para 1,5500 e o
histograma para −0,15: o cruzamento de fato, três barras depois de o histograma te avisar pela primeira
vez.

## Divergência do MACD e o que ela vale

Divergência é quando o preço e o MACD discordam sobre a direção.

**Divergência de baixa:** o preço faz uma máxima mais alta, mas o pico correspondente da linha MACD é mais
baixo que seu pico anterior. A nova máxima de preço foi alcançada com menos momentum por trás dela.

**Divergência de alta:** o preço faz uma mínima mais baixa enquanto a linha MACD faz uma mínima mais alta.
A pressão vendedora está diminuindo mesmo com o preço rastejando para baixo.

Divergência vale a pena observar e não vale a pena operar sozinha. Tendências fortes a produzem por
trechos longos — uma tendência de alta pode mostrar divergência de baixa ao longo de dezenas de barras
enquanto faz novas máximas, porque o impulso inicial estabeleceu um pico de momentum que a tendência nunca
mais precisa igualar. Divergência te diz que um movimento está cansado, não que ele acabou.

Ela se torna mais crível quando algo independente concorda: uma linha de tendência rompida, uma falha num
nível que segurou antes, ou um padrão de volume que contradiz o movimento de preço.
[Volume](/blog/understanding-trading-volume/) é uma confirmação útil aqui precisamente porque vem de um
insumo diferente do MACD. Dois indicadores derivados dos mesmos preços de fechamento concordando não é
confirmação; é aritmética.

## Por que o MACD é duplamente atrasado e falha em mercados sem direção

Duas fraquezas estruturais, ambas permanentes.

**É atraso construído sobre atraso.** Uma EMA já é retrospectiva por natureza — a EMA de 26 períodos tem um
centro de massa a cerca de doze barras e meia atrás. O MACD subtrai duas delas, depois suaviza o resultado
com uma *terceira* EMA para fazer a linha de sinal. Todo cruzamento descreve algo que já terminou de
acontecer. Nada no MACD é preditivo; ele comprime o histórico recente de preços em um número, e a
compressão leva tempo.

**Ele produz sinais falsos constantes em mercados laterais.** A premissa do MACD é que existe uma
tendência para medir. Quando o preço oscila num range, as duas EMAs ficam quase sobrepostas, a linha MACD
paira perto de zero, e ela cruza a linha de sinal para lá e para cá a cada poucas barras. Cada cruzamento
parece idêntico a um de verdade. Uma tarde agitada pode gerar oito cruzamentos, todos ruído, e operá-los
custa spread e comissões antes mesmo de a direção entrar em cena.

A defesa padrão é tomar sinais do MACD apenas na direção de uma tendência de mais longo prazo — só
cruzamentos de alta enquanto o preço está acima da sua EMA de 50 períodos, por exemplo. Uma mais barata é
checar se a linha MACD está longe de zero; cruzamentos impressos com as barras do histograma mal visíveis
raramente importam.

## Pratique isso no simulador

Ler sobre um histograma encolhendo não é a mesma coisa que notar um enquanto uma posição está aberta e no
verde. Ligue o MACD e observe o histograma ao longo de um movimento completo — marque a barra onde ele
atinge o pico, depois conte quantas barras a mais o preço continuou subindo antes de a linha MACD realmente
cruzar. Essa lacuna é seu atraso, medido em vez de descrito.

Depois opere com ele. Toda vez que um cruzamento de linha de sinal imprimir, decida antes da próxima barra
se você o assumiria e anote de qual lado de zero ele aconteceu. Faça isso trinta vezes e você terá sua
própria contagem de quantos cruzamentos em mercado sem direção valiam a pena assumir — mais convincente que
qualquer coisa aqui. Todo preço na Stockade é gerado algoritmicamente em vez de vir de um mercado real,
então o que você está treinando é a leitura, não uma previsão. E seja honesto: com $100.000 de capital
virtual de trading, aguentar um histograma encolhendo é muito mais fácil do que será com dinheiro que é
realmente seu. Comece no [simulador de mercado de ações da Stockade](/pt/simulator/).
