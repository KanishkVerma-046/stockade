---
title: "Introdução ao Trading de Forex: Pares de Moedas e Pips Explicados"
description: "Um par de moedas significa estar comprado em uma moeda e vendido em outra. Como ler uma cotação, o que é um pip, por que pares de JPY diferem, e a alavancagem."
date: 2026-07-13
author: "Stockade Team"
tags: ["Forex", "Fundamentos"]
slug: "trading-de-forex-para-iniciantes"
translationOf: "forex-trading-for-beginners"
---

Você abre uma plataforma de forex pela primeira vez e a cotação mostra EUR/USD 1,0872. Sem símbolo de
dólar, quatro casas decimais, e o botão de compra pede lotes em vez de ações. Depois USD/JPY mostra 157,42,
com duas casas decimais, e alguém te diz que um movimento de 20 pips em ambos os pares é do mesmo tamanho
— embora em um pareça 0,0020 e no outro 0,20.

A confusão é rasa. Forex tem três convenções que tropeçam todo trader de ações — o que um par realmente é,
o que é um pip, e quão grande é um lote. Uma vez que essas fixam, o resto se lê normalmente.

## Toda operação de forex é comprada em uma moeda e vendida em outra

Este é o obstáculo conceitual. Compre uma ação e uma coisa acontece: você é dono de ações. Compre EUR/USD e
duas coisas acontecem ao mesmo tempo — você fica **comprado no euro** e **vendido no dólar americano**, na
mesma operação, no mesmo instante. Você não consegue fazer uma sem a outra, porque uma moeda não tem preço
exceto em termos de outra moeda. Não existe um "preço absoluto do euro" da forma que existe um preço
absoluto de uma ação.

Isso reenquadra o gráfico. EUR/USD subindo não significa que o euro está forte; significa que o euro está
forte *em relação ao dólar* — o que poderia igualmente ser o dólar enfraquecendo enquanto o euro não faz
nada.

A primeira moeda no par é a **base**, a segunda é a **cotação**. O número é sempre: quantas unidades da
moeda de cotação compram uma unidade da base.

- **EUR/USD 1,0872** — um euro custa 1,0872 dólares americanos.
- **USD/JPY 157,42** — um dólar americano custa 157,42 ienes.

Note que o dólar fica em lados opostos nesses dois pares. Compre EUR/USD *e* compre USD/JPY e você está
vendido em dólares em uma operação e comprado em dólares na outra, cancelando parcialmente sua própria
posição sem querer. Pela mesma razão não existe restrição de venda a descoberto em forex: uma venda é só
uma compra da outra moeda, nada é emprestado, e não há regra de uptick.

## O que é um pip, e por que pares de JPY usam a segunda casa decimal

Um **pip** — "percentage in point" — é o incremento padrão em que traders cotam um movimento. Para quase
todo par é a **quarta casa decimal**, 0,0001. Em EUR/USD, um movimento de **1,0872 para 1,0892** é 0,0020,
que são **20 pips**.

Onde o iene é a moeda de cotação, o pip é a **segunda casa decimal**, 0,01. Em USD/JPY, um movimento de
**157,42 para 157,62** é 0,20, que também são **20 pips**.

Essa exceção é onde iniciantes perdem o fio, e não é arbitrária. A convenção mantém um pip com um tamanho
*relativo* aproximadamente igual entre pares:

- EUR/USD: 0,0001 ÷ 1,0872 = **0,0092%** do preço
- USD/JPY: 0,01 ÷ 157,42 = **0,0064%** do preço

Mesma ordem de grandeza, então 50 pips significa algo comparável em ambos. Agora suponha que o iene usasse
a quarta casa decimal: 0,0001 ÷ 157,42 = **0,0000635%**, cerca de 145 vezes menor, e um dia comum de 0,8%
em USD/JPY apareceria como aproximadamente 12.600 pips. A convenção de duas casas decimais mantém as
cotações de iene na mesma faixa numérica que tudo o mais.

Mais uma nuance: a maioria das corretoras mostra um dígito extra, um **pip fracionário** valendo um décimo
de pip — EUR/USD como 1,08725, USD/JPY como 157,425. Ler esse último dígito como um pip infla toda
distância que você mede em 10×.

## O valor do pip depende do tamanho do lote e da moeda de cotação

Um pip é uma distância. O que ele *vale* depende de quantas unidades você tem. Forex opera em **lotes**
padronizados: um **lote padrão** é 100.000 unidades da moeda base, um **mini lote** é 10.000, e um **micro
lote** é 1.000.

