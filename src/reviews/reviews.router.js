//require router and controller and method not allowed.
const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// /review/1  or /review/:reviewId
router
	.route("/:reviewId")
	.delete(controller.delete)
	.put(controller.update)
	.all(methodNotAllowed);

// /review 
router
	.route("/")
	.get(controller.readReviews)
	.all(methodNotAllowed);

module.exports = router;