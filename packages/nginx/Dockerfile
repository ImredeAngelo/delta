# syntax=docker/dockerfile:1
FROM nginx:alpine

RUN apk update

COPY --from=config prod /etc/nginx/conf.d

# Serve static files
WORKDIR /srv
COPY --from=build deltahouse-app deltahouse