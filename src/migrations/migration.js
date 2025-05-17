const { createConnection } = require("mysql2/promise.js")

async function createTablesInDatabase() {
    const client = await createConnection({
        host: "localhost",
        user: "docker",
        password: "docker",
        database: "docker",
        port: 3306,
    })
    const queryDropUserTable = "DROP TABLE IF EXISTS users;"
    const queryDropQuizzesTable = "DROP TABLE IF EXISTS quizzes;"
    const queryDropAnimesTable = "DROP TABLE IF EXISTS animes;"
    const queryDropAlternativesTable = "DROP TABLE IF EXISTS alternatives;"
    const queryDropCommentsTable = "DROP TABLE IF EXISTS comments;"
    const queryDropQuestionsTable = "DROP TABLE IF EXISTS questions;"

    await client.query(queryDropAlternativesTable)
    await client.query(queryDropQuestionsTable)
    await client.query(queryDropCommentsTable)
    await client.query(queryDropQuizzesTable)
    await client.query(queryDropAnimesTable)
    await client.query(queryDropUserTable)

    console.log("Tabelas removidas com sucesso!")

    const queryCreatedUserTable = `
    CREATE TABLE users(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL, 
        email VARCHAR(45) NOT NULL UNIQUE,
        password_hash VARCHAR(45) NOT NULL,
        avatar_url VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT chkEmail CHECK(email LIKE '%@%')
    );
  `
    const queryCreatedQuizzesTable = `
    CREATE TABLE quizzes(
        quiz_id INT PRIMARY KEY AUTO_INCREMENT,
        thumb_url VARCHAR(255) NOT NULL,
        title VARCHAR(45) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_mapping BOOLEAN
    )AUTO_INCREMENT = 1000;
  `
    const queryCreatedAnimesTable = `
    CREATE TABLE animes(
        anime_id INT PRIMARY KEY AUTO_INCREMENT,
        api_anime_id INT, 
        title VARCHAR(45),
        image_url VARCHAR(500),
        description VARCHAR(255),
        target_audience VARCHAR(45) NOT NULL,
        gender VARCHAR(45) NOT NULL,
        CONSTRAINT chk_target_audience CHECK(target_audience IN ('kodomo', 'shounen', 'shoujo', 'seinen', 'josei')),
        CONSTRAINT chk_gender CHECK(gender IN ('ação', 'aventura', 'romance', 'comédia', 'slice of Life', 'drama'))
      );
    `

    const queryCreatedCommentsTable = `
    CREATE TABLE comments(
        comment_id INT,
        fk_anime_id INT,
        fk_user_id INT, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description VARCHAR(255) NOT NULL,
        CONSTRAINT pk_composite PRIMARY KEY(comment_id, fk_anime_id, fk_user_id),
        CONSTRAINT fk_comment_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id),
        CONSTRAINT fk_comment_user FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
    );`

    const queryCreatedQuestionsTable = `
    CREATE TABLE questions(
        question_id INT AUTO_INCREMENT,
        fk_quiz_id INT,
        title VARCHAR(45) NOT NULL,
        number INT NOT NULL,
        CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id),
        CONSTRAINT fk_question_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes(quiz_id)
    );`
    const queryCreatedAlternativesTable = `
    CREATE TABLE alternatives(
        alternative_id INT,
        title VARCHAR(45),
        description VARCHAR(255),
        image_url VARCHAR(500),
        is_correct BOOLEAN,
        target_audience VARCHAR(45) NOT NULL,
        gender VARCHAR(45) NOT NULL,
        fk_question_id INT,
        fk_quiz_id INT,
        
        CONSTRAINT chk_alternative_audience CHECK(target_audience IN ('kodomo', 'shounen', 'shoujo', 'seinen', 'josei')),
        CONSTRAINT chk_alternative_gender CHECK(gender IN ('ação', 'aventura', 'romance', 'comédia', 'slice of Life', 'drama')),
        CONSTRAINT pk_composite PRIMARY KEY(alternative_id, fk_question_id, fk_quiz_id),
        CONSTRAINT fk_alternative_question FOREIGN KEY (fk_question_id, fk_quiz_id) REFERENCES questions (question_id, fk_quiz_id)
    );`

    await client.query(queryCreatedUserTable)
    await client.query(queryCreatedQuizzesTable)
    await client.query(queryCreatedAnimesTable)
    await client.query(queryCreatedCommentsTable)
    await client.query(queryCreatedQuestionsTable)
    await client.query(queryCreatedAlternativesTable)
    console.log("Tabelas criadas com sucesso!")

    await client.end()
    console.log("Conexão encerrada com sucesso!")

    return true
}

createTablesInDatabase()