## And here we go
My new readme-file is awesome!

Getting up and running:

```
docker network create inventory-network
docker build -t inventory-backend .
docker run -d -p 3000:3000 --net inventory-network --name backend inventory-backend
```
To stop docker:
```
docker container stop backend
docker system prune
```