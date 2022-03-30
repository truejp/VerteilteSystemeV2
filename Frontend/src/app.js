"use strict";

import Backend from "./backend.js";
import Router from "./router.js";
import "./app.css";

class App {
    /**
     * Constructor
     */
    constructor() {
        this.backend = new Backend();
        this.router = new Router([
            {
                url: "^/$",
                show: () => this._gotoList()
            },{
                url: "^/new/$",
                show: () => this._gotoNew()
            },{
                url: "^/edit/(.*)$",
                show: matches => this._gotoEdit(matches[1]),
            },{
                url: ".*",
                show: () => this._gotoList()
            },
        ]);

        this._documentTitle = document.title;
        this._pageCssElement = document.querySelector("#page-css");
        this._bodyElement = document.querySelector("body");
        this._menuElement = document.querySelector("#app-menu");
    }

    async init() {
        try {
            await this.backend.init();
            this.router.start();
        } catch (ex) {
            this.showException(ex);
        }
    }

    async _gotoList() {
        try {
            let {default: PageList} = await import("./page-list/page-list.js");
            let page = new PageList(this);
            await page.init();
            this._showPage(page, "list");
        } catch (ex) {
            this.showException(ex);
        }
    }

    async _gotoNew() {
        try {
            let {default: PageEdit} = await import("./page-edit/page-edit.js");

            let page = new PageEdit(this);
            await page.init();
            this._showPage(page, "new");
        } catch (ex) {
            this.showException(ex);
        }
    }

    async _gotoEdit(id) {
        try {
            let {default: PageEdit} = await import("./page-edit/page-edit.js");
            let page = new PageEdit(this, id);
            await page.init();
            this._showPage(page, "edit");
        } catch (ex) {
            this.showException(ex);
        }
    }
    _showPage(page, name) {
        document.title = `${this._documentTitle} – ${page.title}`;
        this._pageCssElement.innerHTML = page.css;
        this._menuElement.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this._menuElement.querySelectorAll(`li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
        this._bodyElement.querySelector("main")?.remove();
        this._bodyElement.appendChild(page.mainElement);
    }
    showException(ex) {
        console.error(ex);

        if (ex.message) {
            alert(ex.message)
        } else {
            alert(ex.toString());
        }
    }
}
window.addEventListener("load", async () => {
    let app = new App();
    await app.init();
});
