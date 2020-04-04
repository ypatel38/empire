class Database {
  constructor(orm) {
    this.orm = new orm({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });
  }
}



const sqlite3 = require('sqlite3').verbose();  // set to verbose for stack traces. change if it gets annoying

// open up database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});



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
