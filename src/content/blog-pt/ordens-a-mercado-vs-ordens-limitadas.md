---
title: "Ordens a Mercado vs Ordens Limitadas: Quando Usar Cada Uma"
description: "Uma ordem a mercado garante execução mas não preço. Uma ordem limitada garante preço mas não execução. Toda outra consideração decorre disso."
date: 2026-05-11
author: "Stockade Team"
tags: ["Tipos de Ordens", "Fundamentos"]
slug: "ordens-a-mercado-vs-ordens-limitadas"
translationOf: "market-orders-vs-limit-orders"
---

Você fez o trabalho. Tinha a operação inteira mapeada: entrar a 24,80, stop a 24,40, alvo a 25,60.
Quarenta centavos de risco por oitenta centavos de recompensa — uma operação 2:1. Depois você clicou em
comprar a mercado em 400 ações de um papel pouco negociado, e a confirmação voltou em **25,20**.

Nada no gráfico mudou naquele segundo. Sua operação mudou completamente. A partir de 25,20 seu stop está a
80 centavos de distância e seu alvo a 40 centavos: você está arriscando 80 para ganhar 40, o inverso exato
da operação que você planejou, e a diferença de 40 centavos custou $160 em 400 ações antes de a posição ter
um segundo de vida.

Aquele único clique é a diferença entre os dois tipos de ordem que toda plataforma coloca na sua frente.

## A Stockade não consegue reproduzir o problema que este artigo descreve

Isso vai logo no início, não numa nota de rodapé.

As execuções da Stockade carregam quase nenhum atrito. Não há spread entre compra e venda, nenhuma
execução parcial, e nenhum livro de ordens no simulador de paper trading da Stockade. Uma ordem a mercado é
executada exatamente no preço da tela. Uma ordem limitada é executada imediatamente no preço que você
digitar na caixa — ela não espera o mercado alcançar seu nível, não entra em fila, e nunca fica sem
execução. A única exceção é uma saída de stop-loss ou take-profit: essas são checadas contra um novo preço
a cada 800 milissegundos e registradas no tick que cruzou seu nível, então elas são executadas um pouco
além dele em vez de exatamente nele. Todos os preços na Stockade são gerados no seu navegador, então não há
ambiente nem contraparte com quem negociar.

Você ainda pode praticar a **mecânica**: escolher um tipo de ordem antes de clicar, decidir um preço
limitado com antecedência em vez de improvisar, anexar um stop-loss e um take-profit a uma entrada. Esses
hábitos se transferem.

O **custo** não se transfere. Se você faz paper trading de uma estratégia que rende 8 centavos por ação e
ela parece lucrativa aqui, essa mesma estratégia pode ficar no zero a zero ou negativa quando um spread
real de 4 centavos e slippage ocasional tirarem sua parte. Nunca leia uma execução simulada como uma
previsão de uma real.

## O que cada tipo de ordem realmente instrui sua corretora a fazer

Cada ordem é uma frase de instrução.

Uma **ordem a mercado** diz: *execute isso imediatamente no melhor preço disponível agora, seja lá qual
for.* Você especificou quantidade e direção. Você não especificou preço, e abriu mão de qualquer direito
sobre ele.

Uma **ordem limitada** diz: *execute isso apenas no meu preço ou melhor, e se não puder, não execute.* "Ou
melhor" significa mais baixo para uma compra e mais alto para uma venda — uma compra limitada a 187,30
felizmente será executada a 187,25, nunca a 187,35. Você especificou preço. Você não especificou que algo
vai acontecer de fato.

<div class="table-wrap">

| | Ordem a mercado | Ordem limitada |
|---|---|---|
| Garante | Execução | Preço |
| Não garante | Preço | Execução |
| Uso típico | Sair, urgência | Entrar, paciência |
| Risco que você aceita | Pagar mais do que viu | Perder a operação completamente |

</div>

## O trade-off do qual tudo o mais decorre

Aqui está a frase para memorizar: **uma ordem a mercado garante execução mas não preço; uma ordem limitada
garante preço mas não execução.**

