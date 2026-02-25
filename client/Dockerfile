FROM node:24.13.1-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "dev" ]