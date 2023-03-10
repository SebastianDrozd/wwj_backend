class UserAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExists';
    this.statusCode = 409;
    this.message = "A user with this email already exists"
  }
}
module.exports = UserAlreadyExists;