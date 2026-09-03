---
title: "Gestion du Risque 101 : Dimensionnement de Position et la Règle du 1%"
description: "La taille de position découle de la distance du stop, ce n'est pas un chiffre choisi. Formule de dimensionnement, règle du 1%, récupération après drawdown."
date: 2026-06-29
tags: ["Gestion du Risque"]
slug: "gestion-du-risque-et-dimensionnement-de-position"
translationOf: "risk-management-position-sizing"
---

Demandez à un débutant combien d'actions il a achetées, et vous obtenez un chiffre rond. Deux cents. Cinq cents. Mille, si le compte semblait bien garni ce matin-là. Demandez pourquoi, et la réponse est généralement « ça semblait juste » ou « c'est à peu près un tiers de mon buying power ». Le stop est placé ensuite, là où le suggère le graphique, et la perte est ce qu'elle finit par être. Parfois $180. Parfois $2,400.

Cet ordre est inversé, et l'inverser est le changement à la valeur la plus élevée que la plupart des nouveaux traders puissent faire. La taille de position n'est pas une décision. C'est la réponse à un problème de division dont les données d'entrée sont votre budget de risque et votre distance de stop. Décidez ces deux éléments, et le nombre d'actions est déjà déterminé — vous ne faites que le calculer.

## La plupart des débutants choisissent d'abord un nombre d'actions, et c'est à l'envers

Voici ce qui se passe quand la taille vient en premier. Vous achetez 500 actions à 187.40. Le graphique dit que le trade est faux en dessous de 185.90 — 1.50 de risque par action — donc la perte si le stop est touché est 500 × 1.50 = **$750**. Sur un compte de $50,000, c'est 1.5% qui s'envole sur un trade ordinaire. Prenez le même setup avec une invalidation plus large et plus honnête à 183.90, toujours 500 actions, et la perte devient 500 × 3.50 = **$1,750**, soit 3.5%. Même trader, même conviction, même nombre d'actions, et les dégâts ont plus que doublé à cause de l'endroit où une ligne sur un graphique se trouvait par hasard.

Quand la taille est fixe et que la distance de stop varie, votre risque en dollars oscille de façon aléatoire. Quand le risque en dollars est fixe et que la distance de stop varie, le nombre d'actions s'ajuste et chaque perte ressort de la même taille. Le second arrangement est tout l'intérêt de la gestion du risque. [Les ordres stop-loss](/blog/stop-loss-orders-explained) expliquent comment trouver le prix d'invalidation ; cet article porte sur ce qu'il faut faire de ce chiffre une fois que vous l'avez.

## La formule de dimensionnement de position, calculée de bout en bout

La formule tient en une ligne :

**shares = (account × risk %) ÷ (entry − stop)**

Calculons-la avec de vrais chiffres. Compte : $50,000. Risque par trade : 1%.

- **Budget de risque :** 50,000 × 0.01 = **$500**
- **Entrée :** 187.40
- **Stop :** 185.90
- **Risque par action :** 187.40 − 185.90 = **1.50**
- **Actions :** 500 ÷ 1.50 = 333.33, arrondi vers le bas à **333 actions**
- **Risque réel si le stop est touché :** 333 × 1.50 = **$499.50**
- **Valeur notionnelle de la position :** 333 × 187.40 = **$62,404.20**

Arrondissez toujours *vers le bas*. Arrondir 333.33 à 334 place votre risque à $501 — un dépassement insignifiant, mais arrondir en votre propre faveur n'est pas une habitude à cultiver.

Remarquez la dernière ligne. Une position de $62,404 sur un compte de $50,000 dépasse les liquidités que vous possédez. Sur un compte cash, vous ne pourriez pas prendre ce trade à pleine taille ; sur un compte sur marge, vous le pourriez, et l'effet de levier est invisible car le chiffre de risque affiche toujours $500. Ajoutez donc une seconde contrainte : une exposition notionnelle maximale. Plafonnez-la à 100% des capitaux propres, et la position devient 266 actions risquant $399. La formule de dimensionnement vous donne un plafond de perte, pas une permission de détenir n'importe quelle quantité d'actions.

<div class="table-wrap">

| Prix du stop | Risque/action | Actions pour $500 | Risque réel | Valeur notionnelle |
|---|---|---|---|---|
| 186.90 | 0.50 | 1,000 | $500.00 | $187,400 |
| 185.90 | 1.50 | 333 | $499.50 | $62,404 |
| 184.40 | 3.00 | 166 | $498.00 | $31,108 |
| 183.90 | 3.50 | 142 | $497.00 | $26,611 |

</div>

Chaque ligne risque essentiellement le même $500. C'est à cela que ça ressemble quand la taille est un résultat.

## La récupération après drawdown est brutalement asymétrique

C'est l'argument le plus convaincant de toute la gestion du risque, et c'est de l'arithmétique pure.

