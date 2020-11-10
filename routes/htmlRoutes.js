// Dependencies
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = function (app, authUser) {

  // These routes just handles the page that the user gets sent to.


  /*
  1. Make a call to an html route handler, get the emtry and user id, query sequelize, send data to handlebars

  2. On a static entry page, when that page loads, get the entry and user id, make an AJAX call to get the data, receive the data (JSON) and then update the DOM 

  */


  // index route loads login
  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../views/login"));
  });

  // entry route loads entry for new post
  app.get("/entry/:userid", function (req, res) {
    res.render("entry");
  });

  // entry route loads entry for edit
  app.get("/entry/:userid/:entryid", function (req, res) {
    // do sequelize query & send data into handlebars template
    res.render("entry", data);
  });

  // blog route loads blog
  app.get("/blog/:id", function (req, res) {
    res.render("blog", {})
    //res.render(path.join(__dirname, "../views/blog"));
  });

  // members route loads members.html
  // app.get("/members", isAuthenticated, function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // signup route loads signup
  app.get("/signup", function (req, res) {
    res.render(path.join(__dirname, "../views/signup"));
  });

  // login route loads login
  app.get("/login", function (req, res) {
    res.render(path.join(__dirname, "../views/login"));
  });
  
  // resources route loads resources
  app.get("/resources", function (req, res) {
    res.render(path.join(__dirname, "../views/resources"));
  });

};