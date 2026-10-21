---
title: "Stops ATR : Placer le Stop-Loss selon la Volatilité"
description: "Un stop à $1 ne veut pas dire la même chose sur une action calme ou agitée. Comment l'ATR mesure l'amplitude normale, et un stop ATR à risque fixe en dollars."
date: 2026-11-09
author: "Stockade Team"
tags: ["Indicateurs", "Gestion du Risque"]
slug: "stop-loss-avec-atr"
translationOf: "atr-volatility-stops"
---

Prenons deux actions hypothétiques, toutes deux à $50. La première parcourt habituellement environ $0.50 entre son plus haut et son plus bas sur une journée. La seconde parcourt habituellement environ $2.50. Placez un stop à $1 sous chacune et vous avez pris deux décisions très différentes. Sur la première, le stop se trouve à deux journées complètes d'amplitude. Sur la seconde, il est à moins de la moitié de l'amplitude d'une journée normale.

Un stop en dollars fixes ou en pourcentage fixe traite ces deux actions comme identiques. Elles ne le sont pas, et le stop qui ignore la différence est celui que le bruit vient toucher. L'Average True Range, ou ATR, mesure jusqu'où un instrument se déplace normalement, ce qui vous permet de placer le stop en fonction de cela.

## Ce que mesure le true range, et pourquoi les gaps comptent

[L'ATR a été développé par J. Welles Wilder, qui l'a présenté dans son livre de 1978 *New Concepts in Technical Trading Systems*](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr). Il part du true range (l'amplitude vraie) d'une seule barre, qui est la plus grande de trois distances :

```
True range = la plus grande de :
  plus haut − plus bas
  |plus haut − clôture précédente|
  |plus bas − clôture précédente|
```

Le plus haut et le plus bas sont les extrémités des mèches d'une bougie ([le guide des chandeliers](/fr/blog/comment-lire-les-graphiques-en-chandeliers/) en détaille l'anatomie). Sur une barre normale, la première distance l'emporte. Disons que la clôture précédente était à $50.00, et que le plus haut du jour est à $51.20 et le plus bas à $49.60. Le plus haut moins le plus bas donne $1.60. Le plus haut est à $1.20 de la clôture précédente et le plus bas à $0.40. Le true range est de $1.60, comme l'amplitude simple.

Les deux autres lignes sont là pour les gaps. Supposons plutôt que l'action ouvre à $52.50 sur une nouvelle, puis évolue entre $52.10 et $53.00. L'amplitude propre de la barre n'est que de $0.90, mais le plus haut est $3.00 au-dessus de la clôture de la veille. Le true range est de $3.00. Quiconque a gardé sa position pendant ce gap a subi un mouvement de $3, et le true range le compte. Une simple mesure plus haut moins plus bas parlerait d'une journée calme.

## Comment l'ATR fait la moyenne du true range sur 14 barres

L'ATR est une moyenne du true range, et le réglage habituel est de 14 barres. La version de Wilder n'est pas une simple moyenne mobile. La première valeur est la moyenne simple des 14 premiers true ranges, puis chaque nouvelle valeur vaut :

```
ATR = (ATR précédent × 13 + true range du jour) ÷ 14
```

C'est le lissage donné sur la même page de StockCharts. Faites passer le jour de gap dans la formule. Si l'ATR était de $1.50 et que le gap produit un true range de $3.00, le nouvel ATR vaut ($1.50 × 13 + $3.00) ÷ 14 = $22.50 ÷ 14 = $1.61. Une journée deux fois plus grande que la normale ne fait bouger l'ATR que d'environ 7%. C'est voulu : l'ATR décrit la barre typique des dernières semaines, pas la dernière.

Il y a deux choses que l'ATR ne vous dit pas. Il n'a pas de direction : une action qui chute fortement et une action qui monte fortement peuvent avoir le même ATR. Et il s'exprime en unités de prix, donc vous ne pouvez pas le comparer d'une action à l'autre. Un ATR de $2 représente 10% d'une action à $20 et 0.5% d'une action à $400. Pour comparer, divisez l'ATR par le prix.

## Un stop ATR, de bout en bout

Voici la méthode, de l'entrée au nombre d'actions. Disons que vous avez un compte hypothétique de $25,000 et que vous risquez 1% par trade, soit $250. Vous achetez une action à $80, et son ATR sur 14 jours est de $2.00.

