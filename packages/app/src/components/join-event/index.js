import React from 'react'
import { combine } from '~style'
import s from './join.css'

export default function JoinEvent() {
    return (
        <div>
            <button className={combine(s.register, s.btn)} onClick={() => {
                alert("TODO")
            }}>
                Meld deg på
            </button>
        </div>
    )
}
