// database info routes 

// get, post, deletes

// db.Users refers to Users table
// db.Favorites refers to Favorites table

var db = require("../models");

module.exports = function(app) {
  app.get("/api/:users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Users.findAll({
      include: [db.Favorites]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/:users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
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

  // Delete user -- needs join to Favorites to delete their Favorites, too
  app.delete("/api/:users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

};
