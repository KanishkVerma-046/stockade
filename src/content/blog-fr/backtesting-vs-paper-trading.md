---
title: "Backtesting vs Paper Trading : Ce Que Chacun Peut Prouver"
description: "Un backtest dit si des règles ont gagné sur le passé ; le paper trading, si vous savez les suivre. Ce que chacun prouve, le surajustement, et un ordre à suivre."
date: 2026-12-07
author: "Stockade Team"
tags: ["Stratégie", "Bases"]
slug: "backtesting-vs-paper-trading"
translationOf: "backtesting-vs-paper-trading"
---

Vous écrivez une règle, vous la faites tourner sur deux ans de prix passés, et elle gagne de l'argent. Vous ajustez la longueur de la moyenne mobile, et elle en gagne davantage. Puis vous la tradez en temps réel et elle ne donne rien, ou pire. Ou l'inverse : vous faites du paper trading sur un setup pendant un mois, vous terminez dans le vert, et vous en concluez qu'il fonctionne.

Les deux conclusions sautent une étape. Un backtest et une période de paper trading répondent à des questions différentes, et aucun des deux, à lui seul, ne prouve que vous avez un edge. Cet article fait le tri entre ce que chacun peut montrer, les façons dont chacun induit en erreur, et l'ordre dans lequel nous les utiliserions.

## Deux tests qui répondent à des questions différentes

Un **backtest** applique des règles fixes à des prix historiques et enregistre ce qui se serait passé. Il pose la question : *ces règles précises auraient-elles gagné de l'argent sur des données qui existent déjà ?*

Le **paper trading**, aussi appelé forward testing quand on le pratique pour vérifier une stratégie, consiste à trader les règles en temps réel avec de l'argent simulé. Il pose deux autres questions : *pouvez-vous réellement suivre ces règles à mesure que les prix arrivent ?* et *le résultat tient-il sur des données qui n'existaient pas quand vous les avez écrites ?*

<div class="table-wrap">

| | Backtest | Paper trading |
|---|---|---|
| Données | Le passé | Les prix à mesure qu'ils arrivent |
| Vitesse | Des années de trades en quelques minutes | Temps réel, un trade à la fois |
| Taille d'échantillon | Peut être grande | Généralement petite |
| Qui prend les décisions | Les règles, mécaniquement | Vous, sous la pression du temps |
| Principale source d'erreur | Le surajustement et les biais du test | Trop peu de trades, et pas d'argent réel en jeu |

</div>

Les deux sont complémentaires. Un backtest peut montrer qu'une règle avait un edge sur le papier, mais pas que vous l'exécuterez. Le paper trading peut montrer que vous l'exécutez, mais il lui faut longtemps pour réunir assez de trades pour démontrer un edge.

## Comment un backtest vous trompe : le surajustement

Le surajustement (overfitting) consiste à régler des règles jusqu'à ce qu'elles collent au passé particulier sur lequel vous les avez testées, y compris son bruit aléatoire, plutôt qu'à quelque chose qui se répétera. Plus vous essayez de variantes, plus il est probable que la meilleure soit un coup de chance.