Perdez de l'argent, et vous devez en regagner un *pourcentage plus grand* que celui perdu, parce que vous le gagnez sur une base plus petite. Perdez 50% de $50,000 et il vous reste $25,000. Revenir au point de départ signifie transformer $25,000 en $50,000 — un gain de 100%. Pas 50%. La perte et la récupération ne sont jamais le même chiffre.

La formule générale est **récupération = perte ÷ (1 − perte)** :

<div class="table-wrap">

| Drawdown | Capital restant sur $50,000 | Gain nécessaire pour récupérer |
|---|---|---|
| 10% | $45,000 | 11.1% |
| 20% | $40,000 | 25.0% |
| 30% | $35,000 | 42.9% |
| 40% | $30,000 | 66.7% |
| 50% | $25,000 | 100.0% |
| 75% | $12,500 | 300.0% |

</div>

Vérifiez une ligne du milieu : une baisse de 30% laisse $35,000, et 35,000 × 1.429 = $50,015. Correct.

Lisez la dernière ligne lentement. Un drawdown de 75% exige de quadrupler ce qu'il reste rien que pour revenir à la ligne de départ, et les traders dans cette position n'y parviennent presque jamais — la seule façon d'essayer est de prendre des risques encore plus grands, ce qui est précisément ce qui a creusé le trou. La courbe s'accentue violemment après 30%, ce qui explique pourquoi plafonner les petites pertes compte plus que capturer de gros gains.

## Une série de cinq pertes est banale, et voici ce qu'elle coûte

Supposons que votre stratégie gagne 40% du temps — un chiffre parfaitement viable si vos gains sont plus grands que vos pertes. Chaque trade perd alors avec une probabilité de 0.60, et cinq pertes consécutives se produisent avec une probabilité de 0.60⁵ = 0.0778, soit environ **7.8%**.

Ce n'est pas un scénario catastrophe. Sur 100 trades, il existe 96 endroits où une série de cinq pertes pourrait commencer, et le nombre attendu de telles séries est d'environ **trois**. Une série de cinq n'est pas de la malchance. C'est un mardi comme un autre. La seule question est donc ce qu'une série ordinaire fait à votre compte :

<div class="table-wrap">

| Risque par trade | Après 5 pertes consécutives | Capital restant sur $50,000 |
|---|---|---|
| 1% | 0.99⁵ = 95.1% | $47,549 |
| 2% | 0.98⁵ = 90.4% | $45,196 |
| 5% | 0.95⁵ = 77.4% | $38,689 |
| 10% | 0.90⁵ = 59.0% | $29,525 |

</div>

À 1%, cinq pertes vous coûtent 4.9% et il vous faut 5.2% pour récupérer. Vous le remarquez à peine. À 5%, la même série ordinaire coûte 22.6% et nécessite un gain de 29.2% pour l'effacer. À 10%, vous êtes en baisse de 41% et avez besoin d'un gain de 69.4% — venant d'une stratégie qui vient de perdre cinq fois de suite, précisément le moment où vous serez le moins capable de l'exécuter.

Prolongeons la série. Huit pertes consécutives ont une probabilité de 0.60⁸ ≈ **1.7%** — peu courant, mais cela vous arrivera. À 1% de risque, 0.99⁸ = 92.3% du compte reste. À 10% de risque, 43.0% reste et il vous faut un gain de 132%. Le risque de ruine n'est pas un concept exotique ; c'est ce tableau, poussé suffisamment loin. Un faible risque par trade est ce qui rend une série ordinaire supportable plutôt que fatale.

## Les multiples de R transforment chaque trade en la même unité

Une fois le risque en dollars constant, exprimez les résultats en **R**, où 1R est votre budget de risque pour ce trade — $500 dans notre exemple.

Un trade qui gagne $1,250 vaut +2.5R. Un trade qui perd tout le stop vaut −1R. Une sortie anticipée à $180 vaut +0.36R. Désormais, un trade de 333 actions et un trade de 142 actions sur un titre deux fois plus cher sont directement comparables, parce que tous deux ont risqué une unité.

Cela rend l'espérance calculable. Avec un taux de réussite de 40% et des gains moyens de +2R et des pertes moyennes de −1R :

**(0.40 × 2R) + (0.60 × −1R) = 0.80R − 0.60R = +0.20R per trade**

Vingt centimes de R par trade, soit $100 pour une unité de $500. C'est de l'arithmétique sur un échantillon passé, pas une prévision — les taux de réussite dérivent et les edges se dégradent, donc une espérance historique positive ne promet rien pour les cent prochains trades. Mais cela montre pourquoi un taux de réussite de 40% convient très bien, tandis qu'un taux de réussite de 60% avec des pertes de −2R peut quand même être une stratégie perdante. Cette seconde affirmation dépend entièrement de la taille des gains : à 60% de réussite et des pertes de −2R, l'équilibre exige un gain moyen de +1.33R, donc des gains de +2R en feraient en réalité un système solide à +0.4R par trade, et tout ce qui est en dessous de +1.33R le coule. Le taux de réussite seul ne suffit jamais à juger. La [vue analytique](/blog/analyze-trading-performance-metrics) de Stockade suit le taux de réussite, le facteur de profit et le gain/perte moyens, les données brutes de ce calcul.

