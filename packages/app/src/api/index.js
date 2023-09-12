export const ENDPOINT_MAKE_EVENT = "/v0/create";
export const ENDPOINT_GET_EVENTS = "/v0/getAll";
export const ENDPOINT_GET_EVENT = "/v0/get";

// TODO: Use environment variables
const host = 'http://0.0.0.0'

class API {
    constructor() {
        this.header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    }

    post(endpoint, data = {}, json = true) {
        // if(isStatic) { return new Promise((res, rej) => rej("Static Render")); }

        return fetch(host + endpoint, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(data)
        })
        .then(r => json ? r.json() : r.text())
    }

    get(endpoint, json = true) {
        // if(isStatic) { return new Promise((res, rej) => rej("Static Render")); }

        return fetch(host + endpoint, {
            method: 'GET',
            headers: this.header
        })
        .then(r => json ? r.json() : r.text())
    }
}

export default new API();