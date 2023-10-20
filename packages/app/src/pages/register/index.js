import React, { useState } from 'react'
import Verification from './verification'
import Text from '~components/text-editor/text'
import s from './reg.css'
import Submit from '~components/text-editor/submit'
import api, { endpoints } from '~api'

const submit = (e, setState) => {
    e.preventDefault();

    const { mail, name, pass } = e.target;

    api.post(endpoints.users.register, {
        mail: mail.value,
        name: name.value,
        pass: pass.value
    })
        .then(r => console.log("Response from server:", r))
        .then(r => setState(1))
}

export default function RegisterPage(props) {
    const [state, setState] = useState(0);

    return state == 0 ? (
        <div className={s.wrapper}>
            <h1>Lag ny bruker</h1>
            <form onSubmit={e => submit(e, setState)}>
                <ul>
                    <li><input type='text' name="mail" placeholder="E-post adresse"/></li>
                    <li><input type='text' name="name" placeholder="Fullt navn"/></li>
                    <li><input type='password' name="pass" placeholder="Passord"/></li>
                    <li><input type='password' name="pass-match" placeholder="Skriv inn passord igjen"/></li>
                    <li><button>Lag bruker</button></li>
                </ul>
            </form>
        </div>
    ) : 
    state == 1 ? (
        <div className={s.wrapper}>
            <h1>Lag ny bruker</h1>
            <Verification/>
        </div>
    ) : (
        <div>Last</div>
    )
}
