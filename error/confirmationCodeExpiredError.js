class ConfirmationCodeExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfirmationCodeExpiredError';
    this.statusCode = 400;  
    this.message = "Confirmation code has expired";
  }
}
module.exports = ConfirmationCodeExpiredError;