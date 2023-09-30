import React from 'react'
import { Text } from 'slate'
import typography from '~style/typography.css'

const serialize = (node, count = 0) => {
	if (Text.isText(node)) {
		// let string = escapeHtml(node.text)
		let string = node.text;
		// TODO: Make bold/italic etc. classes
		if (string == "") return <br/>
		if (node.bold) return <span className={typography.bold}>{string}</span>

		return string;
	}
  
	const children = node.children.map(n => serialize(n, count++))
  
	switch (node.type) {
		case 'quote': 		return <blockquote key={count}><p>{children}</p></blockquote>
		case 'paragraph':	return <p key={count}>{children}</p>
		case 'link':		return <a key={count} href={node.url}>{children}</a> //escapeHtml(node.url)
		case 'h3':			return <h3 key={count}>{children}</h3> //escapeHtml(node.url)
		default:			return children
	}
}

/**
 * Display contents of textbox
 */
export default function Display(props) {
	const { text } = props;
	// const html = serialize({ children: text });

	// TODO: Skeleton text while loading
	return text ? serialize({ children: text }) : (
		<div>
			Info kommer!
		</div>
	)
}
