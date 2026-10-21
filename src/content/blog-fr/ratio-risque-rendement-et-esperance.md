---
title: "Ratio Risque/Rendement et Espérance : Ce Qui Les Relie"
description: "Le ratio risque/rendement ne donne que le taux de réussite d'équilibre. Tableau, effet du stop et de l'objectif, et pourquoi 1:3 n'est qu'une règle empirique."
date: 2026-10-26
author: "Stockade Team"
tags: ["Gestion du Risque", "Stratégie"]
slug: "ratio-risque-rendement-et-esperance"
translationOf: "risk-reward-ratio-expectancy"
---

L'une des premières règles que rencontrent les nouveaux traders est « ne prenez que des trades avec un ratio risque/rendement d'au moins 1:3 ». Vous achetez donc une action hypothétique à $40, placez votre stop à $39 et votre objectif à $43, et vous avez le sentiment d'agir de façon responsable. Vous risquez $1 pour gagner $3. Difficile de trouver à redire.

Le problème, c'est que le ratio ne vous a pas dit si le trade est bon. À lui seul, il en est incapable. Un ratio risque/rendement n'est que la moitié d'un calcul, et l'autre moitié est celle que l'on saute : la fréquence à laquelle l'objectif est réellement atteint avant le stop.

## Ce que mesure un ratio risque/rendement, et ce qu'il laisse de côté

Le ratio compare deux distances. Le risque, c'est l'entrée moins le stop : $40 − $39 = $1 par action. Le rendement, c'est l'objectif moins l'entrée : $43 − $40 = $3 par action. Divisez le rendement par le risque et vous obtenez 3, que l'on écrit 1:3 ou 3:1 selon les habitudes. Ici, nous l'écrirons 1:3, risque d'abord, et nous mesurerons le rendement en unités de risque : le rendement de ce trade est de 3R, où 1R correspond à ce que vous risquez de perdre. Si les multiples de R sont nouveaux pour vous, [le guide du dimensionnement de position](/fr/blog/gestion-du-risque-et-dimensionnement-de-position/) les explique.

Ce que le ratio laisse de côté, c'est la probabilité. Un trade en 1:3 qui atteint son objectif une fois sur dix est un mauvais trade. Un trade en 1:1 qui atteint son objectif six fois sur dix est un bon trade. Le ratio ne vous permet pas de savoir lequel des deux vous tenez, car il porte sur des prix que vous avez choisis, pas sur ce que le marché fera probablement.

## Le taux de réussite d'équilibre pour chaque ratio risque/rendement

Voici la chose utile qu'un ratio vous dit bel et bien. Sur un grand nombre de trades, vous gagnez 3R à chaque gain et perdez 1R à chaque perte. Vous êtes à l'équilibre quand les deux s'annulent. Si votre taux de réussite est *w*, cela donne w × 3 = (1 − w) × 1, d'où w = 1 ÷ 4, soit 25%. La version générale, pour un rendement de R unités de risque :

```
Taux de réussite d'équilibre = 1 ÷ (1 + R)
```

C'est la même formule que celle utilisée par [le guide des indicateurs de performance](/fr/blog/analyser-ses-performances-de-trading/) pour le ratio gain/perte, appliquée avant le trade plutôt qu'après. La voici pour les ratios courants :

<div class="table-wrap">

| Risque/rendement | Gain pour $1 risqué | Taux de réussite d'équilibre |
|---|---|---|
| 1:0.5 | $0.50 | 66.7% |
| 1:1 | $1.00 | 50.0% |
| 1:1.5 | $1.50 | 40.0% |
| 1:2 | $2.00 | 33.3% |
| 1:3 | $3.00 | 25.0% |
| 1:4 | $4.00 | 20.0% |
| 1:5 | $5.00 | 16.7% |

</div>

Lisez-le comme une étiquette de prix. Choisir 1:3 ne vous fait pas gagner d'argent. Cela place la barre à 25% : gagnez plus souvent que cela et la stratégie gagne de l'argent en moyenne, gagnez moins souvent et elle en perd. Que vous franchissiez la barre dépend du setup, pas du ratio.

L'écart entre votre taux de réussite réel et le taux d'équilibre, c'est votre edge. En R, l'espérance vaut taux de réussite × R − taux de perte × 1. Un taux de réussite de 30% sur des trades en 1:3 donne 0.30 × 3 − 0.70 = +0.20R par trade. Les mêmes 30% sur des trades en 1:2 donnent 0.30 × 2 − 0.70 = −0.10R. Même taux de réussite, résultat opposé.

## Déplacer l'objectif change les probabilités, pas seulement le gain

