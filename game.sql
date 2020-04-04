-- CREATE TABLE game ( GameId INTEGER NOT NULL PRIMARY KEY, 
--     StartTime TEXT, 
--     TurnNumber INTEGER, 
--     NumPlayers INTEGER, 
--     NumEmpires INTEGER, 
--     HostPlayerId TEXT, 
--     GamePassword TEXT, 
--     GameName TEXT, 
--     GamePhase INTEGER);

INSERT INTO game (GameId, StartTime, TurnNumber, NumPlayers, NumEmpires, HostPlayerId, GamePassword, GameName, GamePhase)
VALUES (0, '2020-04-03 11:23:00.000', 0, 4, 4, '000', 'icecream', 'game1', 0);


INSERT INTO game (GameId, StartTime, TurnNumber, NumPlayers, NumEmpires, HostPlayerId, GamePassword, GameName, GamePhase)
VALUES (1, '2020-04-03 11:23:00.000', 0, 4, 4, '000', 'icecream', 'game1', 0);

SELECT * FROM game;