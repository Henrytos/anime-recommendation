const userModel = require("../models/user.model.js");
const animeModel = require("../models/anime.model.js");
const quizModel = require("../models/quiz.model.js");

function createResultQuizController(request, response) {
  const { quizId, userId, animeId } = request.body;

  userModel.findByUserId(userId).then((users) => {
    if (users.length == 0) {
      return response.status(401).json({
        message: "unauthorized user",
      });
    }
  });

  animeModel.findByAnimeId(animeId).then((animes) => {
    if (animes.length == 0) {
      return response.status(404).json({
        message: "not found anime",
      });
    }
  });

  quizModel.findById(quizId).then((quizzes) => {
    if (quizzes.length == 0) {
      return response.status(404).json({
        message: "not found quiz",
      });
    }
  });

  quizModel.createResultQuiz(quizId, userId, animeId).then(() => {
    return response.status(200).json({
      message: "create result quiz to user",
    });
  });
}

module.exports = { createResultQuizController };
