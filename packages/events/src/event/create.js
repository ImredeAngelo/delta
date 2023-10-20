const database = require("../database");
const { images } = require("../images");
const { uuid } = require("../uuid");

/**
 * Make a new event
 */
module.exports = (req, res, next) => {
	const { title, description, header } = req.body;
	const id = uuid();
	
	database.execute("INSERT INTO `Events` (id, title, description, type) VALUES (?,?,?,?)", id, title, description, 0)
	.then(() => {
		res.status(200).send({
			id: id,
			data: {
				title: title,
				description: description,
				type: 0,
				color: 0xA73121
			},
		})
	
		console.log(`Created event '${title}' with id: ${id}`)
		images.save(header, id); 
	})
	.catch(err => {
		console.error(err)
		res.status(403).send({
			msg: 'Failed to create event!'
		})
	});
}