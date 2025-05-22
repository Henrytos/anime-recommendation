var database = require("../database/config");

function findMany() {
  var query = "SELECT * FROM quizzes;";
  return database.execute(query);
}

function findById(quizId) {
  var query = `SELECT * FROM quizzes WHERE quiz_id = ${quizId};`;
  return database.execute(query);
}

function createResultQuiz(quizId, userId, animeId) {
  var query = `INSERT INTO quiz_result(fk_quiz_id, fk_user_id, fk_anime_id) VALUES(${quizId}, ${userId}, ${animeId});`;
  return database.execute(query);
}

module.exports = {
  findMany,
  findById,
  createResultQuiz,
};
