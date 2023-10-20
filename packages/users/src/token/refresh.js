module.exports = function(req, res) {
	const jwt = req.cookies.token;

	if(jwt) {
		token.verify(jwt)
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
				// next();
				res.status(401).send({ status:"failed" })
			})

		return;
	}

	res.status(200).send({ status:"failed", reason:"No credentials" })
}