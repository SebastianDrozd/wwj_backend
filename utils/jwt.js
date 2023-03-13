const jwt = require('jsonwebtoken');
const createAccessToken = (user) => {
    return jwt.sign({
        username: user.username,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
        , audience: user.type
    });
}
module.exports = {createAccessToken}