const database = require("../database")

/**
 * Counts the number of users registered for an event (including waitlist)
 * TODO: Separate into all/registered/paid/unpaid/waitlist etc.
 * @param {*} event The ID of the event
 */
module.exports = (event) => {
    return database.execute("SELECT COUNT(DISTINCT userID) AS count FROM `Tickets` WHERE eventID = ?", event).then(r => r[0][0].count)
}