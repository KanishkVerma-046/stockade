---
title: "Trading de Contrats à Terme : Contrats, Marge et Effet de Levier"
description: "Ce qu'est vraiment un contrat à terme, comment fonctionnent taille de tick et multiplicateur, pourquoi la marge est un dépôt de garantie, pas un prêt."
date: 2026-07-27
tags: ["Contrats à Terme", "Gestion du Risque"]
slug: "trading-de-contrats-a-terme-explique"
translationOf: "futures-trading-explained"
---

Un trader disposant de $20,000 ouvre un compte de contrats à terme, achète un contrat E-mini S&P 500 à 5,248.75, et voit l'indice chuter d'environ 2% pendant la séance suivante. Il s'attendait à perdre environ 2% de quelque chose. Ce qu'il a réellement perdu, c'est $5,248.75 — plus d'un quart du compte — parce que la position n'a jamais représenté $20,000 de quoi que ce soit. Elle représentait $262,437.50 d'exposition à l'indice, contrôlée par un dépôt.

Cet écart entre ce que vous déposez et ce que vous contrôlez est le sujet entier des contrats à terme (« futures »). Tout le reste — valeur du tick, mois d'échéance, contango — n'est que du détail empilé par-dessus.

## Un contrat à terme est une obligation, pas une part de propriété

Quand vous achetez une action, vous achetez une créance fractionnaire sur une entreprise. Vous possédez quelque chose. Sa valeur peut tomber à zéro, mais jamais en dessous, et personne ne vous envoie de facture.

Un contrat à terme est un objet entièrement différent : un accord standardisé, négocié en bourse, d'acheter ou de vendre une quantité précise de quelque chose à une date et un prix précis. Acheter un contrat /CL vous engage à prendre livraison de 1 000 barils de pétrole brut à l'échéance. En vendre un vous engage à les livrer. Entre-temps, vous ne possédez rien — vous détenez une obligation à double sens, et la contrepartie détient l'image miroir.

C'est la « standardisation » qui fait fonctionner ce marché. Chaque contrat /CL représente 1 000 barils de la même qualité aux mêmes conditions, si bien que les contrats sont interchangeables : vous sortez en vendant celui que vous avez acheté, pas en négociant votre sortie d'un accord, et la chambre de compensation se tient entre chaque acheteur et chaque vendeur. Presque personne ne prend livraison — les traders particuliers clôturent ou roulent leur position avant l'échéance. Mais l'obligation de livraison arrime le prix au marché sous-jacent, et c'est pourquoi la bourse exige un dépôt avant de vous laisser porter une position.

## Spécifications du contrat : multiplicateur, taille de tick et valeur du tick

Un prix de contrat à terme n'est pas un montant en dollars. C'est un nombre que vous convertissez en dollars via le multiplicateur du contrat. Stockade propose quatre symboles de contrats à terme sur [`/simulator`](/fr/simulator/) et [`/markets`](/fr/markets/), et chacun se convertit différemment.

<div class="table-wrap">

| Symbole | Contrat | Multiplicateur | Taille de tick | Valeur du tick | Prix | Notionnel |
|---|---|---|---|---|---|---|
| /ES | E-mini S&P 500 | $50 par point d'indice | 0.25 pt | $12.50 | 5,248.75 | $262,437.50 |
| /NQ | E-mini Nasdaq 100 | $20 par point d'indice | 0.25 pt | $5.00 | 18,421.25 | $368,425.00 |
| /CL | Pétrole brut | 1 000 barils | $0.01 | $10.00 | 78.34 | $78,340.00 |
| /GC | Or | 100 onces troy | $0.10 | $10.00 | 2,341.40 | $234,140.00 |

</div>

Faisons le calcul d'une ligne à la main. /ES à 5,248.75 avec un multiplicateur de $50 donne 5,248.75 × 50 = **$262,437.50** d'exposition notionnelle par contrat. L'incrément minimum est de 0.25 point d'indice, et 0.25 × 50 = **$12.50 par tick**. Bougez de dix ticks en votre faveur — 2.5 points d'indice — et vous avez gagné $125.

Confondre les spécifications coûte cher. /NQ tick au même incrément de 0.25 que /ES, mais avec un multiplicateur de $20, chaque tick vaut $5.00, pas $12.50 — et /NQ bouge bien plus de points par jour, donc une valeur de tick plus petite ne signifie pas un risque plus petit. /CL et /GC partagent une valeur de tick de $10 par des chemins complètement différents : un centime sur 1 000 barils, et dix centimes sur 100 onces.

Le notionnel n'est pas ce que vous pouvez perdre — un contrat ne tombe pas à zéro, pas plus que le S&P lui-même. Mais le notionnel est la base de calcul de votre P&L, et c'est le chiffre contre lequel se mesure l'effet de levier.

