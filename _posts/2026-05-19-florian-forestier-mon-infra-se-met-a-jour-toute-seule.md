---
layout: talk
categories: [talks, api-hour-71 ]

author: Florian Forestier
author_url: https://forestier.re/
author_image: florian.jpg

slides_url:

session_url: /api-hours/api-hour-71.html
session_name: Clermont'ech API Hour &#35;71
session_short_name: "&#35;71"

video: 

title: "Mon infra@home se met à jour toute seule avec Docker, n8n... et des flux RSS"
---

Les mises à jour, c'est toujours compliqué à suivre ; ne dites pas le contraire ! Même dans nos métiers, où
la sécurité est de plus en plus mise en avant, il est rare de tomber sur un parc applicatif totalement à
jour. Qui n'est jamais tombé sur un Keycloak resté 3 versions en arrière, ou un GitLab dont l'uptime ferait
pâlir Michel Drucker ?

Et, lorsque vous avez comme moi une infrastructure à la maison pour vos besoins personnels, c'est encore
pire : aucun SOC ni responsable de la sécurité pour vous ouvrir un ticket JIRA ; aucun QA-Analyst pour vous
sermonner avant chaque passage en prod. Résultat ? Votre Nextcloud déployé en 2021 est resté là,
peinard, toujours vivant, toujours debout.

Mais rassurez-vous, aujourd'hui, j'ai la solution à tous vos maux. Aujourd'hui, nous reprenons le contrôle
sur nos mises à jour ; nous nous libérons du joug de la flemme qui vous envahit lorsque, à 21h, vous devez
démarrer une session SSH pour mettre à jour un serveur obsolète. Ensemble, nous allons voir comment mettre à
jour nos services avec un bouton dans un channel Discord (et un paquet de trucs derrière ce bouton, mais
il fallait que l'abstract soit percutant).