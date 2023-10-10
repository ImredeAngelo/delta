# Docker container for hot-reloading apps that are pre-rendered in production
FROM nginx:1.23-alpine

RUN apk update

COPY --from=config prod /etc/nginx/conf.d

# Serve static files
WORKDIR /srv
COPY --from=build deltahouse-app deltahouse