## Pourquoi la marge des contrats à terme est un dépôt de garantie, pas un prêt

C'est le point le plus mal compris des contrats à terme, et c'est là que l'intuition acquise sur les actions vous induit activement en erreur.

Sur un compte sur marge pour actions, la marge est de l'argent emprunté. Vous déposez $30,000, le courtier vous prête $30,000, vous achetez $60,000 d'actions, et vous payez des intérêts. L'action sert de collatéral. C'est une dette, et elle se comporte comme telle.

La marge des contrats à terme n'est pas un prêt. Rien n'est emprunté et aucun intérêt ne court, parce que rien n'a été acheté — vous êtes entré dans un accord, vous n'avez pas acheté un actif. La marge que vous déposez est un **dépôt de garantie** (« performance bond ») : un dépôt de bonne foi détenu par la chambre de compensation pour garantir que vous pourrez honorer vos obligations quotidiennes. C'est plus proche d'un dépôt de garantie locatif que d'un crédit hypothécaire.

Deux conséquences en découlent. Il n'y a aucun coût d'intérêt à porter une position à terme. Et — la moitié dangereuse — la taille du dépôt n'a aucun rapport avec la taille de votre obligation. Un dépôt de garantie est dimensionné pour couvrir environ un jour de mouvement défavorable plausible, pas la valeur du contrat. C'est exactement pourquoi l'effet de levier est aussi élevé.

## Marge initiale, marge de maintien et valorisation quotidienne au marché

Deux seuils gouvernent le compte, et ce ne sont pas les mêmes chiffres. La **marge initiale** est ce que vous devez avoir disponible pour ouvrir une position. La **marge de maintien** est le plancher plus bas au-dessus duquel vos capitaux propres doivent rester pour garder la position ouverte. Passez sous la marge de maintien et vous recevez un appel de marge, et devez restaurer le compte — généralement jusqu'à l'exigence initiale, pas simplement jusqu'au maintien.

Entre les deux se trouve la **valorisation quotidienne au marché** (« mark-to-market »). Les positions à terme sont réglées chaque jour sans exception : les gains sont crédités en espèces, les pertes débitées, à chaque séance, que vous clôturiez le trade ou non. Il n'existe pas de perte latente sur contrat à terme qui reste tranquillement dans les livres.

Tous les chiffres de marge ci-dessous sont **purement illustratifs** — les bourses et les courtiers les fixent, ils varient d'un courtier à l'autre, et ils augmentent quand la volatilité augmente. Ne traitez jamais un chiffre issu d'un article comme actuel.

Disons que la marge initiale sur /ES est de $13,000 et la marge de maintien de $11,800. Vous déposez $20,000 et achetez un contrat à 5,248.75.

- **Jour 1 :** le prix chute à 5,180.00 — 68.75 points × $50 = **−$3,437.50**, débités le soir même. Capitaux propres : $16,562.50. Au-dessus de la marge de maintien, aucune action.
- **Jour 2 :** le prix chute à 5,080.00 — 168.75 points × $50 = **−$8,437.50** cumulés. Capitaux propres : $11,562.50, sous le plancher de $11,800.
- **L'appel de marge :** restaurer les capitaux propres jusqu'à l'exigence initiale de $13,000. Vous virez **$1,437.50**, ou le courtier liquide à votre place.

Deux séances ordinaires. Un mouvement de 3.2% sur l'indice. Un appel de marge.

## L'arithmétique de l'effet de levier : ce qu'un mouvement de 2% fait au capital déposé

Divisez le notionnel par le dépôt et vous obtenez le ratio de levier. $262,437.50 ÷ $13,000 ≈ **20:1**. Vous contrôlez environ vingt dollars d'indice pour chaque dollar déposé.

Faisons maintenant le calcul qui compte :

- Mouvement défavorable de 2% sur le notionnel /ES : 262,437.50 × 0.02 = **$5,248.75**
- En proportion d'un dépôt de marge de $13,000 : 5,248.75 ÷ 13,000 = **40.4%**

Un mouvement de 2% sur le sous-jacent efface 40% du capital que vous avez déposé. Le S&P 500 connaît plusieurs journées à 2% par an en moyenne. Cette asymétrie — petit mouvement, dégâts proportionnels énormes — est la chose la plus importante de cette page, et c'est pourquoi [la règle du 1% et l'arithmétique du dimensionnement de position](/blog/risk-management-position-sizing) ne sont pas facultatives sur les contrats à terme. Cela signifie aussi que [le placement du stop-loss](/blog/stop-loss-orders-explained) doit venir avant l'entrée, pas après. Sur les actions, un stop oublié est un mauvais trade. À 20:1, c'est un événement de solvabilité.

## Échéance, roulement et contango sur les matières premières

