---
layout: talk
categories: [ talks, api-hour-13 ]

session_url: /api-hours/api-hour-13.html
session_name: Clermont'ech API Hour &#35;13
session_short_name: "&#35;13"

author: Guenaëlle De Julis
author_url:
author_image:

slides_url: /api-hours/slides/2015-03-04-guenaelle-dejulis.pdf
video:

title: "Que Déduire D'Un Générateur De Nombres Aléatoires Qui Passent Des Tests Statistiques Avec Succès ?"
---

Les nombres aléatoires sont très fréquents dans les protocoles cryptographiques
: graine pour instancier, création de modules RSA, token, clef de session, ...
Cependant, une mauvaise qualité d'aléa  peut mettre à mal la sécurité de tout
le protocole dans lequel il est utilisé. Reste donc à évaluer sa source d'aléa
avant de l'utiliser pour des usages cryptographiques, ce qui se fait
aujourd'hui principalement par des batteries de tests statistiques (FIPS 140-2,
SP800-90, AIS31).  Cette présentation montre quelques faiblesses de ces tests,
dans leur conception et dans leur utilisation.
