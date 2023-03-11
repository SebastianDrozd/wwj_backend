class InvalidConfirmationTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidConfirmationTokenError';
    this.message = "There is no user with this confirmation token";
    this.statusCode = 404;
  }
}
module.exports = InvalidConfirmationTokenError;