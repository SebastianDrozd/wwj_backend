const ConnectionError = require('../error/connectionError');
const DatabaseError = require('../error/databaseError');
const pool = require('../utils/databaseConnection');
const { CREATE_NEW_JOB_POST, GET_JOB_POSTS_LIKE } = require('../utils/queries/jobPostQueries');
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

const getAllJobPostings = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                sql = `
                Select * from jobPost
                inner join business
                on jobPost.job_business_id = business.id 
                inner join business_address on business.id = business_address.business_id`;
                connection.query(sql,(err,result) => {
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
const getJobPostQuery = (searchTerm) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                const sql = `
                Select * from jobPost
                inner join business
                on jobPost.job_business_id = business.id
                inner join business_address on business.id = business_address.business_id
                where job_title like '%${searchTerm}%' or job_description like '%${searchTerm}%'
                `;
                connection.query(sql,(err,result) => {
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
const getJobTitles = (jobTitle) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)
                reject(new ConnectionError());
            else{
                const sql = `Select job_title from jobpost where job_title like "%${jobTitle}%"`
                console.log("about to send",sql)
                connection.query(sql,(err,result) => {
                    connection.release();
                    if(err)
                        reject(new DatabaseError(err.code));
                    else{
                        console.log("result",result)
                        resolve(result);
                    }
                       
                })
            }
        })
    })
}
module.exports = {getJobPostingByBusinessId,createNewJobPost,getAllJobPostings,getJobPostQuery,getJobTitles}