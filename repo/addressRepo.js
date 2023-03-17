const ConnectionError = require("../error/connectionError")
const DatabaseError = require("../error/databaseError")
const pool = require("../utils/databaseConnection")
const { CREATE_NEW_ADDRESS } = require("../utils/queries/addressQueries")

const createNewAddress = (address) => {
    console.log("this is address repo in createNewAddress: ",address)
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
            
                reject(new ConnectionError())
            }
            else{

                connection.query(CREATE_NEW_ADDRESS,address,(err,result) => {
                    if(err){
                        console.log(err)
                        reject(new DatabaseError(err.code))
                    }
                    else{
                        console.log("new address saved")
                        resolve(result)
                    }
                })
            }
        })
    })
}
module.exports = {createNewAddress}