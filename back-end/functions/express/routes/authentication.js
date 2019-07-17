const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = process.env;

const { GoogleClient } = require("../../services/googleAuthentication");
const { saveRefreshToken } = require("../../services/firestore");

// generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = [
//   "https://mail.google.com",
//   "https://www.googleapis.com/auth/gmail.compose"
// ];

const scopes = ["https://www.googleapis.com/auth/userinfo.email"];

// Get url to authenticate with Google account
router.get("/google", async (req, res) => {
  try {
    const client = new GoogleClient();
    const url = client.getAuthenticateUrl();
    res.redirect(url);
    // res.send({
    //   url
    // });
  } catch (e) {
    console.error(e);
    res.status(400);
    res.send({
      error: e
    });
  }
  return;
});

router.get("/", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    res.status(400);
    res.send("Bad request");
    return;
  }

  console.log(code);

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const { tokens } = await oauth2Client.getToken(code);
  console.log("tokens", tokens);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on("tokens", tokens => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  res.redirect("https://sendbyrd.firebaseapp.com");
  res.send(tokens);
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
