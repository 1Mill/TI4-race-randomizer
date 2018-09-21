# TI4-race-randomizer

> Race selector for the board game Twilight Imperium 4th Edition (TI4)

# Getting started in development
1. Install dependencies within each container volume
```bash
docker-compose run api yarn install
#> Create /node_modules/

docker-compose run client yarn install
#> Create /node_modules/
```

1. Build images
```bash
docker-compose build
```

1. Start the application at localhost:3000
``` bash
docker-compose up
```

# Update gh-pages
1. Generate static files
```bash
docker-compose run client yarn nuxt generate
```

1. Copy files from `client/dist/` to gh-pages branch
