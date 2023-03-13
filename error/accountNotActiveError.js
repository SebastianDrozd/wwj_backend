class AccountNotActiveError extends Error {
  constructor() {
    super();
    this.name = 'AccountNotActiveError';
    this.statusCode = 404;
    this.message = 'Account not active. Please confirm your email address.';
  }
}
module.exports = AccountNotActiveError;