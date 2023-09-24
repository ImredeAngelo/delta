import React from 'react'
import { redirect } from 'react-router-dom'
import useTextEditor from '../useTextEditor'
import api, { ENDPOINT_MAKE_EVENT } from '~api'

export default function Submit(props) {
	const editor = useTextEditor();

	return (
		<button onClick={() => {
			const data = props.setData(editor.get());

			console.log("Sending data:", data)

			api.post(ENDPOINT_MAKE_EVENT, data).then(r => console.log("Response from server:", r)) //.then(r => redirect(`/events/${r.id}`));
		}}>
			{ props.children }
		</button>
	)
}

