class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExistsError';
    this.statusCode = 409;
    this.message = "A user already exists with this email";
  }
}
module.exports = UserAlreadyExistsError;