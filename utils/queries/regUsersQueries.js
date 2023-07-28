const COMPLETE_PROFILE = "insert into phone_number set ?"
const SAVE_USER_ADDRESS = "insert into address set ?"
const CHANGE_ACCOUNT_STATUS_ACTIVE = "update user set accountsetup = 'active' where user_id = ?"
const EDIT_USER_CORE_INFO = "update user set firstname = ?, lastname = ?, email = ? where user_id = ?"
const EDIT_USER_PHONE_NUMBER = "update phone_number set phone_number = ? where ph_user_id = ?"
const EDIT_USER_ADDRESS = "update address set address = ?, city = ?, state_province = ?, country = ?, postal_code = ? where address_user_id = ?"
module.exports = {COMPLETE_PROFILE,SAVE_USER_ADDRESS,CHANGE_ACCOUNT_STATUS_ACTIVE,EDIT_USER_CORE_INFO,EDIT_USER_PHONE_NUMBER,EDIT_USER_ADDRESS}