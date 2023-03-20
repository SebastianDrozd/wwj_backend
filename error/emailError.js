class EmailErorr extends Error{
    constructor(message){
        super(message);
        this.name = "EmailError";
        this.errorMessage = message;
        this.statusCode = 500;
    }
}
module.exports = EmailErorr