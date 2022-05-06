"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Management of vehicle inventory - microservice
 */
export default class VehicleService {
    /**
     * Construrctor.
     */
    constructor() {
        this._vehicles = DatabaseFactory.database.collection("vehicles");
        this._motorcycle = DatabaseFactory.database.collection("motorcycles");
        this._truck = DatabaseFactory.database.collection("trucks");
    }

    /**
     * Search for vehicles. Very simple integration.
     *
     * @param {Object} query Optional Param
     * @return {Promise} List of result
     */
    async search(query) {
        let cursor = this._vehicles.find(query, {
            sort: {
                vendor: 1,
                model: 1,
            }
        });
        return cursor.toArray();
    }

    async searchMotorcycle(query) {
        let cursor = this._motorcycle.find(query, {
            sort: {
                vendor: 1,
                model: 1,
            }
        });
        return cursor.toArray();
    }

    async searchTruck(query) {
        let cursor = this._truck.find(query, {
            sort: {
                vendor: 1,
                model: 1,
            }
        });

        return cursor.toArray();
    }

    /**
     * Save under new vehicle.
     *
     * @param {Object} vehicle to be saved
     * @return {Promise} saved
     */
    async create(vehicle) {
        vehicle = vehicle || {};

        let newVehicle = {
            vendor: vehicle.vendor || "",
            model:  vehicle.model  || "",
            power:  vehicle.power  || "",
        };

        let result = await this._vehicles.insertOne(newVehicle);
        return await this._vehicles.findOne({_id: result.insertedId});
    }

    async createMotorcycle(motorcycle) {
        motorcycle = motorcycle || {};

        let newMotorcycle = {
            vendor: motorcycle.vendor || "",
            model:  motorcycle.model  || "",
            power:  motorcycle.power  || "",
        };

        let result = await this._motorcycle.insertOne(newMotorcycle);
        return await this._motorcycle.findOne({_id: result.insertedId});
    }

    async createTruck(truck) {
        truck = truck || {};

        let newTruck = {
            vendor: truck.vendor || "",
            model:  truck.model  || "",
            power:  truck.power  || "",
        };

        let result = await this._truck.insertOne(newTruck);
        return await this._truck.findOne({_id: result.insertedId});
    }

    /**
     * Fetch based on ID
     *
     * @param {String} id ID 
     * @return {Promise} Result
     */
    async read(id) {
        let result = await this._vehicles.findOne({_id: new ObjectId(id)});
        return result;
    }

    async readMotorcycle(id) {
        let result = await this._motorcycle.findOne({_id: new ObjectId(id)});
        return result;
    }

    async readTruck(id) {
        let result = await this._truck.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Update of dataset
     *
     * @param {String} id ID 
     * @param {[type]} vehicle Data
     * @return {Promise} Result
     */
    async update(id, vehicle) {
        let oldVehicle = await this._vehicles.findOne({_id: new ObjectId(id)});
        if (!oldVehicle) return;

        let updateDoc = {
            $set: {},
        }

        if (vehicle.vendor) updateDoc.$set.vendor = vehicle.vendor;
        if (vehicle.model)  updateDoc.$set.model  = vehicle.model;
        if (vehicle.power)      updateDoc.$set.power      = vehicle.power;

        await this._vehicles.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._vehicles.findOne({_id: new ObjectId(id)});
    }

    async updateMotorcycle(id, motorcycle) {
        let oldMotorcycle = await this._motorcycle.findOne({_id: new ObjectId(id)});
        if (!oldMotorcycle) return;

        let updateDoc = {
            $set: {},
        }

        if (motorcycle.vendor) updateDoc.$set.vendor = motorcycle.vendor;
        if (motorcycle.model)  updateDoc.$set.model  = motorcycle.model;
        if (motorcycle.power)      updateDoc.$set.power      = motorcycle.power;

        await this._motorcycle.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._motorcycle.findOne({_id: new ObjectId(id)});
    }

    async updateTruck(id, truck) {
        let oldTruck = await this._truck.findOne({_id: new ObjectId(id)});
        if (!oldTruck) return;

        let updateDoc = {
            $set: {},
        }

        if (truck.vendor) updateDoc.$set.vendor = truck.vendor;
        if (truck.model)  updateDoc.$set.model  = truck.model;
        if (truck.power)      updateDoc.$set.power      = truck.power;

        await this._truck.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._truck.findOne({_id: new ObjectId(id)});
    }

    /**
     * Delete by ID
     *
     * @param {String} id ID
     * @return {Promise} Result
     */
    async delete(id) {
        let result = await this._vehicles.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }

    async deleteMotorcycle(id) {
        let result = await this._motorcycle.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }

    async deleteTruck(id) {
        let result = await this._truck.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
