---
layout: talk
categories: [ talks, api-hour-67 ]

author: Jean-Marie Favreau
author_url: https://jmfavreau.info/
author_image: jmfavreau.jpg

slides_url:

session_url: /api-hours/api-hour-67.html
session_name: Clermont'ech API Hour &#35;67
session_short_name: "&#35;67"

video: Y7OIMU7cGaw

title: "Pommes de Lune"
---


Pommes de lune est un agenda culturel participatif, lancé en septembre 2024 et animé par une équipe de bénévoles clermontois.

Il couvre le Puy-de-Dôme, et intègre à la fois les événements institutionnels et les propositions plus indépendantes.

Développé en python/django, il s'appuie sur une pile logicielle intégrant celery et selenium, afin de récupérer chaque nuit les événements publiés sur les sites internet des organisateurs d'événements.

Les internautes peuvent également proposer leurs événements grâce à un formulaire qui permet aussi l'import automatique depuis une source externe.

Un ensemble de fonctionnalités a été affinée au cours de l'année 2024-2025 pour permettre une modération des événements par les bénévoles qui font vivre l'agenda.

Je vais vous présenter son fonctionnement, et raconter les idées derrière l'intégration automatique d'événements importés.