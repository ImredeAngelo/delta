import React from 'react'
import s from './ftr.css'
import Map from '~pages/event/map'

/**
 * Footer displayed on every page
 */
export default function Footer() {
	return (
		<footer className={s.footer}>
			<div className={s.content}>
				<div className={s.info}>
					<div className={s.map}>
						{/* <Map/> */}
					</div>
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
					</ul>
				</div>
				<div className={s.sitemap}>
					<ul>
						<li>Site</li>
						<li>Site</li>
						<li>Site</li>
					</ul>
				</div>
			</div>
			<div className={s.bar}>
				Delta Linjeforening © 2023
			</div>
		</footer>
	)
}
