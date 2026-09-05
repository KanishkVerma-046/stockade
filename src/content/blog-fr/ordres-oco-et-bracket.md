---
title: "Que Sont les Ordres OCO et Bracket et Comment Fonctionnent-Ils"
description: "Comment les ordres OCO et bracket lient un stop et un objectif pour que l'exécution de l'un annule l'autre, plus les erreurs de quantité des débutants."
date: 2026-05-25
tags: ["Types d'Ordres"]
slug: "ordres-oco-et-bracket"
translationOf: "oco-and-bracket-orders"
---

Vous achetez 500 actions. Le prix monte un peu, puis baisse un peu, puis remonte. Vous décidez maintenant en temps réel, avec de l'argent en jeu, s'il s'agit du sommet ou du début de quelque chose — et la version de vous qui prend cette décision n'est pas la version calme qui avait trouvé le setup.

Les ordres OCO et bracket existent pour vous retirer cette décision. Pas pour la rendre meilleure, pour la rendre *plus précoce*. Cet article porte sur la mécanique : ce qui se lie à quoi, ce qui annule quoi, ce qui arrive aux quantités, et les façons précises dont ce montage se casse.

## Ce qu'est un ordre OCO : deux ordres en attente où l'exécution de l'un tue l'autre

OCO signifie **one-cancels-other** (l'un annule l'autre). Ce n'est pas un nouveau type d'ordre. C'est un *lien* placé entre deux ordres ordinaires que vous comprenez déjà.

Vous soumettez deux ordres en même temps. Les deux se trouvent chez le courtier, non exécutés, en attente. Dès que l'un des deux s'exécute, le courtier annule automatiquement l'autre. Vous ne vous retrouvez jamais avec les deux.

Cette dernière phrase est toute la fonctionnalité. Sans le lien, vous avez deux ordres actifs, et si le prix traverse les deux niveaux, vous obtenez deux exécutions — ce qui, pour une seule position, signifie que vous sortez une fois puis entrez accidentellement dans une toute nouvelle position dans l'autre sens. Le lien OCO est ce qui fait que « soit l'un, soit l'autre » signifie vraiment soit l'un, soit l'autre.

La paire OCO la plus courante est un stop sous votre position et une limite au-dessus : un **ordre stop** qui se transforme en vente si le prix descend jusqu'à votre plafond de perte, et un **ordre à cours limité** qui vend si le prix monte jusqu'à votre objectif de profit. Le prix ne peut atteindre que l'un des deux en premier. Celui qui y arrive gagne, la position se ferme, et le survivant est annulé.

Pour la logique de *où* placer le stop — structure, volatilité, pourquoi un chiffre rond est un mauvais choix — voir [les ordres stop-loss expliqués](/blog/stop-loss-orders-explained/). Cet article part du principe que vous avez déjà choisi les niveaux et se préoccupe uniquement de la façon dont ils sont reliés.

## Ce qu'ajoute un ordre bracket : une entrée avec la paire de sortie attachée

Un **ordre bracket** est un ensemble de trois ordres soumis comme un seul paquet :

1. Un ordre d'**entrée** (au marché ou à cours limité) qui ouvre la position.
2. Un **stop de protection** qui la ferme en perte.
3. Un **objectif de profit** qui la ferme en gain.

Les ordres 2 et 3 forment une paire OCO l'un avec l'autre. Ils sont également *conditionnés à l'ordre 1* — ils ne deviennent actifs qu'une fois que l'entrée s'est réellement exécutée. Soumettez un bracket avec une entrée à cours limité qui ne s'exécute jamais, et rien ne se passe du tout ; le stop et l'objectif restent dormants et finissent par expirer avec l'entrée.

La séquence est donc : l'entrée s'exécute → le stop et l'objectif s'activent tous les deux → l'un des deux s'exécute → l'autre est annulé → vous êtes à plat. Trois ordres, un aller-retour, zéro décision après le premier clic.

Le mot « bracket » (crochet) est littéral. Votre prix d'entrée se situe à l'intérieur d'un crochet, avec un plancher en dessous et un plafond au-dessus, et le trade se termine dès qu'il touche l'un ou l'autre.

## Un bracket détaillé : 500 actions long à 187.40

Supposons que vous preniez une position longue de 500 actions à 187.40, stop à 185.90, objectif à 190.40.

