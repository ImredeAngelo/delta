const { getPool } = require(".");

/**
 * Returns a connection from the connection pool
 */
module.exports = async function(transaction = false) {
    return transaction ? transaction : (await getPool().getConnection());
}