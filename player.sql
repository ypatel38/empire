
-- CREATE TABLE player ( PlayerId TEXT NOT NULL PRIMARY KEY,
--     GameId INTEGER,
--     TeamNumber INTEGER,
--     isLeader INTEGER, 
--     PlayerName TEXT,
--     FOREIGN KEY (GameId)
--        REFERENCES game (GameId) );


INSERT INTO player (PlayerId, GameId, TeamNumber, isLeader, PlayerName)
VALUES ('43edd4c5-5c0b-441c-a3f1-57f102cd04a2', 0, 0, 0, 'Jesus');

-- DELETE FROM player 
-- WHERE PlayerId='uuid0';

SELECT * FROM player;

-- Player:
-- PlayerId: varchar (UUID) PRIMARY
-- GameId: Int FOREIGN
-- TeamNumber: int
-- isLeader: boolean
-- PlayerName: varchar