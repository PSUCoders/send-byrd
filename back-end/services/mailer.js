const nodemailer = require("nodemailer");

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

export async function sendMail(from, to) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = createTransport(testAccount);

  const info = await transporter
    .sendMail({
      from: from || '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to || "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<h1>Hello world?</h1>" // html body
    })
    .catch(err => console.error(err));

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info;
}
