"use strict";
export default class Router {
    constructor(routes) {
        this._routes = routes;
        this._started = false;

        window.addEventListener("hashchange", () => this._handleRouting());
    }
    start() {
        this._started = true;
        this._handleRouting();
    }
    stop() {
        this._started = false;
    }
    _handleRouting() {
        let url = location.hash.slice(1);

        if (url.length === 0) {
            url = "/";
        }

        let matches = null;
        let route = this._routes.find(p => matches = url.match(p.url));

        if (!route) {
            console.error(`No route to ${url} found! Please try another route.`);
            return;
        }

        route.show(matches);
    }
};
