const { database } = require("../database")

/**
 * Checks if a user exists and returns their row
 * @param {*} match 
 * @param {*} field 
 * @returns User
 */
module.exports = function(match, field = "mail") {
    return database.execute(`SELECT * FROM Users WHERE ${field} = ?`, match)
        .then(r => (r[0] != []) ? r[0][0] : null)
}