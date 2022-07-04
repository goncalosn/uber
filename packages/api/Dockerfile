FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY dist/packages/api .

# Install dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm install \
    && apk del .gyp

ARG MONGODB_CONNECTION_STRING
ENV MONGODB_CONNECTION_STRING=$MONGODB_CONNECTION_STRING

ARG DOMAIN
ENV DOMAIN=$DOMAIN

ARG CORS_ORIGIN
ENV CORS_ORIGIN=$CORS_ORIGIN

ARG JWT_PRIVATE
ENV JWT_PRIVATE=$JWT_PRIVATE

ARG JWT_PUBLIC
ENV JWT_PUBLIC=$JWT_PUBLIC

ARG DEV
ENV DEV=$DEV

EXPOSE 8080

CMD [ "node", "main.js" ]