import React, { useEffect, useState } from 'react'
import EventCard from '~components/events/event-card'
import api from '~api'
import s from './event-list.css'

export default function Events() {
	const [ events, setEvents ] = useState([]);

	useEffect(() => {
		api.get('/v0/events/get').then(r => setEvents(r.events))
	}, [])

	return (
		<div className={s.wrapper}>
			{ events ? events.map((v, i) => (<EventCard key={i} {...v}/>)) : 'Loading...'}
		</div>
	)
}
