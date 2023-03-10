const bcrypt = require("bcrypt")
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
        })


    })
}

module.exports = { hashPassword }