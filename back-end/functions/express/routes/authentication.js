const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { google } = require("googleapis");
require("dotenv").config();

router.use(bodyParser.text());

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = process.env;
// console.log(process.env.CLIENT_ID)

// console.log("CLIENT_ID, CLIENT_SECRET, REDIRECT_URL")
// console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ["https://mail.google.com", "https://www.googleapis.com/auth/gmail.compose"]

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes
});

// console.log(url);

router.post("/", bodyParser.text(), async (req, res) => {
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
    email === credential.GMAIL_ACCOUNT &&
    password === credential.GMAIL_PASSWORD
  ) {
    return true;
  }
  return false;
};

module.exports = router;
