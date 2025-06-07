const database = require("../database/config.js");

function findByAnimeId(animeId) {
  const query = `SELECT * FROM animes WHERE anime_id = ${animeId};`;

  return database.execute(query);
}

function findMany() {
  const query = `SELECT * FROM animes ORDER BY score DESC;`;

  return database.execute(query);
}

function create(anime_id, title, image_url, target_audience, gender, score) {
  const query = `
    INSERT INTO animes (anime_id, title, image_url, target_audience, gender, score)
    VALUES (${anime_id}, '${title}', '${image_url}', '${target_audience}', '${gender}', ${score});
    `
  console.log(query)

  return database.execute(query)
}

module.exports = {
  findByAnimeId,
  findMany,
  create
};
