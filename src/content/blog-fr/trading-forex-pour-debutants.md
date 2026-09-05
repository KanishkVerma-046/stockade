---
title: "Introduction au Trading Forex : Paires de Devises et Pips Expliqués"
description: "Une paire de devises, c'est être long sur une devise et short sur une autre. Comment lire une cotation, ce qu'est un pip, et pourquoi le levier forex fait mal."
date: 2026-07-13
tags: ["Forex", "Bases"]
slug: "trading-forex-pour-debutants"
translationOf: "forex-trading-for-beginners"
---

Vous ouvrez une plateforme forex pour la première fois et la cotation affiche EUR/USD 1.0872. Pas de signe dollar, quatre décimales, et le bouton d'achat demande des lots plutôt que des actions. Puis USD/JPY affiche 157.42, avec deux décimales, et quelqu'un vous dit qu'un mouvement de 20 pips sur les deux paires représente la même taille — même si sur l'une cela ressemble à 0.0020 et sur l'autre à 0.20.

La confusion est superficielle. Le forex a trois conventions qui piègent tout trader venu des actions — ce qu'est réellement une paire, ce qu'est un pip, et quelle taille fait un lot. Une fois ces notions assimilées, le reste se lit normalement.

## Chaque trade forex est long sur une devise et short sur une autre

C'est l'obstacle conceptuel. Achetez une action, une seule chose se produit : vous devenez propriétaire d'actions. Achetez EUR/USD, deux choses se produisent en même temps — vous devenez **long sur l'euro** et **short sur le dollar américain**, dans le même trade, au même instant. Vous ne pouvez pas faire l'un sans l'autre, car une devise n'a de prix qu'exprimé en termes d'une autre devise. Il n'existe pas de « prix de l'euro » absolu comme il existe un prix absolu pour une action.

Cela change la lecture du graphique. Une hausse d'EUR/USD ne signifie pas que l'euro est fort ; cela signifie que l'euro est fort *par rapport au dollar* — ce qui pourrait tout aussi bien être le dollar qui s'affaiblit pendant que l'euro ne fait rien.

La première devise de la paire est la **devise de base**, la seconde est la **devise de cotation**. Le nombre indique toujours : combien d'unités de la devise de cotation permettent d'acheter une unité de la devise de base.

- **EUR/USD 1.0872** — un euro coûte 1.0872 dollars américains.
- **USD/JPY 157.42** — un dollar américain coûte 157.42 yens.

Remarquez que le dollar se trouve de part et d'autre de ces deux paires. Achetez EUR/USD *et* achetez USD/JPY, et vous êtes short dollar sur un trade et long dollar sur l'autre, annulant partiellement votre propre position sans le vouloir. Pour la même raison, il n'existe aucune restriction à la vente à découvert en forex : une vente n'est qu'un achat de l'autre devise, rien n'est emprunté, et il n'y a pas de règle de l'uptick.

## Ce qu'est un pip, et pourquoi les paires JPY utilisent la deuxième décimale

Un **pip** — « percentage in point » — est l'incrément standard dans lequel les traders expriment un mouvement. Pour presque toutes les paires, c'est la **quatrième décimale**, 0.0001. Sur EUR/USD, un mouvement de **1.0872 à 1.0892** vaut 0.0020, soit **20 pips**.

Lorsque le yen est la devise de cotation, le pip est la **deuxième décimale**, 0.01. Sur USD/JPY, un mouvement de **157.42 à 157.62** vaut 0.20, soit également **20 pips**.

C'est à cette exception que les débutants perdent le fil, et elle n'est pas arbitraire. La convention garde au pip une taille *relative* à peu près constante entre les paires :

- EUR/USD : 0.0001 ÷ 1.0872 = **0.0092%** du prix
- USD/JPY : 0.01 ÷ 157.42 = **0.0064%** du prix

Même ordre de grandeur, donc 50 pips signifient une chose comparable sur les deux. Supposons maintenant que le yen utilise la quatrième décimale : 0.0001 ÷ 157.42 = **0.0000635%**, environ 145 fois plus petit, et une journée ordinaire à 0.8% sur USD/JPY s'afficherait comme environ 12,600 pips. La convention à deux décimales maintient les cotations du yen dans la même plage numérique que tout le reste.

Une subtilité supplémentaire : la plupart des courtiers affichent un chiffre supplémentaire, un **pip fractionnaire** valant un dixième de pip — EUR/USD en 1.08725, USD/JPY en 157.425. Lire ce dernier chiffre comme un pip gonfle par 10 chaque distance que vous mesurez.

## La valeur du pip dépend de la taille du lot et de la devise de cotation

Un pip est une distance. Ce qu'il *vaut* dépend du nombre d'unités que vous détenez. Le forex se trade en **lots** standardisés : un **lot standard** représente 100,000 unités de la devise de base, un **mini lot** en représente 10,000, et un **micro lot** en représente 1,000.

