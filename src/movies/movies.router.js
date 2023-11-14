const router = require("express").Router({mergeParams: true})
const controller = require("./movies.controller")
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors");

router.use(cors())
router.use("/:movieId/theaters", theatersRouter).all(methodNotAllowed);
router.use("/:movieId/reviews", reviewsRouter).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router