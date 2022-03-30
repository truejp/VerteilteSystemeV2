"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-edit.html";

export default class PageEdit extends Page {
    /**
     *Constructor.
     *
     * @param {App} app Instance
     * @param {Integer} editId ID
     */
    constructor(app, editId) {
        super(app, HtmlTemplate);

        // Dataset
        this._editId = editId;

        this._dataset = {
            vendor: "",
            model: "",
            power: "",
        };

        // Input Fields
        this._vendorInput = null;
        this._modelInput  = null;
        this._powerInput     = null;
    }

    /**
     * Load ressources.
     */
    async init() {
        // Fetch HTML
        await super.init();

        // Fetch Dataset
        if (this._editId) {
            this._url = `/vehicle/${this._editId}`;
            this._dataset = await this._app.backend.fetch("GET", this._url);
            this._title = `${this._dataset.model} ${this._dataset.model}`;
        } else {
            this._url = `/vehicle`;
            this._title = "Add Vehicle";
        }

        // Replace placeholder
        let html = this._mainElement.innerHTML;
        html = html.replace("$VENDOR$", this._dataset.vendor);
        html = html.replace("$MODEL$", this._dataset.model);
        html = html.replace("$POWER$", this._dataset.power);
        this._mainElement.innerHTML = html;
        let saveButton = this._mainElement.querySelector(".action.save");
        saveButton.addEventListener("click", () => this._saveAndExit());
        this._vendorInput = this._mainElement.querySelector("input.vendor");
        this._modelInput  = this._mainElement.querySelector("input.model");
        this._powerInput     = this._mainElement.querySelector("input.power");
    }

    async _saveAndExit() {
        // Prepare
        this._dataset._id        = this._editId;
        this._dataset.vendor = this._vendorInput.value.trim();
        this._dataset.model  = this._modelInput.value.trim();
        this._dataset.power      = this._powerInput.value.trim();

        if (!this._dataset.vendor) {
            alert("You have to enter a vendor.");
            return;
        }

        if (!this._dataset.model) {
            alert("You have to enter a model.");
            return;
        }

        try {
            if (this._editId) {
                await this._app.backend.fetch("PUT", this._url, {body: this._dataset});
            } else {
                await this._app.backend.fetch("POST", this._url, {body: this._dataset});
            }
        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        // go back
        location.hash = "#/";
    }
};
