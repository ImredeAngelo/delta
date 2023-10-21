server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name .deltahouse.no;
    
    # Hide server info
    proxy_hide_header   X-Powered-By;
    proxy_hide_header   X-Content-Type-Options;
    server_tokens off;
    autoindex off;
    
    # Compression
    gzip on;
    gzip_static on;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_proxied any;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;

    # Transparently serve WebP files
    location ~* \.(png|jpe?g) {
        add_header X-WebP-Recieved "yes" always;
        add_header X-WebP-Type $suffix always;
        
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;

        root /srv/images;

        try_files $uri$suffix $uri @app;
    }
    
    # Hot reload
    location /ws {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass http://${APP}/ws;
    }

    # Serve content from root
    location / {
        access_log on;
        
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;

        # index index.html;
        root /etc/nginx/data;
        try_files $uri @app;
    }

    location @app {
        # # Redirect Unauthorized Users
        # proxy_intercept_errors on;
        # error_page 401 = @login;

        proxy_pass http://${APP};
    }

    # API
    location /v0/events {
        # add_header API-Access "Events API" always;
        access_log on;

        # Set max upload size, required for images
        client_max_body_size 10M;
        

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