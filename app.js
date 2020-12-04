var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var axios = require("axios");
var AWS = require("aws-sdk");
// routes
var indexRoutes = require("./routes/index");
var driveRoutes = require("./routes/drive");

//MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cloudproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));

// declarations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(
  require("express-session")({
    secret: "Boom",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

AWS.config.update({ region: "us-east-1" });
//route calls
app.use(indexRoutes);
app.use(driveRoutes);

//server listen
app.listen(3000, function () {
  console.log("Server Initiated!");
});
