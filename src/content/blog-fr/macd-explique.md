---
title: "MACD Expliqué : Comment Lire et Trader avec le MACD"
description: "Le MACD, ce sont deux moyennes mobiles, leur différence, et une version lissée de celle-ci. Comment calculer chaque partie, la lire, et savoir quand elle ment."
date: 2026-04-27
tags: ["Indicateurs"]
slug: "macd-explique"
translationOf: "macd-explained"
---

Vous regardez un graphique monter et vous ne pouvez pas répondre à la seule question qui compte : ce mouvement gagne-t-il encore en force, ou avance-t-il sur son élan ? Une action peut imprimer cinq clôtures plus hautes d'affilée alors que chacune de ces clôtures gagne moins de terrain que la précédente — la tendance est intacte, le moteur agonise. Le temps que cela apparaisse dans le prix, il est généralement trop tard pour agir.

Le MACD existe pour combler cet écart. Il ne vous dit pas où se trouve le prix. Il vous dit si la *distance entre deux moyennes mobiles* s'élargit ou se resserre, ce qui est une approximation grossière du fait qu'un mouvement accélère ou décélère. C'est un rôle plus étroit que ce que la plupart des gens lui attribuent, et comprendre cette étroitesse est ce qui sépare l'utilisation correcte du MACD de la manipulation par le MACD.

## Les trois composants et comment chacun est calculé

MACD signifie Moving Average Convergence Divergence — un nom honnête, puisque tout l'indicateur porte sur la convergence ou la divergence de deux moyennes mobiles. Il comporte trois parties, chacune construite sur la précédente.

<div class="table-wrap">

| Composant | Formule | Ce qu'il mesure |
|---|---|---|
| Ligne MACD | EMA 12 périodes − EMA 26 périodes | L'écart entre tendance rapide et tendance lente |
| Ligne de signal | EMA 9 périodes de la ligne MACD | Une version lissée de cet écart |
| Histogramme | Ligne MACD − ligne de signal | Si l'écart s'élargit ou se resserre |

</div>

### La ligne MACD

Prenez une moyenne mobile exponentielle des 12 dernières barres et une des 26 dernières barres, puis soustrayez la lente de la rapide. Pour savoir comment une EMA pondère plus fortement les barres récentes que les anciennes, voir [moyennes mobiles : EMA vs SMA](/blog/moving-averages-ema-vs-sma).

Concrètement : si l'EMA 12 périodes est à 188.40 et l'EMA 26 périodes à 186.90, la ligne MACD affiche 188.40 − 186.90 = **1.50**. La moyenne rapide se situe $1.50 au-dessus de la lente. Ce chiffre est exprimé dans l'unité propre du prix — des dollars ici, pas un pourcentage ni une échelle bornée de 0 à 100 comme le [RSI](/blog/rsi-indicator-overbought-oversold). Une action à $400 produit couramment des valeurs de MACD dix fois plus grandes qu'une action à $40, c'est pourquoi les lectures de MACD ne sont jamais comparables d'un instrument à l'autre.

### La ligne de signal

La ligne MACD est saccadée, donc le MACD applique une seconde passe de lissage : une EMA 9 périodes de la ligne MACD elle-même. C'est la ligne de signal, et elle retarde la ligne MACD par construction, étant une moyenne de l'historique récent de cette ligne elle-même.

La constante de lissage de l'EMA est 2 ÷ (période + 1), donc la ligne de signal utilise 2 ÷ 10 = 0.20 — chaque nouvelle valeur est l'ancienne plus 20% de la distance jusqu'à la valeur MACD actuelle. Si la ligne de signal était à 1.20 et que la ligne MACD affiche 1.72, le nouveau signal est 1.20 + 0.20 × (1.72 − 1.20) = 1.20 + 0.104 = 1.304.

### L'histogramme

L'histogramme est la partie la plus simple : ligne MACD moins ligne de signal, tracée sous forme de barres au-dessus et en dessous de zéro. Avec la ligne MACD à 1.50 et la ligne de signal à 1.20, la barre de l'histogramme est 1.50 − 1.20 = **0.30**.

Parce que l'histogramme est défini comme cette différence, il croise zéro exactement sur la même barre où la ligne MACD croise la ligne de signal. C'est un seul événement dessiné de deux façons. Quiconque affirme qu'un croisement zéro de l'histogramme *confirme* un croisement de ligne de signal décrit deux fois la même chose.

## Pourquoi les réglages sont 12, 26 et 9

