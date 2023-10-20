const { database } = require("../database");
const { uuid, base33 } = require("../uuid");
const argon2 = require("argon2");
const get = require("./get");

/**
 * Creates a new user with the matching vendor
 * @param {*} vendor 
 * @param {*} match 
 * @returns User ID
 */
module.exports = function(mail, password, name='') {
    const userID = uuid(6, base33);
    
    // TODO: Handle existing e-mail
    return new Promise((res, rej) => {
        get(userID, "id")
            .then(user => {
                if(user) {
                    console.error("Hash collision! TODO: Make new ID");
                    throw "Error";
                }
            })
            .then(() => argon2.hash(password, { raw:false })) // TODO: Store raw in DB
            .then(hash => hash.replace('$argon2id$v=19$m=65536,t=3,p=4$', ''))
            .then(hash => database.execute('INSERT INTO Users (id, mail, firstname, password) VALUES (?, ?, ?, ?)', userID, mail, name, hash))
            .then(() => res(userID))
            .catch(rej)
    })
}