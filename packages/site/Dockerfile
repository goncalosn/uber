FROM nginx:stable-alpine

COPY dist/packages/site /usr/share/nginx/html

EXPOSE ${PORT:-80}

CMD ["nginx", "-g", "daemon off;"]
