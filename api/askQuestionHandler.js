class AskQuestionHandler {
  constructor(sequelize, uuid, Game, Player) {
    this.sequelize = sequelize;
    this.Game = Game;
    this.Player = Player;
    this.createUUID = () => uuid();
  }

  askQuestion(req, res) {
    const roomName = req.body.room;
    const question = req.body.question;

    // store question in Game table
    this.sequelize.sync().then(
      this.Game.update(
        {
          Question: question
        },
        {
          where: {
            GameName: roomName
          }
        }
      )
    );

    res.status(200).send({ question: question });  // not sure what needs to be returned
  }
}