Ces chiffres sont une convention, pas une mathématique. Gerald Appel les a choisis lorsqu'il a créé le MACD à la fin des années 1970, et ils sont restés la valeur par défaut depuis. Il n'existe aucune dérivation à retrouver : aucune propriété des marchés ne rend 12 et 26 spéciaux, et vous ne trouverez aucun calcul qui y aboutisse. Des histoires d'origine séduisantes circulent — qu'ils correspondraient à un compte bien arrondi de semaines ou de séances — mais ce sont des légendes inventées après coup pour expliquer un choix qui n'était en réalité qu'un choix. Ce qui compte, c'est ce que ces chiffres contrôlent : 12 et 26 fixent la rapidité et la lenteur des deux moyennes, et 9 fixe la quantité de lissage appliquée par-dessus.

Ils comptent aujourd'hui surtout parce que tant de gens les utilisent. Un réglage par défaut affiché sur des millions d'écrans devient légèrement autoréalisateur : quand un croisement largement surveillé s'imprime, certains traders agissent en conséquence, plaçant de vrais ordres derrière un chiffre arbitraire. C'est un effet faible, pas une loi, mais cela vaut mieux que toute prétention selon laquelle ces réglages seraient optimaux.

Vous pouvez les modifier. Raccourcir à 6/13/5 rend le MACD plus nerveux et plus précoce — plus de signaux, dont davantage de faux. Allonger à 19/39/9 le rend plus lent et plus propre — moins de signaux, plus tardifs. Aucun n'est meilleur ; vous choisissez simplement où vous situer sur la courbe réactivité contre bruit. Ce que vous ne devriez pas faire, c'est régler les paramètres jusqu'à ce qu'ils capturent les trois derniers mouvements du graphique sous vos yeux. C'est du surajustement (curve-fitting), et cela décrit l'histoire au lieu de prédire quoi que ce soit.

## Croisements de la ligne zéro contre croisements de la ligne de signal

Ce sont des événements différents avec des significations différentes, et les confondre est l'erreur la plus courante avec le MACD.

**La ligne MACD croisant zéro** signifie que l'EMA 12 a croisé l'EMA 26 — un simple croisement de moyennes mobiles, reformulé. Au-dessus de zéro, la moyenne rapide est au-dessus de la lente ; en dessous de zéro, l'inverse. C'est un constat sur la direction de la tendance, et parce qu'il implique la moyenne lente à 26 périodes, il est tardif.

**La ligne MACD croisant la ligne de signal** signifie que l'écart actuel entre les moyennes s'est éloigné de son propre écart moyen récent. C'est un constat sur un changement de momentum, et il se déclenche plus tôt que le croisement zéro — souvent bien plus tôt, et souvent alors qu'il n'y a aucun changement de tendance du tout.

La lecture pratique : un croisement de signal haussier alors que le MACD est bien en dessous de zéro est un rebond au sein d'une tendance baissière jusqu'à preuve du contraire. Le même croisement alors que le MACD franchit zéro à la hausse est une affirmation plus forte, parce que deux éléments s'accordent. Filtrer les croisements de signal selon le côté de zéro où ils se produisent réduit fortement votre nombre de signaux, ce qui est précisément le but.

## Lire l'histogramme, et le piège qu'il contient

Voici la nuance qui justifie d'avoir un histogramme. Parcourons cinq barres d'un rallye :

<div class="table-wrap">

| Barre | Prix | Ligne MACD | Ligne de signal | Histogramme |
|---|---|---|---|---|
| 1 | 190.10 | 1.50 | 1.20 | 0.30 |
| 2 | 192.40 | 1.72 | 1.30 | 0.42 |
| 3 | 194.30 | 1.85 | 1.41 | 0.44 |
| 4 | 195.60 | 1.90 | 1.51 | 0.39 |
| 5 | 196.20 | 1.88 | 1.58 | 0.30 |

</div>

Le prix a monté sur chaque barre, de 190.10 à 196.20. Mais l'histogramme a culminé à 0.44 sur la barre 3 et s'est réduit sur les barres 4 et 5, revenant à son point de départ.

**Un histogramme qui se réduit ne signifie pas que le prix baisse. Cela signifie que le prix monte plus lentement qu'avant.** Le mouvement décélère tout en continuant. Sur la barre 5, la ligne MACD a en fait légèrement baissé, de 1.90 à 1.88, alors même que le prix inscrivait une nouvelle clôture plus haute — les deux moyennes ont commencé à converger.

C'est réellement utile, et c'est aussi là que les gens se font mal. La décélération n'est pas un retournement. Une tendance qui ralentit peut s'aplatir, se consolider pendant vingt barres, puis reprendre. Des barres qui se réduisent sont une raison de resserrer un stop ou d'arrêter d'ajouter à une position ; traiter chacune d'elles comme un signal de vente vous fait combattre des tendances fortes à répétition.

