import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './event-page.css'
import { combine } from '~style'
import Map from './map'
import Organizer from './organizer'
import Display from '~components/text-editor/display'
import { Helmet } from 'react-helmet'
import onStart from './onStart'
import placeholder from './placeholder.json';
import JoinEventBtn from '~components/join-event'

// million-ignore
export default function EventPage(props) {
	const { id } = useParams();
    const [ data, setData ] = useState({
		...placeholder,
		...props.data
	});

	const link = data.location.replace(' ', '+');

	useEffect(() => onStart(id, data, setData), [])

	return (
		<div className={s.wrapper}>
			<Helmet>
				<title>{`Delta Linjeforening | ${data.title}`}</title>
				<meta property='og:title' content={`Delta | ${data.title}`}/>
				<meta property='og:description' content={data.description[0].children[0].text}/>
				<meta property='og:image' content={`https://${process.env.HOST}/${id}.png`}/>
				<meta property='og:url' content={`https://${process.env.HOST}/event/${id}`}/>
				<meta property='og:site_name' content='Delta Linjeforening'/>
				<meta name='twitter:card' content='summary_large_image'/>
				<meta name='twitter:title' content={`Delta | ${data.title}`}/>
				<meta name='twitter:description' content={data.description[0].children[0].text}/>
			</Helmet>
			<header className={s.header}>
				<div className={s.bk}>
					<div className={s['bk-img']} style={{ backgroundImage: data.header }}/>
				</div>
				<h2 className={s.title}>{data.title}</h2>
			</header>
			<div className={s.content}>
				<div className={s.lhs}>
					<div className={s.description}>
						<Display text={data.description}/>
					</div>
				</div>
				<div className={s.rhs}>
					<ul className={s.info}>
						<li className={s['info-item']}>
							<span className={combine(s.icon, s['date-icon'])}/>
							<span className={s['icon-text']}>{ data.date }, { data.start } - { data.end }</span>
						</li>
						<li className={s['info-item']}>
							<span className={combine(s.icon, s['pin-icon'])}/>
							<a 
								rel="noopener noreferrer"
								href={`https://maps.apple.com/?q=${link}`} 
								className={combine(s['icon-text'], s.location)}
								target='_blank'
							>
								{ data.location }
							</a>
						</li>
						{ data.cost > 0 ? 
							(<li className={s['info-item']}>
								<span className={combine(s.icon, s['price-icon'])}/>
								<span className={s['icon-text']}>{ data.cost }</span>
							</li>) : '' 
						}
						<li className={combine(s['info-item'], s.map)}>
							{/* <img src={MapBK} className={s['map-bk']}/> */}
							<Map/>
						</li>
					</ul>
					<div className={s.actions}>
						<JoinEventBtn event={{ id:id, count: 0, max: 20, waitlist: 0 }}/>
					</div>
					<Organizer by={"Delta Linjeforening"}/>
				</div>
			</div>
		</div>
	)
}
