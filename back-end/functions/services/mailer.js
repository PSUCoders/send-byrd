const nodemailer = require("nodemailer");

const sendMail = async ({
  email,
  password,
  receivers,
  subject,
  body,
  name
}) => {
  // create reusable transporter object using the gmail SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: password // generated ethereal password
    }
  });

  const verifyConnection = await transporter
    .verify()
    .catch(err => console.error(err));

  if (!verifyConnection) {
    throw new Error("SMTP Connection failed");
  }

  const info = await transporter
    .sendMail({
      from: name ? `"${name}" <${email}>` : email,
      to: receivers, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body, need to strictly convert to String
      html: body // html body
    })
    .then(result => {
      console.log("Message sent: %s", result);
      return result;
    })
    .catch(err => {
      throw new Error(err);
    });

  return info;
};

module.exports = {
  sendMail
};
