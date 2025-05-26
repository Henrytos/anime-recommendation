const database = require("../database/config.js");

function findManyComments(userId) {
    const query = `
    SELECT user_id ,username, avatar_url, description, created_at, anime_id
    FROM users_comments WHERE user_id = ${userId};
    `;
    console.log(query);

    return database.execute(query);
}

module.exports = {
    findManyComments,
};
