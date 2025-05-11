CREATE DATABASE anime_recommendation;
USE anime_recommendation;

CREATE TABLE users(
		user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL UNIQUE,
    password_hash VARCHAR(45) NOT NULL,
    avatar_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chkEmail CHECK(email LIKE '%@%')
)AUTO_INCREMENT = 1;

CREATE TABLE quizzes(
	quiz_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT CURRENT_TIMESTAMP,
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
  CONSTRAINT chk_type_style CHECK(type_style IN ('realista', 'cartunesco', '3d', 'nostálgico')),
)AUTO_INCREMENT=2000;

CREATE TABLE anime(
	anime_id INT,
  api_anime_id INT, 
  fk_mapping_id INT,
  name VARCHAR(45),
  image_url VARCHAR(255),
  description VARCHAR(255),
  CONSTRAINT pk_composite PRIMARY KEY(anime_id, api_anime_id, fk_mapping_id)
);

CREATE TABLE comments(
	comment_id INT,
  fk_anime_id INT,
  fk_user_id INT, 
  created_at DATE DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(255) NOT NULL,
  CONSTRAINT pk_composite PRIMARY KEY(comment_id, fk_anime_id, fk_user_id)
);

CREATE TABLE questions(
	question_id INT AUTO_INCREMENT,
  fk_quiz_id INT,
	tilte VARCHAR(45) NOT NULL,
  number INT NOT NULL,
  CONSTRAINT pk_composite PRIMARY KEY(question_id, fk_quiz_id)
);

CREATE TABLE alternatives(
	alternative_id INT,
  fk_mapping_id INT,
  title VARCHAR(45),
  description VARCHAR(255),
  image_url VARCHAR(45),
  is_correct BOOLEAN,
  CONSTRAINT pk_composite PRIMARY KEY(alternative_id, fk_mapping_id)
);

CREATE TABLE options(
  fk_alternative_id INT, 
  fk_question_id INT,
  fk_quiz_id INT,
  CONSTRAINT pk_composite PRIMARY KEY(fk_alternative_id, fk_question_id, fk_quiz_id)
);


CREATE TABLE quiz_result(
	fk_user INT,
  fk_quiz_id INT,
  fk_anime_id INT,
  fk_mapping_id INT,
  CONSTRAINT pk_composite PRIMARY KEY(fk_user, fk_quiz_id, fk_anime_id, fk_mapping_id)
);