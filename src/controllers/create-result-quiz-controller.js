const userModel = require("../models/user.model.js");
const animeModel = require("../models/anime.model.js");
const quizModel = require("../models/quiz.model.js");

function createResultQuizController(request, response) {
  const { quizId, userId, animeId } = request.body;

  const isBadRequestData =
    quizId == undefined || userId == undefined || animeId == undefined;

  if (isBadRequestData) {
    return response.status(400).json({
      message: "invalid data",
    });
  }

  userModel.findByUserId(userId).then((users) => {
    const isNotExistsUser = users.length == 0;
    if (isNotExistsUser) {
      return response.status(401).json({
        message: "unauthorized user",
      });
    }
  });

  animeModel.findByAnimeId(animeId).then((animes) => {
    const isNotExistsAnime = animes.length == 0;
    if (isNotExistsAnime) {
      return response.status(404).json({
        message: "not found anime",
      });
    }
  });

  quizModel.findById(quizId).then((quizzes) => {
    const isNotExistsQuiz = quizzes.length == 0;
    if (isNotExistsQuiz) {
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
