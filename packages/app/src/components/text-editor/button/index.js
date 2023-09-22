import React from 'react'
import { redirect } from 'react-router-dom'
import useTextEditor from '../useTextEditor'
import api, { ENDPOINT_MAKE_EVENT } from '~api'

export default function Button(props) {
	const editor = useTextEditor();

	return (
		<button onClick={() => {
			const data = props.setData(editor.get());
			api.post(ENDPOINT_MAKE_EVENT, data).then(r => redirect(`/events/${r.id}`));
		}}>
			Lag Arrangement
		</button>
	)
}

