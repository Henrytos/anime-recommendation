const database = require("../database/config");

function findMany() {
  const query = `
    SELECT
      quiz_id,
      thumb_url,
      title,
      description ,
      CASE
        WHEN TIMESTAMPDIFF(DAY, created_at, NOW()) = 0  THEN 'Hoje'
       WHEN TIMESTAMPDIFF(DAY, created_at, NOW()) = 1 THEN 'Ontem'
        ELSE CONCAT('Há ',TIMESTAMPDIFF(DAY, created_at, NOW()), ' Dias Atrás')
      END AS how_long_in_days
    FROM quizzes
    ORDER BY created_at;
  `;

  return database.execute(query);
}

function findById(quizId) {
  const query = `SELECT * FROM quizzes WHERE quiz_id = ${quizId};`;

  return database.execute(query);
}

function createResultQuiz(quizId, userId, animeId) {
  const query = `INSERT INTO quiz_result(fk_quiz_id, fk_user_id, fk_anime_id) VALUES(${quizId}, ${userId}, ${animeId});`;

  return database.execute(query);
}

module.exports = {
  findMany,
  findById,
  createResultQuiz,
};
