const express = require("express");
const router = express.Router();
const { sendMail } = require("../../services/mailer");
const bodyParser = require("body-parser");
require("dotenv").config();

router.use(bodyParser.text({
  type: ['text', 'text/plain', 'text/html']
}));

router.post("/", bodyParser.text(), async (req, res) => {
  if (!isValidRequest(req)) {
    res.status(400);
    res.send({ error: "Bad request" });
    return;
  }

  if (!isValidCredential(req.headers)) {
    res.status(400);
    res.send({ error: "Incorrect credential" });
    return;
  }

  const { email, password } = req.headers;
  const { subject, name } = req.query;
  const receivers = req.query.receivers.split(",");

  const mailInfo = {
    email,
    password,
    body: req.body,
    receivers,
    subject,
    name
  };
  const info = await sendMail(mailInfo).catch(err => {
    console.error(err);
    res.status(400);
    res.send(err);
  });

  res.send(info);
});

const isValidRequest = request => {
  if (
    !request.headers.email ||
    !request.headers.password ||
    !request.query.subject ||
    !request.query.receivers ||
    typeof request.body !== 'string'
  ) {
    return false;
  }

  return true;
};

const isValidCredential = ({ email, password }) => {
  if (
    email === process.env.GMAIL_ACCOUNT &&
    password === process.env.GMAIL_PASSWORD
  ) {
    return true;
  }
  return false;
};

module.exports = router;
