const database = require("../database/config.js");

function findByAnimeId(animeId) {
  const query = `SELECT * FROM animes WHERE anime_id = ${animeId};`;

  return database.execute(query);
}

function findMany() {
  const query = `SELECT * FROM animes;`;

  return database.execute(query);

}

module.exports = {
  findByAnimeId,
  findMany
};
