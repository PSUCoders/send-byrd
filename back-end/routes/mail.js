const express = require("express");
const router = express.Router();
import { sendMail } from "../services/mailer";

/* GET home page. */
router.get("/", async function(req, res, next) {
  const info = await sendMail(
    "vuagalacuoihung123@gmail.com",
    "vuagalacuoihung1234@gugau.com"
  ).catch(err => {
    console.error(err);
    res.status(400);
    res.send({
      title: "An error occurs",
      data: err
    });
  });
  res.send(info);
});

/* GET home page. */
// router.post("/", async function(req, res, next) {
//   const info = await sendMail(
//     "vuagalacuoihung123@gmail.com",
//     "vuagalacuoihung1234@gugau.com"
//   ).catch(err => {
//     console.error(err);
//     res.status(400);
//     res.send({
//       title: "An error occurs",
//       data: err
//     });
//   });
//   res.send(info);
// });

router.post("/", async function(req, res) {
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;
  const nodemailer = require("nodemailer");

  const oauth2Client = new OAuth2(
    "497572789098-8kter34kprbr3q07tmmdnkc8t1jmoels.apps.googleusercontent.com",
    "rVX-RYGvSEc2U19n0w4Rik4r",
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: "1/9avBnEwLXP1LJ7Do852c6nF27uXVcHhdClJyi9KogIQ"
  });
  const tokens = await oauth2Client.refreshAccessToken();
  const accessToken = tokens.credentials.access_token;

  var mailOptions = {
    from: req.body.name,
    to: "nthungdev@gmail.com",
    subject: "My site contact from: " + req.body.name,
    text: req.body.message,
    html:
      "Message from: " +
      req.body.name +
      "<br></br> Email: " +
      req.body.email +
      "<br></br> Message: " +
      req.body.message
  };

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "nicklaus.roach@gmail.com",
      clientId:
        "497572789098-8kter34kprbr3q07tmmdnkc8t1jmoels.apps.googleusercontent.com",
      clientSecret: "rVX-RYGvSEc2U19n0w4Rik4r",
      refreshToken: "1/9avBnEwLXP1LJ7Do852c6nF27uXVcHhdClJyi9KogIQ",
      accessToken: accessToken
    }
  });

  const info = await smtpTransport
    .sendMail(mailOptions)
    .catch(err => console.error(err));

  res.send(info);
});

module.exports = router;
