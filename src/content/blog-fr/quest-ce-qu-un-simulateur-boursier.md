---
title: "Qu'est-ce Qu'un Simulateur Boursier et Pourquoi en Utiliser Un"
description: "Un simulateur boursier permet de trader les mécanismes réels du marché avec de l'argent virtuel. Comment ça marche, et ce qu'il peut vraiment vous apprendre."
date: 2026-03-23
tags: ["Bases"]
slug: "quest-ce-qu-un-simulateur-boursier"
translationOf: "what-is-a-stock-market-simulator"
---

La première fois que la plupart des gens passent un trade réel, ils apprennent deux choses à la fois : comment fonctionne le logiciel, et si leur idée sur le marché était bonne. Ce sont des problèmes très différents, et les mélanger coûte cher. Vous cliquez sur « vendre » alors que vous vouliez « vendre à découvert », vous achetez 100 actions alors que vous en vouliez 10, vous découvrez que votre ordre stop n'a en fait jamais été soumis — et chacune de ces erreurs vous coûte de l'argent réel pour apprendre quelque chose qu'un manuel aurait pu vous enseigner.

Un simulateur boursier sépare ces deux problèmes. Il vous donne une interface de trading complète, un graphique de prix qui évolue comme un marché évolue, et un solde d'argent fictif, si bien que les erreurs mécaniques ne coûtent rien. Vous pouvez être mauvais avec le logiciel en privé.

## Ce qu'est réellement un simulateur boursier

Un simulateur est une plateforme de trading où l'argent et le flux de prix sont tous deux simulés, et où tout ce qui est construit autour fonctionne comme dans la réalité. Soyons clairs sur les données : les prix de Stockade sont générés algorithmiquement, pas récupérés depuis une plateforme d'échange, et il n'y a aucun flux en direct derrière eux. Ce qu'ils font, c'est se *comporter* comme des données de marché — de véritables bougies OHLC avec une ouverture, un plus haut, un plus bas et une clôture, un volume qui varie de barre en barre, et les longues mèches qui rendent les vrais graphiques difficiles à lire. Les types d'ordres sont les vrais types d'ordres. Le calcul du compte — solde en cash, taille de position, profit et perte latents, capitaux propres du compte — suit la même arithmétique qu'utilise votre courtier. Ce qui manque, c'est le règlement-livraison : personne n'envoie votre ordre à une plateforme d'échange, et aucun cash ne quitte un compte.

Cette distinction compte. Un simulateur n'est pas un jeu à thème boursier ; c'est un modèle fonctionnel d'un marché dont les conséquences ont été retirées. Les compétences qui se transfèrent sont les compétences mécaniques — dimensionner une position, travailler un ordre, tenir un registre. Celle qui ne se transfère pas est celle dont vous avez le plus besoin, et nous y reviendrons plus bas.

Le simulateur de Stockade vous fait démarrer avec $100,000 de capital virtuel et fonctionne entièrement dans votre navigateur. Aucune inscription ni compte n'est nécessaire ; vos positions et votre historique vivent dans le stockage local de votre navigateur. Cette conception a un compromis évident — effacez les données de votre navigateur et votre historique disparaît avec elles — mais elle signifie que vous pouvez démarrer en quelques secondes plutôt que de remplir un formulaire.

## Les mécanismes que vous êtes réellement là pour apprendre

Avant toute question de stratégie, il existe une couche de pure plomberie qui piège presque tout le monde. C'est ce qu'un simulateur enseigne le mieux.

### Les types d'ordres

Un **ordre au marché** achète ou vend immédiatement au prix actuellement disponible. Il garantit que vous serez exécuté ; il ne garantit pas le prix.

Un **ordre à cours limité** fixe un maximum que vous êtes prêt à payer ou un minimum que vous êtes prêt à accepter. Placez un ordre d'achat à cours limité sur une action à $47.50 pendant qu'elle se traite à $48.20, et rien ne se passe jusqu'à ce que le prix vienne à vous. Il garantit le prix ; il ne garantit pas du tout que vous serez exécuté. ([Ordre au marché vs ordre à cours limité](/blog/market-orders-vs-limit-orders) approfondit quand chacun est approprié.)

Un **stop-loss** est un ordre en attente qui s'active lorsque le prix évolue contre vous au-delà d'un niveau que vous avez choisi. C'est le mécanisme qui transforme « je devrais sans doute couper ça » en quelque chose qui se produit, que vous surveilliez ou non.

Un **take-profit** est la même idée dans l'autre sens — un ordre qui clôture votre position une fois qu'elle atteint un objectif.

Un **bracket OCO** (« one cancels the other », l'un annule l'autre) associe un stop-loss et un take-profit autour d'une position ouverte. Celui qui s'exécute en premier annule l'autre, si bien que vous ne pouvez pas vous retrouver avec un ordre orphelin qui ouvre une nouvelle position après que vous êtes déjà sorti. Voir [les ordres OCO et bracket expliqués](/blog/oco-and-bracket-orders) pour le mécanisme complet.

