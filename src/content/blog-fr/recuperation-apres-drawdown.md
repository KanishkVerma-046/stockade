---
title: "Drawdown : Pourquoi une Perte de 50% Exige un Gain de 100%"
description: "Une perte de 50% exige un gain de 100%, mais en combien de trades récupère-t-on ? Séries de pertes, frein de volatilité et limite de drawdown fixée d'avance."
date: 2026-11-02
author: "Stockade Team"
tags: ["Gestion du Risque", "Analyses"]
slug: "recuperation-apres-drawdown"
translationOf: "drawdown-recovery-math"
---

Perdez la moitié d'un compte de $10,000 et il vous reste $5,000. Pour revenir à $10,000, vous devez doubler ce qui reste, soit un gain de 100%. Cette phrase est souvent citée. Les questions qui suivent comptent davantage : combien de trades faut-il pour remonter, jusqu'où une série de pertes risque-t-elle de vous faire descendre, et quel drawdown accepter avant même d'en avoir connu un ?

Cet article passe ces chiffres en revue. Tout ce qui suit est de l'arithmétique sur des chiffres hypothétiques. Rien de tout cela n'est rassurant, et c'est justement pourquoi il vaut la peine de faire ces calculs avant d'en avoir besoin plutôt qu'au milieu d'un mauvais mois.

## La formule de récupération en une ligne

Un drawdown est la chute entre le point le plus haut de votre compte (son sommet) et un creux ultérieur, exprimée en pourcentage de ce sommet. Si vous êtes en baisse d'une fraction *D*, le gain nécessaire pour revenir au sommet est :

```
Gain nécessaire = D ÷ (1 − D)
```

Une baisse de 20% exige 0.20 ÷ 0.80 = 25%. Une baisse de 50% exige 0.50 ÷ 0.50 = 100%. L'écart se creuse vite, parce que chaque perte réduit la base sur laquelle vous réalisez la récupération. [Le guide du dimensionnement de position](/fr/blog/gestion-du-risque-et-dimensionnement-de-position/) donne le tableau complet de 10% à 75%, nous ne le répéterons donc pas. Ce qu'un pourcentage ne peut pas vous dire, c'est combien de temps prend la récupération ; le reste de cet article la mesure donc en trades.

## La récupération mesurée en trades, pas en pourcentage

Pour convertir un pourcentage en nombre de trades, il vous faut une stratégie. Prenons-en une hypothétique : elle gagne 40% du temps, les gains rapportent 2R et les pertes coûtent 1R, R étant le montant risqué par trade. Son espérance est de 0.40 × 2 − 0.60 × 1 = +0.2R par trade. (Si ce calcul est nouveau pour vous, [le guide du ratio risque/rendement](/fr/blog/ratio-risque-rendement-et-esperance/) le détaille.) Risquez 1% du compte par trade et elle rapporte en moyenne 0.2% par trade.

Appliquez ensuite la composition, car lorsque vous risquez un pourcentage fixe, chaque trade est dimensionné sur le solde actuel, plus petit. En moyenne, voici combien de trades il faut pour remonter :

<div class="table-wrap">

| Drawdown | Gain nécessaire | Trades pour récupérer à 1% de risque | Trades pour récupérer à 2% de risque |
|---|---|---|---|
| 10% | 11.1% | environ 56 | environ 30 |
| 20% | 25.0% | environ 118 | environ 63 |
| 30% | 42.9% | environ 189 | environ 100 |
| 50% | 100.0% | environ 367 | environ 194 |

</div>

Deux choses ressortent. D'abord, un drawdown de 20% à 1% de risque coûte bien plus d'une centaine de trades à une stratégie qui *fonctionne*. Si vous prenez trois trades par jour, cela représente environ deux mois de trading simplement pour revenir à votre point de départ.

Ensuite, la colonne à 2% paraît plus rapide, et c'est un piège. La bonne comparaison n'est pas le même drawdown à deux niveaux de risque, car la même mauvaise série creuse un trou plus profond à 2%. Faites passer une même série de dix pertes à chaque niveau :

<div class="table-wrap">

| Risque par trade | Drawdown après 10 pertes consécutives | Trades pour remonter |
|---|---|---|
| 1% | 9.6% | environ 53 |
| 2% | 18.3% | environ 57 |
| 5% | 40.1% | environ 70 |

