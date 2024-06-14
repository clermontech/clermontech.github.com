---
layout: post
category: api-hours
title: Clermont'ech API Hour &#35;{{.Version}}
---

## Concept

Trois ou quatre conférences courtes (10 ou 25 minutes + 5 minutes de questions)
pour introduire une technologie, un concept ou un outil et en débattre ensuite
autour d’un verre.

Les API Hours, comme l'ensemble de nos manifestations, se veulent être [des
lieux où tout le monde est le bienvenu](/code-of-conduct.html).

## Informations pratiques

Cet événement aura lieu le **{{.Date.Format "01/02/2006"}}** à **19h** au **{{.Location}}**. L'adresse
exacte est : [**{{.Address}}**](https://www.openstreetmap.org/?query={{.Address}}).
<!-- <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?TODO" style="border: 1px solid black"></iframe> -->
<br/>

## Inscription

Cet événement est limité à **50 personnes**.  Pour y assister, vous devez vous
inscrire sur la page Eventbrite de cette session: [https://clermontech-apihour-{{.Version}}.eventbrite.fr](https://clermontech-apihour-{{.Version}}.eventbrite.fr).


<iframe src="//eventbrite.fr/tickets-external?eid={{.EventbriteId}}&ref=etckt" frameborder="0" height="500" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe>

<br/>

## Programme

{{range .Talks}}
### {{.Author}} • {{.Title}} ({{.Duration}} min)

{{.Description}}

{{end}}
