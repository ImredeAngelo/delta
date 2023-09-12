import React, { useCallback, useState } from 'react'
import { Editor, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { combine } from '~style'
import s from '../editor.css'

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: 'A line of text in a paragraph.' }],
	},
]

const keybinds = (event, editor) => {
	if(!event.ctrlKey) return;

	switch(event.key) {
		case "b": Editor.addMark(editor, 'bold', true); break;
		default: return;
	}

	event.preventDefault();
} 

const Leaf = (props) => {
	return (
		<span
			{...props.attributes}
			style={{ 
				fontWeight: props.leaf.bold ? 700 : 400,
				textDecoration: props.leaf.italic ? 'italic' : 'normal', 
			}}
		>
			{props.children}
		</span>
	)
}

let stack = [];

export default function Textbox(props) {
	const [ editor ] = useState(() => withReact(createEditor()));

	const chars = 0;
	const { limit } = { limit: 250 };

	return (
		<Slate editor={editor} initialValue={initialValue}>
			<div className={s.textbox}>
				<div className={s.content}>
					<Editable
						onKeyDown={(e) => keybinds(e, editor)}
						renderLeaf={useCallback(props => (<Leaf {...props} />), [])}
					/>
				</div>
				<div className={s.bar}>
					<ul className={s.toolbar}>
						<li className={combine(s.icon, s.bold, s.active)} aria-label='Bold Text' 
							onClick={() => Editor.addMark(editor, 'bold', true)}
						/>
						<li className={combine(s.icon, s.italic)} aria-label='Italic Text'
							onClick={() => Editor.addMark(editor, 'italic', true)}
						/>
						{/* <li className={combine(s.icon, s.underl)} aria-label='Underline Text'></li> */}
						<li className={s.split}/>
						<li className={combine(s.icon, s.undo)} aria-label='Undo'/>
						<li className={combine(s.icon, s.redo)} aria-label='Redo'/>
					</ul>
					<div className={s.sum}>
						<span>
							{chars}/{limit}
						</span>
					</div>
				</div>
			</div>
		</Slate>
	)
}
