server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name api.deltahouse.no;

    # Set max upload size to 10Mb 
    client_max_body_size 10M;

    # API
    location /v0/events {
        access_log on;
    
        proxy_set_header    Host                $host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto   https;
        proxy_pass_header   Content-Type;       # no-cors mode requires proxy_set_header Content-Type application/json

        proxy_pass http://${EVENTS};
        proxy_redirect off;
    }
    
    location /v0/users {
        access_log on;
    
        proxy_set_header    Host                $host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto   https;
        proxy_pass_header   Content-Type;       # no-cors mode requires proxy_set_header Content-Type application/json

        proxy_pass http://${USERS};
        proxy_redirect off;
    }
}