//THIS FILE IS THE INITIAL STARTING POINT FOR NODE/EXPRESS SERVER//

let express = require("express");
let exphbs = require("express-handlebars");  
const db = require("./models");
let app = express();


let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.static("public"));

// Routes
require("./routes/favoritesApiRoutes")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/userApiRoutes")(app);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

