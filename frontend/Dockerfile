FROM node:latest

WORKDIR /bem346/react

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]