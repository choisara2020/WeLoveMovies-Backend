//require router, controller, method not allowed.
const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// /theaters
router
	.route("/")
	.get(controller.list)
	.all(methodNotAllowed);

module.exports = router;