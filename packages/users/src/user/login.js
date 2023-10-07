const { token } = require('../token');
const { uuid, base33 } = require('../uuid');
const argon2 = require('argon2');
const exists = require('./exists');
const register = require('./register');
const database = require('../database');

function get(username, ...fields) {
    database.execute("SELECT * FROM Users WHERE ");
}

module.exports = (req, res) => {
    const { user, pass } = req.body;

    // Check if token exists -> Refresh token
    // Check if user is not registered -> Register
    // Check if hash matches password -> Reject
    // Generate new JWT token
    
    
    get(user, "cred") // TODO: Separate register page
        .then(u => argon2.verify(u.password, pass), () => register(req, res))
        .then(id => token.generate({ user:id }))
        .then(jwt => {
            res.cookie("user", jwt, {
                secure: true,
                maxAge: 2592000000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .status(200)
            .send({
                status:"success",
                user: {
                    id:id,
                    name:"Default User"
                }
            })
        })
        .then(() => {
            console.log(`User ${id} (${user}) logged in: ${data.hash}`)
        })
        .catch(e => {
            res.status(403).send();
            console.error(e);
        })
}
