class LoginResponse {
    constructor(token,userName,userEmail,type) {
        this.token = token;
        this.userName = userName
        this.email = userEmail;
        this.type = type
    }
}
module.exports = LoginResponse;