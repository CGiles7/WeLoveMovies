const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const movieData = await service.list()
    res.json({ data: movieData })
}

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movieNumber = Number(movieId);
    const movie = await service.read(movieNumber);
    if (movie) {
        res.locals.movie = movie;
        return next()
    }
    next({
        status: 404,
        message: `The Movie With Id ${req.params.movieId} Cannot Be Found.`
    })
}

async function read(req, res) {
    res.json({ data: res.locals.movie })
}

module.exports = {
    list,
    read: [movieExists, read],
    movieExists
}