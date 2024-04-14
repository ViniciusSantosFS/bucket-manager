# Bucket manager

## Dependencies
- docker
- docker-compose
- Node.js >= 20

## How to run

Running on dev mode
```sh
docker-compose --profile prod up -d
npm ci --silent
npm run test:dev
```

Running tests on container
```sh
docker-compose --profile dev up -d
```

Running locally

```sh
docker-compose --profile prod up -d
npm ci --silent
npm run start
```