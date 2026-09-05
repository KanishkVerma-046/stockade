---
title: "Comment Créer un Plan de Trading : Guide Étape par Étape pour Débutants"
description: "Un plan de trading est un document, pas une intention. Les sections nécessaires, un exemple de setup complet, et la règle pour savoir quand le modifier."
date: 2026-06-15
tags: ["Stratégie", "Gestion du Risque"]
slug: "comment-creer-un-plan-de-trading"
translationOf: "how-to-build-a-trading-plan"
---

Vous connaissez déjà vos règles. Vous pourriez les réciter tout de suite : couper les pertes rapidement, laisser courir les gains, ne pas courir après le prix. Puis une position tourne mal, et la règle devient discrètement « couper les pertes rapidement, sauf si ça semble sur le point de revenir, ce qui arrive généralement ». Rien n'a eu l'impression d'une violation, parce qu'il n'y avait rien à violer. La règle vivait dans votre tête, et votre tête l'a réécrite pendant que vous étiez occupé à perdre de l'argent.

C'est tout l'argument en faveur d'écrire un plan : non pas la discipline comme trait de caractère, mais un document avec des sections nommées, ouvert à côté de votre graphique, qui dit ce que vous aviez décidé quand vous étiez calme et que rien n'était en jeu.

## Pourquoi un plan non écrit n'est pas un plan

Un plan non écrit est un ensemble d'intentions, et les intentions se remodèlent sous la pression. Dans un trade perdant, votre cerveau résout un problème différent de celui d'il y a dix minutes — faire cesser l'inconfort — et le chemin le plus rapide pour y arriver est de décider que la règle n'a jamais vraiment été ce que vous pensiez.

Un plan écrit élimine cette négociation. Soit la condition inscrite sur la page était remplie, soit elle ne l'était pas. Vous pouvez toujours enfreindre la règle, mais désormais vous savez que vous l'avez enfreinte, et cela devient une violation consignée dans votre journal plutôt que de se dissoudre en « j'ai lu le setup différemment cette fois-là ».

Il est aussi **falsifiable**. Après quarante trades, vous pouvez vous demander si ces conditions précises ont produit quelque chose. Un plan non écrit ne peut jamais être testé, parce qu'il n'a jamais été le même plan deux fois de suite.

## Les neuf sections dont votre document de plan a besoin

Ouvrez un fichier texte ou une page de carnet et écrivez ces titres. L'ensemble devrait tenir sur une ou deux pages — un plan que vous ne lirez pas n'est que de la décoration.

```
PLAN DE TRADING — v1 — commencé le [date]

1. MARCHÉ ET UNITÉ DE TEMPS   Quels instruments, quel graphique, quelles heures.
2. DÉFINITION DU SETUP        Les conditions exactes qui doivent toutes être vraies.
3. DÉCLENCHEUR D'ENTRÉE       L'événement unique qui me fait entrer.
4. PLACEMENT DU STOP          Où j'ai tort, décidé avant l'entrée.
5. OBJECTIF ET SORTIE         Où je prends mon profit, et toute règle de sortie partielle.
6. RISQUE PAR TRADE           Pourcentage du compte, et la taille qui en résulte.
7. LIMITE DE PERTE JOURNALIÈRE  Le chiffre qui met fin à ma session.
8. CHECKLIST AVANT ENTRÉE     Cinq ou six questions oui/non.
9. REVUE ET RÉVISION          Quand je passe en revue, et quand je peux modifier cette page.
```

Chaque section force une décision que vous prendriez sinon dans l'instant. Travaillez-les dans l'ordre.

## Restreindre son marché et son unité de temps l'emporte sur tout couvrir

Les débutants surveillent tout, selon la théorie que plus d'instruments signifie plus d'opportunités. En pratique, cela signifie des jugements plus superficiels et aucun ressenti de la façon dont quoi que ce soit se comporte. Choisissez **un ou deux instruments et une unité de temps de graphique**, et notez-les. Si vous avez un emploi du temps chargé en journée, ce choix est en grande partie déjà fait pour vous — un graphique en 5 minutes que vous ne pouvez pas surveiller n'est pas une option réelle. Intraday contre détention sur plusieurs jours est la plus grande bifurcation du document ; [day trading contre swing trading](/blog/day-trading-vs-swing-trading/) couvre les contraintes qui la déterminent. Écrivez ensuite vos heures de session : « je trade entre 09h45 et 11h30 et n'ouvre plus rien de nouveau après » est vérifiable, et « je trade quand il y a une opportunité » ne l'est pas.

## Écrire une définition de setup qu'un inconnu pourrait vérifier

C'est la section que les débutants sautent, et celle qui rend possible tout le reste du plan. Le test : **un inconnu pourrait-il lire votre définition, regarder un graphique, et dire si le setup est présent — sans poser une seule question complémentaire ?**

