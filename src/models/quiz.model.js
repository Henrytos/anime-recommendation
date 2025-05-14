var database = require("../database/config");

function findMany() {
  var query = "SELECT * FROM quizzes;";
  return database.execute(query);
}

function findById(quizId) {
  var query = `SELECT * FROM quizzes WHERE quiz_id = ${quizId};`;
  return database.execute(query);
}

module.exports = {
  findMany,
  findById,
};
