---
title: "O Que São Ordens OCO e Bracket e Como Funcionam"
description: "Como ordens OCO e bracket ligam um stop e um alvo para que executar um cancele o outro, além dos erros de quantidade que iniciantes cometem."
date: 2026-05-25
author: "Stockade Team"
tags: ["Tipos de Ordens"]
slug: "ordens-oco-e-bracket"
translationOf: "oco-and-bracket-orders"
---

Você compra 500 ações. O preço sobe um pouco, depois desce um pouco, depois sobe de novo. Agora você está
decidindo em tempo real, com dinheiro em jogo, se isso é o topo ou o começo de algo — e a versão de você
tomando essa decisão não é a versão calma que encontrou o setup.

Ordens OCO e bracket existem para tirar essa decisão das suas mãos. Não para torná-la melhor, para torná-la
*mais cedo*. Este artigo é sobre a mecânica: o que se liga ao quê, o que cancela o quê, o que acontece com
as quantidades, e as formas específicas como o setup quebra.

## O que é uma ordem OCO: duas ordens em espera onde executar uma mata a outra

OCO significa **one-cancels-other** (uma cancela a outra). Não é um novo tipo de ordem. É um *link*
colocado entre duas ordens comuns que você já entende.

Você envia duas ordens ao mesmo tempo. Ambas ficam na corretora, não executadas, esperando. No momento em
que uma delas é executada, a corretora cancela a outra automaticamente. Você nunca fica com as duas.

Essa última frase é a funcionalidade inteira. Sem o link você tem duas ordens vivas, e se o preço passar
pelos dois níveis você recebe duas execuções — o que, para uma única posição, significa que você sai uma
vez e depois acidentalmente entra numa posição totalmente nova na direção oposta. O link OCO é o que faz
"um ou outro" significar de fato um ou outro.

O par OCO mais comum é um stop abaixo da sua posição e uma limitada acima dela: uma **ordem stop** que vira
uma venda se o preço cair até o seu teto de perda, e uma **ordem limitada** que vende se o preço subir até
o seu alvo de lucro. O preço só pode alcançar uma delas primeiro. Qualquer que chegue lá primeiro vence, a
posição fecha, e a sobrevivente é cancelada.

Para a lógica de *onde* o stop pertence — estrutura, volatilidade, por que um número redondo é uma escolha
ruim — veja [ordens stop-loss explicadas](/blog/stop-loss-orders-explained/). Este artigo assume que você já
escolheu os níveis e se importa apenas com como eles são conectados.

## O que uma ordem bracket adiciona: uma entrada com o par de saída anexado

Uma **ordem bracket** são três ordens enviadas como um único pacote:

1. Uma ordem de **entrada** (a mercado ou limitada) que abre a posição.
2. Um **stop de proteção** que a fecha com perda.
3. Um **alvo de lucro** que a fecha com ganho.

As ordens 2 e 3 são um par OCO entre si. Elas também são *condicionais à ordem 1* — não entram em vigor até
a entrada realmente ser executada. Envie um bracket com uma entrada limitada que nunca é executada e nada
acontece; o stop e o alvo ficam adormecidos e eventualmente expiram junto com a entrada.

Então a sequência é: entrada é executada → stop e alvo ambos ativam → um deles é executado → o outro é
cancelado → você está zerado. Três ordens, uma ida e volta, zero decisões depois do primeiro clique.

A palavra "bracket" é literal. Seu preço de entrada fica dentro de um colchete, com um piso abaixo e um
teto acima, e a operação termina no momento em que toca em qualquer um dos dois.

## Um bracket trabalhado: 500 ações compradas a 187,40

Suponha que você compra 500 ações a 187,40, stop a 185,90, alvo a 190,40.

<div class="table-wrap">

