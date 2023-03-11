const nodemailer = require("nodemailer");
const EmailErorr = require("../error/emailError");

const user = "srankoin@localhost";
const pass = "12345"

const transport = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure : false,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {

 return transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clickinasdasdasdasdasdasdasdasdasdasdasdasdg on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    
  };