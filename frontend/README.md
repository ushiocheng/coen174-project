# frontend project

<!-- Why are you looking at the source of a markdown??? Anyway, this is just some text colorring workaround -->
<style>
    red {
        color: red;
    }
</style>

> While npm can be used for this project, yarn is strongly recommended.

## Directory Structure

-   `nginx`: contains configuration for nginx server, which will be used in production
-   `public`: all files in this dir will be served as static files, file in this dir should NOT be REFERENCED in code
    -   If file need to be referenced, it should be put in `src/assets/` and referred in code use `@/assets/`
-   `src`: all source
    -   `src/assets`: images mostly, can be referred in code
    -   `src/views`: Vue router pages (each page here can map to a url specified in `src/router/index.ts`)
    -   `src/layouts`: templates for pages, where navigational component reside
    -   `src/components`: Vue components, part of a page
    -   `src/store/app.ts`: Configuration for Pinia

> <red>Warning</red>: other files in this project are mostly used as entrypoint/stub files that should not be modified unless you really know what you are doing.

## Project setup

```sh
# yarn
yarn

# npm
npm install
```

### Compiles and hot-reloads for development

```sh
# yarn
yarn dev

# npm
npm run dev
```

### Compiles and minifies for production

> Unless necessary, docker compose should be used to build and manage both the frontend and the backend module.

```
# yarn
yarn build

# npm
npm run build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
