---
title: "Stratégie de Trading VWAP : Ce Que C'est et Comment les Traders l'Utilisent"
description: "VWAP, c'est le prix typique cumulé multiplié par le volume, divisé par le volume cumulé. L'arithmétique, pourquoi les institutions le suivent, ses limites."
date: 2026-05-04
tags: ["Indicateurs", "Stratégie"]
slug: "strategie-de-trading-vwap"
translationOf: "vwap-trading-strategy"
---

Vous avez acheté 500 actions à $50.60 et la position n'a bougé nulle part. Plus tard, vous vous demandez si $50.60 était même un prix sensé à payer. Le problème, c'est que « sensé » a besoin d'un point de référence, et les candidats évidents sont mauvais. Le prix de clôture est l'endroit où les dernières actions ont changé de mains, pas là où la plupart d'entre elles l'ont fait. Le point médian de la fourchette de la journée ignore si la journée a passé six heures au plus haut ou six minutes.

VWAP répond correctement à la question : il vous donne le prix moyen payé par l'action moyenne échangée depuis le début de la journée. Si le VWAP se situe à $50.38 et que vous avez payé $50.60, vous avez payé plus cher que ce qu'a coûté l'action typique de la journée. C'est une mesure, pas un signal, et l'utilité du VWAP vient du fait de le prendre au sérieux comme une mesure plutôt que de trader ses croisements.

## Ce que calcule le VWAP, et pourquoi ce n'est pas une moyenne mobile

VWAP signifie Volume Weighted Average Price (prix moyen pondéré par le volume). Le calcul est un total glissant divisé par un total glissant :

**VWAP = (prix typique cumulé × volume) ÷ (volume cumulé)**

Le prix typique est `(haut + bas + clôture) ÷ 3` — un chiffre unique représentant l'endroit où une barre s'est échangée, plutôt que seulement là où elle a terminé. Multipliez cela par le volume de la barre pour obtenir la valeur en dollars échangée dans cette barre, puis conservez une somme glissante à la fois du numérateur et du dénominateur depuis l'ouverture de la séance.

Cela diffère d'une moyenne mobile simple ou exponentielle sur deux points indépendants, et les deux comptent.

**La pondération.** Une SMA à 20 périodes donne à chacune de ses 20 clôtures exactement 1/20 du poids, que cette barre ait échangé 3 000 actions ou 3 millions. Le VWAP pondère chaque barre par les actions réellement échangées en son sein. Une barre à fort volume déplace beaucoup le VWAP ; une barre morte le déplace à peine. Si vous voulez le tableau complet de ce que le volume révèle et ne révèle pas, [le volume de trading a son propre article](/blog/understanding-trading-volume).

**La fenêtre.** Une SMA est une fenêtre glissante qui abandonne la barre la plus ancienne à chaque arrivée d'une nouvelle. Le VWAP n'abandonne rien — chaque barre depuis l'ouverture de la séance reste dans les deux totaux en permanence. Cette nature cumulative pilote la plupart du comportement du VWAP, y compris sa pire faiblesse, traitée plus bas. [La comparaison EMA contre SMA](/blog/moving-averages-ema-vs-sma) porte sur la façon de pondérer les barres *récentes* ; le VWAP ne participe pas du tout à cette compétition.

Pour le dire simplement : une moyenne mobile est un filtre de lissage appliqué au prix. Le VWAP est un fait comptable sur des transactions exécutées.

### Le détail du calcul sur trois barres

Prenons une action avec ces trois barres d'une minute.

<div class="table-wrap">

| Barre | Haut | Bas | Clôture | Prix typique | Volume | PT × Volume |
|---|---|---|---|---|---|---|
| 1 | 50.40 | 49.80 | 50.10 | 50.10 | 120 000 | 6 012 000 |
| 2 | 50.70 | 50.05 | 50.60 | 50.45 | 300 000 | 15 135 000 |
| 3 | 50.90 | 50.35 | 50.40 | 50.55 | 80 000 | 4 044 000 |

</div>

Le prix typique de la barre 1 est (50.40 + 49.80 + 50.10) ÷ 3 = 150.30 ÷ 3 = **50.10**. Celui de la barre 2 est (50.70 + 50.05 + 50.60) ÷ 3 = 151.35 ÷ 3 = **50.45**. Celui de la barre 3 est (50.90 + 50.35 + 50.40) ÷ 3 = 151.65 ÷ 3 = **50.55**.

Cumulons maintenant. Après la barre 1, le VWAP est 6 012 000 ÷ 120 000 = **50.10** — avec une seule barre, le VWAP est égal au prix typique de cette barre.

Après la barre 2, le numérateur est 6 012 000 + 15 135 000 = 21 147 000 et le dénominateur est 120 000 + 300 000 = 420 000. VWAP = 21 147 000 ÷ 420 000 = **50.35**.

Après la barre 3, le numérateur est 21 147 000 + 4 044 000 = 25 191 000 et le dénominateur est 500 000. VWAP = 25 191 000 ÷ 500 000 = **50.382**, soit $50.38.

