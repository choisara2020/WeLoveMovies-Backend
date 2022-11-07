//require connection
const knex = require("../db/connection");

//one review table 
function read(reviewId) {
	return knex("reviews")
		.select("*")
		.where({ review_id: reviewId })
		.first();
}

//destroy table data
function destroy(reviewId) {
	return knex("reviews")
		.where({ review_id: reviewId })
		.del();
}

//update table data
function update(review) {
	return knex("reviews")
		.select("*")
		.where({ review_id: review.review_id })
		.update(review);
}

//readCritic critic data
function readCritic(criticId) {
	return knex("critics")
		.select("*")
		.where({ critic_id: criticId })
		.first();
}

//readReview reviews data
function readReviews(movieId) {
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

//export everything!!!!
module.exports = {
	delete: destroy,
	read,
	update,
	readCritic,
	readReviews,
};