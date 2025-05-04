CREATE DATABASE anime;

USE anime;
DROP TABLE users;
CREATE TABLE users(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL UNIQUE,
    password_hash VARCHAR(45) NOT NULL,
    avatar_url VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chkEmail CHECK(email LIKE '%@%')
) AUTO_INCREMENT = 1000;


INSERT INTO users(username, email, password_hash) VALUES
	('henry', 'henry@gmail.com', '123456'),
    ('diego', 'diego@gmail.com', '123456'), 
    ('maiky', 'maiky@gmail.com', '123456');
    
SELECT * FROM users;

UPDATE users SET username = 'maiki' WHERE userid = 3;

DELETE FROM users WHERE userid = 1;