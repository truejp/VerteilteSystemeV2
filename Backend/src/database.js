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
    }
}

export default new DatabaseFactory();
