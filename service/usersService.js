const UserAlreadyExistsError = require("../error/userAlreadyExists");
const { getUserByEmail, registerNewUser, getUserByConfirmationCode, updateUserStatus } = require("../repo/usersRepo")
const uuid = require('uuid')
const bcrypt = require("bcrypt");
const { hashPassword } = require("../utils/passwordHasher");
const { makeToken } = require("../utils/tokenMaker");
const { sendConfirmationEmail } = require("../utils/emailUtil");
const EmailErorr = require("../error/emailError");
const PasswordHashError = require("../error/passwordHashError");
const InvalidConfirmationTokenError = require("../error/invalidConfirmationTokenError");
const { encodeRegistrationToken, decodeRegistrationToken } = require("../utils/tokenEncoder");
const jwt = require('jsonwebtoken');
const CodeConfirmedResponse = require("../response/codeConfirmedResponse");
const ConfirmationCodeExpiredError = require("../error/confirmationCodeExpiredError");
const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        getUserByEmail(user.email).then((result) => {
            if (result.length > 0) {
                reject(new UserAlreadyExistsError());
            }
            else {
                let id = uuid.v4();
                const newUser = {
                    id: id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: bcrypt.hashSync(user.password, 10),
                    confirmationcode: encodeRegistrationToken(id)

                }
                console.log("this is the new user" , newUser)
                sendConfirmationEmail(newUser.firstname, newUser.email, newUser.confirmationcode)
                    .then((result) => {
                        registerNewUser(newUser).then((result) => {
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        })
                    })
                    .catch((err) => {
                        reject(new EmailErorr(err));
                    })

            }
        }).catch((err) => {
            reject(err);
        })
    })
}

const confirmConfirmationToken = (token) => {
    return new Promise((resolve, reject) => {
        getUserByConfirmationCode(token).then((result) => {
            if (result.length > 0) {
                let decoded = jwt.verify(token, "yoursecretkey");
                let dateNow = new Date();
                let tokenTime = decoded.expDate;
                if (dateNow.getTime() > new Date(tokenTime).getTime()) {
                    console.log("date now is greater than token time")
                    reject(new ConfirmationCodeExpiredError());
                }
                else{
                    console.log("date is less")
                    let user = result[0];
                    let id = user.id;
                    updateUserStatus(id).then((result) => {
                        console.log("updated user status")
                        resolve(new CodeConfirmedResponse());
                    }).catch((err) => {
                        reject(err);
                    })
                }  
            }
            else {
                reject(new InvalidConfirmationTokenError());
            }
        }).catch((err) => {
            reject(err);
        })



    })
}

module.exports = { registerUser, confirmConfirmationToken }