const database = require("../database/config.js");

function findManyRecommendations(userId) {
  const query = `SELECT title, image_url, api_anime_id FROM users_recommendations WHERE user_id = ${userId};`;
  console.log("query", query);

  return database.execute(query);
}

module.exports = {
  findManyRecommendations,
};
