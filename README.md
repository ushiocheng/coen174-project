# COEN 174 Project - MySchedule

## Directory Structure

-   `/backend`: provides backend code, all endpoint here are accessible in `<url>/api/`
-   `/frontend`: UI code as well as configuration for NGINX server that does some front-end proxying
-   `/docker-compose-dev.yaml`: docker compose file used to run in dev mode
    -   backend server accessible at http://localhost:60180 and frontend server is running on http://localhost:60080
-   `/docker-compose.yaml`: docker compose file used to deploy project
    -   frontend accessible at interface `0.0.0.0` and port `80`, backend is only exposed to frontend by docker bridge network
-   `/vetur.config.js`: configuration for VSCode extension [octref.vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

## Dev build

### pre-requisites

Docker only!

Recommended: VSCode, node.js, vue-cli, yarn

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
