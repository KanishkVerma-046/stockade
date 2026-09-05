---
title: "Ordens Stop-Loss: Como Proteger Suas Operações de Grandes Perdas"
description: "Um stop pertence a onde sua ideia de operação se quebra, não a um valor redondo. Stop-market vs stop-limit, posicionamento além da estrutura, e tamanho."
date: 2026-05-18
author: "Stockade Team"
tags: ["Tipos de Ordens", "Gestão de Risco"]
slug: "ordens-stop-loss-explicadas"
translationOf: "stop-loss-orders-explained"
---

Você compra 500 ações a 187,40 porque o gráfico parece bom. Cai para 186. Você espera, porque sempre volta.
Cai para 184. Agora vender significa admitir que estava errado, então você se convence de que é um
investidor de longo prazo. A 179 você finalmente sai, com $4.200 negativos numa operação em que originalmente
esperava arriscar algumas centenas de dólares.

Ninguém planeja isso. Acontece porque a decisão de quando sair foi deixada para o momento em que sair era
mais difícil. Um stop-loss é como você toma essa decisão com antecedência, enquanto ainda está calmo e ainda
consegue pensar sobre a operação em vez de sobre o dinheiro.

## O que uma ordem stop-loss realmente faz

Um stop-loss é uma instrução em espera: se o preço alcançar um nível que você especifica, feche minha
posição. Você o define quando entra, quando o resultado ainda é desconhecido e seu julgamento está intacto.
Quando ele dispara, nenhuma decisão é exigida de você — a ordem já a tomou.

Uma coisa sobre essa definição importa mais do que parece: o stop é uma ordem, não uma intenção. "Eu saio
se bater em 185" não é um stop-loss. É um plano que você vai renegociar no momento em que 185 chegar e a
fita parecer que pode saltar. Um stop funcional executa sem te perguntar.

## Ordens stop-market e stop-limit, e a armadilha na segunda

Uma vez que um stop dispara, alguma coisa precisa realmente vender suas ações. Há duas formas de
especificar isso, e a diferença já encerrou contas.

Uma ordem **stop-market** diz: quando o preço tocar 185,90, venda pelo que o mercado pagar. Você tem
garantia de sair. Você não tem garantia do preço. Se o mercado está caindo rápido, sua execução pode vir a
185,40 ou pior.

Uma ordem **stop-limit** diz: quando o preço tocar 185,90, coloque uma ordem limitada para vender a não
menos que 185,80. Agora você controla o preço — mas não controla mais se vai sair de fato. Se a próxima
negociação imprime a 184,20, sua limitada fica sem execução em 185,80 enquanto o mercado foge para baixo
dela. Você ainda está segurando uma posição perdedora, e a proteção que você achava que tinha é uma ordem
que nunca vai ser executada. Essa é a armadilha. A stop-limit protege seu preço de execução abandonando a
coisa que você realmente queria, que era sair.

A distinção importa mais exatamente nas condições para as quais um stop existe: movimentos rápidos e
unidirecionais. A maioria dos traders deveria usar ordens stop-market para stops de proteção por esse
motivo. A [diferença entre ordens a mercado e limitadas](/blog/market-orders-vs-limit-orders/) vale a pena
entender em geral, mas aqui a assimetria é gritante — uma execução um pouco pior é uma tarde ruim, um stop
de proteção não executado é um ano ruim.

## Coloque o stop onde sua ideia de operação é provada errada

A forma mais comum de posicionar um stop é decidir quanto dinheiro você está disposto a perder e colocar o
stop a essa distância. Alguém arriscando $500 em 500 ações coloca o stop 1,00 abaixo da entrada e chama
isso de gestão de risco.

Não é. O mercado não tem ideia de qual é o saldo da sua conta. Um stop a uma distância arbitrária é atingido
por ruído comum, e a posição fecha enquanto seu motivo original para a operação ainda está completamente
intacto. Você perde dinheiro sem aprender nada, porque a operação nunca foi de fato testada. O stop
pertence ao preço que torna falso seu motivo para estar na operação.

