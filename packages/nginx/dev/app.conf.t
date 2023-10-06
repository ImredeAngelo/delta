server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name deltahouse.no;
    
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

    # Transparently serve WebP files
    location ~ \.(png|jpe?g) {
        root /etc/nginx/images;
        try_files $uri$suffix $uri @app_webp @app;
    }

    location @app_webp {
        proxy_pass http://${APP}$uri$suffix;
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

        # Hide server
        add_header          X-Powered-By            "" always;
        add_header          X-Content-Type-Options  "" always;
        add_header          Server                  "" always;

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

    # location @login {
    #     rewrite ^ /login$1; # Debugging
        
    #     root /etc/nginx/data/login;
    # }
}