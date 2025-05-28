const database = require("../database/config");

function getQuizWithQuestionsAlternative() {
  const query = `
 SELECT
	quizzes.quiz_id AS 'quiz_id',
  quizzes.title AS 'quiz_title',
  questions.question_id AS 'question_id',
  questions.title AS 'question_title',
	questions.number AS 'question_number',
  alternatives.alternative_id AS 'alternative_id',
  alternatives.fk_question_id AS 'alternative_question_id',
	alternatives.fk_quiz_id AS 'alternative_quiz_id',
	alternatives.title AS 'alternative_title',
  alternatives.description AS 'alternative_description',
  alternatives.target_audience AS 'alternative_target_audience',
  alternatives.gender AS 'alternative_gender',
  alternatives.image_url AS 'alternative_image_url'
FROM quizzes
	JOIN questions ON quizzes.quiz_id = questions.fk_quiz_id
  JOIN alternatives ON alternatives.fk_question_id = questions.question_id AND alternatives.fk_quiz_id = quizzes.quiz_id
  WHERE quizzes.quiz_id = 1000
  ORDER BY number;
  `;

  return database.execute(query);
}

module.exports = { getQuizWithQuestionsAlternative };
