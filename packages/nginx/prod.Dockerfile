# Docker container for hot-reloading apps that are pre-rendered in production
FROM nginx:alpine

RUN apk update

# Serve static files
WORKDIR /srv
COPY ../../build .