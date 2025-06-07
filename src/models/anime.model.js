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

function getPopularAnime() {
  const query = `
    SELECT fk_anime_id AS anime_id, COUNT(fk_anime_id) AS quantity_recommendation, animes.title
		FROM quiz_result
    JOIN animes ON quiz_result.fk_anime_id = animes.anime_id
    GROUP BY fk_anime_id , animes.anime_id
    ORDER BY quantity_recommendation DESC LIMIT 1;
  `

  return database.execute(query)
}

module.exports = {
  findByAnimeId,
  findMany,
  create,
  getPopularAnime
};
