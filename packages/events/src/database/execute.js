const connect = require("./connect");

/**
 * Returns if a user exists matching the parameters
 * @param {String} query 
 * @param {...any} params 
 */
module.exports = async (query, ...params) => {
	const connection = await connect();

	const [results, fields] = await connection.execute(query, params);

	connection.release();
	return results;
}