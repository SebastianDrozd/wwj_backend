const CREATE_NEW_BUSINESS = "INSERT INTO business SET ?"
const GET_BUSINESS_BY_ID = `
Select * 
from business
inner join business_address
on business.id = business_address.business_id
where business.id = ?`

module.exports = { CREATE_NEW_BUSINESS,GET_BUSINESS_BY_ID }