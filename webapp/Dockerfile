FROM node:19

RUN apt-get update
RUN apt install -y chromium

COPY . /app

WORKDIR /app

RUN yarn install

CMD yarn run start
