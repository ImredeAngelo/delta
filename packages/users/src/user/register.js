module.exports = (req, res) => {
    argon2.hash(pass, {
        raw: false
    })
    .then(hash => {
        // update DB
    })
    .then(() => uuid(5, base33))
    .then(id => token.generate({ user:id }))
}