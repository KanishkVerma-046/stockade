---
title: "Lignes de Tendance et Canaux : Comment Bien les Tracer"
description: "Une ligne de tendance reste subjective sans règles : quels points ancrer, mèches ou corps, combien de contacts, quand la cassure est réelle, et les canaux."
date: 2026-11-30
author: "Stockade Team"
tags: ["Analyse Technique"]
slug: "lignes-de-tendance-et-canaux"
translationOf: "trend-lines-and-channels"
---

Donnez le même graphique à deux traders et demandez à chacun de tracer la ligne de tendance haussière. L'un relie les mèches les plus basses. L'autre relie les corps des bougies et ignore un pic qui « ne compte pas ». Leurs lignes croisent le prix actuel à des niveaux différents : l'un voit donc la tendance intacte, l'autre la voit cassée. Tous deux pensent l'avoir tracée correctement.

C'est le problème des lignes de tendance. Elles comptent parmi les outils les plus simples de l'analyse technique, et parmi les plus faciles à plier à ce que l'on croit déjà. La solution n'est pas un meilleur coup d'œil. C'est un ensemble de règles que vous fixez avant de regarder, pour qu'une ligne soit quelque chose que l'on peut vérifier, pas quelque chose que l'on ressent.

## Ce qu'est une ligne de tendance, et ce qu'elle n'est pas

Une ligne de tendance haussière relie des swing lows ascendants : des points où le prix a plongé puis est reparti à la hausse. Une ligne de tendance baissière relie des swing highs descendants. [Le guide des supports et résistances](/fr/blog/niveaux-de-support-et-resistance/) explique comment repérer les swing highs et les swing lows ; une ligne de tendance repose sur la même idée qu'un niveau horizontal, inclinée pour suivre la tendance.

Le choix des points de swing est le premier endroit où une ligne se fait tordre, donc définissez-les aussi. Une définition vérifiable : un swing low est une barre dont le plus bas est inférieur aux plus bas des deux barres situées de chaque côté. Vous pouvez choisir un autre nombre de barres, mais une fois ce nombre choisi, une barre se qualifie ou non, et vous ne pouvez pas promouvoir un creux commode au rang de point d'ancrage parce qu'il donne une plus jolie ligne. Pour une tendance baissière, inversez : un swing high est une barre dont le plus haut est supérieur aux plus hauts des deux barres de chaque côté.

Ce qu'une ligne de tendance n'est pas, c'est une prévision. C'est une description de l'endroit où les acheteurs sont intervenus jusqu'ici pendant une hausse. S'ils interviendront de nouveau au même rythme ascendant, c'est la question que pose la ligne, pas une question à laquelle elle répond.

## Mèches ou corps : choisissez et tenez-vous-y

La mèche d'une bougie montre le prix le plus extrême qui s'est échangé ; son corps montre où elle a ouvert et clôturé. Si cela ne vous est pas familier, [le guide des chandeliers](/fr/blog/comment-lire-les-graphiques-en-chandeliers/) en détaille l'anatomie. Vous pouvez ancrer une ligne sur l'un ou l'autre, et les traders débattent de la bonne méthode.

Nous pensons que le débat compte moins que la constance. Notre préférence est d'ancrer sur les mèches, parce qu'un plus bas est un prix qui s'est réellement échangé, et de juger les cassures sur les clôtures, parce que, comme le dit le guide des supports et résistances, une mèche est un prix rejeté et une clôture un prix accepté. Ancrer sur les corps est une alternative défendable qui ignore les pics brefs. Ce qui n'est pas défendable, c'est de passer de l'un à l'autre sur un même graphique, en choisissant la version qui embellit la ligne. Notez votre choix par écrit.

## Combien de contacts avant qu'une ligne compte

Deux points font toujours une ligne parfaite. C'est de la géométrie, pas une preuve. La convention habituelle, comme le dit [le guide de StockCharts sur les lignes de tendance](https://chartschool.stockcharts.com/table-of-contents/chart-analysis/trend-lines), est que deux points tracent une ligne de tendance et qu'un troisième la confirme. La raison est simple : le troisième contact est la première fois que le prix rencontre une ligne qui n'a pas été tracée à travers lui.

