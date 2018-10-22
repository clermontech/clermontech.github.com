---
layout: post
category: api-hours
title: Clermont'ech API Hour &#35;{{apiHour.version}}
---

## Concept

Trois ou quatre conférences courtes (10 ou 25 minutes + 5 minutes de questions)
pour introduire une technologie, un concept ou un outils et en débattre ensuite
autour d’un verre.

Les API Hours, comme l'ensemble de nos manifestations, se veulent être [des
lieux où tout le monde est le bienvenu](/code-of-conduct.html).

{{#longTalk}}
Pour cette édition trois sujets. Un premier de 30 minutes et deux de 15 minutes.
{{/longTalk}}


## Informations pratiques

Cet événement aura lieu le **{{apiHour.date}}** à **19h** au **{{apiHour.location}}**. L'adresse
exacte est : [**{{apiHour.address}}**](https://www.openstreetmap.org/?query={{apiHour.address}}).

<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?{{osmQs}}" style="border: 1px solid black"></iframe>

<br/>

## Inscription

Cet événement est limité à **50 personnes**.  Pour y assister, vous devez vous
inscrire sur la page Eventbrite de cette session: [https://clermontech-apihour-{{apiHour.version}}.eventbrite.fr](https://clermontech-apihour-{{apiHour.version}}.eventbrite.fr)
Ouverture des places le **{{apiHour.eventbrite_date}} à 14h00**.


<iframe src="//eventbrite.fr/tickets-external?eid=TO_REPLACE&ref=etckt" frameborder="0" height="500" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe>

<br/>

## Programme

{{#talks}}
### {{speaker}} • {{title}} {{#longTalk}}(30 min){{/longTalk}}

{{description}}

[Voir la vidéo]({% post_url {{slug}} %})

{{/talks}}
