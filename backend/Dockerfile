FROM node:latest

EXPOSE 8080

WORKDIR /bem346/backend

COPY *.json .
COPY server.js .

RUN npm add mysql
RUN npm add express
RUN npm add body-parser
RUN npm add cors

CMD ["node","server.js"]