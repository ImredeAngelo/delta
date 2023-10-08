server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name api.deltahouse.no api.localhost;

    # add_header Server-Name $server_name always;

    # Hide server info
    proxy_hide_header   X-Powered-By;
    proxy_hide_header   X-Content-Type-Options;
    server_tokens off;
    autoindex off;

    # Set max upload size, required for images
    client_max_body_size 10M;

    # API
    location /v0/events {
        # add_header API-Access "Events API" always;
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
        # add_header API-Access "Users API" always;
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