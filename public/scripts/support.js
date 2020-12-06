var express = require("express");
var app = express();
var axios = require("axios");
var fs = require("fs");
var AWS = require("aws-sdk");

function down(key, contents) {
  fs.writeFileSync(key, contents);
}
