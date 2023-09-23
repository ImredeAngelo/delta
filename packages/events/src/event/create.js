const database = require("../database");
const { uuid } = require("../uuid");

/**
 * Make a new event
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
	const { title, description } = req.body;
	const id = uuid();
	
	database.execute("INSERT INTO `Events` (eid, title, description, type) VALUES (?,?,?,?)", id, title, description, 0)
	.then(() => {
		res.status(200).send({
			id: id,
			data: {
				title: title,
				description: description,
				type: 0,
				color: 0xA73121
			},
			body: req.body
		})
	
		console.log(`Created event '${title}' with id: ${id}`)
	})
	.catch(err => {
		console.error(err)
		res.status(403).send({
			msg: 'Failed to create event!'
		})
	});
}