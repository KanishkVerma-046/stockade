---
title: "O Que É um Simulador de Mercado de Ações e Por Que Usar Um"
description: "Um simulador de mercado de ações permite operar a mecânica real do mercado com dinheiro virtual. Como funcionam e o que podem e não podem ensinar."
date: 2026-03-23
author: "Stockade Team"
tags: ["Fundamentos"]
slug: "o-que-e-um-simulador-de-mercado-de-acoes"
translationOf: "what-is-a-stock-market-simulator"
---

Na primeira vez que a maioria das pessoas faz uma operação real, ela está aprendendo duas coisas ao mesmo
tempo: como o software funciona, e se sua ideia sobre o mercado tinha algum valor. Esses são problemas
muito diferentes, e misturá-los é caro. Você clica em "vender" quando queria dizer "vender a descoberto",
compra 100 ações quando queria dizer 10, descobre que sua ordem de stop nunca foi realmente enviada — e
cada um desses erros custa dinheiro real para aprender algo que um manual poderia ter ensinado.

Um simulador de mercado de ações separa esses dois problemas. Ele te dá uma interface de trading completa,
um gráfico de preços que se move como um mercado se move, e um saldo de dinheiro falso, então os erros
mecânicos não custam nada. Você pode ser ruim no software em particular.

## O que um simulador de mercado de ações realmente é

Um simulador é uma plataforma de trading onde o dinheiro e o feed de preços são ambos simulados e tudo
construído em torno deles funciona da forma como realmente funciona. Seja claro sobre os dados: os preços
da Stockade são gerados algoritmicamente, não vindos de uma exchange, e não há feed ao vivo por trás deles.
O que eles fazem é *se comportar* como dados de mercado — candles OHLC apropriados com abertura, máxima,
mínima e fechamento, volume que muda de barra a barra, e os pavios longos que tornam gráficos reais difíceis
de ler. Os tipos de ordem são os tipos de ordem reais. A matemática da conta — saldo em caixa, tamanho da
posição, lucro e prejuízo não realizado, capital da conta — segue a mesma aritmética que sua corretora usa.
O que falta é a liquidação: ninguém envia sua ordem para uma exchange, e nenhum dinheiro sai de uma conta.

Essa distinção importa. Um simulador não é um jogo com tema de mercado; é um modelo funcional de um mercado
com as consequências removidas. As habilidades que se transferem são as mecânicas — dimensionar uma
posição, trabalhar uma ordem, manter um registro. A que não se transfere é a que você mais precisa, e
chegaremos nela abaixo.

O simulador da Stockade começa com $100.000 em capital virtual e roda inteiramente no seu navegador. Não há
cadastro nem conta; suas posições e histórico vivem no armazenamento local do seu navegador. Esse design
tem um trade-off óbvio — limpe os dados do seu navegador e seu histórico vai junto — mas significa que você
pode começar em segundos em vez de preencher um formulário.

## A mecânica que você está realmente ali para aprender

Antes de qualquer pergunta de estratégia há uma camada de encanamento puro que engana quase todo mundo. É
isso que um simulador ensina melhor.

### Tipos de ordem

Uma **ordem a mercado** compra ou vende imediatamente pelo que quer que esteja disponível agora. Ela
garante que você será executado; não garante o preço.

Uma **ordem limitada** define um máximo que você pagará ou um mínimo que você aceitará. Coloque uma compra
limitada numa ação a $47,50 enquanto ela negocia a $48,20 e nada acontece até o preço vir até você. Ela
garante o preço; não garante que você será executado de forma alguma.
([Ordens a mercado vs. ordens limitadas](/blog/market-orders-vs-limit-orders) aprofunda quando cada uma se
encaixa.)

Um **stop-loss** é uma ordem em espera que se ativa quando o preço se move contra você além de um nível
que você escolheu. É o mecanismo que transforma "eu provavelmente deveria cortar isso" em algo que
acontece, esteja você observando ou não.

Um **take-profit** é a mesma ideia na direção oposta — uma ordem que fecha sua posição assim que ela
alcança um alvo.

Um **bracket OCO** ("uma cancela a outra") combina um stop-loss e um take-profit em torno de uma posição
aberta. Qualquer um que executar primeiro cancela o outro, então você não consegue acabar com uma ordem
pendurada que abre uma nova posição depois que você já saiu. Veja
[ordens OCO e bracket explicadas](/blog/oco-and-bracket-orders) para a mecânica completa.

