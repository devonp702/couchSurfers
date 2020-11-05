// routes for primarily favorites table

// db.Users refers to users table
// db.Favorites refers to favorites table

var db = require("../models");

module.exports = function (app) {
  // GET route for getting all of the favorites for a given user?
  app.get("/api/:users/favorites", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Favorites.findAll({
      where: query,
      include: [db.Users]
    }).then(function (dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // GET route for retrieving a single favorite
  app.get("/api/favorites/:id", function (req, res) {
    db.Favorites.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function (dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // POST route for saving a new favorite
  app.post("/api/:users/favorites", function (req, res) {
    db.Favorites.create(req.body).then(function (dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // DELETE route for deleting favorites
  app.delete("/api/:users/favorites/:id", function (req, res) {
    db.Favorites.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbFavorites) {
      res.json(dbFavorites);
    });
  });
};