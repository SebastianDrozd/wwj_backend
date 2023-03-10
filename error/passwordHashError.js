class PasswordHashError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PasswordHashError';
    this.message = "there was a problem hashing the password";
  }
}
module.exports = PasswordHashError;