A Stockade suporta todos os cinco. Enviar uma centena deles com dinheiro falso é como o vocabulário vira
memória muscular. Os atalhos de teclado ajudam: `B` para comprar, `S` para vender, `F` para zerar (fechar
tudo). Quando suas mãos conhecem a tecla de saída, a hesitação deixa de ser um fator.

### Dimensionamento de posição, com números reais

Aqui está o cálculo que a maioria dos iniciantes nunca faz, e a única coisa mais útil para treinar num
simulador.

Digamos que você tem uma conta de $100.000 e decide que nenhuma operação isolada pode perder mais que 1%
dela. Isso são $1.000 de risco por operação.

Você quer comprar uma ação a $52,00. Você olha o gráfico e decide que se ela negociar abaixo de $50,00, sua
ideia estava errada. Seu risco por ação é $52,00 − $50,00 = $2,00.

Seu tamanho de posição é seu risco em dólares dividido pelo seu risco por ação: $1.000 ÷ $2,00 =
**500 ações**.

Isso é uma posição de $26.000 (500 × $52,00) numa conta de $100.000. Note o que aconteceu: você não
escolheu o tamanho primeiro e depois torceu. O nível de stop e seu limite de risco o produziram para você.

Agora mude um insumo. Mesma ação, mesma entrada de $52,00, mas você decide que o nível que invalida sua
ideia é $51,00 em vez disso. O risco por ação é $1,00, então o tamanho vira $1.000 ÷ $1,00 =
**1.000 ações** — uma posição de $52.000, duas vezes maior, com o mesmo $1.000 em risco. Um stop mais
apertado não significa menos risco; significa uma posição maior e uma chance maior de ser parado por ruído
comum.

Rode essa aritmética trinta vezes num simulador e ela se torna automática. Aprenda numa conta real e cada
repetição tem uma etiqueta de preço.
[Dimensionamento de posição e a regra de 1%](/blog/risk-management-position-sizing) cobre a fórmula
completa, incluindo a matemática de recuperação de drawdown.

## Ler o gráfico é uma habilidade separada

Os gráficos do simulador são gráficos de candles com um histograma de volume embaixo, cada candle resumindo
um período de tempo. As sobreposições disponíveis — EMA 9, EMA 20, EMA 50, além de VWAP, RSI e MACD — são
as comuns que você vai ver referenciadas em todo lugar, e tê-las na tela enquanto você opera é como você
descobre quais você realmente usa versus quais só deixam o gráfico com cara de ocupado.

A maioria das pessoas começa com seis indicadores e termina com dois. Um simulador é onde você pode se dar
ao luxo de descobrir isso.

A [página de Mercados](/pt/markets/) carrega 29 instrumentos: 14 ações, 8 tokens cripto, 3 pares de forex, e
4 futuros (/NQ, /ES, /CL, /GC). As ações e tokens são tickers inventados, não empresas ou moedas reais;
apenas os pares de forex e futuros usam nomes do mundo real. Eles ficam em níveis de preço muito diferentes,
o que vale a pena praticar — dimensionar um par de forex cotado em quatro decimais é um exercício mental
diferente de dimensionar um futuro de índice negociando na casa dos milhares, e errar a posição da vírgula
decimal é um erro clássico de iniciante que não custa nada aqui.

Os preços gerados também não reproduzem a personalidade real de instrumentos do mundo real: um único modelo
de volatilidade roda em todo símbolo. O que você aprende aqui é a aritmética e o fluxo de trabalho.

Para prática deliberada, o [Simulador de Gráficos](/pt/chart-simulator/) reproduz uma sessão de gráfico
candle por candle, então você avança uma barra de cada vez sem saber o que vem a seguir. A sessão é gerada
em vez de vir de um arquivo, então você não consegue reconhecer o gráfico e trapacear — e não saber o que a
próxima vela vai fazer é todo o objetivo. O modo ao vivo se move em ticks de 800ms, mais perto do ritmo
real e da pressão real.

## O que as estatísticas te dizem que sua memória não vai dizer

Memória é uma péssima escrituradora de registros para trading. Você vai lembrar da operação que correu 8% a
seu favor e esquecer as quatro pequenas perdas que a pagaram.

A [página de Análises](/pt/analytics/) mantém o registro em vez disso: curva de capital, diário de
operações, taxa de acerto, fator de lucro, ganho médio e perda média, drawdown máximo, e um mapa de calor
por horário do dia.

Duas delas merecem explicação:

**Fator de lucro** é o lucro bruto dividido pela perda bruta. Se suas operações vencedoras renderam $6.200
e suas perdedoras custaram $4.000, seu fator de lucro é 1,55 — você ganhou $1,55 para cada $1,00 perdido.
Qualquer coisa acima de 1,0 é líquido positivo.