O valor do pip é unidades × tamanho do pip, expresso na moeda de **cotação**. Um lote padrão de EUR/USD:
100.000 × 0,0001 = **10 USD por pip**. A moeda de cotação já é o dólar, então isso é exatamente $10 sem
conversão, e o movimento de 20 pips de 1,0872 para 1,0892 é 20 × $10 = **$200**. Qualquer par cotado em
USD, GBP/USD incluído, é um limpo $10 por pip por lote padrão.

USD/JPY não é. Sua moeda de cotação é o iene, então um lote padrão rende 100.000 × 0,01 = **¥1.000 por
pip**, e chegar a dólares significa dividir pela taxa atual: 1.000 ÷ 157,42 = **$6,35 por pip**. O mesmo
movimento de 20 pips é ¥20.000, ou 20.000 ÷ 157,42 = **$127,05** — não $200. Dimensionar uma operação em
iene como se pips valessem $10 deixa você arriscando 36% menos do que pretendia.

<div class="table-wrap">

| Lote | Unidades | Valor do pip EUR/USD | Valor do pip USD/JPY (a 157,42) |
|---|---|---|---|
| Padrão | 100.000 | $10,00 | ¥1.000 = $6,35 |
| Mini | 10.000 | $1,00 | ¥100 = $0,64 |
| Micro | 1.000 | $0,10 | ¥10 = $0,06 |

</div>

Lotes pequenos são o que torna o dimensionamento em forex viável em uma conta pequena. Com $5.000 e 1% de
risco por operação — $50 — em um setup de EUR/USD com stop de 25 pips, você precisa de um valor de pip de
50 ÷ 25 = **$2,00**, que são 2 mini lotes, ou 20.000 unidades. Valor nocional: 20.000 × 1,0872 =
**$21.744**. Quatro vezes sua conta controlados com $50 em risco. A
[fórmula de dimensionamento de posição](/blog/risk-management-position-sizing) funciona de forma idêntica
aqui; só a unidade muda de risco-por-ação para risco-por-pip.

## O spread é o principal custo que você paga no forex de varejo

A maioria das corretoras de forex de varejo não cobra comissão. Elas são pagas através do **spread** — a
diferença entre o preço em que você pode vender (bid) e o preço em que você pode comprar (ask).

Se EUR/USD está cotado 1,0871 / 1,0873, o spread é 2 pips. Você compra a 1,0873 e a plataforma marca sua
posição no bid, 1,0871, então você abre **2 pips negativo** — $20 em um lote padrão, antes de o mercado ter
feito qualquer coisa.

Isso soa trivial até você multiplicar pela frequência. Dez idas e voltas por dia em um lote padrão com
spread de 1 pip é $10 × 10 = $100 por dia, e em 250 dias de pregão, **$25.000** só em spread. Spreads
também se alargam bruscamente perto de divulgações econômicas e nas horas mais fracas depois do fechamento
de Nova York.

## A alavancagem em forex é muito maior que a alavancagem em ações, e esse é o perigo

Um lote padrão de EUR/USD a 1,0872 são $108.720 em moeda. Ninguém deposita isso; corretoras exigem um
depósito de margem em vez disso, e as exigências de forex são extremas para os padrões de ações. Uma conta
de ações dos EUA te dá 2:1 overnight, enquanto a alavancagem regulada de forex roda em 30:1 na UE e no
Reino Unido e 50:1 nos EUA em pares majors — e corretoras offshore anunciam 500:1 e mais.

<div class="table-wrap">

| Alavancagem | Margem para 1 lote padrão de EUR/USD ($108.720 nocional) |
|---|---|
| 2:1 (conta de ações típica) | $54.360,00 |
| 30:1 (limite de varejo UE/Reino Unido) | $3.624,00 |
| 50:1 (limite de varejo EUA) | $2.174,40 |
| 500:1 (offshore) | $217,44 |

</div>

Leia a última linha e a armadilha fica óbvia. Com $2.000 e 500:1 você consegue manter cinco lotes padrão —
$543.600 em moeda — por $1.087,20 de margem, deixando $912,80 livres. Cinco lotes são $50 por pip, então um
movimento de **20 pips** contra você custa $1.000, mais do que sua margem livre, e você é liquidado. Vinte
pips são 0,0020 ÷ 1,0872 = **0,18%** do preço. Um movimento adverso menor que um erro de arredondamento em
um gráfico de ações encerra a conta.

