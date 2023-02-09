FROM node:19.4.0-buster-slim as development
WORKDIR /usr/src/app
 
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci
COPY . .
 
CMD [ "node", "server.js" ]
