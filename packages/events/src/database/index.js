const mysql = require('mysql2/promise');

const connection = {
    host: process.env.DATABASE_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'db',
    port: '3306',
}

var pool = null;

async function init() {
    pool = await mysql.createPool({
        ...connection,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
}

init()

module.exports = {
	getPool: () => pool,
	execute: require('./execute')
}
