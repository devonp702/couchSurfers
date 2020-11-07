// get, post, deletes

// db.Users refers to User table
// db.Entries refers to Entry table

var db = require("../models");

module.exports = function (app) {
  // Find single user by id and include all of their entries
  app.get("/api/:users/entries", function (req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Entries]
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create user -- connect to user sign-up
  app.post("/:signup", function (req, res) {
    db.Users.create({
      username: req.body.username,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      res.status(401).json(err);
    });
  });

  // Delete user -- Entries needs to associate in entries model
  app.delete("/api/:users", function (req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

};

