//require all the things we need:
//express router, controller, theaters router, reviews router, and method not allowed
const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes and controller that validates ID 
//theaters of a specific movie
router.use("/:movieId/theaters", controller.validateMovieId, theatersRouter);
//review of a specific movie
router.use("/:movieId/reviews", controller.validateMovieId, reviewsRouter);

// /movies/1   or /movies/:movieId
router
	.route("/:movieId")
	.get(controller.read)
	.all(methodNotAllowed);

// /movies 
router
	.route("/")
	.get(controller.list)
	.all(methodNotAllowed);



module.exports = router;