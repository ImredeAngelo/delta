import React from 'react'
import Events from '~components/events'
import Login from '~components/login'
import s from './home.css'

export default function HomePage() {
	return (
		<div className={s.wrapper}>
			<div>
				<h1>Arrangementer</h1>
				<Events/>
			</div>
			<div>
				<h1>Login</h1>
				<Login/>
			</div>
		</div>
	)
}
