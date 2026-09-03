---
title: "Como Criar um Plano de Trading: Passo a Passo para Iniciantes"
description: "Um plano de trading é um documento, não uma intenção. Cada seção necessária, um exemplo de setup completo, e a regra para quando você pode alterá-lo."
date: 2026-06-15
author: "Stockade Team"
tags: ["Estratégia", "Gestão de Risco"]
slug: "como-criar-um-plano-de-trading"
translationOf: "how-to-build-a-trading-plan"
---

Você já conhece suas regras. Você poderia recitá-las agora mesmo: corte perdas rapidamente, deixe os
ganhos correrem, não persiga o preço. Depois uma posição vai contra você, e a regra silenciosamente vira
"corte perdas rapidamente, a menos que esteja prestes a voltar, o que geralmente acontece." Nada pareceu
uma violação, porque não havia nada a violar. A regra vivia na sua cabeça, e sua cabeça a reescreveu
enquanto você estava ocupado perdendo dinheiro.

Esse é todo o argumento para escrever um plano: não disciplina como um traço de personalidade, mas um
documento com seções nomeadas, aberto ao lado do seu gráfico, dizendo o que você decidiu quando estava
calmo e não tinha nada em jogo.

## Por que um plano não escrito não é um plano

Um plano não escrito é um conjunto de intenções, e intenções se remodelam sob pressão. Numa operação
perdedora, seu cérebro está resolvendo um problema diferente do que estava há dez minutos — fazer o
desconforto parar — e a rota mais rápida para lá é decidir que a regra nunca foi bem o que você achava.

Um plano escrito remove essa negociação. Ou a condição na página foi cumprida ou não foi. Você ainda pode
quebrar a regra, mas agora você sabe que a quebrou, e isso entra no seu diário como uma violação em vez de
se dissolver em "eu li o setup de forma diferente daquela vez."

Também é **falseável**. Depois de quarenta operações você pode perguntar se aquelas condições exatas
produziram alguma coisa. Um plano não escrito nunca pode ser testado, porque nunca foi o mesmo plano duas
vezes.

## As nove seções que seu documento de plano precisa ter

Abra um arquivo de texto ou uma página de caderno e escreva estes títulos. A coisa toda deve caber em uma
ou duas páginas — um plano que você não vai ler é decoração.

```
PLANO DE TRADING — v1 — iniciado em [data]

1. MERCADO E PERÍODO       Quais instrumentos, qual gráfico, quais horários.
2. DEFINIÇÃO DO SETUP      As condições exatas que todas precisam ser verdadeiras.
3. GATILHO DE ENTRADA      O único evento que me coloca na operação.
4. POSICIONAMENTO DO STOP  Onde estou errado, decidido antes da entrada.
5. ALVO E SAÍDA            Onde realizo lucro, e qualquer regra de saída parcial.
6. RISCO POR OPERAÇÃO      Percentual da conta, e o tamanho resultante.
7. LIMITE DE PERDA DIÁRIA  O número que encerra minha sessão.
8. CHECKLIST PRÉ-OPERAÇÃO  Cinco ou seis perguntas de sim/não.
9. REVISÃO E ALTERAÇÃO     Quando reviso, e quando posso mudar esta página.
```

Cada seção força uma decisão que você de outra forma tomaria no calor do momento. Percorra-as em ordem.

## Restringir seu mercado e período supera cobrir tudo

Iniciantes observam tudo, na teoria de que mais instrumentos significa mais oportunidades. Na prática
significa julgamentos mais rasos e nenhum sentimento de como qualquer coisa se comporta. Escolha **um ou
dois instrumentos e um período de gráfico** e anote-os. Se você tem um emprego fixo, essa escolha já está
largamente feita para você — um gráfico de 5 minutos que você não consegue observar não é uma opção real.
Manutenção intraday versus multi-dias é a maior bifurcação do documento;
[day trading vs swing trading](/blog/day-trading-vs-swing-trading) cobre as restrições que decidem isso.
Depois escreva seus horários de sessão: "eu opero entre 09h45 e 11h30 e não abro nada novo depois disso" é
verificável, e "eu opero quando há oportunidade" não é.

## Escrevendo uma definição de setup que um estranho conseguiria verificar

Esta é a seção que iniciantes pulam, e a que torna o resto do plano possível. O teste: **um estranho
conseguiria ler sua definição, olhar um gráfico, e dizer se o setup está presente — sem fazer uma única
pergunta de acompanhamento?**

