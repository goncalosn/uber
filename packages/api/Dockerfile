FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

COPY dist/packages/api .

# If you are building your code for production
RUN npm i --only=production

EXPOSE 8080

CMD [ "node", "main.js" ]