const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/assets', express.static(__dirname + '/assets'))
app.get('/', (_req, res) => res.sendFile(__dirname + '/index.html'))
app.post('/create-game', createGame)
app.post('/join-game', joinGame)
app.get('/game', (_req, res) => res.sendFile(__dirname + '/game.html'))


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

http.listen(3000, () => console.log('listening on port 3000'))