"Compre a queda numa tendência de alta" falha feio. O que é uma queda? Quão profunda? Duas pessoas
marcariam o mesmo gráfico de forma diferente, e você também, em dois dias diferentes. Aqui está a mesma
ideia escrita de forma que possa ser verificada.

**Setup: continuação de pullback na EMA-9 de 5 minutos.** Todas as seis condições precisam ser verdadeiras.

1. No gráfico de 5 minutos, a EMA 9 está acima da EMA 20, a EMA 20 está acima da EMA 50, e todas as três
   vêm subindo pelas últimas 12 velas no mínimo.
2. O preço imprimiu uma máxima mais alta nas últimas 10 velas.
3. O preço recua e toca ou cai levemente abaixo da EMA 9, mas nenhuma vela do pullback **fecha** abaixo da
   EMA 20.
4. O pullback tem 3 velas ou menos.
5. O volume de cada vela do pullback é menor que o volume da vela de impulso que fez a máxima.
6. O relógio marca entre 10:00 e 15:00.

Cada uma dessas é um sim ou um não. A condição 3 encerra a discussão sobre se um pullback "foi longe
demais" — o fechamento abaixo da EMA 20 decide isso, não seu humor. Note também que EMAs atrasam por
construção: elas descrevem o que já aconteceu, então isso define uma condição que já se formou, não uma
previsão. Você não está afirmando que o setup funciona, só que está definido o suficiente para descobrir.

## Entrada, stop e alvo são três decisões separadas

Tomadas juntas no calor do momento, elas colapsam em um sentimento só: "isso parece bom." Tomadas
separadamente e com antecedência, elas se interrogam mutuamente — e frequentemente a resposta é que a
operação não vale a pena.

**Gatilho de entrada.** Um evento, não uma zona: *comprar stop 0,02 acima da máxima da primeira vela de 5
minutos que fecha de volta acima da EMA 9 depois do pullback. Se não disparar em 3 velas, cancelar.* Sem
essa cláusula de cancelamento você tem uma ordem em espera presa a um setup que já expirou.

**Posicionamento do stop.** Um local no gráfico, não um valor em dólares: *0,02 abaixo da mínima mais baixa
do pullback.* Depois um veto: *se esse stop está a mais de 0,60 da entrada, pule a operação.* Um stop
pertence a onde o setup está provado errado; se esse ponto é longe demais para dimensionar com sensatez,
passe em vez de mover o stop para algum lugar conveniente.

**Alvo e saída.** *Realizar lucro no dobro da distância de risco. Sair no fechamento da vela das 15:00 de
qualquer forma.* A saída baseada em tempo evita o desgaste lento de manter uma posição porque você não
consegue decidir.

Um exemplo: a entrada é executada a 48,32, a mínima do pullback foi 47,86, então o stop fica em 47,84. O
risco por ação é 48,32 − 47,84 = **0,48**, e o alvo é 48,32 + (2 × 0,48) = **49,28**. Todo número já
existia antes de você clicar em comprar, e os três podem entrar juntos como um bracket.

## Risco por operação e o limite de perda diária que encerra sua sessão

A seção 6 converte risco em quantidade de ações. Numa conta de $25.000 arriscando 1% — $250 — a 0,48 por
ação, isso é 250 ÷ 0,48 = **520 ações**. Note que 520 ações a 48,32 são $25.126 de exposição a partir de
uma decisão de risco de $250; um número de risco pequeno pode implicar uma posição grande, e é por isso
que a aritmética recebe seu próprio tratamento em
[dimensionamento de posição e a regra de 1%](/blog/risk-management-position-sizing). Seu plano precisa do
percentual e da fórmula na página, não de um número que você recalcula sob pressão.

A seção 7 é a que a maioria dos iniciantes omite e a que mais precisam. **Escreva um limite de perda diária
e o que acontece quando você o atinge.** Aqui, três perdas totais são $750, ou 3% — então: *a −$750 no
dia, eu fecho a plataforma.* Não "eu opero menor." Fechado. Isso limita o dano do exato estado em que você
toma suas piores decisões, que é logo depois de perder.

## O checklist pré-operação e as revisões diária e semanal

O checklist é seu plano comprimido em algo que você consegue rodar em vinte segundos antes de cada
entrada:

