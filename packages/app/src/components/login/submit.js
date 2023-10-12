import api from "~api";
import validate from "./validate";

export default function submit(e, user, setError) {
    e.preventDefault();
    
    if(!validate(e)) return;
    
    const { mail, pass } = e.target;
    
    api.post('/v0/users/login', {
        user:mail.value,
        pass:pass.value
    })
    .then(r => {
        if(r.status == "success") {
            user.set(r.user);
            return;
        }

        setError("Feil brukernavn eller passord")
    })
    .catch(e => {
        console.error("TODO: Have global overlay for errors", e)
    })
}