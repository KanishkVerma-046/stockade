---
title: "Indicateur RSI : Comment Identifier le Surachat et la Survente"
description: "Un RSI au-dessus de 70 n'est pas un signal de vente. Ce qu'il mesure vraiment, pourquoi le surachat signifie la force, et comment lire la divergence."
date: 2026-04-20
tags: ["Indicateurs"]
slug: "indicateur-rsi-surachat-survente"
translationOf: "rsi-indicator-overbought-oversold"
---

Voici un trade que presque tout le monde fait au moins une fois. Une action a fortement grimpé pendant une semaine. Vous ajoutez le RSI au graphique, le voyez à 78, et vous souvenez de la règle : au-dessus de 70, c'est du surachat, et le surachat signifie vendre. Alors vous la vendez à découvert. Au cours des deux semaines suivantes, l'action gagne encore 22%, le RSI ne descend jamais sous 68, et vous rachetez pour clôturer avec une perte plus grande que le mouvement que vous essayiez de capter.

La règle n'était pas exactement fausse — c'est vous qui aviez une mauvaise idée de ce qu'elle signifie. Un RSI à 78 n'est pas le marché qui vous annonce un retournement à venir. Il vous dit que les acheteurs ont dominé les vendeurs pendant quatorze barres d'affilée, ce qui est une description de la force, pas une prédiction de faiblesse. Le traiter comme un signal de vente revient à parier systématiquement contre la chose la plus forte de l'écran.

## Ce que le RSI mesure réellement

L'indice de force relative (RSI), publié par J. Welles Wilder en 1978, répond à une seule question précise : sur les N dernières barres, comment les hausses moyennes se comparent-elles aux baisses moyennes ? C'est réellement tout ce qu'il fait. Il prend la variation de clôture à clôture de chaque barre sur une fenêtre de calcul — 14 barres par défaut — les sépare en gains et en pertes, fait la moyenne de chaque groupe, et les compare sous forme d'un ratio appelé RS, pour relative strength (force relative) :

```
RS = average gain / average loss
```

Et ce ratio est comprimé sur une échelle de 0 à 100 :

```
RSI = 100 - (100 / (1 + RS))
```

Faisons le calcul. Disons que sur les 14 dernières barres, le gain moyen sur la fenêtre est de $2.40 et la perte moyenne de $1.20. Les hausses ont une taille double de celle des baisses :

- RS = 2.40 / 1.20 = **2**
- RSI = 100 − (100 / (1 + 2)) = 100 − (100 / 3) = 100 − 33.3 = **66.7**

Deux précisions sur ces moyennes. D'abord, elles divisent par la période de calcul complète, pas par le nombre de barres haussières — neuf barres haussières totalisant $21.60 donnent un gain moyen de 21.60 / 14 = $1.54, et non $2.40. Ensuite, après le premier calcul, Wilder utilise une moyenne mobile lissée plutôt que de tout recalculer depuis le début : chaque nouvelle moyenne est l'ancienne moyenne multipliée par 13, plus la valeur de la barre la plus récente, le tout divisé par 14. Ce lissage explique pourquoi le RSI bouge de façon moins saccadée que le prix brut.

## Pourquoi l'échelle de 0 à 100 n'est pas linéaire comme on pourrait s'y attendre

La formule comprime un ratio non borné dans une plage bornée, et elle le fait de façon inégale. Trois points de repère méritent d'être mémorisés :

<div class="table-wrap">

| Condition | RS | RSI |
|---|---|---|
| Le gain moyen égale la perte moyenne | 1.00 | 50.0 |
| Le gain moyen vaut 2.33× la perte moyenne | 2.33 | 70.0 |
| Le gain moyen vaut 0.43× la perte moyenne | 0.43 | 30.0 |

</div>

Vérifiez la ligne du milieu : 1 + 2.333 = 3.333, et 100 / 3.333 = 30, donc RSI = 100 − 30 = 70. La dernière ligne : 1 + 0.4286 = 1.4286, et 100 / 1.4286 = 70, donc RSI = 30.

Remarquez ce que cela signifie. Pour afficher 70, les hausses n'ont besoin d'être qu'un peu plus du double des baisses — une condition courante, pas extrême. Au-delà de ce point, l'échelle se comprime fortement : passer de 70 à 90 exige que le RS passe de 2.33 à 9, un changement bien plus important du marché sous-jacent que ne le suggère le mouvement de vingt points affiché.

