---
title: "Comment Lire les Graphiques en Chandeliers : Le Guide Complet du Débutant"
description: "Chaque chandelier condense quatre prix en une forme. Ce qu'encodent le corps et les mèches, les patterns à connaître, et pourquoi le contexte prime."
date: 2026-03-30
tags: ["Bases", "Analyse Technique"]
slug: "comment-lire-les-graphiques-en-chandeliers"
translationOf: "how-to-read-candlestick-charts"
---

Vous ouvrez un graphique et c'est un mur de rectangles rouges et verts avec des poils qui dépassent en haut et en bas. Quelqu'un vous dit que celui aux longues pattes près du bas est un hammer, et que cela signifie que les vendeurs sont épuisés. Vous l'achetez. Le prix continue de baisser. Le problème n'a jamais été que vous ayez mal identifié la forme — c'est que personne ne vous a expliqué de quoi la forme est faite, ni ce qu'elle peut honnêtement vous dire.

Un chandelier n'est pas un symbole que l'on mémorise. C'est l'enregistrement compressé d'un affrontement entre acheteurs et vendeurs sur une tranche de temps fixe, et une fois que vous savez le décompresser, les noms cessent d'avoir presque autant d'importance.

## Les quatre prix qu'encode chaque chandelier

Choisissez une unité de temps — disons cinq minutes. Chaque chandelier d'un graphique en cinq minutes résume exactement une fenêtre de cinq minutes avec quatre chiffres, toujours les mêmes quatre :

- **Ouverture (Open)** — le premier prix échangé de la fenêtre.
- **Plus haut (High)** — le prix le plus élevé atteint pendant celle-ci.
- **Plus bas (Low)** — le prix le plus bas atteint pendant celle-ci.
- **Clôture (Close)** — le dernier prix échangé avant la fin de la fenêtre.

Ce sont les valeurs OHLC, et le chandelier les dessine géométriquement. Le **corps** est le rectangle entre l'ouverture et la clôture. Si la clôture est au-dessus de l'ouverture, le corps est dessiné en vert (ou creux) et le chandelier est haussier pour cette fenêtre. Si la clôture est en dessous de l'ouverture, il est rouge (ou plein) et le chandelier est baissier. Les **mèches** — aussi appelées ombres ou queues — sont les fines lignes qui partent du corps vers le haut jusqu'au plus haut, et vers le bas jusqu'au plus bas.

Le corps vous indique donc où la fenêtre s'est *terminée* par rapport à où elle a *commencé*. Les mèches vous indiquent où le prix *est allé* et a été rejeté. C'est dans cette seconde partie que vit l'essentiel de l'information, et c'est la partie que les débutants ignorent.

## Lire un chandelier isolé : un exemple détaillé

Prenons un chandelier. Il ouvre à 187.42, monte jusqu'à 189.10, chute jusqu'à 186.90, et clôture à 187.05.

<div class="table-wrap">

| Composant | Calcul | Valeur | Part de la range |
|---|---|---|---|
| Range totale | 189.10 − 186.90 | 2.20 | 100% |
| Corps (ouverture → clôture) | 187.42 − 187.05 | 0.37 | 17% |
| Mèche supérieure | 189.10 − 187.42 | 1.68 | 76% |
| Mèche inférieure | 187.05 − 186.90 | 0.15 | 7% |

</div>

La clôture est à 0.37 en dessous de l'ouverture, donc c'est un chandelier rouge — mais à peine. Sur une ouverture à 187.42, une baisse de 0.37 représente 0.20%. Si vous ne regardiez que le prix de clôture, vous qualifieriez cette fenêtre de plate et passeriez à autre chose.

La forme raconte quelque chose de bien plus fort. Les acheteurs ont poussé le prix de 1.68 vers le haut — une avancée de 0.90% — puis ont rendu chaque centime, et même un peu plus. Trois quarts de tout ce qui s'est passé dans cette fenêtre s'est passé *au-dessus* de l'endroit où le chandelier a fini. Quelqu'un était prêt à vendre dans cette hausse, et à la clôture, les acheteurs qui l'avaient poursuivie étaient tous en perte latente.

C'est toute la compétence : lire le chandelier comme une séquence d'événements, et non comme une image. Le corps de 0.37 est le chiffre le moins intéressant de l'ensemble.

## Ce qu'un chandelier peut, et ne peut pas, vous dire

Il peut vous dire l'équilibre des pressions à l'intérieur d'une fenêtre, et où le prix a été rejeté. Il ne peut pas vous dire ce qui se passe ensuite.

