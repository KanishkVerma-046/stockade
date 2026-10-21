---
title: "Bandas de Bollinger Explicadas: O Que as Bandas Medem"
description: "As Bandas de Bollinger medem volatilidade em torno de uma média de 20 períodos, não sobrecompra ou sobrevenda. O cálculo, o toque, o squeeze e o mito dos 95%."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indicadores", "Análise Técnica"]
slug: "bandas-de-bollinger-explicadas"
translationOf: "bollinger-bands-explained"
---

O preço rompe a Banda de Bollinger superior. O gráfico parece esticado, a banda parece um teto, e vender parece a operação óbvia. Aí o preço continua fechando na banda superior, candle após candle, e a sua venda a descoberto é estopada num movimento que nunca voltou.

As bandas não falharam ali. Elas foram lidas como algo que não são. As Bandas de Bollinger medem o quanto os preços recentes estão espalhados em torno de uma média. Elas não medem se o preço está alto demais, e a pessoa que as inventou diz isso com todas as letras.

## Como as Bandas de Bollinger são calculadas

[John Bollinger desenvolveu as bandas no início dos anos 1980](https://cmtassociation.org/presenter/john-bollinger/). Elas têm três linhas:

```
Banda central  = média móvel simples de 20 períodos dos fechamentos
Banda superior = banda central + 2 × desvio padrão dos mesmos 20 fechamentos
Banda inferior = banda central − 2 × desvio padrão dos mesmos 20 fechamentos
```

[A descrição do próprio Bollinger](https://www.bollingerbands.com/bollinger-bands) dá 20 períodos e dois desvios padrão como padrão, sem mudança desde que ele os definiu, e acrescenta que ele usa a fórmula populacional do desvio padrão.

O desvio padrão fica mais fácil de acompanhar com números. Vamos usar cinco fechamentos em vez de 20 para a aritmética caber numa tela. Digamos que os últimos cinco fechamentos de uma ação hipotética sejam $50, $51, $49, $52 e $53:

1. **Média:** 255 ÷ 5 = $51.
2. **Distância de cada fechamento até a média:** −1, 0, −2, +1, +2.
3. **Eleve ao quadrado e tire a média dos quadrados:** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. Essa é a variância.
4. **Tire a raiz quadrada:** √2 = $1,41. Esse é o desvio padrão.
5. **Bandas:** $51 ± 2 × $1,41, ou seja, $48,17 e $53,83.

Dividir por 5 no passo 3 é a fórmula populacional. A fórmula amostral divide por 4, o que daria $1,58 aqui e bandas um pouco mais largas, então duas plataformas de gráficos podem discordar um pouco dependendo de qual delas usam.

## O que as bandas realmente medem

Agora pegue cinco fechamentos diferentes com a mesma média de $51: $50,60, $51,20, $50,80, $51,40 e $51,00. Todos ficam a menos de 40 centavos da média, então o desvio padrão é só $0,28 e as bandas ficam em $50,43 e $51,57. Mesma média, bandas com um quinto da largura. Essa é a ideia toda: as bandas se alargam quando os preços se espalham e se estreitam quando eles se agrupam.

Esta é a parte que surpreende as pessoas. Tente cinco fechamentos que sobem de forma constante, exatamente $1 por vez: $50, $51, $52, $53, $54. Cada movimento é de $1, menor em média do que os saltos do primeiro exemplo, e mesmo assim o desvio padrão é de novo $1,41 e as bandas ficam igualmente largas, em $49,17 e $54,83. As bandas medem o quanto os fechamentos estão longe da sua *média*, e uma tendência afasta os fechamentos da média mesmo quando cada movimento é pequeno.

Isso as torna diferentes do [ATR](/pt/blog/stop-loss-com-atr/), que faz a média do tamanho da amplitude de cada barra. Uma tendência suave e constante, feita de candles pequenos, mostraria um ATR modesto e Bandas de Bollinger razoavelmente largas. Nenhum dos dois está errado. Eles respondem a perguntas diferentes: o ATR pergunta quanto uma barra típica se move, e as bandas perguntam o quanto o preço se afastou da sua média recente.

A largura das bandas também serve como uma conferência aproximada de um stop. Com as bandas largas do primeiro exemplo, $5,66 de distância entre elas, um stop $0,50 abaixo da sua entrada fica bem dentro da faixa que os fechamentos cobriram nos últimos tempos, então o movimento comum consegue alcançá-lo. Com as bandas estreitas, $1,14 de distância entre elas, os mesmos $0,50 são quase metade da dispersão. De um jeito ou de outro, o stop continua pertencendo ao ponto em que a sua ideia se prova errada, e o número de ações continua saindo da distância do stop, como no exemplo resolvido do guia de ATR.

## Tocar a banda é um toque, não um sinal

Esta é a leitura errada da abertura, e Bollinger fala dela diretamente. Entre [as regras dele para usar as bandas](https://www.bollingerbands.com/bollinger-band-rules): "Toques nas bandas são só isso, toques, não sinais." Um toque na banda superior não é, sozinho, um sinal de venda, e um toque na banda inferior não é um sinal de compra. A mesma lista diz que, em mercados com tendência, o preço pode ir subindo colado na banda superior ou descendo colado na inferior, e que fechamentos fora das bandas são, de início, sinais de continuação, não de reversão.

Isso bate com o que a aritmética diz. O preço só chega à banda superior subindo bem acima da sua média recente, e é exatamente assim que um movimento forte se parece. É a mesma lição da [leitura de "sobrecompra" do RSI](/pt/blog/indicador-rsi-sobrecompra-e-sobrevenda/): uma leitura alta descreve uma força que já aconteceu, não uma reversão que está para chegar.

O que um toque na banda diz é que o preço está alto ou baixo *em relação à sua própria faixa recente*. Isso é contexto. Se é motivo para operar depende de todo o resto: a tendência, o [suporte ou a resistência](/pt/blog/suporte-e-resistencia/) mais próximos e o que o seu setup diz.

## Onde o preço está dentro das bandas: %b

As regras de Bollinger também descrevem o %b, que transforma a posição nas bandas num único número:

```
%b = (fechamento − banda inferior) ÷ (banda superior − banda inferior)
```

Na banda inferior o %b é 0, na banda central é 0,5 e na banda superior é 1. Ele fica abaixo de 0 ou acima de 1 quando o preço fecha fora das bandas. Voltando ao primeiro exemplo, um fechamento de $53 com bandas em $48,17 e $53,83 dá (53 − 48,17) ÷ 5,66 = 0,85.

O valor do %b é tornar a posição nas bandas comparável entre ativos e ao longo do tempo, assim como dividir o ATR pelo preço. Um fechamento a $53 não significa nada sozinho; 0,85 diz que ele está perto do topo da sua dispersão recente. Continua sendo uma localização, não um sinal, e tudo o que está na seção anterior vale: numa tendência forte, o %b pode ficar perto de 1, ou acima, por um bom tempo.

## A leitura errada dos 95%

Uma afirmação comum é que 95% dos preços ficam dentro das bandas, então qualquer coisa fora delas é um evento raro que deveria voltar rápido. Ela vem de um fato estatístico real: numa distribuição normal, cerca de 95% dos valores ficam a até dois desvios padrão da média.

Preços não seguem uma distribuição normal, e Bollinger diz isso nas mesmas regras: não faça suposições estatísticas a partir do uso do desvio padrão nas bandas, porque as distribuições de preços não são normais e as amostras são pequenas demais para ter significância estatística. Ele acrescenta que, na prática, costuma encontrar cerca de 90%, e não 95%, dos dados dentro das bandas com as configurações padrão.

Mesmo levando ao pé da letra, 90% dentro significa que um fechamento em cada dez cai fora. Em barras diárias, isso dá mais ou menos dois fechamentos por mês, o que é comum, não raro. E, pelas próprias regras de Bollinger, um fechamento fora das bandas é, de início, um sinal de continuação, não de reversão.

## O squeeze: quando as bandas se estreitam

Um squeeze é um trecho em que as bandas ficam incomumente próximas uma da outra. Ele é medido com a BandWidth, a distância entre as bandas como percentual da banda central:

```
BandWidth = (banda superior − banda inferior) ÷ banda central × 100
```

Com os dois exemplos de cinco fechamentos acima: ($53,83 − $48,17) ÷ $51 × 100 = 11,1, e ($51,57 − $50,43) ÷ $51 × 100 = 2,2. O segundo é um squeeze em comparação com o primeiro.

"Estreito" é relativo ao histórico do próprio ativo. [O guia da StockCharts sobre a BandWidth](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) sugere julgá-la em relação à faixa dos últimos oito a doze meses, e diz que o squeeze em si não dá uma direção: ela vem do rompimento da banda que vem depois, e os primeiros rompimentos podem falhar.

Os traders ficam de olho em squeezes partindo da premissa de que trechos tranquilos não duram para sempre. Nós trataríamos um squeeze como uma condição, não como um gatilho. Ele pode te dizer para prestar atenção. Não pode te dizer para que lado operar.

## Como escolher as configurações e a banda central

Os valores padrão são um ponto de partida, não uma lei; as regras de Bollinger dizem que os parâmetros certos podem variar conforme o mercado e a tarefa. Se você mudar o comprimento, mude o multiplicador junto: as regras dele dão 2,1 desvios padrão para 50 períodos, e o [guia de Bandas de Bollinger](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) da StockCharts acrescenta 1,9 para 10 períodos.

A banda central é uma média móvel simples, não uma exponencial. Se você conhece as EMAs pelo [guia de médias móveis](/pt/blog/medias-moveis-ema-vs-sma/), as duas andam bem perto uma da outra, mas não são a mesma linha, e uma EMA reage mais rápido aos fechamentos mais recentes. As regras de Bollinger também dizem que a banda central deve descrever a tendência de médio prazo, e não ser ajustada para cruzamentos.

Se você quer uma segunda opinião junto com as bandas, escolha uma que meça outra coisa. A própria lista de Bollinger avisa que dois indicadores de momento não são melhores do que um, então colocar o RSI e o [MACD](/pt/blog/macd-explicado/) ao lado das bandas acrescenta menos do que parece: os dois medem momento.

## Pratique isso no simulador

A Stockade não mostra Bandas de Bollinger. Os gráficos dela têm EMA 9, 20 e 50, VWAP, RSI e MACD. Todos os símbolos rodam com uma única configuração de volatilidade, proporcional ao preço, então não há ciclos de volatilidade de mercado real. As oscilações de preço ainda variam: sobem e descem por acaso e se alargam quando o viés de tendência oculto está forte. Então, se as bandas que você calcula a partir dos fechamentos da Stockade se estreitarem no que parece um squeeze, isso é essa variação por acaso, e não o tipo de ciclo de volatilidade que um squeeze deveria captar. O que dá para praticar é o cálculo e a metade da média móvel. No [simulador de gráficos](/pt/chart-simulator/), passe o cursor sobre os últimos 20 candles e copie cada fechamento da barra de leitura para uma planilha. Calcule a média e o desvio padrão populacional (na maioria das planilhas em português, MÉDIA e DESVPAD.P), marque onde as bandas ficariam e compare essa SMA de 20 períodos com a linha da EMA 20 no gráfico. Faça isso uma vez num trecho com tendência e outra num trecho que anda de lado, e veja como a tendência alarga as bandas. Depois leve o mesmo hábito para o [simulador](/pt/simulator/): antes de agir sobre um preço esticado, pergunte o quanto ele está longe da sua média e se essa distância é incomum ou é só uma tendência.
