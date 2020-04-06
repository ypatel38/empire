class JoinGameHandler {
  constructor(sequelize, uuid, Game, Player) {
    this.sequelize = sequelize;
    this.Game = Game;
    this.Player = Player;
    this.createUUID = () => uuid();
  }

  joinGame(req, res) {
    const userName = req.body.name;
    const roomName = req.body.room;
    const roomPassword = req.body.password;

    // check if gameName exists
    this.sequelize.sync().then(
      this.Game.findAll({
        where: {
          GameName: roomName
        }
      }).then(fa_res => {
        if (fa_res.length <= 0) {
          res.status(500).send("This room name does not exist.");
        } 
        else {
          // check if password is correct
          if (fa_res[0].GamePassword !== roomPassword) {
            res.status(500).send("Incorrect password.");
          } 
          else {
            // check if playerName already exists for gameName
            this.Player.findAll({
              where: {
                GameName: roomName,
                PlayerName: userName
              }
            }).then(fa_player => {
              if (fa_player.length > 0) {
                console.log("username already exists");
                res.status(500).send("This username already exists in this game.");
              } 
              else {
                // add player to Player table
                let playerId = this.createUUID();

                this.sequelize.sync().then(
                  this.Player.create({
                    PlayerId: playerId,
                    PlayerName: userName,
                    GameName: roomName,
                    isLeader: 0
                  })
                );

                console.log("player name is unique for this game");
                // update numPlayers in Game table
                this.sequelize.sync().then(
                  this.Game.update(
                    {
                      NumPlayers: this.sequelize.literal("NumPlayers + 1")
                    },
                    {
                      where: {
                        GameName: roomName
                      }
                    }
                  )
                );

                res.status(200).send({ gameId: roomName });
              }
            });
          }
        }
      })
    );
  }
}

module.exports = JoinGameHandler;
