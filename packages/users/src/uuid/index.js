exports.base64 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-1234567890'
exports.base33 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

exports.uuid = (length = 6, base = exports.base64) => {
    let n = "";
    for(i = 0; i < length; i++) n += base[Math.floor(Math.random() * base.length)];
    // console.log(`Generated base${base.length} number: ${n}`)
    return n;
}