Il ne peut pas non plus vous dire l'*ordre* des événements. Notre chandelier exemple est compatible avec « a d'abord grimpé à 189.10, puis s'est effondré à 186.90 » et tout aussi compatible avec « a d'abord chuté à 186.90, puis a bondi à 189.10 avant de retomber ». Mêmes quatre chiffres, même dessin, deux histoires très différentes. Descendez à une unité de temps plus courte et l'ambiguïté se résout — mais sur le chandelier qui est devant vous, elle ne se résout pas.

Et un chandelier n'a de sens que relativement à ses voisins. Une range de 2.20 est énorme sur un instrument qui bouge normalement de 0.40 en cinq minutes, et sans intérêt sur un instrument qui bouge normalement de 3.00.

## Les patterns à un chandelier à connaître

Quatre formes couvrent l'essentiel de ce qu'un chandelier isolé peut exprimer.

### Doji — le match nul

L'ouverture et la clôture sont presque identiques, donc le corps est une fine ligne. Exemple : ouvre à 42.18, clôture à 42.21, avec un plus haut de 42.66 et un plus bas de 41.79. Le corps fait 0.03 pour une range de 0.87 — moins de 4%. Le prix a parcouru pas moins de 2% de sa valeur et est revenu presque exactement à son point de départ. Acheteurs et vendeurs se sont neutralisés. Après une longue tendance, cette pause mérite d'être remarquée. Au milieu d'un range calme, c'est du bruit.

### Hammer — rejet par le bas

Petit corps près du haut de la range, longue mèche inférieure, peu ou pas de mèche supérieure. Exemple : ouvre à 64.30, chute à 61.90, se redresse, clôture à 64.10, plus haut à 64.55. La mèche inférieure fait 2.20 sur une range de 2.65 — 83% de tout ce qui s'est passé était en dessous du corps, et le prix a refusé d'y rester. Les vendeurs l'ont poussé vers le bas et ont été submergés. La forme identique apparaissant après une *tendance haussière* s'appelle un hanging man (pendu), et se lit comme baissière. Même géométrie, implication opposée, entièrement décidée par ce qui a précédé.

### Shooting star — rejet par le haut

Le hammer retourné : petit corps près du bas, longue mèche supérieure. Notre exemple à 187.42 vu plus haut se rapproche de cette forme. Les acheteurs ont poussé, ont échoué, et le chandelier a clôturé près de son ouverture ou en dessous.

### Marubozu — un seul côté a dominé toute la fenêtre

Presque aucune mèche. Exemple : ouvre à 23.10, clôture à 23.95, plus haut 23.98, plus bas 23.08. Le corps fait 0.85 sur une range de 0.90 — 94%. Le prix a ouvert, est parti dans une direction pour un gain de 3.7%, et n'a jamais rien rendu. C'est une conviction à sens unique, et le signal à chandelier unique le plus net qui soit.

## Les patterns à deux et trois chandeliers

Les patterns à plusieurs chandeliers sont plus forts parce qu'ils montrent un *changement* dans l'équilibre, pas seulement son état.

**Bullish engulfing (avalement haussier).** Un chandelier baissier ouvre à 51.40 et clôture à 50.85 (corps de 0.55). Le chandelier suivant ouvre plus bas à 50.72 et clôture à 51.63 — un corps de 0.91 qui recouvre entièrement le corps précédent, 1.65× sa taille. Les vendeurs avaient le contrôle, puis les acheteurs l'ont pris et ont fini au-dessus de l'endroit où la vente avait commencé. La version baissière (bearish engulfing) en est le miroir exact.

**Harami.** La configuration inverse : un grand chandelier suivi d'un petit entièrement contenu dans son corps. Un chandelier vert va de 128.40 à 132.10 (corps de 3.70) ; le suivant ouvre à 131.20 et clôture à 130.05 — un corps de 1.15, soit 31% du premier, entièrement à l'intérieur de celui-ci. Ce n'est pas un retournement, c'est une *pause*. Le momentum s'est arrêté. Ce qui suit est indécis.

**Morning star (étoile du matin).** Trois chandeliers. D'abord, un chandelier rouge décisif : ouvre à 78.90, clôture à 75.60. Ensuite, un petit chandelier indécis près des plus bas — ouvre à 75.20, clôture à 75.35, corps de 0.15. Enfin, un chandelier vert qui ouvre à 75.55 et clôture à 77.80. Le point médian du corps du premier chandelier est 77.25, et la clôture du troisième le dépasse, récupérant 2.20 de la baisse initiale de 3.30 — environ deux tiers. Vente massive, pause, récupération. L'**evening star (étoile du soir)** est la même structure en trois temps, mais à un sommet.

