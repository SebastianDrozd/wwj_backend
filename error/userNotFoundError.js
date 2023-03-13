class UserNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'UserNotFoundError';
    this.message = "User not found";
    this.statusCode = 404;
  }
}
module.exports = UserNotFoundError;