const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const moviesRouter = require("../movies/movies.router")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router