Voici un exemple chiffré sur un graphique hypothétique, en comptant les barres depuis la gauche :

1. **Ancrez deux swing lows.** La barre 10 a un plus bas de $48.00 et la barre 30 un plus bas de $50.00.
2. **Calculez la pente.** ($50.00 − $48.00) ÷ (30 − 10) = $0.10 par barre.
3. **Projetez-la.** À la barre 45, la ligne se trouve à $48.00 + 35 × $0.10 = $51.50.

Décidez ensuite de ce qui compte comme un contact. Les prix touchent rarement une ligne au cent près, alors fixez une tolérance à l'avance. Une fraction de l'amplitude typique d'une barre est un repère raisonnable : si l'[ATR](/fr/blog/stop-loss-avec-atr/) de ce graphique vaut $0.80, un quart représente $0.20, et tout plus bas compris entre $51.30 et $51.70 à la barre 45 compte comme troisième contact. Un plus bas à $51.38 confirme la ligne. Un plus bas à $50.90 dépasse la zone, et savoir si c'est une cassure dépend de l'endroit où la barre clôture, ce qui est la règle suivante.

Le même guide de StockCharts ajoute deux autres conventions : des contacts régulièrement espacés font une meilleure ligne que des contacts groupés, et plus une ligne est pentue, moins elle pèse comme support ou résistance. Une ligne qui monte à un rythme que le prix ne peut pas tenir se fait casser par une simple pause, ce qui en dit peu sur la tendance.

## L'échelle arithmétique ou logarithmique change la ligne

Sur un graphique court, cela compte à peine. Sur un graphique long, cela peut beaucoup déplacer la ligne.

Une échelle de prix arithmétique espace de façon égale des montants égaux en dollars ; une échelle logarithmique espace de façon égale des variations égales en pourcentage. Disons qu'une action monte de $20 à $40 en 20 barres. Une droite sur un graphique arithmétique monte de $1.00 par barre et se trouve à $30.00 à la barre 10. Une droite sur un graphique logarithmique monte d'environ 3.5% par barre et se trouve à $28.28 à la barre 10. Mêmes points d'ancrage, $1.72 d'écart à mi-chemin. StockCharts note que les plus bas s'alignent souvent mieux sur une échelle semi-logarithmique pour les lignes de long terme. Quelle que soit celle que vous utilisez, c'est un élément de plus à fixer à l'avance plutôt qu'à changer jusqu'à ce que la ligne colle.

## Quand une cassure est une cassure

Décidez-le avant que le prix y arrive, car une fois qu'il y sera, vous voudrez la réponse qui arrange votre position. Une règle que nous utiliserions :

- **Une cassure est une clôture au-delà du bord extérieur de la zone de tolérance,** pas une mèche qui y pénètre.
- **Mesurez la ligne à la barre concernée,** pas là où elle se trouvait quand vous l'avez tracée. Une ligne ascendante continue de monter.

Pour poursuivre l'exemple, à la barre 52 la ligne se trouve à $48.00 + 42 × $0.10 = $52.20, donc le bord inférieur de la zone est à $52.00. Une bougie qui plonge à $51.95 et clôture à $52.30 a fait passer une mèche à travers la zone, mais ce n'est pas une cassure. Une clôture à $51.85 en est une.

Même dans ce cas, une cassure n'est pas un retournement. StockCharts considère les cassures de ligne de tendance comme un avertissement plutôt que comme le dernier mot. Un prix qui casse une ligne de tendance haussière peut se retourner à la baisse, mais il peut aussi évoluer latéralement ou continuer de monter selon une pente plus douce. La cassure vous dit que l'ancien rythme de progression s'est arrêté, rien de plus.

Cela détermine aussi où placer un stop. Si votre idée de trade est « la tendance tient », l'idée est fausse une fois la ligne cassée, donc le stop se place juste au-delà de la zone. Comme la ligne monte à chaque barre, un stop qui lui est lié doit être relevé au fur et à mesure, ce qui en fait un trailing stop, avec les compromis que décrit [le guide des stop-loss](/fr/blog/ordres-stop-loss-explique/).

## Tracer un canal parallèle

