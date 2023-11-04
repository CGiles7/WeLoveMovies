const express = require("express");
const router = express.Router();
const controller = require("./movies.controller");

router.route("/").get(controller.list);
router.route("/:movieId").get(controller.read);
router.route("/:movieId/theaters").get(controller.listTheatersForMovie);
router.route("/:movieId/reviews").get(controller.listReviewsForMovie);

module.exports = router;