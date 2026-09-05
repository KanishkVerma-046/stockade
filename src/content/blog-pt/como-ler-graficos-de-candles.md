---
title: "Como Ler Gráficos de Candles: O Guia Completo para Iniciantes"
description: "Cada candle empacota quatro preços em uma forma. Aprenda o que o corpo e os pavios codificam, os padrões que valem a pena saber, e por que contexto vence."
date: 2026-03-30
author: "Stockade Team"
tags: ["Fundamentos", "Análise Técnica"]
slug: "como-ler-graficos-de-candles"
translationOf: "how-to-read-candlestick-charts"
---

Você abre um gráfico e é uma parede de retângulos vermelhos e verdes com fios saindo de cima e de baixo.
Alguém te diz que aquele de pernas longas perto do fundo é um hammer, e que significa que os vendedores
estão exauridos. Você compra. O preço continua caindo. O problema nunca foi você identificar a forma
errada — foi que ninguém explicou do que a forma é feita, ou o que ela pode honestamente te dizer.

Um candle não é um símbolo para decorar. É um registro comprimido de uma disputa entre compradores e
vendedores ao longo de uma fatia fixa de tempo, e assim que você consegue decompô-lo, os nomes deixam de
importar tanto.

## Os quatro preços que todo candle codifica

Escolha um período — digamos cinco minutos. Todo candle num gráfico de 5 minutos resume exatamente uma
janela de cinco minutos com quatro números, sempre os mesmos quatro:

- **Abertura (Open)** — o primeiro preço negociado da janela.
- **Máxima (High)** — o preço mais alto alcançado durante ela.
- **Mínima (Low)** — o preço mais baixo alcançado durante ela.
- **Fechamento (Close)** — o último preço negociado antes de a janela terminar.

Esses são os valores OHLC, e o candle os desenha geometricamente. O **corpo** é o retângulo entre a
abertura e o fechamento. Se o fechamento está acima da abertura, o corpo é desenhado verde (ou vazado) e o
candle é de alta para aquela janela. Se o fechamento está abaixo da abertura, é vermelho (ou preenchido) e
o candle é de baixa. Os **pavios** — também chamados de sombras ou caudas — são as linhas finas que correm
do corpo até a máxima em cima e até a mínima embaixo.

Então o corpo te diz onde a janela *terminou* em relação a onde *começou*. Os pavios te dizem para onde o
preço *foi* e foi rejeitado. Essa segunda parte é onde a maior parte da informação vive, e é a parte que
iniciantes ignoram.

## Lendo um único candle: um exemplo trabalhado

Pegue um candle. Ele abre a 187,42, sobe até 189,10, cai até 186,90, e fecha a 187,05.

<div class="table-wrap">

| Componente | Cálculo | Valor | Fração da amplitude |
|---|---|---|---|
| Amplitude total | 189,10 − 186,90 | 2,20 | 100% |
| Corpo (abertura → fechamento) | 187,42 − 187,05 | 0,37 | 17% |
| Pavio superior | 189,10 − 187,42 | 1,68 | 76% |
| Pavio inferior | 187,05 − 186,90 | 0,15 | 7% |

</div>

O fechamento é 0,37 abaixo da abertura, então este é um candle vermelho — mas só por pouco. Numa abertura
de 187,42, uma queda de 0,37 é 0,20%. Se você só olhasse o preço de fechamento, chamaria essa janela de
neutra e seguiria em frente.

A forma diz algo muito mais alto. Compradores empurraram o preço 1,68 para cima — um avanço de 0,90% —
depois devolveram cada centavo disso e um pouco mais. Três quartos de tudo o que aconteceu nessa janela
aconteceu *acima* de onde o candle terminou. Alguém estava disposto a vender naquela alta, e ao fechamento
os compradores que a perseguiram estavam todos no vermelho.

Essa é toda a habilidade: ler o candle como uma sequência de eventos, não como um desenho. O corpo de 0,37
é o número menos interessante do conjunto.

## O que um único candle pode e não pode te dizer

Ele pode te dizer o equilíbrio de pressão dentro de uma janela e onde o preço foi rejeitado. Ele não pode
te dizer o que acontece depois.