Un canal ajoute une seconde ligne, parallèle à la ligne de tendance, passant par l'extrême opposé. Pour une tendance haussière, prenez le swing high le plus élevé entre vos deux points d'ancrage et tracez par ce point une ligne de même pente. Pour une tendance baissière, faites l'inverse : une parallèle passant par le swing low le plus bas entre les deux plus hauts que vous avez ancrés.

Dans l'exemple, disons que le plus haut le plus élevé entre les barres 10 et 30 est survenu à la barre 22, à $51.40. La ligne de tendance à la barre 22 se trouve à $48.00 + 12 × $0.10 = $49.20, donc le canal fait $2.20 de large. À la barre 45, où la ligne inférieure est à $51.50, la ligne supérieure est à $53.70.

Un canal donne une idée approximative de l'endroit où un mouvement au sein de la tendance a eu tendance à caler, ce que certains traders utilisent comme zone d'objectif. Si vous le faites, faites les calculs comme [le guide du ratio risque/rendement](/fr/blog/ratio-risque-rendement-et-esperance/) : la distance jusqu'à la ligne supérieure est le rendement, la distance jusqu'à un stop sous la zone inférieure est le risque, et le ratio vous donne le taux de réussite dont vous auriez besoin. Les canaux se cassent comme n'importe quelle autre ligne.

## Pourquoi la version honnête d'une ligne de tendance est une zone

Mettez tout cela bout à bout et une ligne de tendance cesse d'être une ligne. C'est une bande, dont la largeur est fixée par votre tolérance de contact, et dont la pente dépend des choix que vous avez faits pour les points d'ancrage et l'échelle. Deux traders soigneux qui suivent des règles différentes traceront des bandes différentes, et aucun n'aura tort.

C'est pourquoi nous traiterions toute ligne de tendance comme une zone, en y ajoutant trois règles de notre cru :

- **Pas de nouveau tracé après une cassure.** Si la ligne casse, elle est cassée. Une nouvelle ligne exige de nouveaux points de swing formés après la cassure.
- **Utilisez l'unité de temps que vous tradez.** Une ligne sur un graphique en cinq minutes et une ligne sur un graphique journalier décrivent des choses différentes. [Le guide day trading contre swing trading](/fr/blog/day-trading-contre-swing-trading/) explique pourquoi votre style fixe l'unité de temps.
- **Souvenez-vous que des lignes apparaissent sur n'importe quel graphique.** Reliez assez de plus bas et quelque chose ressemblera à une tendance. C'est pour cela que les règles passent en premier.

Si vous voulez un guide de tendance que personne ne puisse tracer différemment, une moyenne mobile en est un ; [le guide des moyennes mobiles](/fr/blog/moyennes-mobiles-ema-vs-sma/) traite de leur usage comme support dynamique. La contrepartie, c'est qu'elle est en retard sur le prix, comme l'explique ce guide.

## Pratiquez cela sur le simulateur

Stockade n'a pas d'outils de dessin ; vous tracerez donc les lignes sur papier, sur une capture d'écran, ou par le calcul. Sur le [simulateur de graphiques](/fr/chart-simulator/), choisissez deux swing lows et survolez chacun pour lire sa valeur L dans la barre de valeurs. Comptez les barres qui les séparent, calculez la pente et projetez la ligne vers l'avant. Avancez ensuite dans la séance bougie par bougie et appliquez vos règles de contact et de cassure à mesure que chaque bougie apparaît, sans retracer la ligne. Sur le [simulateur](/fr/simulator/), où vous lirez les plus bas à l'œil par rapport à l'échelle de prix, vous pouvez la trader : entrez près de la ligne projetée, saisissez un stop juste au-delà de la zone dans le champ Stop Loss, et relevez-le à mesure que la ligne monte. Les prix de Stockade suivent une marche aléatoire avec un biais de tendance qui dérive lentement, donc des tendances s'y forment, et des formes qui ressemblent à des canaux aussi. Mais le biais caché qui les produit dérive au hasard et n'est lié à aucune ligne ni à aucune figure, donc ce qui se passe après une cassure ne dit rien sur la capacité des lignes à prédire sur un marché réel. Servez-vous-en pour vous entraîner à tracer des lignes selon des règles.
