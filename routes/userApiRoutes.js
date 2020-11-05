// get, post, deletes

// db.Users refers to Users table
// db.Favorites refers to Favorites table

var db = require("../models");

module.exports = function(app) {
    // Find single user by id and include all of their favorites
  app.get("/api/:users/favorites", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Favorites]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create user -- connect to user sign-up
  app.post("/api/:users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create favorite
  app.post("/api/:users/favorites", function(req, res) {
    db.Favorites.create(req.body).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  //Delete favorite
  app.delete("/api/:users/favorites/:id", function(req, res) {
    db.Favorites.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // Delete user -- Favorites needs to associate in Favorites model
  app.delete("/api/:users", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

};

