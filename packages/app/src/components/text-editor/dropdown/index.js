import React from 'react'
import useTextEditor from '../useTextEditor'

export default function Dropdown(props) {
	const options = props.options.map((v, i) => (<option key={i} value={i}>{v}</option>))
	const editor = useTextEditor();

	return (
		<select name={props.name} onChange={(e) => editor.set(props.name, e.target.value)}>
			{ options }
		</select>
	)
}
