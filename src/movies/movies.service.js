const knex = require("../db/connection")

function list() {
    return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .select("movies.*")
    .where("movies_theaters.is_showing", true)
    .groupBy("movies.movie_id")
}

function read(movieId) {
   return knex("movies")
   .select("*")
   .where({
    movie_id: movieId
   })
   .first()
}

module.exports = {
    list,
    read
}