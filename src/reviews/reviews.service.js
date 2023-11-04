const knex = require("../db/connection");

function list() {
    return knex("reviews").select("*");
}

function read(movieId) {
    return knex("reviews as r")
        .select("*")
        .join("critics as c", "r.critic_id", "=", "c.critic_id")
        .where("r.movie_id", Number(movieId));
}

function readReview(reviewId) {
    return knex("reviews as r")
        .select("*")
        .where("r.review_id", Number(reviewId))
        .first();
}

function update(updatedReview) {
    return knex("reviews as r")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview)
        .then(() => {
            return knex("reviews as r")
                .join("critics as c", "r.critic_id", "c.critic_id")
                .select(["r.*", "c.*"])
                .where("r.review_id", updatedReview.review_id);
        });
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
        .then((rowCount) => {
            if (rowCount === 0) {
                throw { status: 404, message: "Review cannot be found." };
            }
        });
}

module.exports = {
    list, 
    read,
    readReview,
    update,
    delete:destroy,
}