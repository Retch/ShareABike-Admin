FROM node:18-alpine as build

ENV API_URL=localhost:8000

RUN npm install -g @angular/cli

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build --configuration production --output-path=/dist

FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]