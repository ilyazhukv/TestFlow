FROM node:23.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "dev" ]