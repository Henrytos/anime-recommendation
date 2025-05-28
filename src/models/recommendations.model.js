const database = require("../database/config.js");

function findManyRecommendations(userId) {
  const query = `SELECT title, image_url, anime_id FROM users_recommendations WHERE user_id = ${userId};`;
  ;

  return database.execute(query);
}

function findRecommendationLastWeekByUserId(userId) {
  const query = `
    SELECT quantity, date FROM users_recommendations_last_week WHERE user_id = ${userId} LIMIT 7;
  `
    ;

  return database.execute(query);
}

function findByUserMetricsQuizzes(userId) {
  const query = `
    SELECT quantity, date FROM users_metrics_quizzes_week WHERE user_id = ${userId}
  `
    ;

  return database.execute(query);
}

function findByUserMetricsMappings(userId) {
  const query = `
    SELECT
      COUNT(quiz_result.fk_anime_id) AS 'number' ,
      animes.target_audience, animes.gender,
      (
        SELECT
          COUNT(animes.anime_id)
        FROM animes JOIN quiz_result
        ON animes.anime_id = quiz_result.fk_anime_id
        WHERE quiz_result.fk_user_id = 1
      ) AS total
    FROM animes JOIN quiz_result
    ON animes.anime_id = quiz_result.fk_anime_id
    WHERE TIMESTAMPDIFF(DAY,quiz_result.created_at, NOW()) < 7 AND quiz_result.fk_user_id = 1
    GROUP BY animes.target_audience, animes.gender, quiz_result.fk_user_id;`;

  return database.execute(query);
}


module.exports = {
  findManyRecommendations,
  findRecommendationLastWeekByUserId,
  findByUserMetricsQuizzes,
  findByUserMetricsMappings
};
