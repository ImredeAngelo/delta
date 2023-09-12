const express = require('express')
const app = express()
const port = 3000

app.get('/v0/events/get', (req, res) => {
  	res.send('Hello World!')
})

app.post('/v0/events/make', (req, res) => {
	console.log("Posted!")
	res.status(200).send({
		msg: 'ok'
	})
});

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})