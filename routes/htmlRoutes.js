// Dependencies
var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = function (app) {

  // index route loads login
  app.get("/", function (req, res) {
    res.render("login");
  });

  // entry route loads entry for new post
  app.get("/entry/:userid", function (req, res) {
    res.render("entry");
  });

  // entry route loads entry for edit
  app.get("/entry/:entryid/:userid", function (req, res) {
    db.Entry.findOne({id: req.params.id}).then(data => {
      res.render("entry", data);
    });
  });

  // blog route loads blog
  app.get("/blog/:userid", function (req, res) {
    res.render("blog", {})
  });

  // members route loads members - does this do anything?
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile("../assets/js/members.js");
  });

  // signup route loads signup
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // login route loads login
  app.get("/login", function (req, res) {
    res.render("login");
  });

  // resources route loads resources
  app.get("/resources/:userid", function (req, res) {
    res.render("resources");
  });

};