1. **Choisissez un multiple.** Nous prendrons 2 × ATR, donc le stop est à $4.00.
2. **Placez le stop.** $80.00 − $4.00 = $76.00.
3. **Dimensionnez la position.** $250 ÷ $4.00 = 62.5, arrondi à l'inférieur à 62 actions.
4. **Vérifiez les chiffres.** 62 actions × $80 = $4,960 d'actions. Si le stop s'exécute à $76, vous perdez 62 × $4.00 = $248.

Le multiple est un choix, pas une constante. Un ATR correspond à peu près à l'amplitude d'une barre typique, donc un stop placé à un ATR peut être atteint par une barre ordinaire. Des multiples plus larges laissent plus de place au trade et achètent moins d'actions. À titre de comparaison, un stop à 2% sur cette action serait à $1.60, soit seulement 0.8 ATR, ce qui reste à l'intérieur du mouvement d'une journée normale. C'est le problème de l'introduction, en chiffres.

Il n'existe pas de bon multiple, et personne ne peut vous dire lequel est le meilleur sans l'avoir testé sur vos propres setups. Ce qui compte davantage, c'est d'en choisir un et de l'utiliser de façon constante, pour que vos résultats veuillent dire quelque chose quand vous les passez en revue.

## Le même risque en dollars sur des actions calmes et volatiles

Le véritable intérêt d'un stop ATR, c'est ce qu'il fait à la taille de position. Gardez le risque de $250 et la règle des 2 × ATR, et appliquez-les à trois actions hypothétiques à $80 avec des ATR différents :

<div class="table-wrap">

| Action | ATR | Distance du stop (2 × ATR) | Actions | Taille de position | Perte au stop |
|---|---|---|---|---|---|
| Calme | $1.00 | $2.00 | 125 | $10,000 | $250 |
| Typique | $2.00 | $4.00 | 62 | $4,960 | $248 |
| Volatile | $4.00 | $8.00 | 31 | $2,480 | $248 |

</div>

L'action volatile reçoit un stop quatre fois plus large et une position quatre fois plus petite. La perte si vous avez tort reste à peu près la même. C'est toute l'idée : la volatilité change le nombre d'actions que vous détenez, pas ce que vous perdez. [Le guide du dimensionnement de position](/fr/blog/gestion-du-risque-et-dimensionnement-de-position/) explique pourquoi la taille doit toujours découler de la distance du stop plutôt que d'être fixée en premier.

Attention cependant à la ligne de l'action calme. Un ATR serré implique une grosse position, et $10,000 représentent 40% de ce compte. Vérifiez que la position tient dans votre cash avant de supposer que le nombre d'actions donné par la formule vous est accessible.

Garder un risque fixe en dollars préserve aussi vos calculs de drawdown. Les séries de pertes font mal en fonction de ce que vous risquez par trade, pas de la largeur de vos stops, et c'est pourquoi [le guide du drawdown](/fr/blog/recuperation-apres-drawdown/) mesure tout en risque par trade.

## Combinez l'ATR avec la structure au lieu de la remplacer

Un stop ATR a une faiblesse : il ne connaît pas votre idée de trade. Deux ATR sous votre entrée peuvent tomber au milieu d'une zone de support, où l'idée est toujours valable, ou bien au-delà du point où elle a été invalidée. [Placer un stop selon la structure](/fr/blog/ordres-stop-loss-explique/), au-delà du niveau qui invalide le trade, dit *où* le stop doit se trouver. L'ATR répond mieux à la question de *la marge* à laisser au-delà de ce niveau.

L'approche que nous utiliserions combine donc les deux. Trouvez le niveau structurel, puis ajoutez une fraction d'ATR comme marge de sécurité. Disons que le swing low sous votre entrée à $80 est à $77.40 et que l'ATR est de $2.00. Ajoutez un demi-ATR, $1.00, et le stop se place à $76.40. Si le repérage de ces niveaux est nouveau pour vous, [le guide des supports et résistances](/fr/blog/niveaux-de-support-et-resistance/) traite des swing lows et explique pourquoi un niveau est une zone plutôt qu'une ligne.

