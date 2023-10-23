const webp = require('webp-converter');
const fs = require('fs/promises');

module.exports = (file, name, path = "/srv/images") => {
	const regex = /^data:image\/([^;]+);base64,/
	const extension = file.match(regex)[1];
	const base64Data = file.replace(regex, '');
	const buffer = Buffer.from(base64Data, 'base64');

	const ext = (extension == "jpeg") ? "jpg" : extension;
	const filename = name + "." + ext;
	const fullPath = path + "/" + filename;
	
	return fs.writeFile(fullPath, buffer)
		.then(() => console.log(`Saved image ${filename} to ${path}`))
		.then(() => webp.cwebp(fullPath, fullPath + ".webp", "-q 80", logging="-v"))
		.then(() => console.log(`Converted image ${name}.${extension} to WebP format: ${name}.${ext}.webp`))
		.catch(console.error);
}