La valeur du pip est unités × taille du pip, exprimée dans la devise de **cotation**. Un lot standard d'EUR/USD : 100,000 × 0.0001 = **10 USD par pip**. La devise de cotation est déjà le dollar, donc c'est exactement $10 sans conversion, et le mouvement de 20 pips de 1.0872 à 1.0892 vaut 20 × $10 = **$200**. Toute paire cotée en USD, GBP/USD incluse, vaut précisément $10 par pip par lot standard.

USD/JPY, non. Sa devise de cotation est le yen, donc un lot standard rapporte 100,000 × 0.01 = **¥1,000 par pip**, et pour obtenir des dollars il faut diviser par le taux courant : 1,000 ÷ 157.42 = **$6.35 par pip**. Le même mouvement de 20 pips vaut ¥20,000, soit 20,000 ÷ 157.42 = **$127.05** — pas $200. Dimensionner un trade en yen comme si les pips valaient $10 vous fait risquer 36% de moins que prévu.

<div class="table-wrap">

| Lot | Unités | Valeur du pip EUR/USD | Valeur du pip USD/JPY (à 157.42) |
|---|---|---|---|
| Standard | 100,000 | $10.00 | ¥1,000 = $6.35 |
| Mini | 10,000 | $1.00 | ¥100 = $0.64 |
| Micro | 1,000 | $0.10 | ¥10 = $0.06 |

</div>

Ce sont les petits lots qui rendent le dimensionnement forex viable sur un petit compte. Avec $5,000 et un risque de 1% par trade — $50 — sur une configuration EUR/USD avec un stop de 25 pips, il vous faut une valeur de pip de 50 ÷ 25 = **$2.00**, soit 2 mini lots, ou 20,000 unités. Valeur notionnelle : 20,000 × 1.0872 = **$21,744**. Quatre fois votre compte contrôlé avec $50 à risque. [La formule de dimensionnement de position](/blog/risk-management-position-sizing/) fonctionne ici de façon identique ; seule l'unité change, passant du risque par action au risque par pip.

## Le spread est le principal coût que vous payez en forex retail

La plupart des courtiers forex retail ne facturent aucune commission. Ils sont rémunérés via le **spread** — l'écart entre le prix auquel vous pouvez vendre (bid) et le prix auquel vous pouvez acheter (ask).

Si EUR/USD est coté 1.0871 / 1.0873, le spread est de 2 pips. Vous achetez à 1.0873 et la plateforme marque votre position au bid, 1.0871, donc vous ouvrez **à -2 pips** — $20 sur un lot standard, avant même que le marché n'ait bougé.

Cela paraît anodin jusqu'à ce que vous le multipliiez par la fréquence. Dix allers-retours par jour sur un lot standard avec un spread d'1 pip donnent $10 × 10 = $100 par jour, soit sur 250 jours de trading, **$25,000** en spread seul. Les spreads s'élargissent aussi fortement autour des publications économiques et pendant les heures creuses après la clôture de New York.

## L'effet de levier forex est bien plus élevé que sur les actions, et c'est le danger

Un lot standard d'EUR/USD à 1.0872 représente $108,720 de devises. Personne ne dépose cette somme ; les courtiers exigent à la place un dépôt de marge, et les exigences en forex sont extrêmes selon les standards des actions. Un compte actions américain vous donne un levier de 2:1 au jour le jour, tandis que le levier forex réglementé va jusqu'à 30:1 dans l'UE et au Royaume-Uni et 50:1 aux États-Unis sur les paires majeures — et les courtiers offshore annoncent 500:1 et plus.

<div class="table-wrap">

| Levier | Marge pour 1 lot standard EUR/USD (notionnel de $108,720) |
|---|---|
| 2:1 (compte actions typique) | $54,360.00 |
| 30:1 (plafond retail UE/UK) | $3,624.00 |
| 50:1 (plafond retail US) | $2,174.40 |
| 500:1 (offshore) | $217.44 |

</div>

Lisez la dernière ligne et le piège saute aux yeux. Avec $2,000 et un levier de 500:1, vous pouvez détenir cinq lots standard — $543,600 de devises — pour $1,087.20 de marge, laissant $912.80 de libre. Cinq lots valent $50 par pip, donc un mouvement de **20 pips** contre vous coûte $1,000, plus que votre marge libre, et vous êtes liquidé. Vingt pips représentent 0.0020 ÷ 1.0872 = **0.18%** du prix. Un mouvement défavorable plus petit qu'une erreur d'arrondi sur un graphique d'actions met fin au compte.

