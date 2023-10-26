import api from "~api";

export default (id, data, setData) => {
    api.get(`/v0/events/get?id=${id}`)
        .then(r => {
            const header = `url(/${id}.png)`;
            const description = JSON.parse(r.event.description);

            setData({
                ...data,
                ...r.event,
                header: header,
                description: description,
            });
        })
        .catch(console.error)
}