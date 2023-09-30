const { token } = require('../token');
const { uuid, base33 } = require('../uuid');

exports.login = (req, res) => {
    const { user, pass } = req.body;
    const id = uuid(5, base33);

    token.generate({ id:id })
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
        .catch(e => {
            res.status(403).send();
            console.error(e);
        })
}
