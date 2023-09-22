-- Active: 1667734353605@@127.0.0.1@3306@db
DROP TABLE `Events`;
CREATE TABLE Events (
	id 		INT AUTO_INCREMENT PRIMARY KEY,
	eid		VARCHAR(6) NOT NULL,
	title 	VARCHAR(32) NOT NULL,
	color 	INT 
)

-- INSERT INTO `Events` VALUES (
-- 	1,
-- 	"Test Event #1",
-- 	0xA73121
-- )