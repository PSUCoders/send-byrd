var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
var mailRouter = require("./routes/mail");
var memberRouter = require("./routes/member");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.multipart());

// Resolve CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use("/mail", mailRouter);
app.use("/member", memberRouter);

module.exports = app;
