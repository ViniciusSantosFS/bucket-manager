FROM node:alpine3.18

ENV NODE_VERSION 20.12.1

WORKDIR /app

COPY package*.json /app/


RUN npm ci --silent

COPY . .

RUN chown -R node /app
USER node

EXPOSE 3000
