import React from 'react'
import s from '../editor.css'
import { combine } from '~style'
import useTextEditor from '../useTextEditor'

/**
 * Simple text form 
 */
export default function Text(props) {
	const editor = useTextEditor();

	return (
		<input 
			name={props.name} 
			className={combine(s.field, s.text)} 
			placeholder='Navn på Arrangement' 
			onChange={(e) => editor.set(props.name, e.target.value)}
		/>
	)
}
