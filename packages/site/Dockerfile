FROM nginx:stable-alpine

COPY dist/packages/site /usr/share/nginx/html

COPY packages/site/default.conf.template  /etc/nginx/templates/default.conf.template

ENV NGINX_PORT=${PORT:-80}
EXPOSE ${PORT:-80}

CMD ["nginx", "-g", "daemon off;"]
