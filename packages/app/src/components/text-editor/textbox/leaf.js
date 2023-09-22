import React from 'react'

export default function Leaf(props) {
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