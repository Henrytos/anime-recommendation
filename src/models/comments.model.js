const database = require("../database/config.js");

function findManyComments(userId) {
    const query = `
        SELECT user_id ,username, avatar_url, description, time_relative, anime_id
        FROM users_comments WHERE user_id = ${userId} ;
    `;


    return database.execute(query);
}

function findManyByAnimeId(animeId) {
    const query = `SELECT user_id ,username, avatar_url, description, time_relative, anime_id FROM users_comments WHERE anime_id = ${animeId};`

    return database.execute(query);
}

function createComment(userId, animeId, description) {
    const query = `
        INSERT INTO comments (comment_id,  fk_user_id, fk_anime_id, description)
        VALUES (DEFAULT,  ${userId}, ${animeId},'${description}')
    `

    return database.execute(query)
}


module.exports = {
    findManyComments,
    createComment,
    findManyByAnimeId
};
