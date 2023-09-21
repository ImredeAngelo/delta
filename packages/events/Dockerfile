FROM node:lts

WORKDIR /usr/src
COPY src ./app
COPY package*.json .

RUN npm install

EXPOSE 3000

CMD node app