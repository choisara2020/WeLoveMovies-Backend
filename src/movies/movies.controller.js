//require movies.service file
const service = require("./movies.service");

//return a list of movies
async function list(req, res) {
	const { is_showing = false } = req.query;
	res.json({ data: await service.list(Boolean(is_showing)) });
}

//return a single movie
async function read(req, res) {
	res.json({ data: res.locals.movie });
}

//validate movie id and movie_id is a number
async function validateMovieId(req, res, next) {
	const { movieId } = req.params;
	const movie = await service.read(Number(movieId));

	if(movie) {
		res.locals.movie = movie;
		return next();
	}

	next({
		status: 404,
		message: "Movie cannot be found."
	});
}

//REMEMBER TO EXPORT!!!!!!!
module.exports = {
	list,
	read: [validateMovieId, read],
	validateMovieId,
};