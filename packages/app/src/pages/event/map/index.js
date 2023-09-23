import React from 'react'
import s from './map.css'

export default function Map(props) {
	// const map = new Mazemap.Map({ 
	// 	container: 'mazemap-container',
	// 	center: {lng: 13.270286316716465, lat: 52.502217640505705},
	// 	zoom: 18,

	// 	campuses: 121,
	// 	zLevel: 3
	// });

	return (
		<div id='mazemap-container' className={s.map}>
			<iframe src="http://use.mazemap.com/embed.html?center=10.404761,63.415742&zoom=16&zlevel=1&campusid=1?newtablink=outside"
			width="100%" height="118%" frameBorder="0" marginHeight="0" marginWidth="0"
			scrolling="no"></iframe>
		</div>
	)
}
