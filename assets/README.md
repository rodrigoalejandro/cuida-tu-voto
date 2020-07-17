# ASSETS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#webpacked).

# Instalando NodeJs

# Instalar curl
apt install curl

# Instalar git
apt install git

# Instalar nginx
apt install nginx

# Instalar build-essential
apt install build-essential

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs

# clonando el proyecto
git clone https://github.com/omarmus/cuida-tu-voto

# Instalando dependencias
npm i

# Configurando nuxt
nuxt.config.js

# Construyendo archivos
npm run build

# Iniciando servicio
pm2 start npm --name "voto
" -- start

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm;

    server_name     _;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        proxy_pass http://127.0.0.1:4400;
    }

}

# Reiniciando nginx
systemctl reload nginx.service

server {
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/himnarios.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/himnarios.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    server_name himnarios.com;
    root "/var/www/html/";
    index index.html;

    location /backend {
        rewrite ^/backend(.*) $1 break;
        proxy_pass http://127.0.0.1:4000;
    }

}

server {
    listen 80;
    server_name himnarios.com;
    return 301 https://$server_name$request_uri;
}