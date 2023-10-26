const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')

const { event } = require('./event')
const { bridge } = require('./bridge')

const server = express()

// ===== Server Config

require('dotenv').config()

// server.use(express.urlencoded())
server.use(express.json({ limit: '10mb' }))
server.use(cookies())
server.use(cors()) // if(process.env.MODE == "development")

// ===== Routes

server.get('*', (req, res, next) => {
	const token = req.cookies.token;

	if(!token) {
		req.authLevel = 0;
		next();
		return;
	}
	
	console.log(token);
	bridge.getUser(req.cookies.token)
		.then(u => u.json())
		.then(u => {
			req.authLevel = 1;
			req.user = u.id
		})
		.then(() => next())
		.catch(console.error)
})

server.get('/v0/events/get', event.get);
server.post('/v0/events/make', event.create);

// ===== Testing:
// server.get('/v0/events/test', event.render);
server.all('/v0/events/test', (req, res) => {
	console.log("Token: ", req.cookies.token);
	bridge.getUser(req.cookies.token)
		.then(u => u.json())
		.then(u => { console.log(u); return u; })
		.then(u => res.status(200).send(u))
		.catch(console.error)
})

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})