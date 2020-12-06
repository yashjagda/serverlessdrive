var express = require("express");
var router = express.Router();
var User = require("../models/user");
var axios = require("axios");
var fs = require("fs");
var AWS = require("aws-sdk");

router.get("/drive", async function (req, res) {
  let response = await axios({
    method: "GET",
    url:
      "https://8xjm44qboa.execute-api.us-east-2.amazonaws.com/default/listObject",
  });
  //console.log(response.data);
  let metadata = [];
  for (var i = 0; i < response.data.length; i++) {
    let stuff = await axios({
      method: "GET",
      url:
        "https://vyeu8kbzjl.execute-api.us-east-2.amazonaws.com/default/getObject?name=" +
        `${response.data[i]}`,
    });
    metadata.push(stuff.data);
  }
  //console.log(metadata);
  res.render("drive/drive", {
    data: response.data,
    fs: fs,
    metadata: metadata,
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

// https://8xjm44qboa.execute-api.us-east-2.amazonaws.com/default/listObject
// https://vyeu8kbzjl.execute-api.us-east-2.amazonaws.com/default/getObject?name=Paper.pdf
