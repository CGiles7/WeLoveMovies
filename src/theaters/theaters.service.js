const knex = require("../db/connection");

function list() {
    return knex("theaters as t")
        .select("*")
        .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "=", "m.movie_id");
}

function listId(movieId) {
    return knex("theaters as t")
        .select("t.*")
        .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id")
        .where("mt.movie_id", Number(movieId));
}

module.exports = {
    list,
    listId,
}