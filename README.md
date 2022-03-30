# Portfolio Verteilte Systeme
(c)2022 - Lisa Ackermann, Philipp Lehnet, Sophia Sturm

## Demo
The Demo can be executed on localhost using Docker and Node.js.

## Dependencies
Following frameworks are required to execute the WebService:

1. Node.js
2. Docker
3. Express
4. Nodemon
5. Express Validators
6. MongoDB

Install Node.js and docker first. Then execute following commands to install neccessary dependencies:
```
cd ~YourWorkingDirectory
npm i #if package was set up locally, this command will automatically fetch all dependencies from package.json
npm i nodemon
npm i express
npm i express-validators
```
Now you're good to go!

## Run Development Build

To run the dev-version of this project just enter:
```
docker-compose -f docker-compose.dev.yml up -d
```
into your shell. Docker will automatically fetch all needed images. After all builds were processed successfully, you can access the backend over the webbrowser of your choice.
Once you are done with testing, you can stop the docker containers:
```
docker-compose -f docker-compose.dev.yml down
```
Note: Sometimes Docker won't stop on Windows PCs. If there are instances of Docker left, you can kill them all using `docker ps -q | % { docker stop $_ }`.

## Make Productive Build
Yet to be written.

# Documentation

## API Endpoints
Yet to be written.

## Webhooks Development Environment:
1. Frontend: http://localhost:8080
2. Backend (API): http://localhost:3000
3. Database Frontend: http://localhost:8081

## Webhooks Productive Environment:
1. Frontend: http://localhost:8080

## Use Cases
Yet to be written.

## Possible issues when used between multiple parties
Yet to be written.

## Additional aspects for Go2Live
Yet to be written.
