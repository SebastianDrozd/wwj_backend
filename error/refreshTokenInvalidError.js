class RefreshTokenInvalidError extends Error {
  constructor() {
    super();
    this.name = 'RefreshTokenInvalidError';
    this.message = "Invalid Refresh Token";
    this.statusCode = 401;
  }
}
module.exports = RefreshTokenInvalidError;