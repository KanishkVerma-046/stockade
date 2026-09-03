---
title: "Ordre au Marché vs Ordre à Cours Limité : Quand Utiliser Chacun"
description: "Un ordre au marché garantit l'exécution mais pas le prix. Un ordre à cours limité garantit le prix mais pas l'exécution. Tout le reste en découle."
date: 2026-05-11
tags: ["Types d'Ordres", "Bases"]
slug: "ordre-au-marche-vs-ordre-limite"
translationOf: "market-orders-vs-limit-orders"
---

Vous aviez fait le travail. Tout le trade était planifié : entrée à 24.80, stop à 24.40, objectif à 25.60. Quarante cents de risque pour quatre-vingts cents de récompense — un trade en 2:1. Puis vous avez cliqué sur achat au marché pour 400 actions d'un titre peu liquide, et la confirmation est revenue à **25.20**.

Rien n'a changé sur le graphique pendant cette seconde. Votre trade, lui, a complètement changé. Depuis 25.20, votre stop est à 80 cents et votre objectif à 40 cents : vous risquez 80 pour gagner 40, l'exact inverse du trade que vous aviez planifié, et cette différence de 40 cents a coûté $160 sur 400 actions avant même que la position n'ait une seconde d'existence.

Ce seul clic est la différence entre les deux types d'ordres que chaque plateforme place devant vous.

## Stockade ne peut pas reproduire le problème que cet article décrit

Ceci doit être dit d'emblée, pas en note de bas de page.

Les exécutions de Stockade ont presque aucune friction. Il n'y a pas de spread bid-ask, pas d'exécution partielle, et pas de carnet d'ordres dans le simulateur de paper trading de Stockade. Un ordre au marché s'exécute exactement au prix affiché à l'écran. Un ordre à cours limité s'exécute immédiatement au prix que vous saisissez dans la case — il n'attend pas que le marché atteigne votre niveau, il ne se met pas en file d'attente, et il ne reste jamais sans être exécuté. La seule exception est une sortie stop-loss ou take-profit : celles-ci sont vérifiées contre un nouveau prix toutes les 800 millisecondes et enregistrées au tick qui a franchi votre niveau, donc elles s'exécutent un peu au-delà plutôt que pile dessus. Tous les prix sur Stockade sont générés dans votre navigateur, il n'y a donc ni plateforme ni contrepartie avec qui négocier.

Vous pouvez tout de même pratiquer la **mécanique** : choisir un type d'ordre avant de cliquer, décider un prix limite à l'avance plutôt que d'improviser, attacher un stop-loss et un take-profit à une entrée. Ces habitudes se transfèrent.

Le **coût**, lui, ne se transfère pas. Si vous pratiquez le paper trading d'une stratégie qui dégage 8 cents par action et qu'elle paraît rentable ici, cette même stratégie peut être neutre ou négative une fois qu'un vrai spread de 4 cents et un slippage occasionnel prennent leur part. Ne lisez jamais une exécution simulée comme une prévision d'une exécution réelle.

## Ce que chaque type d'ordre instruit réellement votre courtier de faire

Chaque ordre est une phrase d'instruction.

Un **ordre au marché** dit : *exécute ceci immédiatement au meilleur prix actuellement disponible, quel qu'il soit.* Vous avez précisé la quantité et la direction. Vous n'avez pas précisé de prix, et vous avez renoncé à toute prétention sur celui-ci.

Un **ordre à cours limité** dit : *exécute ceci uniquement à mon prix ou mieux, et si tu ne peux pas, ne l'exécute pas.* « Ou mieux » signifie plus bas pour un achat et plus haut pour une vente — un ordre d'achat à cours limité à 187.30 s'exécutera volontiers à 187.25, jamais à 187.35. Vous avez précisé un prix. Vous n'avez pas précisé que quoi que ce soit se produirait réellement.

<div class="table-wrap">

| | Ordre au marché | Ordre à cours limité |
|---|---|---|
| Garantit | L'exécution | Le prix |
| Ne garantit pas | Le prix | L'exécution |
| Usage typique | Sortir, urgence | Entrer, patience |
| Risque accepté | Payer plus que ce que vous avez vu | Manquer le trade complètement |

</div>

## Le compromis dont tout le reste découle

Voici la phrase à mémoriser : **un ordre au marché garantit l'exécution mais pas le prix ; un ordre à cours limité garantit le prix mais pas l'exécution.**

