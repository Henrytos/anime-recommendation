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

module.exports = {
  findManyRecommendations,
  findRecommendationLastWeekByUserId,
};
