const verify = require("./verify.js");

module.exports = function(req, res) {
	const jwt = req.cookies.token;

	if(!jwt) {
		res.status(200).send({ status:"failed", reason:"No credentials" })
		return;
	}

	verify(jwt)
		.then(r => {
			const { id } = r.payload;

			res.status(200)
			.send({
				status:"success",
				user:{
					id:id
				}
			})
		})
		.catch(e => {
			res.status(401).send({ status:"failed" })
			// next();
		})
}