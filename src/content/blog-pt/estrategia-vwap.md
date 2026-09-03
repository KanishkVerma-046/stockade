---
title: "Estratégia VWAP: O Que É e Como Traders a Usam"
description: "VWAP é preço típico acumulado vezes volume, dividido pelo volume acumulado. A aritmética, por que instituições o acompanham, e onde ele falha."
date: 2026-05-04
author: "Stockade Team"
tags: ["Indicadores", "Estratégia"]
slug: "estrategia-vwap"
translationOf: "vwap-trading-strategy"
---

Você comprou 500 ações a $50,60 e a posição não foi para lugar nenhum. Depois você se pergunta se $50,60
sequer foi um preço sensato para pagar. O problema é que "sensato" precisa de um ponto de referência, e os
candidatos óbvios são ruins. O preço de fechamento é onde as últimas ações trocaram de mãos, não onde a
maioria delas trocou. O ponto médio do range do dia ignora se o dia passou seis horas na máxima ou seis
minutos ali.

O VWAP responde a pergunta corretamente: ele te dá o preço médio pago pela ação média negociada até agora
hoje. Se o VWAP está em $50,38 e você pagou $50,60, você pagou acima do que a ação típica do dia custou.
Isso é uma medição, não um sinal, e a utilidade do VWAP vem de levá-lo a sério como medição em vez de
operar seus cruzamentos.

## O que o VWAP calcula, e por que isso não é uma média móvel

VWAP significa Volume Weighted Average Price (Preço Médio Ponderado por Volume). O cálculo é um total
acumulado dividido por um total acumulado:

**VWAP = (preço típico acumulado × volume) ÷ (volume acumulado)**

Preço típico é `(máxima + mínima + fechamento) ÷ 3` — um número representando onde uma barra negociou, em
vez de apenas onde ela terminou. Multiplique isso pelo volume da barra para obter o valor em dólares
transacionado naquela barra, depois mantenha uma soma acumulada tanto do numerador quanto do denominador
desde a abertura da sessão em diante.

Isso difere de uma média móvel simples ou exponencial de duas formas independentes, e ambas importam.

**Ponderação.** Uma SMA de 20 períodos dá a cada um dos seus 20 fechamentos exatamente 1/20 do peso, tenha
essa barra negociado 3.000 ações ou 3 milhões. O VWAP pondera cada barra pelas ações que realmente trocaram
de mãos nela. Uma barra de alto volume move o VWAP bastante; uma barra morta quase não o move. Se você
quiser o quadro completo do que volume revela e não revela,
[trading de volume tem seu próprio artigo](/blog/understanding-trading-volume).

**Janela.** Uma SMA é uma janela rolante que descarta a barra mais antiga toda vez que uma nova chega. O
VWAP não descarta nada — toda barra desde a abertura da sessão permanece em ambos os totais
permanentemente. Essa natureza cumulativa comanda a maior parte do comportamento do VWAP, incluindo sua
pior fraqueza, coberta abaixo. A [comparação EMA versus SMA](/blog/moving-averages-ema-vs-sma) é sobre como
ponderar barras *recentes*; o VWAP nem está competindo nessa disputa.

Dito claramente: uma média móvel é um filtro de suavização aplicado ao preço. O VWAP é um fato contábil
sobre transações executadas.

### Trabalhando três barras de aritmética

Pegue uma ação com estas três barras de um minuto.

<div class="table-wrap">

| Barra | Máxima | Mínima | Fechamento | Preço típico | Volume | PT × Volume |
|---|---|---|---|---|---|---|
| 1 | 50,40 | 49,80 | 50,10 | 50,10 | 120.000 | 6.012.000 |
| 2 | 50,70 | 50,05 | 50,60 | 50,45 | 300.000 | 15.135.000 |
| 3 | 50,90 | 50,35 | 50,40 | 50,55 | 80.000 | 4.044.000 |

</div>

O preço típico da barra 1 é (50,40 + 49,80 + 50,10) ÷ 3 = 150,30 ÷ 3 = **50,10**. O da barra 2 é
(50,70 + 50,05 + 50,60) ÷ 3 = 151,35 ÷ 3 = **50,45**. O da barra 3 é (50,90 + 50,35 + 50,40) ÷ 3 =
151,65 ÷ 3 = **50,55**.

Agora acumule. Depois da barra 1, o VWAP é 6.012.000 ÷ 120.000 = **50,10** — com uma barra, o VWAP é igual
ao preço típico daquela barra.

