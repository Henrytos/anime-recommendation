CREATE DATABASE anime_recommendation;
USE anime_recommendation;
DROP DATABASE anime_recommendation;

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
)AUTO_INCREMENT = 1000;

CREATE TABLE mappings(
  mapping_id INT PRIMARY KEY AUTO_INCREMENT, 
  target_audience VARCHAR(45) NOT NULL,
  gender VARCHAR(45) NOT NULL,
  studio VARCHAR(45) NOT NULL,
  type_duration VARCHAR(45) NOT NULL,
  type_style VARCHAR(45) NOT NULL,
  CONSTRAINT chk_target_audience CHECK(target_audience IN ('kodomo', 'shounen', 'shoujo', 'seinen', 'josei')),
  CONSTRAINT chk_gender CHECK(gender IN ('ação', 'aventura', 'romance', 'comédia', 'slice of Life', 'drama')),
  CONSTRAINT chk_studio CHECK(studio IN ('mappa', 'ghibli', 'ufotable', 'toei')),
  CONSTRAINT chk_type_duration CHECK(type_duration IN ('curto', 'médio', 'longo')),
  CONSTRAINT chk_type_style CHECK(type_style IN ('realista', 'cartunesco', '3d', 'nostálgico'))
)AUTO_INCREMENT=2000;

CREATE TABLE animes(
  anime_id INT,
  api_anime_id INT, 
  fk_mapping_id INT,
  title VARCHAR(45),
  image_url VARCHAR(255),
  description VARCHAR(255),
  CONSTRAINT pk_composite PRIMARY KEY(anime_id, api_anime_id, fk_mapping_id),
  CONSTRAINT fk_anime_mapping FOREIGN KEY (fk_mapping_id) REFERENCES mappings(mapping_id)
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
  tilte VARCHAR(45) NOT NULL,
  number INT NOT NULL,
  CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id),
  CONSTRAINT fk_question_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes(quiz_id)
);

CREATE TABLE alternatives(
  alternative_id INT,
  fk_mapping_id INT,
  title VARCHAR(45),
  description VARCHAR(255),
  image_url VARCHAR(45),
  is_correct BOOLEAN,
  CONSTRAINT pk_composite PRIMARY KEY(alternative_id, fk_mapping_id),
  CONSTRAINT fk_alternative_mapping FOREIGN KEY (fk_mapping_id) REFERENCES mappings(mapping_id)
);

CREATE TABLE options(
  fk_alternative_id INT, 
  fk_question_id INT,
  fk_quiz_id INT,
  CONSTRAINT pk_composite PRIMARY KEY(fk_alternative_id, fk_question_id, fk_quiz_id),
  CONSTRAINT fk_option_alternative FOREIGN KEY (fk_alternative_id) REFERENCES alternatives (alternative_id),
  CONSTRAINT fk_option_question FOREIGN KEY (fk_question_id) REFERENCES questions (question_id),
  CONSTRAINT fk_option_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes (quiz_id)
);


CREATE TABLE quiz_result(
  fk_user_id INT,
  fk_quiz_id INT,
  fk_anime_id INT,
  fk_mapping_id INT,
  CONSTRAINT pk_composite PRIMARY KEY(fk_user_id, fk_quiz_id, fk_anime_id, fk_mapping_id),
  CONSTRAINT quiz_result_user FOREIGN KEY (fk_user_id) REFERENCES users (user_id),
  CONSTRAINT quiz_result_quiz FOREIGN KEY (fk_quiz_id) REFERENCES quizzes (quiz_id),
  CONSTRAINT quiz_result_anime FOREIGN KEY (fk_anime_id) REFERENCES animes (anime_id),
  CONSTRAINT quiz_result_mapping FOREIGN KEY (fk_mapping_id) REFERENCES mappings (mapping_id)
);

-- INSERINDO DADOS
INSERT INTO users (username, email, password_hash, avatar_url)
VALUES 
('henry_dev', 'henry@example.com', 'hashedpass123', 'https://example.com/avatar1.png'),
('nathalia_art', 'nathalia@example.com', 'securepass456', 'https://example.com/avatar2.png');

INSERT INTO quizzes (title, description, is_mapping)
VALUES 
('Qual anime combina com você?', 'Responda para saber qual anime é a sua cara.', TRUE);

INSERT INTO mappings (target_audience, gender, studio, type_duration, type_style)
VALUES 
('shounen', 'ação', 'mappa', 'médio', 'realista'),
('shoujo', 'romance', 'ghibli', 'curto', 'nostálgico');

INSERT INTO animes (anime_id, api_anime_id, fk_mapping_id, title, image_url, description)
VALUES 
(1, 101, 2000, 'Jujutsu Kaisen', 'https://example.com/jjk.jpg', 'Feiticeiros enfrentam maldições com ação intensa.'),
(2, 102, 2001, 'Kimi ni Todoke', 'https://example.com/knt.jpg', 'Romance delicado entre adolescentes.');

INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
VALUES 
(1, 1, 1, 'Anime incrível, cheio de ação!'),
(2, 2, 2, 'Muito fofo e emocionante.');


DESC questions;
INSERT INTO questions (question_id, fk_quiz_id, tilte, number)
VALUES 
(DEFAULT, 1000, 'Qual gênero você prefere?', 1),
(DEFAULT,1000, 'Prefere ação ou romance?', 2);

INSERT INTO alternatives (alternative_id, fk_mapping_id, title, description, image_url, is_correct)
VALUES 
(1, 2000, 'Ação Intensa', 'Gosta de cenas eletrizantes', 'https://example.com/action.jpg', TRUE),
(2, 2001, 'Romance Fofo', 'Prefere histórias de amor', 'https://example.com/romance.jpg', TRUE);

INSERT INTO options (fk_alternative_id, fk_question_id, fk_quiz_id)
VALUES 
(1, 1, 1000),
(2, 2, 1000);

INSERT INTO quiz_result (fk_user_id, fk_quiz_id, fk_anime_id, fk_mapping_id)
VALUES 
(1, 1000, 1, 2000),
(2, 1000, 2, 2001);


