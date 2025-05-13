var database = require("../database/config");

function auth(email, password) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    password
  );
  var query = `
        SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}';
    `;
  console.log("Executando a instrução SQL: \n" + query);
  return database.execute(query);
}

function findByEmail(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email
  );
  var query = `
        SELECT * FROM users WHERE email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + query);
  return database.execute(query);
}

// Coloque os mesmos parâmetros aqui. Vá para a var query
function create(username, email, password, avatar) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    username,
    email,
    password,
    avatar
  );

  // Insira exatamente a query do banco aqui, lembrando da usernamenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var query = `
    INSERT INTO users(username, email, password_hash, avatar_url) VALUES ('${username}', '${email}', '${password}', '${avatar}');
    `;
  console.log("Executando a instrução SQL: \n" + query);
  return database.execute(query);
}

module.exports = {
  create,
  findByEmail,
};
