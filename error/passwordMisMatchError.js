class PasswordMismatchError extends Error {
  constructor() {
    super();
    this.name = "PasswordMismatchError";
    this.statusCode = 401;
    this.message = "You have entered an incorrect password";
  }
}
module.exports = PasswordMismatchError;