C'est ici que l'habitude du 1:3 induit les gens en erreur. Quand vous éloignez un objectif, vous n'augmentez pas seulement le rendement. Vous réduisez aussi la probabilité de l'atteindre. Ces deux effets tirent en sens contraire, et il est facile de ne regarder que le premier.

Prenons le cas extrême. Supposons qu'un prix n'ait aucune tendance dans un sens ou dans l'autre, de sorte que chaque petit mouvement ait autant de chances de monter que de descendre, comme une pièce équilibrée. C'est le problème classique de la ruine du joueur en probabilités, et pour une marche de ce type, [la probabilité de monter d'un certain montant avant de baisser d'un autre est égale à la baisse divisée par la somme des deux](https://www.columbia.edu/~ks20/stochastic-I/stochastic-I-GRP.pdf). En termes de trading :

```
P(objectif avant stop) = distance du stop ÷ (distance du stop + distance de l'objectif)
```

Avec un stop à $1 et un objectif à $3, cela fait 1 ÷ 4 = 25%. Exactement le taux de réussite d'équilibre du tableau. Essayez n'importe quelle autre paire et il se passe la même chose : sur un prix sans direction, chaque ratio tombe précisément sur son propre point d'équilibre. Un objectif en 1:5 est atteint 16.7% du temps, un objectif en 1:1 50% du temps, et aucun ne gagne ni ne perd d'argent en moyenne.

Nous pensons que c'est, à lui seul, le fait le plus utile à connaître sur le risque/rendement. Le ratio ne peut pas créer d'edge par lui-même. Les vrais prix ne sont pas des pièces équilibrées, et c'est de là que l'edge peut venir : un setup ne vaut la peine d'être tradé que s'il rend l'objectif *plus* probable que ce niveau de référence. Le ratio fixe la barre. C'est votre raison de prendre le trade qui doit la franchir.

## Pourquoi « jamais moins de 1:3 » n'est qu'une règle empirique

Les règles comme « 1:3 minimum » existent pour une raison valable. Elles vous obligent à fixer un objectif avant d'entrer, et elles vous empêchent de risquer un dollar pour gagner dix centimes. Comme filtre, c'est très bien.

Comme loi, cela ne tient pas. Comparez quatre setups hypothétiques :

<div class="table-wrap">

| Setup | Risque/rendement | Taux de réussite | Équilibre | Espérance par trade |
|---|---|---|---|---|
| A | 1:1 | 60% | 50.0% | 0.60 × 1 − 0.40 = **+0.20R** |
| B | 1:2 | 40% | 33.3% | 0.40 × 2 − 0.60 = **+0.20R** |
| C | 1:3 | 30% | 25.0% | 0.30 × 3 − 0.70 = **+0.20R** |
| D | 1:3 | 22% | 25.0% | 0.22 × 3 − 0.78 = **−0.12R** |

</div>

A, B et C rapportent autant par trade. A ne respecte pas la règle du 1:3 et se porte très bien. D la respecte et perd de l'argent. La règle ne peut pas les distinguer, car elle ne regarde qu'un seul des deux chiffres.

Il y a aussi un coût plus discret. Si l'objectif naturel d'un setup se trouve à deux dollars et que vous en exigez trois, vous avez placé l'objectif au-delà de l'endroit où, selon votre propre idée, le prix ira probablement. Le ratio s'améliore sur le papier tandis que le taux de réussite baisse, souvent davantage que ce que le tableau peut absorber. Quand l'objectif honnête ne donne pas un ratio acceptable, la meilleure décision consiste généralement à laisser passer le trade ou à attendre une entrée plus proche du stop, pas à étirer l'objectif.

## Déplacer le stop change aussi le ratio

Le même compromis joue dans l'autre sens. Gardez l'objectif à $43 et resserrez le stop de $39 à $39.50. Le risque tombe à $0.50, le rendement reste à $3, et le ratio passe de 1:3 à 1:6. Le taux d'équilibre descend de 25% à 1 ÷ 7, soit 14.3%.

Cela ressemble à une amélioration gratuite. Ce n'en est pas une. Un stop deux fois plus proche est touché plus souvent par le bruit ordinaire, et sur le prix sans direction de la section précédente, la probabilité d'atteindre $43 en premier tombe à 0.50 ÷ 3.50 = 14.3%. Retour à l'équilibre. Resserrer le stop n'aide que si le nouveau stop se trouve toujours là où votre idée de trade est prouvée fausse, ce qui est tout l'argument du [placement des stops selon la structure](/fr/blog/ordres-stop-loss-explique/).

Cela change aussi votre taille. Si vous risquez un montant fixe de $200 par trade, un stop à $1 signifie 200 actions, soit une position de $8,000. Un stop à $0.50 signifie 400 actions et $16,000. Le risque en dollars est le même dans les deux cas, mais le stop plus serré exige deux fois plus de capital, alors vérifiez que la position tient dans votre compte avant de supposer que le meilleur ratio vous est accessible.

## Le ratio prévu n'est pas le ratio obtenu

Le ratio que vous notez avant l'entrée est un plan. Celui qui figure dans vos résultats, c'est ce qui s'est passé, et il est généralement moins bon. Quatre facteurs l'érodent :

- **Sorties anticipées.** Prendre vos profits à $41.80 parce que vous êtes devenu nerveux transforme un gain de 3R en gain de 1.8R.
- **Stops déplacés.** Élargir un stop en cours de trade transforme une perte de 1R en perte plus grande.
- **Prix d'exécution.** Sur un marché rapide, un stop peut s'exécuter au-delà de son niveau, si bien qu'un plan à −1R devient −1.1R.
- **Coûts.** La commission et le spread sont retranchés de chaque gain et ajoutés à chaque perte.

Les coûts frappent le plus durement les stops serrés. Disons que les coûts aller-retour sur notre action à $40 s'élèvent à $0.05 par action, un chiffre hypothétique. Avec le stop à $1, un gain rapporte $2.95 net et une perte coûte $1.05, donc l'équilibre passe à 1.05 ÷ (1.05 + 2.95) = 26.25% au lieu de 25%. Avec le stop à $0.50, une perte coûte $0.55 et l'équilibre passe à 0.55 ÷ 3.50 = 15.7% au lieu de 14.3%. Les mêmes cinq centimes, mais ils pèsent plus lourd sur un petit risque.

La solution consiste à mesurer votre ratio réalisé plutôt qu'à vous fier à votre ratio prévu. Le gain moyen divisé par la perte moyenne (sans le signe) est votre véritable ratio gain/perte. Si vous aviez prévu du 1:3 pour $200 de risque mais que votre gain moyen est de $420 et votre perte moyenne de $210, vous tradez en réalité du 1:2. Votre équilibre est à 33.3%, pas à 25%, et un taux de réussite de 28% qui paraissait sain vous fait perdre de l'argent.

## Choisir un objectif en tenant compte du taux de réussite

En rassemblant le tout, voici l'ordre dans lequel nous procéderions :

1. **Placez d'abord le stop,** au prix qui prouve que l'idée est fausse.
2. **Placez l'objectif là où le prix peut réalistement aller,** par exemple au prochain [niveau de support ou de résistance](/fr/blog/niveaux-de-support-et-resistance/), pas à un multiple choisi à l'avance.
3. **Calculez le ratio et son taux d'équilibre** à l'aide du tableau.
4. **Comparez ce taux d'équilibre avec le taux de réussite enregistré** pour ce type de setup, et exigez une marge nette au-dessus. Si vous n'avez que quelques dizaines de trades, ce taux de réussite reste une estimation grossière ; [la section sur la taille d'échantillon](/fr/blog/analyser-ses-performances-de-trading/) explique à quel point.
5. **Si la barre n'est pas franchie, passez votre tour.** Pas d'objectif étiré.

Une fois qu'un trade a passé le filtre, un [ordre bracket](/fr/blog/ordres-oco-et-bracket/) maintient les deux sorties à votre place, si bien que le plan ne dépend pas de votre volonté sur le moment. Et inscrivez votre marge minimale au-dessus de l'équilibre dans [votre plan de trading](/fr/blog/comment-creer-un-plan-de-trading/), pour la fixer une fois pour toutes plutôt que trade par trade.

## Pratiquez cela sur le simulateur

Sur le [simulateur](/fr/simulator/) de Stockade, les champs Stop Loss et Take Profit prennent des prix, et ensemble ils fonctionnent comme un bracket OCO sur votre position ouverte : quand l'un se déclenche, toute la position est clôturée au prix de ce tick et les deux niveaux sont effacés. Il n'y a ni spread ni commission, donc l'écart entre ratio prévu et ratio réalisé y vient de vos propres sorties et des ticks qui franchissent un niveau. Avant chaque trade, notez le ratio et son taux d'équilibre. Après 30 trades, ouvrez [Analyses](/fr/analytics/), divisez le Gain moyen par la Perte moyenne sans le signe moins, et comparez le résultat avec ce que vous aviez prévu, puis votre Taux de réussite avec le taux d'équilibre dont vous aviez besoin. Les prix de Stockade sont générés dans votre navigateur, par une marche aléatoire avec un biais de tendance qui dérive lentement, donc un taux de réussite obtenu là ne dit rien de la façon dont un setup se comporte sur un marché réel. Ce que cela entraîne, en revanche, c'est l'habitude : stop, objectif, ratio, équilibre, à chaque fois.
