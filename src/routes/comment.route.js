const express = require("express");
const { createCommentController } = require("../controllers/create-comment.controller");
const router = express.Router();

router.post("/", createCommentController)

module.exports = router;