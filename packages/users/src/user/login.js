const { token } = require('../token');
const argon2 = require('argon2');
const get = require('./get');

/**
 * Log in user with password:
 *  - Check if user is not registered -> Register
 *  - Check if hash matches password
 *  - Generate new JWT token 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns {Promise<any>}
 */
module.exports = (req, res) => {
    const { user, pass } = req.body;
    let status = {
        code: 200,
        user: null
    }
    
    return get(user, "mail") 
        .then(async (u) => {
            if(u) {
                const hash = u.password; //= '$argon2id$v=19$m=65536,t=3,p=4$' + u.password;

                // User exists -> Check password
                if(await argon2.verify(hash, pass)) {
                    return {
                        id: u.id,
                        name: `${u.firstname} ${u.lastname}`, 
                    }
                }

                status.code = 403;
                throw "Wrong username or password";
            }
            
            status.code = 401;
            throw "User does not exist";
        })
        .then(user => { 
            status.user = user;
            return user.id;
        })
        .then(id => token.generate({ id:id }))
        .then(jwt => {
            res.cookie("token", jwt, {
                secure: true,
                maxAge: 2592000000,
                httpOnly: true,
                sameSite: 'strict',
                signed: true,
                secret: 'secret' // TODO: Secret secrets
            })
            .status(status.code)
            .send({
                status:"success",
                user: status.user
            })
        })
        .catch(e => {
            console.error("[ERROR] Login.js - ", e);
            res.status(403).send({
                status: "failed"
            });
        })
}
