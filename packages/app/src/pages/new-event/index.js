import React from 'react'
import Textbox from '~components/text-editor/textbox'
import s from './new.css'

export default function NewEvent(props) {
	return (
		<div className={s.wrapper}>
			<h1>New Event</h1>
			<Textbox/>
		</div>
	)
}
