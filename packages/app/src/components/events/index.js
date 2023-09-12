import React from 'react'
import EventCard from '~components/event-card'
import s from './event-list.css'

const data = [
	{
		id:"AdCB97",
		title:"Event #1",
		color:"#952323",
		shortDate:"man 19.10"
	},
	{
		id:"ADJcNd",
		title:"Event #69",
		color:"#ECEE81",
		shortDate:"ons 21.10"
	}
]

export default function Events() {
	return (
		<div className={s.wrapper}>
			{ data.map((v, i) => (<EventCard key={i} {...v}/>))}
		</div>
	)
}
