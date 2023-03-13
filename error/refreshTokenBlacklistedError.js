class RefreshTokenBlacklistedError extends Error {
  constructor() {
    super();
    this.name = 'RefreshTokenBlacklistedError';
    this.message = 'Refresh token has been blacklisted';
    this.statusCode = 401;
  }
}
module.exports = RefreshTokenBlacklistedError