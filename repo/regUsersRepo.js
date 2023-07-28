const pool = require("../utils/databaseConnection");
const { COMPLETE_PROFILE, SAVE_USER_ADDRESS, CHANGE_ACCOUNT_STATUS_ACTIVE, EDIT_USER_CORE_INFO, EDIT_USER_PHONE_NUMBER, EDIT_USER_ADDRESS } = require("../utils/queries/regUsersQueries");
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

const completeProfile = (complete) => {
     return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                    if (err) {
                      console.log(err)
                      reject()
                    } else {
                      connection.query(COMPLETE_PROFILE ,complete, (err, results) => {
                          if (err) {
                              console.log(err)
                              reject(err)
                          } else {
                              resolve("Profile completed")
                          }
                      })
                    }
            });
     })
}

const saveUserAddress = (address) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err)
        reject(err)
      else{
        connection.query(SAVE_USER_ADDRESS,address,(err,results) => {
          if(err)
            reject(err)
          else
            resolve(results)
        })
      }
    })
  })
}

const changeAccountStatusActive = (userId) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err)
        reject(err)
      else{
        connection.query(CHANGE_ACCOUNT_STATUS_ACTIVE,userId,(err,results) => {
      
          if(err)
            reject(err)
          else
            resolve("Account status changed to active")
        })
      }
    })
  })
}

const editUserCoreInfo = (user) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err)
        reject(err)
      else{
        connection.query(EDIT_USER_CORE_INFO,[user.firstname,user.lastname,user.email,user.userId],(err,results) => {
          if(err)
            reject(err)
          else
            resolve("User core info updated")
        })
      }
    })
  })
}

const editUserPhoneNumber = (phoneNumber,userId) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err)
        reject(err)
      else{
        connection.query(EDIT_USER_PHONE_NUMBER,[phoneNumber,userId],(err,results) => {
          if(err)
            reject(err)
          else
            resolve("User phone number updated")
        })
      }
    })
  })
}

const editUserAddress = (address,userId) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err)
        reject(err)
      else{
        connection.query(EDIT_USER_ADDRESS,[address.street,address.city,address.stateProvince,address.postalCode,address.country,userId],(err,results) => {
          if(err)
            reject(err)
          else
            resolve("User address updated")
        })
      }
    })
  })
}

module.exports = {getUserProfileInfo,completeProfile,saveUserAddress,changeAccountStatusActive,editUserCoreInfo,editUserPhoneNumber,editUserAddress}