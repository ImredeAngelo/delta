const webp = require('webp-converter');
const fs = require('fs');

module.exports = (file, name, path = "./images") => {
	console.log(`Saving image ${name}.png to ${path}`)

	const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(base64Data, 'base64');

	fs.writeFile(`${path}/${name}.png`, buffer, (err) => {
		if (err) {
			console.error(err);
			return;
		}

		console.log("Converting to webp")
		webp.cwebp(`${path}/${name}.png`,`${path}/${name}.png.webp`,"-q 80",logging="-v");
		console.log("Saved image!");
	});
}