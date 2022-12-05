FROM node:19

RUN apt install -y chromium chromium-browser

COPY . /app

WORKDIR /app

RUN npm i

CMD npm start
