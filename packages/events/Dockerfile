FROM node:20-alpine

# Set up packages
WORKDIR /usr/src
COPY src ./app
COPY package*.json .

RUN npm install

# TODO: Get from .env
ENV DATABASE_IP db
ENV MYSQL_USER user
ENV MYSQL_PASSWORD passord

# Set local port
ENV PORT 3000
EXPOSE 3000

# Start
CMD node ./app