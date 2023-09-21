FROM node:lts

WORKDIR /usr/src
COPY src ./app
COPY package*.json .

RUN npm install


ENV PORT 3000
EXPOSE 3000

CMD node app