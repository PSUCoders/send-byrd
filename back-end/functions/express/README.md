# Getting started

To get the ExpressJS server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [body-parser](https://github.com/expressjs/body-parser) - NodeJS body parsing middleware
- [nodemailer](https://github.com/nodemailer/nodemailer) - Send e-mails with NodeJS

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `services/` - This folder contains the utilities to handle request.

## Required Environment Variables

- PORT
- DEBUG
- CLIENT_ID
- CLIENT_SECRET
- REDIRECT_URL