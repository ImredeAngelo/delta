import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './event.css'

export default function EventCard(props) {

	return (
		<li className={s.card}>
			<NavLink {...props} to={`/event/${props.id}`} className={s.content}>
				<div className={s.bar} style={{ backgroundColor: '#' + props.color.toString(16) }}/>
				<div className={s.content}>
					<span className={s.title}>{props.title}</span>
					<span className={s.date}>{props.shortDate}</span>
				</div>
			</NavLink>
		</li>
	)
}
