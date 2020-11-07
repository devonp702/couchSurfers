// get, post, deletes

// db.Users refers to Users table
// db.Favorites refers to Favorites table

var db = require("../models");

module.exports = function (app) {
  // Find single user by id and include all of their favorites
  app.get("/api/:users/favorites", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Favorites]
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create user -- connect to user sign-up
  app.post("/api/:users", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUsers);
    });
  });

  // Delete user -- Favorites needs to associate in Favorites model
  app.delete("/api/:users", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

};