## Pourquoi l'emplacement compte plus que le pattern

Voici ce qui sépare les gens qui savent lire un graphique de ceux qui se contentent de repérer des formes : un chandelier identique signifie des choses différentes à des prix différents.

Un hammer qui se forme exactement sur un niveau de prix qui a déjà rebondi trois fois est un rejet à un endroit que d'autres traders surveillent. Le même hammer au milieu de nulle part est simplement un chandelier où quelqu'un a acheté un creux. Le pattern n'a pas changé ; l'emplacement, si. C'est pourquoi [les niveaux de support et résistance](/blog/support-and-resistance-levels/) valent la peine d'être appris avant de mémoriser le moindre nom de pattern.

Les deux autres éléments de contexte à vérifier :

- **Le volume.** Un chandelier d'engulfing sur un volume triple de la moyenne récente signifie qu'une participation réelle est entrée. La même forme sur un volume faible signifie que très peu de chose s'est passé. [Le volume de trading](/blog/understanding-trading-volume/) est le test de bon sens pour chaque pattern que vous trouvez.
- **La tendance.** Les patterns de retournement ont besoin de quelque chose à retourner. Un morning star après trois jours de baisse est un signal ; un morning star dans un range latéral n'est que décoration. Une [moyenne mobile](/blog/moving-averages-ema-vs-sma/) vous donne une lecture rapide et objective du régime dans lequel vous vous trouvez.

La confluence est le mot pour ce que vous recherchez : pattern, emplacement et participation pointant tous dans la même direction. Quand un seul des trois est présent, vous avez une forme, pas un setup.

## Les limites honnêtes des patterns en chandeliers

Les patterns en chandeliers ont, à eux seuls, un pouvoir prédictif modeste. Quand les chercheurs les testent systématiquement sur de larges échantillons, les taux de réussite se rapprochent suffisamment du hasard pour que le pattern seul ne constitue pas un edge — et tout edge qui apparaît malgré tout tend à se réduire une fois qu'on soustrait le spread, la commission et le slippage.

Ils échouent constamment. Un bullish engulfing digne d'un manuel, formé sur un support évident, se résout à la baisse assez souvent pour que, si vous ne pouvez pas survivre à une série d'échecs, vous ne devriez pas les trader. Les patterns sont aussi, par construction, tournés vers le passé : ils décrivent un affrontement déjà conclu. Rien dans le dessin ne sait ce que fera le prochain chandelier.

Ce à quoi ils servent réellement, c'est à *cadrer* une idée. Un hammer sur un support vous donne une structure définie — un point d'invalidation juste sous le plus bas de la mèche, une raison de s'y intéresser, et un endroit où se tromper rapidement. Cela vaut énormément, et c'est une chose différente de la prédiction.

## Entraînez-vous à lire les chandeliers un par un

La façon la plus rapide d'intérioriser tout cela est de rencontrer les chandeliers un par un plutôt que d'étudier un graphique déjà achevé. Le [simulateur de graphique](/fr/chart-simulator/) de Stockade fait défiler une session générée chandelier par chandelier, au rythme que vous choisissez, ce qui vous permet de vous arrêter avant l'apparition de la prochaine barre, de dire à voix haute ce que vous attendez, puis d'avancer d'un cran pour le découvrir. Deviner avant la révélation est la partie qui vous entraîne ; faire défiler un graphique déjà achevé ne le fait jamais. Chaque prix sur Stockade est généré algorithmiquement — ce ne sont pas des données réelles ou issues d'une plateforme d'échange — mais la structure OHLC, les mèches et le volume se comportent comme le fait une vraie structure de graphique, ce qui est exactement ce dont vous avez besoin pour entraîner votre œil. Si vous voulez voir une barre se construire plutôt qu'arriver déjà formée, le [simulateur boursier de Stockade](/fr/simulator/) avance en continu par ticks, si bien que le chandelier le plus récent s'étire et se redessine sous vos yeux jusqu'à ce que sa fenêtre se ferme. Dans les deux cas, travaillez sur un seul instrument, nommez chaque chandelier pendant dix minutes, et remarquez à quelle fréquence la forme dont vous étiez sûr s'est résolue dans l'autre sens.
