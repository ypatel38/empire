/* eslint-disable no-unused-vars */
class SubmitAnswerHandler {
  constructor(sequelize, uuid, Game, Player) {
    this.sequelize = sequelize;
    this.Game = Game;
    this.Player = Player;
    this.createUUID = () => uuid();
  }

  submitAnswer(req, res) {
    const roomName = req.body.room;
    const answer = req.body.answer;
    const userName = req.body.userName;

    // add answer to player in Player table
    this.sequelize.sync().then(
      this.Player.update(
        {
          Answer: answer
        },
        {
          where: {
            GameName: roomName,
            PlayerName: userName
          }
        }
      )
    );

    // update count in Game table
    this.sequelize.sync().then(
      this.Game.update(
        {
          NumAnswers: this.sequelize.literal("NumAnswers + 1")
        },
        {
          where: {
            GameName: roomName
          }
        }
      )
    );

    // check if numAnswers is equal to numPlayers (means everyone answered)
    this.sequelize.sync().then(
      this.Game.findAll({
        where: {
          GameName: roomName
        }
      }).then(fa_res => {
        if (fa_res[0].NumAnswers == fa_res[0].NumPlayers) {
          // res.status(200).send("All players have submitted an answer");  // TODO: change gamePhase at this point or in the next step

          // send array of answers
          // TODO: TEST THIS QUERY
          this.sequelize.sync().then(
            this.Player.findAll({
              attributes: ["Answer"],
              where: {
                GameName: roomName
              }
            }).then(all_answers => {
              res.send(200).json(all_answers);
            })
          );
        }
      })
    );

    res.status(200).send({ answer: answer }); // not sure what needs to be returned
  }
}
