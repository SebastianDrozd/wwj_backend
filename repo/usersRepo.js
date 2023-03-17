const pool = require('../utils/databaseConnection');
const ConnectionError = require('../error/connectionError');
const DatabaseError = require('../error/databaseError');
const UserCreatedResponse = require('../response/userCreatedResponse');
const { GET_USER_BY_EMAIL, CREATE_NEW_USER, GET_USER_BY_CONFIRMATION_CODE, UPDATE_USER_STATUS, DELETE_USER_CONFIRMATION_CODE, GET_ALL_USERS, GET_USER_BY_USERNAME, SET_FRESH_TOKEN, GET_USER_REFRESH_TOKEN, DELETE_REFRESH_TOKEN, GET_USER_BY_ID, SET_ACCOUNT_SETUP_TO_TRUE } = require('../utils/queries/userQueries');
const CodeConfirmedResponse = require('../response/codeConfirmedResponse');

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
             reject(new ConnectionError());
             return;
            }
            else {
                connection.query(GET_USER_BY_EMAIL, email, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(new DatabaseError(err.code));
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    })
}

const getUserByUsername = (username) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                connection.query(GET_USER_BY_USERNAME,username,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}
const getUserById = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                
                connection.query(GET_USER_BY_ID,id,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}

const getUserRefreshToken = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                connection.query(GET_USER_REFRESH_TOKEN,id,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}



const registerNewUser = (user) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(new ConnectionError());
            }
            else {
                connection.query(CREATE_NEW_USER, user, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(new DatabaseError(err.code));
                    } else {
                        resolve(new UserCreatedResponse(user));
                    }
                });
            }

        });
    });
}

const saveRefreshToken = (token,id) => {
    return new Promise((resolve,reject) => {
        const tokenObject = {
            userid: id,
            refreshToken: token
        }
        console.log("this is the token object: ",tokenObject)
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                
                connection.query(SET_FRESH_TOKEN,tokenObject,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}

const getUserByConfirmationCode = (code) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                connection.query(GET_USER_BY_CONFIRMATION_CODE,code,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}

const updateUserStatus = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                connection.query(UPDATE_USER_STATUS,id,(err,result) => {
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        connection.query(DELETE_USER_CONFIRMATION_CODE,id,(err,result) => {
                            connection.release();
                            if(err){
                                reject(new DatabaseError(err.code));
                            }
                            else{
                                resolve(new CodeConfirmedResponse());
                            }
                        })
                    }
                })
            }
        })
    })
}

const deleteRefreshToken = (id) => {
    return new Promise((resolve,reject) => {
        console.log("this is id in repo")
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError());
            }
            else{
                connection.query(DELETE_REFRESH_TOKEN,id,(err,result) => {
                    connection.release();
                    if(err){
                        reject(new DatabaseError(err.code));
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    })
}

const updateAccountSetup = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
                if(err){
                    reject(new ConnectionError());
                }
                else{
                    connection.query(SET_ACCOUNT_SETUP_TO_TRUE,id,(err,result) => {
                        connection.release();
                        if(err){
                            console.log(err)

                            reject(new DatabaseError(err.code));
                        }
                        else{
                            console.log("updated user account setup")
                            resolve(result);
                        }
                    } )
                }
        })
    })
}


module.exports = {getUserById,saveRefreshToken, registerNewUser, getUserByEmail,getUserByConfirmationCode,getUserByUsername,updateUserStatus,getUserRefreshToken,deleteRefreshToken,updateAccountSetup }