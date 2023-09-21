const { uuid } = require("../uuid");

module.exports = (req, res, next) => {
	const { title, description } = req.body;

	const id = uuid();
	
	res.status(200).send({
		id: id,
		data: {
			msg: 'ok'
		}
	})

	console.log(`Created event '${title}' with id: ${id}`)
}