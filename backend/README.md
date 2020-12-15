# Backend
## If you don't have the docker 

### download generic installer from docker oficial site

```console
curl -fsSL https://get.docker.com -o get-docker.sh
```

### using generic installer

```console
sh get-docker.sh
```

## Project setup
```console
npm install
```


```console
docker-compose up --build
```

## Compiles for run the serve
```console
docker-compose up
```

## Compiles for run the tests
```console
docker exec api-server npm test
```