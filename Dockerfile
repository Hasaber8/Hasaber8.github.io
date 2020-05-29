FROM alpine:edge

COPY . /app

RUN apk add git curl hugo --no-cache --update
RUN git clone https://github.com/baalajimaestro/baalajimaestro.github.io -b master public
RUN git config --global user.email "me@baalajimaestro.me"
RUN git config --global user.name "baalajimaestro"

CMD ["bash", "push.sh"]