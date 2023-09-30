import React from 'react'
import s from './login.css'
import api from '~api';

const validate = (e) => {
    const { user, pass } = e.target;

    const mailMatchesPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(user.value);
    if(!mailMatchesPattern) {
        console.error("Invalid e-mail address. TODO: Global overlay for errors.")
        return false;
    }

    return true;
}

export default function Login() {
    const submit = (e) => {
        e.preventDefault();
        
        if(!validate(e)) return;

        const { user, pass } = e.target;
        
        api.post('/v0/users/login', {
            user:user.value,
            pass:pass.value
        })
        .then(r => {
            console.log(r)
            if(r.status == "success") {
                console.log("TODO: Set user context")
            }
        })
        .catch(e => {
            console.error("TODO: Have global overlay for errors", e)
        })
    }

    return (
        <form onSubmit={submit}>
            <div className={s.list}>
                <input name="user" type='mail' placeholder='Brukernavn' required/>
                <input name="pass" type='password' placeholder='Passord' required minLength={8}/>
            </div>
            <button type='submit'>Logg inn</button>
            <button onClick={(e) => { e.preventDefault(); console.log("Log in with FB") }}>
                Logg på med FaceBook
            </button>
            <button onClick={(e) => { e.preventDefault(); console.log("Log in with other") }}>
                Flere
            </button>
        </form>
    )
}
