class UserCreatedResponse {
  constructor(user) {
    this.user = user;
    this.statusCode = 201;
    this.message = "User created successfully";
  }
}
module.exports = UserCreatedResponse;