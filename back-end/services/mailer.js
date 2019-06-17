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

function createGmailTransport() {
  var auth = {
    type: "oauth2",
    user: "nthungdev@gmail.com",
    clientId:
      "497572789098-8kter34kprbr3q07tmmdnkc8t1jmoels.apps.googleusercontent.com",
    clientSecret: "rVX-RYGvSEc2U19n0w4Rik4r",
    refreshToken: "1/9avBnEwLXP1LJ7Do852c6nF27uXVcHhdClJyi9KogIQ"
  };

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