Digamos que você comprou a 187,40 porque o preço segurou um nível em 186,15 duas vezes e se afastou dele.
Sua tese é "compradores estão defendendo 186,15." Abaixo de 186,15, essa tese está morta — não danificada,
morta. Adicione um pequeno amortecedor e coloque o stop em 185,90. Agora a distância é definida pelo
gráfico, não pelo seu conforto. Se disparar, você estava errado sobre algo real, o que é informação.
[Níveis de suporte e resistência](/blog/support-and-resistance-levels/) são a matéria-prima para esse tipo
de posicionamento.

Seu risco por ação é 187,40 − 185,90 = **1,50**. Esse número é um resultado da análise, não uma entrada. O
que você faz com ele vem a seguir.

### Coloque stops além da estrutura, não em números redondos

Números redondos atraem stops. 186,00 parece uma linha natural, então traders comprados perto dali colocam
seus stops logo abaixo — 185,95, 185,90, 185,85. Isso é um aglomerado de ordens de venda numa faixa
estreita, e um aglomerado de ordens de venda é um alvo. O preço mergulha através, dispara toda a pilha,
absorve a oferta, e reverte.

Você não consegue evitar isso completamente, mas pode evitar ser a presa mais fácil. Coloque o stop além do
nível estrutural em vez de no número redondo perto dele — abaixo da mínima de oscilação real, além da borda
do range, do outro lado da média móvel sobre a qual a operação foi construída. Se a mínima de oscilação é
186,15, um stop em 186,05 está dentro do ruído. Um stop em 185,90 fica abaixo do nível *e* abaixo da
prateleira óbvia de número redondo.

O custo é real: um stop mais distante é uma perda maior quando é atingido. Esse custo é pago com tamanho de
posição, não com esperança.

## Distância do stop e tamanho da posição são a mesma decisão

Esta é a parte que a maioria dos iniciantes pula, e é o mecanismo inteiro.

Fixe seu risco em dólares primeiro: $500 numa conta de $100.000, meio por cento. Depois:

**ações = risco em dólares ÷ risco por ação**

Com um stop em 185,90, o risco por ação é 1,50:

- 500 ÷ 1,50 = 333,33, então **333 ações**
- Risco real se parado: 333 × 1,50 = **$499,50**

Agora suponha que a estrutura é mais larga e a invalidação honesta é 183,90 — um stop de 3,50:

- 500 ÷ 3,50 = 142,86, então **142 ações**
- Risco real se parado: 142 × 3,50 = **$497,00**

Mesmo risco de $500. Posição completamente diferente. Um stop mais largo não significa mais risco; significa
menos ações. A distância do stop e a quantidade de ações se movem em direções opostas para manter a perda
constante.

Isso também expõe a fantasia do stop apertado. Um stop de 0,50 permitiria 1.000 ações — mas 1.000 × 187,40
são $187.400 em ações numa conta de $100.000, o que exige alavancagem, e o stop está perto o suficiente
para que ruído rotineiro o atinja repetidamente.
[Dimensionamento de posição e a regra de 1%](/blog/risk-management-position-sizing/) aprofunda essa
aritmética.

<div class="table-wrap">

| Preço do stop | Risco/ação | Ações para $500 | Valor da posição |
|---|---|---|---|
| 186,90 | 0,50 | 1.000 | $187.400 |
| 185,90 | 1,50 | 333 | $62.404 |
| 183,90 | 3,50 | 142 | $26.611 |

</div>

## Stops móveis (trailing) e o que você abre mão para usar um

Um stop móvel (trailing stop) segue o preço a seu favor e nunca volta atrás. Comprado a partir de 187,40
com um trail de 2,50: o preço corre até 194,00, o stop sobe até 191,50, e uma saída ali trava 4,10 por ação
— 333 × 4,10 = **$1.365,30** — sem você decidir nada.

