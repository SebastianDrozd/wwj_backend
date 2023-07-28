
const pool = require('../utils/databaseConnection');
const { SAVE_NEW_USER_NOTIFICATION, GET_USER_NOTIFICATIONS } = require('../utils/queries/userNotificationQueries');

const saveUserNotification =  (userNotification) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return reject(new ConnectionError());
        }
        else{
            connection.query(SAVE_NEW_USER_NOTIFICATION, userNotification, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }
    }  );
  })
};
const getUserNotifications = (userId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(new ConnectionError());
            }
            else{
                connection.query(GET_USER_NOTIFICATIONS, userId, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        }  );
    });
};
module.exports = {saveUserNotification,getUserNotifications};