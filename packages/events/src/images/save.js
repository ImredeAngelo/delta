const webp = require('webp-converter');
const fs = require('fs/promises');

module.exports = (file, name, path = "/srv/images") => {
	const regex = /^data:image\/([^;]+);base64,/
	const extension = file.match(regex)[1];
	const base64Data = file.replace(regex, '');
	const buffer = Buffer.from(base64Data, 'base64');
	
	// This could be non-png type!
	return fs.writeFile(`${path}/${name}.${extension}`, buffer)
		.then(() => console.log(`Saved image ${name}.${extension} to ${path}`))
		// .then(() => webp.buffer2webpbuffer(buffer,"jpg","-q 80"))
		// .then(() => webp.str2webpstr(buffer,"jpg","-q 80"))
		.then(() => (webp.cwebp(`${path}/${name}.${extension}`,`${path}/${name}.${extension}.webp`,"-q 80",logging="-v")))
		.then(() => console.log(`Converted image ${name}.${extension} to WebP format: ${name}.${extension}.webp	`))
		.catch(console.error);
}