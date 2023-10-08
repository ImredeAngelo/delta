# Docker container for hot-reloading apps that are pre-rendered in production
FROM nginx:1.23-alpine

RUN apk update
RUN apk add openssl

# Copy SSL cert from setup process
WORKDIR /etc/letsencrypt/live/delta
COPY ./ssl .

# Generate Self-Signed SSL Certificate
# RUN openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -extensions v3_ca \
#     -subj "/C=NO/ST=TRD/L=Trondheim/O=Delta Linjeforening/OU=KomIT/CN=deltahouse.no" \
#     -keyout deltaCA.key -out deltaCA.crt

# RUN openssl genrsa -out ssl.key 2048
# RUN openssl req -new -key ssl.key -out delta.csr -config csr.conf
# RUN openssl x509 -req -in delta.csr -CA deltaCA.crt -CAkey deltaCA.key \
#     -sha256 -extfile cert.conf -CAcreateserial \
#     -days 365 -out ssl.crt

# Server static files
WORKDIR /etc/nginx
RUN mkdir data
# COPY ./public data