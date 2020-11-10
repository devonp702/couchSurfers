// Dependencies
var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = function (app, authUser) {

  // These routes just handles the page that the user gets sent to.


  /*
  1. Make a call to an html route handler, get the entry and user id, query sequelize, send data to handlebars

  2. On a static entry page, when that page loads, get the entry and user id, make an AJAX call to get the data, receive the data (JSON) and then update the DOM 

  */


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