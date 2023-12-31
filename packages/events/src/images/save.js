const webp = require('webp-converter');
const fs = require('fs/promises');
const jimp = require('jimp');

/**
 * Save an image from Base64 and create a PNG and a WebP copy of the image
 * @param {String} file Base64 encoding of the image
 * @param {String} name Name of the image (not including extension)
 * @param {String} path Path to directory where image should be saved 
 * @returns 
 */
module.exports = (file, name, path = "/srv/images") => {
	const regex = /^data:image\/([^;]+);base64,/
	const extension = file.match(regex)[1];
	const base64Data = file.replace(regex, '');
	const buffer = Buffer.from(base64Data, 'base64');

	const ext = (extension == "jpeg") ? "jpg" : extension;
	const filename = name + "." + ext;
	const fullPath = path + "/" + filename;
	const noExtPath = path + "/" + name; 
	
	// .png has been chosen arbitrarily and might not be the right choice -> TODO: support any image type 
	return fs.writeFile(fullPath, buffer)
		.then(() => console.log(`Saved image ${filename} to ${path}`))
		.then(() => jimp.read(fullPath))
		.then(img => (ext != "png") ? img.write(noExtPath + ".png") : 0)
		.then(() => console.log("Converted image to .png"))
		.then(() => webp.cwebp(noExtPath + ".png", noExtPath + ".png.webp", "-q 80")) //, logging="-v"
		.then(() => console.log(`Converted image ${name}.${ext} to WebP format: ${name}.png.webp`))
		.catch(console.error);
}