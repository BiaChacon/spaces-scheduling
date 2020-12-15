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

## Project setup and compilation
```console
npm install
```


```console
docker-compose up --build
```

### Running the API and the database with the docker-compose
```console
docker-compose up
```

### Running the tests
```console
docker exec api-server npm test
```