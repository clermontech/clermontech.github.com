---
layout: talk
categories: [talks, api-hour-68 ]

author: Florian Forestier
author_url: https://twitter.com/forestier_re
author_image: florian.jpg

slides_url:

session_url: /api-hours/api-hour-68.html
session_name: Clermont'ech API Hour &#35;68
session_short_name: "&#35;68"

video: 

title: "Secret OPerationS"
---

Le stockage et le partage de secrets a toujours été une tâche complexe. Le stockage dans un fichier a plat s’est souvent limité à un stockage
symétrique, avec un secret partagé par toute l’équipe. Des solutions plus évoluées (comme OpenBAO, Bitwarden, etc) requièrent un accès réseau et une
instance d’un serveur de secret fonctionnel.

Mais lorsque vous ne pouvez pas vous permettre de partager un secret commun ET que disposer d’une instance de secret n’est pas une option (par
exemple, pour… stocker les secrets du serveur de secrets ?), quelles sont les options à votre disposition ?

Aujourd’hui, nous allons découvrir SOPS, la réponse de la fondation Mozilla à cet épineux problème.