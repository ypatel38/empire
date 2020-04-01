class CreateGameHandler {
  constructor() { }

  createGame(req, res) {
    const user = req.body.user
    const roomName = req.body.room
    const roomPassword = req.body.password

    res.status(200).send({ gameId: 'hello' })
  }
}
  
module.exports = CreateGameHandler
