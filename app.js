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
var fs = require("fs");
var AWS = require("aws-sdk");
// var jsdom = require("jsdom");
// var $ = require("jquery")(new jsdom.JSDOM().window);
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

AWS.config.update({ region: "us-east-2" });
//route calls
app.use(indexRoutes);
app.use(driveRoutes);

//server listen
app.listen(3000, function () {
  console.log("Server Initiated!");
});

// $("button.download").click(async function () {
//   var id = this.dataset.id;
//   // do something with id
//   console.log(id);
//   const response = await axios({
//     method: "GET",
//     url:
//       "https://vyeu8kbzjl.execute-api.us-east-2.amazonaws.com/default/getObject?name=" +
//       `${id}`,
//   });
//   fs.writeFileSync(id, response.Body);
//   console.log("Successful", `<%= data[1]%>`);
// });
function down(key, contents) {
  fs.writeFileSync(key, contents);
}
