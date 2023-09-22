const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')

const { event } = require('./event')

const server = express()

// ===== Server Config

server.use(express.urlencoded())
server.use(express.json())
server.use(cookies())
server.use(cors()) // if(process.env.MODE == "development")

// ===== Routes

server.get('/v0/events/get', event.get)
server.post('/v0/events/make', event.create);

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})