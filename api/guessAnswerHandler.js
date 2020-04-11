class GuessAnswerHandler {
  constructor(sequelize, uuid, Game, Player) {
    this.sequelize = sequelize;
    this.Game = Game;
    this.Player = Player;
    this.createUUID = () => uuid();
  }

  guessAnswer(req, res) {
    const roomName = req.body.room;
    const answer = req.bosy.answer; // answer that the user guessed
    const userName = req.body.userName; // userName that the user guessed

    // check if answer is linked to the player
    this.sequelize.sync().then(
      this.Player.findAll({
        where: {
          GameName: roomName,
          PlayerName: userName
        }
      }).then(fa_res => {
        if (fa_res[0].Answer == answer) {
          res.send(200).send("Player guessed correctly");  // TODO: update numEmpires here and check if game is over
        }
      })
    );

    res.send(200).send("Player guessed incorrectly");
  }
}
