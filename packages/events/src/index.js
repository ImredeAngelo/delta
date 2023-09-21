const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')
const { event } = require('./event')

const server = express()

server.use(express.urlencoded())
server.use(express.json())
server.use(cookies())

// if(process.env.MODE == "development")
	server.use(cors())

server.get('/v0/events/get', (req, res) => {
  	res.send('Hello World!')
})

server.post('/v0/events/make', event.create);

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})