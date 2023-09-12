const express = require('express')
const app = express()
const port = 3000

app.get('/v0/events/get', (req, res) => {
  	res.send('Hello World!')
})

app.post('/v0/events/make', (req, res) => {
	
});

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})