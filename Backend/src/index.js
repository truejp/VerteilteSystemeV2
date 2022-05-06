"use strict"

//import neccessary dependencies
import restify from "restify";
import OpenApiEnforcer from "openapi-enforcer";
import OpenApiEnforcerMiddleware from "@dschulmeis/restify-openapi-enforcer-middleware";
import DatabaseFactory from "./database.js";
import RootController from "./controller/root.controller.js";
import VehicleController from "./controller/vehicle.controller.js";
import TruckController from "./controller/vehicle.controller.js";
import MotorcycleController from "./controller/vehicle.controller.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* =============================================================================
 * server-config
 * =============================================================================*/

// Fetch env data
const config = {
    port:    parseInt(process.env.PORT) || 3000,
    host:    process.env.HOST           || "localhost",
    mongodb: process.env.MONGODB        || "mongodb://localhost:27017",
};

await DatabaseFactory.init(config.mongodb);

/* =============================================================================
 * start server
 * =============================================================================*/
const server = restify.createServer({
    //optional configuration possible - not neccessary
});

/*
Wir haben Swagger nicht im Projekt eingebunden, da das Projekt sich dadurch nicht mehr ausführen ließ. Die OpenApi Dokumentation liegt trotzdem vollständig im Ordner /api vor.
Wir vermuten, dass es an der OpenApiEnforcerMiddleware scheitert, konnten das Problem aber nicht mehr lösen. In der package.json müsste zum Testen swagger-ui-express zu swagger-ui-restify getauscht werden.
*/

/*
const swaggerUi = require('swagger-ui-restify');
const swaggerDocument = require('api/openapi.json');
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.throttle({burst: 100, rate: 50, ip: true}));
server.use(restify.plugins.conditionalRequest());

// Console Log for Debugging
server.pre((req, res, next) => {
    console.log(new Date(), req.method, req.url, `HTTP ${req.httpVersion}`);
    return next();
});

// More debugging
server.on("restifyError", function(req, res, err, callback) {
    console.error(`${err.stack}\n`);
    return callback();
});

// Prevent CORS Policy Misbehaviour
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");
    return next();
});

server.opts("*", (req, res, next) => {
    res.status(200);
    res.send({});
    next();
});

// API Gateway Pre-Check
const openApiFile = path.relative("", path.join(__dirname, "api", "openapi.yaml"));
const openApiValidation = await OpenApiEnforcer(openApiFile, {fullResult: true});

const openApiEnforcer = await OpenApiEnforcer(openApiFile, {
    hideWarnings: true,
    componentOptions: {
        production: process.env.NODE_ENV === "production"
    },
});

server.use(OpenApiEnforcerMiddleware(openApiEnforcer));

// register root controller and start server
new RootController(server, "/");
new VehicleController(server, "/vehicle");
new MotorcycleController(server, "/motorcycle");
new TruckController(server, "/truck");

server.listen(config.port, config.host, function() {
    console.log();
    console.log("=================");
    console.log("vehicle inventory service");
    console.log("=================");
    console.log();
    console.log("Current config:");
    console.log();
    console.log(config);
    console.log();
    console.log("Frontend Entrypoint:");
    console.log();
    console.log(`OpenAPI-Spezifikation: ${openApiFile}`);
    console.log("Enjoy!");

    if (openApiValidation.error) {
        console.error(`${openApiValidation.error}\n`);
    }

    if (openApiValidation.warning) {
        console.warn(`${openApiValidation.warning}\n`);
    }

    console.log();
});