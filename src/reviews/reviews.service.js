const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")
const mapProperties = require("../utils/map-properties");

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first()
}

async function list(movie_id) {
  return knex("reviews").where({ movie_id }).then((reviews) => Promise.all(reviews.map(addCritic)))
}

async function addCritic(review) {
  review.critic = await readCritic(review.critic_id) 
  return review;
}

async function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review)
    .returning("*")
    .then(() => read(review.review_id))
    .then(addCritic);
}

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where({review_id: reviewId})
      .first()
}

function destroy(reviewId) {
    return knex('reviews')
      .where({"review_id": reviewId})
      .del()
}

module.exports = {
    list,
    read,
    update,
    destroy
}