| Perna | Preço | Distância da entrada | Por ação | Total em 500 ações |
|---|---|---|---|---|
| Entrada (compra) | 187,40 | — | — | $93.700 de valor da posição |
| Stop (venda) | 185,90 | 1,50 abaixo | −1,50 | −$750 |
| Alvo (venda) | 190,40 | 3,00 acima | +3,00 | +$1.500 |

</div>

Confira a aritmética. O risco por ação é 187,40 − 185,90 = 1,50, então 500 × 1,50 = **$750 em risco**. A
recompensa por ação é 190,40 − 187,40 = 3,00, então 500 × 3,00 = **$1.500 almejados**. Recompensa dividida
por risco é 3,00 ÷ 1,50 = 2, uma **relação recompensa-risco de 2:1**.

**Essa relação fica fixa no instante em que você envia o bracket.** Você não descobre sua relação
recompensa-risco depois olhando o resultado — você a escolheu quando digitou três números numa caixa.

**E um bracket de 2:1 precisa de uma taxa de acerto acima de 33,3% só para empatar.** Dez operações nesse
tamanho: quatro vencedoras produzem 4 × $1.500 = $6.000, seis perdedoras produzem 6 × $750 = $4.500,
líquido +$1.500 numa taxa de acerto de 40%. Caia para três vencedoras e são $4.500 ganhos contra $5.250
perdidos — negativo a 30%. A relação não te torna lucrativo; ela define a barra que você ainda precisa
superar.

Numa conta de $100.000, esse $750 é 0,75% do capital — dentro do teto comum de 1% descrito em
[dimensionamento de posição e a regra de 1%](/blog/risk-management-position-sizing/). Note que a posição
vale $93.700, aproximadamente 94% da conta, enquanto o valor genuinamente em risco é $750. Tamanho de
posição e tamanho de risco são números diferentes, e o stop é o que os separa.

## Por que colocar o bracket antes da entrada é todo o ponto psicológico

Aqui está a parte que importa mais que qualquer mecânica.

Quando você anexa o stop e o alvo *antes* de a entrada ser executada, você toma a decisão de saída no único
momento em que não tem posição, não tem L/P não realizado, e não tem ego na operação. Você está olhando um
gráfico e perguntando "onde eu estaria errado, e onde eu realizaria o lucro?" Essas são perguntas
analíticas.

Uma vez que a posição existe, as mesmas duas perguntas viram emocionais. "Onde eu estaria errado" vira
"quanto mais eu aguento ver isso cair." "Onde eu realizaria o lucro" vira "e se continuar subindo." Traders
que definem saídas depois de entrar rotineiramente alargam o stop, porque alargá-lo faz a dor atual
desaparecer, e apertam o alvo, porque guardar algo pequeno parece mais seguro do que esperar.

Um bracket não te torna disciplinado. Ele move a decisão para o momento em que a disciplina é barata. Seja
honesto consigo mesmo, porém: nada te impede de cancelar e reenviar as ordens no meio da operação, e
iniciantes fazem exatamente isso.

## Erros de bracket que iniciantes cometem

### Descompasso de quantidade depois de uma execução parcial

Você envia um bracket para 500 ações. Num mercado real, só 300 são executadas antes de o preço se afastar.
Seu stop e alvo, se foram dimensionados para 500, agora cobrem 200 ações que você não tem.

Se o stop então dispara, uma venda de 500 ações contra uma compra de 300 fecha sua posição *e abre uma
venda a descoberto de 200 ações* — uma posição que você nunca pretendeu, agora desprotegida, porque o
bracket já cumpriu seu papel e cancelou o alvo. Algumas corretoras ajustam automaticamente as quantidades
do bracket para o valor executado; outras não. Você precisa saber qual tipo está usando antes que isso
importe, não depois.

### Esquecer que as ordens sobrevivem à sua tela