Depois da barra 2, o numerador é 6.012.000 + 15.135.000 = 21.147.000 e o denominador é
120.000 + 300.000 = 420.000. VWAP = 21.147.000 ÷ 420.000 = **50,35**.

Depois da barra 3, o numerador é 21.147.000 + 4.044.000 = 25.191.000 e o denominador é 500.000.
VWAP = 25.191.000 ÷ 500.000 = **50,382**, então $50,38.

Compare isso a uma média não ponderada dos três preços típicos: (50,10 + 50,45 + 50,55) ÷ 3 =
151,10 ÷ 3 = 50,367. O VWAP saiu mais alto porque a barra 2 ficou acima da média não ponderada e carregou
300.000 das 500.000 ações — 60% de tudo o que foi negociado.

### Os mesmos preços com o volume rearranjado

Mantenha os nove valores de preço idênticos e troque os volumes das barras 2 e 3, então a barra 2 negocia
80.000 e a barra 3 negocia 300.000. O numerador vira
6.012.000 + (50,45 × 80.000 = 4.036.000) + (50,55 × 300.000 = 15.165.000) = 25.213.000. O volume total
ainda é 500.000. VWAP = 25.213.000 ÷ 500.000 = **50,426**.

Ação de preço idêntica, volume total idêntico, e o VWAP se moveu 4,4 centavos. Essa diferença é todo o
ponto do indicador. O VWAP não rastreia para onde o preço foi; ele rastreia para onde as ações foram.

## Por que o VWAP reinicia na abertura da sessão

O VWAP é definido sobre uma sessão, e na próxima abertura os totais acumulados voltam a zero. Isso decorre
do propósito do VWAP. "O preço médio pago por ação hoje" é uma estatística coerente. "O preço médio pago
por ação desde algum ponto não especificado no passado" não é, porque deriva em direção a qualquer período
de maior volume que por acaso tenha ocorrido, há quanto tempo for.

Duas consequências decorrem disso. Primeiro, as barras logo após a abertura são instáveis: com cinco
minutos no denominador, o VWAP oscila em quase toda barra, e só se torna uma referência estável uma vez que
uma parcela significativa do volume do dia está por trás dele.

Segundo, o VWAP não atravessa dias. O VWAP de ontem não é um nível no gráfico de hoje. Traders que querem
uma referência mais longa usam o VWAP *ancorado*, reiniciando a acumulação a partir de um evento escolhido
— uma divulgação de resultados, uma mínima de oscilação, uma barra de rompimento — em vez do relógio. Mesma
fórmula, ponto de partida escolhido deliberadamente.

## Por que instituições usam o VWAP como referência de execução

Este é o motivo pelo qual o VWAP importa, e não tem nada a ver com padrões de gráfico.

Um fundo que precisa comprar 4 milhões de ações não consegue enviar uma única ordem. Ele fatia a posição ao
longo da sessão. Depois, alguém precisa julgar se o trader fez um bom trabalho, e a régua padrão é o VWAP:
o preço médio de execução superou a média ponderada por volume do dia? Compre 4 milhões de ações a uma
média de $50,31 contra um VWAP de sessão de $50,38 e você economizou sete centavos por ação — $280.000.
Muitas mesas são remuneradas exatamente contra essa referência, e estratégias de execução algorítmica são
explicitamente construídas para acompanhá-la.

Isso cria um comportamento real em torno da linha: compradores trabalhando ordens grandes ficam mais
dispostos abaixo do VWAP e mais relutantes acima dele, porque seu placar diz isso. É a isso que as pessoas
se referem quando chamam o VWAP de "onde instituições defendem preço." É um efeito genuíno em mercados
líquidos — mas um efeito *comportamental* produzido por como traders são medidos, não uma lei da física, e
está largamente ausente em papéis pouco negociados.

## Lendo o VWAP como suporte e resistência intraday

Por causa dessa pressão de referência, o VWAP frequentemente age como um nível dinâmico: o preço recua até
ele, compradores que estão atrás na sua meta do dia entram, e o preço retoma. Diferente de um nível
horizontal desenhado numa máxima anterior, o VWAP se move ao longo da sessão, então o nível que você está
observando às 10h15 não é o nível às 14h30.

Duas leituras coexistem, e confundi-las é a forma mais comum de traders usarem mal o indicador.

**Reversão à média** se aplica numa sessão equilibrada e em range. O preço se estica para longe do VWAP, o
esticão não tem volume por trás, e ele volta com força. Traders vendem as extensões e miram o próprio
VWAP.