Le plus dérangeant, c'est le petit nombre de variantes qu'il faut. Un article de 2014 paru dans les *Notices of the American Mathematical Society*, [« Pseudo-Mathematics and Financial Charlatanism » de Bailey, Borwein, López de Prado et Zhu](https://www.ams.org/notices/201405/rnoti-p458.pdf), en a fait le calcul. Le ratio de Sharpe qu'ils utilisent mesure le rendement par unité de volatilité. Leurs chiffres montrent que même quand aucune des stratégies n'a de véritable edge, essayer seulement sept configurations indépendantes sur un backtest de deux ans suffit pour que la meilleure affiche, en espérance, un ratio de Sharpe annualisé de 1 dans le test, alors que son ratio de Sharpe attendu sur de nouvelles données est nul. Dans un autre exemple, ils ont généré 1,000 prix journaliers sous forme de marche aléatoire, de sorte qu'aucun effet saisonnier ne pouvait exister, et ont tout de même trouvé une stratégie saisonnière avec un ratio de Sharpe de 1.27.

Leur conclusion mérite d'être adoptée comme règle : un backtest qui n'indique pas combien de variantes ont été essayées ne permet pas d'évaluer le surajustement. Tenez donc le compte. Chaque changement de paramètre que vous testez est une variante de plus, y compris celles que vous abandonnez. Si vous avez essayé 30 combinaisons de longueurs de moyenne mobile et de distances de stop pour trouver la gagnante, ses résultats doivent franchir une barre bien plus haute que s'il s'agissait de votre première idée.

Une vérification de plus que nous ferions : regardez les voisines de la gagnante. Si une moyenne mobile sur 17 barres gagne de l'argent mais que celles sur 16 et 18 barres en perdent, le résultat appartient probablement à ce morceau d'histoire plutôt qu'à l'idée. Une règle qui mérite d'être testée plus avant doit encore fonctionner à peu près quand ses réglages bougent un peu.

## Biais d'anticipation, biais du survivant et exécutions idéales

Le surajustement n'est pas la seule façon dont un backtest peut flatter une règle. Trois autres méritent d'être vérifiées à chaque fois.

Le **biais d'anticipation** (look-ahead bias) consiste à utiliser une information que la règle ne pouvait pas avoir au moment où elle a agi. Disons qu'une règle achète à l'ouverture quand la journée clôture au-dessus de sa moyenne sur 20 jours. À l'ouverture, personne ne connaît la clôture. Un backtest qui laisse la règle regarder en avance paraîtra bien meilleur que tout ce que vous pouvez trader.

Le **biais du survivant** consiste à ne tester que des instruments qui existent encore. Si vous testez une stratégie sur actions avec les membres actuels d'un indice, vous avez discrètement retiré toutes les sociétés qui ont fait faillite, ont été radiées de la cote ou sont sorties de l'indice pendant la période de test. Les perdantes ne figurent pas dans vos données, donc les résultats penchent du côté optimiste.

Les **exécutions idéales** consistent à supposer que chaque ordre a été exécuté exactement au prix voulu par la règle, sans spread, commission ni slippage. [Le guide du ratio risque/rendement](/fr/blog/ratio-risque-rendement-et-esperance/) montre comment quelques cents de coût par action peuvent déplacer le taux de réussite d'équilibre d'une stratégie, et ce sont les stratégies à stop serré qui le ressentent le plus.

## Ce que le paper trading prouve et ce qu'il ne peut pas prouver

Le paper trading teste la partie qu'un backtest ne peut pas tester : vous. Savez-vous repérer le setup en temps réel, entrer sans hésiter, laisser le stop tranquille et prendre la sortie que dictent les règles ? Une stratégie qui fonctionne mécaniquement peut échouer ici, parce que la personne qui l'exécute ajoute une part d'appréciation que le backtest n'a jamais eue. Chaque trade se fait aussi, par construction, sur de nouvelles données, donc le forward testing ne peut pas surajuster le passé comme le peut un backtest.

Il a trois limites. D'abord, il est lent, donc les échantillons restent petits. [Le guide des indicateurs de performance](/fr/blog/analyser-ses-performances-de-trading/) montre qu'à 40 trades, un taux de réussite de 50% a un intervalle approximatif à 95% d'environ 34% à 66%, ce qui couvre aussi bien un bon système qu'un mauvais. Ensuite, l'argent n'est pas réel. [Le guide du paper trading](/fr/blog/guide-du-paper-trading/) décrit ce que cela laisse de côté, et en bref, une discipline qui tient avec de l'argent virtuel flanche souvent avec de l'argent réel. Enfin, les exécutions simulées sont généralement plus clémentes que les vraies.

## Comparer les résultats du paper trading avec le backtest

La question utile n'est pas de savoir si le paper trading a gagné de l'argent. C'est de savoir si ses résultats concordent avec ce qu'annonçait le backtest, et sinon, pourquoi.

Voici un cas hypothétique. Un backtest annonce un taux de réussite de 45% sur des trades prévus en 1:2, donc l'espérance vaut 0.45 × 2 − 0.55 × 1 = +0.35R par trade. Vous faites 40 trades en paper trading et en gagnez 15, soit un taux de réussite de 37.5%, et votre gain moyen ressort à 1.8R au lieu de 2R. Votre espérance vaut 0.375 × 1.8 − 0.625 × 1 = +0.05R.

Lisez les deux écarts séparément. L'écart de taux de réussite reste dans le bruit : l'erreur type d'un taux de réussite de 45% sur 40 trades vaut √(0.45 × 0.55 ÷ 40), soit environ 7.9 points de pourcentage, et 37.5% se trouve 7.5 points en dessous. Vous ne pouvez pas dire si cet écart est réel. Le gain moyen, c'est autre chose. Ressortir à 1.8R au lieu de 2R se vérifie trade par trade, et si [votre journal](/fr/blog/journal-de-trading/) montre des sorties anticipées, c'est un problème d'exécution, pas de stratégie. Corrigez l'exécution et continuez de tester avant de tirer la moindre conclusion sur les règles.

## L'ordre que nous suivrions

1. **Écrivez les règles assez précisément pour qu'un inconnu puisse les vérifier.** [Le guide du plan de trading](/fr/blog/comment-creer-un-plan-de-trading/) explique comment. Si vous ne pouvez pas les écrire, vous ne pouvez ni les backtester ni les suivre.
2. **Backtestez sur une période, et comptez chaque variante que vous essayez.**
3. **Mettez de côté une période plus récente que vous n'avez jamais regardée, et testez-y la version finale une seule fois.** Si elle y échoue, vous avez appris quelque chose à peu de frais. Ne la réglez pas jusqu'à ce qu'elle passe, sinon les données mises de côté deviennent simplement des données de plus sur lesquelles vous vous êtes ajusté.
4. **Faites du paper trading en temps réel sur un nombre de trades fixé à l'avance,** chacun noté dans votre journal, et comparez les résultats avec le backtest comme dans la section précédente.
5. **Passez à l'argent réel avec une petite taille,** comme le décrit le guide du paper trading, et n'augmentez qu'une fois que les résultats réels restent cohérents avec les deux tests.

Notez avant chaque étape quel résultat y mettrait fin. Pour l'étape du paper trading, cela pourrait être : après le nombre de trades prévu, avec les règles respectées sur presque tous, l'espérance est négative ou bien inférieure à celle du backtest. Décider après coup invite à la même torsion des règles que celle que le surajustement fait subir à un backtest.

Chaque étape ne peut que rejeter une stratégie ou la laisser passer à la suivante. Aucune ne prouve que l'edge durera, et les marchés changent. C'est pourquoi l'étape 5 commence petit.

## Où se situe Stockade, et où il ne se situe pas

Stockade ne peut pas faire de backtest. Il n'a ni données de prix historiques ni moyen d'exécuter des règles automatiquement. Son mode relecture génère 600 bougies d'une minute dans votre navigateur et affiche les 61 premières ; vous avancez dans le reste à la main avec Espace ou la flèche droite, ou en lecture automatique, sans voir ce qui vient ensuite.

La relecture est donc un forward test de votre exécution, sur des données synthétiques. Elle est utile pour les habitudes dont dépend l'étape 4 : suivre des règles écrites, saisir les stops au moment de l'entrée, noter chaque trade. Elle ne peut pas vous dire si une stratégie a un edge. Les prix de Stockade proviennent d'un algorithme, une marche aléatoire avec un biais de tendance qui dérive lentement, sans aucun lien avec un marché réel, donc la façon dont une stratégie s'y comporte ne dit rien de ce qu'elle ferait sur des prix réels. Et comme le montre l'exemple de marche aléatoire de l'article de Bailey, même une série sans motif réel peut produire des résultats qui ressemblent à une stratégie qui fonctionne. Une bonne série sur Stockade est un relevé de votre discipline, pas une preuve concernant les règles. [Le guide sur les simulateurs boursiers](/fr/blog/quest-ce-qu-un-simulateur-boursier/) explique ce qu'un simulateur peut et ne peut pas vous apprendre d'autre.

## Pratiquez cela sur le simulateur

Écrivez un ensemble de règles sur une page, puis ouvrez le [simulateur](/fr/simulator/) en mode relecture et tradez 30 setups en vous y tenant strictement, avec un stop saisi dans le champ Stop Loss à chaque trade. Notez chacun dans votre journal : setup, entrée, stop et objectif prévus, et si vous avez suivi les règles. À la fin, ne vous demandez pas si vous avez gagné de l'argent. Demandez-vous combien de trades ont enfreint les règles, et quel était votre gain moyen en R par rapport à ce que vous aviez prévu, car ce sont ces chiffres qu'un véritable forward test exige de maîtriser.
