FROM node:alpine3.18

ENV NODE_VERSION 20.12.1

WORKDIR /app

COPY package*.json /app/

USER root

RUN npm ci --silent

COPY . .

EXPOSE 3000
