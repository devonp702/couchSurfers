// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/entries/", function(req, res) {
    db.Entry.findAll({})
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/entries/category/:category", function(req, res) {
    db.Entry.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/entries/id/:id", function(req, res) {
    db.Entry.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/entries", function(req, res) {
    console.log(req.body);
    db.Entry.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
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

  // PUT route for updating posts
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

