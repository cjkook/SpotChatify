/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();
var db = require("./models");
var exphbs = require("express-handlebars");

// express server
var app = express();
var PORT = process.env.PORT || 8888;

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app
	.use(express.static(__dirname + "/public"))
	.use(cors())
	.use(cookieParser())
	.use(express.urlencoded({ extended: true }))
	.use(express.json());

// ROUTES
// ============================
require("./routes/html-routes.js")(app);
require("./routes/spotify-api-routes.js")(app);
require("./routes/api-routes")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
	});
});