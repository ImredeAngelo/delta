import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BK from './bk.jpeg'
import MapBK from './map.png'
import s from './event-page.css'
import { combine } from '~style'
import api from '~api'
import Map from './map'
import Organizer from './organizer'
import Display from '~components/text-editor/display/display'

// million-ignore
export default function EventPage(props) {
	const { id } = useParams();
    const [ data, setData ] = useState({
		...props.data,
		date: "Mandag 9. sep",
		start: "19:00",
		end: "23:00",
		location: "Realfagskjelleren, Herman Krags veg 12",
		description: '[{ "type":"paragraph", "children":[{ "text":"Informasjon kommer!" }] }]',
		title: "Ukjent Arrangement",
		header: "url(/bk.jpeg)",
		type: 0
	});

	const link = data.location.replace(' ', '+');
	const description = JSON.parse(data.description);

	useEffect(() => {
		api.get(`/v0/events/get?id=${id}`)
			.then(r => {
				const header = `url(/${id}.png)`;

				setData({
					...data,
					...r.event,
					header: header,
				});

				console.log("Response: ", r)
			})
			.catch(console.error)
	}, [])

	return (
		<div className={s.wrapper}>
			<header className={s.header}>
				<div className={s.bk}>
					<div style={{
						height: '100%',
						width: '100%',
						backgroundImage: data.header,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}/>
					{/* <img src={data.header} className={s.bk}/> */}
				</div>
				<h2 className={s.title}>{data.title}</h2>
			</header>
			<div className={s.content}>
				<div className={s.description}>
					<Display text={description}/>
				</div>
				<div className={s.rhs}>
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
							{/* <img src={MapBK} className={s['map-bk']}/> */}
							<Map/>
						</li>
					</ul>
					<div className={s.actions}>
						<h2>Påmelding</h2>
						<button className={combine(s.register, s.btn)} onClick={() => {
							alert("TODO")
						}}>
							Meld deg på
						</button>
					</div>
					<Organizer by={"Delta Linjeforening"}/>
				</div>
			</div>
		</div>
	)
}
