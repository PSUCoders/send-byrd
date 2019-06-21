const nodemailer = require("nodemailer");

const GMAIL_USERNAME = "psucoders@gmail.com";
const GMAIL_PASSWORD = "Plattsburgh#1";

function createTransport(account) {
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });
}

function createGmailTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "user@example.com",
      serviceClient: "113600000000000000000",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...",
      accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
      expires: 1484314697598
    }
  });
}

export async function sendMail(body) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: GMAIL_USERNAME, // generated ethereal user
      pass: GMAIL_PASSWORD // generated ethereal password
    }
  });

  console.log("here");

  const info = await transporter
    .sendMail({
      from: `"Coding Hub 👻" <${GMAIL_USERNAME}>`, // sender address
      to: "nthungdev@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: body || "<h1>Hello world?</h1>" // html body
    })
    .catch(err => console.error(err));

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  console.log("here");

  return info;
}
