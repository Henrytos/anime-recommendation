var database = require("../database/config");

function auth(email, password) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    password
  );
  var instrucaoSql = `
        SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function findByEmail(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email
  );
  var instrucaoSql = `
        SELECT * FROM users WHERE email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
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
  var instrucaoSql = `
    INSERT INTO users(username, email, password_hash, avatar_url) VALUES ('${username}', '${email}', '${password}', '${avatar}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  create,
  findByEmail,
};
