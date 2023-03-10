class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionError';
    this.statusCode = 500;
    this.message = "There is a problem connecting to the database.Please try again later"
  }
}
module.exports = ConnectionError;