Le discours marketing veut que l'effet de levier permette à un petit compte d'accéder à un grand marché. Le discours honnête est que le levier multiplie un résultat dont vous ne contrôlez pas le signe : il multiplie gains et pertes par le même facteur et ne change absolument pas votre espérance par trade, donc si votre stratégie perd de l'argent en moyenne, le levier n'est pas un chemin plus rapide vers le profit mais un chemin plus rapide vers zéro. Les courtiers régulés dans l'UE et au Royaume-Uni doivent publier la part de comptes retail qui perdent de l'argent, et les chiffres divulgués se situent généralement dans la fourchette de 70 à 80% ; les pertes liées à l'effet de levier en sont la raison dominante.

Traitez l'effet de levier comme une capacité que vous déclinez la plupart du temps : dimensionnez à partir de votre distance de stop et de votre budget de risque, et laissez l'exigence de marge tomber où elle tombe. [Les futures ont une mécanique de levier similaire](/blog/futures-trading-explained/) via la marge sur contrat, et la même discipline s'applique.

## Majeures, mineures, exotiques, et la semaine de trading 24 heures

Les paires sont regroupées par liquidité. Les **majeures** incluent toutes le dollar américain — EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD — et portent les spreads les plus serrés. Les **mineures**, ou croisées, associent deux majeures sans le dollar : EUR/GBP, EUR/JPY, GBP/JPY. Les **exotiques** associent une majeure à une devise plus petite ou de marché émergent — USD/TRY, USD/ZAR, USD/MXN — où les spreads sont dix à vingt fois ceux d'une majeure et où le prix bouge violemment sur des nouvelles politiques domestiques. Les débutants ont leur place dans les majeures, ne serait-ce que pour le coût.

Le forex tourne 24 heures sur 24, cinq jours par semaine, ouvrant avec Sydney vers 17h ET le dimanche et fermant à 17h ET le vendredi, avec quatre sessions régionales qui se relaient : Sydney, Tokyo, Londres, New York. Le volume le plus lourd se trouve au **chevauchement Londres–New York**, environ de 8h à 12h ET, quand les deux plus grands centres sont ouverts — les spreads y sont les plus serrés et les mouvements les plus amples. Les heures où seule l'Asie est ouverte sont généralement calmes et confinées à un range.

Un accès permanent n'est pas une invitation à trader en permanence. Choisissez la fenêtre qui convient à vos configurations et à votre vie ; que ce soit un chevauchement de deux heures ou une position tenue sur plusieurs jours relève de la décision entre [day trading et swing trading](/blog/day-trading-vs-swing-trading/). Et bien que la semaine soit continue, le forex présente des gaps le week-end — le lundi peut ouvrir loin de la clôture du vendredi, au-delà de tout stop resté en attente entre-temps.

## Ce que les trois paires de devises de Stockade peuvent et ne peuvent pas vous enseigner

Le simulateur et la liste des marchés de Stockade proposent exactement trois paires — EUR/USD, GBP/USD et USD/JPY — démarrant à 1.0872, 1.2714 et 157.42. Ce sont de vrais noms de paires, mais les données de prix derrière elles sont générées côté client par une marche aléatoire. Rien n'est coté depuis un marché réel, et ces prix de base sont des points de départ fixes, pas des taux en direct.

Soyez au clair sur ce que cela laisse de côté. Stockade ne modélise aucun spread bid-ask — un seul prix, donc un trade là-bas ne paie jamais le coût qui domine le forex retail réel. Il n'y a ni lots, ni marge, ni effet de levier, ni swap de nuit ; vous achetez une quantité d'unités contre un solde virtuel de $100,000, exactement comme pour une action. La série générée ne présente jamais de gap, donc aucun gap de week-end n'apparaît. Et la volatilité d'un chandelier à l'autre est une fraction fixe du prix de base de chaque instrument, identique pour tous les symboles du site, donc EUR/USD n'y montre pas les mouvements en pourcentage caractéristiquement faibles d'une véritable paire majeure.

Ce à quoi cela sert, c'est l'entraînement à la lecture : une cotation à quatre décimales, compter les pips sur un graphique sans d'abord les traduire en dollars, et 1.0872 à côté de 157.42 jusqu'à ce que les deux conventions ne demandent plus un instant de réflexion.

## Pratiquez cela sur le simulateur

Ouvrez EUR/USD et USD/JPY sur Stockade et lisez les distances en pips plutôt qu'en décimales — mesurez un swing sur chacune et vérifiez que les conventions à quatre et deux décimales produisent des mouvements comparables. Chiffrez ensuite le même trade deux fois sur le papier : ce qu'il coûterait ou rapporterait avec un lot standard ($10 par pip sur EUR/USD, $6.35 sur USD/JPY à 157.42) contre un micro lot. Rappelez-vous qu'aucun spread ni aucun effet de levier n'y sont modélisés, donc les deux forces qui dominent le forex retail réel sont absentes, et que l'argent virtuel rend la discipline de dimensionnement bien plus facile que ne le fera l'argent réel. Rendez ces conventions automatiques sur le [simulateur de paper trading de Stockade](/fr/simulator/) avant que tout cela n'ait un impact financier.
