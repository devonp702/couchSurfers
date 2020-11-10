//THIS FILE IS THE INITIAL STARTING POINT FOR NODE/EXPRESS SERVER//

let express = require("express");
let exphbs = require("express-handlebars");  
const db = require("./models");
let app = express();
var passport = require("./config/passport");


let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebarsConfig = {
  defaultLayout: "main", 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  } 
}

app.engine("handlebars", exphbs(handlebarsConfig));
app.set("view engine", "handlebars");


app.use(express.static("public"));


app.use(passport.initialize());
app.use(passport.session());

// Routes
// require("./routes/entriesApiRoutes")(app);
require("./routes/entriesApiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/userApiRoutes")(app);
require("./routes/passportApiRoutes")(app);

db.sequelize.sync().then(function() {  //make sure to delete force:true before deployment!!
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

