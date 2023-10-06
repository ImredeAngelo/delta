import React from 'react'
import s from '../home.css'

export default function WelcomeSection() {
    return (
        <div className={s['span-2']}>
            <h1>Velkommen til Delta</h1>
            <p>
                Abakus er linjeforeningen for studentene ved Datateknologi ogKommunikasjonsteknologi og digital sikkerhet på NTNU, og drives av studenter ved disse studiene.
            </p>
            <p>
                Abakus' formål er å gi disse studentene veiledning i studiesituasjonen, arrangere kurs som utfyller fagtilbudet ved NTNU, fremme kontakten med næringslivet og bidra med sosiale aktiviteter.
            </p>
        </div>
    )
}
