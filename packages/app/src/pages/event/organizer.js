import React from 'react'
import s from './event-page.css'

export default function Organizer(props) {
	return (
		<div className={s.org}>
			<div className={s.profile}>
				<div/>
			</div>
			<div className={s.list}>
				<div>Arrangement av <span>{props.by}</span></div>
				<div>Forfatter: <span>Ola Nordmann</span></div>
			</div>
		</div>
	)
}
