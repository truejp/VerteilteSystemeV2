"use strict"

import { MongoClient } from "mongodb";

class DatabaseFactory {
    /**
     * @param {String} connectionUrl URL-String
     */
    async init(connectionUrl) {
        // Init session
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("vehicleinventory");
        await this._createDemoData();
    }

    /**
     * Push Demo Data
     */
    async _createDemoData() {
        let vehicles = this.database.collection("vehicles");
        let motorcycles = this.database.collection("motorcycles");
        let trucks = this.database.collection("trucks");

        if (await vehicles.estimatedDocumentCount() === 0) {
            vehicles.insertMany([
                {
                    vendor: "Audi",
                    model: "TT RS Coupe",
                    power: "249 PS",
                },
                {
                    vendor: "BMW",
                    model: "M4 Competition",
                    power: "450 PS",
                },
                {
                    vendor: "Lamborghini",
                    model: "Huracan Evo",
                    power: "610 PS",
                },
                {
                    vendor: "Mini",
                    model: "Cooper S",
                    power: "210 PS",
                },
            ]);
        }
        if (await motorcycles.estimatedDocumentCount() === 0) {
            motorcycles.insertMany([
                {
                    vendor: "BMW",
                    model: "R1100RS",
                    power: "120 PS",
                },
                {
                    vendor: "Ducati",
                    model: "V4S",
                    power: "219 PS",
                },
                {
                    vendor: "Honda",
                    model: "CBR600RR",
                    power: "129 PS",
                },
            ]);
        }
        if (await trucks.estimatedDocumentCount() === 0) {
            trucks.insertMany([
                {
                    vendor: "MAN",
                    model: "Semi",
                    power: "480 PS",
                },
                {
                    vendor: "Mercedes-Benz",
                    model: "Actros",
                    power: "510 PS",
                },
            ]);

        }
    }
}

export default new DatabaseFactory();
