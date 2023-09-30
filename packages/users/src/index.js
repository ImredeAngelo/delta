const express = require('express')
const cookies = require('cookie-parser')
const { token } = require('./token')
const { login } = require('./user/login')

// ===== Server Config

const server = express()

server.use(express.json())
server.use(cookies())

// ===== Routes

server.post('/v0/users/login', login)
server.post('/v0/users/register', login)

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})