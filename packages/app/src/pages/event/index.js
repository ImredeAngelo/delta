import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BK from './bk.jpeg'
import MapBK from './map.png'
import s from './event-page.css'
import { combine } from '~style'
import api from '~api'

// million-ignore
export default function EventPage(props) {
	const { id } = useParams();
    const [ data, setData ] = useState({
		date: "Mandag 9. sep",
		start: "19:00",
		end: "23:00",
		location: "Realfagskjelleren, Herman Krags veg 12",
		description: "Beskrivelse av arr...",
		title: "Tittel her"
	});

	const link = data.location.replace(' ', '+');

	useEffect(() => {
		api.get(`/v0/events/get?id=${id}`)
			.then(r => {
				setData({
					...data,
					...r.data
				});

				console.log("Response: ", r)
			});
	}, [])

	return (
		<div className={s.wrapper}>
			<header className={s.header}>
				<img src={BK} className={s.bk}/>
				<h2 className={s.title}>{data.title}</h2>
			</header>
			<div className={s.description}>
				{ data.description }
			</div>
			<ul className={s.info}>
				<li className={s['info-item']}>
					<span className={combine(s.icon, s['date-icon'])}/>
					<span>{ data.date }, { data.start } - { data.end }</span>
				</li>
				<li className={s['info-item']}>
					<span className={combine(s.icon, s['pin-icon'])}/>
					<a 
						href={`https://maps.apple.com/?q=${link}`} 
						className={s.location}
						target='_blank'
					>
						{ data.location }
					</a>
				</li>
				<li className={combine(s['info-item'], s.map)}>
					<img src={MapBK} className={s['map-bk']}/>
				</li>
			</ul>
			<div className={s.actions}>
				<button className={combine(s.register, s.btn)} onClick={() => {
					alert("TODO")
				}}>
					Meld deg på
				</button>
			</div>
		</div>
	)
}
