# Docker container for hot-reloading apps that are pre-rendered in production
FROM nginx:1.23-alpine

RUN apk update

COPY ./prod /etc/nginx/conf.d

# Serve static files
# Use build folder as context!
WORKDIR /srv
COPY deltahouse-app deltahouse