« Acheter le repli dans une tendance haussière » échoue lamentablement. Qu'est-ce qu'un repli ? De quelle profondeur ? Deux personnes marqueraient le même graphique différemment, et vous aussi d'un jour à l'autre. Voici la même idée écrite de façon vérifiable.

**Setup : continuation sur repli EMA-9 en 5 minutes.** Les six conditions doivent toutes être vraies.

1. Sur le graphique 5 minutes, l'EMA 9 est au-dessus de l'EMA 20, l'EMA 20 est au-dessus de l'EMA 50, et les trois montent depuis au moins les 12 dernières bougies.
2. Le prix a imprimé un plus haut plus élevé dans les 10 dernières bougies.
3. Le prix se replie et touche ou passe légèrement sous l'EMA 9, mais aucune bougie du repli ne **clôture** sous l'EMA 20.
4. Le repli dure 3 bougies ou moins.
5. Le volume de chaque bougie de repli est inférieur au volume de la bougie d'impulsion qui a fait le plus haut.
6. L'horloge affiche une heure entre 10h00 et 15h00.

Chacune de ces conditions se répond par oui ou par non. La condition 3 met fin au débat sur la question de savoir si un repli est « allé trop loin » — c'est la clôture sous l'EMA 20 qui tranche, pas votre humeur. Notez aussi que les EMA sont retardées par construction : elles décrivent ce qui s'est déjà passé, donc ceci définit une condition qui s'est formée, pas une prédiction. Vous n'affirmez pas que le setup fonctionne, seulement qu'il est défini assez précisément pour le vérifier.

## Entrée, stop et objectif sont trois décisions distinctes

Prises ensemble dans l'instant, elles s'effondrent en une seule sensation : « ça a l'air bien ». Prises séparément et à l'avance, elles s'interrogent mutuellement — et souvent la réponse est que le trade ne vaut pas la peine d'être pris.

**Déclencheur d'entrée.** Un événement unique, pas une zone : *acheter en stop 0.02 au-dessus du plus haut de la première bougie 5 minutes qui clôture de nouveau au-dessus de l'EMA 9 après le repli. Si ça ne se déclenche pas dans les 3 bougies, annuler.* Sans cette clause d'annulation, vous vous retrouvez avec un ordre en attente rattaché à un setup déjà expiré.

**Placement du stop.** Un emplacement graphique, pas un montant en dollars : *0.02 sous le plus bas du repli.* Puis un veto : *si ce stop est à plus de 0.60 de l'entrée, ne pas prendre le trade.* Un stop doit se trouver là où le setup est prouvé faux ; si cet endroit est trop éloigné pour dimensionner raisonnablement, passez votre tour plutôt que de déplacer le stop quelque part de plus commode.

**Objectif et sortie.** *Prendre le profit à deux fois la distance de risque. Sortir à la clôture de la bougie de 15h00 quoi qu'il arrive.* La sortie basée sur le temps évite l'hémorragie lente d'une position que vous conservez parce que vous n'arrivez pas à vous décider.

Un exemple concret : l'entrée s'exécute à 48.32, le plus bas du repli était à 47.86, donc le stop se place à 47.84. Le risque par action est 48.32 − 47.84 = **0.48**, et l'objectif est 48.32 + (2 × 0.48) = **49.28**. Chaque chiffre existait avant que vous ne cliquiez sur achat, et les trois peuvent être soumis ensemble comme un bracket.

## Risque par trade et limite de perte journalière qui met fin à votre session

La section 6 convertit le risque en nombre d'actions. Sur un compte de $25,000 en risquant 1% — $250 — avec 0.48 par action, cela donne 250 ÷ 0.48 = **520 actions**. Notez que 520 actions à 48.32 représentent $25,126 d'exposition issus d'une décision de risque de $250 ; un petit chiffre de risque peut impliquer une position importante, c'est pourquoi cette arithmétique fait l'objet d'un traitement à part dans [le dimensionnement de position et la règle du 1%](/blog/risk-management-position-sizing/). Votre plan a besoin du pourcentage et de la formule sur la page, pas d'un chiffre que vous redérivez sous pression.

La section 7 est celle que la plupart des débutants omettent et dont ils ont le plus besoin. **Écrivez une limite de perte journalière et ce qui se passe quand vous l'atteignez.** Ici, trois pertes complètes font $750, soit 3% — donc : *à −$750 sur la journée, je ferme la plateforme.* Pas « je trade plus petit ». Fermée. Cela plafonne les dégâts causés précisément dans l'état où vous prenez vos pires décisions, c'est-à-dire juste après une perte.

## La checklist avant entrée, et les revues quotidiennes et hebdomadaires

La checklist est votre plan compressé en quelque chose que vous pouvez exécuter en vingt secondes avant chaque entrée :

