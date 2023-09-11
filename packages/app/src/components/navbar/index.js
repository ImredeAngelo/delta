import React, { useEffect, useState } from 'react'
import MenuButton from './button'
import Link from './link'
import nav from './nav.css'

export default function Navbar(props) {
    const [ open, setOpen ] = useState(false);
    const close = () => setOpen(false);

    useEffect(() => {
        const menustate = document.getElementById(nav.menustate);
        menustate.checked = open;
    }, [open])

    return (
        <nav className={nav.wrapper}>
            <div className={nav.bar}>
                <input id={nav.menustate} type="checkbox"/>
                <div className={nav.header}>
                    <span>
                        <div className={nav.logo}>
                            {/* Delta Linjeforening */}
                        </div>
                        <div className={nav.name}>Delta Linjeforening</div>
                    </span>
                    <MenuButton onClick={setOpen} open={open}/>
                </div>
                <ul className={nav.content}>
                    <Link onClick={close} to="/">Min Profil</Link>
                    <Link onClick={close} to="/event/AdCam">Arrangementer</Link>
                </ul>
            </div>
        </nav>
    )
}