Comparez cela à une moyenne non pondérée des trois prix typiques : (50.10 + 50.45 + 50.55) ÷ 3 = 151.10 ÷ 3 = 50.367. Le VWAP est ressorti plus haut parce que la barre 2 se trouvait au-dessus de la moyenne non pondérée et portait 300 000 des 500 000 actions échangées — 60% de tout ce qui a été échangé.

### Les mêmes prix avec le volume redistribué

Gardez les neuf valeurs de prix identiques et échangez les volumes des barres 2 et 3, de sorte que la barre 2 échange 80 000 et la barre 3 échange 300 000. Le numérateur devient 6 012 000 + (50.45 × 80 000 = 4 036 000) + (50.55 × 300 000 = 15 165 000) = 25 213 000. Le volume total est toujours 500 000. VWAP = 25 213 000 ÷ 500 000 = **50.426**.

Action de prix identique, volume total identique, et le VWAP a bougé de 4.4 centimes. Cette différence est tout l'intérêt de l'indicateur. Le VWAP ne suit pas où est allé le prix ; il suit où sont allées les actions.

## Pourquoi le VWAP se réinitialise à l'ouverture de la séance

Le VWAP est défini sur une séance, et à l'ouverture suivante, les totaux glissants reviennent à zéro. Cela découle de ce à quoi sert le VWAP. « Le prix moyen payé par action aujourd'hui » est une statistique cohérente. « Le prix moyen payé par action depuis un point non spécifié dans le passé » ne l'est pas, parce qu'elle dérive vers quelle que soit la période de plus fort volume qui se soit produite, aussi ancienne soit-elle.

Deux conséquences en découlent. D'abord, les barres juste après l'ouverture sont instables : avec cinq minutes au dénominateur, le VWAP oscille sur presque chaque barre, et il ne devient un point de référence stable qu'une fois qu'une part significative du volume de la journée s'est accumulée derrière lui.

Ensuite, le VWAP ne se reporte pas d'un jour à l'autre. Le VWAP d'hier n'est pas un niveau sur le graphique d'aujourd'hui. Les traders qui veulent un point de référence plus long utilisent le VWAP *ancré*, réinitialisant l'accumulation à partir d'un événement choisi — une publication de résultats, un swing low, une barre de cassure — plutôt qu'à partir de l'horloge. Même formule, point de départ délibérément choisi.

## Pourquoi les institutions utilisent le VWAP comme référence d'exécution

C'est la raison pour laquelle le VWAP compte, et cela n'a rien à voir avec les figures chartistes.

Un fonds qui doit acheter 4 millions d'actions ne peut pas envoyer un seul ordre. Il découpe la position sur toute la séance. Ensuite, quelqu'un doit juger si le trader a bien fait son travail, et l'étalon standard est le VWAP : le prix d'exécution moyen a-t-il battu la moyenne pondérée par le volume de la journée ? Achetez 4 millions d'actions à une moyenne de $50.31 contre un VWAP de séance de $50.38, et vous avez économisé sept centimes par action — $280,000. De nombreux desks sont rémunérés précisément sur cette référence, et les stratégies d'exécution algorithmique sont explicitement conçues pour la suivre.

Cela crée un comportement réel autour de cette ligne : les acheteurs qui travaillent de gros ordres deviennent plus disposés à acheter en dessous du VWAP et plus réticents au-dessus, parce que leur feuille de score le dit. C'est ce à quoi les gens font allusion quand ils disent que le VWAP est « l'endroit où les institutions défendent le prix ». C'est un effet réel sur les marchés liquides — mais un effet *comportemental* produit par la façon dont les traders sont évalués, pas une loi physique, et il est largement absent sur les titres peu échangés.

## Lire le VWAP comme un support et une résistance intrajournaliers

En raison de cette pression de référence, le VWAP agit souvent comme un niveau dynamique : le prix revient dessus, les acheteurs en retard sur leur journée interviennent, et le prix reprend sa course. Contrairement à un niveau horizontal tracé sur un plus haut antérieur, le VWAP se déplace tout au long de la séance, donc le niveau que vous observez à 10h15 n'est pas celui de 14h30.

Deux lectures coexistent, et les confondre est la manière la plus courante dont les traders détournent l'usage de cet indicateur.

Le **retour à la moyenne** s'applique dans une séance équilibrée, en range. Le prix s'étire loin du VWAP, cet étirement n'a pas de volume derrière lui, et il rebondit. Les traders vendent les extensions et visent le VWAP lui-même comme objectif.

La **continuation de tendance** s'applique dans une séance directionnelle. Le prix s'éloigne du VWAP et n'y revient jamais plus qu'en le touchant, donc vendre les extensions revient à combattre la tendance toute la journée. Cette lecture traite un repli *vers* le VWAP qui tient comme une entrée dans le sens du mouvement existant, et une clôture décisive à travers le VWAP comme l'échec de la tendance.

