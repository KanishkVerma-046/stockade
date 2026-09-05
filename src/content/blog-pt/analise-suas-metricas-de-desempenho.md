---
title: "Como Analisar Seu Desempenho de Trading: Métricas-Chave que Importam"
description: "A taxa de acerto sozinha pode te enganar. Aprenda expectativa, fator de lucro, relação risco-retorno, drawdown e tamanho de amostra com o painel da Stockade."
date: 2026-08-03
author: "Stockade Team"
tags: ["Análises", "Gestão de Risco"]
slug: "analise-suas-metricas-de-desempenho"
translationOf: "analyze-trading-performance-metrics"
---

Você termina uma semana de prática, abre o painel de análises, e vê uma taxa de acerto de 68%. Parece
bom. Depois você olha o L/P total e ele é negativo. Nada está quebrado — você acabou de descobrir que o
número que a maioria dos traders cita primeiro é o que menos diz.

O [painel de análises](/pt/analytics/) da Stockade calcula seis números principais a partir das suas operações
fechadas: L/P total, capital, taxa de acerto, fator de lucro, ganho médio e drawdown máximo. Abaixo ficam
três abas — uma curva de capital, um diário de operações, e um mapa de calor de taxa de acerto por horário.
Aqui está o que cada um significa e quais podem te enganar.

## Por que uma taxa de acerto de 70% pode perder dinheiro enquanto uma de 35% ganha

Taxa de acerto é o percentual das suas operações fechadas que terminaram com L/P positivo. Na Stockade é
operações vencedoras divididas pelo total de operações, e uma operação que fecha exatamente no zero a zero
conta do lado perdedor — então operações neutras puxam o número levemente para baixo.

O problema é que isso não diz nada sobre o *tamanho* dos ganhos e perdas. Considere dois traders, cada um
com 100 operações fechadas.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Taxa de acerto | 70% | 35% |
| Ganho médio | $50 | $300 |
| Perda média | $150 | $80 |
| Relação risco-retorno (ganho médio ÷ perda média) | 0,33 | 3,75 |
| Taxa de acerto de equilíbrio necessária | 75% | 21% |
| **Expectativa por operação** | **−$10** | **+$53** |

</div>

O Trader A ganha quase três a cada quatro vezes e está perdendo dinheiro. O Trader B erra duas operações
em três e está capitalizando. Nas 100 operações, A está com cerca de $1.000 negativos e B com cerca de
$5.300 positivos. Julgando apenas pelo cartão de taxa de acerto, você copiaria o errado.

## Expectativa: o número que responde se o seu sistema dá lucro

Expectativa é o resultado médio em dólares que você deve esperar de uma única operação, ao longo de muitas
operações. A fórmula:

```
Expectativa = (Taxa de acerto × Ganho médio) − (Taxa de perda × Perda média)
```

A perda média entra como um número positivo. Calcule para os dois traders.

**Trader A:** 0,70 × $50 = $35 de ganho esperado. 0,30 × $150 = $45 de perda esperada.
$35 − $45 = **−$10 por operação.** Toda operação que A faz tem valor esperado negativo. Operar mais só
piora, mais rápido.

**Trader B:** 0,35 × $300 = $105. 0,65 × $80 = $52. $105 − $52 = **+$53 por operação.**

A Stockade não exibe a expectativa, mas você pode calculá-la em segundos a partir da taxa de acerto, do
ganho médio e da perda média que você deriva do diário. Faça isso antes de concluir qualquer outra coisa.
Uma estratégia com expectativa negativa não se conserta operando com mais frequência ou com tamanho maior
— o dimensionamento só muda a velocidade com que a aritmética se manifesta.

O número relacionado é a **taxa de acerto de equilíbrio**, que é `1 ÷ (1 + relação risco-retorno)`. A
relação risco-retorno do Trader B é 300 ÷ 80 = 3,75, então B empata em 1 ÷ 4,75 = 21% e está ganhando 35%.
A relação do Trader A é 50 ÷ 150 = 0,33, então A precisa de 75% e só está acertando 70%. Essa diferença de
cinco pontos é toda a diferença entre as duas contas.

### Múltiplos de R: a unidade que torna operações diferentes comparáveis

