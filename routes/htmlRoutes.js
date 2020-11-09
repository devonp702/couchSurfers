// Dependencies
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = function (app, authUser) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads login.html
  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../views/login"));
  });

   // entry route loads entry.html
   app.get("/entry", function (req, res) {
    res.render(path.join(__dirname, "../views/entry"));
  });
  
  // blog route loads blog.html
  app.get("/blog", function (req, res) {
    res.render(path.join(__dirname, "../views/blog"));
  });
 
  // view route loads view.html
  app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });
  
  // members route loads members.html
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // signup route loads signup.html
  app.get("/signup", function (req, res) {
    res.render(path.join(__dirname, "../views/signup"));
  });
  // login route loads login.html
  app.get("/login", function (req, res) {
    res.render(path.join(__dirname, "../views/login"));
  });
  // resources route loads resources.html
  app.get("/resources", function (req, res) {
    res.render(path.join(__dirname, "../views/resources"));
  });

};