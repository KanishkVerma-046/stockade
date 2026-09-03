---
title: "Trading de Futuros Explicado: Contratos, Margem e Alavancagem"
description: "O que um contrato futuro realmente é, como funcionam tick size e multiplicadores, por que margem é uma caução, e como a alavancagem corta dos dois lados."
date: 2026-07-27
author: "Stockade Team"
tags: ["Futuros", "Gestão de Risco"]
slug: "trading-de-futuros-explicado"
translationOf: "futures-trading-explained"
---

Um trader com $20.000 abre uma conta de futuros, compra um contrato E-mini S&P 500 a 5.248,75, e vê o
índice cair cerca de 2% na sessão seguinte. Ele esperava perder aproximadamente 2% de alguma coisa. O que
ele realmente perdeu foram $5.248,75 — mais de um quarto da conta — porque a posição nunca foi $20.000 de
nada. Eram $262.437,50 de exposição ao índice controlados por um depósito.

Essa diferença entre o que você deposita e o que você controla é todo o assunto de futuros. Tudo o mais —
valores de tick, meses de vencimento, contango — é detalhe em cima disso.

## Um contrato futuro é uma obrigação, não uma fração de propriedade

Quando você compra uma ação, compra um direito fracionário sobre uma empresa. Você é dono de algo. Pode
ir a zero, mas não pode ir abaixo de zero, e ninguém te manda uma conta.

Um contrato futuro é um objeto completamente diferente: um acordo padronizado, negociado em bolsa, para
comprar ou vender uma quantidade específica de algo em uma data e preço específicos. Comprar um contrato
/CL te compromete a receber 1.000 barris de petróleo bruto no vencimento. Vender um te compromete a
entregá-los. Você não é dono de nada nesse meio-tempo — você tem uma obrigação de dois lados, e a
contraparte tem a imagem espelhada.

"Padronizado" é o que faz o mercado funcionar. Todo contrato /CL são 1.000 barris do mesmo grau nos mesmos
termos, então os contratos são intercambiáveis: você sai vendendo um que comprou, não negociando sua saída
de um acordo, e a câmara de compensação fica entre todo comprador e vendedor. Quase ninguém recebe a
entrega — traders de varejo fecham ou rolam antes do vencimento. Mas a obrigação de entrega ancora o preço
ao mercado subjacente, e é por isso que a bolsa exige um depósito antes de deixar você carregar um.

## Especificações do contrato: multiplicador, tick size e valor do tick

Um preço futuro não é um valor em dólares. É um número que você traduz em dólares através do multiplicador
do contrato. A Stockade carrega quatro símbolos de futuros em `/simulator` e `/markets`, e cada um traduz
de forma diferente.

<div class="table-wrap">

| Símbolo | Contrato | Multiplicador | Tick size | Valor do tick | Preço | Nocional |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | $50 por ponto de índice | 0,25 pt | $12,50 | 5.248,75 | $262.437,50 |
| /NQ | E-mini Nasdaq 100 | $20 por ponto de índice | 0,25 pt | $5,00 | 18.421,25 | $368.425,00 |
| /CL | Petróleo Bruto | 1.000 barris | $0,01 | $10,00 | 78,34 | $78.340,00 |
| /GC | Ouro | 100 onças troy | $0,10 | $10,00 | 2.341,40 | $234.140,00 |

</div>

Trabalhe uma linha na mão. /ES a 5.248,75 com um multiplicador de $50 é 5.248,75 × 50 = **$262.437,50** de
exposição nocional por contrato. O incremento mínimo é 0,25 pontos de índice, e 0,25 × 50 = **$12,50** por
tick. Mova dez ticks a seu favor — 2,5 pontos de índice — e você ganhou $125.

Confundir as especificações é caro. /NQ tem ticks no mesmo incremento de 0,25 que /ES, mas com um
multiplicador de $20 cada tick vale $5,00, não $12,50 — e /NQ se move muito mais pontos por dia, então o
valor de tick menor não o torna o menor risco. /CL e /GC compartilham um valor de tick de $10 por rotas
completamente diferentes: um centavo em 1.000 barris, e dez centavos em 100 onças.

Nocional não é o que você pode perder — um contrato não vai a zero mais do que o S&P vai. Mas nocional é
sobre o que seu L/P é calculado, e é o número contra o qual a alavancagem é medida.

