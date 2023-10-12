import React, { useState } from 'react'
import s from './login.css'
import api from '~api';
import useUser from '~components/user/useUser';
import { combine } from '~style';
import submit from './submit';

export default function Login() {
    const [ errorMsg, setError ] = useState(false);
    const user = useUser();

    const sub = (e) => submit(e, user, setError);

    const error = errorMsg ? (<div>{errorMsg}</div>) : (""); 

    return user.isLoggedIn ? (
        <div className={s.box}>
            Logged in as {user.name}
        </div>
    ) : (
        <form onSubmit={sub} className={s.box}>
            <div className={s['list-item']}>
                <ul className={s.list}>
                    <li>
                        <h3>Logg inn</h3>
                    </li>
                    <li className={s.l}>
                        <a className={s.link} href="/iforgor">Glemt passord</a>
                    </li>
                    <li className={s.l}>
                        -
                    </li>
                    <li className={s.l}>
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
                    <button className={combine(s.input, s.fb)} onClick={(e) => { e.preventDefault(); alert("Facebook (Not Implemented)") }}>
                        Logg på med FaceBook
                    </button>
                    <button className={combine(s.input, s.more)} onClick={(e) => { e.preventDefault(); alert("Andre (Vipps/Apple/Etc.)") }}>
                        v
                    </button> 
                </div>
            </div>
            {error}
        </form>
    )
}
