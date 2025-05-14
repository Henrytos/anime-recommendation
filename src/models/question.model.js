var database = require("../database/config");

function findManyByQuizId(quizId) {
  var query = `SELECT * FROM questions WHERE fk_quiz_id =${quizId}`;
  return database.execute(query);
}

module.exports = {
  findManyByQuizId,
};