**Continuação de tendência** se aplica numa sessão direcional. O preço se afasta do VWAP e nunca volta além
de um toque, então vender as extensões significa lutar contra a tendência o dia todo. Essa leitura trata um
recuo *até* o VWAP que segura como uma entrada na direção do movimento existente, e um fechamento decisivo
através do VWAP como a tendência falhando.

A versão honesta é que você não consegue saber em qual dos dois está até a sessão ter se desenrolado
parcialmente. O que você pode checar é se o preço cruzou o VWAP repetidamente hoje ou ficou de um lado.
Cruzamentos repetidos significam que a leitura de reversão à média tem funcionado; sessões de um lado só
significam que não.

Algumas plataformas adicionam bandas de desvio padrão — VWAP mais e menos um, dois, ou três desvios padrão
do preço em relação ao VWAP. Elas dão à ideia de "esticado" um número em vez de uma estimativa de olho, e
um toque na segunda banda é o gatilho de venda usual. São um refinamento genuíno, e herdam toda limitação
abaixo. A Stockade desenha apenas a linha VWAP, sem bandas.

## Onde o VWAP quebra

**Ele fica mais lento durante toda a sessão.** Às 15h30, o denominador carrega seis horas de volume. Uma
única barra nova mal move a média, não importa quão violenta seja. O VWAP está mais responsivo quando é
menos confiável e mais confiável quando é menos responsivo, e nada conserta isso — é aritmética.

**Ele não tem sentido acima do período intraday.** Uma média cumulativa de sessão não tem interpretação num
gráfico diário ou semanal. Não há sessão para reiniciar. Se você está mantendo posições através de vários
dias, o VWAP não é sua ferramenta; veja
[day trading versus swing trading](/blog/day-trading-vs-swing-trading) para o que muda com o período de
manutenção.

**Ele só é tão bom quanto os dados de volume por trás dele.** O VWAP é uma estatística ponderada por
volume, então dados de volume ruins produzem uma linha confiantemente errada. Feeds de varejo que perdem
registros fora de exchange, ou instrumentos onde o volume reportado não é confiável, vão te dar um VWAP
contra o qual nenhuma instituição está realmente se referenciando.

E como todo indicador, o VWAP é retrospectivo. Ele resume transações que já aconteceram. Ele não consegue
te dizer que a sessão está prestes a reverter.

## Pratique ler o VWAP no simulador

Os gráficos da Stockade carregam um botão de VWAP tanto no `/simulator` quanto no simulador de gráficos,
calculado com a mesma fórmula acima — preço típico vezes volume, acumulado e dividido. A âncora difere,
porém, e a diferença vale a pena conhecer: a linha do simulador nunca reinicia numa abertura de sessão. Ela
acumula sobre uma janela rolante das velas mais recentes, então o que você está lendo é um VWAP contínuo
sem âncora em vez do VWAP de sessão que a seção de reinício acima descreve. Mesma aritmética, sem âncora.
Ligue-o e treine a habilidade mecânica: o preço está acima ou abaixo, o quanto ele se esticou, essa sessão
está cruzando a linha ou cavalgando um lado dela. Seja claro sobre o que você está praticando, porém. Os
preços da Stockade são gerados no lado do cliente por passeios aleatórios, e seu volume é um número
aleatório sorteado por candle, sem correlação com o movimento de preço. Não há participação real por trás
dele, então o volume ali não confirma nada e o efeito de referência institucional não existe. Isso esvazia
a própria linha, o que vale a pena declarar explicitamente: o código de VWAP do simulador pondera cada
barra por esse volume aleatório, e pesos aleatórios são efetivamente pesos uniformes, então a linha
desenhada se comporta perto de uma média não ponderada do preço típico em vez de uma verdadeiramente
ponderada por volume. A distinção de ponderação descrita perto do início deste artigo é real, mas não é o
que você está vendo aqui — das duas coisas que separam o VWAP de uma média móvel, apenas a janela
cumulativa é observável na Stockade. É aritmética real sobre insumos inventados — bom para treinar seu
olho, inútil como sinal.

Uma ressalva sobrevive ao simulador: as execuções ali carregam quase nenhum atrito — sem spread entre
compra e venda, sem execuções parciais, e apenas alguns centavos de slippage quando um stop ou alvo dispara
— e não há dinheiro real em jogo. Esperar o preço voltar ao VWAP em vez de persegui-lo é a parte difícil, e
é exatamente a parte que o paper trading não testa.
[Abra o simulador de mercado de ações da Stockade](/pt/simulator/), ligue o VWAP, e pratique nomear em voz
alta, antes de cada barra fechar, se a sessão está revertendo para a linha ou se afastando dela em
tendência.
