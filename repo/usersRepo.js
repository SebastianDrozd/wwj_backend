const pool = require('../utils/databaseConnection');
const ConnectionError = require('../error/connectionError');
const DatabaseError = require('../error/databaseError');
const UserCreatedResponse = require('../response/userCreatedResponse');
const { GET_USER_BY_EMAIL, CREATE_NEW_USER } = require('../utils/queries/userQueries');

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(new ConnectionError());
            }
            else {
                connection.query(GET_USER_BY_EMAIL, email, (err, result) => {
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


const registerNewUser = (user) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(new ConnectionError());
            }
            else {
                connection.query(CREATE_NEW_USER, user, (err, result) => {
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
module.exports = { registerNewUser, getUserByEmail }