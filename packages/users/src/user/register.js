const create = require("./create");

module.exports = function(req, res) {
    const { mail, name, pass } = req.body;
    
    create(mail, pass, name).then(u => {
        console.log("Registered user: ", u)
        res.status(200).send(JSON.stringify({
            uid:u
        }))
    })
    .catch(e => {
        console.error(e)
        res.status(500).send();
    })
}