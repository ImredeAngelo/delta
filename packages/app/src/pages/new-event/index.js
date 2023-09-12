import React from 'react'
import Textbox from '~components/text-editor/textbox'
import s from './new.css'
import api, { ENDPOINT_MAKE_EVENT } from '~api'

export default function NewEvent(props) {
	var data = {
		title: 'Hello World',
		descr: ''
	}
	
	return (
		<div className={s.wrapper}>
			<h1>New Event</h1>
			<Textbox/>
			<button onClick={() => {
				api.post(ENDPOINT_MAKE_EVENT, data).then(r => console.log("Response:", r));
			}}>
				Lag Arrangement
			</button>
		</div>
	)
}
