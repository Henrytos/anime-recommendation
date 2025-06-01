const { createConnection } = require("mysql2/promise.js");

async function createTablesInDatabase() {
  const client = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });
  console.log("connect mysql ✅");


  const queryToDropQuizResultsTable = "DROP TABLE IF EXISTS quiz_result;";
  const queryToDropAlternativesTable = "DROP TABLE IF EXISTS alternatives;";
  const queryToDropQuestionsTable = "DROP TABLE IF EXISTS questions;";
  const queryToDropCommentsTable = "DROP TABLE IF EXISTS comments;";
  const queryToDropQuizzesTable = "DROP TABLE IF EXISTS quizzes;";
  const queryToDropAnimesTable = "DROP TABLE IF EXISTS animes;";
  const queryToDropUserTable = "DROP TABLE IF EXISTS users;";

  await client.query(queryToDropQuizResultsTable);
  await client.query(queryToDropAlternativesTable);
  await client.query(queryToDropQuestionsTable);
  await client.query(queryToDropCommentsTable);
  await client.query(queryToDropQuizzesTable);
  await client.query(queryToDropAnimesTable);
  await client.query(queryToDropUserTable);

  console.log("remove tables in anime recommendation ✅");

  const queryToCreateUserTable = `
    CREATE TABLE users(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL, 
        email VARCHAR(45) NOT NULL UNIQUE,
        password_hash VARCHAR(512) NOT NULL,
        avatar_url VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT chkEmail CHECK(email LIKE '%@%')
    );
  `;

  const queryToCreateQuizzesTable = `
    CREATE TABLE quizzes(
        quiz_id INT PRIMARY KEY AUTO_INCREMENT,
        thumb_url VARCHAR(255) NOT NULL,
        title VARCHAR(45) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_mapping BOOLEAN
    )AUTO_INCREMENT = 1000;
  `;
  const queryToCreateAnimesTable = `
    CREATE TABLE animes(
        anime_id INT PRIMARY KEY, 
        title VARCHAR(255),
        image_url VARCHAR(500),
        description TEXT,
        target_audience VARCHAR(45) NOT NULL,
        gender VARCHAR(45) NOT NULL,
        score DECIMAL(4,2) DEFAULT 0
        );
    `;

  const queryToCreateCommentsTable = `
    CREATE TABLE comments(
        comment_id INT AUTO_INCREMENT,
        fk_anime_id INT,
        fk_user_id INT, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description VARCHAR(255) NOT NULL,
        CONSTRAINT pk_composite PRIMARY KEY(comment_id, fk_anime_id, fk_user_id),
        CONSTRAINT fk_comment_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id),
        CONSTRAINT fk_comment_user FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
    );`;

  const queryToCreateQuestionsTable = `
    CREATE TABLE questions(
        question_id INT AUTO_INCREMENT,
        fk_quiz_id INT,
        title VARCHAR(100) NOT NULL,
        number INT NOT NULL,
        CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id),
        CONSTRAINT fk_question_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes(quiz_id)
    );`;
  const queryToCreateAlternativesTable = `
    CREATE TABLE alternatives(
        alternative_id INT,
        title VARCHAR(100),
        description VARCHAR(255),
        image_url VARCHAR(500),
        is_correct BOOLEAN,
        target_audience VARCHAR(45) NOT NULL,
        gender VARCHAR(45) NOT NULL,
        fk_question_id INT,
        fk_quiz_id INT,
        
        CONSTRAINT pk_composite PRIMARY KEY(alternative_id, fk_question_id, fk_quiz_id),
        CONSTRAINT fk_alternative_question FOREIGN KEY (fk_question_id, fk_quiz_id) REFERENCES questions (question_id, fk_quiz_id)
    );`;

  const queryToCreateQuizResult = `
    CREATE TABLE quiz_result(
      quiz_result_id INT AUTO_INCREMENT,
      fk_user_id INT,
      fk_quiz_id INT,
      fk_anime_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT pk_composite PRIMARY KEY(quiz_result_id,fk_user_id, fk_quiz_id, fk_anime_id),
      CONSTRAINT quiz_result_user FOREIGN KEY (fk_user_id) REFERENCES users (user_id),
      CONSTRAINT quiz_result_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes (quiz_id),
      CONSTRAINT quiz_result_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id)
    );

`;

  await client.query(queryToCreateUserTable);
  console.log("create table users  ✅");

  await client.query(queryToCreateQuizzesTable);
  console.log("create table quizzes ✅");

  await client.query(queryToCreateAnimesTable);
  console.log("create table animes ✅");

  await client.query(queryToCreateCommentsTable);
  console.log("create table comments ✅");

  await client.query(queryToCreateQuestionsTable);
  console.log("create table questions ✅");

  await client.query(queryToCreateAlternativesTable);
  console.log("create table alternatives ✅");

  await client.query(queryToCreateQuizResult);
  console.log("create table quiz_result ✅");

  console.log("create table to anime recommendation ✅");

  await client.end();
  console.log("disconnect mysql ✅");
  return true;
}

createTablesInDatabase();
