// Requiring our Todo model
var db = require("../models");

// Routes
module.exports = function(app) {

  // GET route for getting all of the entries
  app.get("/api/entries", function(req, res) {
    db.Entry.findAll({})
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // GET route for returning entries of a specific category
  app.get("/api/entries/category/:category", function(req, res) {
    db.Entry.findAll({
      where: {
        category: req.params.category
      },
      include: [db.User]
    })
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // GET route for editing a single entry
  app.get("/api/entries/:userid/:id", function(req, res) {
    db.Entry.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // POST route for saving a new entry
  app.post("/api/entries", function(req, res) {
    console.log(req.body);
    db.Entry.create(req.body)
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // DELETE route for deleting entries
  app.delete("/api/entries/:id", function(req, res) {
    db.Entry.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // PUT route for updating entries
  app.put("/api/entries", function(req, res) {
    db.Entry.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });
};