Dimensionnez ensuite. Le risque par action est de $80.00 − $76.40 = $3.60, donc $250 ÷ $3.60 = 69.4, arrondi à l'inférieur à 69 actions, pour une perte de $248.40 au stop. Si la prochaine résistance est à $87.20, le rendement est de $7.20, exactement 2R. C'est un trade en 1:2 avec un taux de réussite d'équilibre de 33.3%, et [le guide du ratio risque/rendement](/fr/blog/ratio-risque-rendement-et-esperance/) explique comment décider si votre setup peut franchir cette barre.

## Suivre un stop avec l'ATR : le Chandelier Exit

L'ATR fonctionne aussi pour les trailing stops. Une version bien connue est le Chandelier Exit, [développé par Charles Le Beau, qui se place par défaut à trois fois l'ATR sur 22 périodes sous le plus haut des 22 dernières périodes](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit) :

```
Chandelier Exit (long) = plus haut sur 22 périodes − ATR(22) × 3
```

Si le plus haut sur 22 périodes est à $90 et que l'ATR est de $2.00, la sortie est à $90 − $6.00 = $84.00. À mesure que le prix fait de nouveaux plus hauts, la ligne les suit vers le haut.

La formule cache un piège. Si l'ATR augmente alors que le plus haut ne bouge pas, la ligne baisse : avec le même plus haut à $90, un ATR de $2.50 la place à $82.50. Utilisée comme stop, cela revient à desserrer le stop en plein trade. Nous ne le ferions pas. Un stop ne doit bouger que dans le sens du trade, la règle que défend le guide des stop-loss ; si vous suivez votre stop avec cette formule, laissez-le donc où il est chaque fois que la formule passe en dessous.

## Ce que l'ATR fait mal

L'ATR est une description du passé, et il en a les faiblesses.

- **Il est en retard.** Il fait la moyenne de 14 barres, donc après une période calme il est faible juste avant un choc, et lent à se rattraper ensuite. Le gap de $3 ci-dessus ne l'a fait monter qu'à $1.61.
- **Il ne peut pas empêcher un gap.** Un stop ATR reste un ordre stop. Si le prix ouvre au-delà, il s'exécute à l'ouverture, quel que soit le soin avec lequel vous avez mesuré l'amplitude.
- **Il dépend de la taille des barres.** Un ATR sur 14 périodes calculé sur des barres de cinq minutes ne représente qu'une fraction de l'ATR journalier de la même action. Mesurez-le sur l'unité de temps que vous tradez. Le stop d'un day trader dimensionné sur l'ATR journalier sera beaucoup trop large, et celui d'un swing trader dimensionné sur l'ATR en cinq minutes beaucoup trop serré.
- **Il ne dit rien de la direction ni de l'edge.** Un stop bien placé limite ce que coûte un mauvais trade. Il ne rend pas le trade bon.

## Pratiquez cela sur le simulateur

Stockade n'a pas d'indicateur ATR. Ses graphiques affichent les EMA 9, 20 et 50, le VWAP, le RSI et le MACD. Chaque symbole fonctionne aussi avec le même réglage de volatilité, proportionnel à son prix, donc il n'y a pas de cycles de volatilité de marché réel auxquels s'adapter. L'amplitude des bougies varie tout de même : l'amplitude moyenne sur quelques bougies monte et descend par hasard, et les bougies sont plus larges pendant les rares périodes où le biais de tendance caché est fort. Et comme chaque bougie de Stockade ouvre exactement là où la précédente a clôturé, le true range y est toujours égal au plus haut moins le plus bas.

Vous pouvez quand même vous entraîner à l'arithmétique. Sur le [simulateur de graphiques](/fr/chart-simulator/), survolez chacune des 14 dernières bougies et notez les valeurs H et L dans la barre de valeurs en bas du graphique. Faites la moyenne des 14 amplitudes pour obtenir un ATR simple. Ouvrez ensuite le [simulateur](/fr/simulator/) en mode relecture, où le graphique n'affiche pas ces valeurs, et estimez à l'œil l'amplitude typique des 14 dernières bougies par rapport à l'échelle de prix. Placez votre stop à deux de ces amplitudes sous votre entrée, vérifiez où il tombe par rapport au swing low le plus proche, calculez le nombre d'actions pour un risque fixe en dollars avant d'entrer, et saisissez le prix du stop dans le champ Stop Loss. Les prix de Stockade sont générés dans votre navigateur, donc rien de tout cela ne dit quoi que ce soit de la volatilité d'une vraie action. L'habitude que cela construit est celle qui compte : mesurer l'amplitude, puis placer le stop, puis dimensionner.
