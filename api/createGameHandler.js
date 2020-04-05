class CreateGameHandler {
  constructor(sequelize, Sequelize, Game, Player) { 
    // "use strict"

    console.log('og: ', Game)

    this.sequelize = sequelize
    this.Game = Game  // constructor not working??
    this.Player = Player

    // if (this instanceof CreateGameHandler) {
    //   this.sequelize = sequelize
    //   this.Game = Game  // constructor not working??
    //   this.Player = Player
    // }
    // else return new CreateGameHandler(sequelize, Sequelize, Game, Player);

  }

  createGame(req, res) {
    // var createGame = this.createGame.bind(this)

    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    console.log(userName, roomName, roomPassword)
    // console.log(this.sequelize)
    
    

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



    res.status(200).send({ gameId: 'hello' })
    
  }
}

  
module.exports = CreateGameHandler

 // // define models
    // this.Game = sequelize.define('game', {
    //   GameName: { 
    //     type: Sequelize.STRING, 
    //     allowNull: false,
    //     unique: true
    //   }, 
    //   GamePassword: Sequelize.STRING,
    //   GamePhase: {
    //     type: Sequelize.INTEGER, 
    //     defaultValue: 0
    //   },
    //   TurnNumber: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 0
    //   },
    //   NumPlayers: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 1
    //   },
    //   NumEmpires: Sequelize.INTEGER,
    //   HostPlayerId: Sequelize.STRING
    // });


    // this.Player = sequelize.define('player', {
    //   PlayerId: {
    //     type: Sequelize.UUID,
    //     allowNull: false,
    //     unique: true
    //   },
    //   PlayerName: {
    //     type: Sequelize.STRING, 
    //     allowNull: false,
    //   }, 
    //   GameName: {
    //     type: Sequelize.STRING, 
    //     allowNull: false
    //   },
    //   TeamNumber: Sequelize.INTEGER,
    //   isLeader: Sequelize.BOOLEAN, 
    // });

    