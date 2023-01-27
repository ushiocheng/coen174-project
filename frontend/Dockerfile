FROM node:16 as build-vue-ui
WORKDIR /build-vue-ui

# ! node_modules and yarn.lock on host is reused to reduce build time, modify .dockerignore if you don't want this behavior
# Copy over everything except one outlined in .dockerignore
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx as production

RUN rm -rf /usr/share/nginx/html/*

COPY  --from=build-vue-ui /build-vue-ui/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/includes/ /etc/nginx/includes/

EXPOSE 80
