import React from 'react'
import Events from '~components/events'
import Login from '~components/login'
import s from './home.css'
import WelcomeSection from './welcome-section'

export default function HomePage() {
	return (
		<div className={s.wrapper}>
			<WelcomeSection/>
			<div>
				<Login/>
			</div>
			<div className={s['span-2']}>
				<h1>Arrangementer</h1>
				<Events/>
			</div>
		</div>
	)
}
