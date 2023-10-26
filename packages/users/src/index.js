const express = require('express')
const limiter = require('express-rate-limit')
const cookies = require('cookie-parser')
const cors = require('cors')

const { token } = require('./token')
const { user } = require('./user')

// ===== Server Config

const server = express()

// WARN: This might be unsafe/configured incorrectly
server.set('trust proxy', '127.0.0.1')

server.use(express.json())
server.use(cookies()) // TODO: Secret/signed cookies
server.use(cors({ origin:true, credentials:true })) 
server.use(limiter({ // TODO: Rate limit in Nginx
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 16, // max 16 requests per windowMs (TODO: infinite in dev mode)
}))

// ===== Routes

// TODO: rename refresh -> me?
server.get('/v0/users/refresh', token.refresh)

server.post('/v0/users/login', user.login)
server.post('/v0/users/register', user.register)
// server.delete('/v0/users/terminate', user.remove)

// ===== Internal Routes

// This could be cleaner as a GET
server.post('/verify', (req, res) => {
	token.verify(req.body.token)
		// .then(user => { console.log(user); return user; })
		.then(user => res.status(200).send(JSON.stringify(user.payload)))
		.catch(console.error)
})

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})