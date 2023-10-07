const { database } = require("../database")

/**
 * Checks if a user exists and returns their row
 * @param {*} match 
 * @param {*} field 
 * @returns User
 */
module.exports = function(id) {
    return database.execute(`DELETE FROM Users WHERE id = ?`, id)
        .then(r => (r[0] != []) ? true : false)
}