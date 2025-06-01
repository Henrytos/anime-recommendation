const express = require("express");
const { createCommentController } = require("../controllers/create-comment.controller.js");
const { fetchCommentsByAnimeIdController } = require("../controllers/fetch-comments-by-anime-id.controller.js");

const router = express.Router();

router.post("/", createCommentController)
router.get("/:animeId", fetchCommentsByAnimeIdController)

module.exports = router;