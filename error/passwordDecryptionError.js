class PasswordDecryptionError extends Error {
  constructor() {
    super();
    this.name = 'PasswordDecryptionError';
    this.statusCode = 500;
    this.message = 'There was an error while decrypting this password';
  }
}
module.exports = PasswordDecryptionError;