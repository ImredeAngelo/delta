const { token } = require('../token');
const argon2 = require('argon2');
const get = require('./get');
const create = require('./create');

module.exports = (req, res) => {
    const { user, pass } = req.body;
    let status = {
        code: 200,
        uid: ''
    }

    // TODO: Check if token exists -> Refresh token
    // Check if user is not registered -> Register
    // Check if hash matches password
    // Generate new JWT token
    
    // TODO: Separate register page
    return get(user, "mail") 
        .then(async (u) => {
            if(u) {
                // User exists -> Check password
                if(argon2.verify(`$argon2id$v=19$m=65536,t=3,p=4$${u.password}`, pass))
                    return u.id;
                
                throw "Wrong username or password";
            }
            
            // Make new user TODO: Do not auto register
            status.code = 201;
            return create(user, pass);
        })
        .then(id => status.uid = id)
        .then(() => token.generate({ user:status.uid }))
        .then(jwt => {
            res.cookie("user", jwt, {
                secure: true,
                maxAge: 2592000000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .status(status.code)
            .send({
                status:"success",
                user: {
                    id:status.uid,
                    name:"Default User"
                }
            })
        })
        // .then(() => {
        //     console.log(`User ${id} (${user}) logged in: ${data.hash}`)
        // })
        .catch(e => {
            res.status(403).send();
            // console.error(e);
        })
}
