import React, { useEffect, useRef, useState } from 'react'
import s from '../editor.css'
import { combine } from '~style';
import useTextEditor from '../useTextEditor';

function onDrop(e) {
	e.preventDefault();
	var file = null;

	if(e.dataTransfer.items) {
		console.log("A");
		[...e.dataTransfer.items].forEach((item, i) => {
			// If dropped items aren't files, reject them
			if (item.kind === "file") {
				file = item.getAsFile();
			}
		});
	} else {
		// Use DataTransfer interface to access the file(s)
		console.log("B");
		[...e.dataTransfer.files].forEach((item, i) => {
		  	file = item;
		});
	}

	return file;
}

export default function Image(props) {
	const [ file, setFile ] = useState(null);
	const editor = useTextEditor();
	const refFile = useRef();

	const style = file ? { backgroundImage:`url(${URL.createObjectURL(file)})` } : {}
	const showFileDialog = () => { refFile.current.click() }

	useEffect(() => {
		if(file == null) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = async () => {
			editor.set('header', reader.result);
		}
	}, [file])

	return (
		<div>
			<div className={combine(s.field, s.drop)}
				onDrop={e => setFile(onDrop(e))} 
				onDragOver={e => e.preventDefault()}
				onClick={showFileDialog}
			>
				<div className={s.src} style={style}/>
				<input type="file" accept="image/*"  
					hidden ref={refFile}
					className={s.file} 
					name="file" 
					onChange={e => {
						setFile(e.target.files[0]);
						e.preventDefault();
					}}
				/>
			</div>
			<div className={s.row}>
				<div className={combine(s.field, s.btn)} onClick={showFileDialog}>
					Velg fil
				</div>
				<span>{file ? file.name : props.text}</span>
			</div>
		</div>
	)
}
