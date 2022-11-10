FROM node:18.12.1

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g serve
RUN npm install

COPY . .

RUN npm run build

CMD serve -s build