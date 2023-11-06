const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceMoviesTheaters = {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
}

async function list(req, res, next) {
    const data = await service.list();

    const theatersWithMovies = data.map(theater => {
        return {
            theater_id: theater.theater_id,
            name: theater.name,
            address_line_1: theater.address_line_1,
            address_line_2: theater.address_line_2,
            city: theater.city,
            state: theater.state,
            zip: theater.zip,
            created_at: theater.created_at,
            updated_at: theater.updated_at,
            movies: theater.movies.map(movie => {
                return {
                    movie_id: movie.movie_id,
                    title: movie.title,
                    runtime_in_minutes: movie.runtime_in_minutes,
                    rating: movie.rating,
                    description: movie.description,
                    image_url: movie.image_url,
                    created_at: movie.created_at,
                    updated_at: movie.updated_at,
                    is_showing: movie.is_showing,
                };
            }),
        };
    });

    res.json({ data: theatersWithMovies });
}

module.exports = {
    list: asyncErrorBoundary(list)
};