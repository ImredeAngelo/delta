import React from 'react'
import api, { ENDPOINT_MAKE_EVENT } from '~api'
import TextEditor from '~components/text-editor'
import Textbox from '~components/text-editor/textbox'
import Text from '~components/text-editor/text'
import s from './new.css'
import Dropdown from '~components/text-editor/dropdown'

const Submit = (props) => {
	return (
		<button onClick={() => {
			const data = props.setData({});
			api.post(ENDPOINT_MAKE_EVENT, data).then(r => console.log("Response:", r));
		}}>
			Lag Arrangement
		</button>
	)
}

export default function NewEvent(props) {
	return (
		<div className={s.wrapper}>
			{/* TODO: Consolidate and unify h1 tags etc. */}
			<h1 className={s.title}>Lag Nytt Arrangement</h1>
			<TextEditor placeholder={['Hello World']}>
				<Text name="title"/>
				<Textbox name="description"/>
				{/* TODO: Flexbox */}
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
				<Submit setData={(values) => {
					const desc = localStorage.getItem('editor-content');
					return {
						...values
						// description: desc
					}
				}}/>
			</TextEditor>
		</div>
	)
}
