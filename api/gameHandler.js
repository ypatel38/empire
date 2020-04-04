class GameHandler {
  constructor(dirname) {
    this.dirname = dirname
  }

  game(_req, res) {
    res.sendFile(this.dirname + '/templates/game.html')
  }

  getGameState(_req, res) {
    const data = {
      gameState: GAME_STATES[1],
      topic: 'Some Topic',
      players: [
        {
          name: 'Jesus',
          teamId: '1'
        }
      ],
      answers: ['a', 'b', 'c', 'd', 'e', 'f'],
      myName: 'Jesus',
      roomName: 'hello3',
      roomPassword: '123casdw',
      isHost: true,
      myAnswer: 'My asdawxca'
    }

    res.status(200).send(data)
  }
}

const GAME_STATES = [
  'waitingForPlayers',
  'readingAnswers',
  'inGame'
]
module.exports = GameHandler
