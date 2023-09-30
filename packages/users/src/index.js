const express = require('express')
const cookies = require('cookie-parser')
const { token } = require('./token')
const { user } = require('./user')

// ===== Server Config

const server = express()

server.use(express.json())
server.use(cookies())

// ===== Routes

server.post('/v0/users/login', user.login)
server.post('/v0/users/register', user.register)

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})