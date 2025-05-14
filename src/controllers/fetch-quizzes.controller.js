const quizModel = require("../models/quiz.model");

function fetchQuizzesController(request, response) {
  quizModel.findMany().then((quizzes) => {
    return response.json({
      quizzes,
    });
  });
}

module.exports = { fetchQuizzesController };