</div>

Doubler votre risque double le trou et double à peu près votre vitesse, donc la remontée prend à peu près le même nombre de trades. Poussez le risque plus haut et c'est pire, pas mieux, pour une raison que nous verrons avec le frein de volatilité. Une taille plus grande ne vous achète pas une récupération plus rapide. Elle vous achète un drawdown plus profond.

Ces chiffres sont des moyennes. Les séquences réelles fluctuent : certaines remontent plus tôt, et une séquence malchanceuse peut prendre bien plus longtemps.

## Quelle longueur de série de pertes prévoir

Le guide du dimensionnement de position calcule les probabilités d'une série particulière. Pour planifier, une question plus utile est de savoir jusqu'où la *pire* série sur un ensemble de trades risque d'aller. Pour notre stratégie à 40% de réussite, voici la probabilité de connaître au moins une série de pertes au moins aussi longue :

<div class="table-wrap">

| Série d'au moins | Sur 100 trades | Sur 200 trades | Sur 500 trades |
|---|---|---|---|
| 6 pertes | 87% | 98% | ~100% |
| 8 pertes | 49% | 75% | 97% |
| 10 pertes | 20% | 38% | 71% |
| 12 pertes | 8% | 15% | 35% |
| 14 pertes | 3% | 6% | 14% |

</div>

Ces chiffres proviennent de la probabilité exacte d'une série, chaque trade étant indépendant du précédent. Sur 500 trades, une série de dix pertes est plus probable qu'improbable. Et il s'agit d'une stratégie à espérance positive. Rien n'est cassé chez elle quand cette série arrive.

Les échantillons plus longs produisent des séries plus longues. Cela paraît évident, mais cela piège les gens : une série que vous n'avez jamais vue sur vos 100 premiers trades ne dit rien sur la question de savoir si vous la verrez sur les 400 suivants.

## Le frein de volatilité : pourquoi un rendement moyen surestime ce que vous gardez

Voici la partie la plus étrange des maths du drawdown. Gagnez 50% puis perdez 50%, et votre rendement moyen est nul. Votre compte, lui, est en baisse de 25%, car 1.50 × 0.50 = 0.75. Gagnez 10% puis perdez 10% et vous êtes en baisse de 1% (1.10 × 0.90 = 0.99). Gagnez 20% puis perdez 20% et vous êtes en baisse de 4%.

