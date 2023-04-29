const ConnectionError = require("../error/connectionError");
const pool = require("../utils/databaseConnection");
const {
  CREATE_NEW_JOB_APPLICATION,
  GET_USER_JOB_APPLICATIONS,
  GET_BUSINESS_JOB_APPLICATIONS,
} = require("../utils/queries/jobApplicationQueries");

const createNewJobApplication = (jobApplication) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        connection.query(
          CREATE_NEW_JOB_APPLICATION,
          jobApplication,
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log("new job application saved");
              resolve(result);
            }
          }
        );
      }
    });
  });
};

//@desc     Get all Job Applications by user id(email eg. srankoin@localhost)
//@route    GET /api/v1/jobApplications/users/:id
//@access   Private

const getUserJobApplicationsById = (userId) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(new ConnectionError());
      }
      connection.query(GET_USER_JOB_APPLICATIONS, userId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

const getBusinessJobApplications = (businessId) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(new ConnectionError());
      }
      else{
        connection.query(GET_BUSINESS_JOB_APPLICATIONS, businessId, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
  
    });
  })
};

module.exports = { createNewJobApplication, getUserJobApplicationsById,getBusinessJobApplications };