**Taxa de acerto sozinha não te diz quase nada.** Uma estratégia que ganha 35% das vezes com um ganho médio
de $900 e uma perda média de $300 produz, em 100 operações, (35 × $900) − (65 × $300) = $31.500 − $19.500 =
**$12.000**. Uma estratégia que ganha 70% das vezes com um ganho médio de $200 e uma perda média de $600
produz (70 × $200) − (30 × $600) = $14.000 − $18.000 = **−$4.000**. A taxa de acerto mais alta é a
estratégia perdedora. Você não consegue ver isso sem manter os números.

O mapa de calor por horário do dia tende a produzir a descoberta mais desconfortável: muitas pessoas
encontram um trecho específico da sessão que responde pela maioria das suas perdas.

## O que um simulador não consegue te ensinar

Essa parte fica de fora da maioria dos artigos sobre o assunto, e deixá-la de fora é desonesto.

**Trading simulado remove o peso emocional do dinheiro real, que é a parte mais difícil do trading.**
Aguentar um drawdown de $2.400 em capital virtual é levemente interessante. Aguentar um drawdown de $2.400
em dinheiro que você ganhou é uma experiência física — e a disciplina que se manteve perfeitamente por três
meses num simulador muitas vezes desmorona na primeira semana de trading real. Regras não falham porque
eram regras ruins. Elas falham porque segui-las custa algo. Um simulador não consegue te cobrar esse custo,
então não consegue testar se você vai pagá-lo.

**Execuções num simulador carregam quase nenhum atrito.** Sua ordem é executada no preço que você vê,
instantaneamente, por completo; só saídas de stop e alvo deslizam, pelo tick que cruzou seu nível. Ordens
reais enfrentam slippage — a lacuna entre o preço que você esperava e o preço que você recebeu, que se
alarga exatamente quando o mercado está se movendo rápido e você mais quer ser executado. Ordens reais
também enfrentam execuções parciais, onde você pede 500 ações e recebe 300. Nenhuma das duas aparece em
escala real aqui, então resultados simulados são sistematicamente um pouco melhores do que as mesmas
decisões produziriam ao vivo.

**Comissões, spreads, custos de empréstimo, e impostos não são modelados da forma como sua corretora
específica vai aplicá-los.** Uma estratégia que rende um lucro fino num simulador pode ser uma perdedora
líquida uma vez que custos reais recaiam sobre ela.

**Os dados de preço são gerados, então não contêm nenhum comportamento real de mercado.** Os candles da
Stockade vêm de um algoritmo, não de uma exchange. Isso é ótimo para treinar mecânica — um ticket de ordem
não se importa de onde o número veio — mas um padrão que "funciona" aqui foi testado contra aritmética, não
contra um mercado. Não há divulgações de resultados, não há choques de notícias, nenhuma da estrutura
recorrente que traders realmente tentam explorar. Conclusões estilo backtest tiradas de dados gerados não
valem nada. Use o simulador para aprender a operar, não para descobrir o que operar.

A forma correta de ler um bom resultado de simulador é: "minha mecânica está sólida e minha ideia não está
obviamente quebrada." Não: "isso vai funcionar."

## Como usar um simulador para que ele realmente ajude

Trate o saldo virtual como se fosse real. No momento em que você começar a fazer posições de $40.000 "só
para ver o que acontece", a prática para de ser prática.

Opere um tamanho e um setup até ter 40 ou 50 entradas no diário, depois olhe as estatísticas em vez da sua
lembrança. Escreva por que você entrou antes de entrar, não depois de sair. E quando você migrar para
dinheiro real, corte seu tamanho até uma perda completa ser genuinamente entediante — nesse ponto você não
está mais testando a estratégia, está testando a si mesmo.
[O guia de paper trading](/blog/paper-trading-guide) cobre essa transição com mais detalhe.

## Pratique isso no simulador

Abra o Simulador de Trading, pegue o saldo virtual de $100.000, e faça uma coisa primeiro: calcule a
quantidade de ações a partir do seu nível de stop antes de entrar, do jeito que a aritmética acima funciona.
Faça isso dez vezes, apertando `F` para zerar quando seu stop for atingido em vez de se convencer de "mais
uma vela." Depois confira o diário de operações na página de Análises e compare sua perda média com o que
você pretendia que fosse. Esse único ciclo ensina mais que uma semana de leitura.

[Comece no simulador](/pt/simulator/)
