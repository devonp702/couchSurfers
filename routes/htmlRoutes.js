
// Dependencies
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
// Routes
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });
// travel route loads travel.html
  app.get("/travel", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/travel.html"));
  });
// members route loads members.html
app.get("/members", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // signup route loads signup.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // favorites route loads favorites.html
  app.get("/favorites", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });

};
