const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')

const { event } = require('./event')

const server = express()

// ===== Server Config

require('dotenv').config()

// server.use(express.urlencoded())
server.use(express.json({ limit: '10mb' }))
server.use(cookies())
server.use(cors()) // if(process.env.MODE == "development")

// ===== Routes

server.get('*', (req, res, next) => {
	console.log("Request: ", req.url)
	next();
})

server.get('/v0/events/get', event.get)
server.post('/v0/events/make', event.create);

// Testing:
server.get('/v0/events/test', event.render);

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})