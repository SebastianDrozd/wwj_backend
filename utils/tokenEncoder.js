function encodeRegistrationToken(id)
{
    // jsonweb automatically adds a key that determines the time, but you can use any module
    const jwt = require('jsonwebtoken');

    // The information we need to find our user in the database (not sensible info)
    const date = new Date()
    const futureDate = addHours(date, 2);
    let info = {id: id,expDate: futureDate};

    // The hash we will be sending to the user
    const token = jwt.sign(info, "yoursecretkey");

    return token;
}
function decodeRegistrationToken(token)
{   
    const jwt = require('jsonwebtoken');
    let decoded = jwt.verify(token, "yoursecretkey");
    console.log("this is decoded"  , decoded)
    let userId = decoded.id;

    // Check that the user didn't take too long
    let dateNow = new Date();
    let tokenTime = decoded.expDate
    console.log("this is date now " + dateNow.getTime())
    console.log("this is token time " + new Date(tokenTime).getTime())
    if (dateNow.getTime() < new Date(tokenTime).getTime()) {
        return{
            id: userId,
            expDate: tokenTime,
        }
    }
    else{
        console.log("the date now is greater than the token time")
    }
    return "hi"

}
function addHours(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
  }
module.exports = {encodeRegistrationToken,decodeRegistrationToken}