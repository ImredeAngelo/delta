import { Editor } from "slate";

export default function keybinds(event, editor) {
	if(!event.ctrlKey) return;

	switch(event.key) {
		case "b": Editor.addMark(editor, 'bold', true); break;
		default: return;
	}

	event.preventDefault();
} 
