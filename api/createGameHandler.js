class CreateGameHandler {
  constructor(sequelize) { 
    this.sequelize = sequelize
  }

  createGame(req, res) {
    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    console.log(userName, roomName, roomPassword)
    console.log(this.sequelize)

    // TOY CASE:
    // this.sequelize.sync().then(function () {
    //   Game.findAll().then(function(game) {
    //     console.log(game.length)
    //   });
    // });



    res.status(200).send({ gameId: 'hello' })
    
  }
}
  
module.exports = CreateGameHandler

