FROM node:16 as builder
WORKDIR /vue-ui

# Copy over everything except one outlined in .dockerignore
COPY . .
RUN npm install
RUN npm run build

FROM nginx as production

RUN rm -rf /usr/share/nginx/html/*

COPY  --from=builder /vue-ui/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/includes/ /etc/nginx/includes/

EXPOSE 80