Também não pode te dizer a *ordem* dos eventos. Nosso candle de exemplo é consistente com "subiu até
189,10 primeiro, depois desabou até 186,90" e igualmente consistente com "caiu até 186,90 primeiro, depois
disparou até 189,10 e recuou." Mesmos quatro números, mesmo desenho, duas histórias muito diferentes. Desça
para um período mais curto e a ambiguidade se resolve — mas no candle na sua frente, não se resolve.

E um candle só significa algo em relação aos seus vizinhos. Uma amplitude de 2,20 é enorme num instrumento
que normalmente se move 0,40 em cinco minutos e nada notável num que normalmente se move 3,00.

## Padrões de um único candle que valem a pena conhecer

Quatro formas cobrem a maior parte do que um único candle pode expressar.

### Doji — o impasse

A abertura e o fechamento são quase idênticos, então o corpo é uma linha fina. Exemplo: abre a 42,18,
fecha a 42,21, com uma máxima de 42,66 e uma mínima de 41,79. O corpo é 0,03 contra uma amplitude de 0,87
— menos de 4%. O preço percorreu 2% inteiros do seu valor e voltou para quase exatamente onde começou.
Compradores e vendedores lutaram até o empate. Depois de uma tendência longa, essa parada vale a pena
notar. No meio de uma oscilação tranquila, é ruído.

### Hammer — rejeição por baixo

Corpo pequeno perto do topo da amplitude, pavio inferior longo, pouco ou nenhum pavio superior. Exemplo:
abre a 64,30, cai para 61,90, se recupera, fecha a 64,10, máxima de 64,55. O pavio inferior é 2,20 de uma
amplitude de 2,65 — 83% de tudo o que aconteceu foi abaixo do corpo, e o preço se recusou a ficar lá.
Vendedores o empurraram para baixo e foram dominados. A mesma forma idêntica aparecendo depois de uma
*tendência de alta* se chama hanging man, e é lida de forma baixista. Mesma geometria, implicação oposta,
decidida inteiramente pelo que veio antes.

### Shooting star — rejeição por cima

O hammer invertido: corpo pequeno perto do fundo, pavio superior longo. Nosso exemplo de 187,42 de antes
está perto dessa forma. Compradores empurraram, falharam, e o candle fechou perto de onde abriu ou abaixo.

### Marubozu — um lado dominou a janela inteira

Quase nenhum pavio. Exemplo: abre a 23,10, fecha a 23,95, máxima 23,98, mínima 23,08. O corpo é 0,85 de uma
amplitude de 0,90 — 94%. O preço abriu, foi numa direção por um ganho de 3,7%, e nunca devolveu nada. Isso
é convicção unilateral, e é o sinal de candle único mais limpo que existe.

## Padrões de dois e três candles

Padrões de múltiplos candles são mais fortes porque mostram uma *mudança* no equilíbrio, não apenas seu
estado.

**Engolfo de alta (bullish engulfing).** Um candle de baixa abre a 51,40 e fecha a 50,85 (um corpo de
0,55). O candle seguinte abre mais baixo a 50,72 e fecha a 51,63 — um corpo de 0,91 que cobre completamente
o corpo anterior, 1,65× seu tamanho. Vendedores tinham o controle, depois compradores o tomaram e
terminaram acima de onde a venda começou. A versão de baixa espelha exatamente isso.

**Harami.** O arranjo reverso: um candle grande seguido por um pequeno inteiramente dentro do seu corpo.
Um candle verde vai de 128,40 a 132,10 (corpo de 3,70); o seguinte abre a 131,20 e fecha a 130,05 — um
corpo de 1,15, 31% do primeiro, sentado inteiramente dentro dele. Isso não é uma reversão, é uma *pausa*.
O momentum parou. O que vem depois está indefinido.

