import React, { useCallback } from 'react'
import { Editable, useSlate } from 'slate-react'
import { Editor } from 'slate'
import { combine } from '~style'
import keybinds from './keybinds'
import Leaf from './leaf'
import s from '../editor.css'

/**
 * Multi-line text input
 */
export default function Textbox(props) {
	const { editor } = useSlate();

	props = {
		limit: 250,
		extended: true,
		...props,
	}
	
	const { limit } = { limit: 250 };
	const { extended } = props;
	const chars = 0;

	return (
		<div className={combine(s.field, s.textbox)}>
			<div className={s.content}>
				<Editable
					onKeyDown={(e) => keybinds(e, editor)}
					renderLeaf={useCallback(props => (<Leaf {...props} />), [])}
				/>
			</div>
			<div className={s.bar}>
				{ (extended) ? (
						<ul className={s.toolbar}>
							<li className={combine(s.icon, s.bold, s.active)} aria-label='Bold Text' 
								onClick={() => Editor.addMark(editor, 'bold', true)}
							/>
							<li className={combine(s.icon, s.italic)} aria-label='Italic Text'
								onClick={() => Editor.addMark(editor, 'italic', true)}
							/>
							{/* <li className={combine(s.icon, s.underl)} aria-label='Underline Text'></li> */}
							<li className={s.split}/>
							<li className={combine(s.icon, s.undo)} aria-label='Undo'
								onClick={() => console.log("TODO: Undo changes")}
							/>
							<li className={combine(s.icon, s.redo)} aria-label='Redo'
								onClick={() => console.log("TODO: Redo changes")}
							/>
						</ul>
					) : ''
				}
				<div className={s.sum}>
					<span>
						{chars}/{limit}
					</span>
				</div>
			</div>
		</div>
	)
}