Toda outra consideração abaixo é consequência dessa única linha. Ordem a mercado para sair de uma perda?
Sim — você se importa mais em sair do que com os últimos centavos, e execução é o que uma ordem a mercado
garante. Ordem limitada para entrar num instrumento de spread largo? Sim — preço é o que está em risco ali.

Quando você estiver em dúvida, pergunte com qual falha você preferiria conviver: ser executado a um preço
pior do que queria, ou não ser executado de forma alguma. A resposta nomeia seu tipo de ordem.

## O spread entre compra e venda, e por que uma ordem a mercado te custa na entrada

Nunca há um único preço. Sempre há dois. O **bid** é o preço mais alto que alguém está disposto a pagar
agora; o **ask** é o preço mais baixo que alguém está disposto a vender agora. Digamos que o bid seja
187,38 e o ask seja 187,42. O **spread** é 187,42 − 187,38 = **0,04**, e o **ponto médio** — o número único
mais justo para chamar de "o preço" — é 187,40.

Compre 500 ações a mercado. Uma compra pega o ask, então você paga 187,42 × 500 = **$93.710**. No ponto
médio você teria pago 187,40 × 500 = $93.700. Você está $10 atrás no instante em que é executado, com o
preço parado.

Isso é só metade da história, porque você também precisa sair. Vender a mercado atinge o bid a 187,38,
então uma ida e volta — comprar no ask, vender no bid, mercado perfeitamente parado — custa o spread
inteiro: 0,04 × 500 = **$20**.

Vinte dólares numa posição de $93.700 são cerca de 2 pontos-base e soam triviais. Não são, uma vez que você
multiplica. Três idas e voltas por dia por 250 dias de pregão são 750 idas e voltas; a $20 cada, isso são
**$15.000** por ano só em spread, antes de comissões e antes de uma única operação perdedora.

É pior em instrumentos pouco líquidos. Se um papel fino mostra um bid de 42,10 e um ask de 42,35, o spread
é 0,25 — num ponto médio de 42,225 isso é 0,59%, aproximadamente 28 vezes o custo relativo acima. Uma ida e
volta de 200 ações ali custa 0,25 × 200 = $50, e a ação precisa se mover um quarto de ponto a seu favor
antes de você voltar ao zero a zero.

## Slippage, e as condições que o pioram

Slippage é a diferença entre o preço que você viu quando clicou e o preço que você recebeu. O spread é a
parte previsível; slippage é o resto. Ele piora sob três condições, que frequentemente chegam juntas:

- **Mercados rápidos.** Durante uma divulgação de resultados ou um dado econômico, cotações se atualizam
  mais rápido do que seu clique viaja. O ask que você mirou pode não existir mais quando sua ordem chega.
- **Livros de ordens finos.** Uma cotação mostra um preço, mas só para um certo tamanho. Se apenas 200
  ações são oferecidas a 42,35 e você compra 1.000, as outras 800 são executadas contra o que estiver
  acima — 42,40, 42,55, e assim por diante. Sua execução média fica pior que o ask que você viu.
- **Tamanho grande.** Sua própria ordem é a coisa que move o preço. Mesmo mecanismo de um livro fino,
  chegando pelo outro lado.

O exemplo de abertura foi os três de uma vez: um livro fino, um tamanho que o consumiu, e uma cotação em
movimento. Uma ordem limitada teria recusado essa execução.

## Ordens limitadas executáveis: o meio-termo prático

Você não está preso escolhendo entre "qualquer preço" e "meu preço ou nada." Uma ordem limitada precificada
onde o mercado já pode alcançá-la se chama **ordem limitada executável (marketable limit order)**, e é o
que traders experientes usam na maior parte do tempo.

