import { combine, conditional } from '~style'
import React, { useState } from 'react'
import style from './nav-btn.css'

export default function MenuButton(props) {
    const open = props.open;

    return (
        <button type="button" 
            className={combine(style.hamburger, style['hamburger--magnetic'], conditional(open, style.active))}
            onClick={() => { props.onClick(!open) }}
        >
            <div className={style.inner}>
                <span className={style.bar}></span>
                <span className={style.bar}></span>
                <span className={style.bar}></span>
            </div>
        </button>
    )
}