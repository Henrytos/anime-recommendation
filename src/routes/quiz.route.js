const express = require("express");
const {
  fetchQuizzesController,
} = require("../controllers/fetch-quizzes.controller.js");
const {
  getQuizWithQuestionsController,
} = require("../controllers/get-quiz-with-questions-controller.js");
const {
  createResultQuizController,
} = require("../controllers/create-result-quiz-controller.js");

const router = express.Router();

router.get("/", fetchQuizzesController);
router.post("/result", createResultQuizController);
router.get("/:quizId", getQuizWithQuestionsController);

module.exports = router;
