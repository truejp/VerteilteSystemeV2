# syntax=docker/dockerfile:1
FROM node:17-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY scripts ./scripts
COPY static ./static
COPY src ./src
RUN npm run build
FROM nginx:alpine
COPY save-api-url.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/save-api-url.sh
COPY --from=build /app/build /usr/share/nginx/html
