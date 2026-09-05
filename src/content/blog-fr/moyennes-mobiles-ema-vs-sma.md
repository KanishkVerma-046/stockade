---
title: "Les Moyennes Mobiles Expliquées : EMA contre SMA et Comment les Utiliser"
description: "La SMA et l'EMA ne diffèrent que par un multiplicateur. Pourquoi 9/20/50 sont standards, comment les utiliser comme support, et pourquoi elles ont du retard."
date: 2026-04-13
tags: ["Indicateurs", "Analyse Technique"]
slug: "moyennes-mobiles-ema-vs-sma"
translationOf: "moving-averages-ema-vs-sma"
---

Vous fixez un graphique qui est monté, descendu, remonté, redescendu, puis remonté encore sur les quarante dernières barres, et vous n'arrivez pas à dire s'il est en tendance ou s'il ne fait qu'osciller. Chaque chandelier pris isolément est du bruit. La question à laquelle vous voulez une réponse — « est-ce que ce truc va globalement quelque part ? » — n'est visible dans aucune barre individuelle, parce que c'est une question qui porte sur la séquence entière.

Une moyenne mobile est la réponse la plus simple à cette question. Elle prend une série de cours de clôture récents, les condense en un seul nombre, et redessine ce nombre à chaque nouvelle barre. Les à-coups s'annulent, et ce qui reste est une ligne que l'on peut regarder et qualifier immédiatement de haussière, baissière, ou plate.

## Ce qu'une moyenne mobile calcule réellement

Prenez les cinq derniers cours de clôture d'un instrument : 182.00, 184.50, 183.00, 186.00, 185.50. Additionnez-les : 921.00. Divisez par 5 : **184.20**. C'est une moyenne mobile simple (SMA) à 5 périodes.

Le mot « mobile » est la moitié importante. À la barre suivante, une nouvelle clôture arrive — disons 190.00 — et la plus ancienne, 182.00, sort de la fenêtre. La nouvelle somme est 921.00 − 182.00 + 190.00 = 929.00, et la nouvelle SMA est 929.00 ÷ 5 = **185.80**. La fenêtre a glissé d'une barre et la moyenne a monté de 1.60.

Notez que la moyenne a changé pour deux raisons : un nouveau prix est entré *et* un ancien prix est sorti. Ce second effet est facile à manquer — une SMA peut bondir simplement parce qu'un grand nombre est sorti par l'arrière de la fenêtre, même si le prix du jour a à peine bougé.

## SMA contre EMA : le multiplicateur de pondération et pourquoi l'EMA réagit plus vite

La SMA donne le même poids à chaque prix de sa fenêtre. Dans une SMA à 20 périodes, la clôture d'il y a 20 barres compte autant que celle d'hier — puis, à la barre suivante, ne compte plus du tout. C'est un modèle de pertinence étrange.

La moyenne mobile exponentielle (EMA) corrige cela. Au lieu d'une fenêtre, l'EMA conserve une valeur courante et la déplace vers chaque nouvelle clôture selon une fraction fixe — le **multiplicateur de lissage** :

```
multiplier = 2 / (period + 1)
```

Pour une EMA à 9 périodes, cela donne 2 / 10 = **0.2**. La règle de mise à jour est :

```
new EMA = prior EMA + multiplier x (new close - prior EMA)
```

Calculons une barre. Supposons que l'EMA à 9 périodes affiche actuellement 186.50 et que la barre clôture à 188.00. L'écart est 188.00 − 186.50 = 1.50. Multipliez par 0.2 pour obtenir 0.30. D'où :

**new EMA = 186.50 + 0.2 x (188.00 − 186.50) = 186.50 + 0.30 = 186.80**

L'EMA a bougé de 30 cents en réponse à un mouvement de $1.50. Elle comble 20% de la distance vers le nouveau prix à chaque barre, indéfiniment. Rien ne disparaît jamais totalement d'une EMA — les anciens prix ne font que rétrécir. Avec un multiplicateur de 0.2, le poids d'une clôture datant de *n* barres est de 0.2 × 0.8ⁿ, donc un prix vieux de 10 barres porte encore environ 2.1% du poids, et un prix vieux de 30 barres se réduit à une erreur d'arrondi.

