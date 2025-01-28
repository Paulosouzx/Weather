FROM node:22

WORKDIR /src

COPY package*.json ./
COPY server.js ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
