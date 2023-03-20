const passwordCompare = (password, dbPassword) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(userDto.password, dbUser.password, (err, result) => {
            if (err) {
                reject(new PasswordDecryptionError())
            }
            else if(result){
                resolve(result)
            }
        })
    })
}

module.exports = {passwordCompare}