Comparons maintenant la vitesse. Notre SMA à 5 périodes est passée de 184.20 à 185.80 — un gain de 1.60 — quand 190.00 est arrivé. Une EMA à 5 périodes se trouvant à ce même 184.20, avec un multiplicateur de 2/6 = 0.3333, irait à 184.20 + 0.3333 × 5.80 = **186.13**, un gain de 1.93. Mêmes données, plus de mouvement. C'est toute la différence : l'EMA réagit plus vite parce qu'elle pondère plus fortement les prix récents.

Plus rapide ne veut pas dire meilleur. Plus rapide signifie des signaux plus précoces *et* davantage de faux signaux. Une SMA est plus calme et vous maintient dans une tendance à travers des replis qui font sortir un trader utilisant l'EMA. Les graphiques de Stockade calculent les EMA de façon standard : la première valeur est initialisée avec une moyenne simple de la fenêtre d'ouverture, et chaque barre suivante utilise le multiplicateur ci-dessus.

## Choisir une période, et pourquoi 9, 20 et 50 reviennent partout

La période est un curseur unique qui arbitre entre réactivité et stabilité. Les périodes courtes collent au prix et se retournent sans cesse ; les périodes longues ignorent la plupart de ce qui se passe et se retournent rarement. Voyez ce que fait le multiplicateur sur les trois EMA que Stockade superpose, avec une EMA précédente de 186.50 et une clôture de 188.00 dans chaque ligne :

<div class="table-wrap">

| EMA | Multiplicateur | Mouvement pour un écart de +1.50 | Rôle |
|---|---|---|---|
| EMA 9 | 2/10 = 0.2000 | +0.30 | Momentum à court terme |
| EMA 20 | 2/21 = 0.0952 | +0.14 | Tendance intrajournalière |
| EMA 50 | 2/51 = 0.0392 | +0.06 | Biais structurel |

</div>

L'EMA 50 bouge à peine face à un mouvement qui déplace l'EMA 9 cinq fois plus. Elles répondent à des questions différentes : la 9 répond à « qu'a fait le prix cette dernière heure », la 50 répond à « de quel côté cet instrument a-t-il penché toute la session ».

Pourquoi ces chiffres précis ? Surtout une convention qui s'auto-réalise en partie — suffisamment de traders surveillent ces trois mêmes lignes pour que les réactions se regroupent autour d'elles. Rien n'est mathématiquement spécial à propos de 9, 20 ou 50, et vous devriez résister à la tentation de chercher la période « optimale » sur des données passées. C'est du surajustement (curve-fitting), et des périodes calibrées sur le graphique d'hier se dégradent rapidement.

Stockade affiche les trois sur le graphique dans des couleurs distinctes — EMA 9 en ambre, EMA 20 en bleu, EMA 50 en violet — avec un interrupteur pour chacune, afin de pouvoir tout réduire à une seule ligne pendant que vous apprenez ce qu'elle fait.

## Utiliser les moyennes mobiles comme support et résistance dynamiques

Les [niveaux de support et de résistance](/blog/support-and-resistance-levels/) horizontaux sont des prix fixes. Une moyenne mobile est un niveau qui bouge avec le marché, ce qui la rend utile dans les tendances où une ligne fixe devient obsolète en une heure. Dans une tendance haussière saine, le prix se replie, touche ou casse légèrement une EMA montante, puis reprend sa route — les traders appellent cela « surfer sur la 20 ». Dans une tendance baissière, la même ligne agit comme un plafond contre lequel les rebonds échouent.

Soyez honnête sur ce que c'est réellement. L'EMA n'est pas une barrière ; c'est une ligne descriptive qui se trouve là où les achats récents se sont concentrés, et elle échoue régulièrement. Si vous la traitez comme un support, vous avez quand même besoin d'un stop en dessous — « le prix a rebondi sur la 20 les trois dernières fois » décrit trois événements, pas une propriété de l'instrument.

## La stratégie de croisement et son mode d'échec en dents de scie

La règle mécanique classique : acheter quand une moyenne mobile rapide croise au-dessus d'une moyenne mobile lente, vendre quand elle recroise en dessous. Sur les graphiques de Stockade, c'est l'EMA 9 qui croise l'EMA 20, ou la 20 qui croise la 50. Dans une tendance soutenue, cela fonctionne bien — la ligne rapide décolle de la ligne lente et y reste, vous maintenant en position pour toute la durée.

