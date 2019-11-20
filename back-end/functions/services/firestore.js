const admin = require("firebase-admin");

admin.initializeApp();

let db = admin.firestore();

const saveRefreshToken = async (gmail, refreshToken) => {
  if (!isGmailAddress(gmail)) throw new Error("Not a valid Gmail address");

  if (!isRefreshToken(refreshToken))
    throw new Error("Not a valid refreshToken");

  await db
    .collection("refreshToken")
    .doc(gmail)
    .set({
      email,
      refreshToken
    });

  return true;
};

const getRefreshToken = async gmail => {
  if (!isGmailAddress(gmail)) throw new Error("Not a valid Gmail address");

  const doc = await db
    .collection("refreshToken")
    .doc(gmail)
    .get();

  try {
    return doc.data().refreshToken;
  } catch (e) {
    throw new Error(`Can't get token of ${gmail}`, e);
  }
};

// #region VALIDATORS

// TODO placeholder value for now, need to implement
const isGmailAddress = gmail => true;

// TODO not sure whether we need this function or not
const isRefreshToken = refreshToken => true;

// #endregion

module.exports = {
  saveRefreshToken,
  getRefreshToken
};
