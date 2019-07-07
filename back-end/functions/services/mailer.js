const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = process.env;

const googleCloudClient = {
  clientId:
    "497572789098-irdgd3op2urjni5avbc8brhqsr5i24am.apps.googleusercontent.com",
  clientSecret: "Hx5MOK7Z2tE-qHK1HtPd6AfZ"
};

module.exports = async function sendMail(email, pass, body, receivers) {
  // create reusable transporter object using the gmail SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: pass // generated ethereal password
    }
  });

  console.log("here");
  console.log("body", body);

  const info = await transporter
    .sendMail({
      from: `"Coding Hub 👻" <${email}>`, // sender address
      to: receivers || "nthungdev@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: body || "<h1>Hello world?</h1>" // html body
    })
    .catch(err => console.error(err));

  console.log("Message sent: %s", info.messageId);

  return info;
}

module.exports = async function sendMail0Auth2(user, refreshToken, accessToken, body, receivers) {
  console.log("refreshToken, accessToken", refreshToken, accessToken)

  // Create reusable transporter object using the gmail SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "oauth2",
      user,
      clientId: googleCloudClient.clientId,
      clientSecret: googleCloudClient.clientSecret,
      refreshToken,
      accessToken
    }
  });

  console.log("here");
  console.log("body", body);

  const info = await transporter
    .sendMail({
      from: user, // sender address
      to: receivers || "nthungdev@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: body || "<h1>Hello world?</h1>" // html body
    })
    .catch(err => console.error(err));

    transporter.close();
  console.log("Message sent: %s", info.messageId);

  return info;
}