**Estrela da manhã (morning star).** Três candles. Primeiro, um vermelho decisivo: abre a 78,90, fecha a
75,60. Segundo, um candle pequeno e indeciso perto das mínimas — abre a 75,20, fecha a 75,35, um corpo de
0,15. Terceiro, um candle verde que abre a 75,55 e fecha a 77,80. O ponto médio do corpo do primeiro candle
é 77,25, e o terceiro fechamento empurra acima dele, recuperando 2,20 da queda original de 3,30 — cerca de
dois terços. Venda, pausa, recuperação. A **estrela da noite (evening star)** é a mesma estrutura de três
tempos no topo.

## Por que a localização importa mais que o padrão

Aqui está a parte que separa quem lê gráficos de quem só identifica formas: um candle idêntico significa
coisas diferentes em preços diferentes.

Um hammer que se forma exatamente num nível de preço de onde já saltou três vezes antes é uma rejeição num
lugar que outros traders estão observando. O mesmo hammer no meio do nada é um candle onde alguém comprou
uma queda. O padrão não mudou; a localização mudou. É por isso que
[níveis de suporte e resistência](/blog/support-and-resistance-levels/) valem a pena aprender antes de
decorar um único nome de padrão.

As outras duas peças de contexto que vale a pena checar:

- **Volume.** Um candle de engolfo em três vezes o volume médio recente significa que participação real
  entrou. A mesma forma em volume fraco significa que quase nada aconteceu.
  [Volume de trading](/blog/understanding-trading-volume/) é a checagem de sanidade em todo padrão que você
  encontrar.
- **Tendência.** Padrões de reversão precisam de algo para reverter. Uma estrela da manhã depois de uma
  queda de três dias é um sinal; uma estrela da manhã num range lateral é decoração. Uma
  [média móvel](/blog/moving-averages-ema-vs-sma/) te dá uma leitura rápida e objetiva de em qual regime
  você está.

Confluência é a palavra para o que você está procurando: padrão, localização e participação todos
apontando na mesma direção. Quando só um dos três está presente, você tem uma forma, não um setup.

## Os limites honestos dos padrões de candlestick

Padrões de candlestick têm um poder preditivo modesto por conta própria. Quando pesquisadores os testam
sistematicamente em amostras grandes, as taxas de acerto ficam próximas o suficiente do acaso para que o
padrão sozinho não seja uma vantagem — e qualquer vantagem que apareça tende a encolher assim que você
subtrai spread, comissão e slippage.

Eles falham constantemente. Um engolfo de alta de livro-texto num suporte óbvio resolve para baixo com
frequência suficiente para que, se você não consegue sobreviver a uma sequência deles dando errado, você
não deveria estar operando com eles. Padrões também são retrospectivos por construção: descrevem uma
disputa que já se concluiu. Nada no desenho sabe o que o próximo candle vai fazer.

Para o que eles são genuinamente bons é para *enquadramento*. Um hammer num suporte te dá uma estrutura
definida — um ponto de invalidação logo abaixo da mínima do pavio, um motivo para se interessar, e um lugar
para estar errado rapidamente. Isso vale muito, e é uma coisa diferente de previsão.

## Pratique ler candles um de cada vez

A forma mais rápida de internalizar isso é encontrar candles um de cada vez em vez de estudar um gráfico
que já terminou. O [simulador de gráficos](/pt/chart-simulator/) da Stockade avança por uma sessão gerada
candle por candle no ritmo que você escolher, o que permite parar antes de a próxima barra aparecer, dizer
em voz alta o que você espera que ela seja, e depois avançar um passo para descobrir. Adivinhar antes da
revelação é a parte que te treina; rolar um gráfico já concluído nunca é. Todo preço na Stockade é gerado
algoritmicamente — não são dados reais nem vindos de uma exchange — mas a estrutura OHLC, os pavios, e o
volume se comportam da forma como a estrutura real de gráficos se comporta, que é exatamente o que você
precisa para treinar seu olho. Se você quiser ver uma barra se formar em vez de já chegar pronta, o
[simulador de mercado de ações da Stockade](/pt/simulator/) atualiza continuamente, então o candle mais
recente se estica e se redesenha na sua frente até sua janela se fechar. De qualquer forma, trabalhe com
um instrumento, nomeie todo candle por dez minutos, e note com que frequência a forma da qual você tinha
certeza se resolveu do outro jeito.
