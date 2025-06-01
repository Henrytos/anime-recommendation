const environment = "production";

const path_env = environment === "production" ? ".env" : ".env.dev";

require("dotenv").config({ path: path_env });

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

const app = express();

const userRouter = require("./src/routes/user.route.js");
const commentRouter = require("./src/routes/comment.route.js")
const quizRouter = require("./src/routes/quiz.route.js");
const animeRouter = require("./src/routes/anime.route.js")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/quiz", quizRouter);
app.use("/animes", animeRouter);

app.listen(PORT_APP, function () {
  console.log("Conectando em:", process.env.DB_HOST);

  console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORT_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
