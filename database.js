class Database {
  constructor(orm) {
    this.orm = new orm({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });
  }
}


const sqlite3 = require('sqlite3').verbose();  // set to verbose for stack traces. change if it gets annoying

let db = new sqlite3.Database('./empire.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


console.log("GOT THROUGH MAKING DATABASE")

// let create_game_table = "CREATE TABLE IF NOT EXISTS game ( Game_ID INTEGER NOT NULL PRIMARY KEY, )";
// let create_game_table = "CREATE TABLE IF NOT EXISTS game ( GameId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," + 
// " StartTime TEXT, TurnNumber INTEGER, NumPlayers INTEGER, NumEmpires INTEGER, HostPlayerId TEXT, Password TEXT, Name TEXT,GamePhase INTEGER)";
// db.run(create_game_table);




/*
// close database connection down
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
}); 
*/

module.exports = Database
