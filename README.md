Clermont'ech
============

## Installation

Install [Compass](http://compass-style.org/), and [Zurb
Foundation](http://foundation.zurb.com/docs/sass.html):

    $ [sudo] gem install compass
    $ [sudo] gem install zurb-foundation

Then, start the embedded server:

    $ jekyll --server --auto

Browse [`http://localhost:4000`](http://localhost:4000).


## The Rules

If you want to publish a new page/post, make sure they meet these guidelines
below.

### New APIHour Page

Create a new file using the following pattern, where `{year}-{month}-{day}` is
the current day, and `{number}` the APIHour number:

    _posts/{year}-{month}-{day}-api-hour-{number}.md

The filename MUST be all lowercase.

Here is the default template:

    ---
    layout: post
    category: api-hours
    title: Clermont'ech API Hour &#35;{number}
    ---

    ## Concept

    ## Informations pratiques

    ## Inscription

    ## Programme

    ### {speaker's full name} • {talk's title}

You MUST add a map in the `Informations pratiques` section.

You SHOULD add a Eventbrite widget in the `Inscription` section.

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
    title: {talk's title}

    author:
    author_url:

    slides_url:

    session_url: /api-hours/api-hour-{number}.html
    session_name: Clermont'ech API Hour &#35;{number}

    video:
    ---

    {abstract}

The talk MUST belong to the `talks` category.

The talk MUST belong to the `api-hour-{number}` category, where `{number}` is
the APIHour number.


## Credits

Zurb Foundation is released under the MIT license.
