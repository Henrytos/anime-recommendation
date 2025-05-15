const { findManyByQuizId } = require("../models/question.model");
const quizModel = require("../models/quiz.model");

function getQuizWithQuestionsController(request, response) {
  const quizId = request.params.quizId;

  quizModel.findById(quizId).then((quizzes) => {
    if (quizzes.length == 0) {
      return response.status(404).json({
        message: "not found",
      });
    }

    findManyByQuizId(quizId).then((questions) => {
      const quiz = quizzes[0];
      return response.status(200).json({
        ...quiz,
        questions,
      });
    });
  });
}

module.exports = { getQuizWithQuestionsController };
