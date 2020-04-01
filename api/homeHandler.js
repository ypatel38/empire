class HomeHandler {
  constructor(dirname) {
    this.dirname = dirname
  }

  home(_req, res) {
    res.sendFile(this.dirname + '/templates/index.html')
  }
}

module.exports = HomeHandler