Ordens em espera vivem na corretora, não no seu navegador. Feche a plataforma, desligue o notebook, vá
dormir — o stop e o alvo continuam funcionando. Esse é o objetivo, mas também significa que um bracket que
você configurou e esqueceu é uma instrução viva que pode ser executada enquanto você dorme ou está numa
reunião. Todo bracket não gerenciado é uma decisão que seu eu passado tomou em seu nome.

### Brackets nos dois lados de um range

Um setup comum: o preço está preso entre dois níveis, então você coloca um bracket de compra-stop acima da
resistência e um bracket de venda-stop abaixo do suporte, planejando pegar para qual lado ele romper.

A armadilha é que essas duas *entradas* não estão ligadas uma à outra a menos que você explicitamente as
torne um par OCO. Se elas não estão ligadas e o preço fura acima da resistência, executa sua compra,
reverte, depois rompe abaixo do suporte, você também é executado na venda — virado de comprado para vendido
no pior ponto do whipsaw. Ligue as entradas como um OCO e a entrada do lado de baixo morre no momento em
que a de cima é executada.

## O que uma ordem bracket não consegue fazer

Um bracket é uma máquina, e máquinas não leem gráficos.

**Ele não consegue se adaptar a novas informações.** Se o setup muda de forma — o movimento estagna, o
volume seca, o nível contra o qual você operava para de segurar — seu bracket não se importa. Ele fica nos
dois preços que você escolheu vinte minutos atrás e espera.

**Um alvo mecânico pode ficar em algum lugar que o gráfico nunca justificou.** Defina todo alvo em
exatamente 2R porque 2R soa profissional e às vezes você vai estacionar uma ordem limitada num espaço morto
logo depois de uma prateleira de resistência óbvia, e depois vai ver o preço virar 20 centavos antes de
chegar lá. A relação deveria ser um resultado de onde estão os níveis de saída sensatos, não uma entrada
que o gráfico é forçado a acomodar. Um bracket de 2:1 só é bom se o mercado plausivelmente oferece aqueles
3,00 de alta antes dos 1,50 de baixa.

**E ele não garante o preço que você digitou.** Em mercados reais um stop vira uma ordem a mercado quando
disparado, e ordens a mercado são executadas no que estiver disponível, o que pode ser pior que seu nível
de stop — veja [ordens a mercado vs ordens limitadas](/blog/market-orders-vs-limit-orders/) para entender
por que essa distinção morde. Seu risco de $750 é uma estimativa, não uma garantia.

## Pratique isso no simulador

O painel de ordens `/simulator` da Stockade tem campos opcionais de **Stop Loss** e **Take Profit** logo
abaixo da quantidade, e eles se comportam como um par OCO: qualquer nível que o preço simulado alcançar
primeiro fecha sua posição inteira e limpa os dois campos de uma vez. Preencha os três números antes de
apertar B, depois deliberadamente não toque mais no painel e observe qual lado é atingido.

Uma ressalva honesta, porque muda o que você pode aprender aqui. As execuções da Stockade carregam muito
menos atrito que as reais — sem spread entre compra e venda, sem execuções parciais — mas não são
literalmente sem atrito. O simulador checa seus níveis contra um novo preço a cada 800 milissegundos, e
registra a saída no tick que *cruzou* o nível em vez de no nível em si, então um stop ou alvo cai alguns
centavos além de onde você o definiu. A ausência de execuções parciais é a parte que importa aqui: significa
que o problema de descompasso de quantidade descrito acima **não pode acontecer no simulador**, então é o
único modo de falha de bracket sobre o qual você precisa aprender em vez de experimentar. Tudo o mais —
comprometer-se antecipadamente com uma relação, resistir ao impulso de alargar o stop, descobrir com que
frequência um alvo de 2:1 erra por alguns centavos — está totalmente disponível.

Rode vinte operações com bracket onde você define os níveis primeiro e nunca os ajusta, depois confira seus
resultados realizados no [simulador de paper trading da Stockade](/pt/simulator/) e veja qual precisaria
ser sua taxa de acerto real.