O discurso de marketing é que alavancagem permite que uma conta pequena acesse um mercado grande. O
discurso honesto é que alavancagem multiplica um resultado cujo sinal você não controla: ela escala ganhos
e perdas pelo mesmo fator e não muda em nada sua expectativa por operação, então se sua estratégia perde
dinheiro em média, alavancagem não é uma rota mais rápida para o lucro, mas uma rota mais rápida para zero.
Corretoras reguladas na UE e no Reino Unido são obrigadas a publicar a proporção de contas de varejo que
perdem dinheiro, e os números divulgados geralmente ficam na faixa de 70–80%; perdas causadas por
alavancagem são o motivo dominante.

Trate a alavancagem como uma capacidade que você majoritariamente recusa: dimensione a partir da distância
do seu stop e do seu orçamento de risco, e deixe a exigência de margem cair onde cair.
[Futuros carregam uma mecânica de alavancagem parecida](/blog/futures-trading-explained) através da margem
de contrato, e a mesma disciplina se aplica.

## Majors, minors, exóticos, e a semana de trading de 24 horas

Pares são agrupados por liquidez. **Majors** todos incluem o dólar americano — EUR/USD, USD/JPY, GBP/USD,
USD/CHF, AUD/USD, USD/CAD, NZD/USD — e carregam os spreads mais apertados. **Minors**, ou cruzados,
combinam dois majors sem o dólar: EUR/GBP, EUR/JPY, GBP/JPY. **Exóticos** combinam um major com uma moeda
menor ou de mercado emergente — USD/TRY, USD/ZAR, USD/MXN — onde spreads rodam dez ou vinte vezes o de um
major e o preço se move violentamente com notícias políticas domésticas. Iniciantes pertencem aos majors
só pelo custo.

Forex roda 24 horas por dia, cinco dias por semana, abrindo com Sydney por volta das 17h ET de domingo e
fechando às 17h ET de sexta, com quatro sessões regionais se revezando: Sydney, Tóquio, Londres, Nova York.
O maior volume é a **sobreposição Londres–Nova York**, aproximadamente das 8h às 12h ET, quando os dois
maiores centros estão abertos — spreads ficam mais apertados e movimentos maiores nesse período. Horas só
de Ásia costumam ser calmas e em faixa.

Acesso ininterrupto não é um convite para operar sem parar. Escolha a janela que combina com seus setups e
sua vida; se essa é uma sobreposição de duas horas ou uma manutenção de vários dias é a decisão de
[day trading versus swing trading](/blog/day-trading-vs-swing-trading). E embora a semana seja contínua,
forex tem gaps no fim de semana — segunda-feira pode abrir longe do fechamento de sexta, passando por
qualquer stop que esteja no meio do caminho.

## O que os três pares de moedas da Stockade podem e não podem te ensinar

O simulador e a lista de mercados da Stockade carregam exatamente três pares — EUR/USD, GBP/USD e USD/JPY
— começando em 1,0872, 1,2714 e 157,42. Esses são nomes de pares reais, mas os dados de preço por trás
deles são gerados no lado do cliente por um passeio aleatório. Nada é cotado de um mercado, e esses preços
base são pontos de partida fixos, não taxas ao vivo.

Seja claro sobre o que fica de fora. A Stockade não modela nenhum spread entre compra e venda — um único
preço, então uma operação ali nunca paga o custo que domina o forex de varejo real. Não há lotes, não há
margem, não há alavancagem e não há swap overnight; você compra uma quantidade de unidades contra um saldo
virtual de $100.000, exatamente como faria com uma ação. A série gerada nunca tem gaps, então nenhum gap de
fim de semana aparece. E a volatilidade de vela a vela é uma fração fixa do preço base de cada instrumento,
idêntica em todo símbolo do site, então o EUR/USD ali não mostra os movimentos percentuais
caracteristicamente pequenos de um par major real.

Para o que serve é para prática de leitura: uma cotação de quatro casas decimais, contar pips de um
gráfico sem traduzir para dólares primeiro, e 1,0872 ao lado de 157,42 até que as duas convenções deixem de
precisar de um momento de pensamento.

## Pratique isso no simulador

Abra EUR/USD e USD/JPY na Stockade e leia distâncias em pips em vez de decimais — meça uma oscilação em
cada um e confirme que as convenções de quatro e duas casas decimais produzem movimentos comparáveis.
Depois precifique a mesma operação duas vezes no papel: quanto custaria ou renderia em um lote padrão ($10
por pip em EUR/USD, $6,35 em USD/JPY a 157,42) versus um micro lote. Lembre-se de que nenhum spread e
nenhuma alavancagem são modelados ali, então as duas forças que dominam o forex de varejo real estão
ausentes, e que dinheiro virtual torna a disciplina de dimensionamento muito mais fácil do que dinheiro
real vai ser. Automatize as convenções no
[simulador de paper trading da Stockade](/pt/simulator/) antes que qualquer coisa disso importe
financeiramente.
