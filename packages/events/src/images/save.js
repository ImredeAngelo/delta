const webp = require('webp-converter');
const fs = require('fs/promises');

module.exports = (file, name, path = "./images") => {
	const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(base64Data, 'base64');
	
	fs.writeFile(`${path}/${name}.png`, buffer)
		.then(() => (webp.cwebp(`${path}/${name}.png`,`${path}/${name}.png.webp`,"-q 80",logging="-v")))
		.then(() => console.log(`Saved image ${name}.png to ${path}`))
		.catch(console.error);
}