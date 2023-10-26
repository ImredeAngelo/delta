import React from 'react'
import s from './ws.css'
import { combine } from '~style'

export default function WelcomeSection() {
    return (
        <div className={combine(s.section, s['span-2'])}>
            <h1>Velkommen til Delta</h1>
            <p>Delta er linjeforeningen for studentene ved Matematiske fag og Fysikk på NTNU, og drives av studenter ved disse studiene.</p>
            <br/>
            <p>Linjeforeningen organiserer arrangementer på stor og liten skala, har et eget identitetsareal, tilbyr faglige ressurser, skaper kontakt med arbeidslivet, og tilbyr et bredt utvalg aktiviteter i komiteene sine.</p>
            <div className={s.row}>
                <button className={s.input} onClick={() => alert("Not implemented")}>
                    Les mer om oss
                </button>
            </div>
        </div>
    )
}