<div class="table-wrap">

| Jambe | Prix | Distance depuis l'entrée | Par action | Total sur 500 actions |
|---|---|---|---|---|
| Entrée (achat) | 187.40 | — | — | Valeur de position de $93,700 |
| Stop (vente) | 185.90 | 1.50 en dessous | −1.50 | −$750 |
| Objectif (vente) | 190.40 | 3.00 au-dessus | +3.00 | +$1,500 |

</div>

Vérifions l'arithmétique. Le risque par action est 187.40 − 185.90 = 1.50, donc 500 × 1.50 = **$750 à risque**. La récompense par action est 190.40 − 187.40 = 3.00, donc 500 × 3.00 = **$1,500 visés**. La récompense divisée par le risque est 3.00 ÷ 1.50 = 2, soit un **ratio récompense/risque de 2:1**.

**Ce ratio est fixé à l'instant même où vous soumettez le bracket.** Vous ne découvrez pas votre ratio récompense/risque après coup en regardant le résultat — vous l'avez choisi en tapant trois chiffres dans une case.

**Et un bracket en 2:1 nécessite un taux de réussite supérieur à 33.3% juste pour atteindre le seuil de rentabilité.** Dix trades de cette taille : quatre gagnants produisent 4 × $1,500 = $6,000, six perdants produisent 6 × $750 = $4,500, soit un net de +$1,500 pour un taux de réussite de 40%. Descendez à trois gagnants et c'est $4,500 gagnés contre $5,250 perdus — négatif à 30%. Le ratio ne vous rend pas rentable ; il fixe la barre que vous devez encore franchir.

Sur un compte de $100,000, ce $750 représente 0.75% des capitaux propres — dans le plafond courant de 1% décrit dans [le dimensionnement de position et la règle du 1%](/blog/risk-management-position-sizing/). Notez que la position vaut $93,700, soit environ 94% du compte, alors que le montant réellement à risque est de $750. La taille de la position et la taille du risque sont des chiffres différents, et c'est le stop qui les sépare.

## Pourquoi placer le bracket avant l'entrée est tout l'intérêt psychologique

Voici la partie qui compte plus que toute la mécanique.

Quand vous attachez le stop et l'objectif *avant* que l'entrée ne s'exécute, vous prenez la décision de sortie au seul moment où vous n'avez ni position, ni P&L latent, ni ego dans le trade. Vous regardez un graphique et vous demandez « où aurais-je tort, et où prendrais-je l'argent ? ». Ce sont des questions analytiques.

Une fois que la position existe, ces deux mêmes questions deviennent émotionnelles. « Où aurais-je tort » devient « jusqu'où puis-je supporter de regarder ça baisser ». « Où prendrais-je l'argent » devient « et si ça continuait de monter ». Les traders qui fixent leurs sorties après être entrés élargissent systématiquement leur stop, parce que l'élargir fait disparaître la douleur du moment, et resserrent leur objectif, parce qu'engranger un petit gain paraît plus sûr que d'attendre.

Un bracket ne vous rend pas discipliné. Il déplace la décision au moment où la discipline est bon marché. Soyez honnête avec vous-même, cependant : rien ne vous empêche d'annuler et de replacer les ordres en cours de trade, et les débutants font exactement cela.

## Les erreurs de bracket que font les débutants

### Décalage de quantité après une exécution partielle

Vous soumettez un bracket pour 500 actions. Sur un marché réel, seules 300 s'exécutent avant que le prix ne s'éloigne. Votre stop et votre objectif, s'ils étaient dimensionnés pour 500, couvrent désormais 200 actions que vous ne possédez pas.

Si le stop se déclenche ensuite, une vente de 500 actions contre une position longue de 300 clôture votre position *et ouvre une position courte de 200 actions* — une position que vous n'avez jamais voulue, désormais non protégée, parce que le bracket a déjà fait son travail et annulé l'objectif. Certains courtiers ajustent automatiquement les quantités de bracket au montant exécuté ; d'autres non. Vous devez savoir lequel des deux vous utilisez avant que cela ne devienne un problème, pas après.

### Oublier que les ordres survivent à votre écran