Toute autre considération ci-dessous est une conséquence de cette seule ligne. Un ordre au marché pour sortir d'un perdant ? Oui — vous vous souciez davantage de sortir que des derniers centimes, et l'exécution est exactement ce que garantit un ordre au marché. Un ordre à cours limité pour entrer sur un instrument à large spread ? Oui — c'est le prix qui est en jeu ici.

En cas d'hésitation, demandez-vous quel échec vous préférez vivre : vous exécuter à un prix moins bon que souhaité, ou ne pas vous exécuter du tout. La réponse désigne votre type d'ordre.

## Le spread bid-ask, et pourquoi un ordre au marché vous coûte cher à l'entrée

Il n'existe jamais un seul prix. Il y en a toujours deux. Le **bid** (cours acheteur) est le prix le plus élevé que quelqu'un est actuellement prêt à payer ; l'**ask** (cours vendeur) est le prix le plus bas auquel quelqu'un est actuellement prêt à vendre. Disons que le bid est à 187.38 et l'ask à 187.42. Le **spread** est 187.42 − 187.38 = **0.04**, et le **point médian** — le chiffre unique le plus juste pour désigner « le prix » — est 187.40.

Achetez 500 actions au marché. Un achat prend l'ask, donc vous payez 187.42 × 500 = **$93,710**. Au point médian, vous auriez payé 187.40 × 500 = $93,700. Vous êtes $10 en retard dès l'instant où vous êtes exécuté, alors même que le prix n'a pas bougé.

Ce n'est que la moitié de l'histoire, car il faut aussi sortir. Vendre au marché touche le bid à 187.38, donc un aller-retour — acheter à l'ask, vendre au bid, marché parfaitement inchangé — coûte le spread entier : 0.04 × 500 = **$20**.

Vingt dollars sur une position de $93,700, c'est environ 2 points de base et cela semble insignifiant. Ce ne l'est pas, une fois multiplié. Trois allers-retours par jour pendant 250 jours de trading, cela fait 750 allers-retours ; à $20 chacun, cela représente **$15,000** par an rien qu'en spread, avant les commissions et avant un seul trade perdant.

C'est pire sur les instruments peu liquides. Si un titre peu échangé affiche un bid de 42.10 et un ask de 42.35, le spread est de 0.25 — sur un point médian de 42.225, cela représente 0.59%, soit environ 28 fois le coût relatif ci-dessus. Un aller-retour de 200 actions y coûte 0.25 × 200 = $50, et l'action doit bouger d'un quart de point en votre faveur avant que vous ne reveniez à l'équilibre.

## Le slippage, et les conditions qui l'aggravent

Le slippage est l'écart entre le prix que vous avez vu au moment de cliquer et le prix que vous avez obtenu. Le spread est la partie prévisible ; le slippage est le reste. Il s'aggrave dans trois conditions, qui arrivent souvent ensemble :

- **Marchés rapides.** Pendant une publication de résultats ou une annonce économique, les cotations se mettent à jour plus vite que votre clic ne voyage. L'ask que vous visiez peut ne plus exister au moment où votre ordre arrive.
- **Carnets d'ordres minces.** Une cotation affiche un prix, mais seulement pour une certaine quantité. Si seulement 200 actions sont offertes à 42.35 et que vous en achetez 1,000, les 800 restantes s'exécutent contre ce qui se trouve au-dessus — 42.40, 42.55, et ainsi de suite. Votre exécution moyenne est pire que l'ask que vous aviez vu.
- **Grande taille.** Votre propre ordre est ce qui déplace le prix. Même mécanisme qu'un carnet mince, mais venant de l'autre direction.

L'exemple d'ouverture réunissait les trois à la fois : un carnet mince, une taille qui l'a consommé, et une cotation en mouvement. Un ordre à cours limité aurait refusé cette exécution.

## Les ordres à cours limité exécutables : le juste milieu pratique

Vous n'êtes pas obligé de choisir entre « n'importe quel prix » et « mon prix ou rien ». Un ordre à cours limité fixé à un niveau que le marché peut déjà atteindre s'appelle un **ordre à cours limité exécutable**, et c'est ce qu'utilisent la plupart des traders expérimentés.

