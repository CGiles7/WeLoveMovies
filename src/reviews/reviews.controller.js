const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const methodNotAllowed = require("../errors/methodNotAllowed")

const VALID_REVIEW = [
    "content",
    "score",
    "movie_id",
    "critic_id"
]

async function list(req, res) {
    const {movieId} = req.params;
    const reviewData = await service.list(movieId)
    res.json({ data: reviewData })
}

function read(req, res) {
    res.json({ data: res.locals.review })
}

async function validReview(req, res, next) {
    const newReview = req.body.data
    const invalidReviewProperties = Object.keys(newReview).filter((key)=> !VALID_REVIEW.includes(key))
    if (invalidReviewProperties.length) {
        return next({
            status: 400,
            message: `Invalid Review Field(s): ${invalidReviewProperties.join(", ")}`
        })
    }
    const review = await service.create(newReview)
    res.locals.review = review;
    next()
}

async function create(req, res) {
    const newReview = await service.create(res.locals.review)
    res.json({ data: newReview })
}

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    const reviewNumber = Number(reviewId)
    const review = await service.read(reviewNumber)
    if (review) {
        res.locals.reviewId = reviewNumber;
        res.locals.review = review;
        return next()
    }
    next({
        status: 404,
        message: `The Review With Id${reviewId} Cannot Be Found.`
    })
}

async function update(req, res) {
    const {review} = res.locals
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    const response = await service.update(updatedReview)
    res.json({ data: response })
}

async function destroy(req, res) {
    const response = await service.destroy(res.locals.reviewId)
    res.status(204).json({ data: response })
}

function noMovieId(req, res, next) {
    if (req.params.movieId) {
        return methodNotAllowed(req, res, next)
    }
    next()
}
function containsMovieId(req, res, next) {
    if (req.params.movieId) {
    return next()
    }
    methodNotAllowed(req, res, next)
}

module.exports = {
    list: [containsMovieId, asyncErrorBoundary(list)],
    read: [reviewExists, read],
    update: [noMovieId, asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [noMovieId, asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}