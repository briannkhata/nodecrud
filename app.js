require("dotenv").config();
const expressLayouts = require('express-ejs-layouts');
const express = require("express");
const bodyParser = require('body-parser');

var app = express();

app.use(expressLayouts);
const port = 500 || process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

























/*
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var flash = require("express-flash");
var session = require("express-session");
var usersRouter = require("./routes/user.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "123456catr",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(flash());
app.use("/", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
*/


