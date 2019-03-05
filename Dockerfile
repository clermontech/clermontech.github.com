FROM jekyll/jekyll

RUN gem install \
    redcarpet \
    compass \
    zurb-foundation \
    font-awesome-sass

WORKDIR /srv

ADD . /srv
RUN bundle install

VOLUME ["/srv"]

ENTRYPOINT ["bundle"]
