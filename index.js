const express = require('express')
const app = express()
const port = parseInt(process.env.PORT, 10) || 8080;

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const Db = require('./database.js')

const db = new Db(Sequelize)

const HomeHandler = require('./api/homeHandler.js')
const GameHandler = require('./api/GameHandler.js')
const CreateGameHandler = require('./api/CreateGameHandler.js')
const JoinGameHandler = require('./api/JoinGameHandler.js')

const homeHandler = new HomeHandler(__dirname)
const gameHandler = new GameHandler(__dirname)
const createGameHandler = new CreateGameHandler()
const joinGameHandler = new JoinGameHandler()

server.listen(port, () => console.log('Listening on port ', port))

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/assets'))
// app.use('/static', express.static('node_modules'));

app.get('/', homeHandler.home.bind(homeHandler))
app.get('/:game', gameHandler.game.bind(gameHandler))
app.post('/create-game', createGameHandler.createGame.bind(createGameHandler))
app.post('/join-game', joinGameHandler.joinGame.bind(joinGameHandler))

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




