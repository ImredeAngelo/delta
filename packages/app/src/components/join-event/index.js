import React, { useEffect, useState } from 'react'
import { combine } from '~style'
import useUser from '~components/user/useUser'
import register from './register';
import unregister from './unregister';
import s from './join.css'

export default function JoinEvent(props) {
    const user = useUser();
    
    const [ isRegistered, setRegistered ] = useState(user.name != null);
    const [ event, setEvent ] = useState(props.event);
    const text = isRegistered ? "Meld deg av" : (user ? "Meld deg på" : "Logg inn for å melde deg på");

    // TODO: Registered events should already be stored in 'user' -> No need to query server
    // TODO: Connect with socket and update user count live
    useEffect(() => {
        // Check if registered    
    }, [isRegistered]);

    return (
        <div className={s.wrapper}>
            {/* <ul className={s.status}> */}
                <div className={s.box}>
                    <h2>Påmeldte</h2>
                    <span className={s.text}>{event.count}/{event.max}</span>
                </div>
                <div className={s.box}>
                    <h2>Venteliste</h2>
                    <span className={s.text}>{event.waitlist}</span>
                </div>
            {/* </ul> */}
            <div className={s.main}>
                <h2>Påmelding</h2>
                <button className={combine(s.register, s.btn)} onClick={() => {
                    // TODO: Set loading icon on click
                    const next = isRegistered ? unregister() : register(event, setEvent);
                    setRegistered(next ? !isRegistered : isRegistered);
                }}>
                    {text}
                </button>
            </div>
        </div>
    )
}
