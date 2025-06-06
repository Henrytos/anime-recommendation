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
    password_hash VARCHAR(45) NOT NULL,
    avatar_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chkEmail CHECK(email LIKE '%@%')
);

CREATE TABLE quizzes(
    quiz_id INT PRIMARY KEY AUTO_INCREMENT,
    thumb_url VARCHAR(255) NOT NULL,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_mapping BOOLEAN
) AUTO_INCREMENT = 1000;

CREATE TABLE animes(
    anime_id INT PRIMARY KEY AUTO_INCREMENT,
    anime_id INT,
    title VARCHAR(45),
    image_url VARCHAR(500),
    description VARCHAR(255),
    target_audience VARCHAR(45) NOT NULL,
    gender VARCHAR(45) NOT NULL
);

CREATE TABLE comments(
    comment_id INT,
    fk_anime_id INT,
    fk_user_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT pk_composite PRIMARY KEY(comment_id, fk_anime_id, fk_user_id),
    CONSTRAINT fk_comment_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id),
    CONSTRAINT fk_comment_user FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
);

CREATE TABLE questions(
    question_id INT AUTO_INCREMENT,
    fk_quiz_id INT,
    title VARCHAR(45) NOT NULL,
    number INT NOT NULL,
    CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id),
    CONSTRAINT fk_question_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes(quiz_id)
);

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
);

CREATE TABLE quiz_result(
  fk_user_id INT,
  fk_quiz_id INT,
  fk_anime_id INT,
  CONSTRAINT pk_composite PRIMARY KEY(fk_user_id, fk_quiz_id, fk_anime_id),
  CONSTRAINT quiz_result_user FOREIGN KEY (fk_user_id) REFERENCES users (user_id),
  CONSTRAINT quiz_result_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes (quiz_id),
  CONSTRAINT quiz_result_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id)
);

-- INSERINDO DADOS
INSERT INTO users (username, email, password_hash, avatar_url)
VALUES 
('henry_dev', 'henry@example.com', 'hashedpass123', 'https://example.com/avatar1.png'),
('nathalia_art', 'nathalia@example.com', 'securepass456', 'https://example.com/avatar2.png');

INSERT INTO quizzes (title, description, thumb_url, is_mapping)
VALUES 
('Qual anime combina com você?', 'Responda para saber qual anime é a sua cara.','https://m.media-amazon.com/images/S/pv-target-images/1a28caac129bed86dbf1fe3d474c2017379e39f5aac7082123ecc39ed6ce16b5.jpg', TRUE);

INSERT INTO animes (anime_id, title, image_url, description, target_audience, gender)
VALUES 
(101, 'Jujutsu Kaisen', 'https://example.com/jjk.jpg', 'Feiticeiros enfrentam maldições com ação intensa.', 'shounen', 'ação'),
(102, 'Kimi ni Todoke', 'https://example.com/knt.jpg', 'Romance delicado entre adolescentes.', 'shoujo', 'romance');

INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
VALUES 
(1, 1, 1, 'Anime incrível, cheio de ação!'),
(2, 2, 2, 'Muito fofo e emocionante.');

INSERT INTO questions (fk_quiz_id, title, number)
VALUES 
(1000, 'Qual estilo de anime você prefere?', 1),
(1000, 'Prefere ação ou romance?', 2);

