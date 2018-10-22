Clermont'ech
============

[![Build
Status](https://travis-ci.org/clermontech/clermontech.github.com.png?branch=master)](https://travis-ci.org/clermontech/clermontech.github.com)


## Installation

    $ bundle install
    $ bundle exec jekyll serve

Browse [`http://localhost:4000`](http://localhost:4000).

### With Docker

Install [Docker](https://www.docker.com/)

Then build the image

    $ docker build --rm -t jekyll-clermontech .

Now run your image:

    $ docker run --rm -ti -p 4000:4000 -v $PWD:/srv jekyll-clermontech exec jekyll serve --host=0.0.0.0

Browse [`http://localhost:4000`](http://localhost:4000).


## The Rules

If you want to publish a new page/post, make sure they meet these guidelines
below.

### New API Hour Page

Create a new file using the following pattern, where `{year}-{month}-{day}` is
the current day, and `{number}` the API Hour number:

    _posts/{year}-{month}-{day}-api-hour-{number}.md

The filename MUST be all lowercase.

Here is the default template:

    ---
    layout: post
    category: api-hours

    flickr_set_id:
    mascotte_img:

    title: Clermont'ech API Hour &#35;{number}
    description: this will be the meta description tag content
    ---

    ## Concept

    ## Informations pratiques

    ## Inscription

    ## Programme

    ### {speaker's full name} • {talk's title}

    [ ## Sponsors ]

You MUST add a map in the `Informations pratiques` section.

You SHOULD add an Eventbrite widget in the `Inscription` section.

You MAY want to add a `Sponsors` section, it should be the last one.

You can change the "mascotte" image (bottom right) by setting the
`mascotte_img`. The `flickr_set_id` number allows to fetch pictures from Flickr.

### New Talk Page

Create a new file using the pattern above, where `{year}-{month}-{day}` is
the current day, `{rank}` the passing order, `{speaker}` the speaker's full
name, and `{talk}` the talk's title:

    _posts/{year}-{month}-{day}-{rank}-{speaker}-{talk}.md

The filename MUST be all lowercase.

Here is the default template:

    ---
    layout: talk
    categories: [talks, api-hour-{number} ]

    session_url: /api-hours/api-hour-{number}.html
    session_name: Clermont'ech API Hour &#35;{number
    session_short_name: "&#35;{number}"

    author: {speaker}
    author_url:
    author_image:

    slides_url:
    video:

    title: {talk}
    description: this will be the meta description tag content
    ---

    {abstract}

The talk MUST belong to the `talks` category.

The talk MUST belong to the `api-hour-{number}` category, where `{number}` is
the API Hour number.


## Credits

Zurb Foundation is released under the MIT license.
