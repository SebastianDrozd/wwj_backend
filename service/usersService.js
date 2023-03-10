const UserAlreadyExistsError = require("../error/userAlreadyExists");
const { getUserByEmail, registerNewUser, getUserByConfirmationCode, updateUserStatus, getUserByUsername } = require("../repo/usersRepo")
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
const UserNotFoundError = require("../error/userNotFoundError");
const AccountNotActiveError = require("../error/accountNotActiveError");
const PasswordMismatchError = require("../error/passwordMisMatchError");
const PasswordDecryptionError = require("../error/passwordDecryptionError");
const LoginResponse = require("../response/loginResponse");
const cookieparser = require('cookie-parser');
const RefreshTokenMissingError = require("../error/refreshTokenMissingError");
const RefreshTokenInvalidError = require("../error/refreshTokenInvalidError");
var fs = require('fs');
const RefreshTokenBlacklistedError = require("../error/refreshTokenBlacklistedError");
const RefreshTokenResponse = require("../error/refreshTokenResponse");
const { createAccessToken } = require("../utils/jwt");


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
                    confirmationcode: encodeRegistrationToken(id),
                    type: user.type

                }
                console.log("this is the new user", newUser)
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
                else {
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

const loginUser = (userDto, response) => {
    return new Promise((resolve, reject) => {
        getUserByEmail(userDto.email).then((result) => {
            if (result.length > 0) {
                let dbUser = result[0];
                if (dbUser.status == "pending") {
                    reject(new AccountNotActiveError())
                }
                else {
                    bcrypt.compare(userDto.password, dbUser.password, (err, result) => {
                        if (err) {
                            reject(new PasswordDecryptionError())
                        }
                        else {
                            if (result) {
                                let audience = ""
                                if(dbUser.type == "user"){
                                    audience = "user"
                                }
                                else{
                                    audience = "business"
                                }

                                const refreshToken = jwt.sign({
                                    username: dbUser.username,
                                }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                                response.cookie('jwt', refreshToken, {
                                    httpOnly: true,
                                    sameSite: 'None', secure: true,
                                    maxAge: 24 * 60 * 60 * 1000
                                });
                                resolve(new LoginResponse(createAccessToken(dbUser), dbUser.username, dbUser.email,dbUser.type));
                            }
                            else {
                                reject(new PasswordMismatchError())
                            }
                        }
                    })
                }
            }
            else {
                reject(new UserNotFoundError())
            }
        })
            .catch((err) => {
                reject(err);
            })

    })

}

const refreshToken = (request, response) => {
    return new Promise((resolve, reject) => {
        console.log("refresh token is called", request.cookies)
        const refreshToken = request.cookies.jwt;

        //when the refresh token is null return the missingerror
        if (refreshToken == null)
            reject(new RefreshTokenMissingError());

        else {
            //if there is a refresh token, verify it
            console.log("refresh token is not null")
            //first lets verify the refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    console.log("refresh token is invalid")
                    reject(new RefreshTokenInvalidError());

                }
                else {
                    //if the refresh token is valid, we need to check if it is in the blacklist
                    fs.readFile('./utils/blackList.txt', function (err, data) {
                        if (err) throw err;
                        if (data.toString().includes(refreshToken)) {
                            console.log("there is a match in the blacklist")
                            //reject it somehow
                            reject(new RefreshTokenBlacklistedError());
                        }
                        else {
                            console.log("this is jwt user", user)
                            getUserByUsername(user.username).then((result) => {
                                let dbUser = result[0];
                                console.log(dbUser)

                                fs.appendFile('./utils/blackList.txt', refreshToken + '\n', function (err) {
                                    if (err) throw err;
                                    console.log('Saved!');
                                });
                                const refreshedToken = jwt.sign({
                                    username: dbUser.username,
                                }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                                response.cookie('jwt', refreshedToken, {
                                    httpOnly: true,
                                    sameSite: 'None', secure: true,
                                    maxAge: 24 * 60 * 60 * 1000
                                });
                                resolve(new RefreshTokenResponse(createAccessToken(dbUser), refreshedToken))
                            })

                        }

                    });


                    //resolve(accessToken);
                }
            })

        }

    })
}

module.exports = { registerUser, confirmConfirmationToken, loginUser, refreshToken }