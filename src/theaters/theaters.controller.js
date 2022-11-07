//require service
const service = require("./theaters.service");

//list of all theaters and movies playing there
async function list(req, res) {
	const theaters = await service.list();

	for(let theater of theaters) {
		const movies = await service.listMovies(theater.theater_id);

		theater["movies"] = movies;
	}
	console.log("line 11");
	res.json({ data: theaters });
}

// list of theaters that show specific movie
async function listSpecificMovie(req, res, next) {
	if(res.locals.movie) {
		return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
	}
	next();
}

//export everything!!!
module.exports = {
	list: [listSpecificMovie, list],
}