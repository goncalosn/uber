FROM nginx:stable-alpine

COPY dist/packages/site /usr/share/nginx/html

COPY packages/site/nginx.conf.template  /etc/nginx/templates/default.conf.template

ENV NGINX_PORT=${PORT:-3000}
EXPOSE ${PORT:-3000}

CMD ["nginx", "-g", "daemon off;"]