- Todas as seis condições do setup são verdadeiras agora?
- Meu stop está identificado, e dentro de 0,60?
- Eu derivei a quantidade de ações do stop em vez do hábito?
- Meu alvo está definido em 2R?
- Estou dentro do horário de sessão e abaixo do meu limite de perda diária?
- Estou fazendo isso porque cumpre o plano, ou porque quero estar numa operação?

Depois duas revisões. A **revisão diária** leva dez minutos depois da sessão: para cada operação, ela
estava no plano, e você a executou como escrito? Pontue a aderência separadamente do lucro e prejuízo —
um ganho tomado fora do plano é um resultado pior que uma perda tomada dentro dele, porque ensina a lição
errada e será repetido.

A **revisão semanal** olha para os agregados: setups tomados, setups pulados, taxa de aderência, e os
números de desempenho cobertos em
[analisando suas métricas de trading](/blog/analyze-trading-performance-metrics). É aqui que você percebe
que as perdas se concentram numa hora, ou que operações fora do plano respondem pela maior parte do seu
drawdown.

## Quando você pode mudar o plano, e quando não pode

Uma regra, e vale a pena colocá-la em negrito na página: **o plano só pode ser revisado numa revisão
programada, depois de uma amostra significativa de operações — nunca no meio de uma sessão, e nunca logo
depois de uma perda.**

Mudar o plano no meio da sessão parece adaptabilidade. É racionalização vestida de plano. O stop que você
alarga às 10h40 porque "as condições mudaram" é o stop que você teria alargado por qualquer motivo; você
achou o motivo depois. O que quer que uma operação perdedora te ensinou ainda será verdade no domingo.

"Amostra significativa" significa operações suficientes para que uma mudança responda a um padrão em vez
de ruído — trinta ou quarenta é um piso, e mesmo isso é pequeno. Quando você revisar, mude **uma coisa**,
avance o número da versão, e date. Altere três regras de uma vez e você nunca saberá qual importou.

Espere que seus primeiros planos estejam errados. Isso é o processo funcionando: a versão 1 existe para
ser provada inadequada por evidência, o que um plano não escrito nunca pode ser. Os traders que melhoram
não são os que acertaram de primeira — são os que o rascunho era específico o suficiente para ser provado
errado.

E seja claro sobre o que o documento te compra. Um plano não te torna lucrativo; nenhum arranjo de regras
fabrica uma vantagem. Ele te torna **consistente**, que é a única condição sob a qual você pode descobrir
se sua vantagem existe. Quarenta operações executadas da mesma forma produzem um resultado que você
consegue interpretar. Quarenta executadas de quarenta formas diferentes produzem uma história.

## Pratique isso no simulador

Escreva suas nove seções, depois faça vinte operações no
[simulador de paper trading da Stockade](/pt/simulator/) fazendo nada além de rodar o checklist — o saldo
virtual de $100.000 e os atalhos B / S / F tornam a entrada trivial, que é exatamente por isso que o
checklist precisa ser deliberado. Duas das seis condições não vão sobreviver à viagem, então decida com
antecedência como você vai lidar com elas. A condição 5 lê volume, e a Stockade desenha volume como um
número aleatório por vela — verificá-la ali é ler ruído. A condição 6 lê um relógio de sessão que o
simulador não tem: ele roda continuamente, fechando uma vela ao vivo a cada dez segundos, sem abertura,
sem fechamento e sem 10:00, o que também torna a linha de horário de sessão na seção 1 e a pergunta
correspondente do checklist inertes. Trate as duas como automaticamente satisfeitas e aceite que o
exercício treina as outras quatro condições; todas as seis ficam no documento, porque todas as seis estão
corretas para o mercado real para o qual você está escrevendo isso. Depois use `/pt/analytics/` para
comparar operações que cumpriram sua definição de setup contra as que você se convenceu a fazer. Duas
ressalvas sobre o resultado: os preços da Stockade vêm de um passeio aleatório no lado do cliente, não de
nenhum mercado, então um setup que "funciona" aqui diz que sua execução foi consistente e nada sobre a
vantagem — e o capital virtual remove o peso emocional que te fez reescrever a regra em primeiro lugar.
Ensaiar o processo ainda ajuda, como [praticar paper trading deliberadamente](/blog/paper-trading-guide)
explica; só nunca confunda um resultado simulado com um plano validado.
