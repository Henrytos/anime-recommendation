const database = require("../database/config");

function auth(email, password) {
  const query = `
        SELECT * FROM users WHERE email = '${email}' AND password_hash = SHA2('${password}', ${process.env.MYSQL_HASH_LENGTH});
    `;


  return database.execute(query);
}

function findByEmail(email) {
  const query = `
      SELECT * FROM users WHERE email = '${email}';
    `;


  return database.execute(query);
}

function findByUserId(userId) {
  const query = `
      SELECT * FROM users WHERE user_id = '${userId}';
    `;


  return database.execute(query);
}

function create(username, email, password, avatar) {
  const query = `
      INSERT INTO users(username, email, password_hash, avatar_url) VALUES ('${username}', '${email}', SHA2('${password}',${process.env.MYSQL_HASH_LENGTH}), '${avatar}');
    `;


  return database.execute(query);
}

function getEngagementByUserId(userId) {
  const query = `
      SELECT
      users.user_id,
      (SELECT COUNT(comments.comment_id) FROM comments WHERE comments.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, comments.created_at, NOW()) < 7) AS quantity_comments,
      (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, quiz_result.created_at, NOW()) < 7) AS quantity_recommendation,
      IFNULL(TRUNCATE(
        ((
          (SELECT COUNT(comments.comment_id) FROM comments WHERE comments.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, comments.created_at, NOW()) < 7)
          +
          (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, quiz_result.created_at, NOW()) < 7)
        ) / ( (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, quiz_result.created_at, NOW()) < 7) * 2 ) * 100)
      , 2), 0) AS percentage_current,
      (
        (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id AND TIMESTAMPDIFF(DAY, quiz_result.created_at, NOW()) < 7) * 2
      ) AS percentage_full
      FROM users
      WHERE users.user_id = ${userId};
    `;

  return database.execute(query)
}

function findManyPointsByUsers() {
  const query = `
    SELECT 
      users.user_id,
      users.username,
      (SELECT COUNT(comments.comment_id) FROM comments WHERE comments.fk_user_id = users.user_id) AS quantity_comments,
      (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id) AS quantity_recommendations,
      (
        (SELECT COUNT(comments.comment_id) FROM comments WHERE comments.fk_user_id = users.user_id) * 2
        +
        (SELECT COUNT(quiz_result.quiz_result_id) FROM quiz_result WHERE quiz_result.fk_user_id = users.user_id) * 10
      ) AS total_points
    FROM users
    ORDER BY total_points DESC
  `;

  return database.execute(query)
}

module.exports = {
  create,
  findByEmail,
  findByUserId,
  auth,
  getEngagementByUserId,
  findManyPointsByUsers
};
