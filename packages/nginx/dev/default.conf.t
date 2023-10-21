# Cache
# proxy_cache_path /etc/nginx/scache levels=1:2 keys_zone=cache:10m max_size=10g inactive=60m use_temp_path=off;

# Maps .avif or .webp to $suffix if supported by browser
map $http_accept $suffix {
    default "";
    "~*webp" ".webp";
    "~*avif" ".avif";
}

# Reverse Proxy HTTP to HTTPS
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    listen 443 ssl http2;
    listen [::]:443 http2;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name .deltahouse.no;

    return 301 https://$host$request_uri;
}
