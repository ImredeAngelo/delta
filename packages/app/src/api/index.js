export const ENDPOINT_MAKE_EVENT = "/v0/events/make";
export const ENDPOINT_GET_EVENTS = "/v0/events/getAll";
export const ENDPOINT_GET_EVENT = "/v0/events/get";

export const endpoints = {
    events: {
        make: "/v0/events/make",
        getAll: "/v0/events/get",
        getID: "/v0/events/make",
    },
    users: {
        login: "/v0/users/login",
        loginWithToken: "/v0/users/refresh",
        register: "/v0/users/register",
    }
}

class API {
    constructor() {
        this.header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    }

    post(endpoint, data = {}, json = true) {
        return fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: this.header,
            body: JSON.stringify(data)
        })
        .then(r => json ? r.json() : r.text())
        .catch(e => console.error("A server error occured: ", e))
    }

    get(endpoint, json = true) {
        return fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: this.header
        })
        .then(r => json ? r.json() : r.text())
        .catch(e => console.error("A server error occured: ", e))
    }
}

export default new API();