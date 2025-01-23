# Usar uma imagem base com Node.js
FROM node:22

# Definir o diretório de trabalho no container
WORKDIR /src

# Copiar os arquivos necessários para o container
COPY package*.json ./
COPY server.js ./

# Instalar as dependências
RUN npm install

COPY . .

# Expor a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
