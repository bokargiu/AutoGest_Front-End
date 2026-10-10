
# Etapa 1: compilar o Angular
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build -- --configuration production \
    && INDEX_FILE="$(find /app/dist -type f -name index.html -not -path '*/server/*' -print -quit)" \
    && test -n "$INDEX_FILE" \
    && mkdir -p /webroot \
    && cp -a "$(dirname "$INDEX_FILE")"/. /webroot/

# Etapa 2: servir os arquivos compilados
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /webroot/ /usr/share/nginx/html/

EXPOSE 4200
