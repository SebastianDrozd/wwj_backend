class RefreshTokenMissingError extends Error {
  constructor() {
    super('Refresh token is missing');
    this.name = 'RefreshTokenMissingError';
    this.message = 'Refresh token is missing';
    this.statusCode = 401;
  }
}
module.exports = RefreshTokenMissingError;