## Por que a margem de futuros é uma caução, não um empréstimo

Este é o ponto mais mal-entendido em futuros, e é onde a intuição de ações ativamente te engana.

Em uma conta de margem de ações, margem é dinheiro emprestado. Você deposita $30.000, a corretora te
empresta $30.000, você compra $60.000 em ações, e paga juros. A ação é a garantia. É uma dívida e se
comporta como uma.

Margem de futuros não é um empréstimo. Nada é emprestado e nenhum juro se acumula, porque nada foi
comprado — você entrou em um acordo, não comprou um ativo. A margem que você deposita é uma **caução de
boa-fé**: um depósito de boa-fé mantido pela câmara de compensação para garantir que você consiga cumprir
suas obrigações diárias. É mais parecido com um depósito de segurança do que com uma hipoteca.

Duas consequências decorrem disso. Não há custo de juros em carregar uma posição de futuros. E — a metade
perigosa — o tamanho do depósito não tem relação com o tamanho da sua obrigação. Uma caução é dimensionada
para cobrir aproximadamente o movimento adverso plausível de um dia, não o valor do contrato. É exatamente
por isso que a alavancagem é tão alta.

## Margem inicial, margem de manutenção, e ajuste diário ao mercado

Dois limiares governam a conta, e não são o mesmo número. **Margem inicial** é o que você precisa ter
disponível para abrir uma posição. **Margem de manutenção** é o piso mais baixo que seu capital precisa
ficar acima para manter a posição aberta. Cair abaixo da manutenção e você recebe uma chamada de margem, e
precisa restaurar a conta — tipicamente de volta à exigência inicial, não apenas de volta à manutenção.

Entre elas fica o **ajuste diário ao mercado**. Posições de futuros são liquidadas todo santo dia: ganhos
creditados em dinheiro, perdas debitadas, toda sessão, esteja ou não a operação fechada. Não existe uma
perda não realizada de futuros ficando quieta nos registros.

Todos os números de margem abaixo são **apenas ilustrativos** — bolsas e corretoras os definem, eles
variam por corretora, e sobem quando a volatilidade sobe. Nunca trate um número de um artigo como atual.

Digamos que a margem inicial de /ES seja $13.000 e a de manutenção $11.800. Você deposita $20.000 e compra
um contrato a 5.248,75.

- **Dia 1:** o preço cai para 5.180,00 — 68,75 pontos × $50 = **−$3.437,50**, debitados naquela noite.
  Capital: $16.562,50. Acima da manutenção, nenhuma ação.
- **Dia 2:** o preço cai para 5.080,00 — 168,75 pontos × $50 = **−$8.437,50** acumulados. Capital:
  $11.562,50, abaixo do piso de $11.800.
- **A chamada:** restaurar o capital para a exigência inicial de $13.000. Você transfere **$1.437,50** ou a
  corretora liquida por você.

Duas sessões comuns. Um movimento de 3,2% no índice. Uma chamada de margem.

## A aritmética da alavancagem: o que um movimento de 2% faz ao capital depositado

Divida o nocional pelo depósito e você tem o índice de alavancagem. $262.437,50 ÷ $13.000 ≈ **20:1**. Você
está controlando aproximadamente vinte dólares de índice para cada dólar depositado.

Agora faça a conta que importa:

- Movimento adverso de 2% no nocional de /ES: 262.437,50 × 0,02 = **$5.248,75**
- Como fração de um depósito de margem de $13.000: 5.248,75 ÷ 13.000 = **40,4%**

Um movimento de 2% no subjacente apaga 40% do capital que você depositou. O S&P 500 tem dias de 2% várias
vezes num ano médio. Essa assimetria — movimento pequeno, dano proporcional enorme — é a coisa mais
importante desta página, e é por isso que a
[aritmética da regra de 1% e do dimensionamento de posição](/blog/risk-management-position-sizing) não são
opcionais em futuros. Também significa que
[colocar o stop-loss](/blog/stop-loss-orders-explained) tem que vir antes da entrada, não depois. Em ações,
um stop esquecido é uma operação ruim. A 20:1, é um evento de solvência.

## Vencimento, rolagem, e contango em futuros de commodities

