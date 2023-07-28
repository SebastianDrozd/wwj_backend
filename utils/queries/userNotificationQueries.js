const SAVE_NEW_USER_NOTIFICATION = `INSERT INTO user_notifications SET ?`;
const GET_USER_NOTIFICATIONS = `
SELECT * FROM user_notifications
inner join jobpost on user_notifications.user_not_job_id = jobpost.job_id
WHERE user_not_user_id = ?`;
module.exports = {SAVE_NEW_USER_NOTIFICATION,GET_USER_NOTIFICATIONS};