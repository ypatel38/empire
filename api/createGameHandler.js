class CreateGameHandler {
  constructor(sequelize, Sequelize, Game, Player) { 
    this.sequelize = sequelize
    this.Game = Game
    this.Player = Player

  }

  createGame(req, res) {
    // var createGame = this.createGame.bind(this)

    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    console.log(userName, roomName, roomPassword)
    // console.log(this.sequelize)
    
    // check if gameName already exists
    this.sequelize.sync().then(
      this.Game.findAll({ where: {GameName: roomName} }).then(function(game) {
        console.log('found gameNamde?: ',game.length)

        // if gameName already exists, send error code
        if(game.length > 0) {
          res.status(500).send('roomName already in use')
        }
        else { // gameName is unique
          // add game to Game table with player as host
          

          // add player as host to Player table

          res.status(200).send({ gameId: 'hello' })
        }
      })
    );

    // TOY CASES:
    // console.log(this.Game.length)
    // this.sequelize.sync().then(
    //   this.Game.findAll().then(function(game) {
    //     console.log('find all len: ',game.length)
    //   })
    // );
    // //add to Game table
    // this.sequelize.sync().then(
    //   this.Game.create({
    //     GameName: 'game1',
    //     GamePassword: 'password'
    //   })
    // );

    
  }
}

  
module.exports = CreateGameHandler


    