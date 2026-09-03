---
title: "Analyser Ses Performances de Trading : Les Indicateurs Qui Comptent"
description: "Le taux de réussite seul peut être trompeur. Apprenez l'espérance, le facteur de profit, le ratio gain/perte, le drawdown et la taille d'échantillon."
date: 2026-08-03
tags: ["Analyses", "Gestion du Risque"]
slug: "analyser-ses-performances-de-trading"
translationOf: "analyze-trading-performance-metrics"
---

Vous terminez une semaine de trading d'entraînement, ouvrez la page Analytics, et voyez un taux de réussite de 68%. C'est plutôt satisfaisant. Puis vous regardez le P&L total, et il est négatif. Rien n'est cassé — vous venez simplement de découvrir que le chiffre que la plupart des traders citent en premier est celui qui vous renseigne le moins.

La [page Analytics](/fr/analytics/) de Stockade calcule six chiffres clés à partir de vos trades clôturés : P&L total, capitaux propres, taux de réussite, facteur de profit, gain moyen et drawdown maximum. En dessous se trouvent trois onglets — une courbe d'équité, un journal de trading et une heatmap du taux de réussite par heure. Voici ce que signifie chacun d'eux, et lesquels peuvent vous mentir.

## Pourquoi un taux de réussite de 70% peut perdre de l'argent, alors qu'un taux de 35% en gagne

Le taux de réussite est la part de vos trades clôturés terminés avec un P&L positif. Sur Stockade, c'est le nombre de trades gagnants divisé par le nombre total de trades, et un trade qui se clôture exactement à plat est compté du côté des pertes — les trades neutres tirent donc légèrement le chiffre vers le bas.

Le problème, c'est qu'il ne dit rien sur la *taille* des gains et des pertes. Prenons deux traders, chacun avec 100 trades clôturés.

<div class="table-wrap">

| | Trader A | Trader B |
|---|---|---|
| Taux de réussite | 70% | 35% |
| Gain moyen | $50 | $300 |
| Perte moyenne | $150 | $80 |
| Ratio gain/perte (gain moyen ÷ perte moyenne) | 0.33 | 3.75 |
| Taux de réussite nécessaire pour atteindre l'équilibre | 75% | 21% |
| **Espérance par trade** | **−$10** | **+$53** |

</div>

Le trader A gagne près de trois fois sur quatre et perd de l'argent. Le trader B se trompe deux fois sur trois et fait fructifier son capital. Sur ces 100 trades, A perd environ $1,000 et B gagne environ $5,300. En vous fiant uniquement à la carte du taux de réussite, vous copieriez le mauvais trader.

## L'espérance : le chiffre qui vous dit si votre système est rentable

L'espérance est le résultat moyen en dollars que vous devez attendre d'un seul trade, sur un grand nombre de trades. La formule :

```
Expectancy = (Win rate × Average win) − (Loss rate × Average loss)
```

La perte moyenne s'utilise comme un nombre positif. Appliquons-la aux deux traders.

**Trader A :** 0.70 × $50 = $35 de gain attendu. 0.30 × $150 = $45 de perte attendue. $35 − $45 = **−$10 par trade.** Chaque trade que prend A a une valeur attendue négative. Trader davantage ne fait qu'aggraver les choses, plus vite.

**Trader B :** 0.35 × $300 = $105. 0.65 × $80 = $52. $105 − $52 = **+$53 par trade.**

Stockade n'affiche pas l'espérance, mais vous pouvez la calculer en quelques secondes à partir du taux de réussite, du gain moyen, et de la perte moyenne que vous déduisez du journal. Faites ce calcul avant de tirer toute autre conclusion. Une stratégie à espérance négative ne peut pas être corrigée en tradant plus souvent ou en augmentant la taille des positions — la taille ne fait que changer la vitesse à laquelle l'arithmétique se déroule.

Le chiffre associé est le **taux de réussite d'équilibre**, égal à `1 ÷ (1 + ratio gain/perte)`. Le ratio gain/perte du trader B est 300 ÷ 80 = 3.75, donc B atteint l'équilibre à 1 ÷ 4.75 = 21% et gagne 35% du temps. Le ratio gain/perte du trader A est 50 ÷ 150 = 0.33, donc A a besoin de 75% et n'atteint que 70%. Cet écart de cinq points fait toute la différence entre les deux comptes.

### Les multiples de R : l'unité qui rend les trades comparables entre eux

