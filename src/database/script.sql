CREATE DATABASE anime_recommendation;
USE anime_recommendation;

DROP DATABASE anime_recommendation;
DROP DATABASE anime_recommendation;
DROP TABLE IF EXISTS quiz_result;
DROP TABLE IF EXISTS alternatives;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS animes;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL UNIQUE,
    password_hash VARCHAR(${process.env.MYSQL_HASH_LENGTH}) NOT NULL,
    avatar_url VARCHAR(255) NOT NULL,
    CONSTRAINT chkEmail CHECK(email LIKE '%@%')
);

CREATE TABLE quizzes(
    quiz_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(255) NOT NULL,
    thumb_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)AUTO_INCREMENT = 1000;

CREATE TABLE animes(
    anime_id INT PRIMARY KEY, 
    title VARCHAR(255),
    image_url VARCHAR(500),
    target_audience VARCHAR(45) NOT NULL,
    gender VARCHAR(45) NOT NULL,
    score DECIMAL(4,2) NOT NULL DEFAULT 0
);

CREATE TABLE comments(
    comment_id INT AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    fk_anime_id INT,
    fk_user_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_composite PRIMARY KEY(comment_id, fk_anime_id, fk_user_id),
    CONSTRAINT fk_comment_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id),
    CONSTRAINT fk_comment_user FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
); 

CREATE TABLE questions(
    question_id INT AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    fk_quiz_id INT,
    CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id),
    CONSTRAINT fk_question_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes(quiz_id)
);

CREATE TABLE alternatives(
    alternative_id INT,
    title VARCHAR(100),
    description VARCHAR(255),
    image_url VARCHAR(500),
    gender VARCHAR(45) NOT NULL,
    target_audience VARCHAR(45) NOT NULL,
    fk_question_id INT,
    fk_quiz_id INT,
    
    CONSTRAINT pk_composite PRIMARY KEY(alternative_id, fk_question_id, fk_quiz_id),
    CONSTRAINT fk_alternative_question FOREIGN KEY (fk_question_id, fk_quiz_id) REFERENCES questions (question_id, fk_quiz_id)
);

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
