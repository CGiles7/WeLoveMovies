const service = require("./movies.service");
const theatersService = require("../theaters/theaters.service");
const reviewsService = require("../reviews/reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const data = await service.read(movieId);

    if (data) {
        res.locals.movie = data;
        return next();
    } else {
        return next({ status: 404, message: 'Movie cannot be found.' });
    }
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;

    if (isShowing === true) {
        const data = await service.listMoviesShowing();
        res.json({ data });
    } else {
        const data = await service.list();
        res.json({ data });
    }
}

async function read(req, res, next) {
    const { movieId } = req.params; // Use req.params to get movieId
    const data = await service.read(movieId);
    res.json({ data });
  }  

  async function listTheatersForMovie(req, res, next) {
    const { movieId } = req.params; // Use req.params to get movieId
    const data = await theatersService.listTheatersForMovie(movieId);
    res.json({ data });
  }
  

  async function listReviewsForMovie(req, res, next) {
    const { movieId } = req.params; // Use req.params to get movieId
    const data = await reviewsService.listReviewsWithCritic(movieId); // Update the service function to get reviews with critic
    res.json({ data });
  }
  

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheatersForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersForMovie)],
    listReviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsForMovie)],
};