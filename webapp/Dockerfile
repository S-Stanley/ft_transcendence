FROM node:19

RUN apt-get update
RUN apt install -y chromium

COPY . /app

WORKDIR /app

RUN npm i

CMD npm start
