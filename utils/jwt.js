const jwt = require('jsonwebtoken');
const createAccessToken = (user) => {
    return jwt.sign({
        sub: user.id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
        , audience: user.type
    });
}
module.exports = {createAccessToken}