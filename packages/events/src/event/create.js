const database = require("../database");
const { uuid } = require("../uuid");

module.exports = (req, res, next) => {
	const { title, description } = req.body;
	const id = uuid();
	
	database.execute("");

	res.status(200).send({
		id: id,
		data: {
			msg: 'ok'
		}
	})

	console.log(`Created event '${title}' with id: ${id}`)
}