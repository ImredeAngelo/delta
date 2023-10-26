import api from "~api"

export default (event, setEvent) => {
    api.get(`/v0/events/join?id=${event.id}`)
        .then(u => {
            setEvent({
                ...event,
                count: u.count
            });
        })

    // TODO: Error handling
    return true;
}