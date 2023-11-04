const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reducedTheaterMovies1 = {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    updated_at: ["critic", "updated_at"], // Corrected the typo
};

const reducedTheaterMovies2 = {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
};

async function reviewExists(req, res, next) {
    const { reviewId } = req.params; // Corrected the typo
    const data = await service.readReview(reviewId);

    if (data) {
        res.locals.review = data;
        return next();
    }
    return next({ status: 404, message: 'Cannot find review' });
}

async function list(req, res, next) {
    const { movieId } = req.params; // Corrected the typo
    if (movieId) {
        let data = await service.read(movieId);
        const reducer = reduceProperties("review_id", reducedTheaterMovies1);
        data = reducer(data);
        res.json({ data });
    } else {
        const data = await service.list();
        res.json({ data });
    }
}

async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    const reducer = reduceProperties("review_id", reducedTheaterMovies2);
    const updatedData = reducer(data); // Corrected the variable name

    res.json({ data: updatedData }); // Ensure the response format
}

async function destroy(req, res, next) {
    const { review_id } = res.locals.review;
    await service.delete(review_id);
    res.status(204).json();
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};