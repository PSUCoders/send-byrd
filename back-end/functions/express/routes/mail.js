const express = require("express");
const router = express.Router();
const { sendMail, sendMail0Auth2 } = require("../../services/mailer");
const bodyParser = require("body-parser");

router.use(bodyParser.text());

router.post("/", bodyParser.text(), async (req, res) => {
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

router.post("/with0auth2", bodyParser.text(), async (req, res) => {
  // console.log(req.headers);
  const { refreshtoken, accesstoken, email } = req.headers;
  let { receivers } = req.headers;
  receivers = receivers.split(",");
  console.log(receivers);
  console.log(req.headers)

  const info = await sendMail0Auth2(email, refreshtoken, accesstoken, req.body, receivers).catch(
    err => console.error(err)
  );
  res.send("hello");
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
    email === credential.GMAIL_ACCOUNT &&
    password === credential.GMAIL_PASSWORD
  ) {
    return true;
  }
  return false;
};

module.exports = router;
