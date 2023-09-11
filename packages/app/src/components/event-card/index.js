import React from 'react'
import s from './event.css'

export default function EventCard(props) {
	return (
		<div className={s.card}>
			<div className={s.bar} style={{ backgroundColor: props.color }}/>
			<div className={s.content}>
				<span className={s.title}>{props.title}</span>
				<span className={s.date}>{props.shortDate}</span>
			</div>
		</div>
	)
}
