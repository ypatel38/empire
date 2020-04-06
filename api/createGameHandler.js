var cgh;

class CreateGameHandler {
  constructor(sequelize, Sequelize, Game, Player) { 
    this.sequelize = sequelize
    this.Game = Game
    this.Player = Player

    cgh = this
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  createGame(req, res) {
    const userName = req.body.userName
    const roomName = req.body.room
    const roomPassword = req.body.password

    console.log(userName, roomName, roomPassword)
    
    // check if gameName already exists
    this.sequelize.sync()
      .then(
        cgh.Game.findAll({ where: {GameName: roomName} })
      .then( function(fa_res) {
        console.log(fa_res)
        console.log('found gameName? ',fa_res.length)
        console.log('then 2 cgh', cgh)

        // if gameName already exists, send error code
        if(fa_res.length > 0) {
          res.status(500).send('This room name is already is use.')
        }
        else { // gameName is unique
          var playerUUID = cgh.create_UUID()
          console.log('pUUID', playerUUID)
          
          // add game to Game table with player as host
          cgh.sequelize.sync().then(
            cgh.Game.create({
              GameName: roomName,
              GamePassword: roomPassword, 
              HostPlayerId: playerUUID
            })
          );

          // add player as host to Player table
          cgh.sequelize.sync().then(
            cgh.Player.create({
              PlayerId: playerUUID,
              PlayerName: userName,
              GameName: roomName,
              isLeader: 1
            })
          );

          res.status(200).send({ gameId: 'hello' })
        }


      }
      )
    )
  }

}

  
module.exports = CreateGameHandler

