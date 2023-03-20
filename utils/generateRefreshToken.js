const jwt = require('jsonwebtoken');
const generateRefreshToken = (id) => {
    const refreshToken = jwt.sign({
        sub: id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' });
    return refreshToken;
}
module.exports = {generateRefreshToken}