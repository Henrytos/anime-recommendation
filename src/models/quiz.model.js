var database = require("../database/config");

function findMany() {
  var query = "SELECT * FROM quizzes;";
  return database.execute(query);
}

module.exports = {
  findMany,
};
