const sql = `
SELECT job_application.application_created,business.name,jobpost.job_title,job_application.job_application_status
from jobpost
inner join job_application on jobpost.job_id = job_application.job_post_id
inner join business on jobpost.job_business_id = business.id
where job_application.user_id = ?
LIMIT 5;`;
const CREATE_NEW_JOB_APPLICATION = `insert into job_application SET ?`;
const GET_USER_JOB_APPLICATIONS = sql;

const GET_BUSINESS_JOB_APPLICATIONS = `
Select user.firstname, user.lastname, user.email,jobpost.job_title,job_application.application_created,job_application.job_application_status
from user
inner join job_application on user.user_id = job_application.user_id
inner join jobpost on job_application.job_post_id = jobpost.job_id
where jobpost.job_business_id = ?

`;

module.exports = {
  CREATE_NEW_JOB_APPLICATION,
  GET_USER_JOB_APPLICATIONS,
  GET_BUSINESS_JOB_APPLICATIONS,
};
