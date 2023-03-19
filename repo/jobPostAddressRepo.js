const ConnectionError = require('../error/connectionError');
const DatabaseError = require('../error/databaseError');
const JobPostAddressCreatedResponse = require('../response/jobPostAddressCreatedResponse');
const pool = require('../utils/databaseConnection');
const { CREATE_NEW_JOB_ADDRESS } = require('../utils/queries/jobAddressQueries');

const createNewJobPostAddress = (jobPostAddress) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                CREATE
                connection.query(CREATE_NEW_JOB_ADDRESS,jobPostAddress,(err,result) => {
                    connection.release();
                    if(err)
                        reject(new JobPostAddressCreatedResponse(jobPostAddress));
                    else
                        resolve(result);
                })
            }
        })
    })
};
module.exports = {createNewJobPostAddress}