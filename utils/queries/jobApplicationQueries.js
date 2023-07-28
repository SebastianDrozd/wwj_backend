const sql = `
SELECT job_application.job_application_id, jobpost.job_description,job_application.application_created,business.name,jobpost.job_title,job_application.job_application_status,business_address.city, business_address.country
from jobpost
inner join job_application on jobpost.job_id = job_application.job_post_id
inner join business on jobpost.job_business_id = business.id
inner join business_address on business.id = business_address.business_id
where job_application.user_id = ?
ORDER BY job_application.application_created DESC
`;
const CREATE_NEW_JOB_APPLICATION = `insert into job_application SET ?`;
const GET_USER_JOB_APPLICATIONS = sql;

const GET_BUSINESS_JOB_APPLICATIONS = `
Select user.user_id,user.firstname, user.lastname, user.email,jobpost.job_title,jobpost.job_id,job_application.application_created,job_application.job_application_status, job_application.job_application_id
from user
inner join job_application on user.user_id = job_application.user_id
inner join jobpost on job_application.job_post_id = jobpost.job_id
where jobpost.job_business_id = ?

`;
const GET_JOB_APPLICATION_DETAILS = `Select user.user_id,user.firstname, user.lastname, user.email,jobpost.job_title,job_application.application_created,job_application.job_application_status, job_application.job_application_id
from user
inner join job_application on user.user_id = job_application.user_id
inner join jobpost on job_application.job_post_id = jobpost.job_id
where job_application.job_application_id= ?`

const UPDATE_JOB_APPLICATION_VIEWED_STATUS= `
UPDATE job_application
SET job_application_status = 'viewed'
WHERE job_application_id = ?`

const UPDATE_JOB_APPLICATION_REJECTED_STATUS= `
UPDATE job_application
SET job_application_status = 'Rejected'
WHERE job_application_id = ?`
const GET_SIMPLE_JOB_APPLICATION_DETAILS = `
SELECT * from job_application
WHERE job_application_id = ?`
module.exports = {
  CREATE_NEW_JOB_APPLICATION,
  GET_USER_JOB_APPLICATIONS,
  GET_BUSINESS_JOB_APPLICATIONS,
  GET_JOB_APPLICATION_DETAILS,
  UPDATE_JOB_APPLICATION_VIEWED_STATUS,
  UPDATE_JOB_APPLICATION_REJECTED_STATUS,
  GET_SIMPLE_JOB_APPLICATION_DETAILS
};
