const database = require("../database/config.js");

function findManyRecommendations(userId) {
  const query = `SELECT title, image_url, anime_id, gender, target_audience FROM users_recommendations WHERE user_id = ${userId} ;`;
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
      COUNT(quiz_result.fk_anime_id) AS number,
      animes.gender
    FROM animes JOIN quiz_result
    ON animes.anime_id = quiz_result.fk_anime_id
    WHERE TIMESTAMPDIFF(DAY,quiz_result.created_at, NOW()) < 7 AND quiz_result.fk_user_id = ${userId}
    GROUP BY animes.gender, quiz_result.fk_user_id
    ORDER BY number DESC;`;

  return database.execute(query);
}


function findByUserMetricsComments(userId) {
  const query = `
SELECT
    comments.fk_user_id AS user_id,
    COUNT(*) AS 'quantity',
    CASE
      WHEN DAY(created_at) = DAY(NOW()) THEN "hoje"
      WHEN DAYNAME(created_at) = "Monday" THEN "segunda-feira"
      WHEN DAYNAME(created_at) = "Tuesday" THEN "terça-feira"
      WHEN DAYNAME(created_at) = "Wednesday" THEN "quarta-feira"
      WHEN DAYNAME(created_at) = "Thursday" THEN "quinta-feira"
      WHEN DAYNAME(created_at) = "Friday" THEN "sexta-feira"
      WHEN DAYNAME(created_at) = "Saturday" THEN "sábado"
      WHEN DAYNAME(created_at) = "Sunday" THEN "domingo"
    END AS date
    FROM comments
    WHERE TIMESTAMPDIFF(DAY,created_at, NOW()) < 7 AND comments.fk_user_id = ${userId}
    GROUP BY DAY(created_at), MONTH(created_at), date, fk_user_id
    ORDER BY MONTH(created_at) ASC, DAY(created_at) ASC;
  `

  return database.execute(query)
}


module.exports = {
  findManyRecommendations,
  findRecommendationLastWeekByUserId,
  findByUserMetricsQuizzes,
  findByUserMetricsMappings,
  findByUserMetricsComments
};