Com o bid em 187,38 e o ask em 187,42, coloque uma compra limitada a **187,45**. Como ela fica acima do ask
atual, é executada imediatamente como uma ordem a mercado — mas se recusa a ser executada acima de 187,45.
Se o livro está fino e o preço corre, seu pior caso é limitado em vez de ilimitado. Contra o ponto médio de
187,40, esse pior caso custa 0,05 × 500 = **$25**, contra $10 no ask, contra os $200 que um deslize de 40
centavos teria tomado.

Você troca uma pequena quantidade de certeza de execução por um teto rígido no desastre. Geralmente essa é
a troca certa.

## Quando uma ordem a mercado é genuinamente a escolha certa

Há uma situação em que uma ordem a mercado não é apenas aceitável, mas correta: **sair de uma posição que
está indo contra você.**

Se seu nível de stop foi rompido e você precisa zerar, certeza de execução é o ponto principal. Uma saída
limitada no seu preço ideal pode ficar sem execução enquanto a perda aumenta, e uma perda pequena que não é
executada vira uma perda grande que eventualmente é. A alternativa a pagar alguns centavos a mais não é
"uma execução melhor", é "ainda segurando." É por isso que
[ordens stop-loss](/blog/stop-loss-orders-explained/) tipicamente disparam uma ordem a mercado assim que o
preço de stop é negociado.

A mesma lógica cobre qualquer urgência real: fechar antes de um anúncio programado, sair quando sua tese
quebrou, zerar no fim da sua sessão. Quando você precisa sair, saia.

## Quando uma ordem limitada é a escolha certa

Quase em todo outro lugar.

**Entradas.** Nada te obriga a entrar numa operação. Se seu plano diz 24,80, coloque uma limitada a 24,80 e
deixe o mercado vir até você. Uma entrada que você persegue já se moveu contra seu plano.

**Instrumentos pouco líquidos.** Onde o spread é 0,25 em vez de 0,04, uma ordem a mercado entrega dinheiro
real dos dois lados da operação.

**Escalonamento paciente.** Se você quer 900 ações, empilhe limitadas em três níveis — 300 a 24,80, 300 a
24,65, 300 a 24,50 — e aceite que talvez consiga só parte. Isso interage diretamente com seu
[dimensionamento de posição](/blog/risk-management-position-sizing/): uma entrada parcialmente executada é
uma posição menor, e seu cálculo de risco deve refletir o tamanho que você realmente conseguiu.

**Saídas num alvo.** Um alvo de lucro não é urgente por definição, então uma limitada no seu preço é
exatamente certo. Combinar uma saída limitada de take-profit com uma saída de stop-loss é a estrutura por
trás das [ordens OCO e bracket](/blog/oco-and-bracket-orders/).

## A ordem limitada que nunca é executada tem seu próprio custo

Uma ordem limitada que erra não é grátis, e iniciantes sistematicamente subestimam isso.

Volte à cotação 187,38 / 187,42. O ask parece caro, então você coloca uma compra limitada a 187,30 — doze
centavos abaixo do ask, valendo 0,12 × 500 = $60 se for executada. Não é executada. O preço nunca cai até o
seu nível e corre até 191,00. O movimento que você identificou corretamente foi 191,00 − 187,42 = 3,58 por
ação, ou **$1.790** em 500 ações. Você protegeu $60 e desistiu de $1.790.

Isso não é um argumento contra ordens limitadas. É um argumento contra precificá-las gananciosamente.
Defina o limite onde você realmente quer a operação, não alguns centavos melhor para se sentir esperto. Um
ganho perdido não deixa registro no seu diário de operações, que é exatamente por que é tão fácil de
ignorar.

## Pratique a decisão no simulador

As execuções da Stockade são perfeitas, então você não pode praticar pagar um spread ali — mas você pode
praticar a decisão que determina se você paga um. Abra o
[simulador gratuito de mercado de ações da Stockade](/pt/simulator/), mude o ticket de ordem de mercado
para limitada antes de cada entrada, e anote o preço limitado que você usaria contra um livro real. Depois
reserve ordens a mercado para zerar — a tecla F existe exatamente para isso. Leve esse reflexo para uma
plataforma real e o spread será a única coisa nova para aprender.
