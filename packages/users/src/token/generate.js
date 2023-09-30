const jwt = require('jose')
const { privateKey, algorithm } = require('./keys')

/**
 * Generate token for user
 * @param {*} user 
 * @returns 
 */
module.exports = (user) => new Promise(async (resolve, reject) => {
    const token = await new jwt.SignJWT({
        id: user.id
    })
    .setProtectedHeader({ alg: algorithm })
    .setExpirationTime('24h')
    .sign(privateKey)

    if(token) resolve(token)
    else reject("Failed to make token")
})