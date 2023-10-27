import api from "~api";

const days = [ "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ]
const months = [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ]

export default (id, data, setData) => {
    api.get(`/v0/events/get?id=${id}`)
        .then(r => {
            const header = `url(/${id}.png)`;
            const description = JSON.parse(r.event.description);
            const date = new Date(r.event.date ? r.event.date : Date.now()); // TODO: Missing date should never happen now that DB has default NOW()

            setData({
                ...data,
                ...r.event,
                header: header,
                description: description,
                date: `${days[date.getDay() - 1]} ${date.getDate()}. ${months[date.getMonth() - 1].toLowerCase()}`,
                cost: 300
            });
        })
        .catch(console.error)
}