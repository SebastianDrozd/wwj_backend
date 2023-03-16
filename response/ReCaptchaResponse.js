class ReCaptchaResponse{
    constructor(challenge){
        this.success = true;
        this.message = 'Recaptcha is valid';
        this.challenge_ts = challenge.challenge_ts;
    }
}
module.exports = ReCaptchaResponse;