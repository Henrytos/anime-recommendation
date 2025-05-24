const database = require("../database/config.js");

function findManyComments(userId) {
    const query = `
        SELECT  
        users.user_id ,users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id  
        FROM users_comments WHERE user_id = ${userId};
    `;
    console.log("query", query);

    return database.execute(query);
}

module.exports = {
    findManyComments,
};