Avec le bid à 187.38 et l'ask à 187.42, placez un ordre d'achat à cours limité à **187.45**. Comme il se situe au-dessus de l'ask actuel, il s'exécute immédiatement comme un ordre au marché — mais il refuse de s'exécuter au-delà de 187.45. Si le carnet est mince et que le prix s'emballe, votre pire scénario est plafonné plutôt qu'illimité. Contre le point médian de 187.40, ce pire scénario coûte 0.05 × 500 = **$25**, contre $10 à l'ask, contre les $200 qu'un dérapage de 40 cents aurait coûtés.

Vous échangez un peu de certitude d'exécution contre un plafond ferme sur la catastrophe. C'est généralement le bon compromis.

## Quand un ordre au marché est réellement le bon choix

Il existe une situation où un ordre au marché n'est pas seulement acceptable mais correct : **sortir d'une position qui évolue contre vous.**

Si votre niveau de stop est franchi et que vous devez être à plat, la certitude d'exécution est tout ce qui compte. Une sortie à cours limité à votre prix idéal peut rester non exécutée pendant que la perte s'aggrave, et une petite perte qui ne s'exécute pas devient une grande perte qui finit par s'exécuter. L'alternative à payer quelques centimes de plus n'est pas « une meilleure exécution », c'est « être toujours en position ». C'est pourquoi les [ordres stop-loss](/blog/stop-loss-orders-explained) déclenchent typiquement un ordre au marché une fois que le prix stop est traité.

La même logique couvre toute urgence réelle : clôturer avant une annonce programmée, sortir quand votre thèse s'est effondrée, tout liquider à la fin de votre session. Quand vous devez sortir, sortez.

## Quand un ordre à cours limité est le bon choix

Presque partout ailleurs.

**Les entrées.** Rien ne vous force à entrer dans un trade. Si votre plan dit 24.80, placez une limite à 24.80 et laissez le marché venir à vous. Une entrée que vous poursuivez a déjà bougé contre votre plan.

**Les instruments peu liquides.** Là où le spread est de 0.25 plutôt que 0.04, un ordre au marché cède de l'argent réel des deux côtés du trade.

**L'entrée échelonnée et patiente.** Si vous voulez 900 actions, empilez des limites à trois niveaux — 300 à 24.80, 300 à 24.65, 300 à 24.50 — et acceptez de peut-être n'en obtenir qu'une partie. Cela interagit directement avec votre [dimensionnement de position](/blog/risk-management-position-sizing) : une entrée partiellement exécutée est une position plus petite, et votre calcul de risque devrait refléter la taille réellement obtenue.

**Les sorties à un objectif.** Un objectif de profit n'est par définition pas urgent, donc une limite à votre prix est exactement ce qu'il faut. Associer une limite de take-profit à une sortie stop-loss est la structure derrière [les ordres OCO et bracket](/blog/oco-and-bracket-orders).

## L'ordre à cours limité qui ne s'exécute jamais a son propre coût

Un ordre à cours limité qui manque sa cible n'est pas gratuit, et les débutants sous-estiment systématiquement cela.

Revenons à la cotation 187.38 / 187.42. L'ask paraît cher, donc vous placez un ordre d'achat à cours limité à 187.30 — douze cents sous l'ask, valant 0.12 × 500 = $60 s'il s'exécute. Il ne s'exécute pas. Le prix ne redescend jamais jusqu'à votre niveau et file jusqu'à 191.00. Le mouvement que vous aviez correctement identifié était de 191.00 − 187.42 = 3.58 par action, soit **$1,790** sur 500 actions. Vous avez protégé $60 et sacrifié $1,790.

Ce n'est pas un argument contre les ordres à cours limité. C'est un argument contre le fait de les fixer avec avidité. Placez la limite là où vous voulez réellement faire le trade, pas quelques centimes mieux pour vous sentir malin. Un gagnant manqué ne laisse aucune trace dans votre journal de trading, ce qui explique précisément pourquoi il est si facile de l'ignorer.

## Pratiquez la décision sur le simulateur

Les exécutions de Stockade sont parfaites, donc vous ne pouvez pas y pratiquer le paiement d'un spread — mais vous pouvez pratiquer la décision qui détermine si vous en payez un. Ouvrez le [simulateur boursier gratuit de Stockade](/fr/simulator/), passez le carnet d'ordres du marché à la limite avant chaque entrée, et notez le prix limite que vous utiliseriez face à un vrai carnet d'ordres. Réservez ensuite les ordres au marché pour tout liquider — la touche F existe exactement pour ça. Portez ce réflexe sur une vraie plateforme et le spread sera la seule chose nouvelle à apprendre.
