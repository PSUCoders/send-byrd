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

module.exports = router;