INSERT INTO alternatives (alternative_id, title, description, image_url, is_correct, target_audience, gender, fk_question_id, fk_quiz_id)
VALUES 
(1, 'ISEKAI', 'histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5mrA2nP6KCjb4Hk2_gjZvwE7s8ED7xg6pg&s', TRUE, 'shounen', 'comédia', 1, 1000),
(2, 'SHOUNEN', 'caracterizado por histórias de ação, aventura e luta, com personagens muitas vezes motivados por objetivos importantes e que destacam valores como amizade, lealdade e coragem', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsi1ZgWlAzBWWDc3KPWJNIuHVTIIRZ_wO9hg&s', TRUE,'shounen', 'ação', 1, 1000),
(3, 'GORE', 'O gore é um dos subgêneros mais extremos do horror, proporcionando experiências chocantes e marcadas por um forte impacto visual e ..', 'https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg', TRUE, 'shounen', 'drama', 1, 1000),
(4, 'SPORTS', 'Anime onde enredo principal gira entorno de um esporte', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wXgz45gUcu4fiG6L3jkMq0BTaUhoR4y49A&s', TRUE, 'shounen', 'ação', 1, 1000),
(1, 'ISEKAI', 'histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5mrA2nP6KCjb4Hk2_gjZvwE7s8ED7xg6pg&s', TRUE, 'shounen', 'comédia', 2, 1000),
(2, 'SHOUNEN', 'caracterizado por histórias de ação, aventura e luta, com personagens muitas vezes motivados por objetivos importantes e que destacam valores como amizade, lealdade e coragem', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsi1ZgWlAzBWWDc3KPWJNIuHVTIIRZ_wO9hg&s', TRUE,'shounen', 'ação', 2, 1000),
(3, 'GORE', 'O gore é um dos subgêneros mais extremos do horror, proporcionando experiências chocantes e marcadas por um forte impacto visual e ..', 'https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg', TRUE, 'shounen', 'drama', 2, 1000),
(4, 'SPORTS', 'Anime onde enredo principal gira entorno de um esporte', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wXgz45gUcu4fiG6L3jkMq0BTaUhoR4y49A&s', TRUE, 'shounen', 'ação', 2, 1000);

INSERT INTO quiz_result (fk_user_id, fk_quiz_id, fk_anime_id)
VALUES 
(1, 1000, 1),
(2, 1000, 2);

SELECT * FROM questions;

SELECT * FROM alternatives;

SELECT 
    q.quiz_id AS quiz_id, 
    q.thumb_url AS quiz_thumb_url,	
    qt.number AS question_number,
    qt.question_id AS question_id, 
    qt.title AS question_title, 
    a.alternative_id AS alternative_id,
    a.title AS alternative_title,
    a.description AS alternative_description, 
    a.image_url AS alternative_image_url  
FROM quizzes AS q 
    JOIN questions AS qt 
        ON q.quiz_id = qt.fk_quiz_id 
    JOIN alternatives AS a 
        ON qt.question_id = a.fk_question_id AND qt.fk_quiz_id = a.fk_quiz_id
ORDER BY question_number;

DROP VIEW quiz_with_questions;

CREATE VIEW quiz_with_questions AS 
SELECT 
    q.quiz_id AS quiz_id, 
    q.thumb_url AS quiz_thumb_url,	
    qt.number AS question_number,
    qt.question_id AS question_id, 
    qt.title AS question_title, 
    a.alternative_id AS alternative_id,
    a.title AS alternative_title,
    a.description AS alternative_description, 
    a.image_url AS alternative_image_url  
FROM quizzes AS q 
    JOIN questions AS qt 
        ON q.quiz_id = qt.fk_quiz_id 
    JOIN alternatives AS a 
        ON qt.question_id = a.fk_question_id AND qt.fk_quiz_id = a.fk_quiz_id
ORDER BY question_number;


SELECT * FROM quiz_with_questions WHERE quiz_id = 1000;

SELECT * FROM quizzes;

SELECT * FROM users;

SELECT quiz_result.fk_user_id as user_id,title, image_url, anime_id FROM quiz_result JOIN animes ON quiz_result.fk_anime_id = animes.anime_id WHERE quiz_result.fk_user_id = 1;

CREATE VIEW users_recommendations AS SELECT quiz_result.fk_user_id as user_id,title, image_url, anime_id FROM quiz_result JOIN animes ON quiz_result.fk_anime_id = animes.anime_id;
DROP VIEW users_recommendations;

SELECT * FROM users_recommendations WHERE user_id = 1;


INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
VALUES
(DEFAULT, 40748, 1, 'Esse anime superou minhas expectativas!'),
(DEFAULT, 40748, 1, 'A animação e trilha sonora são incríveis.'),
(DEFAULT, 40748, 1, 'Gostei muito do desenvolvimento dos personagens.'),
(DEFAULT, 40748, 1, 'Recomendo para todos que curtem ação e aventura!');

SELECT * FROM comments;
SELECT users.user_id ,users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id as anime_id FROM users JOIN comments ON users.user_id = comments.fk_user_id JOIN animes ON animes.anime_id = comments.fk_anime_id;

CREATE VIEW users_comments AS SELECT users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id as anime_id FROM users JOIN comments ON users.user_id = comments.fk_user_id JOIN animes ON animes.anime_id = comments.fk_anime_id;
DROP VIEW users_comments;
ALTER VIEW users_comments AS SELECT users.user_id ,users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id as anime_id FROM users JOIN comments ON users.user_id = comments.fk_user_id JOIN animes ON animes.anime_id = comments.fk_anime_id;

SELECT * FROM users_comments;
SELECT  users.user_id ,users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id  FROM users_comments WHERE user_id = 1;


SELECT quiz_result.fk_user_id AS 'user_id',COUNT(fk_user_id) AS 'quantity', DAY(quiz_result.created_at) AS 'date' FROM quiz_result GROUP BY quiz_result.fk_user_id, DAY(quiz_result.created_at);

CREATE VIEW users_recommendations_last_week AS SELECT quiz_result.fk_user_id AS 'user_id',COUNT(fk_user_id) AS 'quantity', DAY(quiz_result.created_at) AS 'date' FROM quiz_result GROUP BY quiz_result.fk_user_id, DAY(quiz_result.created_at);

SELECT quantity, date FROM users_recommendations_last_week WHERE user_id = 1 LIMIT 7; 

SELECT * FROM users;
SELECT * FROM quizzes;
SELECT * FROM animes;

DESC quiz_result;

INSERT INTO quiz_result (fk_user_id, fk_quiz_id, fk_anime_id)
VALUES (1, 1000, 102);

SELECT quiz_result.fk_user_id AS 'user_id', COUNT(quiz_result.fk_user_id) AS total, animes.gender FROM animes JOIN quiz_result ON animes.anime_id = quiz_result.fk_anime_id GROUP BY quiz_result.fk_user_id, animes.gender;
CREATE VIEW users_mappings AS SELECT quiz_result.fk_user_id AS 'user_id', COUNT(quiz_result.fk_user_id) AS total, animes.gender FROM animes JOIN quiz_result ON animes.anime_id = quiz_result.fk_anime_id GROUP BY quiz_result.fk_user_id, animes.gender;
ALTER VIEW users_mappings AS SELECT quiz_result.fk_user_id AS 'user_id', COUNT(quiz_result.fk_user_id) AS total, animes.gender FROM animes JOIN quiz_result ON animes.anime_id = quiz_result.fk_anime_id GROUP BY quiz_result.fk_user_id, animes.gender; 
DROP VIEW users_mappings;

SELECT * FROM users_mappings;
SELECT * FROM users_mappings WHERE user_id = 1;


CREATE VIEW users_metrics_quizzes_week AS SELECT 
	fk_user_id AS user_id,
	COUNT(*) AS 'quantity', 
  CASE
  	WHEN DAY(created_at) = DAY(NOW()) THEN "hoje"
  	WHEN DAYNAME(created_at) = "Monday" THEN "segunda-feira"
    WHEN DAYNAME(created_at) = "Tuesday" THEN "quinta-feira"
    WHEN DAYNAME(created_at) = "Wednesday" THEN "quinta-feira"
    WHEN DAYNAME(created_at) = "Thursday" THEN "quinta-feira"
    WHEN DAYNAME(created_at) = "Friday" THEN "sexta-feira"
    WHEN DAYNAME(created_at) = "Saturday" THEN "sábado"
    WHEN DAYNAME(created_at) = "Sunday" THEN "domingo"
  END AS date
  FROM quiz_result 
  WHERE TIMESTAMPDIFF(DAY,created_at, NOW()) < 7 
  GROUP BY DAY(created_at), MONTH(created_at), date, fk_user_id 
  ORDER BY MONTH(created_at) DESC, DAY(created_at) DESC
  LIMIT 7;

CREATE VIEW users_metrics_mappings AS SELECT 
	quiz_result.fk_user_id AS 'user_id',
  COUNT(quiz_result.fk_anime_id) AS 'number' ,
  animes.target_audience, animes.gender, 
  (SELECT 
   	COUNT(animes.anime_id) 
   	FROM animes JOIN quiz_result 
   	ON animes.anime_id = quiz_result.fk_anime_id 
   	WHERE quiz_result.fk_user_id = 1) AS total  
  FROM animes JOIN quiz_result 
  ON animes.anime_id = quiz_result.fk_anime_id 
  GROUP BY animes.target_audience, animes.gender, quiz_result.fk_user_id;
  
SELECT 
	quiz_result.fk_user_id AS 'user_id',
  COUNT(quiz_result.fk_anime_id) AS 'number' ,
  animes.target_audience, animes.gender, 
  (SELECT 
   	COUNT(animes.anime_id) 
   	FROM animes JOIN quiz_result 
   	ON animes.anime_id = quiz_result.fk_anime_id 
   	WHERE quiz_result.fk_user_id = 1) AS total  
  FROM animes JOIN quiz_result 
  ON animes.anime_id = quiz_result.fk_anime_id 
  WHERE TIMESTAMPDIFF(DAY,quiz_result.created_at, NOW()) < 7 AND quiz_result.fk_user_id = 1
  GROUP BY animes.target_audience, animes.gender, quiz_result.fk_user_id;