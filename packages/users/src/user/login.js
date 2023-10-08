const { token } = require('../token');
const argon2 = require('argon2');
const get = require('./get');
const create = require('./create');

module.exports = (req, res) => {
    const { user, pass } = req.body;
    let status = {
        code: 200,
        user: null
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
                if(argon2.verify(`$argon2id$v=19$m=65536,t=3,p=4$${u.password}`, pass)) {
                    return {
                        id: u.id,
                        name: `${u.firstname} ${u.lastname}`, 
                    }
                }
                
                throw "Wrong username or password";
            }
            
            // Make new user 
            // TODO: Do not auto register
            // status.code = 201;
            // return create(user, pass);
            throw "User does not exist";
        })
        .then(user => status.user = user)
        .then(() => token.generate(status.user))
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
                user: status.user
            })
        })
        .catch(e => {
            res.status(403).send();
            // console.error(e);
        })
}
