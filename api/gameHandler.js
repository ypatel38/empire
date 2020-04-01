class GameHandler {
  constructor(dirname) {
    this.dirname = dirname
  }

  game(_req, res) {
    res.sendFile(this.dirname + '/templates/game.html')
  }
}

module.exports = GameHandler
