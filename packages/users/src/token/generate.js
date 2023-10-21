const jwt = require('jose')
const { privateKey, algorithm } = require('./keys')

/**
 * Generate JWT session token for user
 * @param {*} user 
 * @returns 
 */
module.exports = (user) => new Promise(async (resolve, reject) => {
    console.log("Generating JWT...")
    const token = await new jwt.SignJWT({
        id: user.id
    })
    .setProtectedHeader({ alg: algorithm })
    .setExpirationTime('24h')
    .sign(privateKey)
    .catch(reject)

    console.log("Gernerated token")

    resolve(token)
})