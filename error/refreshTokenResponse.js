class RefreshTokenResponse  {
    constructor(token,refreshToken) {
        this.name = 'RefreshTokenResponse';
        this.message = 'Refresh token has been blacklisted';
        this.accessToken = token;
        this.refreshToken = refreshToken;
        this.statusCode = 401;

    }
}
module.exports = RefreshTokenResponse;