Si la barre 6 affichait un MACD de 1.60, la ligne de signal se déplacerait à 1.5876 et l'histogramme à environ 0.01 — presque plat, encore positif. Un MACD de 1.40 sur la barre 7 tire le signal à 1.5500 et l'histogramme à −0.15 : le véritable croisement, trois barres après le premier avertissement de l'histogramme.

## La divergence du MACD et ce qu'elle vaut

La divergence se produit quand le prix et le MACD sont en désaccord sur la direction.

**Divergence baissière :** le prix atteint un plus haut, mais le pic correspondant de la ligne MACD est plus bas que son pic précédent. Le nouveau plus haut de prix a été atteint avec moins de momentum derrière lui.

**Divergence haussière :** le prix atteint un plus bas, tandis que la ligne MACD atteint un plus bas plus élevé. La pression vendeuse s'atténue même si le prix continue de grignoter à la baisse.

La divergence mérite d'être surveillée et ne mérite pas d'être tradée seule. Les tendances fortes en produisent sur de longues périodes — une tendance haussière peut afficher une divergence baissière sur des dizaines de barres tout en inscrivant de nouveaux plus hauts, parce que l'impulsion initiale a créé un pic de momentum que la tendance n'a jamais besoin d'égaler à nouveau. La divergence vous indique qu'un mouvement est fatigué, pas qu'il est terminé.

Elle devient plus crédible quand quelque chose d'indépendant vient l'appuyer : une ligne de tendance cassée, un échec à un niveau qui avait tenu auparavant, ou un pattern de volume qui contredit le mouvement de prix. [Le volume](/blog/understanding-trading-volume) est une confirmation utile ici précisément parce qu'il provient d'une donnée différente de celle du MACD. Deux indicateurs dérivés des mêmes prix de clôture qui s'accordent, ce n'est pas une confirmation ; c'est de l'arithmétique.

## Pourquoi le MACD est doublement en retard et échoue dans les marchés en range

Deux faiblesses structurelles, toutes deux permanentes.

**C'est du retard construit sur du retard.** Une EMA est déjà tournée vers le passé — l'EMA 26 périodes a un centre de gravité situé environ douze barres et demie en arrière. Le MACD soustrait deux de ces moyennes, puis lisse le résultat avec une *troisième* EMA pour créer la ligne de signal. Chaque croisement décrit quelque chose qui s'est déjà produit. Rien dans le MACD n'est prédictif ; il compresse l'historique récent du prix en un seul chiffre, et cette compression prend du temps.

**Il produit des faux signaux constants dans les marchés en range.** La prémisse du MACD est qu'il existe une tendance à mesurer. Quand le prix oscille dans un intervalle, les deux EMA se superposent presque, la ligne MACD flotte près de zéro, et elle croise la ligne de signal dans un sens puis dans l'autre toutes les quelques barres. Chaque croisement ressemble en tout point à un vrai. Un après-midi agité peut générer huit croisements, tous du bruit, et les prendre vous coûte le spread et les commissions avant même que la direction n'entre en jeu.

La défense standard consiste à ne prendre les signaux MACD que dans le sens d'une tendance de fond plus longue — par exemple, uniquement les croisements haussiers tant que le prix est au-dessus de son EMA 50 périodes. Une défense moins coûteuse consiste à vérifier si la ligne MACD est franchement éloignée de zéro : les croisements imprimés avec des barres d'histogramme à peine visibles comptent rarement.

## Pratiquez cela sur le simulateur

Lire un article sur un histogramme qui se réduit n'est pas la même chose que de le remarquer alors qu'une position est ouverte et dans le vert. Activez le MACD et observez l'histogramme tout au long d'un mouvement complet — repérez la barre où il culmine, puis comptez combien de barres supplémentaires le prix a continué de grimper avant que la ligne MACD ne croise réellement. Cet écart, c'est votre retard, mesuré plutôt que décrit.

Puis tradez-le. Chaque fois qu'un croisement de ligne de signal s'imprime, décidez avant la barre suivante si vous le prendriez et notez de quel côté de zéro cela s'est produit. Faites-le trente fois et vous aurez votre propre décompte du nombre de croisements en range qui valaient la peine d'être pris — plus convaincant que tout ce qui est écrit ici. Chaque prix sur Stockade est généré algorithmiquement plutôt qu'extrait d'un marché réel, donc ce que vous entraînez, c'est la lecture, pas une prévision. Et soyez honnête : avec $100,000 de capital de trading virtuel, traverser un histogramme qui se réduit est bien plus facile qu'avec de l'argent qui est réellement le vôtre. Commencez sur le [simulateur boursier de Stockade](/fr/simulator/).
