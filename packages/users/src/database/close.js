const { getPool } = require('.')

/**
 * Close the connection
 */
exports.close = async function() {
    getPool().end();
}