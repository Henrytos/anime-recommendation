const database = require("../database/config");

function findManyByQuizId(quizId) {
  const query = `SELECT * FROM questions WHERE fk_quiz_id =${quizId}`;
  ;

  return database.execute(query);
}

module.exports = {
  findManyByQuizId,
};
