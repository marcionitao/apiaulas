FROM node:22-alpine AS builder
# cria uma pasta para o projeto
WORKDIR /app
# copiar todos os ficheiros para a pasta do projeto
COPY . ./
# instalar as dependencias usando "npm ci""
RUN npm ci
# nossa app roda na porta 3333
EXPOSE 3333
# executa comandos
CMD ["node", "--experimental-strip-types", "src/server.ts"]
