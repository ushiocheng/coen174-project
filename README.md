# COEN 174 Project - MySchedule

## Dev build

### pre-requisites

Docker only!

Recommended: node.js, vue-cli, yarn

### commands

run this command to build and run in dev mode

```sh
docker compose -f docker-compose-dev.yaml up --build -d
```

run this command to clean up

```sh
docker compose -f docker-compose-dev.yaml down
```

frontend would be started at http://localhost:60080
backend would be started at http://localhost:60180
backend would not be accessible outside of these two containers when deployed.

## To deploy

This command can be used to deploy.

```sh
docker compose -f docker-compose.yaml up --build -d
```
