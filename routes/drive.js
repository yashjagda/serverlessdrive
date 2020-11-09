var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/drive", function (req, res) {
  Campground.find({}, function (err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("drive/drive", {
        campgrounds: allcampgrounds,
        currentUser: req.user,
      });
    }
  });
});

//CREATE ROUTE-3

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
