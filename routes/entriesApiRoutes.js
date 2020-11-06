// routes for primarily entry table

// db.Users refers to users table
// db.Entry refers to entries table

var db = require("../models");

module.exports = function (app) {
  // GET route for retrieving a single entry
  app.get("/api/:users/entries/:id", function (req, res) {
    db.Entry.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function (dbEntry) {
      res.json(dbEntry);
    });
  });

  // POST route for saving a new entry
  app.post("/api/:users/entries", function (req, res) {
    db.Entry.create(req.body).then(function (dbEntry) {
      res.json(dbEntry);
    });
  });

  // DELETE route for deleting entries
  app.delete("/api/:users/entries/:id", function (req, res) {
    db.Entry.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEntry) {
      res.json(dbEntry);
    });
  });
};