## Pourquoi 70 et 30 sont des conventions, pas des lois

Wilder a choisi 70 et 30. Il aurait pu choisir 75 et 25. Il n'y a aucune dérivation derrière ces chiffres, aucun seuil statistique où le comportement change, aucun mécanisme qui s'active à 70.0 et se désactive à 69.9. Ce sont des chiffres ronds qui paraissaient raisonnables sur les graphiques qu'il étudiait dans les années 1970, et ils sont restés parce que tout le monde a repris ces valeurs par défaut. La plupart des logiciels de graphiques tracent ces lignes pour vous, ce qui renforce silencieusement l'idée qu'il s'agit de frontières. Le graphique de Stockade fait de même — passez le panneau inférieur en RSI et vous obtenez des lignes pointillées à 70 et 30. Ce sont des repères, pas des verdicts.

Il en va de même pour la période de calcul de 14. Un réglage plus court comme 7 réagit plus vite et atteint constamment les extrêmes ; un réglage plus long comme 21 y arrive rarement. La période change la fréquence à laquelle vous voyez un signal, pas sa fiabilité — le même arbitrage qui régit [le choix de la longueur d'une moyenne mobile](/blog/moving-averages-ema-vs-sma).

## Surachat signifie fort, pas « sur le point de se retourner »

C'est le point sur lequel le trade d'ouverture s'est trompé, et cela mérite sa propre arithmétique.

Imaginez une forte tendance haussière : sur la période de calcul, 12 barres ont clôturé en hausse et 2 en baisse. Les gains totalisent $28.00, les pertes $2.80.

- Gain moyen = 28.00 / 14 = **$2.00**
- Perte moyenne = 2.80 / 14 = **$0.20**
- RS = 2.00 / 0.20 = **10**
- RSI = 100 − (100 / 11) = 100 − 9.1 = **90.9**

Demandez-vous maintenant ce qu'il faudrait pour ramener le RSI sous 70. D'après le tableau ci-dessus, le RS doit chuter de 10 à 2.33 — les pertes moyennes devraient plus que quadrupler par rapport aux gains moyens. Dans une moyenne lissée sur 14 barres, cela demande de nombreuses barres avec un comportement réellement différent. Cela n'arrive pas parce que l'action a eu un chandelier rouge.

Le RSI ne se contente donc pas de *tolérer* de rester au-dessus de 70 dans une tendance ; il y est arithmétiquement figé jusqu'à ce que la nature du mouvement change. Les traders appellent cela l'« embedding » du RSI. Une lecture à 90 signifie que la tendance est exceptionnellement propre, et une tendance propre est bien la dernière chose contre laquelle il faut se positionner.

Il existe une version plus subtile du même piège. Supposons que le RSI soit à 66.7 (gain moyen $2.40, perte moyenne $1.20) et que la barre suivante clôture en hausse de $1.00. Appliquons le lissage : le nouveau gain moyen est (2.40 × 13 + 1.00) / 14 = 32.20 / 14 = $2.30, et la nouvelle perte moyenne est (1.20 × 13 + 0) / 14 = 15.60 / 14 = $1.114. RS = 2.30 / 1.114 = 2.064, donc RSI = 100 − (100 / 3.064) = **67.4**.

Le prix a monté et le RSI a à peine bougé, parce que le gain était plus petit que le gain moyen mobile. Le RSI suit le momentum, pas le prix. Il peut dériver latéralement ou baisser pendant que le prix atteint de nouveaux plus hauts — ce qui est exactement la configuration que l'on appelle divergence.

## Comment lire la divergence du RSI

La divergence est un désaccord entre le prix et le momentum.

**Divergence baissière :** le prix fait un plus haut plus élevé, le RSI fait un plus haut plus bas. Le prix est allé plus loin, mais avec moins de force derrière lui que la fois précédente.

**Divergence haussière :** le prix fait un plus bas plus bas, le RSI fait un plus bas plus haut. Les vendeurs ont de nouveau poussé le prix vers le bas, mais avec moins de conviction.

Pour en lire une, repérez deux points de swing de même nature sur le prix — deux plus hauts nets, ou deux plus bas nets — et comparez le RSI à chacun. Cela ne compte que si les deux swings sont comparables avec un vrai repli entre eux ; tracer des lignes entre des barres arbitraires produit une divergence sur presque n'importe quel graphique, ce qui explique pourquoi elles sont si faciles à repérer a posteriori.

Soyons francs sur le taux de réussite : la divergence échoue souvent, et elle échoue le plus mal précisément là où elle semble la plus tentante. Une tendance forte affichera trois ou quatre divergences baissières pendant sa montée, et seule la dernière signifie quelque chose — chacune des précédentes est un piège qui coûte de l'argent. Traitez la divergence comme une raison de resserrer un stop ou d'arrêter d'ajouter à une position gagnante, pas comme une entrée autonome contre la tendance. Se positionner contre la force sur un simple signal de divergence est l'une des [habitudes les plus coûteuses que développent les nouveaux traders](/blog/common-day-trading-mistakes).

## Utiliser la ligne des 50 comme filtre de tendance

Le niveau de RSI le plus utile est celui que personne ne trace. Le RSI 50 est le point où les gains moyens égalent exactement les pertes moyennes. Au-dessus, ce sont les hausses qui l'emportent ; en dessous, ce sont les baisses.

Cela fait de 50 un filtre de régime peu coûteux :

- **RSI durablement au-dessus de 50** — considérez 30 comme inatteignable et arrêtez de chercher des longs en survente. Dans une tendance haussière, les replis ont tendance à se terminer entre 40 et 50.
- **RSI durablement en dessous de 50** — l'image miroir. Les rebonds calent près de 50–60 et n'atteignent jamais 70.

Cette asymétrie est plus exploitable que les extrêmes. Dans une tendance haussière, un creux du RSI à 45 qui tient et se retourne à la hausse marque la fin d'un repli à l'intérieur d'une tendance forte. Attendre 30 dans ce cas revient à attendre une lecture que la tendance ne produira pas.

### Décaler les seuils à 80/20

Une fois que vous acceptez que les seuils sont des conventions, les ajuster devient évident. Sur un marché fortement tendanciel, déplacez les bandes à 80 et 20. Vous obtenez beaucoup moins de signaux, et ceux que vous obtenez marquent des lectures réellement inhabituelles plutôt qu'une force de tendance routinière. Sur un marché en range, le réglage par défaut 70/30 fonctionne mieux, car le retour à la moyenne y est réellement le comportement dominant.

L'ordre compte : identifiez d'abord le régime, puis choisissez les seuils. Utiliser le RSI pour déterminer le régime, puis utiliser ce même RSI pour trader contre lui, est un raisonnement circulaire.

## Ce que le RSI ne peut pas faire

Le RSI est construit entièrement à partir de prix de clôture que vous avez déjà vus. C'est une mesure retardée et dérivée — chaque valeur est un fait sur le passé. Il ne voit pas l'action intra-barre, et ne porte aucune information qui ne soit déjà présente dans la série de prix.

Il n'a pas non plus la moindre notion du *pourquoi* les prix ont bougé. Une lecture de 90.9 issue d'une montée régulière et une issue d'un simple gap paraissent identiques pour la formule. C'est une bonne raison de lire le RSI aux côtés de la structure de prix et du volume, et de savoir en quoi il diffère du [MACD](/blog/macd-explained), qui mesure l'écart entre deux moyennes mobiles plutôt qu'un ratio gain/perte.

## Pratiquez la lecture du RSI sur le simulateur

La façon la plus rapide de désapprendre « 70 signifie vendre » est d'observer le RSI rester au-dessus de 70 pendant quarante barres pendant que le prix grimpe. Ouvrez le [simulateur boursier de Stockade](/fr/simulator/), passez le panneau inférieur du graphique du volume au RSI, et trouvez un segment où la ligne s'embed au-dessus de 70 — puis notez jusqu'où le prix va avant que le RSI ne revienne à 50. Faites aussi l'exercice inverse : repérez chaque divergence baissière sur un graphique montant et comptez combien ont réellement précédé une baisse. Les prix sont générés algorithmiquement plutôt qu'issus de données de marché réelles, mais l'arithmétique de l'indicateur est identique, et ce comptage changera votre façon d'utiliser l'outil.
