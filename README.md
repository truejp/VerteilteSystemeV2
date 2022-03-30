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
-Kunde geht in Autohaus und möchte bestimmtes Automodell (Lamborghini Modell: Huracan Evo) bestellen <br>   
-Verkäufer sucht in der Datenbank  nach dem bestimmten Fahrzeug <br> 
    -Marke,  Modell und Power (PS) <br>
    -> Lamborghini Huracan Evo mit 610PS 
    
-Service befindet sich innerhalb eines Vertriebssystems eines Autohauses <br> 
    -befindet sich im Backend des Anbieters <br>
    -befindet sich auf der Autohaus Webseite -> für den Kunden erreichbar <br>


## Possible issues when used between multiple parties
-Problem 1: Datenkorrektheit: Daten müssen zu jedem Zeitpunkt an jedem Endpunkt die gleich angezeigt werden <br>
-Lösung 1: Daten werden auf dem Server gepostet, aber erst live geschalten, wenn Änderungen abgeschlossen sind (-> role back möglich)

-Problem 2: gleichzeitige Bearbeitung: Überschreibung der Daten, wenn zwei Benutzer gleichzeitig in einem Modell sind (wer überschreibt wen?) <br>
-Lösung 2: Regelung erfolgt durch Software, dass immer nur eine Person die Daten bearbeiten kann -> sobald Modell in Bearbeitung ist, ist die Bearbeitung für andere Nutzer gesperrt


## Additional aspects for Go2Live
-Service nurnoch im Frontend öffentlich zugänglich machen, alles andere hinter einem Gateway verbergen. Somit kann nicht jeder auf die Datenbank zugreifen. Dies stellt
ansonsten ein hohes Sicherheitsrisiko dar, weil die Daten im Internet verfügbar wären. Die Datenbank darf nicht auf public erreichbar sein.

-Persistente Datenbank einführen: sobald der Container neugestartet wird, werden die Daten überschrieben und die Datenbank wird jedes Mal neu aufgesetzt. Nun wollen wir persistente Daten, sodass beispielsweise auch nach einem Neustart die Daten vorhanden sind.

-Service auf der Webseite einbinden. Hierbei soll der Kunde auf der Webseite die aktuell vorhandenen Modelle des Autohauses einsehen können. Dadurch hat der Kunde die Möglichkeit vor dem Autohausbesuch sich über die Modelle zu informieren.
