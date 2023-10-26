const database = require("../database");

/**
 * Let users register for an event, given that the event requires registration.
 * The registered users are maintained in a list ordered by registration time, 
 * where the bottom users are effectively on the waitlist  
 * @see Other.js 
 * @param {*} req Express request object 
 * @param {*} res Express response object
 */
module.exports = (req, res) => {
    const event = req.query.id;
    const user = req.user;

    // TODO: Check if user has permission to view/join this event
    // TODO: Error handling
    // TODO: Transactions

    return database.execute("INSERT INTO `Tickets` (userID, eventID) VALUES (?,?)", user, event)
        .then(_ => database.execute("SELECT COUNT(DISTINCT userID) AS count FROM `Tickets` WHERE eventID = ?", event))
        .then(r => {
            const { count } = r[0][0];
            return count;
        })
        // .then(() => { database.commit() })
        .then(count => {
            res.status(200).send({
                status: 'success',
                count: count 
            })
        })
        .catch(e => {
            // database.rollback();
            console.error(e);
        })
}