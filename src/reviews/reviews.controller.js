//require service file
const service = require("./reviews.service");

//delete function and turn review_id into a number if successful send status 204
async function destroy(req, res) {
	await service.delete(Number(res.locals.review.review_id));
	res.sendStatus(204);
}

//validate review Id and turn to number. if id not found return 404 and message
async function validateReviewId(req, res, next) {
	const { reviewId } = req.params;
	const review = await service.read(Number(reviewId));

	if(review) {
		res.locals.review = review;
		return next();
	}

	next({
		status: 404,
		message: "Review cannot be found."
	});
}

//update function. new review has body data and review id.
// need to await update service and set read service to review
//return that review and await readCritic to join data.
async function update(req, res) {
	const newReview = {
		...req.body.data,
		review_id: res.locals.review.review_id,
	}

	await service.update(newReview);
	const review = await service.read(res.locals.review.review_id);

	const reviewToReturn = {
		...review,
		critic: await service.readCritic(res.locals.review.critic_id),
	}

	res.json({ data: reviewToReturn });
}

//readReview function awaits readReviews service. for of-loop reviews. await readCritics. join critic with reviews.
async function readReviews(req, res) {
	const reviews = await service.readReviews(res.locals.movie.movie_id);

	for(let review of reviews) {
		const critic = await service.readCritic(review.critic_id);

		review["critic"] = critic;
	}

	res.json({ data: reviews });
}

module.exports = {
	delete: [validateReviewId, destroy],
	update: [validateReviewId, update],
	readReviews,
};