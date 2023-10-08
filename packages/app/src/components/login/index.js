import React, { useState } from 'react'
import s from './login.css'
import api from '~api';
import useUser from '~components/user/useUser';
import { combine } from '~style';

const validate = (e) => {
    const { mail, pass } = e.target;

    const mailMatchesPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mail.value);
    if(!mailMatchesPattern) {
        console.error("Invalid e-mail address. TODO: Global overlay for errors.")
        return false;
    }

    return true;
}

export default function Login() {
    const [ errorMsg, setError ] = useState(false);
    const user = useUser();

    const submit = (e) => {
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

    const error = errorMsg ? (<div>{errorMsg}</div>) : (""); 

    return user.isLoggedIn ? (
        <div className={s.box}>
            Logged in as {user.name}
        </div>
    ) : (
        <form onSubmit={submit} className={s.box}>
            <div className={s['list-item']}>
                <ul className={s.list}>
                    <li>
                        <h3>Logg inn</h3>
                    </li>
                    <li>
                        <a className={s.link} href="/iforgor">Glemt passord</a>
                    </li>
                    <li>
                        -
                    </li>
                    <li>
                        <a className={s.link} href="/register">Jeg er ny!</a>
                    </li>
                </ul>
            </div>
            <div className={s['list-item']}>
                <input className={s.input} name="mail" type='mail' placeholder='Brukernavn' required/>
            </div>
            <div className={s['list-item']}>
                <input className={s.input} name="pass" type='password' placeholder='Passord' required minLength={8}/>
            </div>
            <div className={s['list-item']}>
                <button className={s.input} type='submit'>Logg inn</button>
            </div>
            <div className={combine(s['list-item'], s.line)}>
                <span>eller</span>
            </div>
            <div className={s['list-item']}>
                <div className={s.row}>
                    <button className={combine(s.input, s.fb)} onClick={(e) => { e.preventDefault(); console.log("TODO: Log in with FB") }}>
                        Logg på med FaceBook
                    </button>
                    <button className={combine(s.input, s.more)} onClick={(e) => { e.preventDefault(); console.log("Log in with other") }}>
                        
                    </button> 
                </div>
            </div>
            {error}
        </form>
    )
}
