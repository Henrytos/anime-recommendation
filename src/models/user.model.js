const database = require("../database/config");

function auth(email, password) {
  const query = `
        SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}';
    `;
  ;

  return database.execute(query);
}

function findByEmail(email) {
  const query = `
        SELECT * FROM users WHERE email = '${email}';
    `;
  ;

  return database.execute(query);
}

function findByUserId(userId) {
  const query = `
        SELECT * FROM users WHERE user_id = '${userId}';
    `;
  ;

  return database.execute(query);
}

function create(username, email, password, avatar) {
  const query = `
    INSERT INTO users(username, email, password_hash, avatar_url) VALUES ('${username}', '${email}', '${password}', '${avatar}');
    `;
  ;

  return database.execute(query);
}


module.exports = {
  create,
  findByEmail,
  findByUserId,
};