La version honnête, c'est que vous ne pouvez pas savoir dans laquelle des deux situations vous vous trouvez tant que la séance ne s'est pas partiellement déroulée. Ce que vous pouvez vérifier, c'est si le prix a croisé le VWAP à plusieurs reprises aujourd'hui ou est resté d'un seul côté. Des croisements répétés signifient que la lecture de retour à la moyenne a fonctionné ; des séances unidirectionnelles signifient qu'elle n'a pas fonctionné.

Certaines plateformes ajoutent des bandes d'écart-type — le VWAP plus et moins un, deux ou trois écarts-types du prix par rapport au VWAP. Elles donnent un chiffre à l'idée d'« étirement » plutôt qu'une estimation à l'œil, et un contact avec la deuxième bande est le déclencheur de retour habituel. Ce sont un raffinement réel, et elles héritent de toutes les limites ci-dessous. Stockade ne trace que la ligne VWAP, sans bandes.

## Là où le VWAP échoue

**Il ralentit tout au long de la séance.** À 15h30, le dénominateur contient six heures de volume. Une seule nouvelle barre déplace à peine la moyenne, quelle que soit sa violence. Le VWAP est à son plus réactif quand il est le moins fiable, et à son plus fiable quand il est le moins réactif, et rien n'y remédie — c'est de l'arithmétique.

**Il n'a aucun sens au-delà de l'échelle de temps intrajournalière.** Une moyenne cumulée de séance n'a aucune interprétation sur un graphique journalier ou hebdomadaire. Il n'y a pas de séance à laquelle se réinitialiser. Si vous détenez des positions à travers plusieurs jours, le VWAP n'est pas votre outil ; voyez [day trading contre swing trading](/blog/day-trading-vs-swing-trading) pour ce qui change selon la période de détention.

**Il ne vaut que ce que valent les données de volume derrière lui.** Le VWAP est une statistique pondérée par le volume, donc de mauvaises données de volume produisent une ligne fausse avec assurance. Les flux retail qui manquent les transactions hors bourse, ou les instruments dont le volume rapporté est peu fiable, vous donneront un VWAP qu'aucune institution ne prend réellement comme référence.

Et comme tout indicateur, le VWAP est rétrospectif. Il résume des transactions déjà passées. Il ne peut pas vous dire que la séance est sur le point de se retourner.

## Pratiquez la lecture du VWAP sur le simulateur

Les graphiques de Stockade proposent un bouton VWAP à la fois sur [`/simulator`](/fr/simulator/) et sur le simulateur de chandeliers, calculé avec la même formule que ci-dessus — prix typique multiplié par le volume, cumulé puis divisé. L'ancrage diffère cependant, et cette différence mérite d'être connue : la ligne du simulateur ne se réinitialise jamais à une ouverture de séance. Elle s'accumule sur une fenêtre glissante des bougies les plus récentes, donc ce que vous lisez est un VWAP glissant sans ancrage, plutôt que le VWAP de séance décrit dans la section sur la réinitialisation ci-dessus. Même arithmétique, aucun ancrage. Activez-le et entraînez la compétence mécanique : le prix est-il au-dessus ou en dessous, jusqu'où s'est-il étiré, cette séance croise-t-elle la ligne ou reste-t-elle d'un seul côté. Soyez toutefois clair sur ce que vous entraînez. Les prix de Stockade sont générés côté client par des marches aléatoires, et son volume est un nombre aléatoire tiré par bougie, non corrélé au mouvement du prix. Il n'y a aucune véritable participation derrière, donc le volume n'y confirme rien et l'effet de référence institutionnelle n'existe pas. Cela vide la ligne elle-même de sa substance, ce qui mérite d'être dit explicitement : le code VWAP du simulateur pondère chaque barre par ce volume aléatoire, et des poids aléatoires équivalent en pratique à des poids uniformes, donc la ligne tracée se comporte presque comme une moyenne non pondérée du prix typique plutôt qu'un véritable VWAP pondéré par le volume. La distinction de pondération décrite en haut de cet article est réelle, mais ce n'est pas ce que vous observez ici — des deux éléments qui séparent le VWAP d'une moyenne mobile, seule la fenêtre cumulative est observable sur Stockade. C'est de l'arithmétique réelle sur des données inventées — utile pour entraîner l'œil, inutile comme signal.

Une mise en garde survit au-delà du simulateur : les exécutions y comportent presque aucune friction — pas de spread bid-ask, pas d'exécution partielle, et seulement quelques centimes de slippage quand un stop ou un objectif se déclenche — et il n'y a pas de véritable argent en jeu. Attendre que le prix revienne au VWAP plutôt que de le poursuivre est la partie difficile, et c'est exactement la partie que le paper trading ne teste pas. [Ouvrez le simulateur boursier de Stockade](/fr/simulator/), activez le VWAP, et entraînez-vous à nommer à voix haute, avant la clôture de chaque barre, si la séance revient vers la ligne ou s'en éloigne en tendance.
