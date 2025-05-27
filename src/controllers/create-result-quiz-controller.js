const userModel = require("../models/user.model.js");
const animeModel = require("../models/anime.model.js");
const quizModel = require("../models/quiz.model.js");

async function createResultQuizController(request, response) {
  const { quizId, userId, animeId } = request.body;

  const isBadRequestData =
    quizId == undefined || userId == undefined || animeId == undefined;

  if (isBadRequestData) {
    return response.status(400).json({
      message: "invalid data",
    });
  }

  const users = await userModel.findByUserId(userId)
  const usersNotFound = users.length === 0

  if (usersNotFound) {
    return response.status(401).json({
      message: "unauthorized user",
    });
  }

  const animes = await animeModel.findByAnimeId(animeId)
  const animesNotFound = animes.length === 0

  if (animesNotFound) {
    return response.status(404).json({
      message: "not found anime",
    });
  }

  const quizzes = await quizModel.findById(quizId)
  const quizzesNotFound = quizzes.length === 0

  if (quizzesNotFound) {
    return response.status(404).json({
      message: "not found quiz",
    });
  }

  await quizModel.createResultQuiz(quizId, userId, animeId)
  return response.status(200).json({
    message: "create result quiz to user",
  });
}

module.exports = { createResultQuizController };
