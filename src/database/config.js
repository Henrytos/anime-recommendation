var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

function execute(query) {
  if (
    process.env.AMBIENTE_PROCESSO !== "producao" &&
    process.env.AMBIENTE_PROCESSO !== "desenvolvimento"
  ) {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n"
    );
    return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
  }

  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);
    conexao.connect();
    conexao.query(query, function (error, results) {
      conexao.end();
      if (error) {
        reject(error);
      }
      console.log(results);
      resolve(results);
    });
    conexao.on("error", function (error) {
      return "ERRO NO MySQL SERVER: ", error.sqlMessage;
    });
  });
}

module.exports = {
  execute,
};
