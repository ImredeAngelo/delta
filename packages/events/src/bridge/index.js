function post(endpoint, data = {}) {
    return fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
}

function get(endpoint) {
    // return
}

exports.bridge = {
	post: post,
    getUser: (token) => post('http://users:4000/verify', {
        token: token
    })
}