const jose = require('jose');
const { privateKey, algorithm } = require('./keys');

/**
 * Checks if the token is valid
 * @param {*} token 
 * @returns 
 */
module.exports = (token) => new Promise(async (resolve, reject) => {
    var verified = null;

    try     { verified = await jose.jwtVerify(token, privateKey, { algorithms:[algorithm] }) }
    catch   { reject("Verficiation failed") } 
    finally { resolve(verified) }
})