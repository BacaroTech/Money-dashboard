FROM node:18.13.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@14.2.5

COPY . .

RUN ng build 

FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/fe /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]