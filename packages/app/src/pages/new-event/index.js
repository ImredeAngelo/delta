import React from 'react'
import TextEditor from '~components/text-editor'
import Textbox from '~components/text-editor/textbox'
import Text from '~components/text-editor/text'
import s from './new.css'
import Dropdown from '~components/text-editor/dropdown'
import Submit from '~components/text-editor/submit'
import Image from '~components/text-editor/image'

export default function NewEvent(props) {
	return (
		<div className={s.wrapper}>
			{/* TODO: Consolidate and unify h1 tags etc. */}
			<h1 className={s.title}>Lag Nytt Arrangement</h1>
			<TextEditor placeholder={['Hello World']}>
				<Image name="header" text="Velg header"/>
				<Text name="title"/>
				<Textbox name="description"/>
				<div className={s.multi}>
					<div>
						Arrangement type:
					</div>
					<Dropdown 
						name="type"
						options={[
							'Fest',
							'Annet'
						]}
					/>
				</div>
				{/* TODO: Flexbox */}
				<Submit setData={(values) => {
					const desc = JSON.parse(localStorage.getItem('editor-content'));
					return {
						...values,
						description: JSON.stringify(desc)
					}
				}}>
					Lag Arrangement
				</Submit>
			</TextEditor>
		</div>
	)
}
