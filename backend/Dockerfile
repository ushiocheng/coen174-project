FROM node:16

# Create app directory
WORKDIR /usr/src/app

# copy over everything except ones in .dockerignore
COPY . .

RUN yarn install
RUN yarn run build

EXPOSE 60180

CMD [ "node", "."]