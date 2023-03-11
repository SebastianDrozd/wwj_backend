class EmailErorr extends Error{
    constructor(message){
        super(message);
        this.name = "EmailError";
        this.errorMessage = message
    }
}
module.exports = EmailErorr