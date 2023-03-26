const uuid = require('uuid');
const pool = require('../utils/databaseConnection');


const saveJobRequirement = (jobRequirement) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err){
                reject(err);
            }
            let sql = `INSERT INTO job_requirements SET ?`;
            connection.query(sql,jobRequirement,(err,result) => {
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
    })
}
module.exports = {saveJobRequirement}