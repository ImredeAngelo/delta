-- DROP TABLE `Events`;
-- CREATE TABLE Events (
-- 	id 				INT AUTO_INCREMENT,
-- 	eid				VARCHAR(6) NOT NULL UNIQUE PRIMARY KEY,
-- 	title 			VARCHAR(32) NOT NULL,
-- 	description		VARCHAR(4096) DEFAULT ' ',
-- 	type 			INT DEFAULT 0,
-- 	address 		VARCHAR(64) DEFAULT 'TBA',
-- 	date			DATETIME, -- NOT NULL,
-- 	header			MEDIUMBLOB,
-- 	map				BLOB -- NOT NULL
-- );

-- ALTER TABLE Events
-- MODIFY COLUMN header MEDIUMBLOB;

-- DROP TABLE `Users`;
CREATE TABLE Users (
	id				VARCHAR(6) NOT NULL UNIQUE PRIMARY KEY,
	mail 			VARCHAR(255) UNIQUE,
	password		VARCHAR(64) NOT NULL,
	firstname		VARCHAR(32),
	lastname		VARCHAR(32)
);