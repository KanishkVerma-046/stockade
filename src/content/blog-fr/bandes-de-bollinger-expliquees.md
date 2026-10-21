---
title: "Bandes de Bollinger : Ce Que Mesurent Vraiment les Bandes"
description: "Les bandes de Bollinger mesurent la volatilité autour d'une moyenne sur 20 périodes, ni surachat ni survente. Calcul, contact de bande, squeeze, mythe des 95%."
date: 2026-11-23
author: "Stockade Team"
tags: ["Indicateurs", "Analyse Technique"]
slug: "bandes-de-bollinger-expliquees"
translationOf: "bollinger-bands-explained"
---

Le prix franchit à la hausse la bande de Bollinger supérieure. Le graphique paraît étiré, la bande ressemble à un plafond, et vendre semble être le trade évident. Puis le prix continue de clôturer sur la bande supérieure, bougie après bougie, et votre position courte se fait sortir par son stop sur un mouvement qui n'est jamais revenu.

Les bandes n'ont pas échoué ici. Elles ont été lues comme quelque chose qu'elles ne sont pas. Les bandes de Bollinger mesurent à quel point les prix récents sont dispersés autour d'une moyenne. Elles ne mesurent pas si le prix est trop haut, et leur inventeur le dit clairement.

## Comment se calculent les bandes de Bollinger

