const Favorites = require("../models/favorites.js");



///START CRUD///


//READ//

Favorites.findAll({}).then(function(results){
    res.json(results);
});


//CREATE//

Favorites.create({
    fav_id: req.body.fav_id,
    city_name: req.body.city_name,
    state_name: req.body.state_name,
    country_name: req.body.country_name

}).then(function(results){
    console.log(results);
    //results here should be a newly created favorites
    res.end();
});

//UPDATE//

Favorites.update({
    city_name: req.body.city_name,
    state_name: req.body.state_name,
    country_name: req.body.country_name
}, {
    where: {
        fav_id: req.body.fav_id
    }
}).then(function(favoritesObj){
    res.json(favoritesObj);
});

//DELETE//

Favorites.destroy ({
    where: {
        fav_id: req.params.fav_id
    }
}).then(function(resp){
    res.json(resp);
});
