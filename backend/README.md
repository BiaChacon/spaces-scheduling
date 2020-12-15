# Backend
## If you don't have the docker 

```console
#download generic installer from docker oficial site
curl -fsSL https://get.docker.com -o get-docker.sh
```

```console
#using generic installer
sh get-docker.sh
```

## Project setup
```
npm install
```


```
docker-compose up --build
```

## Compiles for run the serve
```
docker-compose up
```

## Compiles for run the tests
```
docker exec api-server npm test
```