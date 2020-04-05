const express = require('express')
const app = express()
const port = parseInt(process.env.PORT, 10) || 8080;

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser');

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './empire.sqlite',
  logging: console.log, 
  freezeTableName: true
});

// define models
const Game = sequelize.define('game', {
  GameName: { 
    type: Sequelize.STRING, 
    allowNull: false,
    unique: true
  }, 
  GamePassword: Sequelize.STRING,
  GamePhase: {
    type: Sequelize.INTEGER, 
    defaultValue: 0
  },
  TurnNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  NumPlayers: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  NumEmpires: Sequelize.INTEGER,
  HostPlayerId: Sequelize.STRING
});

// //add to Game table
// sequelize.sync().then(function () {
//   Game.create({
//     GameName: 'game0',
//     GamePassword: 'pass'
//   })
// })


// sequelize.sync()

const Player = sequelize.define('player', {
  PlayerId: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true
  },
  PlayerName: {
    type: Sequelize.STRING, 
    allowNull: false,
  }, 
  GameName: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  TeamNumber: Sequelize.INTEGER,
  isLeader: Sequelize.BOOLEAN, 
});

// sequelize.sync()

// // add to Players table
// sequelize.sync().then(function () {
//   Player.create({
//     PlayerId: 'd244445c-4252-4531-979d-82195e0e48ed',
//     PlayerName: 'hiran',
//     GameName: 'game0', 
//     TeamNumber: 0,
//     isLeader: true
//   })
// }) 


// const Db = require('./database.js') // this guy isnt doing anything


const HomeHandler = require('./api/homeHandler.js')
const GameHandler = require('./api/gameHandler.js')
console.log('before require cgh')
const CreateGameHandler = require('./api/createGameHandler.js')
console.log('after require cgh')
const JoinGameHandler = require('./api/joinGameHandler.js')

const homeHandler = new HomeHandler(__dirname)
const gameHandler = new GameHandler(__dirname)
console.log('before new cgh: ', Game)
const createGameHandler = new CreateGameHandler(sequelize, Sequelize, Game, Player)
console.log('after new cgh')
const joinGameHandler = new JoinGameHandler()

server.listen(port, () => console.log('Listening on port ', port))

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/assets'))
// app.use('/static', express.static('node_modules'));

app.get('/', homeHandler.home.bind(homeHandler))
app.get('/:game', gameHandler.game.bind(gameHandler))
app.post('/api/create-game', createGameHandler.createGame.bind(createGameHandler))
app.post('/api/join-game', joinGameHandler.joinGame.bind(joinGameHandler))
app.get('/api/get-game-state', gameHandler.getGameState.bind(gameHandler) )

io.on('connection', (socket) => {
  socket.username = 'anonymous';
  socket.on('', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' has joined!'})
  })
})