Um ganho de $60 em uma operação onde você arriscou $600 é um evento muito diferente de um ganho de $60
onde você arriscou $40, mas a coluna de L/P do diário mostra os dois como `+$60,00`. Defina 1R como o
valor em dólares que você colocou em risco na entrada — preço de entrada menos preço de stop, vezes a
quantidade — e depois expresse cada resultado como um múltiplo dele. Arrisque $200, ganhe $500: +2,5R.
Arrisque $200, perca $180: −0,9R.

Em R, você pode tirar médias entre símbolos e tamanhos de posição sem distorção. A expectativa do Trader B
é 0,35 × 3,75R − 0,65 × 1R = 1,3125 − 0,65 = **+0,66R por operação** — um número que sobrevive a mudanças
no tamanho da conta, o que o torna a forma mais limpa de comparar este mês com o anterior. Isso assume que
você dimensiona de forma consistente, que é o argumento a favor de uma
[regra de dimensionamento de posição com percentual fixo](/blog/risk-management-position-sizing/).

## Fator de lucro, ganho médio e perda média

Fator de lucro é o lucro bruto dividido pela perda bruta em todas as operações fechadas. Se seus ganhos
somaram $10.500 e suas perdas custaram $6.200, o fator de lucro é 10.500 ÷ 6.200 = **1,69** — para cada
dólar perdido, $1,69 foi ganho. Qualquer valor acima de 1,0 é lucrativo, e o cartão da Stockade mostra com
duas casas decimais e um sufixo `x`.

Leitura aproximada: abaixo de 1,0 é prejuízo, de 1,0 a 1,3 é marginal e pode facilmente ser ruído, de 1,3 a
2,0 é uma vantagem respeitável em uma amostra decente, e muito acima de 2,5 numa amostra pequena
geralmente significa sorte. Se o cartão mostrar `∞`, você ainda não registrou uma operação perdedora — uma
afirmação sobre tamanho de amostra, não sobre habilidade.

Uma peculiaridade: a linha de KPIs mostra **Ganho Médio** mas não a perda média. Você obtém a perda média
a partir do diário, somando as entradas de L/P negativo e dividindo pelo número de operações perdedoras,
que a aba Visão Geral te dá diretamente. Você precisa dela tanto para a expectativa quanto para a relação
risco-retorno, então não pule essa parte.

## Drawdown máximo: a métrica que decide se você consegue continuar com uma estratégia

Drawdown máximo é a maior queda de pico a vale que seu capital sofreu, em percentual. A Stockade calcula
percorrendo suas operações fechadas em ordem, rastreando a marca d'água mais alta em curso, e registrando
a pior queda percentual abaixo dela.

Digamos que você constrói $100.000 até um pico de $112.000, e então uma sequência de perdas te arrasta até
$94.080. Isso é $17.920 abaixo de um pico de $112.000, então o drawdown máximo é 16,0%. Note o custo da
recuperação: subir de $94.080 de volta a $112.000 exige um **ganho de 19,05%**, não 16%. Drawdowns são
assimétricos, e os profundos são brutais — cair 50% exige subir 100%.

Esta é a métrica que decide se uma estratégia é utilizável *por você*. Um sistema com boa expectativa e um
drawdown de 40% é algo que a maioria das pessoas abandona no fundo, convertendo um drawdown de papel em
uma perda real. Uma ressalva: a Stockade calcula isso apenas a partir de operações fechadas, então uma
posição aberta profundamente no vermelho não aparece até que você a feche.

## O que a forma da sua curva de capital revela

A aba Curva de Capital plota seu saldo em curso após cada operação fechada, começando em $100.000, com o
mínimo e o máximo indicados abaixo. A maioria das pessoas lê só o último ponto. A forma diz mais.

Uma curva que sobe de forma constante, com quedas rasas e curtas, indica expectativa consistente e perdas
controladas. Uma que fica plana por longos trechos e depois salta verticalmente significa que um punhado
de operações produziu quase todo o lucro — remova-as e não sobra nada. Uma escada que sobe e repetidamente
devolve um grande bloco é a assinatura de cortar ganhos cedo e deixar as perdas correrem. E uma linha quase
vertical sem quedas, em poucas operações, não é uma descoberta; é uma amostra pequena.

O gráfico também se autoajusta ao seu próprio mínimo e máximo, então uma oscilação de $300 e uma de
$30.000 produzem linhas igualmente dramáticas. Confira os rótulos antes de reagir à inclinação.

## Tamanho de amostra: por que menos de 100 operações não prova quase nada

