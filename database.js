class Database {
  constructor(orm) {
    this.orm = new orm({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });
  }
}

module.exports = Database
