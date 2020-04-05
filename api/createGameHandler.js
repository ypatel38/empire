class CreateGameHandler {
  constructor() { }

  createGame(req, res) {
    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    res.status(200).send({ gameId: 'hello', playerId: 'someId' })
  }
}
  
module.exports = CreateGameHandler
