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

    console.log("Attempting login:", user)
    
    // TODO: Separate register page
    return get(user, "mail") 
        .then(async (u) => {
            if(u) {
                const hash = u.password; //= '$argon2id$v=19$m=65536,t=3,p=4$' + u.password;

                // User exists -> Check password
                if(await argon2.verify(hash, pass)) {
                    console.log("Correct password")
                    return {
                        id: u.id,
                        name: `${u.firstname} ${u.lastname}`, 
                    }
                }
                
                console.log("Wrong password")

                status.code = 403;
                throw "Wrong username or password";
            }
            
            status.code = 401;
            throw "User does not exist";
        })
        .then(user => { 
            console.log("Set user: ", user);
            status.user = user;
            return user.id;
        })
        .then(id => token.generate({ id:id }))
        .then(jwt => {
            console.log("Token: ", jwt);
            console.log("Status: ", status);

            res.cookie("token", jwt, {
                secure: true,
                maxAge: 2592000000,
                httpOnly: true,
                sameSite: 'strict',
                signed: true,
            })
            .status(status.code)
            .send({
                status:"success",
                user: status.user
            })

            console.log("Login success!")
        })
        .catch(e => {
            console.error("Login failed!", e);
            res.status(403).send({
                msg: e
            });
        })
}
