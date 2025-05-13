const { findMany } = require("../models/quiz.model");

function fetchQuizzesController(request, response) {
  findMany().then((quizzes) => {
    return response.json({
      quizzes,
    });
  });
}

module.exports = { fetchQuizzesController };
