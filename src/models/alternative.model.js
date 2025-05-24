const database = require("../database/config");

function findManyByQuestionId(quizId, questionId) {
  const query = `SELECT * FROM alternatives WHERE fk_quiz_id = ${quizId} AND fk_question_id = ${questionId}`;
  console.log(query)

  return database.execute(query);
}

// function fetch

module.exports = {
  findManyByQuestionId,
};
