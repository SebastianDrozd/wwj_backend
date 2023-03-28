const pool = require("../utils/databaseConnection");
const { GET_REG_USER_PROFILE_INFO } = require("../utils/queries/userQueries");


const getUserProfileInfo = (useremail) => {
    return new Promise((resolve, reject) => {
       pool.getConnection((err, connection) => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                connection.query(GET_REG_USER_PROFILE_INFO, [useremail], (err, results) => {
                     if (err) {
                          console.log(err)
                          reject(err)
                     } else {
                          resolve(results)
                     }
                })
              }
       });
    });
}

module.exports = {getUserProfileInfo}