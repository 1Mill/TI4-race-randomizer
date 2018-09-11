FROM node:alpine

RUN apk update

RUN npm install -g yarn

RUN mkdir /app
WORKDIR /app

COPY package.json *yarn* ./

RUN yarn install

COPY . .
