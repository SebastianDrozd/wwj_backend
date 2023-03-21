const GET_ALL_USERS = "SELECT * FROM user"
const GET_USER_BY_EMAIL = "SELECT * FROM user WHERE email = ?"
const GET_USER_BY_USERNAME = "SELECT * FROM user WHERE username = ?"
const GET_USER_BY_ID = "SELECT * FROM user WHERE id = ?"
const CREATE_NEW_USER = "INSERT INTO user SET ?"
const UPDATE_USER_STATUS =  "UPDATE user SET status = 'active' WHERE id = ?"
const GET_USER_BY_CONFIRMATION_CODE = "SELECT * FROM user WHERE confirmationcode = ?"
const DELETE_USER_CONFIRMATION_CODE = "UPDATE user SET confirmationcode = null WHERE id = ?"
const SET_FRESH_TOKEN = "Insert into refreshtoken SET ?"
const DELETE_REFRESH_TOKEN  = "DELETE FROM refreshtoken WHERE userid = ?"
const GET_USER_REFRESH_TOKEN = "SELECT * FROM refreshtoken WHERE userid = ?"
const GET_JOB_POSTING_BY_BUSINESS_USER_ID = "SELECT * FROM jobpost WHERE business_user_id = ?"
const SET_ACCOUNT_SETUP_TO_TRUE = "UPDATE user SET accountsetup = true WHERE id = ?"
const GET_COMPLETE_PROFILE = `
SELECT * from user
inner join business
on user.id = business.business_user_id
inner join business_address
on business.id = business_address.business_id`
module.exports = {GET_ALL_USERS,GET_USER_BY_EMAIL,CREATE_NEW_USER,UPDATE_USER_STATUS,GET_USER_BY_CONFIRMATION_CODE,GET_USER_BY_USERNAME,DELETE_USER_CONFIRMATION_CODE,GET_USER_BY_ID,SET_FRESH_TOKEN,DELETE_REFRESH_TOKEN,GET_USER_REFRESH_TOKEN,GET_JOB_POSTING_BY_BUSINESS_USER_ID,SET_ACCOUNT_SETUP_TO_TRUE,GET_COMPLETE_PROFILE}