Les ordres en attente vivent chez le courtier, pas dans votre navigateur. Fermez la plateforme, éteignez l'ordinateur, allez dormir — le stop et l'objectif continuent de fonctionner. C'est le but, mais cela signifie aussi qu'un bracket que vous avez mis en place puis oublié est une instruction active qui peut s'exécuter pendant que vous dormez ou êtes en réunion. Chaque bracket non surveillé est une décision que votre moi passé a prise à votre place.

### Des brackets des deux côtés d'un range

Un montage courant : le prix est coincé entre deux niveaux, alors vous placez un bracket d'achat au-dessus de la résistance et un bracket de vente en dessous du support, en espérant capter le côté par lequel ça cassera.

Le piège est que ces deux *entrées* ne sont pas liées entre elles à moins que vous n'en fassiez explicitement une paire OCO. Si elles ne sont pas liées et que le prix pointe au-dessus de la résistance, exécute votre position longue, se retourne, puis casse sous le support, vous êtes également exécuté sur la position courte — retourné de long à court au pire moment du yo-yo. Liez les entrées en OCO et l'entrée du côté opposé meurt à l'instant où l'autre s'exécute.

## Ce qu'un ordre bracket ne peut pas faire

Un bracket est une machine, et les machines ne lisent pas les graphiques.

**Il ne peut pas s'adapter à de nouvelles informations.** Si le setup change de forme — le mouvement s'essouffle, le volume se tarit, le niveau sur lequel vous tradiez cesse de tenir — votre bracket s'en moque. Il reste aux deux prix que vous avez choisis il y a vingt minutes et attend.

**Un objectif mécanique peut se retrouver quelque part que le graphique n'a jamais justifié.** Fixez chaque objectif à exactement 2R parce que 2R sonne professionnel, et vous placerez parfois un ordre à cours limité dans le vide juste après un palier de résistance évident, puis regarderez le prix se retourner à 20 cents de celui-ci. Le ratio devrait être un résultat de l'emplacement des niveaux de sortie sensés, pas une donnée de départ que l'on force le graphique à accommoder. Un bracket en 2:1 n'est bon que si le marché offre plausiblement ces 3.00 de hausse avant les 1.50 de baisse.

**Et il ne garantit pas le prix que vous avez saisi.** Sur les marchés réels, un stop devient un ordre au marché une fois déclenché, et les ordres au marché s'exécutent au prix disponible, qui peut être pire que votre niveau de stop — voir [ordre au marché vs ordre à cours limité](/blog/market-orders-vs-limit-orders/) pour comprendre pourquoi cette distinction fait mal. Votre risque de $750 est une estimation, pas une garantie.

## Pratiquez cela sur le simulateur

Le panneau d'ordres de `/fr/simulator/` de Stockade comporte des champs facultatifs **Stop Loss** et **Take Profit** situés juste sous la quantité, et ils se comportent comme une paire OCO : le niveau atteint en premier par le prix simulé ferme l'intégralité de votre position et efface les deux champs en même temps. Remplissez les trois chiffres avant d'appuyer sur B, puis ne touchez plus délibérément au panneau et observez quel côté est touché.

Une mise en garde honnête, car elle change ce que vous pouvez apprendre ici. Les exécutions de Stockade sont bien moins friction­nelles que les réelles — pas de spread bid-ask, pas d'exécutions partielles — mais elles ne sont pas littéralement sans friction. Le simulateur vérifie vos niveaux contre un nouveau prix toutes les 800 millisecondes, et enregistre la sortie au tick qui *a franchi* le niveau plutôt qu'au niveau lui-même, donc un stop ou un objectif atterrit quelques centimes plus loin que là où vous l'aviez fixé. L'absence d'exécutions partielles est ce qui compte ici : cela signifie que le problème de décalage de quantité décrit plus haut **ne peut pas se produire sur le simulateur**, ce qui en fait le seul mode d'échec de bracket qu'il vous faut apprendre plutôt qu'expérimenter. Tout le reste — s'engager à l'avance sur un ratio, résister à l'envie d'élargir le stop, découvrir à quelle fréquence un objectif en 2:1 est manqué de quelques centimes — est entièrement disponible.

Effectuez vingt trades avec bracket où vous fixez les niveaux d'abord et ne les ajustez jamais, puis consultez vos résultats réalisés sur le [simulateur de paper trading de Stockade](/fr/simulator/) et voyez quel serait votre taux de réussite réellement nécessaire.
