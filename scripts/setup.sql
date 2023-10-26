USE db; -- TODO: Use v0 etc.

CREATE TABLE Events (
        id                      VARCHAR(6) NOT NULL UNIQUE PRIMARY KEY,
        title                   VARCHAR(32) NOT NULL,
        description             VARCHAR(4096) DEFAULT '',
        type                    INT DEFAULT 0,
        address                 VARCHAR(64) DEFAULT 'TBA',
        date                    DATETIME DEFAULT NOW,
        map                     BLOB
);

CREATE TABLE Users (
        id                      VARCHAR(6) NOT NULL UNIQUE PRIMARY KEY,
        mail                    VARCHAR(255) UNIQUE,
        password                VARCHAR(128) NOT NULL,
        firstname               VARCHAR(32),
        lastname                VARCHAR(32)
);

-- TODO: Use unique event/user as primary key
CREATE TABLE Tickets (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        eventID         VARCHAR(6),
        userID          VARCHAR(6),
        FOREIGN KEY (eventID) REFERENCES Events(id),
        FOREIGN KEY (userID) REFERENCES Users(id)
);