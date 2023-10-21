const webp = require('webp-converter');
const fs = require('fs/promises');

module.exports = (file, name, path = "/srv/images") => {
	const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(base64Data, 'base64');
	
	return fs.writeFile(`${path}/${name}.png`, buffer)
		.then(() => console.log(`Saved image ${name}.png to ${path}`))
		// .then(() => webp.buffer2webpbuffer(buffer,"jpg","-q 80"))
		// .then(() => webp.str2webpstr(buffer,"jpg","-q 80"))
		.then(() => (webp.cwebp(`${path}/${name}.png`,`${path}/${name}.png.webp`,"-q 80",logging="-v")))
		.then(() => console.log(`Converted image ${name}.png to WebP format: ${name}.png.webp	`))
		.catch(console.error);
}