# Docker container for hot-reloading apps that are pre-rendered in production
FROM nginx:alpine

RUN apk update

# Serve static files
# Use build folder as context!
WORKDIR /srv
COPY . .