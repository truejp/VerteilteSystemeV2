"use strict"

import {wrapHandler} from "../utils.js";
import path from "path";
import { readFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Root Controller
 */
export default class RootController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstance
     * @param {String} prefix Shared Prefix of all URLs
     */
    constructor(server, prefix) {
        this._openApiFile = path.normalize(path.join(__dirname, "..", "api", "openapi.yaml"));

        server.get(prefix, wrapHandler(this, this.index));
        server.get(prefix + "/openapi.yaml", wrapHandler(this, this.openApi));
    }

    /**
     * GET /:
     */
    async index(req, res, next) {
        res.sendResult([
            {
                _name: "vehicle",
                query: {url: "/vehicle", method: "GET", query_params: ["search", "vendor", "model", "power"]},
                create: {url: "/vehicle", method: "POST"},
            },
            {
                _name: "motorcycle",
                query: {url: "/motorcycle", method: "GET", query_params: ["search", "vendor", "model", "power"]},
                create: {url: "/motorcycle", method: "POST"},
            },
            {
                _name: "truck",
                query: {url: "/truck", method: "GET", query_params: ["search", "vendor", "model", "power"]},
                create: {url: "/truck", method: "POST"},
            }

        ]);

        next();
    }

    /**
     * GET /openapi.yaml:
     */
    async openApi(req, res, next) {
        if (req.query.openapi !== undefined) {
            let filecontent = await readFile(this._openApiFile);

            res.status(200);
            res.header("content-type", "application/openapi+yaml");
            res.sendRaw(filecontent);
        } else {
            res.send();
        }

        next();
    }
}
