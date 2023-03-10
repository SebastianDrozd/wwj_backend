const UserAlreadyExistsError = require("../error/userAlreadyExists");
const { getUserByEmail, registerNewUser } = require("../repo/usersRepo")
const uuid = require('uuid')
const bcrypt = require("bcrypt");
const { hashPassword } = require("../utils/passwordHasher");
const { makeToken } = require("../utils/tokenMaker");
const { sendConfirmationEmail } = require("../utils/emailUtil");
const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        getUserByEmail(user.email).then((result) => {
            if (result.length > 0) {
                reject(new UserAlreadyExistsError());
            }
            else {
                hashPassword(user.password).then((hash) => {
                    let token = makeToken();
                    const newUser = {
                        id: uuid.v4(),
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email,
                        password: hash,
                        confirmationcode : token
    
                    }
                    
                    registerNewUser(newUser).then((result) => {
                        //send the email to the client
                        sendConfirmationEmail(newUser.firstname,newUser.email, newUser.confirmationcode)
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    })
                })
                .catch((err) => {
                    reject(err);
                })
                
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports = { registerUser }