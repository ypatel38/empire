class CreateGameHandler {
  constructor(sequelize, uuid, Game, Player) { 
    this.sequelize = sequelize
    this.Game = Game
    this.Player = Player
    this.createUUID = () => uuid()
  }

  createGame(req, res) {
    console.log('test', this.createUUID())
    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    console.log(userName, roomName, roomPassword)
    
    // check if gameName already exists
    this.sequelize.sync()
      .then(
        this.Game.findAll({ where: {GameName: roomName} })
      .then((fa_res) => {
        console.log(fa_res)
        console.log('found gameName? ',fa_res.length)
        console.log('then 2 this', this)

        // if gameName already exists, send error code
        if (fa_res.length > 0) {
          res.status(500).send('This room name is already is use.')
        }
        else { // gameName is unique
          let playerId = this.createUUID()
          console.log('pUUID', playerId)
          
          // add game to Game table with player as host
          this.sequelize.sync().then(
            this.Game.create({
              GameName: roomName,
              GamePassword: roomPassword, 
              HostPlayerId: playerId
            })
          )

          // add player as host to Player table
          this.sequelize.sync().then(
            this.Player.create({
              PlayerId: playerId,
              PlayerName: userName,
              GameName: roomName,
              isLeader: 1
            })
          )

          res.status(200).send({ gameId: roomName })
        }
      })
    )
  }
}
  
module.exports = CreateGameHandler