## Les limites de perte journalières et hebdomadaires empêchent une mauvaise journée de s'aggraver

Le dimensionnement de position plafonne un seul trade. Il ne fait rien contre le septième trade d'une matinée frustrante, pris à triple taille pour se refaire dans la journée.

Fixez des limites strictes en R. Une structure courante est **−3R par jour, −6R par semaine** — à 1% de risque sur $50,000, cela fait $1,500 dans la journée et $3,000 dans la semaine. Atteignez la limite journalière et c'est terminé : plateforme fermée, pas de « encore un dernier setup ». Leur valeur tient au fait qu'elles sont fixées à l'avance par une version de vous-même qui n'est pas en train de perdre en ce moment. Le revenge trading n'est pas un défaut de caractère ; c'est ce qui se passe quand un cerveau à cran est autorisé à choisir la taille des positions. Inscrivez ces chiffres dans votre [plan de trading](/blog/how-to-build-a-trading-plan) pour que la décision soit déjà prise.

## Les positions corrélées rendent votre exposition réelle plus grande que la somme

Trois positions risquant chacune exactement 1% donnent l'impression d'un risque de 3%. Ce n'est généralement pas le cas. Si les trois sont des actions de semi-conducteurs, elles partagent un seul moteur commun : une mauvaise publication sectorielle déclenche les trois stops ensemble et vous perdez 3% en un seul mouvement. Vous n'avez pas pris trois trades à 1%, vous avez pris un trade à 3% sur trois tickers. Il en va de même pour trois tokens crypto suivant les mêmes flux, ou une action longue combinée à un contrat à terme sur indice long.

La solution est une limite combinée par thème — pas plus de 2% du risque total dans un même secteur, facteur ou direction, quel que soit le nombre de tickers concernés. Avant d'ajouter une position, demandez-vous quel titre d'actualité unique déclencherait d'un coup tous les stops de ce que vous détenez, et additionnez les dégâts.

Stockade ne peut pas vous enseigner celle-ci, et cela échoue sur deux plans distincts. La série de prix de chaque instrument est générée par sa propre marche aléatoire indépendante, donc la corrélation entre symboles n'est absolument pas modélisée. Plus fondamentalement, le simulateur ne détient qu'une seule position à la fois — changer de symbole abandonne tout ce que vous aviez d'ouvert — donc il n'existe aucun portefeuille à additionner même si les corrélations existaient. L'exposition au niveau du portefeuille n'est pas quelque chose que vous pouvez pratiquer ici du tout ; elle doit être comprise comme un concept de marché réel et appliquée la première fois que vous détenez véritablement deux positions à la fois.

## La règle du 1% est une convention, pas une loi

Il n'y a rien de magique dans 1%. C'est un réglage par défaut courant parce qu'il survit aux longues séries de pertes tout en laissant les bons trades compter. Le chiffre défendable dépend de votre taux de réussite, de votre multiple de R moyen, du degré de corrélation de vos positions, et de votre comportement quand vous êtes en perte. Certains professionnels risquent 0.25% parce qu'ils prennent de nombreuses positions à la fois ; certains swing traders risquent 2% sur une poignée d'idées par mois. Les deux sont cohérents. Ce qui n'est pas cohérent, c'est 8% « parce que le setup était vraiment excellent » — la conviction n'est pas un paramètre de risque, et le marché n'a jamais été informé de la vôtre.

Une asymétrie mérite d'être énoncée clairement : les débutants risquent presque universellement trop, et non trop peu. En cas de doute, commencez à 1%. Le coût de commencer trop petit est un compte qui progresse plus lentement ; le coût de commencer trop grand est de ne plus avoir de compte du tout.

## Pratiquez cela sur le simulateur

Prenez vingt trades sur le solde de trading virtuel de $100,000 de Stockade, où vous calculez le nombre d'actions *avant* d'ouvrir le ticket — entrée, stop, risque par action, puis taille, dans cet ordre. À 1%, cela fait $1,000 par trade, donc vérifiez ensuite le journal de trading pour voir si vos pertes réalisées se regroupent réellement près de 1R ou le dépassent. Rappelez-vous qu'un stop simulé s'exécute au tick qui a franchi votre niveau plutôt qu'au niveau lui-même, et que l'argent virtuel rend cette discipline bien plus facile que l'argent réel ne le sera jamais. Faites tourner cette arithmétique sur le [simulateur boursier de Stockade](/fr/simulator/) jusqu'à ce que la division devienne automatique.
