FROM node:10

RUN apt-get update && \
  apt-get install -y vim && \
  rm -rf /var/lib/apt/lists/*;

RUN npm install full-icu
ENV NODE_ICU_DATA=/node_modules/full-icu
ENV EDITOR=vim

WORKDIR /srv

VOLUME ["/srv"]