Stockade prend en charge ces cinq types. En passer une centaine avec de l'argent fictif est la façon dont ce vocabulaire devient un réflexe. Les raccourcis clavier aident : `B` pour acheter, `S` pour vendre, `F` pour tout liquider (fermer toutes les positions). Quand vos mains connaissent la touche de sortie, l'hésitation cesse d'être un facteur.

### Le dimensionnement de position, avec de vrais chiffres

Voici le calcul que la plupart des débutants ne font jamais, et la chose la plus utile à répéter dans un simulateur.

Disons que vous avez un compte de $100,000 et que vous décidez qu'aucun trade ne peut vous faire perdre plus de 1% de ce compte. Cela représente $1,000 de risque par trade.

Vous voulez acheter une action à $52.00. Vous regardez le graphique et décidez que si elle passe sous $50.00, votre idée était fausse. Votre risque par action est $52.00 − $50.00 = $2.00.

Votre taille de position est votre risque en dollars divisé par votre risque par action : $1,000 ÷ $2.00 = **500 actions**.

C'est une position de $26,000 (500 × $52.00) sur un compte de $100,000. Remarquez ce qui s'est passé : vous n'avez pas choisi la taille d'abord pour espérer ensuite. Le niveau du stop et votre limite de risque l'ont produite pour vous.

Changez maintenant une seule donnée. Même action, même entrée à $52.00, mais vous décidez que le niveau qui invalide votre idée est $51.00 au lieu de $50.00. Le risque par action est $1.00, donc la taille devient $1,000 ÷ $1.00 = **1,000 actions** — une position de $52,000, deux fois plus grande, pour le même risque de $1,000. Un stop plus serré ne signifie pas moins de risque ; il signifie une position plus grande et une probabilité plus élevée d'être sorti par le bruit ordinaire du marché.

Répétez cette arithmétique trente fois dans un simulateur et elle devient automatique. Apprenez-la sur un compte réel et chaque répétition a un prix. [Le dimensionnement de position et la règle du 1%](/blog/risk-management-position-sizing) couvre la formule en détail, y compris le calcul de récupération après un drawdown.

## Lire le graphique est une compétence à part

Les graphiques du simulateur sont des graphiques en chandeliers (japonais) avec un histogramme de volume en dessous, chaque bougie résumant une période. Les indicateurs disponibles — EMA 9, EMA 20, EMA 50, plus VWAP, RSI et MACD — sont ceux que vous verrez référencés partout, et les avoir à l'écran pendant que vous tradez est la façon de découvrir lesquels vous utilisez réellement par rapport à ceux qui rendent simplement le graphique encombré.

La plupart des gens commencent avec six indicateurs et finissent avec deux. Un simulateur est l'endroit où vous pouvez vous permettre de le découvrir.

La [page Marchés](/fr/markets/) propose 29 instruments : 14 actions, 8 cryptomonnaies, 3 paires de forex et 4 contrats à terme (/NQ, /ES, /CL, /GC). Les actions et les cryptomonnaies sont des tickers inventés, pas de vraies entreprises ni de vraies cryptomonnaies ; seules les paires de forex et les contrats à terme utilisent des noms réels. Ils se situent à des niveaux de prix très différents, ce qui vaut la peine d'être pratiqué — dimensionner une paire de forex cotée à quatre décimales est un exercice mental différent de dimensionner un contrat à terme sur indice qui se traite dans les milliers, et déplacer la virgule décimale est une erreur classique de débutant qui ne coûte rien ici.

Les prix générés ne reproduisent pas non plus la personnalité propre à chaque instrument réel : un seul modèle de volatilité s'applique à tous les symboles. Ce que vous apprenez ici, c'est l'arithmétique et le déroulement du travail.

Pour une pratique délibérée, le [Chart Simulator](/fr/chart-simulator/) relit une session graphique chandelier par chandelier, si bien que vous avancez d'une barre à la fois sans savoir ce qui vient ensuite. La session est générée plutôt qu'extraite d'une archive, donc vous ne pouvez pas reconnaître le graphique et tricher — et ne pas savoir ce que fait la prochaine bougie est tout l'intérêt. Le mode Live avance par ticks de 800ms, plus proche du rythme réel et de la pression réelle.

## Ce que les statistiques vous disent que votre mémoire ne vous dira pas

La mémoire est une mauvaise tenue de registre pour le trading. Vous vous souviendrez du trade qui a couru de 8% en votre faveur et oublierez les quatre petites pertes qui l'ont financé.

La [page Analytics](/fr/analytics/) garde le registre à votre place : courbe d'équité, journal de trading, taux de réussite, facteur de profit, gain moyen et perte moyenne, drawdown maximum, et une heatmap par heure de la journée.

Deux d'entre eux méritent une explication :

**Le facteur de profit** est le profit brut divisé par la perte brute. Si vos trades gagnants ont rapporté $6,200 et vos perdants ont coûté $4,000, votre facteur de profit est de 1.55 — vous gagnez $1.55 pour chaque $1.00 perdu. Tout ce qui dépasse 1.0 est net positif.

