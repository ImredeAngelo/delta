server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name ${HOST};
    
    # Debugging
    access_log on;
    
    # Compression
    gzip on;
    gzip_static on;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_proxied any;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;

    # API
    location /v0 {
        access_log on;
    
        proxy_set_header    Host                $host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto   https;
        proxy_pass_header   Content-Type;       # no-cors mode requires proxy_set_header Content-Type application/json

        proxy_pass http://${EVENTS};
        proxy_redirect off;
    }

    # Transparently serve WebP files
    location ~ \.(png|jpe?g) {
        proxy_pass http://${APP}$uri$webp_suffix;
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
        
        proxy_set_header            Host            $host;
        proxy_set_header            X-Real-IP       $remote_addr;
        proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;

        # proxy_set_header            X-NginX-Proxy   false;
        # proxy_set_header            x-powered-by    false;
        # proxy_set_header            server          false;

        root /etc/nginx/data;
        # index index.html;
        try_files $uri @app;
    }

    location @app {
        # Redirect Unauthorized Users
        proxy_intercept_errors on;
        error_page 401 = @login;

        proxy_pass http://${APP};
    }

    location @login {
        rewrite ^ /login$1; # Debugging
        
        root /etc/nginx/data/login;
    }
}