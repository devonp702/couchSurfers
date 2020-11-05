//defining model 

var Sequelize = require("sequelize");
var sequelize = require("../config/config.js");

module.exports = function () {
var Favorites = sequelize.define("favorites", {
    fav_id: { type: Sequelize.STRING }, 
    city_name: { type: Sequelize.STRING },
    state_name: { type: Sequelize.STRING },
    country_name: { type: Sequelize.STRING},
        //added in state name 
});
    return Favorites;
};

//syncing with DB
Favorites.sync();

// Makes the Favorites Model available for other files (will also create a table)
module.exports = Favorites;