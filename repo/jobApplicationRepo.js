const pool = require("../utils/databaseConnection")
const { CREATE_NEW_JOB_APPLICATION } = require("../utils/queries/jobApplicationQueries")

const createNewJobApplication =  (jobApplication) => {

    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                connection.query(CREATE_NEW_JOB_APPLICATION,jobApplication,(err,result) => {
                    if(err){
                        console.log(err)
                        reject(err)
                    }
                    else{
                        console.log("new job application saved")
                        resolve(result)
                    }
                })
            }
        })
    })
}

module.exports = {createNewJobApplication}