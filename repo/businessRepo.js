const ConnectionError = require("../error/connectionError")
const DatabaseError = require("../error/databaseError")
const BusinessCreatedResponse = require("../response/businessCreatedResponse")
const pool = require("../utils/databaseConnection")
const { CREATE_NEW_BUSINESS } = require("../utils/queries/businessQueries")

const saveNewBusiness = (business) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(new ConnectionError())
            }
            else{
                connection.query(CREATE_NEW_BUSINESS,business,(err,result) => {
                    if(err){
                        console.log(err)
                        reject(new DatabaseError(err.code))
                    }
                    else{
                        console.log("new business saved")
                        resolve(new BusinessCreatedResponse(business))
                    }
                })
            }
        })
    })
}
module.exports = {saveNewBusiness}