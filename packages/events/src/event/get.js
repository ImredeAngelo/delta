const database = require("../database");
const { uuid } = require("../uuid");

/**
 * Get event from ID
 * @param {*} req HTTP request
 * @param {*} res Server response
 */
module.exports = (req, res) => {
	const { id } = req.query;

	database.execute("SELECT * FROM `Events` WHERE eid = ?", id)
	.then((results) => {
		// TODO: Check if user has permission to view this event 
		const event = results[0];

		res.status(200).send({
			status: 'success',
			data: {
				id: id,
				title: event.title,
				color: event.color
			}
		})
	})
	.catch(err => {
		res.status(403).send({
			msg: err
		})
	});
}