export const ENDPOINT_MAKE_EVENT = "/v0/events/make";
export const ENDPOINT_GET_EVENTS = "/v0/events/getAll";
export const ENDPOINT_GET_EVENT = "/v0/events/get";

// TODO: Use environment variables
const host = 'http://192.168.1.99'

class API {
    constructor() {
        this.header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    }

    post(endpoint, data = {}, json = true) {
        return fetch(host + endpoint, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(data)
        })
        .then(r => json ? r.json() : r.text())
    }

    get(endpoint, json = true) {
        return fetch(host + endpoint, {
            method: 'GET',
            headers: this.header
        })
        .then(r => json ? r.json() : r.text())
    }
}

export default new API();