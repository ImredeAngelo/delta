const connect = require("./connect");

/**
 * Returns if a user exists matching the parameters
 * @param {String} query 
 * @param {...any} params 
 */
module.exports = (query, ...params) => new Promise(async (res, rej) => {
	const connection = await connect();

	connection.execute(query, params)
		.then((results, fields) => {
			connection.release();
			res(results);
		})
		.catch(rej);
})