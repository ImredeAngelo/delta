import api from "~api"

export default (event) => {
    api.get(`/v0/events/join?id=${event}`)
        .then(u => {
            console.log("Resp: ", u)
        })
}