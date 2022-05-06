"use strict"

import VehicleService from "../service/vehicle.service.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Class for new vehicles
 */
export default class VehicleController {
    /**
     * Constructor
     *
     * @param {Object} server Restify Serverinstance
     * @param {String} prefix Shared Prefix of all URLs
     */
    constructor(server, prefix) {
        this._service = new VehicleService();
        this._prefix = prefix;

        // Collection: Vehicles
        server.get(prefix, wrapHandler(this, this.search));
        server.post(prefix, wrapHandler(this, this.create));

        // Entity: Vehicles
        server.get(prefix + "/:id", wrapHandler(this, this.read));
        server.put(prefix + "/:id", wrapHandler(this, this.update));
        server.patch(prefix + "/:id", wrapHandler(this, this.update));
        server.del(prefix + "/:id", wrapHandler(this, this.delete));
    }

    /**
     * openAPI Stuff
     *
     * @param {Object} entity Zu verändernder Datensatz.
     */
    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity._id}`;
        entity._links = {
            read:   {url: url, method: "GET"},
            update: {url: url, method: "PUT"},
            patch:  {url: url, method: "PATCH"},
            delete: {url: url, method: "DELETE"},
        }
    }

    /**
     * GET /vehicle
     */
    async search(req, res, next) {
        let result = await this._service.search(req.query);
        result.forEach(entity => this._insertHateoasLinks(entity));
        res.sendResult(result);
        return next();
    }

    /**
     * POST /vehicle
     */
    async create(req, res, next) {
        let result = await this._service.create(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }

    /**
     * GET /vehicle/:id
     */
    async read(req, res, next) {
        let result = await this._service.read(req.params.id);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 01: Vehicle not found.");
        }

        return next();
    }

    /**
     * PUT /vehicle/:id
     * PATCH /vehicle/:id
     */
    async update(req, res, next) {
        let result = await this._service.update(req.params.id, req.body);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 02: Vehicle not found.");
        }

        return next();
    }

    /**
     * DELETE /vehicle/:id
     */
    async delete(req, res, next) {
        await this._service.delete(req.params.id)
        res.status(204);
        res.sendResult({});
        return next();
    }
}

/**
 * HTTP-Controller-Class for new motorcycles
 */
 export class MotorcycleController {
    /**
     * Constructor
     *
     * @param {Object} server Restify Serverinstance
     * @param {String} prefix Shared Prefix of all URLs
     */
    constructor(server, prefix) {
        this._service = new VehicleService();
        this._prefix = prefix;

        // Collection: Motorcycle
        server.get(prefix, wrapHandler(this, this.searchMotorcycle));
        server.post(prefix, wrapHandler(this, this.createMotorcycle));

        // Entity: Motorcycle
        server.get(prefix + "/:id", wrapHandler(this, this.readMotorcycle));
        server.put(prefix + "/:id", wrapHandler(this, this.updateMotorcycle));
        server.patch(prefix + "/:id", wrapHandler(this, this.updateMotorcycle));
        server.del(prefix + "/:id", wrapHandler(this, this.deleteMotorcycle));
    }

    /**
     * openAPI Stuff
     *
     * @param {Object} entity Zu verändernder Datensatz.
     */
    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity._id}`;

        entity._links = {
            read:   {url: url, method: "GET"},
            update: {url: url, method: "PUT"},
            patch:  {url: url, method: "PATCH"},
            delete: {url: url, method: "DELETE"},
        }
    }

    /**
     * GET /motorcycle
     */
    async searchMotorcycle(req, res, next) {
        let result = await this._service.searchMotorcycle(req.query);
        result.forEach(entity => this._insertHateoasLinks(entity));
        res.sendResult(result);
        return next();
    }

    /**
     * POST /motorcycle
     */
    async createMotorcycle(req, res, next) {
        let result = await this._service.createMotorcycle(req.body);
        this._insertHateoasLinks(result);
        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);
        return next();
    }

    /**
     * GET /motorcylce/:id
     */
    async readMotorcycle(req, res, next) {
        let result = await this._service.readMotorcycle(req.params.id);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 01: Motorcycle not found.");
        }

        return next();
    }

    /**
     * PUT /motorcycle/:id
     * PATCH /motorcycle/:id
     */
    async updateMotorcycle(req, res, next) {
        let result = await this._service.updateMotorcycle(req.params.id, req.body);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 02: Motorcycle not found.");
        }

        return next();
    }

    /**
     * DELETE /motorcycle/:id
     */
    async deleteMotorcycle(req, res, next) {
        await this._service.deleteMotorcycle(req.params.id)
        res.status(204);
        res.sendResult({});
        return next();
    }
}


/**
 * HTTP-Controller-Class for new trucks
 */
 export class TruckController {
    /**
     * Constructor
     *
     * @param {Object} server Restify Serverinstance
     * @param {String} prefix Shared Prefix of all URLs
     */
    constructor(server, prefix) {
        this._service = new VehicleService();
        this._prefix = prefix;

        // Collection: Truck
        server.get(prefix, wrapHandler(this, this.searchTruck));
        server.post(prefix, wrapHandler(this, this.createTruck));

        // Entity: Truck
        server.get(prefix + "/:id", wrapHandler(this, this.readTruck));
        server.put(prefix + "/:id", wrapHandler(this, this.updateTruck));
        server.patch(prefix + "/:id", wrapHandler(this, this.updateTruck));
        server.del(prefix + "/:id", wrapHandler(this, this.deleteTruck));
    }

    /**
     * openAPI Stuff
     *
     * @param {Object} entity Zu verändernder Datensatz.
     */
    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity._id}`;

        entity._links = {
            read:   {url: url, method: "GET"},
            update: {url: url, method: "PUT"},
            patch:  {url: url, method: "PATCH"},
            delete: {url: url, method: "DELETE"},
        }
    }

    /**
     * GET /truck
     */
    async searchTruck(req, res, next) {
        let result = await this._service.searchTruck(req.query);
        result.forEach(entity => this._insertHateoasLinks(entity));
        res.sendResult(result);
        return next();
    }

    /**
     * POST /truck
     */
    async createTruck(req, res, next) {
        let result = await this._service.createTruck(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }

    /**
     * GET /truck/:id
     */
    async readTruck(req, res, next) {
        let result = await this._service.readTruck(req.params.id);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 01: Truck not found.");
        }

        return next();
    }

    /**
     * PUT /truck/:id
     * PATCH /truck/:id
     */
    async updateTruck(req, res, next) {
        let result = await this._service.updateTruck(req.params.id, req.body);
        this._insertHateoasLinks(result);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Err 02: Truck not found.");
        }

        return next();
    }

    /**
     * DELETE /truck/:id
     */
    async deleteTruck(req, res, next) {
        await this._service.deleteTruck(req.params.id)
        res.status(204);
        res.sendResult({});
        return next();
    }
}
