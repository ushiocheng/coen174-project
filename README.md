# MySchedule

A Schedule maker for SCU students on top of [CourseAvail](https://www.scu.edu/apps/courseavail/)

> This is a project done for  
> [SCU](https://scu.edu/) / Winter 2023 / COEN 174

## Directory Structure

-   `/frontend`: UI code as well as configuration for NGINX server that does some front-end proxying
-   `/docker-compose-dev.yaml`: docker compose file used to run in dev mode
    -   nginx server is accessible at http://localhost:60080
-   `/docker-compose.yaml`: docker compose file used to deploy project
    -   server listening on `0.0.0.0:80`
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

## To deploy

This command can be used to deploy.

```sh
docker compose -f docker-compose.yaml up --build -d
```

> Remark: SSL is not used since this is designed to deploy as a module behind another frontend proxy
