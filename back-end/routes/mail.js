const express = require("express");
const router = express.Router();
import { sendMail } from "../services/mailer";
var bodyParser = require("body-parser");

router.use(bodyParser.text());

router.post("/", bodyParser.text(), async function(req, res) {
  const info = await sendMail(req.body).catch(err => console.error(err));
  res.send(info.toString());
});

module.exports = router;
