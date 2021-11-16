FROM ruby:2.7-alpine

RUN apk add musl-dev make g++ yajl-dev

RUN gem install bundler:2.2.31

WORKDIR /srv

ADD . /srv
RUN bundle install

VOLUME ["/srv"]

ENTRYPOINT ["bundle"]