É aqui que a maioria das autoanálises erra. Suponha que você tenha 40 operações fechadas e uma taxa de
acerto de 50%. O erro padrão dessa estimativa é:

```
EP = raiz(0,5 × 0,5 / 40) = raiz(0,00625) = 0,079 → 7,9 pontos percentuais
```

Um intervalo aproximado de 95% é cerca de dois erros padrão para cada lado, então sua verdadeira taxa de
acerto de longo prazo poderia plausivelmente estar em qualquer lugar entre **34% e 66%**. Essa faixa
contém tanto um sistema muito bom quanto um muito ruim. Quarenta operações não te disseram quase nada.

O erro padrão diminui com a raiz quadrada da contagem, então reduzir essa faixa pela metade exige quatro
vezes mais operações — em 160 operações o EP cai para cerca de 4,0 pontos. É por isso que cerca de 100
operações fechadas é o piso costumeiro antes de tirar conclusões, e por que o erro analítico mais comum é
o overfitting: reescrever suas regras depois de oito operações ruins, quando oito operações é puro ruído.
Decida com antecedência quantas operações uma mudança de regra tem antes de você julgá-la, e escreva isso
no [seu plano de trading](/blog/how-to-build-a-trading-plan/).

## Encontrando seus melhores horários com o mapa de calor por horário do dia

A aba Mapa de Calor por Horário organiza dias da semana contra horas das 9:00 às 20:00 e colore cada
célula pela taxa de acerto naquele intervalo: verde a partir de 65%, vermelho abaixo de 50%, neutro entre
os dois, e um traço onde você não tem operações. Passe o mouse sobre uma célula para ver a contagem de
operações.

Isso responde a uma pergunta genuinamente útil: suas operações da tarde estão silenciosamente financiando
as da manhã? Duas ressalvas. As células coloram apenas pela taxa de acerto, então uma célula verde ainda
pode ser um horário que perde dinheiro se esses ganhos forem pequenos — cruze com o L/P do diário para
aquele intervalo. E as amostras por célula são pequenas: quatro operações com três vencedoras mostra 75% e
não significa nada. Espere por 20 ou 30 operações em um intervalo antes de chamá-lo de padrão. Os horários
são o horário local do seu navegador, não o de uma sessão de bolsa.

## O que o diário de operações registra e o que você precisa registrar sozinho

O diário mostra oito colunas por operação fechada: Símbolo, Lado, Entrada, Saída, Qtd, L/P, Duração e
Data, mais recentes primeiro. Isso é um registro completo do *que* você fez.

Ele não tem campo de anotações ou raciocínio. Nada capta por que você entrou, qual setup você achou que
viu, ou se você seguiu suas próprias regras — e a pergunta de revisão mais valiosa não é "quais operações
perderam dinheiro" mas "quais operações quebraram minhas regras", porque uma operação que quebrou as
regras e por acaso ganhou é mais perigosa que uma perda disciplinada. Mantenha um documento separado
registrando o setup, o stop e o alvo planejados, e uma linha sobre se você executou o plano, e depois
junte isso ao diário por símbolo e horário. Esse hábito separa a prática deliberada de
[simplesmente clicar em botões](/blog/paper-trading-guide/), e revela os
[erros repetíveis](/blog/common-day-trading-mistakes/) que nenhum painel consegue detectar.

Dois limites. Os dados vivem no armazenamento local do seu navegador, então limpar os dados do site apaga
seu histórico. Mais importante ainda, essas métricas medem sua tomada de decisão, não seu temperamento. Os
preços da Stockade são sintéticos, não há spread entre compra e venda, e nenhum dinheiro real está em
jogo. Um drawdown de 16% em uma curva simulada é um número; o mesmo drawdown com o seu próprio capital é
uma experiência física, e a disciplina que se mantém limpa aqui costuma desmoronar lá.

## Pratique isso no simulador

Faça 20 operações, depois abra o painel de análises e calcule sua expectativa manualmente a partir dos
cartões de taxa de acerto e ganho médio, mais a perda média que você deriva do diário — anote a resposta
antes de olhar o L/P total. Depois continue até 100 operações e calcule de novo, e note o quanto o número
se moveu. Esse movimento é o erro padrão acima, tornado concreto.
[Abra o simulador](/pt/simulator/) e comece a registrar operações que valham a pena analisar.
