var express = require("express");
const {
  fetchQuizzesController,
} = require("../controllers/fetch-quizzes.controller");
var router = express.Router();

router.get("/", fetchQuizzesController);
module.exports = router;
