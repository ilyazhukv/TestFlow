FROM node:24.13.1-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ]