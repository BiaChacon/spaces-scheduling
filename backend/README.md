# Backend

## Project setup
```
docker-compose up --build
```

## Run the seeds
```
docker exec api-server npx knex seed:run
```

## Compiles for run the serve
```
docker-compose up
```

## Compiles for run the tests
```
docker exec api-server npm test
```