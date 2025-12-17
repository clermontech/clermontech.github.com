---
layout: talk
categories: [talks, api-hour-68 ]

author: Vincent Linas
author_url: 
author_image: 

slides_url:

session_url: /api-hours/api-hour-68.html
session_name: Clermont'ech API Hour &#35;68
session_short_name: "&#35;68"

video: D8ru0M-9ks8

title: "Comment faire pour que mon application me survive ?"
---

Quand on est développeur il est fréquent d'arriver sur un projet existant ou de partir avant la fin d'un projet qu'on a lancé.

Souvent avec les arrivées et les départ, les architectures et guidelines structurant une application peuvent être oubliées ou ignorées menant à la
dérive d'un projet. Pour maintenir la cohérence d'une application malgré un turn-over important il faut aller plus loin que l'humain.

Dans l'approche devops, le code est considéré comme une forme de documentation ; donc pourquoi ne pas coder la documentation d'architecture et les
conventions ?

Je vous propose de nous intéresser à ArchUnit une librairie java permettant d'écrire des meta-tests unitaire validant la conformité de votre
application tout au long de son développement.