# Compilação do Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production
RUN find /app/dist -maxdepth 4 -type f -name index.html

# Execução da aplicação
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist/NOME_DO_PROJETO/browser/ ./dist/

EXPOSE 4200

CMD ["serve", "-s", "dist", "-l", "4200"]
