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
}