- Les six conditions du setup sont-elles vraies en ce moment même ?
- Mon stop est-il identifié, et à moins de 0.60 ?
- Ai-je dérivé le nombre d'actions du stop plutôt que de l'habitude ?
- Mon objectif est-il fixé à 2R ?
- Suis-je dans les heures de session et sous ma limite de perte journalière ?
- Est-ce que je prends ce trade parce qu'il correspond au plan, ou parce que je veux être en position ?

Puis deux revues. La **revue quotidienne** prend dix minutes après la session : pour chaque trade, était-il dans le plan, et l'avez-vous exécuté comme écrit ? Notez la conformité séparément du profit et de la perte — un gain pris en dehors du plan est un résultat pire qu'une perte prise à l'intérieur du plan, parce qu'il enseigne la mauvaise leçon et sera répété.

La **revue hebdomadaire** regarde les agrégats : setups pris, setups ignorés, taux de conformité, et les indicateurs de performance couverts dans [analyser ses performances de trading](/blog/analyze-trading-performance-metrics/). C'est là que vous remarquez que les pertes se concentrent sur une certaine heure, ou que les trades hors plan représentent l'essentiel de votre drawdown.

## Quand vous avez le droit de modifier le plan, et quand vous ne l'avez pas

Une seule règle, et elle mérite d'être mise en gras sur la page : **le plan ne peut être révisé qu'à une revue programmée, après un échantillon significatif de trades — jamais en cours de session, et jamais immédiatement après une perte.**

Modifier le plan en cours de session ressemble à de l'adaptabilité. C'est de la rationalisation déguisée en plan. Le stop que vous élargissez à 10h40 parce que « les conditions ont changé » est le stop que vous auriez élargi pour n'importe quelle raison ; vous avez simplement trouvé la raison après coup. Ce qu'un trade perdant vous a appris sera encore vrai dimanche.

« Échantillon significatif » signifie assez de trades pour qu'un changement réponde à un schéma plutôt qu'au bruit — trente ou quarante est un plancher, et c'est encore peu. Quand vous révisez, changez **une seule chose**, augmentez le numéro de version, et datez-la. Modifiez trois règles à la fois et vous ne saurez jamais laquelle comptait.

Attendez-vous à ce que vos premiers plans soient faux. C'est le processus qui fonctionne : la version 1 existe pour être prouvée insuffisante par les preuves, ce qu'un plan non écrit ne peut jamais faire. Les traders qui progressent ne sont pas ceux qui ont deviné juste dès le premier jet — ce sont ceux dont le brouillon était assez précis pour être démontré faux.

Et soyez clair sur ce que ce document vous apporte. Un plan ne vous rend pas rentable ; aucun agencement de règles ne fabrique un edge. Il vous rend **cohérent**, ce qui est la seule condition sous laquelle vous pouvez découvrir si votre edge existe réellement. Quarante trades exécutés de la même manière produisent un résultat interprétable. Quarante exécutés de quarante façons différentes produisent une histoire.

## Pratiquez cela sur le simulateur

Écrivez vos neuf sections, puis prenez vingt trades sur le [simulateur de paper trading de Stockade](/fr/simulator/) en ne faisant rien d'autre que suivre la checklist — le solde virtuel de $100,000 et les raccourcis B / S / F rendent l'entrée triviale, ce qui est exactement pourquoi la checklist doit être délibérée. Deux des six conditions ne survivront pas au voyage, donc décidez à l'avance comment vous les traiterez. La condition 5 lit le volume, et Stockade dessine le volume comme un nombre aléatoire par bougie — le vérifier ici, c'est lire du bruit. La condition 6 lit une horloge de session que le simulateur n'a pas : il tourne en continu, clôturant une bougie en direct toutes les dix secondes, sans ouverture, sans clôture et sans 10h00, ce qui rend aussi inerte la ligne des heures de session de la section 1 et la question correspondante de la checklist. Traitez les deux comme automatiquement satisfaites et acceptez que l'exercice mobilise les quatre autres conditions ; les six restent dans le document, car les six sont correctes pour le marché réel pour lequel vous écrivez ce plan. Utilisez ensuite `/fr/analytics/` pour comparer les trades qui correspondaient à votre définition de setup à ceux que vous vous êtes convaincu de prendre. Deux mises en garde sur le résultat : les prix de Stockade proviennent d'une marche aléatoire côté client, pas d'un marché, donc un setup qui « fonctionne » ici indique que votre exécution était cohérente et ne dit rien sur l'edge — et le capital virtuel retire le poids émotionnel qui vous a fait réécrire la règle en premier lieu. Répéter le processus aide quand même, comme l'explique [le paper trading délibéré](/blog/paper-trading-guide/) ; ne confondez simplement jamais un résultat simulé avec un plan validé.
