
class Database {
  constructor() {
  }
}

/////// all of this has to be in index. 

// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './empire.sqlite',
//   logging: console.log, 
//   freezeTableName: true
// });

// // define models
// const Game = sequelize.define('game', {
//   GameName: Sequelize.STRING
// });

// // how to add to Game table
// // sequelize.sync().then(function () {
// //   Game.create({
// //     GameName: 'game0'
// //   })
// // })

// how to find a game in Game table by id
// sequelize.sync().then(function () {
//   Game.findByPk(1).then(function(game) {
//     console.log(game.dataValues)
//   });
// });

// how to get all records in Game table
// sequelize.sync().then(function () {
//   Game.findAll().then(function(game) {
//     console.log(game.length)
//   });
// });



module.exports = sequelize