Cet écart entre le rendement moyen et le rendement composé est [souvent appelé frein de volatilité (*volatility drag*), et on peut l'approcher en soustrayant de la moyenne la moitié de la variance](https://www.kitces.com/blog/volatility-drag-variance-drain-mean-arithmetic-vs-geometric-average-investment-returns/) :

```
Rendement composé par période ≈ rendement moyen − (variance ÷ 2)
```

où la variance mesure l'amplitude avec laquelle les résultats s'écartent de leur moyenne. Les petites variations freinent à peine. Les grandes freinent fortement, car la pénalité croît avec le carré de la variation.

Appliquons cela à notre stratégie. Son gain moyen par trade est de 0.2R, donc si vous ne regardiez que les moyennes, risquer plus voudrait toujours dire gagner plus. La composition dit le contraire :

<div class="table-wrap">

| Risque par trade | Gain moyen par trade | Gain composé par trade |
|---|---|---|
| 1% | 0.20% | 0.19% |
| 2% | 0.40% | 0.36% |
| 5% | 1.00% | 0.74% |
| 10% | 2.00% | 0.98% |
| 15% | 3.00% | 0.75% |
| 20% | 4.00% | 0.07% |
| 25% | 5.00% | −1.04% |

</div>

À 25% de risque par trade, une stratégie à espérance positive perd de l'argent avec le temps. La moyenne indique toujours +5% par trade, mais ce que vous gardez réellement diminue à chaque trade. Pour cette stratégie, la croissance culmine à 10% de risque. Ce pic s'appelle la fraction de Kelly, d'après [un article de 1956 de J. L. Kelly Jr.](https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf) montrant qu'un parieur qui mise à chaque fois la fraction maximisant la croissance finira par devancer celui qui mise n'importe quelle autre fraction fixe, et restera devant. Le Kelly complet suppose que vous connaissez exactement votre véritable taux de réussite et votre ratio gain/perte, ce qui n'est jamais le cas en pratique. Nous ne nous en approcherions pas : à 10% de risque, une série de dix pertes emporte 65% du compte, et la formule de récupération indique qu'il faut alors un gain de 187%.

C'est aussi pourquoi les chiffres de « trades pour remonter » augmentent à 5%. Le frein ronge la vitesse de récupération, alors que les pertes restent tout aussi profondes.

## Choisissez votre drawdown maximal avant d'en avoir besoin

Tous les chiffres ci-dessus vont dans le même sens : décidez à tête reposée jusqu'où vous êtes prêt à descendre, puis déduisez-en un niveau de risque. Trois étapes :

1. **Choisissez le drawdown que vous supporteriez sans cesser de trader.** Soyez honnête. Si une chute de 20% vous ferait abandonner la stratégie, c'est votre chiffre, quoi qu'en dise un livre.
2. **Choisissez la série que vous prévoyez.** D'après le tableau des séries, une série de 12 pertes a environ une chance sur trois de se produire sur 500 trades pour notre stratégie. C'est un scénario de planification raisonnable.
3. **Calculez le risque par trade.** Il faut que (1 − risque)^série reste au-dessus de 1 − drawdown. Pour une limite de 20% et une série de 12 pertes, risque ≤ 1 − 0.80^(1/12) = **1.84%**. Prévoyez 14 pertes et cela donne 1.58%.

Gardez ensuite une marge. Un drawdown réel est généralement plus profond que sa plus longue série, car les pertes arrivent en grappes avec quelques petits gains intercalés, et le compte continue de glisser pendant tout ce temps. Diviser par deux le chiffre calculé, pour arriver ici à moins de 1%, est un point de départ défendable.

Enfin, notez ce qui se passe à chaque palier : par exemple, réduire le risque de moitié à −10% et arrêter de trader pour faire le point à −15%. Réduire la taille ralentit la remontée, puisqu'à 1% au lieu de 2% un drawdown de 10% demande environ 56 trades au lieu de 30. Mais cela limite les dégâts de la prochaine série, celle que vous ne pouvez pas voir venir. La règle la plus importante est celle contre laquelle [le guide des erreurs en day trading](/fr/blog/erreurs-courantes-en-day-trading/) met en garde sous l'autre angle : n'augmentez jamais la taille pour vous refaire d'un drawdown. Inscrivez ces chiffres dans [votre plan de trading](/fr/blog/comment-creer-un-plan-de-trading/) pour qu'ils soient fixés avant que les pertes ne commencent.

## Ce que mesure la carte Drawdown maximal de Stockade

Sur la [page Analyses](/fr/analytics/) de Stockade, le Drawdown maximal parcourt vos trades clôturés dans l'ordre de leur clôture, en partant du solde d'ouverture de $100,000 comme premier sommet. Il enregistre la plus forte chute sous le sommet courant, en pourcentage de ce sommet.

Comme il n'utilise que les trades clôturés, les fluctuations d'une position ouverte n'y apparaissent jamais. Si un trade ouvert fait baisser vos capitaux propres de 8% puis se redresse avant que vous ne le clôturiez, ce creux n'apparaît jamais, et une perte que vous détenez encore ne compte pas tant que vous ne l'avez pas clôturée. Considérez la carte comme une borne inférieure de la profondeur réellement atteinte. [Le guide des indicateurs de performance](/fr/blog/analyser-ses-performances-de-trading/) couvre le reste de la page.

## Pratiquez cela sur le simulateur

Avant votre prochaine session sur le [simulateur](/fr/simulator/), notez trois chiffres : votre risque par trade, la série que vous prévoyez et le drawdown auquel vous réduirez la taille. Dimensionnez chaque trade sur le solde actuel, pas sur le solde de départ. Après 50 trades, comparez le Drawdown maximal sur [Analyses](/fr/analytics/) avec ce que votre plan autorisait, et comptez à la main votre plus longue série de pertes dans l'onglet Journal. Les prix de Stockade sont générés dans votre navigateur et son argent est virtuel, donc un drawdown n'y est qu'un chiffre sur un écran. L'arithmétique de la remontée est la même, et l'habitude de fixer vos limites à l'avance est ce qui vaut la peine d'être transposé dans le trading réel.
