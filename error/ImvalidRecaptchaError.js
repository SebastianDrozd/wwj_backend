class InvalidRecaptchaError extends Error {
  constructor() {
    super();
    this.name = 'InvalidRecaptchaError';
    this.message = 'Invalid recaptcha';
    this.statusCode = 400;
  }
}
module.exports = InvalidRecaptchaError;