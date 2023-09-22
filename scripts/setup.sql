-- Active: 1667734353605@@127.0.0.1@3306@db
DROP TABLE `Events`;
CREATE TABLE Events (
	id 				INT AUTO_INCREMENT PRIMARY KEY,
	eid				VARCHAR(6) NOT NULL,
	title 			VARCHAR(32) NOT NULL,
	description		VARCHAR(250) DEFAULT '',
	type 			INT DEFAULT 0,
	address 		VARCHAR(64) DEFAULT 'TBA',
	date			DATETIME, -- NOT NULL,
	header			BLOB,
	map				BLOB -- NOT NULL
)