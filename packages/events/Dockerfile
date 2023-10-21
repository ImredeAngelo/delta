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


# Set up dynamic content folders
RUN wget https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-linux-x86-64.tar.gz
RUN tar xzf libwebp-1.3.2-linux-x86-64.tar.gz
RUN rm libwebp-1.3.2-linux-x86-64.tar.gz
RUN rm -r /usr/src/node_modules/webp-converter/bin/libwebp_linux
RUN mv libwebp-1.3.2-linux-x86-64 /usr/src/node_modules/webp-converter/bin/libwebp_linux
RUN mkdir /srv/images

# Start
CMD node ./app