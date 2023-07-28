const ConnectionError = require("../error/connectionError");
const pool = require("../utils/databaseConnection");
const {
  CREATE_NEW_JOB_APPLICATION,
  GET_USER_JOB_APPLICATIONS,
  GET_BUSINESS_JOB_APPLICATIONS,
  GET_JOB_APPLICATION_DETAILS,
  UPDATE_JOB_APPLICATION_VIEWED_STATUS,
  UPDATE_JOB_APPLICATION_REJECTED_STATUS,
  GET_SIMPLE_JOB_APPLICATION_DETAILS,
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

const getJobApplicationDetails = (jobApplicationId) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(new ConnectionError());
    }
    else{
      connection.query(GET_JOB_APPLICATION_DETAILS, jobApplicationId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
  });
});

const getSimpleJobApplicationDetails = (jobApplicationId) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(new ConnectionError());
    }
    else{
      connection.query(GET_SIMPLE_JOB_APPLICATION_DETAILS, jobApplicationId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
  });
});

const updateJobApplicationViewedStatus = (jobApplicationId) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    console.log("repo got hit")
    if (err) {
      return reject(new ConnectionError());
    }
    else{
      connection.query(UPDATE_JOB_APPLICATION_VIEWED_STATUS, jobApplicationId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve("Changed job application status to viewed");
        }
      });
    }
  });
});
const updateJobApplicationRejectedStatus = (jobApplicationId) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      console.log("repo got hit")
      if (err) {
        return reject(new ConnectionError());
      }
      else{
        connection.query(UPDATE_JOB_APPLICATION_REJECTED_STATUS, jobApplicationId, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve("Changed job application status to rejected");
          }
        });
      }
    });
});

module.exports = { createNewJobApplication, getUserJobApplicationsById,getBusinessJobApplications,getJobApplicationDetails,updateJobApplicationViewedStatus ,updateJobApplicationRejectedStatus,getSimpleJobApplicationDetails};
