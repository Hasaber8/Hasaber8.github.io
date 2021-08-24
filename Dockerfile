FROM alpine:edge

RUN apk add git curl hugo bash --no-cache --update

COPY . /app
RUN cd /app && git submodule update --init --recursive
RUN git clone https://github.com/hasaber8/hasaber8.github.io -b master /public

RUN git config --global user.email "rohanhasabe8@gmail.com"
RUN git config --global user.name "Rohan Hasabe"

WORKDIR /app

CMD ["bash", "push.sh"]
