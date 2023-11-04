const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const data = await service.read(movieId); // Fix the typo
    if (data) {
        res.locals.movie = data;
        return next();
    }
    return next({ status: 404, message: 'Cannot find movie.' });
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    let data;
  
    if (isShowing === "true") {
      // Handle showing movies
      data = await service.listMoviesShowing();
    } else {
      // Handle all movies
      data = await service.list();
    }
  
    res.json({ data });
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