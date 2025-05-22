const database = require("../database/config.js");

function findByAnimeId(animeId) {
  const query = `SELECT * FROM animes WHERE api_anime_id = ${animeId};`;

  return database.execute(query);
}

module.exports = {
  findByAnimeId,
};
