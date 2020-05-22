FROM node:12-alpine

WORKDIR /usr/src/covid19

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 7001

CMD [ "npm", "start" ]