Todo contrato futuro morre numa data programada. /ES vence trimestralmente — março, junho, setembro,
dezembro. Petróleo bruto vence mensalmente. Para manter exposição além do vencimento você precisa
**rolar**: fechar o contrato que está vencendo e abrir o do mês seguinte, geralmente na semana ou duas
antes do vencimento conforme a liquidez migra para frente.

Os dois meses não operam ao mesmo preço. Quando o contrato de data mais distante é mais caro que o mais
próximo — frequentemente porque armazenar petróleo físico custa dinheiro — o mercado está em **contango**.
Quando é mais barato, tipicamente quando uma escassez agora faz compradores pagarem mais por barris
imediatos, está em **backwardation**.

Contango é um custo real para quem está comprado. Se o /CL do mês corrente está a 78,34 e o mês seguinte a
78,95, rolar um contrato comprado significa vender barato e comprar caro: 0,61 × 1.000 barris = **$610**
por rolagem. Role mensalmente por um ano num mercado persistentemente em contango e o arrasto se acumula
mesmo que o petróleo termine o ano inalterado. É por isso que posições em commodities mantidas por muitas
rolagens frequentemente ficam atrás do preço à vista que acompanham.

## Contratos micro como o ponto de entrada realista para contas pequenas

Contratos micro são um décimo do seu contrato E-mini pai, e para a maioria das contas de varejo são o
único tamanho de entrada defensável. /MES é 1/10 de /ES: **$5 por ponto de índice**, valor de tick 0,25 ×
5 = **$1,25**, nocional a 5.248,75 de 5.248,75 × 5 = **$26.243,75**. /MNQ é 1/10 de /NQ a $2 por ponto.

A diferença para uma conta pequena não é cosmética. Numa conta de $5.000 com um stop 10 pontos de índice
de distância:

- **1 contrato /ES:** 10 × $50 = **$500** em risco — **10%** da conta em uma operação.
- **1 contrato /MES:** 10 × $5 = **$50** em risco — **1%** da conta.

A versão /MES é uma operação normal. A versão /ES é uma aposta que nenhuma quantidade de convicção
justifica. Micros também permitem escalar em décimos em vez de encarar uma decisão de tudo ou nada — o
mesmo argumento de granularidade que torna
[o dimensionamento em forex](/blog/forex-trading-for-beginners) viável com mini e micro lotes.

## O que os símbolos de futuros da Stockade podem e não podem te ensinar

Seja claro sobre o limite. Os /ES, /NQ, /CL e /GC da Stockade carregam nomes do mundo real, mas os preços
por trás deles são gerados no lado do cliente por um passeio aleatório — nenhum feed de bolsa, nenhum dado
de mercado, nenhum arquivo histórico em lugar nenhum do produto. Os símbolos são rótulos em séries
sintéticas.

O simulador também não modela a mecânica de futuros. O L/P é calculado por unidade de quantidade,
exatamente como para uma ação: nenhum multiplicador de contrato, nenhuma margem inicial ou de manutenção,
nenhum débito de ajuste diário, nenhuma chamada de margem, nenhum vencimento ou rolagem. Operar 1 unidade
de /ES ali não é operar um contrato que vale $262.437,50, e nada no site jamais vai exigir uma
transferência bancária.

Para o que é útil é ensaiar o *processo* contra ação de preço com formato de futuros: definir um stop
antes da entrada com os atalhos B/S/F, fazer a aritmética do multiplicador no papel junto de uma posição
aberta, revisar os resultados em `/analytics`. E a limitação usual se aplica com mais força aqui — um
simulador remove o peso emocional do dinheiro real, e futuros reais podem te entregar uma perda maior do
que a margem que você depositou se o mercado der um gap através do seu stop durante a noite.

## Pratique a mecânica de futuros no simulador

Abra /ES no simulador e, antes de enviar qualquer ordem, escreva o multiplicador, o valor do tick, e o
nocional no preço atual. Depois abra uma posição e traduza todo movimento em dólares de contrato de
cabeça — 2,5 pontos são $125, dez pontos são $500 — até que a conversão seja automática. Faça o mesmo em
/CL, onde um centavo são $10, para que o reflexo se transfira em vez de ficar preso a um único símbolo.
Depois faça a checagem de alavancagem: a 20:1, o quanto esse mercado pode se mover antes que 40% de um
depósito se vá?

Comece no [simulador de paper trading da Stockade](/pt/simulator/) com essa aritmética escrita, não
estimada.
