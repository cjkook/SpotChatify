// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/", function (req, res) {
		res.render("index");
	});

	// album page
	app.post("/albums/:id", function (req, res) {
		console.log("hit");
		console.log(req.body);
		res.render("album");
	});

	// route testing
	app.get("/route-test", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/html/route-test.html"));
	});
};
