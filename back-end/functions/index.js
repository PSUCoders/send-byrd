const functions = require('firebase-functions');
const expressApp = require('./express/app');
const express = require("express");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Create "main" function to host all other top-level functions
const main = express();
main.use('/api', expressApp);

exports.main = functions.https.onRequest(main)