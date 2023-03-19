const ConnectionError = require('../error/connectionError');
const DatabaseError = require('../error/databaseError');
const pool = require('../utils/databaseConnection');
const { CREATE_NEW_JOB_POST } = require('../utils/queries/jobPostQueries');
const { GET_JOB_POSTING_BY_BUSINESS_USER_ID } = require('../utils/queries/userQueries');

const getJobPostingByBusinessId = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                connection.query(GET_JOB_POSTING_BY_BUSINESS_USER_ID,id,(err,result) => {
                    connection.release();
                    if(err)
                        reject(new DatabaseError(err.code));
                    else
                        resolve(result);
                })
            }
        })
    })
}

const createNewJobPost = (jobPost) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                connection.query(CREATE_NEW_JOB_POST,jobPost,(err,result) => {
                    connection.release();
                    if(err)
                        reject(new DatabaseError(err.code));
                    else
                        resolve(result);
                })
            }
        })
    })
}
module.exports = {getJobPostingByBusinessId,createNewJobPost}