**Le taux de réussite seul ne vous dit presque rien.** Une stratégie qui gagne 35% du temps avec un gain moyen de $900 et une perte moyenne de $300 produit, sur 100 trades, (35 × $900) − (65 × $300) = $31,500 − $19,500 = **$12,000**. Une stratégie qui gagne 70% du temps avec un gain moyen de $200 et une perte moyenne de $600 produit (70 × $200) − (30 × $600) = $14,000 − $18,000 = **−$4,000**. Le taux de réussite le plus élevé est la stratégie perdante. Vous ne pouvez pas le voir sans conserver les chiffres.

La heatmap par heure de la journée tend à produire la découverte la plus inconfortable : beaucoup de gens constatent qu'une plage horaire précise de la session concentre la majorité de leurs pertes.

## Ce qu'un simulateur ne peut pas vous enseigner

C'est la partie que la plupart des articles sur ce sujet omettent, et l'omettre est malhonnête.

**Le trading simulé retire le poids émotionnel de l'argent réel, qui est la partie la plus difficile du trading.** Traverser un drawdown de $2,400 en capital virtuel est légèrement intéressant. Traverser un drawdown de $2,400 en argent que vous avez gagné est une expérience physique — et la discipline qui a parfaitement tenu pendant trois mois sur un simulateur s'effondre très souvent dès la première semaine de trading réel. Les règles n'échouent pas parce que c'étaient de mauvaises règles. Elles échouent parce que les suivre coûte quelque chose. Un simulateur ne peut pas vous facturer ce coût, donc il ne peut pas tester si vous êtes prêt à le payer.

**Les exécutions dans un simulateur ont très peu de friction.** Votre ordre s'exécute au prix que vous voyez, instantanément, en totalité ; seules les sorties stop et target glissent, du tick qui a franchi votre niveau. Les ordres réels font face au slippage — l'écart entre le prix attendu et le prix obtenu, qui s'élargit précisément quand le marché bouge vite et que vous voulez le plus être exécuté. Les ordres réels font aussi face aux exécutions partielles, où vous demandez 500 actions et n'en obtenez que 300. Aucun des deux n'apparaît ici à une échelle réelle, donc les résultats simulés sont systématiquement un peu meilleurs que ce que produiraient les mêmes décisions en réel.

**Les commissions, les spreads, les coûts d'emprunt et les impôts ne sont pas modélisés de la façon dont votre courtier spécifique les appliquera.** Une stratégie qui dégage un maigre profit dans un simulateur peut devenir nette négative une fois que les coûts réels s'y ajoutent.

**Les données de prix sont générées, elles ne contiennent donc aucun comportement de marché réel.** Les bougies de Stockade proviennent d'un algorithme, pas d'une plateforme d'échange. C'est très bien pour s'entraîner à la mécanique — un carnet d'ordres se moque de l'origine du chiffre — mais un pattern qui « fonctionne » ici a été testé contre de l'arithmétique, pas contre un marché. Il n'y a pas de publications de résultats, pas de chocs d'actualité, aucune des structures récurrentes que les traders essaient réellement d'exploiter. Les conclusions de type backtest tirées de données générées ne valent rien. Utilisez le simulateur pour apprendre comment trader, pas pour découvrir quoi trader.

La bonne façon de lire un bon résultat de simulateur est : « mes mécanismes sont sains et mon idée n'est pas manifestement fausse. » Pas : « ça va marcher. »

## Comment utiliser un simulateur pour qu'il aide vraiment

Traitez le solde virtuel comme s'il était réel. Dès l'instant où vous commencez à prendre des positions de $40,000 « pour voir ce qui se passe », la pratique cesse d'être une pratique.

Tradez une seule taille et un seul setup jusqu'à avoir 40 ou 50 entrées dans le journal, puis regardez les statistiques plutôt que vos souvenirs. Écrivez pourquoi vous êtes entré avant d'entrer, pas après être sorti. Et quand vous passerez à l'argent réel, réduisez votre taille jusqu'à ce qu'une perte totale soit véritablement ennuyeuse — à ce moment-là, vous ne testez plus la stratégie, vous vous testez vous-même. [Le guide du paper trading](/blog/paper-trading-guide) traite cette transition plus en détail.

## Pratiquez cela sur le simulateur

Ouvrez le simulateur de trading, prenez le solde virtuel de $100,000, et faites une chose en premier : calculez le nombre d'actions à partir de votre niveau de stop avant d'entrer, comme le montre l'arithmétique ci-dessus. Faites-le dix fois, en appuyant sur `F` pour tout liquider quand votre stop est atteint plutôt que de vous convaincre de « juste une bougie de plus ». Consultez ensuite le journal de trading sur la page Analytics et comparez votre perte moyenne à ce que vous aviez prévu. Cette seule boucle enseigne plus qu'une semaine de lecture.

[Démarrer sur le simulateur](/fr/simulator/)
