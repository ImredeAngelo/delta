const crypto = require('crypto')

// TODO: This is only for testing - Exclude keys from version control in production build
exports.privateKey = crypto.createPrivateKey(`
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIJ0Vd1Lk35H/NcKm2i/ULQH7ydR86/3zPyO7Rw1U1AgSoAoGCCqGSM49
AwEHoUQDQgAE5Xr74WkMgZUbvLi+d3AVZJdjvg3jgjcTZqf9I70QmSZIbt7JmEpn
jkjsl8cmaJmJrzhN3CgVB84q8nyj1JfmKw==
-----END EC PRIVATE KEY-----
`)

exports.publicKey = crypto.createPublicKey(`
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5Xr74WkMgZUbvLi+d3AVZJdjvg3j
gjcTZqf9I70QmSZIbt7JmEpnjkjsl8cmaJmJrzhN3CgVB84q8nyj1JfmKw==
-----END PUBLIC KEY-----
`)

exports.algorithm = 'ES256'