Chaque contrat à terme meurt selon un calendrier. /ES arrive à échéance trimestriellement — mars, juin, septembre, décembre. Le pétrole brut arrive à échéance mensuellement. Pour conserver l'exposition au-delà de l'échéance, vous devez **rouler** : clôturer le contrat qui expire et ouvrir celui du mois suivant, généralement dans la semaine ou les deux semaines précédant l'échéance, à mesure que la liquidité migre en avant.

Les deux mois ne se négocient pas au même prix. Quand le contrat à échéance plus lointaine est plus cher que le plus proche — souvent parce que stocker du pétrole physique coûte de l'argent — le marché est en **contango**. Quand il est moins cher, typiquement quand une pénurie immédiate pousse les acheteurs à payer plus cher pour des barils disponibles tout de suite, c'est du **backwardation**.

Le contango est un coût réel pour un détenteur long. Si le /CL du mois en cours est à 78.34 et le mois suivant à 78.95, rouler un contrat long signifie vendre bas et acheter haut : 0.61 × 1 000 barils = **$610 par roulement**. Roulez chaque mois pendant un an sur un marché durablement en contango, et ce frein s'accumule même si le pétrole termine l'année inchangé. C'est pourquoi les positions sur matières premières détenues à travers de nombreux roulements sont souvent à la traîne par rapport au prix spot qu'elles sont censées suivre.

## Les micro-contrats comme point d'entrée réaliste pour les petits comptes

Les micro-contrats valent un dixième de leur parent E-mini, et pour la plupart des comptes particuliers, ils sont la seule taille de départ défendable. /MES vaut 1/10 de /ES : **$5 par point d'indice**, valeur de tick 0.25 × 5 = **$1.25**, notionnel à 5,248.75 de 5,248.75 × 5 = **$26,243.75**. /MNQ vaut 1/10 de /NQ, à $2 par point.

La différence pour un petit compte n'est pas cosmétique. Sur un compte de $5,000 avec un stop à 10 points d'indice :

- **1 contrat /ES :** 10 × $50 = **$500 de risque** — **10%** du compte sur un seul trade.
- **1 contrat /MES :** 10 × $5 = **$50 de risque** — **1%** du compte.

La version /MES est un trade normal. La version /ES est un pari qu'aucune conviction ne justifie. Les micro-contrats vous permettent aussi de vous positionner par dixièmes plutôt que de faire face à une décision tout-ou-rien — le même argument de granularité qui rend [le dimensionnement de position en forex](/blog/forex-trading-for-beginners) praticable avec des lots mini et micro.

## Ce que les symboles de contrats à terme de Stockade peuvent, et ne peuvent pas, vous enseigner

Soyons clairs sur cette limite. Les symboles /ES, /NQ, /CL et /GC de Stockade portent des noms bien réels, mais les prix qui se cachent derrière sont générés côté client par une marche aléatoire — pas de flux boursier, pas de données de marché, aucune archive historique nulle part dans le produit. Les symboles sont des étiquettes sur des séries synthétiques.

Le simulateur ne modélise pas non plus les mécanismes des contrats à terme. Le P&L est calculé par unité de quantité, exactement comme pour une action : pas de multiplicateur de contrat, pas de marge initiale ou de maintien, pas de débit de valorisation quotidienne, pas d'appel de marge, pas d'échéance ni de roulement. Trader 1 unité de /ES là-bas, ce n'est pas trader un contrat valant $262,437.50, et rien sur le site ne vous demandera jamais un virement bancaire.

Ce qui est utile, c'est de répéter le *processus* face à une action de prix ayant la forme des contrats à terme : fixer un stop avant l'entrée avec les raccourcis B/S/F, faire l'arithmétique du multiplicateur sur papier en parallèle d'une position ouverte, revoir les résultats dans [`/analytics`](/fr/analytics/). Et la limitation habituelle s'applique ici avec une force particulière — un simulateur retire le poids émotionnel de l'argent réel, et les vrais contrats à terme peuvent vous infliger une perte supérieure à la marge déposée si le marché saute par-dessus votre stop pendant la nuit.

## Pratiquez les mécanismes des contrats à terme sur le simulateur

Ouvrez /ES sur le simulateur et, avant de passer quoi que ce soit, notez le multiplicateur, la valeur du tick et le notionnel au prix actuel. Prenez ensuite une position et traduisez chaque mouvement en dollars de contrat dans votre tête — 2.5 points, c'est $125, dix points, c'est $500 — jusqu'à ce que la conversion devienne automatique. Faites de même sur /CL, où un centime vaut $10, pour que le réflexe se transfère plutôt que de s'attacher à un seul symbole. Puis faites la vérification de l'effet de levier : à 20:1, jusqu'où ce marché peut-il bouger avant que 40% d'un dépôt de garantie ne soit effacé ?

Commencez sur [le simulateur de paper trading de Stockade](/fr/simulator/) avec ce calcul écrit, pas estimé de tête.
