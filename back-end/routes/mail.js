const express = require("express");
const router = express.Router();
import { sendMail } from "../services/mailer";
const bodyParser = require("body-parser");
import credential from "./secrets.js";

router.use(bodyParser.text());

router.post("/", bodyParser.text(), async function(req, res) {
  // console.log(req.headers);
  const { email, password } = req.headers;
  let { receivers } = req.headers;
  receivers = receivers.split(",");
  console.log(receivers);

  console.log(req.body);

  if (isValidRequest(req)) {
    if (isValidCredential(req.headers)) {
      const info = await sendMail(email, password, req.body, receivers).catch(
        err => console.error(err)
      );
      res.send(info.toString());
      return;
    } else {
      res.status(400);
      res.send("Incorrect credential");
      return;
    }
  }

  res.status(400);
  res.send("Bad request");
  return;
});

const isValidRequest = request => {
  if (!request.headers.email || !request.headers.password) {
    return false;
  }

  return true;
};

const isValidCredential = ({ email, password }) => {
  if (
    email == credential.GMAIL_ACCOUNT &&
    password == credential.GMAIL_PASSWORD
  ) {
    return true;
  }
  return false;
};

module.exports = router;