Dans un marché en range, c'est une déchiqueteuse. Imaginez un prix oscillant entre environ 184 et 188. L'EMA 9 croise au-dessus de l'EMA 20 à 186.40 — vous achetez. Six barres plus tard, le prix retombe à 185.20 et les lignes recroisent — vous vendez pour une perte de $1.20. Quatre barres après, elles croisent de nouveau à la hausse à 186.10 — vous achetez — et le prix retombe à 185.00, encore $1.10 de perdus. Deux trades, aucune tendance, et vous êtes en baisse de $2.30 par action avant tout coût, uniquement parce qu'un marché latéral fait croiser encore et encore deux lignes presque identiques. C'est le **whipsaw** (faux signal en dents de scie), et ce n'est pas un bug dans les réglages. C'est ce qui se produit quand vous appliquez un outil suiveur de tendance à un marché qui n'a pas de tendance.

La parade n'est pas une meilleure période. C'est un filtre : ne prendre les croisements que lorsque la ligne lente est clairement inclinée, ou exiger une confirmation par quelque chose qui mesure autre chose, comme le [MACD](/blog/macd-explained/) — lui-même construit à partir d'EMA — ou une référence ancrée sur le volume comme le [VWAP](/blog/vwap-trading-strategy/).

## Lire la pente d'une moyenne mobile comme filtre de tendance

Avant le croisement, regardez la pente. Une EMA 50 plate, c'est le marché qui vous dit qu'il n'y a pas d'avantage directionnel ici, et c'est le filtre le moins coûteux disponible.

Quantifiez-la plutôt que de l'estimer à l'œil. Si l'EMA 20 affichait 182.40 il y a dix barres et affiche 186.90 maintenant, elle a monté de 4.50 sur 10 barres — soit 0.45 par barre, environ 0.24% du prix par barre. C'est une véritable pente. Si elle affichait 186.70 il y a dix barres et 186.90 maintenant, cela fait 0.02 par barre, environ 0.01% — c'est plat, et tout croisement qu'elle produit n'est que du bruit.

Une règle défendable : ne prendre les croisements longs que lorsque l'EMA 50 monte, les croisements courts que lorsqu'elle descend, et rester à l'écart quand elle est plate. Cela réduira fortement votre nombre de trades. C'est justement le but.

## La limite qu'on ne peut pas concevoir pour la faire disparaître : les moyennes mobiles ont du retard

Toute moyenne mobile est calculée à partir de prix déjà survenus. Aucun réglage ni aucune variante n'échappe à cela. L'EMA réduit le retard par rapport à une SMA ; elle ne le supprime pas, car un multiplicateur appliqué à des clôtures passées reste une fonction de clôtures passées.

Une moyenne mobile ne vous fera donc jamais entrer au plus bas ni sortir au plus haut. Le temps qu'une EMA 9 se retourne à la hausse, le plus bas est déjà derrière vous ; le temps qu'un croisement confirme une tendance baissière, une bonne partie du déclin a déjà eu lieu. Quiconque vous vend une configuration qui « prédit » les retournements vous vend une courbe ajustée à un graphique qu'il a déjà vu.

Ce qu'une moyenne mobile vous offre réellement, c'est une description cohérente et sans émotion de là où le prix s'est trouvé par rapport à lui-même. Cela vaut cher — cela vous empêche de qualifier une tendance baissière de bonne affaire — mais c'est une description, pas une prédiction. Utilisez-la pour filtrer et pour cadrer, et placez votre gestion du risque ailleurs.

## Pratiquez les moyennes mobiles sur le simulateur

Ouvrez un graphique sur Stockade et désactivez tout sauf l'EMA 20. Observez quelques centaines de barres et notez où le prix la respecte et où il la traverse de part en part. Activez ensuite les EMA 9 et 50 et comptez combien de croisements se sont produits pendant que l'EMA 50 était clairement inclinée par rapport à quand elle était plate — ce décompte constitue à lui seul l'argument en faveur du filtre de pente, dans vos propres données.

Gardez à l'esprit sur quoi vous vous entraînez : les prix de Stockade sont générés dans le navigateur, et non issus d'une quelconque bourse, donc ces EMA décrivent un marché simulé. L'arithmétique et les habitudes de lecture sont identiques ; l'instrument sous-jacent est fictif. Parcourez une session générée chandelier par chandelier sur le simulateur de graphiques pour pouvoir vous arrêter à chaque croisement et vous engager avant que la barre suivante ne révèle la réponse. Commencez sur le [simulateur boursier de Stockade](/fr/simulator/).
