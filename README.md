# twilight-imperium-4-race-selector

> Race selector for the board game Twilight Imperium 4th Edition (TI4)

# Development
Start the application in development mode
``` bash
docker-compose up --build
```
then look at localhost:4000 within your browser.

# Build
First generate the static pages using
``` bash
docker-compose run web yarn generate
```
then, move the generated files from /dist to AWS.


## Nuxt commands within the Docker Container
``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
