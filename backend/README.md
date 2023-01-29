# Backend project

> While npm can be used for this project, yarn is strongly recommended.

## Directory Structure

Basically, all command should be run on `/backend` and all code in this module should be contained in `/backend/src`

## Development

Install dependencies:  

```sh
yarn
```

Run project in Development mode:

```sh
yarn run dev
```

> all code should be contained in /src  
> when `yarn run dev` is used, it will watch for changes in `src/**/*.(js|ts)` and restart when changes are detected.

## Deploy

> Unless necessary, docker compose should be used to build and manage both the frontend and the backend module.

```sh
yarn run build
```

should be used to build this project for deployment and

```sh
node .
# or
yarn run start
```

can be used to run the project