Un gain de $60 sur un trade où vous avez risqué $600 est un événement très différent d'un gain de $60 où vous avez risqué $40, mais la colonne P&L du journal affiche les deux comme `+$60.00`. Définissez 1R comme le montant en dollars que vous mettez en risque à l'entrée — prix d'entrée moins prix du stop, multiplié par le nombre d'actions — puis exprimez chaque résultat comme un multiple de cette unité. Risquez $200, gagnez $500 : +2.5R. Risquez $200, perdez $180 : −0.9R.

Exprimé en R, vous pouvez faire la moyenne entre différents symboles et différentes tailles de position sans distorsion. L'espérance du trader B est 0.35 × 3.75R − 0.65 × 1R = 1.3125 − 0.65 = **+0.66R par trade** — un chiffre qui résiste aux changements de taille de compte, ce qui en fait la façon la plus propre de comparer ce mois-ci au précédent. Cela suppose que vous dimensionnez vos positions de façon cohérente, ce qui est l'argument en faveur d'une [règle de dimensionnement de position à pourcentage fixe](/blog/risk-management-position-sizing).

## Le facteur de profit, le gain moyen et la perte moyenne

Le facteur de profit est le profit brut divisé par la perte brute sur l'ensemble des trades clôturés. Si vos trades gagnants ont rapporté ensemble $10,500 et vos trades perdants ont coûté $6,200, le facteur de profit est 10,500 ÷ 6,200 = **1.69** — pour chaque dollar perdu, $1.69 a été gagné. Toute valeur supérieure à 1.0 est nette positive, et la carte de Stockade l'affiche avec deux décimales et un suffixe `x`.

Lecture rapide : en dessous de 1.0, vous perdez ; entre 1.0 et 1.3, c'est marginal et pourrait facilement n'être que du bruit ; entre 1.3 et 2.0, c'est un edge respectable sur un échantillon correct ; et bien au-dessus de 2.5 sur un petit échantillon, c'est généralement de la chance. Si la carte affiche `∞`, c'est que vous n'avez pas encore enregistré de trade perdant — un constat sur la taille de l'échantillon, pas sur votre compétence.

Une particularité : la ligne de KPI affiche le **Gain Moyen**, mais pas la perte moyenne. Vous obtenez la perte moyenne à partir du journal en additionnant les entrées de P&L négatives et en divisant par le nombre de trades perdants, que l'onglet Aperçu vous donne directement. Vous en avez besoin à la fois pour l'espérance et pour le ratio gain/perte, alors ne sautez pas cette étape.

## Le drawdown maximum : l'indicateur qui décide si vous pouvez tenir une stratégie

Le drawdown maximum est la plus grande chute de vos capitaux propres entre un sommet et un creux, exprimée en pourcentage. Stockade le calcule en parcourant vos trades clôturés dans l'ordre, en suivant le plus haut niveau atteint (high-water mark), et en enregistrant la pire chute en pourcentage sous ce niveau.

Disons que vous faites passer $100,000 à un sommet de $112,000, puis qu'une série de pertes vous ramène à $94,080. Cela représente $17,920 de moins que le sommet de $112,000, donc le drawdown maximum est de 16.0%. Notez ce que coûte la récupération : remonter de $94,080 à $112,000 exige un **gain de 19.05%**, pas 16%. Les drawdowns sont asymétriques, et les plus profonds sont brutaux — une baisse de 50% exige une hausse de 100%.

C'est l'indicateur qui décide si une stratégie est utilisable *par vous*. Un système avec une forte espérance mais un drawdown de 40% est un système que la plupart des gens abandonnent au plus bas, transformant un drawdown théorique en perte réelle. Une réserve : Stockade le calcule uniquement à partir des trades clôturés, donc une position ouverte profondément dans le rouge n'apparaît pas tant que vous ne l'avez pas clôturée.

## Ce que la forme de votre courbe d'équité vous apprend

L'onglet Courbe d'Équité trace votre solde cumulé après chaque trade clôturé, en partant de $100,000, avec le minimum et le maximum indiqués en dessous. La plupart des gens ne lisent que le dernier point. La forme en dit bien plus.

Une courbe qui progresse lentement avec des creux courts et peu profonds traduit une espérance constante et une taille de perte maîtrisée. Une courbe plate pendant de longues périodes puis qui bondit verticalement signifie qu'une poignée de trades a produit presque tout le profit — retirez-les, et il ne reste rien. Un escalier qui monte puis rend systématiquement un gros bloc de gains est la signature d'un trader qui coupe ses gagnants trop tôt et laisse courir ses perdants. Et une ligne quasi verticale sans repli, sur peu de trades, n'est pas une découverte ; c'est un petit échantillon.

Le graphique s'ajuste aussi automatiquement à votre propre minimum et maximum, si bien qu'une variation de $300 et une variation de $30,000 produisent des courbes tout aussi spectaculaires l'une que l'autre. Vérifiez les étiquettes avant de réagir à la pente.

