import { NavLink } from 'react-router-dom'
import React from 'react'
import nav from './nav.css'

export default function Link(props) {
	return (
		<li className={nav['link-item']}>
			<NavLink 
				{...props} 
				className={({ isActive }) => (isActive ? nav.active : '')}
			>
				{props.children}
			</NavLink>
		</li>
	)
}
