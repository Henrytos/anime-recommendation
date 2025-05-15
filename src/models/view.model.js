const database = require("../database/config");

function getQuizWithQuestionsAlternative(quizId) {
  const query = ` SELECT * FROM quiz_with_questions WHERE quiz_id = ${quizId}`;

  return database.execute(query);
}

module.exports = { getQuizWithQuestionsAlternative };
