const db = require("./models");
db.sequelize.sync().then(function() {
  console.log("models synced")
  process.exit()
});