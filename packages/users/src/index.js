const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')

const { token } = require('./token')
const { user } = require('./user')
const { privateKey } = require('./token/keys')

// ===== Server Config

const server = express()

server.use(express.json())
server.use(cookies(privateKey))
server.use(cors({ origin:true, credentials:true })) 

// ===== Routes

// me
server.get('/v0/users/refresh', token.refresh)

server.post('/v0/users/login', user.login)
server.post('/v0/users/register', user.register)
// server.delete('/v0/users/terminate', user.remove)

// ===== Entrypoint

server.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`)
})