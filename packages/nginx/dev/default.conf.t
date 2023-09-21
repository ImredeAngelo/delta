# Cache
proxy_cache_path /etc/nginx/scache levels=1:2 keys_zone=cache:10m max_size=10g inactive=60m use_temp_path=off;

# WebP
map $http_accept $webp_suffix {
    default "";
    "~*webp" ".webp";
}

# Reverse Proxy HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;

    server_name *.${HOST} ${HOST};
    
    return 301 https://${HOST}$request_uri;
}

# Reverse Proxy Subdomains
server {
    listen 443 ssl http2;
    listen [::]:443 http2;
    
    ssl_certificate     /etc/letsencrypt/live/delta/ssl.crt;
    ssl_certificate_key /etc/letsencrypt/live/delta/ssl.key;

    server_name *.${HOST};

    return 301 https://${HOST}$request_uri;
}
