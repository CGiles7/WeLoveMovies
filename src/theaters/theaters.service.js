const knex = require("../db/connection");

function list() {
    return knex("theaters as t")
        .select("t.*", "mt.movie_id as movie_id", "m.title as title", "m.runtime_in_minutes as runtime_in_minutes", "m.rating as rating", "m.description as description", "m.image_url as image_url", "m.created_at as created_at", "m.updated_at as updated_at", "mt.is_showing as is_showing")
        .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "=", "m.movie_id");
}

function listWithId(movieId) {
    return knex("theaters as t")
        .select("t.*", "mt.movie_id as movie_id", "m.title as title", "m.runtime_in_minutes as runtime_in_minutes", "m.rating as rating", "m.description as description", "m.image_url as image_url", "m.created_at as created_at", "m.updated_at as updated_at", "mt.is_showing as is_showing")
        .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "=", "m.movie_id")
        .where("mt.movie_id", Number(movieId));
}

module.exports = {
    list,
    listWithId,
};