## Taille d'échantillon : pourquoi moins de 100 trades ne prouve presque rien

C'est là que la plupart des auto-analyses déraillent. Supposons que vous ayez 40 trades clôturés et un taux de réussite de 50%. L'erreur type de cette estimation est :

```
SE = sqrt(0.5 × 0.5 / 40) = sqrt(0.00625) = 0.079 → 7.9 percentage points
```

Un intervalle approximatif à 95% correspond à environ deux erreurs types de chaque côté, donc votre véritable taux de réussite à long terme pourrait plausiblement se situer n'importe où entre environ **34% et 66%**. Cette plage contient à la fois un très bon système et un très mauvais. Quarante trades ne vous ont presque rien appris.

L'erreur type diminue avec la racine carrée du nombre de trades, donc diviser cette plage par deux exige quatre fois plus de trades — à 160 trades, l'erreur type descend à environ 4.0 points. C'est pourquoi environ 100 trades clôturés est le plancher habituel avant de tirer des conclusions, et pourquoi l'erreur d'analyse la plus courante est le surajustement : réécrire ses règles après huit mauvais trades, alors que huit trades ne sont que du bruit pur. Décidez à l'avance combien de trades vous accordez à un changement de règle avant de le juger, et inscrivez cela dans [votre plan de trading](/blog/how-to-build-a-trading-plan).

## Trouver ses meilleures heures avec la heatmap horaire

L'onglet Heatmap Horaire croise les jours de la semaine avec les heures de 9h00 à 20h00 et colore chaque case selon le taux de réussite sur ce créneau : vert à partir de 65%, rouge en dessous de 50%, neutre entre les deux, et un tiret là où vous n'avez aucun trade. Survolez une case pour voir le nombre de trades.

Cela répond à une question réellement utile : vos trades de l'après-midi financent-ils discrètement ceux du matin ? Deux mises en garde. Les cases se colorent uniquement selon le taux de réussite, donc une case verte peut encore correspondre à une heure perdante si ces gains sont minuscules — vérifiez le P&L du journal pour ce créneau. Et les échantillons par case sont minuscules : quatre trades avec trois gagnants affiche 75% et ne veut rien dire. Attendez 20 ou 30 trades sur un créneau avant d'y voir un schéma. Les heures affichées sont l'heure locale de votre navigateur, pas une session de bourse.

## Ce que le journal de trading enregistre, et ce que vous devez noter vous-même

Le journal affiche huit colonnes par trade clôturé : Symbole, Direction, Entrée, Sortie, Quantité, P&L, Durée et Date, du plus récent au plus ancien. C'est un enregistrement complet de *ce que* vous avez fait.

Il n'a ni champ de notes ni champ de raisonnement. Rien ne capture pourquoi vous êtes entré, quel setup vous pensiez voir, ou si vous avez suivi vos propres règles — et la question de revue la plus précieuse n'est pas « quels trades ont perdu de l'argent » mais « quels trades ont enfreint mes règles », car un trade qui enfreint les règles mais gagne par hasard est plus dangereux qu'une perte disciplinée. Tenez un document séparé consignant le setup, le stop et l'objectif prévus, et une ligne indiquant si vous avez exécuté le plan, puis reliez-le au journal par symbole et horodatage. Cette habitude distingue la pratique délibérée du [simple fait de cliquer sur des boutons](/blog/paper-trading-guide), et elle fait apparaître les [erreurs répétitives](/blog/common-day-trading-mistakes) qu'aucun tableau de bord ne peut détecter.

Deux limites. Les données vivent dans le stockage local de votre navigateur, donc effacer les données du site efface votre historique. Plus important encore, ces indicateurs mesurent votre prise de décision, pas votre tempérament. Les prix de Stockade sont synthétiques, il n'y a pas de spread bid-ask, et aucun argent réel n'est en jeu. Un drawdown de 16% sur une courbe simulée est un chiffre ; le même drawdown avec votre propre capital est une expérience physique, et la discipline qui tient parfaitement ici s'effondre régulièrement là-bas.

## Pratiquez cela sur le simulateur

Prenez 20 trades, puis ouvrez la page Analytics et calculez votre espérance à la main à partir des cartes taux de réussite et gain moyen, plus la perte moyenne que vous déduisez du journal — notez la réponse avant de regarder le P&L total. Continuez ensuite jusqu'à 100 trades et recalculez-la, en observant à quel point le chiffre a bougé. Ce mouvement, c'est l'erreur type ci-dessus, rendue concrète.

[Ouvrez le simulateur](/fr/simulator/) et commencez à enregistrer des trades qui valent la peine d'être analysés.
