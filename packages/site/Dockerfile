FROM nginx:stable-alpine

COPY ../../dist/packages/site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
