const nodemailer = require("nodemailer");

export async function sendMail(email, pass, body, receivers) {
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
