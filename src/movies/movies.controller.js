const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const adta = await service.read(movieId);
    if (data) {
        res.locals.movie = data;
        return next();
    }
    return next({status:404, message:'Cannot find movie.'})
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    if(isShowing) {
        const data = await service.listMoviesShowing();
        res.json({ data });
    } else {
        const data = await service.list();
        res.json({ data });
    }
}

async function read(req, res, next) {
    const {movieId} = req.params;
    const data = await service.read(movieId);
    res.json({ data });
}

module.exports = {
    list:[asyncErrorBoundary(list)],
    read:[asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
}