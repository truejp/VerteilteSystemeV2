"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-list.html";
export default class PageList extends Page {
    /**
     * Constructor
     *
     * @param {App} app Instance
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
    }

    async init() {
        await super.init();
        this._title = "Overview";
        let data = await this._app.backend.fetch("GET", "/vehicle");
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        if (data.length) {
            this._emptyMessageElement.classList.add("hidden");
        }

        let olElement = this._mainElement.querySelector("ol");
        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in data) {
            let dataset = data[index];
            let html = templateHtml;

            html = html.replace("$ID$", dataset._id);
            html = html.replace("$VENDOR$", dataset.vendor);
            html = html.replace("$MODEL$", dataset.model);
            html = html.replace("$POWER$", dataset.power);

            let dummyElement = document.createElement("div");
            dummyElement.innerHTML = html;
            let liElement = dummyElement.firstElementChild;
            liElement.remove();
            olElement.appendChild(liElement);

            liElement.querySelector(".action.edit").addEventListener("click", () => location.hash = `#/edit/${dataset._id}`);
            liElement.querySelector(".action.delete").addEventListener("click", () => this._askDelete(dataset._id));
        }
    }

    /**
     * Delete - Confirmation dialog
     *
     * @param {Integer} id ID
     */
    async _askDelete(id) {
        let answer = confirm("Do you want to delete this entry?");
        if (!answer) return;

        try {
            this._app.backend.fetch("DELETE", `/vehicle/${id}`);
        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        this._mainElement.querySelector(`[data-id="${id}"]`)?.remove();

        if (this._mainElement.querySelector("[data-id]")) {
            this._emptyMessageElement.classList.add("hidden");
        } else {
            this._emptyMessageElement.classList.remove("hidden");
        }
    }
};
