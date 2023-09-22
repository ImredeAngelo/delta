const database = require("../database");

function getByID(id, req, res) {
	return database.execute("SELECT * FROM `Events` WHERE eid = ?", id)
	.then((results) => {
		// TODO: Check if user has permission to view this event 
		const event = results[0][0];

		res.status(200).send({
			status: 'success',
			event: {
				id: id,
				title: event.title,
				color: event.color
			}
		})
	})
}

function getAll(req, res) {
	return database.execute("SELECT * FROM `Events`")
	.then((results) => {
		// TODO: Only show events user is permitted to view 
		const events = results[0];
		const data = events.map((v) => {
			return {
				id: v.eid,
				title: v.title,
				color: v.color
			}
		})

		res.status(200).send({
			status: 'success',
			events: data
		})
	})
}

/**
 * Get event from ID
 * @param {*} req HTTP request
 * @param {*} res Server response
 */
module.exports = (req, res) => {
	const { id } = req.query;
	const r = (id) ? getByID(id, req, res) : getAll(req, res);
	r.catch(err => {
		console.error(err)
		res.status(403).send({
			msg: err.toString()
		})
	});
}