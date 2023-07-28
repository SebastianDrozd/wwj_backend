const ConnectionError = require("../error/connectionError");
const DatabaseError = require("../error/databaseError");
const ResumeUploadedResponse = require("../response/resumeUploadedResponse");
const pool = require("../utils/databaseConnection");
const { DELETE_RESUME, EDIT_RESUME } = require("../utils/queries/resumeQueries");

const saveResume = async (resumeDto) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(new ConnectionError())
            }
            else{
                connection.query("INSERT INTO resumes SET ?", resumeDto, (err, results) => {
                    connection.release()
                    if (err) {
                        reject(new DatabaseError(err))
                    } else {
                        resolve(new ResumeUploadedResponse())
                    }
                })
            }
        })
    })
};

const getUserResumes = async (user_id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err) {
                reject(new ConnectionError())
            }
            else{
                connection.query("SELECT * FROM resumes WHERE resume_user_id = ?", user_id, (err,results) => {
                    connection.release()
                    if (err) {
                        reject(new DatabaseError(err))
                    } else {
                        resolve(results)
                    }
                })
            }
        })
    })
}

const deleteUserResume = (resumeId) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err) {
                reject(new ConnectionError())
            }
            else{
                connection.query(DELETE_RESUME, resumeId, (err,results) => {
                    connection.release()
                    if (err) {
                        reject(new DatabaseError(err))
                    } else {
                        resolve("Resume deleted successfully")
                    }
                })
            }
        })
    })
}

const editUserResume = (newName, resumeId) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err) {
                reject(new ConnectionError())
            }
            else{
                connection.query(EDIT_RESUME,[newName,resumeId], (err,results) => {
                    connection.release()
                    if (err) {
                        reject(new DatabaseError(err))
                    } else {
                        resolve("Resume edited successfully")
                    }
                })
            }
        })
    })
}


module.exports = {saveResume,getUserResumes,deleteUserResume,editUserResume}