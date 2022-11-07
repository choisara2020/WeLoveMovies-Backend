//require connection file
const knex = require("../db/connection");

//list  movies if (is_showing: true) join table movie_theaters with movie_id from both tables to connect
function list(isShowing) {
	if(isShowing) {
		return knex("movies as m")
			.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
			.distinct("mt.movie_id")
			.select("m.*")
			.where({ is_showing: true });
	}

	return knex("movies")
		.select("*");
}

//data with movie. select all columns. define where. return first movie.
function read(movieId) {
	return knex("movies")
		.select("*")
		.where({ movie_id: movieId })
		.first();
}

//EXPORT EVERYTHING!!!!!
module.exports = {
	list,
	read,
};