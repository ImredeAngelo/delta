import React, { useMemo, useState } from 'react'
import { Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import s from './editor.css'
import Context from './context';

export default function TextEditor(props) {
	const [ values, setValues ] = useState({});
	const [ editor ] = useState(() => withReact(createEditor()));
	const initialValue = useMemo(() => JSON.parse(localStorage.getItem('editor-content')) || props.placeholder.map((v) => { 
		return {
			type: 'paragraph',
			children: [{ text: v }],
		}})
	);
	
	return (
		<Context.Provider value={{
			set: (key, val) => {
				var cpy = values;
				cpy[key] = val;
				setValues(cpy);
			},
			get: () => { 
				var vals = values;
				vals[description] = localStorage.getItem('editor-content');
				return vals;
			}
		}}>
			<Slate 
				initialValue={initialValue} // TODO: Get placeholder per component
				editor={editor} 
				onChange={val => {
					const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)
					if (isAstChange) {
						const content = JSON.stringify(val)
						localStorage.setItem('editor-content', content)
					}
				}}
			>
				<div className={s.wrapper}>
					{props.children}
				</div>
			</Slate>
		</Context.Provider>
	)
}
