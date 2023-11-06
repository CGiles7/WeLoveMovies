const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listMoviesShowing() {
    return knex("movies as m")
      .select("m.*")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where("mt.is_showing", true) // Filter movies that are showing
      .groupBy("m.movie_id")
      .orderBy("m.movie_id");
  }  

function read(movieId) {
    return knex("movies as m")
    .select("*")
    .where("m.movie_id", Number(movieId))
    .first();
}

module.exports = {
    list, 
    listMoviesShowing,
    read,
};