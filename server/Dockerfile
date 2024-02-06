FROM node:21.6.0-alpine

WORKDIR /app
ADD package*.json ./
RUN npm install
ADD server.js ./

CMD [ "node", "server.js" ]