[John Bollinger a développé les bandes au début des années 1980](https://cmtassociation.org/presenter/john-bollinger/). Elles comportent trois lignes :

```
Bande médiane    = moyenne mobile simple des clôtures sur 20 périodes
Bande supérieure = bande médiane + 2 × écart type des 20 mêmes clôtures
Bande inférieure = bande médiane − 2 × écart type des 20 mêmes clôtures
```

[La description de Bollinger lui-même](https://www.bollingerbands.com/bollinger-bands) donne 20 périodes et deux écarts types comme réglages par défaut, inchangés depuis qu'il les a fixés, et précise qu'il utilise la formule de population pour l'écart type.

L'écart type est plus facile à suivre avec des chiffres. Nous prendrons cinq clôtures au lieu de 20 pour que le calcul tienne sur un écran. Disons que les cinq dernières clôtures d'une action hypothétique sont $50, $51, $49, $52 et $53 :

1. **Moyenne :** 255 ÷ 5 = $51.
2. **Écart de chaque clôture par rapport à la moyenne :** −1, 0, −2, +1, +2.
3. **Élevez-les au carré et faites la moyenne des carrés :** (1 + 0 + 4 + 1 + 4) ÷ 5 = 2. C'est la variance.
4. **Prenez la racine carrée :** √2 = $1.41. C'est l'écart type.
5. **Bandes :** $51 ± 2 × $1.41, soit $48.17 et $53.83.

Diviser par 5 à l'étape 3 correspond à la formule de population. La formule d'échantillon divise par 4 à la place, ce qui donnerait ici $1.58 et des bandes un peu plus larges ; deux plateformes graphiques peuvent donc légèrement diverger selon celle qu'elles utilisent.

## Ce que mesurent réellement les bandes

Prenez maintenant cinq autres clôtures avec la même moyenne de $51 : $50.60, $51.20, $50.80, $51.40 et $51.00. Chacune se trouve à 40 cents ou moins de la moyenne, donc l'écart type n'est que de $0.28 et les bandes sont à $50.43 et $51.57. Même moyenne, des bandes cinq fois moins larges. C'est toute l'idée : les bandes s'élargissent quand les prix se dispersent et se resserrent quand ils se regroupent.

Voici la partie qui surprend. Essayez cinq clôtures qui montent régulièrement d'exactement $1 chacune : $50, $51, $52, $53, $54. Chaque mouvement vaut $1, moins en moyenne que les sauts du premier exemple, et pourtant l'écart type est à nouveau de $1.41 et les bandes sont tout aussi larges, à $49.17 et $54.83. Les bandes mesurent la distance entre les clôtures et leur *moyenne*, et une tendance éloigne les clôtures de la moyenne même quand chaque mouvement est petit.

Cela les distingue de l'[ATR](/fr/blog/stop-loss-avec-atr/), qui fait la moyenne de l'amplitude de chaque barre. Une tendance lisse et régulière faite de petites bougies afficherait un ATR modeste et des bandes de Bollinger assez larges. Aucun des deux n'a tort. Ils répondent à des questions différentes : l'ATR demande de combien bouge une barre typique, et les bandes demandent jusqu'où le prix s'est éloigné de sa moyenne récente.

La largeur des bandes sert aussi de vérification approximative pour un stop. Avec les bandes larges du premier exemple, écartées de $5.66, un stop à $0.50 sous votre entrée se trouve bien à l'intérieur de la fourchette parcourue récemment par les clôtures, donc un mouvement ordinaire peut l'atteindre. Avec les bandes étroites, écartées de $1.14, les mêmes $0.50 représentent près de la moitié de l'écart. Dans les deux cas, le stop doit toujours se trouver là où votre idée est invalidée, et le nombre d'actions découle toujours de la distance du stop, comme dans l'exemple chiffré du guide de l'ATR.

## Toucher la bande est un contact, pas un signal

C'est l'erreur de lecture de l'introduction, et Bollinger y répond directement. Parmi [ses règles d'utilisation des bandes](https://www.bollingerbands.com/bollinger-band-rules) : « Les contacts avec les bandes ne sont que cela, des contacts, pas des signaux. » Un contact avec la bande supérieure n'est pas, à lui seul, un signal de vente, et un contact avec la bande inférieure n'est pas un signal d'achat. La même liste précise que sur un marché en tendance, le prix peut longer la bande supérieure vers le haut ou la bande inférieure vers le bas, et que les clôtures en dehors des bandes sont d'abord des signaux de continuation, pas de retournement.

Cela concorde avec ce que dit l'arithmétique. Le prix n'atteint la bande supérieure qu'en montant bien au-dessus de sa moyenne récente, ce qui est l'allure même d'un mouvement fort. C'est la même leçon que pour [la lecture « surachat » du RSI](/fr/blog/indicateur-rsi-surachat-survente/) : une valeur élevée décrit une force qui s'est déjà manifestée, pas un retournement imminent.

Ce qu'un contact avec la bande vous dit, c'est que le prix est haut ou bas *par rapport à sa propre fourchette récente*. C'est du contexte. Que ce soit une raison de trader dépend de tout le reste : la tendance, le [support ou la résistance](/fr/blog/niveaux-de-support-et-resistance/) le plus proche, et ce que dit votre setup.

## Où se situe le prix dans les bandes : le %b

Les règles de Bollinger décrivent aussi le %b, qui transforme la position dans les bandes en un seul chiffre :

```
%b = (clôture − bande inférieure) ÷ (bande supérieure − bande inférieure)
```

Sur la bande inférieure, le %b vaut 0, sur la bande médiane 0.5, et sur la bande supérieure 1. Il passe sous 0 ou au-dessus de 1 quand le prix clôture en dehors des bandes. Pour reprendre le premier exemple, une clôture à $53 avec des bandes à $48.17 et $53.83 donne (53 − 48.17) ÷ 5.66 = 0.85.

L'intérêt du %b est de rendre la position dans les bandes comparable d'un instrument à l'autre et dans le temps, comme le fait la division de l'ATR par le prix. Une clôture à $53 ne veut rien dire en soi ; 0.85 indique qu'elle est proche du haut de sa dispersion récente. Cela reste une position, pas un signal, et tout ce qui précède s'applique : dans une tendance forte, le %b peut rester près de 1 ou au-dessus pendant longtemps.

## L'erreur des 95%

Une affirmation courante veut que 95% des prix restent à l'intérieur des bandes, si bien que tout ce qui en sort serait un événement rare appelé à revenir. Elle vient d'un vrai fait statistique : dans une distribution normale, environ 95% des valeurs se situent à moins de deux écarts types de la moyenne.

Les prix ne suivent pas une distribution normale, et Bollinger le dit dans ces mêmes règles : ne faites aucune hypothèse statistique à partir de l'usage de l'écart type dans les bandes, car les distributions de prix ne sont pas normales et les échantillons sont trop petits pour être statistiquement significatifs. Il ajoute qu'en pratique, il trouve généralement environ 90%, et non 95%, des données à l'intérieur des bandes avec les réglages par défaut.

Même en le prenant au pied de la lettre, 90% à l'intérieur signifie qu'une clôture sur dix tombe à l'extérieur. Sur des barres journalières, cela fait environ deux clôtures par mois, ce qui est ordinaire, pas rare. Et selon les propres règles de Bollinger, une clôture en dehors des bandes est d'abord un signal de continuation, pas de retournement.

## Le squeeze : quand les bandes se resserrent

Un squeeze est une période où les bandes se rapprochent inhabituellement. On le mesure avec la BandWidth, la distance entre les bandes en pourcentage de la bande médiane :

```
BandWidth = (bande supérieure − bande inférieure) ÷ bande médiane × 100
```

Avec les deux exemples à cinq clôtures ci-dessus : ($53.83 − $48.17) ÷ $51 × 100 = 11.1, et ($51.57 − $50.43) ÷ $51 × 100 = 2.2. Le second est un squeeze par rapport au premier.

« Étroit » est relatif à l'historique propre de l'instrument. [Le guide de StockCharts sur la BandWidth](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth) suggère de la juger par rapport à la fourchette des huit à douze derniers mois, et précise que le squeeze ne donne pas de direction en lui-même : celle-ci vient de la sortie de bande qui suit, et les premières sorties peuvent échouer.

Les traders guettent les squeezes en partant du principe que les périodes calmes ne durent pas éternellement. Nous en ferions une condition plutôt qu'un déclencheur. Un squeeze peut vous dire d'être attentif. Il ne peut pas vous dire dans quel sens trader.

## Choisir les réglages et la bande médiane

Les réglages par défaut sont un point de départ, pas une loi ; les règles de Bollinger indiquent que les bons paramètres peuvent varier selon le marché et l'usage. Si vous changez la longueur, changez le multiplicateur avec elle : ses règles donnent 2.1 écarts types sur 50 périodes, et le [guide des bandes de Bollinger](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands) de StockCharts ajoute 1.9 sur 10 périodes.

La bande médiane est une moyenne mobile simple, pas exponentielle. Si vous connaissez les EMA grâce au [guide des moyennes mobiles](/fr/blog/moyennes-mobiles-ema-vs-sma/), les deux se suivent de près mais ne sont pas la même ligne, et une EMA réagit plus vite aux dernières clôtures. Les règles de Bollinger disent aussi que la bande médiane doit décrire la tendance de moyen terme plutôt qu'être réglée pour des croisements.

Si vous voulez un deuxième avis à côté des bandes, choisissez un indicateur qui mesure autre chose. La liste de Bollinger avertit que deux indicateurs de momentum ne valent pas mieux qu'un seul ; ajouter à la fois le RSI et le [MACD](/fr/blog/macd-explique/) aux bandes apporte donc moins qu'il n'y paraît : tous deux mesurent le momentum.

## Pratiquez cela sur le simulateur

Stockade n'affiche pas de bandes de Bollinger. Ses graphiques proposent les EMA 9, 20 et 50, le VWAP, le RSI et le MACD. Chaque symbole fonctionne avec un seul réglage de volatilité, proportionnel à son prix, donc il n'y a pas de cycles de volatilité de marché réel. Les variations de prix changent tout de même : elles augmentent et diminuent par hasard, et s'élargissent quand le biais de tendance caché est fort. Si des bandes que vous calculez à partir des clôtures de Stockade se resserrent en ce qui ressemble à un squeeze, c'est donc cette variation due au hasard, pas le genre de cycle de volatilité qu'un squeeze est censé capter. Ce que vous pouvez travailler, c'est le calcul et la moitié moyenne mobile. Sur le [simulateur de graphiques](/fr/chart-simulator/), survolez les 20 dernières bougies et recopiez chaque clôture affichée dans la barre de valeurs vers un tableur. Calculez la moyenne et l'écart type de population (dans la plupart des tableurs en français, MOYENNE et ECARTYPE.PEARSON), repérez où se situeraient les bandes, et comparez cette SMA sur 20 périodes avec la ligne de l'EMA 20 sur le graphique. Faites-le une fois sur une portion en tendance et une fois sur une portion sans direction, et voyez comment la tendance élargit les bandes. Puis appliquez la même habitude sur le [simulateur](/fr/simulator/) : avant d'agir sur un prix étiré, demandez-vous à quelle distance il se trouve de sa moyenne, et si cet écart est inhabituel ou simplement dû à une tendance.
