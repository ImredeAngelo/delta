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
	
	database.execute("INSERT INTO `Events` (eid, title, color) VALUES (?,?,?)", id, "Test Event #" + id, 0xA73121)
	.then(() => {
		res.status(200).send({
			id: id,
			data: {
				title: 'Test Event',
				color: 0xA73121,
				description: description
			},
			body: req.body
		})
	
		console.log(`Created event '${title}' with id: ${id}`)
	})
	.catch(err => {
		res.status(403).send({
			msg: 'Failed to create event!'
		})
	});
}