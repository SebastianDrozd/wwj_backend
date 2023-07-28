const CREATE_NEW_JOB_POST = "INSERT INTO jobpost SET ?";
const GET_JOB_POSTS_LIKE = "SELECT job_title FROM jobpost WHERE job_title LIKE ?";
module.exports = {CREATE_NEW_JOB_POST,GET_JOB_POSTS_LIKE}