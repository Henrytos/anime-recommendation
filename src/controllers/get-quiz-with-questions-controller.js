const view = require("../models/view.model");

function getQuizWithQuestionsController(request, response) {
  const quizId = request.params.quizId;

  view.getQuizWithQuestionsAlternative(quizId).then((result) => {
    return response.status(200).json();
  });
}

module.exports = { getQuizWithQuestionsController };
