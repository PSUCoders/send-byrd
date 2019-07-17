const { google } = require("googleapis");
require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = process.env;
const scopes = ["https://www.googleapis.com/auth/userinfo.email"];

class GoogleClient {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
  }

  getAuthenticateUrl() {
    return this.oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      scope: scopes
    });
  }

  async getRefreshToken(code) {
    return await this.oauth2Client
      .getToken(code)
      .then(tokens => tokens.refresh_token);
  }

  setCredentials(refreshToken) {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
  }
}

module.exports = {
  GoogleClient
};