O trade-off é que um stop móvel sempre devolve a distância do trail. Você nunca vai sair na máxima, por
construção. Aperte demais o trail e um recuo normal encerra uma operação de tendência cedo demais; afrouxe
demais e você devolve uma grande parte de um ganho aberto. Não há configuração correta, só uma escolha
sobre qual arrependimento você prefere. Stops móveis são frequentemente combinados com um alvo de lucro
através de uma ordem bracket, que [ordens OCO e bracket](/blog/oco-and-bracket-orders/) cobre como tipo de
ordem.

## Três coisas honestas sobre stops

**Um stop não garante seu preço de saída.** Em mercados reais, uma ação pode fechar a 186,20 e abrir na
manhã seguinte a 178,00 por causa de uma notícia. Seu stop de 185,90 vira uma ordem a mercado a 178,00. É
por isso que um stop limita perdas em vez de as travar, e por que o tamanho da posição ainda importa mesmo
com um stop em vigor.

**Ser parado repetidamente geralmente significa que o stop está apertado demais, não que stops são ruins.**
Se um instrumento rotineiramente oscila 2,00 numa hora e seu stop fica a 0,60 de distância, você não está
com azar — está pagando o mercado para amostrar seu ruído. Meça primeiro o range normal do instrumento,
depois coloque o stop fora dele, depois reduza o tamanho da posição para manter o risco em dólares
inalterado.

**Mover um stop para mais longe é como uma perda pequena vira uma catastrófica.** Aquele $499,50 original
vira $1.798,20 se você deslizar o stop de 185,90 para 182,00 em 333 ações. Deslize para 175,00 e são
$4.129,20 — mais de oito vezes a perda que você concordou em assumir. Um stop pode ser movido na direção do
seu lucro. Movê-lo para longe do lucro não é gestão de risco; é uma recusa de estar errado, expressa em
dólares.

## O que as execuções quase sem atrito da Stockade não te mostram

A Stockade suporta níveis de stop-loss e take-profit no ticket de ordem `/simulator`: digite-os junto da
sua ordem, e a posição fecha automaticamente quando o preço alcança o nível. As execuções ali carregam
muito menos atrito que as reais, mas não zero. Não há spread entre compra e venda — um único preço cotado
serve tanto de bid quanto de ask — e não há execuções parciais, então a posição inteira sempre fecha de uma
vez. A série de preços gerada também nunca tem gaps, porque cada vela abre exatamente onde a anterior
fechou.

O que o simulador não te dá é o preço exato que você digitou. Ele checa seu stop contra um novo preço a
cada 800 milissegundos, e o preço se move em saltos discretos entre essas checagens. Quando finalmente
chega um tick em ou abaixo do seu stop de 185,90, a saída é registrada *naquele* tick — 185,87, 185,82, onde
quer que o salto tenha caído — não em 185,90. A lacuna é pequena, mas é unidirecional e sempre contra você,
que é a mesma forma que o slippage real tem, numa fração do tamanho.

Stops reais são bem piores que isso. Use o simulador para as partes que ele modela honestamente — escolher
um nível de invalidação, dimensionar a posição para ele, deixar o stop em paz depois de definido — e assuma
que saídas reais serão piores que as simuladas. Os preços da Stockade também são inteiramente sintéticos,
gerados no seu navegador, não um feed de nenhuma exchange.

## Pratique isso no simulador

Faça vinte operações onde você anota o preço de invalidação *antes* de anotar a quantidade de ações, depois
deixe a aritmética definir o tamanho. Digite o nível de stop no ticket no mesmo momento em que abre a
posição, e não o toque depois — a disciplina de deixá-lo em paz é a habilidade, e é muito mais difícil com
dinheiro real do que com capital virtual. Depois confira `/pt/analytics/` para ver se suas perdas se
concentram perto do seu risco planejado ou vão bem além dele. Comece no
[simulador de paper trading da Stockade](/pt/simulator/).
