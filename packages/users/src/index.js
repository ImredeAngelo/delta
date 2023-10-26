const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')

const { token } = require('./token')
const { user } = require('./user')

// ===== Server Config

const server = express()

server.use(express.json())
server.use(cookies()) // TODO: Secret keys
server.use(cors({ origin:true, credentials:true })) 

// ===== Routes

// TODO: rename refresh -> me?
server.get('/v0/users/refresh', token.refresh)

server.post('/v0/users/login', user.login)
server.post('/v0/users/register', user.register)
// server.delete('/v0/users/terminate', user.remove)

// ===== Internal Routes

// This could be cleaner as a GET
server.post('/verify', (req, res) => {
	console.log("Getting user from token: ", req.body.token)
	token.verify(req.body.token)
		// .then(user => { console.log(user); return user; })
		.then(user => res.status(200).send(JSON.stringify(user.payload)))
		.catch(console.error)
})

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})